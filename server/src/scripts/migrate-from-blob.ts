/**
 * Migration script: Download files from Vercel Blob using the SDK API
 * (bypasses CDN, uses the Vercel Blob API endpoint directly)
 *
 * Handles:
 *   - MediaFile (evaluation/session videos)
 *   - PautaMedia (pauta images)
 *
 * Run from server/ directory:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... npx tsx src/scripts/migrate-from-blob.ts
 */

import 'dotenv/config';
import { PrismaClient } from '../generated/prisma';
import { uploadToDrive } from '../services/drive';

const prisma = new PrismaClient();

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function downloadFromBlob(url: string): Promise<Buffer | null> {
  // Try using Authorization header (Vercel Blob API)
  const opts: RequestInit = {
    signal: AbortSignal.timeout(120000),
    headers: BLOB_TOKEN ? { Authorization: `Bearer ${BLOB_TOKEN}` } : {},
  };

  const resp = await fetch(url, opts);
  if (!resp.ok) {
    console.log(`    ✗ HTTP ${resp.status} ${resp.statusText}`);
    return null;
  }
  return Buffer.from(await resp.arrayBuffer());
}

// ─── MediaFile ────────────────────────────────────────────────────────────────

async function migrateMediaFiles() {
  console.log('\n📁  Migrating MediaFile → Google Drive…');

  const files = await prisma.mediaFile.findMany({
    where: { driveFileId: null, localUrl: { not: null } },
    include: { patient: true, session: true },
  });

  console.log(`   Found ${files.length} files`);
  let synced = 0, failed = 0;

  for (const file of files) {
    const url = file.localUrl!;
    console.log(`   ↑  [${file.id}] ${file.patient?.name ?? '?'} — ${url.slice(-50)}`);
    try {
      const buffer = await downloadFromBlob(url);
      if (!buffer) { failed++; continue; }

      const ext = url.split('.').pop()?.split('?')[0] ?? 'bin';
      const mime = file.fileType === 'image' ? 'image/jpeg'
        : file.fileType === 'video' ? 'video/mp4'
        : file.fileType === 'pdf' ? 'application/pdf'
        : 'application/octet-stream';

      const result = await uploadToDrive(
        buffer, mime, `migrated-${file.id}.${ext}`,
        file.patient?.name ?? null,
        (file.originType ?? 'general') as any,
        file.session?.sessionNumber ?? undefined,
      );

      if (result) {
        await prisma.mediaFile.update({
          where: { id: file.id },
          data: { driveFileId: result.driveFileId, driveUrl: result.driveUrl, thumbnailUrl: result.thumbnailUrl },
        });
        console.log(`   ✓  → Drive`);
        synced++;
      } else { console.log(`   ✗  Drive upload returned null`); failed++; }
    } catch (e: any) { console.log(`   ✗  ${e.message}`); failed++; }
  }

  console.log(`   ✅  MediaFile: ${synced} synced, ${failed} failed`);
}

// ─── PautaMedia ───────────────────────────────────────────────────────────────

async function migratePautaMedia() {
  console.log('\n📋  Migrating PautaMedia → Google Drive…');

  const media = await prisma.pautaMedia.findMany({
    include: { pauta: { include: { patient: { select: { name: true } } } } },
  });

  console.log(`   Found ${media.length} images`);
  let synced = 0, skip = 0, failed = 0;

  for (const m of media) {
    if (m.url.includes('googleusercontent') || m.url.includes('drive.google')) {
      console.log(`   ⏭  [${m.id}] already in Drive`); skip++; continue;
    }
    console.log(`   ↑  [${m.id}] ${m.pauta.patient.name} — ${m.url.slice(-50)}`);
    try {
      const buffer = await downloadFromBlob(m.url);
      if (!buffer) { failed++; continue; }

      const ext = m.url.split('.').pop()?.split('?')[0] ?? 'jpg';
      const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
      const result = await uploadToDrive(buffer, mime, `pauta-${m.id}.${ext}`, m.pauta.patient.name, 'general');

      if (result) {
        await prisma.pautaMedia.update({ where: { id: m.id }, data: { url: result.driveUrl } });
        console.log(`   ✓  → Drive`);
        synced++;
      } else { console.log(`   ✗  Drive upload returned null`); failed++; }
    } catch (e: any) { console.log(`   ✗  ${e.message}`); failed++; }
  }

  console.log(`   ✅  PautaMedia: ${synced} synced, ${skip} skipped, ${failed} failed`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🐾  FISIOCAN → Blob to Drive migration');
  console.log(`   BLOB_TOKEN: ${BLOB_TOKEN ? BLOB_TOKEN.slice(0, 20) + '...' : 'NOT SET'}`);
  await migrateMediaFiles();
  await migratePautaMedia();
  console.log('\n✅  Done.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
