/**
 * Pautas domiciliarias
 * - GET    /api/pautas?patientId=X      → lista del paciente (incluye media)
 * - POST   /api/pautas                  → crear pauta
 * - GET    /api/pautas/:id              → detalle
 * - PUT    /api/pautas/:id              → actualizar
 * - DELETE /api/pautas/:id              → eliminar
 * - POST   /api/pautas/:id/media        → añadir imagen (url + caption)
 * - DELETE /api/pautas/:id/media/:mid   → borrar imagen
 */

import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// ── List ─────────────────────────────────────────────────────────────────────
router.get('/', requireAuth, async (req, res) => {
  const patientId = Number(req.query.patientId);
  if (!patientId) return res.status(400).json({ error: 'patientId requerido' });

  const pautas = await prisma.patientPauta.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, title: true, weekRange: true, notes: true, createdAt: true, updatedAt: true, showInPortal: true, htmlContent: true,
      media: { orderBy: { createdAt: 'asc' }, select: { id: true, url: true, caption: true, createdAt: true } },
    },
  });
  res.json(pautas);
});

// ── Detail (includes htmlContent) ────────────────────────────────────────────
router.get('/:id', requireAuth, async (req, res) => {
  const pauta = await prisma.patientPauta.findUnique({ where: { id: Number(req.params.id) } });
  if (!pauta) return res.status(404).json({ error: 'No encontrada' });
  res.json(pauta);
});

// ── Serve HTML directly (for iframe / print) ─────────────────────────────────
router.get('/:id/html', requireAuth, async (req, res) => {
  const pauta = await prisma.patientPauta.findUnique({
    where: { id: Number(req.params.id) },
    select: { htmlContent: true, title: true },
  });
  if (!pauta) return res.status(404).send('Not found');
  if (!pauta.htmlContent) return res.status(404).send('Sin contenido HTML');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(pauta.htmlContent);
});

// ── Create ────────────────────────────────────────────────────────────────────
const CreateSchema = z.object({
  patientId:    z.number().int().positive(),
  title:        z.string().min(1),
  weekRange:    z.string().min(1),
  notes:        z.string().optional(),
  htmlContent:  z.string().optional(),
  builderData:  z.string().optional(),
  showInPortal: z.boolean().optional(),
});

router.post('/', requireAuth, async (req, res) => {
  const parse = CreateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const pauta = await prisma.patientPauta.create({ data: parse.data });
  res.status(201).json(pauta);
});

// ── Update ────────────────────────────────────────────────────────────────────
const UpdateSchema = CreateSchema.partial().omit({ patientId: true });

router.put('/:id', requireAuth, async (req, res) => {
  const parse = UpdateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const pauta = await prisma.patientPauta.update({
    where: { id: Number(req.params.id) },
    data: parse.data,
  });
  res.json(pauta);
});

// ── Toggle showInPortal ───────────────────────────────────────────────────────
router.patch('/:id/portal', requireAuth, async (req, res) => {
  const current = await prisma.patientPauta.findUnique({ where: { id: Number(req.params.id) }, select: { showInPortal: true } });
  if (!current) return res.status(404).json({ error: 'No encontrada' });
  const pauta = await prisma.patientPauta.update({
    where: { id: Number(req.params.id) },
    data: { showInPortal: !current.showInPortal },
  });
  res.json({ showInPortal: pauta.showInPortal });
});

// ── Delete pauta ─────────────────────────────────────────────────────────────
router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.patientPauta.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
});

// ── Add media image ──────────────────────────────────────────────────────────
const MediaSchema = z.object({
  url:     z.string().url(),
  caption: z.string().optional(),
});

router.post('/:id/media', requireAuth, async (req, res) => {
  const parse = MediaSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const media = await prisma.pautaMedia.create({
    data: { pautaId: Number(req.params.id), ...parse.data },
  });
  res.status(201).json(media);
});

// ── Delete media image ────────────────────────────────────────────────────────
router.delete('/:id/media/:mid', requireAuth, async (req, res) => {
  await prisma.pautaMedia.delete({ where: { id: Number(req.params.mid) } });
  res.json({ ok: true });
});

export default router;
