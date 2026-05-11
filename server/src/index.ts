import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRouter from './routes/auth';
import dashboardRouter from './routes/dashboard';
import patientsRouter from './routes/patients';
import tutorsRouter from './routes/tutors';
import appointmentsRouter from './routes/appointments';
import routinesRouter from './routes/routines';
import messagesRouter from './routes/messages';
import intakeRouter from './routes/intake';
import plansRouter from './routes/plans';
import portalRouter from './routes/portal';
import uploadRouter from './routes/upload';
import brainRouter from './routes/brain';
import evaluationsRouter from './routes/evaluations';
import sessionFollowupsRouter from './routes/session-followups';
import driveRouter from './routes/drive';
import gmailRouter from './routes/gmail';
import adminRouter from './routes/admin';
import pautasRouter from './routes/pautas';

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security headers ───────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ───────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rate limiting on auth endpoints ───────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Inténtalo de nuevo en 15 minutos.' },
});
app.use('/api/auth/login',          authLimiter);
app.use('/api/portal/auth/login',   authLimiter);
app.use('/api/portal/auth/google',  authLimiter);

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth',         authRouter);
app.use('/api/dashboard',    dashboardRouter);
app.use('/api/patients',     patientsRouter);
app.use('/api/tutors',       tutorsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/routines',     routinesRouter);
app.use('/api/messages',     messagesRouter);
app.use('/api/intake',       intakeRouter);
app.use('/api/plans',        plansRouter);
app.use('/api/portal',       portalRouter);
app.use('/api/upload',            uploadRouter);
app.use('/api/brain',             brainRouter);
app.use('/api/evaluations',       evaluationsRouter);
app.use('/api/session-followups', sessionFollowupsRouter);
app.use('/api/drive',             driveRouter);
app.use('/api/gmail',             gmailRouter);
app.use('/api/admin',             adminRouter);
app.use('/api/pautas',            pautasRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'FISIOCAN SaaS' }));

// ── Global error handler (no stack traces in production) ───────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(500).json({
    error: 'Error interno del servidor',
    ...(isDev && { detail: err.message, stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🐾 FISIOCAN server running on http://localhost:${PORT}`);
});
