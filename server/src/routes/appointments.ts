import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();


router.use(requireAuth);

router.get('/', async (req: AuthRequest, res) => {
  const { from, to } = req.query;
  const where: Record<string, unknown> = {};
  if (from || to) {
    where.date = {
      ...(from ? { gte: new Date(from as string) } : {}),
      ...(to ? { lte: new Date(to as string) } : {}),
    };
  }
  const appointments = await prisma.appointment.findMany({
    where,
    include: { patient: { include: { tutor: true } }, fisio: { select: { id: true, name: true } } },
    orderBy: { date: 'asc' },
  });
  res.json(appointments);
});

router.get('/:id', async (req, res) => {
  const appt = await prisma.appointment.findUnique({
    where: { id: Number(req.params.id) },
    include: { patient: { include: { tutor: true } }, fisio: { select: { id: true, name: true } } },
  });
  if (!appt) { res.status(404).json({ error: 'Cita no encontrada' }); return; }
  res.json(appt);
});

const apptSchema = z.object({
  date: z.string(),
  duration: z.number().int().positive().optional(),
  notes: z.string().optional(),
  patientId: z.number().int().positive(),
  fisioId: z.number().int().positive(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
});

router.post('/', async (req: AuthRequest, res) => {
  const parse = apptSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const appt = await prisma.appointment.create({
    data: { ...parse.data, date: new Date(parse.data.date), fisioId: parse.data.fisioId ?? req.userId! },
    include: { patient: { include: { tutor: true } }, fisio: { select: { id: true, name: true } } },
  });
  res.status(201).json(appt);
});

router.patch('/:id', async (req, res) => {
  const parse = apptSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const data: Record<string, unknown> = { ...parse.data };
  if (parse.data.date) data.date = new Date(parse.data.date);
  const appt = await prisma.appointment.update({
    where: { id: Number(req.params.id) },
    data,
    include: { patient: { include: { tutor: true } }, fisio: { select: { id: true, name: true } } },
  });
  res.json(appt);
});

router.delete('/:id', async (req, res) => {
  await prisma.appointment.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
