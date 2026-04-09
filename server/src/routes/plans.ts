import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { prisma } from '../db';

const router = Router();
router.use(requireAuth);

const planSchema = z.object({
  title:     z.string().min(1),
  type:      z.enum(['EXERCISE', 'NUTRITION', 'GENERAL']),
  content:   z.string().min(1),
  patientId: z.number().int().positive(),
  pinned:    z.boolean().optional(),
});

router.get('/', async (req, res) => {
  const { patientId } = req.query;
  const plans = await prisma.plan.findMany({
    where: patientId ? { patientId: Number(patientId) } : {},
    include: { patient: { select: { id: true, name: true } }, createdBy: { select: { id: true, name: true } } },
    orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
  });
  res.json(plans);
});

router.get('/:id', async (req, res) => {
  const plan = await prisma.plan.findUnique({
    where: { id: Number(req.params.id) },
    include: { patient: true, createdBy: { select: { id: true, name: true } } },
  });
  if (!plan) { res.status(404).json({ error: 'Plan no encontrado' }); return; }
  res.json(plan);
});

router.post('/', async (req: AuthRequest, res) => {
  const parse = planSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const plan = await prisma.plan.create({
    data: { ...parse.data, createdById: req.userId! },
    include: { patient: true },
  });
  res.status(201).json(plan);
});

router.patch('/:id', async (req, res) => {
  const parse = planSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const plan = await prisma.plan.update({ where: { id: Number(req.params.id) }, data: parse.data });
  res.json(plan);
});

router.delete('/:id', async (req, res) => {
  await prisma.plan.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
