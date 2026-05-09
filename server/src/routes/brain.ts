import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';
import Anthropic from '@anthropic-ai/sdk';
import multer from 'multer';

const audioUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

const router = Router();
router.use(requireAuth);

// ── System prompt ──────────────────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `Eres el Cerebro de FISIOCAN, un asistente especializado en fisioterapia veterinaria canina y equina.
Tienes conocimiento profundo en:
- Evaluación neurológica y ortopédica en perros y caballos
- Técnicas de fisioterapia: hidroterapia, electroterapia (TENS, ultrasonido, láser), masoterapia, termoterapia
- Rehabilitación postquirúrgica: TPLO, FHO, displasia de cadera/codo, hernias discales (IVDD)
- Ejercicios terapéuticos: propioceptivos, fortalecimiento, rango de movimiento
- Dolor crónico, osteoartritis, artrosis en animales de compañía
- Neurorrehabilitación: paresia, parálisis, mielopatía degenerativa
- Diagnóstico diferencial de cojeras y alteraciones de la marcha
- Protocolos de tratamiento y planes de ejercicio domiciliario
- Evaluación del dolor (escalas Glasgow, CMPS-SF, facial pain)
- Vendajes funcionales, kinesiotaping veterinario
- Modalidades de ejercicio acuático (underwater treadmill, natación)

Responde siempre en español. Sé preciso, clínico y práctico.
IMPORTANTE: Responde en texto plano sin usar ningún símbolo de formato markdown. No uses asteriscos (*), almohadillas (#) ni guiones de listas. Usa párrafos y texto limpio. Puedes usar numeración (1. 2. 3.) cuando sea apropiado.
Cuando des recomendaciones de tratamiento, incluye frecuencia, duración y contraindicaciones.
Puedes gestionar citas, crear planes terapéuticos y guardar notas de conocimiento usando las herramientas disponibles.`;

function getCurrentDateContext(): string {
  const now = new Date();
  const dateStr = now.toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
  // ISO string adjusted to Madrid time for date arithmetic reference
  const madridOffset = now.toLocaleString('en-US', { timeZone: 'Europe/Madrid', hour12: false, hour: '2-digit' });
  return `FECHA Y HORA ACTUAL (España, Madrid): ${dateStr}. Usa SIEMPRE esta fecha como referencia para calcular "mañana", "pasado mañana", "la semana que viene", etc. Nunca inventes fechas.`;
}

async function buildSystemPrompt(): Promise<string> {
  const notes = await prisma.brainNote.findMany({ orderBy: { updatedAt: 'desc' }, take: 30 });
  const dateContext = getCurrentDateContext();
  if (notes.length === 0) return BASE_SYSTEM_PROMPT + '\n\n' + dateContext;

  const manual      = notes.filter(n => n.originType === 'manual');
  const fromConvs   = notes.filter(n => n.originType === 'conversation');
  const other       = notes.filter(n => n.originType !== 'manual' && n.originType !== 'conversation');

  const sections: string[] = [];
  if (manual.length > 0) {
    sections.push(
      'CONOCIMIENTO PERSONAL DEL FISIOTERAPEUTA (máxima prioridad — responde siempre con este conocimiento primero):\n' +
      manual.map(n => `[${n.title}]\n${n.content}`).join('\n\n')
    );
  }
  if (fromConvs.length > 0) {
    sections.push(
      'PATRONES EXTRAÍDOS DE PRÁCTICA CLÍNICA:\n' +
      fromConvs.map(n => `[${n.title}]\n${n.content}`).join('\n\n')
    );
  }
  if (other.length > 0) {
    sections.push(
      'BASE DE CONOCIMIENTO GENERAL:\n' +
      other.map(n => `[${n.title}]\n${n.content}`).join('\n\n')
    );
  }

  return BASE_SYSTEM_PROMPT + '\n\n' + dateContext + '\n\n' + sections.join('\n\n');
}

// ── Tools ──────────────────────────────────────────────────────────────────────

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'list_patients',
    description: 'Lista todos los pacientes activos con su id, nombre, especie y tutor. Úsalo antes de crear citas o planes para obtener el ID del paciente correcto.',
    input_schema: { type: 'object' as const, properties: {}, required: [] },
  },
  {
    name: 'create_appointment',
    description: 'Crea una nueva cita en la agenda para un paciente. Llama a list_patients primero si no conoces el ID del paciente.',
    input_schema: {
      type: 'object' as const,
      properties: {
        patientId: { type: 'number', description: 'ID del paciente' },
        date: { type: 'string', description: 'Fecha y hora en formato ISO 8601 UTC, por ejemplo 2026-05-07T10:00:00.000Z. Ajusta a zona horaria de España (UTC+2 en verano, UTC+1 en invierno).' },
        duration: { type: 'number', description: 'Duración en minutos: 30, 45, 60, 90 o 120' },
        notes: { type: 'string', description: 'Notas opcionales para la cita' },
      },
      required: ['patientId', 'date', 'duration'],
    },
  },
  {
    name: 'create_plan',
    description: 'Crea un plan terapéutico para un paciente (ejercicios, nutrición o general). Llama a list_patients primero si no conoces el ID.',
    input_schema: {
      type: 'object' as const,
      properties: {
        patientId: { type: 'number', description: 'ID del paciente' },
        title: { type: 'string', description: 'Título del plan' },
        type: { type: 'string', enum: ['EXERCISE', 'NUTRITION', 'GENERAL'], description: 'Tipo: EXERCISE, NUTRITION o GENERAL' },
        content: { type: 'string', description: 'Contenido completo del plan con instrucciones detalladas' },
      },
      required: ['patientId', 'title', 'type', 'content'],
    },
  },
  {
    name: 'list_appointments',
    description: 'Lista las citas próximas o de una semana concreta. Úsalo para consultar citas antes de cancelar o editar.',
    input_schema: {
      type: 'object' as const,
      properties: {
        from: { type: 'string', description: 'Fecha inicio ISO 8601 UTC (opcional). Por defecto hoy.' },
        to: { type: 'string', description: 'Fecha fin ISO 8601 UTC (opcional). Por defecto 30 días desde hoy.' },
      },
      required: [],
    },
  },
  {
    name: 'cancel_appointment',
    description: 'Cancela una cita cambiando su estado a CANCELLED. Usa list_appointments para obtener el ID.',
    input_schema: {
      type: 'object' as const,
      properties: {
        appointmentId: { type: 'number', description: 'ID de la cita a cancelar' },
      },
      required: ['appointmentId'],
    },
  },
  {
    name: 'update_appointment',
    description: 'Edita una cita existente: cambia fecha/hora, duración, notas o estado. Usa list_appointments para obtener el ID.',
    input_schema: {
      type: 'object' as const,
      properties: {
        appointmentId: { type: 'number', description: 'ID de la cita a editar' },
        date: { type: 'string', description: 'Nueva fecha y hora en ISO 8601 UTC (opcional)' },
        duration: { type: 'number', description: 'Nueva duración en minutos: 30, 45, 60, 90 o 120 (opcional)' },
        notes: { type: 'string', description: 'Nuevas notas (opcional)' },
        status: { type: 'string', enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'], description: 'Nuevo estado (opcional)' },
      },
      required: ['appointmentId'],
    },
  },
  {
    name: 'save_knowledge_note',
    description: 'Guarda una nota en la base de conocimiento del Cerebro para referencia futura.',
    input_schema: {
      type: 'object' as const,
      properties: {
        title: { type: 'string', description: 'Título descriptivo de la nota' },
        content: { type: 'string', description: 'Contenido completo de la nota' },
        tags: { type: 'string', description: 'Etiquetas separadas por coma (ej: rehabilitación, perro, TPLO)' },
      },
      required: ['title', 'content'],
    },
  },
];

async function executeTool(name: string, input: Record<string, unknown>, fisioId: number, apiKey: string): Promise<string> {
  switch (name) {
    case 'list_patients': {
      const patients = await prisma.patient.findMany({
        where: { active: true },
        select: { id: true, name: true, species: true, tutor: { select: { name: true } } },
        orderBy: { name: 'asc' },
      });
      return JSON.stringify(patients.map(p => ({ id: p.id, name: p.name, species: p.species, tutor: p.tutor.name })));
    }
    case 'list_appointments': {
      const from = input.from ? new Date(String(input.from)) : new Date();
      const to = input.to ? new Date(String(input.to)) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const appts = await prisma.appointment.findMany({
        where: { date: { gte: from, lte: to } },
        include: { patient: { select: { name: true } } },
        orderBy: { date: 'asc' },
        take: 20,
      });
      return JSON.stringify(appts.map(a => ({
        id: a.id,
        patient: a.patient.name,
        date: a.date.toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'full', timeStyle: 'short' }),
        dateISO: a.date.toISOString(),
        duration: a.duration,
        status: a.status,
        notes: a.notes,
      })));
    }
    case 'cancel_appointment': {
      const appt = await prisma.appointment.update({
        where: { id: Number(input.appointmentId) },
        data: { status: 'CANCELLED' },
        include: { patient: { select: { name: true } } },
      });
      const dateStr = appt.date.toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'full', timeStyle: 'short' });
      return `Cita cancelada: ${appt.patient.name} el ${dateStr}. ID: ${appt.id}`;
    }
    case 'update_appointment': {
      const data: Record<string, unknown> = {};
      if (input.date) data.date = new Date(String(input.date));
      if (input.duration) data.duration = Number(input.duration);
      if (input.notes !== undefined) data.notes = String(input.notes);
      if (input.status) data.status = String(input.status);
      const appt = await prisma.appointment.update({
        where: { id: Number(input.appointmentId) },
        data,
        include: { patient: { select: { name: true } } },
      });
      const dateStr = appt.date.toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'full', timeStyle: 'short' });
      return `Cita actualizada: ${appt.patient.name} el ${dateStr} (${appt.duration} min, estado: ${appt.status}). ID: ${appt.id}`;
    }
    case 'create_appointment': {
      const appt = await prisma.appointment.create({
        data: {
          date: new Date(String(input.date)),
          duration: Number(input.duration),
          patientId: Number(input.patientId),
          fisioId,
          notes: input.notes ? String(input.notes) : null,
          status: 'SCHEDULED',
        },
        include: { patient: { select: { name: true } } },
      });
      const dateStr = appt.date.toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'full', timeStyle: 'short' });
      return `Cita creada para ${appt.patient.name} el ${dateStr} (${appt.duration} min). ID: ${appt.id}`;
    }
    case 'create_plan': {
      const plan = await prisma.plan.create({
        data: {
          title: String(input.title),
          type: String(input.type),
          content: String(input.content),
          patientId: Number(input.patientId),
          createdById: fisioId,
        },
        include: { patient: { select: { name: true } } },
      });
      return `Plan "${plan.title}" creado para ${plan.patient.name}. ID: ${plan.id}`;
    }
    case 'save_knowledge_note': {
      const note = await prisma.brainNote.create({
        data: {
          title: String(input.title),
          content: String(input.content),
          tags: input.tags ? String(input.tags) : '',
          originType: 'manual',
        },
      });
      // Trigger synapse analysis in background (fire and forget)
      analyzeNoteForSynapses(note.id, note.title, note.content, apiKey).catch(console.error);
      return `Nota "${note.title}" guardada en la base de conocimiento. ID: ${note.id}`;
    }
    default:
      return 'Herramienta no reconocida';
  }
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/gs, '$1')
    .replace(/\*(.+?)\*/gs, '$1')
    .replace(/^[\s]*[-*+]\s+/gm, '• ')
    .replace(/`{3}[^\n]*\n?([\s\S]*?)`{3}/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

// ── Background analysis helpers ────────────────────────────────────────────────

/**
 * Analyze a note and create synapses to related existing nodes.
 * Fire-and-forget: never blocks the response.
 */
async function analyzeNoteForSynapses(noteId: number, noteTitle: string, noteContent: string, apiKey: string): Promise<void> {
  try {
    const existingNotes = await prisma.brainNote.findMany({
      where: { id: { not: noteId } },
      select: { id: true, title: true, tags: true },
      orderBy: { updatedAt: 'desc' },
      take: 40,
    });
    if (existingNotes.length === 0) return;

    const client = new Anthropic({ apiKey });
    const resp = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `Eres un analizador de base de conocimiento de fisioterapia veterinaria.
Nota nueva: "${noteTitle} — ${noteContent.slice(0, 500)}"
Nodos existentes (id|título|etiquetas):
${existingNotes.map(n => `${n.id}|${n.title}|${n.tags}`).join('\n').slice(0, 2000)}
¿Qué nodos están relacionados con la nota nueva?
Responde SOLO con JSON válido (sin texto adicional): [{"nodeId":5,"strength":0.8}]
Max 6 nodos, strength de 0.1 a 1.0. Si no hay relación: []`,
      }],
    });

    const text = resp.content.find(b => b.type === 'text')?.text ?? '[]';
    const match = text.match(/\[[\s\S]*?\]/);
    if (!match) return;

    const relations: { nodeId: number; strength: number }[] = JSON.parse(match[0]);
    for (const rel of relations) {
      if (!rel.nodeId || rel.nodeId === noteId) continue;
      const [a, b] = [Math.min(noteId, rel.nodeId), Math.max(noteId, rel.nodeId)];
      try {
        await prisma.brainSynapse.upsert({
          where: { nodeIdA_nodeIdB: { nodeIdA: a, nodeIdB: b } },
          create: { nodeIdA: a, nodeIdB: b, strength: rel.strength, count: 1 },
          update: { count: { increment: 1 }, strength: rel.strength },
        });
      } catch { /* node might have been deleted */ }
    }
  } catch (err) {
    console.error('[Brain] analyzeNoteForSynapses error:', err);
  }
}

/**
 * Extract clinical concepts from an assistant message and create/update brain nodes.
 * Fire-and-forget: never blocks the response.
 */
async function indexMessageBackground(messageId: number, content: string, apiKey: string): Promise<void> {
  try {
    // Skip if already indexed
    const already = await prisma.brainIndexedMessage.findUnique({ where: { messageId } });
    if (already) return;

    // Skip very short messages (greetings, one-liners)
    if (content.length < 200) {
      await prisma.brainIndexedMessage.create({ data: { messageId } });
      return;
    }

    // Mark indexed immediately to prevent duplicate processing
    await prisma.brainIndexedMessage.create({ data: { messageId } });

    const client = new Anthropic({ apiKey });
    const resp = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      messages: [{
        role: 'user',
        content: `Analiza este mensaje de un asistente de fisioterapia veterinaria y extrae los conceptos clínicos clave mencionados:
"${content.slice(0, 1500)}"
Extrae solo conceptos clínicamente significativos: patologías, tratamientos, técnicas, protocolos, ejercicios.
Responde SOLO con JSON válido (sin texto adicional): [{"concept":"TPLO rehabilitación","content":"descripción breve del concepto","tags":"cirugía,rodilla,rehabilitación"}]
Máximo 4 conceptos. Si el mensaje es genérico o no tiene conceptos clínicos específicos: []`,
      }],
    });

    const text = resp.content.find(b => b.type === 'text')?.text ?? '[]';
    const match = text.match(/\[[\s\S]*?\]/);
    if (!match) return;

    const concepts: { concept: string; content: string; tags: string }[] = JSON.parse(match[0]);
    const newNodeIds: number[] = [];

    for (const c of concepts) {
      if (!c.concept || c.concept.length < 3) continue;

      // Find existing node with similar title
      const existingNode = await prisma.brainNote.findFirst({
        where: { title: { contains: c.concept.split(' ').slice(0, 3).join(' '), mode: 'insensitive' } },
      });

      let nodeId: number;
      if (existingNode) {
        nodeId = existingNode.id;
      } else {
        const note = await prisma.brainNote.create({
          data: {
            title: c.concept,
            content: c.content || '',
            tags: c.tags || '',
            originType: 'conversation',
            sourceRef: `message:${messageId}`,
          },
        });
        nodeId = note.id;
        // Analyze synapses for new node (fire and forget)
        analyzeNoteForSynapses(note.id, note.title, note.content, apiKey).catch(console.error);
      }
      newNodeIds.push(nodeId);
    }

    // Create synapses between all concepts from the same message
    for (let i = 0; i < newNodeIds.length; i++) {
      for (let j = i + 1; j < newNodeIds.length; j++) {
        const [a, b] = [Math.min(newNodeIds[i], newNodeIds[j]), Math.max(newNodeIds[i], newNodeIds[j])];
        try {
          await prisma.brainSynapse.upsert({
            where: { nodeIdA_nodeIdB: { nodeIdA: a, nodeIdB: b } },
            create: { nodeIdA: a, nodeIdB: b, strength: 0.6, count: 1 },
            update: { count: { increment: 1 } },
          });
        } catch { /* skip */ }
      }
    }
  } catch (err) {
    console.error('[Brain] indexMessageBackground error:', err);
  }
}

// ── Conversations ──────────────────────────────────────────────────────────────

router.get('/conversations', async (_req, res) => {
  const convs = await prisma.brainConversation.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { content: true, createdAt: true },
      },
    },
  });
  res.json(convs);
});

router.post('/conversations', async (_req, res) => {
  const conv = await prisma.brainConversation.create({ data: {} });
  res.status(201).json(conv);
});

router.delete('/conversations/:id', async (req, res) => {
  await prisma.brainConversation.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
});

// ── Notes (= graph nodes) ──────────────────────────────────────────────────────

router.get('/notes', async (_req, res) => {
  const notes = await prisma.brainNote.findMany({ orderBy: { updatedAt: 'desc' } });
  res.json(notes);
});

router.post('/notes', async (req, res) => {
  const parse = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    tags: z.string().default(''),
    originType: z.string().default('manual'),
    linkedNodeId: z.number().optional(),   // create a direct synapse to this node
  }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { linkedNodeId, ...noteData } = parse.data;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const note = await prisma.brainNote.create({ data: noteData });

  // Direct synapse to parent node (if coming from "add note to this node")
  if (linkedNodeId) {
    const [a, b] = [Math.min(note.id, linkedNodeId), Math.max(note.id, linkedNodeId)];
    try {
      await prisma.brainSynapse.upsert({
        where: { nodeIdA_nodeIdB: { nodeIdA: a, nodeIdB: b } },
        create: { nodeIdA: a, nodeIdB: b, strength: 0.9, count: 1 },
        update: { count: { increment: 1 }, strength: 0.9 },
      });
    } catch { /* skip */ }
  }

  // Background synapse analysis
  if (apiKey) {
    analyzeNoteForSynapses(note.id, note.title, note.content, apiKey).catch(console.error);
  }

  res.status(201).json(note);
});

router.patch('/notes/:id', async (req, res) => {
  const parse = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    tags: z.string().optional(),
  }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const note = await prisma.brainNote.update({
    where: { id: Number(req.params.id) },
    data: { ...parse.data, updatedAt: new Date() },
  });
  res.json(note);
});

router.delete('/notes/:id', async (req, res) => {
  await prisma.brainNote.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
});

// ── Node position (graph layout persistence) ───────────────────────────────────

router.patch('/nodes/:id/position', async (req, res) => {
  const parse = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: 'x, y, z required' }); return; }
  await prisma.brainNote.update({
    where: { id: Number(req.params.id) },
    data: parse.data,
  });
  res.json({ ok: true });
});

// ── Synapses ───────────────────────────────────────────────────────────────────

router.get('/synapses', async (_req, res) => {
  const synapses = await prisma.brainSynapse.findMany({ orderBy: { count: 'desc' } });
  res.json(synapses);
});

router.delete('/synapses/:id', async (req, res) => {
  await prisma.brainSynapse.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
});

// ── Background indexing trigger ────────────────────────────────────────────────

router.post('/index', async (_req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { res.status(503).json({ error: 'API key not configured' }); return; }

  // Find assistant messages not yet indexed
  const indexed = await prisma.brainIndexedMessage.findMany({ select: { messageId: true } });
  const indexedIds = new Set(indexed.map(i => i.messageId));

  const messages = await prisma.brainMessage.findMany({
    where: { role: 'assistant', id: { notIn: [...indexedIds] } },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  res.json({ queued: messages.length });

  // Process in background after response is sent
  for (const msg of messages) {
    indexMessageBackground(msg.id, msg.content, apiKey).catch(console.error);
  }
});

// ── Messages ───────────────────────────────────────────────────────────────────

router.get('/messages', async (req, res) => {
  const conversationId = req.query.conversationId ? Number(req.query.conversationId) : undefined;
  const messages = await prisma.brainMessage.findMany({
    where: conversationId ? { conversationId } : { conversationId: null },
    orderBy: { createdAt: 'asc' },
    take: 100,
  });
  res.json(messages);
});

router.delete('/messages', async (req, res) => {
  const conversationId = req.query.conversationId ? Number(req.query.conversationId) : undefined;
  await prisma.brainMessage.deleteMany({
    where: conversationId ? { conversationId } : { conversationId: null },
  });
  res.json({ ok: true });
});

// ── Chat ───────────────────────────────────────────────────────────────────────

router.post('/chat', async (req: AuthRequest, res) => {
  const parse = z.object({
    message: z.string().min(1),
    conversationId: z.number().optional(),
  }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: 'Mensaje requerido' }); return; }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { res.status(503).json({ error: 'API de IA no configurada. Añade ANTHROPIC_API_KEY.' }); return; }

  const fisioId = req.userId ?? 1;
  const { message } = parse.data;
  let conversationId = parse.data.conversationId;

  // Ensure conversation exists
  if (conversationId) {
    const exists = await prisma.brainConversation.findUnique({ where: { id: conversationId } });
    if (!exists) conversationId = undefined;
  }
  if (!conversationId) {
    const conv = await prisma.brainConversation.create({ data: {} });
    conversationId = conv.id;
  }

  // Build system prompt with personal knowledge (prioritising manual notes)
  const systemPrompt = await buildSystemPrompt();

  // Save user message
  await prisma.brainMessage.create({ data: { role: 'user', content: message, conversationId } });

  // Auto-title conversation on first message
  const msgCount = await prisma.brainMessage.count({ where: { conversationId } });
  if (msgCount === 1) {
    const title = message.length > 60 ? message.slice(0, 57) + '…' : message;
    await prisma.brainConversation.update({ where: { id: conversationId }, data: { title } });
  }

  // Load conversation history (last 30 messages)
  const history = await prisma.brainMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    take: 30,
  });

  let chatMessages: Anthropic.MessageParam[] = history.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  const client = new Anthropic({ apiKey });

  // Tool-use loop
  let aiResponse = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: systemPrompt,
    messages: chatMessages,
    tools: TOOLS,
  });

  while (aiResponse.stop_reason === 'tool_use') {
    const assistantMsg: Anthropic.MessageParam = { role: 'assistant', content: aiResponse.content };
    chatMessages = [...chatMessages, assistantMsg];

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of aiResponse.content) {
      if (block.type === 'tool_use') {
        const result = await executeTool(block.name, block.input as Record<string, unknown>, fisioId, apiKey);
        toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: result });
      }
    }
    chatMessages = [...chatMessages, { role: 'user', content: toolResults }];

    aiResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: chatMessages,
      tools: TOOLS,
    });
  }

  const textBlock = aiResponse.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
  const cleanText = stripMarkdown(textBlock?.text ?? '');

  const savedMsg = await prisma.brainMessage.create({ data: { role: 'assistant', content: cleanText, conversationId } });

  res.json({ reply: cleanText, conversationId });

  // Trigger background indexing of this assistant message (fire and forget)
  indexMessageBackground(savedMsg.id, cleanText, apiKey).catch(console.error);
});

// ── Audio Transcription (Whisper via OpenAI or Web Speech fallback) ───────────

/**
 * POST /api/brain/transcribe
 * Accepts a multipart audio file (webm/ogg/mp4/wav/m4a).
 * Transcribes with OpenAI Whisper if OPENAI_API_KEY is set,
 * otherwise returns { noApiKey: true } so the client can use Web Speech API.
 */
router.post('/transcribe', audioUpload.single('audio'), async (req, res) => {
  if (!req.file) { res.status(400).json({ error: 'No audio file received' }); return; }

  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    // Signal client to use Web Speech API instead
    res.json({ noApiKey: true, transcript: null });
    return;
  }

  try {
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey: openAiKey });

    const { Readable } = await import('stream');
    const readable = Readable.from(req.file.buffer);
    // openai SDK needs a File-like object; build a blob with correct name
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype || 'audio/webm' });
    const file = new File([blob], `audio.${req.file.mimetype?.split('/')[1] ?? 'webm'}`);

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: 'es',
    });

    res.json({ transcript: transcription.text });
  } catch (err) {
    console.error('Whisper transcription error:', err);
    res.status(500).json({ error: 'Error transcribing audio' });
  }
});

export default router;
