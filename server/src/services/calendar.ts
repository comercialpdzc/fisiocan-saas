/**
 * Google Calendar service — syncs FisioCan appointments with Google Calendar.
 *
 * Required env vars (same OAuth2 client as Drive):
 *   GOOGLE_CLIENT_ID
 *   GOOGLE_CLIENT_SECRET
 *   GOOGLE_REFRESH_TOKEN
 *   GOOGLE_CALENDAR_ID   (calendar ID, e.g. "fisiocanzgz@gmail.com" or a calendar-specific ID)
 */

let calendarClient: import('googleapis').calendar_v3.Calendar | null = null;

async function getCalendar() {
  if (calendarClient) return calendarClient;

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) return null;

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    calendarClient = google.calendar({ version: 'v3', auth });
    return calendarClient;
  } catch {
    return null;
  }
}

export interface CalendarEventInput {
  patientNames: string[];   // One or more patient names
  tutorName: string;
  tutorPhone: string;
  tutorEmail?: string | null;
  fisioName: string;
  date: Date;
  durationMin: number;
  notes?: string | null;
  status: string;
}

function buildSummary(names: string[], status: string) {
  const statusSuffix = status === 'CANCELLED' ? ' [CANCELADA]' : '';
  return `Fisioterapia: ${names.join(', ')}${statusSuffix}`;
}

function buildDescription(data: CalendarEventInput) {
  const lines = [
    `Tutor/a: ${data.tutorName}`,
    `Teléfono: ${data.tutorPhone}`,
    data.tutorEmail ? `Email: ${data.tutorEmail}` : null,
    `Fisioterapeuta: ${data.fisioName}`,
    data.notes ? `\nNotas: ${data.notes}` : null,
  ].filter(Boolean);
  return lines.join('\n');
}

/**
 * Create a new Calendar event. Returns the event ID or null if not configured.
 */
export async function createCalendarEvent(data: CalendarEventInput): Promise<string | null> {
  const cal = await getCalendar();
  if (!cal) return null;

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';
  const endTime = new Date(data.date.getTime() + data.durationMin * 60000);

  const attendees = data.tutorEmail ? [{ email: data.tutorEmail }] : [];

  try {
    const event = await cal.events.insert({
      calendarId,
      sendUpdates: 'all',
      requestBody: {
        summary: buildSummary(data.patientNames, data.status),
        description: buildDescription(data),
        start: { dateTime: data.date.toISOString(), timeZone: 'Europe/Madrid' },
        end:   { dateTime: endTime.toISOString(),   timeZone: 'Europe/Madrid' },
        attendees,
        status: data.status === 'CANCELLED' ? 'cancelled' : 'confirmed',
      },
    });
    return event.data.id ?? null;
  } catch (err) {
    console.error('Calendar create error:', err);
    return null;
  }
}

/**
 * Update an existing Calendar event.
 */
export async function updateCalendarEvent(eventId: string, data: CalendarEventInput): Promise<void> {
  const cal = await getCalendar();
  if (!cal) return;

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';
  const endTime = new Date(data.date.getTime() + data.durationMin * 60000);

  try {
    await cal.events.update({
      calendarId,
      eventId,
      sendUpdates: 'all',
      requestBody: {
        summary: buildSummary(data.patientNames, data.status),
        description: buildDescription(data),
        start: { dateTime: data.date.toISOString(), timeZone: 'Europe/Madrid' },
        end:   { dateTime: endTime.toISOString(),   timeZone: 'Europe/Madrid' },
        status: data.status === 'CANCELLED' ? 'cancelled' : 'confirmed',
      },
    });
  } catch (err) {
    console.error('Calendar update error:', err);
  }
}

/**
 * Delete a Calendar event.
 */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const cal = await getCalendar();
  if (!cal) return;

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';
  try {
    await cal.events.delete({ calendarId, eventId, sendUpdates: 'all' });
  } catch (err) {
    console.error('Calendar delete error:', err);
  }
}
