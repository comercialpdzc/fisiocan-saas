/**
 * One-shot migration script:
 *   1. Push all existing appointments (without googleEventId) to Google Calendar
 *   2. Push all existing media files (with localUrl, no driveFileId) to Google Drive
 *
 * Run from the server/ directory:
 *   npx tsx src/scripts/migrate-to-google.ts
 */

import 'dotenv/config';
import { PrismaClient } from '../generated/prisma';
import { createCalendarEvent, CalendarEventInput } from '../services/calendar';
import { uploadToDrive, DriveContext } from '../services/drive';

const prisma = new PrismaClient();

// ─── 1. Calendar sync ─────────────────────────────────────────────────────────

async function syncCalendar() {
  console.log('\n📅  Syncing appointments → Google Calendar…');

  const appointments = await prisma.appointment.findMany({
    where: { googleEventId: null },
    include: {
      fisio: { select: { name: true } },
      appointmentPatients: {
        include: { patient: { include: { tutor: true } } },
      },
    },
    orderBy: { date: 'asc' },
  });

  console.log(`   Found ${appointments.length} unsynced appointments`);
  let synced = 0, failed = 0;

  for (const appt of appointments) {
    const allPatients = appt.appointmentPatients.map(ap => ap.patient);
    const firstTutor = allPatients.find(p => p.tutor)?.tutor;

    const input: CalendarEventInput = {
      patientNames: allPatients.length ? allPatients.map(p => p.name) : ['Paciente'],
      tutorName:    firstTutor?.name  ?? 'Sin tutor',
      tutorPhone:   firstTutor?.phone ?? '',
      tutorEmail:   firstTutor?.email ?? null,
      fisioName:    appt.fisio?.name  ?? 'Fisioterapeuta',
      date:         appt.date,
      durationMin:  appt.duration ?? 60,
      notes:        appt.notes ?? null,
      status:       appt.status,
    };

    try {
      const eventId = await createCalendarEvent(input);
      if (eventId) {
        await prisma.appointment.update({ where: { id: appt.id }, data: { googleEventId: eventId } });
        console.log(`   ✓  [${appt.id}] ${allPatients.map(p => p.name).join(', ')} — ${appt.date.toLocaleDateString('es-ES')}`);
        synced++;
      } else {
        // Try direct API call to surface the real error
        try {
          const { google } = await import('googleapis');
          const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
          auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
          const cal = google.calendar({ version: 'v3', auth });
          const test = await cal.calendarList.list({ maxResults: 1 });
          console.log(`   ✗  [${appt.id}] Auth OK (${test.data.items?.length} calendars) but createCalendarEvent returned null. CALENDAR_ID=${process.env.GOOGLE_CALENDAR_ID}`);
        } catch (authErr: unknown) {
          const e = authErr as { message?: string; response?: { data?: unknown } };
          console.log(`   ✗  [${appt.id}] Auth error: ${e.message}`);
          if (e.response?.data) console.log('     ', JSON.stringify(e.response.data));
        }
        failed++;
      }
    } catch (err) {
      console.log(`   ✗  [${appt.id}] Error: ${err}`);
      failed++;
    }
  }

  console.log(`   ✅  Calendar: ${synced} synced, ${failed} failed`);
}

// ─── 2. Drive migration ───────────────────────────────────────────────────────

async function syncDrive() {
  console.log('\n📁  Migrating media files → Google Drive…');

  const files = await prisma.mediaFile.findMany({
    where: { driveFileId: null, localUrl: { not: null } },
    include: { patient: true, session: true },
  });

  console.log(`   Found ${files.length} files to migrate`);
  let synced = 0, failed = 0;

  for (const file of files) {
    try {
      const url = file.localUrl!;
      const resp = await fetch(url);
      if (!resp.ok) {
        console.log(`   ✗  [${file.id}] HTTP ${resp.status} fetching ${url}`);
        failed++;
        continue;
      }

      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = url.split('.').pop()?.split('?')[0] ?? 'bin';
      const mime = file.fileType === 'image' ? 'image/jpeg'
        : file.fileType === 'video' ? 'video/mp4'
        : file.fileType === 'pdf'   ? 'application/pdf'
        : 'application/octet-stream';

      const filename = `migrated-${file.id}.${ext}`;
      const patientName = file.patient?.name ?? null;
      const context: DriveContext = (file.originType as DriveContext) ?? 'general';
      const sessionNum = (file.session as { sessionNumber?: number } | null)?.sessionNumber;

      const result = await uploadToDrive(buffer, mime, filename, patientName, context, sessionNum);
      if (result) {
        await prisma.mediaFile.update({
          where: { id: file.id },
          data: { driveFileId: result.driveFileId, driveUrl: result.driveUrl, thumbnailUrl: result.thumbnailUrl },
        });
        console.log(`   ✓  [${file.id}] ${patientName ?? 'general'} / ${context} → Drive`);
        synced++;
      } else {
        console.log(`   ✗  [${file.id}] Drive upload returned null`);
        failed++;
      }
    } catch (err) {
      console.log(`   ✗  [${file.id}] Error: ${err}`);
      failed++;
    }
  }

  console.log(`   ✅  Drive: ${synced} synced, ${failed} failed`);
}

// ─── 3. Patient profile photos ────────────────────────────────────────────────

async function syncPatientPhotos() {
  console.log('\n🐾  Migrating patient profile photos → Google Drive…');

  const patients = await prisma.patient.findMany({
    where: { photoUrl: { not: null } },
    select: { id: true, name: true, photoUrl: true },
  });

  console.log(`   Found ${patients.length} patients with photos`);
  let synced = 0, failed = 0;

  for (const patient of patients) {
    const url = patient.photoUrl!;
    // Skip if already a Drive URL
    if (url.includes('drive.google.com') || url.includes('googleusercontent.com')) {
      console.log(`   ⏭  [${patient.id}] ${patient.name} — already in Drive`);
      continue;
    }
    try {
      const resp = await fetch(url);
      if (!resp.ok) { console.log(`   ✗  [${patient.id}] HTTP ${resp.status}`); failed++; continue; }
      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const result = await uploadToDrive(buffer, 'image/jpeg', `foto-perfil.${ext}`, patient.name, 'general');
      if (result) {
        await prisma.patient.update({ where: { id: patient.id }, data: { photoUrl: result.driveUrl } });
        console.log(`   ✓  [${patient.id}] ${patient.name} → Drive`);
        synced++;
      } else { console.log(`   ✗  [${patient.id}] Drive upload returned null`); failed++; }
    } catch (err) { console.log(`   ✗  [${patient.id}] Error: ${err}`); failed++; }
  }

  console.log(`   ✅  Patient photos: ${synced} synced, ${failed} failed`);
}

// ─── 4. FollowUpMedia (portal photos) ────────────────────────────────────────

async function syncFollowUpMedia() {
  console.log('\n📸  Migrating portal follow-up photos → Google Drive…');

  // Only migrate Vercel Blob URLs (not already in Drive)
  const media = await prisma.followUpMedia.findMany({
    where: { url: { contains: 'blob.vercel-storage.com' } },
    include: { patient: { select: { name: true } } },
  });

  console.log(`   Found ${media.length} follow-up photos`);
  let synced = 0, failed = 0;

  for (const m of media) {
    try {
      const resp = await fetch(m.url);
      if (!resp.ok) { console.log(`   ✗  [${m.id}] HTTP ${resp.status}`); failed++; continue; }
      const buffer = Buffer.from(await resp.arrayBuffer());
      const ext = m.url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const mime = m.mediaType === 'video' ? 'video/mp4' : 'image/jpeg';
      const result = await uploadToDrive(buffer, mime, `followup-${m.id}.${ext}`, m.patient?.name ?? null, 'followup');
      if (result) {
        await prisma.followUpMedia.update({ where: { id: m.id }, data: { url: result.driveUrl } });
        console.log(`   ✓  [${m.id}] ${m.patient?.name ?? '?'} → Drive${m.caption ? ` (${m.caption})` : ''}`);
        synced++;
      } else { console.log(`   ✗  [${m.id}] Drive upload returned null`); failed++; }
    } catch (err) { console.log(`   ✗  [${m.id}] Error: ${err}`); failed++; }
  }

  console.log(`   ✅  Follow-up photos: ${synced} synced, ${failed} failed`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🐾  FISIOCAN → Google migration script');
  await syncCalendar();
  await syncDrive();
  await syncPatientPhotos();
  await syncFollowUpMedia();
  await prisma.$disconnect();
  console.log('\n✅  Done.');
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
