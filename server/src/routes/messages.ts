import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();


router.use(requireAuth);

// GET messages for a tutor conversation
router.get('/tutor/:tutorId', async (req, res) => {
  const messages = await prisma.message.findMany({
    where: { tutorId: Number(req.params.tutorId) },
    orderBy: { createdAt: 'asc' },
    include: { fisio: { select: { id: true, name: true } }, tutor: { select: { id: true, name: true } } },
  });
  res.json(messages);
});

// GET all conversations (last message per tutor)
router.get('/conversations', async (_req, res) => {
  const tutors = await prisma.tutor.findMany({
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      _count: { select: { patients: true } },
    },
    orderBy: { name: 'asc' },
  });
  res.json(tutors);
});

const msgSchema = z.object({
  body: z.string().min(1),
  tutorId: z.number().int().positive(),
});

// PATCH mark tutor messages as read
router.patch('/read/:tutorId', async (req, res) => {
  await prisma.message.updateMany({
    where: { tutorId: Number(req.params.tutorId), fromTutor: true, readAt: null },
    data: { readAt: new Date() },
  });
  res.json({ ok: true });
});

// GET unread counts per tutor
router.get('/unread', async (_req, res) => {
  const counts = await prisma.message.groupBy({
    by: ['tutorId'],
    where: { fromTutor: true, readAt: null },
    _count: { id: true },
  });
  res.json(counts);
});

// POST message from fisio to tutor
router.post('/', async (req: AuthRequest, res) => {
  const parse = msgSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const msg = await prisma.message.create({
    data: { ...parse.data, fisioId: req.userId!, fromTutor: false },
    include: { fisio: { select: { id: true, name: true } } },
  });
  res.status(201).json(msg);
});

export default router;
