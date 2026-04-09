import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';

const router = Router();


router.use(requireAuth);

// Library of routines
router.get('/', async (_req, res) => {
  const routines = await prisma.rehabRoutine.findMany({ orderBy: { category: 'asc' } });
  res.json(routines);
});

const routineSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  duration: z.number().int().positive().optional(),
  category: z.string().optional(),
});

router.post('/', async (req, res) => {
  const parse = routineSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const routine = await prisma.rehabRoutine.create({ data: parse.data });
  res.status(201).json(routine);
});

router.patch('/:id', async (req, res) => {
  const parse = routineSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const routine = await prisma.rehabRoutine.update({ where: { id: Number(req.params.id) }, data: parse.data });
  res.json(routine);
});

router.delete('/:id', async (req, res) => {
  await prisma.rehabRoutine.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

// Assign routine to patient
router.post('/assign', async (req, res) => {
  const schema = z.object({ patientId: z.number(), routineId: z.number(), notes: z.string().optional() });
  const parse = schema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const pr = await prisma.patientRoutine.create({ data: parse.data, include: { routine: true } });
  res.status(201).json(pr);
});

// Remove routine from patient
router.delete('/assign/:id', async (req, res) => {
  await prisma.patientRoutine.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
