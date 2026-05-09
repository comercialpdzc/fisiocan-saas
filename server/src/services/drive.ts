/**
 * Google Drive upload service.
 *
 * Required env vars (set in .env and Vercel/Cloud Run secrets):
 *   GOOGLE_DRIVE_CLIENT_ID
 *   GOOGLE_DRIVE_CLIENT_SECRET
 *   GOOGLE_DRIVE_REFRESH_TOKEN
 *   GOOGLE_DRIVE_FOLDER_ID   (root folder ID for FisioCan)
 *
 * If Drive is not configured the service returns null and the caller
 * should fall back to Vercel Blob.
 */

import { Readable } from 'stream';

let drive: import('googleapis').drive_v3.Drive | null = null;

async function getDrive() {
  if (drive) return drive;

  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
  } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    return null;
  }

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    drive = google.drive({ version: 'v3', auth });
    return drive;
  } catch {
    return null;
  }
}

/**
 * Ensure a folder exists under the given parent; returns its ID.
 * Creates it if not found.
 */
async function ensureFolder(
  d: import('googleapis').drive_v3.Drive,
  name: string,
  parentId: string,
): Promise<string> {
  const res = await d.files.list({
    q: `name='${name.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`,
    fields: 'files(id)',
    spaces: 'drive',
  });
  if (res.data.files?.length) return res.data.files[0].id!;

  const folder = await d.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
  });
  return folder.data.id!;
}

export interface DriveUploadResult {
  driveFileId: string;
  driveUrl: string;
  thumbnailUrl: string | null;
}

export type DriveContext = 'evaluation' | 'session' | 'followup' | 'brain' | 'general';

/**
 * Upload a file buffer to the correct Drive subfolder.
 *
 * @param buffer      File bytes
 * @param mimeType    MIME type of the file
 * @param filename    Desired filename in Drive
 * @param patientName Patient name (used to build folder path), or null
 * @param context     Where this file belongs (evaluation|session|followup|brain)
 * @param sessionNum  Session number — used when context is 'session'
 */
export async function uploadToDrive(
  buffer: Buffer,
  mimeType: string,
  filename: string,
  patientName: string | null,
  context: DriveContext,
  sessionNum?: number,
): Promise<DriveUploadResult | null> {
  const d = await getDrive();
  if (!d) return null;

  const rootId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootId) return null;

  try {
    let folderId = rootId;

    if (context === 'brain') {
      const cerebroId = await ensureFolder(d, 'Cerebro', rootId);
      folderId = await ensureFolder(d, 'archivos-conocimiento', cerebroId);
    } else if (patientName) {
      const pacientesId = await ensureFolder(d, 'Pacientes', rootId);
      const patientId = await ensureFolder(d, patientName, pacientesId);

      if (context === 'evaluation') {
        const evalId = await ensureFolder(d, 'Primera evaluación', patientId);
        const mediaType = mimeType.startsWith('video') ? 'videos' : 'fotos';
        folderId = await ensureFolder(d, mediaType, evalId);
      } else if (context === 'session' && sessionNum !== undefined) {
        const seguimientoId = await ensureFolder(d, 'Seguimiento', patientId);
        const sessionFolderId = await ensureFolder(d, `Sesión ${sessionNum}`, seguimientoId);
        const mediaType = mimeType.startsWith('video') ? 'videos' : 'fotos';
        folderId = await ensureFolder(d, mediaType, sessionFolderId);
      } else if (context === 'followup') {
        folderId = await ensureFolder(d, 'Seguimiento', patientId);
      } else {
        folderId = patientId;
      }
    }

    const readable = Readable.from(buffer);
    const file = await d.files.create({
      requestBody: { name: filename, parents: [folderId] },
      media: { mimeType, body: readable },
      fields: 'id,webViewLink,webContentLink,thumbnailLink',
    });

    // Make file publicly readable
    await d.permissions.create({
      fileId: file.data.id!,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    const driveUrl = `https://lh3.googleusercontent.com/d/${file.data.id}`;

    const thumbnailUrl = file.data.thumbnailLink ?? null;

    return { driveFileId: file.data.id!, driveUrl, thumbnailUrl };
  } catch (err) {
    console.error('Drive upload error:', err);
    return null;
  }
}
