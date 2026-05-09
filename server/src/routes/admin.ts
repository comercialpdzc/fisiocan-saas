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
// Scans patients for any profile photo / existing image URLs and uploads them
router.post('/sync-patient-photos', async (_req, res) => {
  const patients = await prisma.patient.findMany({
    include: { tutor: true },
  });

  let synced = 0;
  let skipped = 0;

  for (const patient of patients) {
    // Check if patient already has media files in drive
    const existing = await prisma.mediaFile.findFirst({
      where: { patientId: patient.id, driveFileId: { not: null } },
    });
    if (existing) { skipped++; continue; }

    // Check if patient has a photoUrl field (if it exists on the model)
    const photoUrl = (patient as Record<string, unknown>).photoUrl as string | undefined;
    if (!photoUrl) { skipped++; continue; }

    try {
      const resp = await fetch(photoUrl);
      if (!resp.ok) { skipped++; continue; }

      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = photoUrl.split('.').pop()?.split('?')[0] ?? 'jpg';
      const mime = 'image/jpeg';
      const filename = `foto-perfil.${ext}`;

      const result = await uploadToDrive(buffer, mime, filename, patient.name, 'general');
      if (result) {
        await prisma.mediaFile.create({
          data: {
            patientId:   patient.id,
            driveFileId: result.driveFileId,
            driveUrl:    result.driveUrl,
            thumbnailUrl: result.thumbnailUrl,
            fileType:    'image',
            originType:  'general',
            description: 'Foto de perfil migrada',
          },
        });
        synced++;
      }
    } catch {
      skipped++;
    }
  }

  res.json({ total: patients.length, synced, skipped });
});

export default router;
