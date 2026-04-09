import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth';
import dashboardRouter from './routes/dashboard';
import patientsRouter from './routes/patients';
import tutorsRouter from './routes/tutors';
import appointmentsRouter from './routes/appointments';
import routinesRouter from './routes/routines';
import messagesRouter from './routes/messages';
import intakeRouter from './routes/intake';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/tutors', tutorsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/routines', routinesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/intake', intakeRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'FISIOCAN SaaS' }));

app.listen(PORT, () => {
  console.log(`🐾 FISIOCAN server running on http://localhost:${PORT}`);
});
