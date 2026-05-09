import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import * as gmailService from '../services/gmail';

const router = Router();
router.use(requireAuth);

// GET /api/gmail/inbox — list recent emails
router.get('/inbox', async (_req, res) => {
  const messages = await gmailService.listInbox(50);
  if (messages === null) {
    res.status(503).json({ error: 'Gmail no configurado', messages: [], unread: 0 });
    return;
  }
  const unread = messages.filter(m => !m.isRead).length;
  res.json({ messages, unread });
});

// GET /api/gmail/unread-count — fast unread badge
router.get('/unread-count', async (_req, res) => {
  const count = await gmailService.countUnread();
  res.json({ count });
});

// GET /api/gmail/email/:id — full email
router.get('/email/:id', async (req, res) => {
  const message = await gmailService.getMessage(req.params.id);
  if (!message) { res.status(404).json({ error: 'Email no encontrado' }); return; }
  res.json(message);
});

// PATCH /api/gmail/read/:id — mark as read
router.patch('/read/:id', async (req, res) => {
  await gmailService.markAsRead(req.params.id);
  res.json({ ok: true });
});

// POST /api/gmail/send — send new email
const sendSchema = z.object({
  to:      z.string().email(),
  subject: z.string().min(1),
  body:    z.string().min(1),
});

router.post('/send', async (req, res) => {
  const parse = sendSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const messageId = await gmailService.sendEmail(parse.data);
  if (!messageId) { res.status(503).json({ error: 'No se pudo enviar el email (Gmail no configurado)' }); return; }

  // Optionally save/update GmailContact
  try {
    await prisma.gmailContact.upsert({
      where: { email: parse.data.to },
      create: { email: parse.data.to, lastContactAt: new Date() },
      update: { lastContactAt: new Date() },
    });
  } catch { /* ignore */ }

  res.json({ ok: true, messageId });
});

// POST /api/gmail/reply/:threadId — reply to thread
const replySchema = z.object({
  originalMessageId: z.string(),
  to:      z.string().email(),
  subject: z.string().min(1),
  body:    z.string().min(1),
});

router.post('/reply/:threadId', async (req, res) => {
  const parse = replySchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const messageId = await gmailService.replyToThread({
    threadId: req.params.threadId,
    ...parse.data,
  });
  if (!messageId) { res.status(503).json({ error: 'No se pudo enviar la respuesta' }); return; }
  res.json({ ok: true, messageId });
});

// ── GmailContact CRUD ────────────────────────────────────────────────────────

// GET /api/gmail/contacts
router.get('/contacts', async (_req, res) => {
  const contacts = await prisma.gmailContact.findMany({ orderBy: { lastContactAt: 'desc' } });
  res.json(contacts);
});

// POST /api/gmail/contacts
const contactSchema = z.object({
  email: z.string().email(),
  name:  z.string().optional(),
  type:  z.enum(['veterinario', 'tutor', 'otro']).optional(),
  notes: z.string().optional(),
});

router.post('/contacts', async (req, res) => {
  const parse = contactSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const contact = await prisma.gmailContact.upsert({
    where: { email: parse.data.email },
    create: { ...parse.data, lastContactAt: new Date() },
    update: { ...parse.data },
  });
  res.status(201).json(contact);
});

// PATCH /api/gmail/contacts/:id
router.patch('/contacts/:id', async (req, res) => {
  const parse = contactSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }
  const contact = await prisma.gmailContact.update({
    where: { id: Number(req.params.id) },
    data: parse.data,
  });
  res.json(contact);
});

export default router;
