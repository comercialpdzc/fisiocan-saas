import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/', async (_req, res) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay.getTime() + 86400000);
  const startOfWeek = new Date(startOfDay.getTime() - startOfDay.getDay() * 86400000);
  const endOfWeek = new Date(startOfWeek.getTime() + 7 * 86400000);

  const [
    totalPatients,
    activePatients,
    totalTutors,
    todayAppointments,
    weekAppointments,
    recentPatients,
    upcomingAppointments,
  ] = await Promise.all([
    prisma.patient.count(),
    prisma.patient.count({ where: { active: true } }),
    prisma.tutor.count(),
    prisma.appointment.count({ where: { date: { gte: startOfDay, lt: endOfDay } } }),
    prisma.appointment.count({ where: { date: { gte: startOfWeek, lt: endOfWeek } } }),
    prisma.patient.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { tutor: true },
    }),
    prisma.appointment.findMany({
      where: { date: { gte: now }, status: 'SCHEDULED' },
      take: 5,
      orderBy: { date: 'asc' },
      include: { patient: { include: { tutor: true } } },
    }),
  ]);

  res.json({
    stats: { totalPatients, activePatients, totalTutors, todayAppointments, weekAppointments },
    recentPatients,
    upcomingAppointments,
  });
});

export default router;
