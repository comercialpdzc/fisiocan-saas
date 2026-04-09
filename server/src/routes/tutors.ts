import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/', async (_req, res) => {
  const tutors = await prisma.tutor.findMany({
    include: { _count: { select: { patients: true } } },
    orderBy: { name: 'asc' },
  });
  res.json(tutors);
});

router.get('/:id', async (req, res) => {
  const tutor = await prisma.tutor.findUnique({
    where: { id: Number(req.params.id) },
    include: { patients: true },
  });
  if (!tutor) { res.status(404).json({ error: 'Tutor no encontrado' }); return; }
  res.json(tutor);
});

const tutorSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  howFoundUs: z.string().optional(),
});

router.post('/', async (req, res) => {
  const parse = tutorSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const tutor = await prisma.tutor.create({ data: parse.data });
  res.status(201).json(tutor);
});

router.patch('/:id', async (req, res) => {
  const parse = tutorSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const tutor = await prisma.tutor.update({ where: { id: Number(req.params.id) }, data: parse.data });
  res.json(tutor);
});

export default router;
