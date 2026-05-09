import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

const sessionSchema = z.object({
  patientId:     z.number().int().positive(),
  appointmentId: z.number().int().positive().optional(),
  date:          z.string().optional(),
  durationMin:   z.number().int().positive().optional(),
  // Estado al inicio
  dolorReferido:        z.number().int().min(0).max(10).optional(),
  movilidadReferida:    z.string().optional(),
  actividadCasa:        z.string().optional(),
  actividadNotas:       z.string().optional(),
  medicacionCambios:    z.string().optional(),
  medicacionDetalle:    z.string().optional(),
  incidenciasDesde:     z.string().optional(),
  observacionesTutor:   z.string().optional(),
  // Exploración rápida
  dolorReposoRapido:     z.number().int().min(0).max(10).optional(),
  dolorMovimientoRapido: z.number().int().min(0).max(10).optional(),
  rangoMovimiento:       z.number().int().min(0).max(10).optional(),
  nivelFuncionalRapido:  z.number().int().min(0).max(10).optional(),
  posturaPeso:           z.string().optional(),
  marchaRapida:          z.string().optional(),
  cojeraGradoRapido:     z.number().int().min(1).max(4).optional(),
  cojeraMiembroRapido:   z.string().optional(),
  tonoMuscular:          z.string().optional(),
  proprioceptiveRapido:  z.string().optional(),
  hallazgosPalpacion:    z.string().optional(),
  // Tratamiento
  tecnicasRealizadas:     z.string().optional(),
  descripcionTratamiento: z.string().optional(),
  // Respuesta
  respuestaInmediata:  z.string().optional(),
  dolorPostSesion:     z.number().int().min(0).max(10).optional(),
  tolerancia:          z.string().optional(),
  observacionesSesion: z.string().optional(),
  // Evolución
  evolucionGeneral:     z.string().optional(),
  objetivosAlcanzados:  z.string().optional(),
  modificacionPlan:     z.string().optional(),
  modificacionDetalle:  z.string().optional(),
  comentariosEvolucion: z.string().optional(),
  // Pautas domiciliarias
  ejerciciosRecomendaciones: z.string().optional(),
  restriccionesActividad:    z.string().optional(),
  calorFrioEnCasa:           z.string().optional(),
  otrasIndicaciones:         z.string().optional(),
  // Próxima sesión
  fechaProximaSesion: z.string().optional(),
  frecuenciaProxima:  z.string().optional(),
  objetivosProxima:   z.string().optional(),
  alertasSigns:       z.string().optional(),
});

// GET /session-followups?patientId=X
router.get('/', async (req, res) => {
  const patientId = req.query.patientId ? Number(req.query.patientId) : undefined;
  const sessions = await prisma.sessionFollowup.findMany({
    where: patientId ? { patientId } : undefined,
    include: { fisio: { select: { id: true, name: true } } },
    orderBy: { date: 'desc' },
  });
  res.json(sessions);
});

// GET /session-followups/:id
router.get('/:id', async (req, res) => {
  const session = await prisma.sessionFollowup.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      fisio: { select: { id: true, name: true } },
      mediaFiles: true,
    },
  });
  if (!session) { res.status(404).json({ error: 'Sesión no encontrada' }); return; }
  res.json(session);
});

// POST /session-followups
router.post('/', async (req: AuthRequest, res) => {
  const parse = sessionSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  // Get next session number for this patient
  const count = await prisma.sessionFollowup.count({
    where: { patientId: parse.data.patientId },
  });

  const data = {
    ...parse.data,
    sessionNumber: count + 1,
    fisioId: req.userId!,
    date: parse.data.date ? new Date(parse.data.date) : new Date(),
    fechaProximaSesion: parse.data.fechaProximaSesion
      ? new Date(parse.data.fechaProximaSesion)
      : undefined,
  };

  const session = await prisma.sessionFollowup.create({
    data,
    include: { fisio: { select: { id: true, name: true } } },
  });
  res.status(201).json(session);
});

// PATCH /session-followups/:id
router.patch('/:id', async (req: AuthRequest, res) => {
  const parse = sessionSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const data: Record<string, unknown> = { ...parse.data };
  if (parse.data.date) data.date = new Date(parse.data.date as string);
  if (parse.data.fechaProximaSesion) data.fechaProximaSesion = new Date(parse.data.fechaProximaSesion as string);

  const session = await prisma.sessionFollowup.update({
    where: { id: Number(req.params.id) },
    data,
    include: { fisio: { select: { id: true, name: true } } },
  });
  res.json(session);
});

// DELETE /session-followups/:id
router.delete('/:id', async (_req, res) => {
  await prisma.sessionFollowup.delete({ where: { id: Number(_req.params.id) } });
  res.json({ ok: true });
});

export default router;
