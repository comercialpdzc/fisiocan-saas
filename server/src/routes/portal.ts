/**
 * Portal del cliente (tutor)
 * - POST /api/portal/auth/login    → tutor login
 * - POST /api/portal/auth/setup    → admin crea credenciales para un tutor
 * - GET  /api/portal/me            → datos del tutor autenticado + pacientes
 * - GET  /api/portal/plans         → planes asignados a sus pacientes
 * - GET  /api/portal/routines      → rutinas asignadas a sus pacientes
 * - GET  /api/portal/messages      → conversación con María
 * - POST /api/portal/messages      → tutor envía mensaje
 * - GET  /api/portal/appointments  → próximas citas de sus pacientes
 */
import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// ── Portal JWT middleware ───────────────────────────────────────────────────
interface PortalRequest extends Request { tutorId?: number; }

function requirePortalAuth(req: PortalRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) { res.status(401).json({ error: 'No autorizado' }); return; }
  try {
    const p = jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as { tutorId: number; type: string };
    if (p.type !== 'portal') throw new Error('wrong token type');
    req.tutorId = p.tutorId;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// ── Admin: crear / cambiar credenciales de portal para un tutor ─────────────
router.post('/auth/setup', requireAuth, async (req: AuthRequest, res) => {
  const parse = z.object({ tutorId: z.number(), email: z.string().email(), password: z.string().min(6) }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const { tutorId, email, password } = parse.data;
  const hash = await bcrypt.hash(password, 10);
  const tutor = await prisma.tutor.update({
    where: { id: tutorId },
    data: { portalEmail: email, portalPassword: hash },
  });
  res.json({ ok: true, tutorId: tutor.id, portalEmail: tutor.portalEmail });
});

// ── Google login ───────────────────────────────────────────────────────────
router.post('/auth/google', async (req, res) => {
  const { credential } = req.body;
  if (!credential) { res.status(400).json({ error: 'Token requerido' }); return; }

  // Verify with Google tokeninfo
  const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
  if (!googleRes.ok) { res.status(401).json({ error: 'Token de Google inválido' }); return; }

  const payload = await googleRes.json() as { aud?: string; email?: string; email_verified?: string };

  if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
    res.status(401).json({ error: 'Token no válido para esta aplicación' }); return;
  }
  if (!payload.email || payload.email_verified !== 'true') {
    res.status(401).json({ error: 'Email de Google no verificado' }); return;
  }

  const tutor = await prisma.tutor.findFirst({
    where: { OR: [{ portalEmail: payload.email }, { email: payload.email }] },
  });

  if (!tutor) {
    res.status(401).json({ error: 'No encontramos una cuenta asociada a ese Gmail. Contacta con tu fisioterapeuta.' }); return;
  }

  const token = jwt.sign({ tutorId: tutor.id, type: 'portal' }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  res.json({ token, tutor: { id: tutor.id, name: tutor.name, email: tutor.portalEmail ?? tutor.email } });
});

// ── Tutor login ────────────────────────────────────────────────────────────
router.post('/auth/login', async (req, res) => {
  const parse = z.object({ email: z.string().email(), password: z.string() }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: 'Datos inválidos' }); return; }
  const tutor = await prisma.tutor.findFirst({ where: { portalEmail: parse.data.email } });
  if (!tutor || !tutor.portalPassword || !(await bcrypt.compare(parse.data.password, tutor.portalPassword))) {
    res.status(401).json({ error: 'Credenciales incorrectas' });
    return;
  }
  const token = jwt.sign({ tutorId: tutor.id, type: 'portal' }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  res.json({ token, tutor: { id: tutor.id, name: tutor.name, email: tutor.portalEmail } });
});

// ── Protected portal routes ────────────────────────────────────────────────
router.get('/me', requirePortalAuth, async (req: PortalRequest, res) => {
  const tutor = await prisma.tutor.findUnique({
    where: { id: req.tutorId },
    include: {
      patients: {
        where: { active: true },
        include: {
          rehabRoutines: { include: { routine: true } },
          appointments: { where: { date: { gte: new Date() }, status: 'SCHEDULED' }, orderBy: { date: 'asc' }, take: 3 },
          _count: { select: { plans: true } },
        },
      },
    },
  });
  if (tutor) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { portalPassword: _omit, ...safeTutor } = tutor;
    res.json(safeTutor);
  } else {
    res.json(tutor);
  }
});

router.get('/plans', requirePortalAuth, async (req: PortalRequest, res) => {
  const patients = await prisma.patient.findMany({ where: { tutorId: req.tutorId }, select: { id: true } });
  const ids = patients.map(p => p.id);
  const plans = await prisma.plan.findMany({
    where: { patientId: { in: ids } },
    include: { patient: { select: { id: true, name: true } }, createdBy: { select: { name: true } } },
    orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
  });
  res.json(plans);
});

router.get('/routines', requirePortalAuth, async (req: PortalRequest, res) => {
  const patients = await prisma.patient.findMany({ where: { tutorId: req.tutorId }, select: { id: true, name: true } });
  const ids = patients.map(p => p.id);
  const patientRoutines = await prisma.patientRoutine.findMany({
    where: { patientId: { in: ids } },
    include: { routine: true, patient: { select: { id: true, name: true } } },
    orderBy: { assignedAt: 'desc' },
  });
  res.json(patientRoutines);
});

router.get('/appointments', requirePortalAuth, async (req: PortalRequest, res) => {
  const patients = await prisma.patient.findMany({ where: { tutorId: req.tutorId }, select: { id: true } });
  const ids = patients.map(p => p.id);
  const appts = await prisma.appointment.findMany({
    where: { patientId: { in: ids }, date: { gte: new Date() } },
    include: { patient: { select: { id: true, name: true } } },
    orderBy: { date: 'asc' },
    take: 10,
  });
  res.json(appts);
});

router.get('/messages', requirePortalAuth, async (req: PortalRequest, res) => {
  const messages = await prisma.message.findMany({
    where: { tutorId: req.tutorId },
    orderBy: { createdAt: 'asc' },
    include: { fisio: { select: { name: true } } },
  });
  res.json(messages);
});

router.post('/messages', requirePortalAuth, async (req: PortalRequest, res) => {
  const parse = z.object({ body: z.string().min(1) }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: 'Mensaje vacío' }); return; }
  const msg = await prisma.message.create({
    data: { body: parse.data.body, tutorId: req.tutorId!, fromTutor: true },
  });
  res.status(201).json(msg);
});

export default router;
