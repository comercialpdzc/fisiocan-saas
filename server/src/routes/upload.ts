import { Router } from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';
import { uploadToDrive, DriveContext } from '../services/drive';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

/**
 * POST /api/upload
 * Body (multipart/form-data):
 *   file        — the binary
 *   patientName — optional, for Drive folder routing
 *   context     — optional: evaluation|session|followup|brain|general
 *   sessionNum  — optional: session number (used when context=session)
 */
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) { res.status(400).json({ error: 'No se recibió ningún archivo' }); return; }

  const patientName = (req.body.patientName as string | undefined) ?? null;
  const context = (req.body.context as DriveContext | undefined) ?? 'general';
  const sessionNum = req.body.sessionNum ? Number(req.body.sessionNum) : undefined;

  const ext = req.file.originalname.split('.').pop() ?? 'bin';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // 1. Try Google Drive
  const driveResult = await uploadToDrive(
    req.file.buffer,
    req.file.mimetype,
    filename,
    patientName,
    context,
    sessionNum,
  );

  if (driveResult) {
    res.json({
      url: driveResult.driveUrl,
      driveFileId: driveResult.driveFileId,
      driveUrl: driveResult.driveUrl,
      storage: 'drive',
    });
    return;
  }

  // 2. Fall back to Vercel Blob
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(503).json({ error: 'Almacenamiento no configurado (Drive ni Blob disponibles)' });
    return;
  }

  try {
    const blobPath = `fisiocan/${context}/${filename}`;
    const blob = await put(blobPath, req.file.buffer, {
      access: 'public',
      contentType: req.file.mimetype,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    res.json({ url: blob.url, storage: 'blob' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
});

export default router;
