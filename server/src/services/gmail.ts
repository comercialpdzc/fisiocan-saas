/**
 * Gmail service — send/receive emails from fisiocanzgz@gmail.com.
 *
 * Required env vars (same OAuth2 client as Drive/Calendar):
 *   GOOGLE_CLIENT_ID
 *   GOOGLE_CLIENT_SECRET
 *   GOOGLE_REFRESH_TOKEN
 *
 * Scopes required (must be set when generating refresh token):
 *   https://www.googleapis.com/auth/gmail.modify
 */

let gmailClient: import('googleapis').gmail_v1.Gmail | null = null;

async function getGmail() {
  if (gmailClient) return gmailClient;

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) return null;

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    gmailClient = google.gmail({ version: 'v1', auth });
    return gmailClient;
  } catch {
    return null;
  }
}

function base64url(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function buildMimeMessage(opts: {
  to: string;
  from?: string;
  subject: string;
  body: string;
  replyToMessageId?: string;
  threadId?: string;
}): string {
  const headers = [
    opts.from ? `From: ${opts.from}` : 'From: fisiocanzgz@gmail.com',
    `To: ${opts.to}`,
    `Subject: ${opts.subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    opts.replyToMessageId ? `In-Reply-To: ${opts.replyToMessageId}` : null,
    opts.replyToMessageId ? `References: ${opts.replyToMessageId}` : null,
  ].filter(Boolean).join('\r\n');

  return base64url(`${headers}\r\n\r\n${opts.body}`);
}

export interface GmailMessage {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
  isRead: boolean;
  labelIds: string[];
}

function extractHeader(headers: Array<{ name?: string | null; value?: string | null }>, name: string) {
  return headers.find(h => h.name?.toLowerCase() === name.toLowerCase())?.value ?? '';
}

function decodeBody(payload: import('googleapis').gmail_v1.Schema$MessagePart): string {
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
    }
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        return Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
    }
  }
  return '';
}

/**
 * List recent inbox messages.
 */
export async function listInbox(maxResults = 50): Promise<GmailMessage[] | null> {
  const gmail = await getGmail();
  if (!gmail) return null;

  try {
    const list = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults,
    });

    const messageIds = list.data.messages ?? [];
    const messages = await Promise.all(
      messageIds.map(async ({ id }) => {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: id!,
          format: 'full',
        });
        const headers = msg.data.payload?.headers ?? [];
        return {
          id: msg.data.id ?? '',
          threadId: msg.data.threadId ?? '',
          from: extractHeader(headers, 'from'),
          subject: extractHeader(headers, 'subject'),
          date: extractHeader(headers, 'date'),
          snippet: msg.data.snippet ?? '',
          body: decodeBody(msg.data.payload ?? {}),
          isRead: !(msg.data.labelIds?.includes('UNREAD') ?? false),
          labelIds: msg.data.labelIds ?? [],
        } satisfies GmailMessage;
      }),
    );

    return messages;
  } catch (err) {
    console.error('Gmail list error:', err);
    return null;
  }
}

/**
 * Get a single message by ID.
 */
export async function getMessage(messageId: string): Promise<GmailMessage | null> {
  const gmail = await getGmail();
  if (!gmail) return null;

  try {
    const msg = await gmail.users.messages.get({ userId: 'me', id: messageId, format: 'full' });
    const headers = msg.data.payload?.headers ?? [];
    return {
      id: msg.data.id ?? '',
      threadId: msg.data.threadId ?? '',
      from: extractHeader(headers, 'from'),
      subject: extractHeader(headers, 'subject'),
      date: extractHeader(headers, 'date'),
      snippet: msg.data.snippet ?? '',
      body: decodeBody(msg.data.payload ?? {}),
      isRead: !(msg.data.labelIds?.includes('UNREAD') ?? false),
      labelIds: msg.data.labelIds ?? [],
    };
  } catch (err) {
    console.error('Gmail get error:', err);
    return null;
  }
}

/**
 * Mark a message as read.
 */
export async function markAsRead(messageId: string): Promise<void> {
  const gmail = await getGmail();
  if (!gmail) return;
  try {
    await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: { removeLabelIds: ['UNREAD'] },
    });
  } catch (err) {
    console.error('Gmail markAsRead error:', err);
  }
}

/**
 * Send a new email.
 */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  body: string;
}): Promise<string | null> {
  const gmail = await getGmail();
  if (!gmail) return null;

  try {
    const raw = buildMimeMessage(opts);
    const sent = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });
    return sent.data.id ?? null;
  } catch (err) {
    console.error('Gmail send error:', err);
    return null;
  }
}

/**
 * Reply to a thread.
 */
export async function replyToThread(opts: {
  threadId: string;
  originalMessageId: string;
  to: string;
  subject: string;
  body: string;
}): Promise<string | null> {
  const gmail = await getGmail();
  if (!gmail) return null;

  try {
    const raw = buildMimeMessage({
      to: opts.to,
      subject: opts.subject.startsWith('Re:') ? opts.subject : `Re: ${opts.subject}`,
      body: opts.body,
      replyToMessageId: opts.originalMessageId,
    });
    const sent = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw, threadId: opts.threadId },
    });
    return sent.data.id ?? null;
  } catch (err) {
    console.error('Gmail reply error:', err);
    return null;
  }
}

/**
 * Count unread messages in inbox.
 */
export async function countUnread(): Promise<number> {
  const gmail = await getGmail();
  if (!gmail) return 0;
  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX', 'UNREAD'],
      maxResults: 1,
    });
    return res.data.resultSizeEstimate ?? 0;
  } catch {
    return 0;
  }
}
