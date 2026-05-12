/**
 * One-shot admin sync endpoints.
 * POST /api/admin/sync-calendar  — push all existing appointments to Google Calendar
 * POST /api/admin/sync-drive     — migrate all existing media files to Google Drive
 */

import { Router } from 'express';
import { prisma } from '../db';
import { requireAuth } from '../middleware/auth';
import { createCalendarEvent, CalendarEventInput } from '../services/calendar';
import { uploadToDrive, DriveContext } from '../services/drive';

const router = Router();
router.use(requireAuth);

// ── POST /api/admin/sync-calendar ─────────────────────────────────────────────
router.post('/sync-calendar', async (_req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { googleEventId: null },
    include: {
      fisio: { select: { name: true } },
      appointmentPatients: {
        include: { patient: { include: { tutor: true } } },
      },
    },
  });

  let synced = 0;
  let failed = 0;

  for (const appt of appointments) {
    const allPatients = appt.appointmentPatients.map(ap => ap.patient);
    const firstTutor = allPatients.find(p => p.tutor)?.tutor;

    const input: CalendarEventInput = {
      patientNames: allPatients.map(p => p.name),
      tutorName:    firstTutor?.name   ?? 'Sin tutor',
      tutorPhone:   firstTutor?.phone  ?? '',
      tutorEmail:   firstTutor?.email  ?? null,
      fisioName:    appt.fisio?.name   ?? 'Fisioterapeuta',
      date:         appt.date,
      durationMin:  appt.duration ?? 60,
      notes:        appt.notes ?? null,
      status:       appt.status,
    };

    try {
      const eventId = await createCalendarEvent(input);
      if (eventId) {
        await prisma.appointment.update({
          where: { id: appt.id },
          data: { googleEventId: eventId },
        });
        synced++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  res.json({ total: appointments.length, synced, failed });
});

// ── POST /api/admin/sync-drive ────────────────────────────────────────────────
router.post('/sync-drive', async (_req, res) => {
  // Find all MediaFile rows that have a localUrl but no driveFileId
  const files = await prisma.mediaFile.findMany({
    where: { driveFileId: null, localUrl: { not: null } },
    include: {
      patient: true,
      session: true,
    },
  });

  let synced = 0;
  let failed = 0;

  for (const file of files) {
    try {
      const url = file.localUrl!;
      const resp = await fetch(url);
      if (!resp.ok) { failed++; continue; }

      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = url.split('.').pop()?.split('?')[0] ?? 'bin';
      const mime = file.fileType === 'image' ? 'image/jpeg'
        : file.fileType === 'video' ? 'video/mp4'
        : file.fileType === 'pdf'   ? 'application/pdf'
        : 'application/octet-stream';

      const filename = `${Date.now()}-migrated.${ext}`;
      const patientName = file.patient?.name ?? null;
      const context: DriveContext = (file.originType as DriveContext) ?? 'general';
      const sessionNum = file.session?.sessionNumber ?? undefined;

      const result = await uploadToDrive(buffer, mime, filename, patientName, context, sessionNum);
      if (result) {
        await prisma.mediaFile.update({
          where: { id: file.id },
          data: {
            driveFileId:  result.driveFileId,
            driveUrl:     result.driveUrl,
            thumbnailUrl: result.thumbnailUrl,
          },
        });
        synced++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  res.json({ total: files.length, synced, failed });
});

// ── POST /api/admin/sync-patient-photos ──────────────────────────────────────
// Migrates patient profile photos (non-Drive URLs) to Google Drive
router.post('/sync-patient-photos', async (_req, res) => {
  const patients = await prisma.patient.findMany({
    where: { photoUrl: { not: null } },
    select: { id: true, name: true, photoUrl: true },
  });

  let synced = 0, skipped = 0, failed = 0;

  for (const patient of patients) {
    const url = patient.photoUrl!;
    if (url.includes('googleusercontent.com') || url.includes('drive.google.com')) {
      skipped++; continue;
    }
    try {
      const resp = await fetch(url);
      if (!resp.ok) { failed++; continue; }
      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const result = await uploadToDrive(buffer, 'image/jpeg', `foto-perfil.${ext}`, patient.name, 'general');
      if (result) {
        await prisma.patient.update({ where: { id: patient.id }, data: { photoUrl: result.driveUrl } });
        synced++;
      } else { failed++; }
    } catch { failed++; }
  }

  res.json({ total: patients.length, synced, skipped, failed });
});

// ── POST /api/admin/sync-followup-media ──────────────────────────────────────
// Migrates FollowUpMedia (portal photos sent by tutors) to Google Drive
router.post('/sync-followup-media', async (_req, res) => {
  const media = await prisma.followUpMedia.findMany({
    where: { url: { not: { contains: 'googleusercontent.com' } } },
    include: { patient: { select: { name: true } } },
  });

  let synced = 0, skipped = 0, failed = 0;

  for (const m of media) {
    if (m.url.includes('googleusercontent.com') || m.url.includes('drive.google.com')) {
      skipped++; continue;
    }
    try {
      const resp = await fetch(m.url);
      if (!resp.ok) { failed++; continue; }
      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = m.url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const mime = m.mediaType === 'video' ? 'video/mp4' : 'image/jpeg';
      const result = await uploadToDrive(buffer, mime, `followup-${m.id}.${ext}`, m.patient?.name ?? null, 'followup');
      if (result) {
        await prisma.followUpMedia.update({ where: { id: m.id }, data: { url: result.driveUrl } });
        synced++;
      } else { failed++; }
    } catch { failed++; }
  }

  res.json({ total: media.length, synced, skipped, failed });
});

// ── POST /api/admin/sync-patient-media ───────────────────────────────────────
// Migrates PatientMedia (patient gallery photos/videos) to Google Drive
router.post('/sync-patient-media', async (_req, res) => {
  const media = await prisma.patientMedia.findMany({
    where: { url: { not: { contains: 'googleusercontent.com' } } },
    include: { patient: { select: { name: true } } },
  });

  let synced = 0, skipped = 0, failed = 0;

  for (const m of media) {
    if (m.url.includes('googleusercontent.com') || m.url.includes('drive.google.com')) {
      skipped++; continue;
    }
    try {
      const resp = await fetch(m.url);
      if (!resp.ok) { failed++; continue; }
      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = m.url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const mime = m.mediaType === 'video' ? 'video/mp4' : 'image/jpeg';
      const result = await uploadToDrive(buffer, mime, `media-${m.id}.${ext}`, m.patient.name, 'general');
      if (result) {
        await prisma.patientMedia.update({ where: { id: m.id }, data: { url: result.driveUrl } });
        synced++;
      } else { failed++; }
    } catch { failed++; }
  }

  res.json({ total: media.length, synced, skipped, failed });
});

// ── POST /api/admin/sync-pauta-media ─────────────────────────────────────────
// Migrates PautaMedia (pauta guide images) to Google Drive
router.post('/sync-pauta-media', async (_req, res) => {
  const media = await prisma.pautaMedia.findMany({
    where: { url: { not: { contains: 'googleusercontent.com' } } },
    include: { pauta: { include: { patient: { select: { name: true } } } } },
  });

  let synced = 0, skipped = 0, failed = 0;

  for (const m of media) {
    if (m.url.includes('googleusercontent.com') || m.url.includes('drive.google.com')) {
      skipped++; continue;
    }
    try {
      const resp = await fetch(m.url);
      if (!resp.ok) { failed++; continue; }
      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = m.url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const result = await uploadToDrive(buffer, 'image/jpeg', `pauta-${m.id}.${ext}`, m.pauta.patient.name, 'general');
      if (result) {
        await prisma.pautaMedia.update({ where: { id: m.id }, data: { url: result.driveUrl } });
        synced++;
      } else { failed++; }
    } catch { failed++; }
  }

  res.json({ total: media.length, synced, skipped, failed });
});

// ── POST /api/admin/test-fetch ────────────────────────────────────────────────
// Temporary debug endpoint: tests if Cloud Run can fetch a URL
router.post('/test-fetch', async (req, res) => {
  const { url } = req.body as { url?: string };
  if (!url) { res.status(400).json({ error: 'url required' }); return; }
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(15000) });
    res.json({ status: resp.status, ok: resp.ok, contentType: resp.headers.get('content-type'), contentLength: resp.headers.get('content-length') });
  } catch (e: any) {
    res.json({ error: e.message, cause: String(e.cause ?? '') });
  }
});

export default router;
