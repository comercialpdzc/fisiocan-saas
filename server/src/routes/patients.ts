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
      appointments: {
        orderBy: { date: 'desc' },
        take: 10,
        include: {
          appointmentPatients: { include: { patient: { select: { id: true, name: true } } } },
        },
      },
      rehabRoutines: { include: { routine: true } },
      evaluation: true,
    },
  });
  if (!patient) { res.status(404).json({ error: 'Paciente no encontrado' }); return; }
  res.json(patient);
});

// GET /patients/:id/media
router.get('/:id/media', async (req, res) => {
  const media = await prisma.patientMedia.findMany({
    where: { patientId: Number(req.params.id) },
    orderBy: { takenAt: 'desc' },
  });
  res.json(media);
});

// POST /patients/:id/media
router.post('/:id/media', async (req, res) => {
  const parse = z.object({
    url: z.string().url(),
    mediaType: z.enum(['photo', 'video']).default('photo'),
    caption: z.string().optional(),
    takenAt: z.string().optional(),
  }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const media = await prisma.patientMedia.create({
    data: {
      patientId: Number(req.params.id),
      url: parse.data.url,
      mediaType: parse.data.mediaType ?? 'photo',
      caption: parse.data.caption,
      takenAt: parse.data.takenAt ? new Date(parse.data.takenAt) : new Date(),
    },
  });
  res.status(201).json(media);
});

// DELETE /patients/:id/media/:mediaId
router.delete('/:id/media/:mediaId', async (req, res) => {
  await prisma.patientMedia.delete({ where: { id: Number(req.params.mediaId) } });
  res.json({ ok: true });
});

// GET /patients/:id/followup  — admin view of portal follow-up
router.get('/:id/followup', async (req, res) => {
  const media = await prisma.followUpMedia.findMany({
    where: { patientId: Number(req.params.id) },
    orderBy: { createdAt: 'desc' },
  });
  res.json(media);
});

const patientSchema = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
  weight: z.string().optional(),
  sex: z.string().optional(),
  neutered: z.string().optional(),
  diseases: z.string().optional(),
  allergies: z.string().optional(),
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
  const parse = z.object({ active: z.boolean() }).safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: 'active debe ser booleano' }); return; }
  const patient = await prisma.patient.update({
    where: { id: Number(req.params.id) },
    data: { active: parse.data.active },
  });
  res.json(patient);
});

// DELETE /patients/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.intakeData.deleteMany({ where: { patientId: id } });
  await prisma.patientRoutine.deleteMany({ where: { patientId: id } });
  await prisma.plan.deleteMany({ where: { patientId: id } });
  await prisma.mediaFile.deleteMany({ where: { patientId: id } });
  await prisma.patientMedia.deleteMany({ where: { patientId: id } });
  await prisma.followUpMedia.deleteMany({ where: { patientId: id } });
  await prisma.appointmentPatient.deleteMany({ where: { patientId: id } });
  await prisma.sessionFollowup.deleteMany({ where: { patientId: id } });
  await prisma.patientEvaluation.deleteMany({ where: { patientId: id } });
  await prisma.appointment.deleteMany({ where: { patientId: id } });
  await prisma.patient.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
