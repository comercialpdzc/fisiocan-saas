import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent, CalendarEventInput } from '../services/calendar';

const router = Router();
router.use(requireAuth);

/** Build CalendarEventInput from a fully-included appointment record */
function buildCalendarInput(appt: {
  date: Date;
  duration?: number | null;
  notes?: string | null;
  status: string;
  fisio: { name: string } | null;
  appointmentPatients: Array<{ patient: { name: string; tutor?: { name: string; phone: string; email?: string | null } | null } }>;
}): CalendarEventInput {
  const allPatients = appt.appointmentPatients.map(ap => ap.patient);
  const firstTutor = allPatients.find(p => p.tutor)?.tutor;
  return {
    patientNames: allPatients.map(p => p.name),
    tutorName:    firstTutor?.name    ?? 'Sin tutor',
    tutorPhone:   firstTutor?.phone   ?? '',
    tutorEmail:   firstTutor?.email   ?? null,
    fisioName:    appt.fisio?.name    ?? 'Fisioterapeuta',
    date:         appt.date,
    durationMin:  appt.duration ?? 60,
    notes:        appt.notes ?? null,
    status:       appt.status,
  };
}

router.get('/', async (req: AuthRequest, res) => {
  const { from, to } = req.query;
  const where: Record<string, unknown> = {};
  if (from || to) {
    where.date = {
      ...(from ? { gte: new Date(from as string) } : {}),
      ...(to ? { lte: new Date(to as string) } : {}),
    };
  }
  const appointments = await prisma.appointment.findMany({
    where,
    include: {
      patient: { include: { tutor: true } },
      fisio: { select: { id: true, name: true } },
      appointmentPatients: { include: { patient: { include: { tutor: true } } } },
    },
    orderBy: { date: 'asc' },
  });
  res.json(appointments);
});

router.get('/:id', async (req: AuthRequest, res) => {
  const appt = await prisma.appointment.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      patient: { include: { tutor: true } },
      fisio: { select: { id: true, name: true } },
      appointmentPatients: { include: { patient: { include: { tutor: true } } } },
    },
  });
  if (!appt) { res.status(404).json({ error: 'Cita no encontrada' }); return; }
  if (appt.fisioId !== req.userId) { res.status(403).json({ error: 'Sin permiso' }); return; }
  res.json(appt);
});

const apptSchema = z.object({
  date:       z.string(),
  duration:   z.number().int().positive().optional(),
  notes:      z.string().optional(),
  // Primary patient kept for backward compat
  patientId:  z.number().int().positive(),
  // Additional patients (includes primary if sent from new UI)
  patientIds: z.array(z.number().int().positive()).optional(),
  fisioId:    z.number().int().positive(),
  status:     z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
});

router.post('/', async (req: AuthRequest, res) => {
  const parse = apptSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { patientIds, ...rest } = parse.data;

  const appt = await prisma.appointment.create({
    data: {
      ...rest,
      date: new Date(rest.date),
      fisioId: rest.fisioId ?? req.userId!,
    },
  });

  // Build the full set of patient IDs for the junction table
  const allIds = Array.from(new Set([rest.patientId, ...(patientIds ?? [])]));
  if (allIds.length > 0) {
    await prisma.appointmentPatient.createMany({
      data: allIds.map(pid => ({ appointmentId: appt.id, patientId: pid })),
      skipDuplicates: true,
    });
  }

  const result = await prisma.appointment.findUnique({
    where: { id: appt.id },
    include: {
      patient: { include: { tutor: true } },
      fisio: { select: { id: true, name: true } },
      appointmentPatients: { include: { patient: { include: { tutor: true } } } },
    },
  });

  // Sync with Google Calendar (fire-and-forget)
  if (result) {
    const calInput = buildCalendarInput(result as Parameters<typeof buildCalendarInput>[0]);
    createCalendarEvent(calInput).then(eventId => {
      if (eventId) {
        prisma.appointment.update({
          where: { id: appt.id },
          data: { googleEventId: eventId },
        }).catch(() => {/* non-fatal */});
      }
    }).catch(() => {/* non-fatal */});
  }

  res.status(201).json(result);
});

router.patch('/:id', async (req: AuthRequest, res) => {
  const existing = await prisma.appointment.findUnique({ where: { id: Number(req.params.id) } });
  if (!existing) { res.status(404).json({ error: 'Cita no encontrada' }); return; }
  if (existing.fisioId !== req.userId) { res.status(403).json({ error: 'Sin permiso' }); return; }

  const parse = apptSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { patientIds, ...rest } = parse.data;
  const data: Record<string, unknown> = { ...rest };
  if (rest.date) data.date = new Date(rest.date);

  await prisma.appointment.update({ where: { id: Number(req.params.id) }, data });

  // Update junction table if patientIds provided
  if (patientIds !== undefined) {
    await prisma.appointmentPatient.deleteMany({ where: { appointmentId: Number(req.params.id) } });
    const primaryId = rest.patientId ?? existing.patientId;
    const allIds = Array.from(new Set([primaryId, ...patientIds]));
    await prisma.appointmentPatient.createMany({
      data: allIds.map(pid => ({ appointmentId: Number(req.params.id), patientId: pid })),
      skipDuplicates: true,
    });
  }

  const result = await prisma.appointment.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      patient: { include: { tutor: true } },
      fisio: { select: { id: true, name: true } },
      appointmentPatients: { include: { patient: { include: { tutor: true } } } },
    },
  });

  // Sync with Google Calendar (fire-and-forget)
  if (result) {
    const calInput = buildCalendarInput(result as Parameters<typeof buildCalendarInput>[0]);
    const eventId = (result as { googleEventId?: string | null }).googleEventId;
    if (eventId) {
      updateCalendarEvent(eventId, calInput).catch(() => {/* non-fatal */});
    } else {
      createCalendarEvent(calInput).then(newEventId => {
        if (newEventId) {
          prisma.appointment.update({
            where: { id: Number(req.params.id) },
            data: { googleEventId: newEventId },
          }).catch(() => {/* non-fatal */});
        }
      }).catch(() => {/* non-fatal */});
    }
  }

  res.json(result);
});

router.delete('/:id', async (req: AuthRequest, res) => {
  const existing = await prisma.appointment.findUnique({ where: { id: Number(req.params.id) } });
  if (!existing) { res.status(404).json({ error: 'Cita no encontrada' }); return; }
  if (existing.fisioId !== req.userId) { res.status(403).json({ error: 'Sin permiso' }); return; }

  // Delete from Google Calendar before removing from DB
  const googleEventId = (existing as { googleEventId?: string | null }).googleEventId;
  if (googleEventId) {
    deleteCalendarEvent(googleEventId).catch(() => {/* non-fatal */});
  }

  await prisma.appointmentPatient.deleteMany({ where: { appointmentId: Number(req.params.id) } });
  await prisma.appointment.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
