/**
 * POST /api/drive/upload
 *
 * Uploads a file to Google Drive and saves a MediaFile record to the DB.
 * Falls back to Vercel Blob if Drive is not configured.
 *
 * Body (multipart/form-data):
 *   file         — binary
 *   patientId    — optional number
 *   sessionId    — optional number
 *   evaluationId — optional number
 *   tutorId      — optional number
 *   patientName  — optional string (for Drive folder routing)
 *   type         — evaluation | followup | cerebro | tutor | general
 *   description  — optional string
 */

import { Router } from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';
import { prisma } from '../db';
import { uploadToDrive, DriveContext } from '../services/drive';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 } });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) { res.status(400).json({ error: 'No se recibió ningún archivo' }); return; }

  const {
    patientId, sessionId, evaluationId, tutorId,
    patientName, type, description,
  } = req.body as Record<string, string | undefined>;

  const context: DriveContext = (type as DriveContext | undefined) ?? 'general';
  const sessionNum = sessionId ? Number(sessionId) : undefined;

  // Determine fileType from mime
  const mime = req.file.mimetype;
  const fileType = mime.startsWith('image/') ? 'image'
    : mime.startsWith('video/') ? 'video'
    : mime === 'application/pdf' ? 'pdf'
    : 'document';

  const ext = req.file.originalname.split('.').pop() ?? 'bin';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  let driveFileId: string | null = null;
  let driveUrl: string | null = null;
  let thumbnailUrl: string | null = null;
  let localUrl: string | null = null;

  // 1. Try Google Drive
  const driveResult = await uploadToDrive(
    req.file.buffer, mime, filename,
    patientName ?? null, context, sessionNum,
  );

  if (driveResult) {
    driveFileId = driveResult.driveFileId;
    driveUrl    = driveResult.driveUrl;
    thumbnailUrl = driveResult.thumbnailUrl;
  } else {
    // 2. Fall back to Vercel Blob
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      res.status(503).json({ error: 'Almacenamiento no configurado' });
      return;
    }
    try {
      const blob = await put(`fisiocan/${context}/${filename}`, req.file.buffer, {
        access: 'public',
        contentType: mime,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      localUrl = blob.url;
    } catch {
      res.status(500).json({ error: 'Error al subir el archivo' });
      return;
    }
  }

  // 3. Save MediaFile record
  let mediaFile;
  try {
    mediaFile = await prisma.mediaFile.create({
      data: {
        patientId:    patientId    ? Number(patientId)    : null,
        sessionId:    sessionId    ? Number(sessionId)    : null,
        evaluationId: evaluationId ? Number(evaluationId) : null,
        tutorId:      tutorId      ? Number(tutorId)      : null,
        driveFileId,
        driveUrl,
        thumbnailUrl,
        localUrl,
        fileType,
        originType: context,
        description: description ?? null,
      },
    });
  } catch (err) {
    console.error('MediaFile create error:', err);
    // Don't fail the upload if DB save fails — still return the URL
  }

  res.json({
    id: mediaFile?.id,
    driveFileId,
    driveUrl:     driveUrl ?? localUrl,
    thumbnailUrl: thumbnailUrl ?? driveUrl ?? localUrl,
    url:          driveUrl ?? localUrl,
    fileType,
    storage:      driveUrl ? 'drive' : 'blob',
  });
});

/**
 * GET /api/drive/files?patientId=&sessionId=&evaluationId=
 * Returns MediaFile records for given context.
 */
router.get('/files', async (req, res) => {
  const { patientId, sessionId, evaluationId, originType } = req.query;
  const where: Record<string, unknown> = {};
  if (patientId)    where.patientId    = Number(patientId);
  if (sessionId)    where.sessionId    = Number(sessionId);
  if (evaluationId) where.evaluationId = Number(evaluationId);
  if (originType)   where.originType   = String(originType);

  const files = await prisma.mediaFile.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  res.json(files);
});

/**
 * DELETE /api/drive/files/:id
 */
router.delete('/files/:id', async (req, res) => {
  await prisma.mediaFile.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
