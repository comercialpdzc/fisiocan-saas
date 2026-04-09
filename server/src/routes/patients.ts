import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';

const router = Router();


router.use(requireAuth);

// GET /patients
router.get('/', async (_req, res) => {
  const patients = await prisma.patient.findMany({
    include: { tutor: true, _count: { select: { appointments: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(patients);
});

// GET /patients/:id
router.get('/:id', async (req, res) => {
  const patient = await prisma.patient.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      tutor: true,
      intakeData: true,
      appointments: { orderBy: { date: 'desc' }, take: 10 },
      rehabRoutines: { include: { routine: true } },
    },
  });
  if (!patient) { res.status(404).json({ error: 'Paciente no encontrado' }); return; }
  res.json(patient);
});

const patientSchema = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
  weight: z.string().optional(),
  sex: z.string().optional(),
  neutered: z.string().optional(),
  tutorId: z.number().int().positive(),
});

// POST /patients
router.post('/', async (req, res) => {
  const parse = patientSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const patient = await prisma.patient.create({ data: parse.data, include: { tutor: true } });
  res.status(201).json(patient);
});

// PATCH /patients/:id
router.patch('/:id', async (req, res) => {
  const parse = patientSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const patient = await prisma.patient.update({
    where: { id: Number(req.params.id) },
    data: parse.data,
    include: { tutor: true },
  });
  res.json(patient);
});

// PATCH /patients/:id/active
router.patch('/:id/active', async (req, res) => {
  const patient = await prisma.patient.update({
    where: { id: Number(req.params.id) },
    data: { active: req.body.active },
  });
  res.json(patient);
});

export default router;
