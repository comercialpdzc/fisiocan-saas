# FISIOCAN SaaS — Arranque

## Primera vez

```bash
# 1. Servidor
cd server
npm install
npx prisma db push
npx tsx prisma/seed.ts   # crea usuario maria@fisiocan.es / fisiocan2024

# 2. Cliente
cd ../client
npm install
```

## Desarrollo diario

Abre **dos terminales**:

**Terminal 1 — Servidor**
```bash
cd F:/APPS/fisiocan-saas/server
npm run dev
# → http://localhost:3001
```

**Terminal 2 — Frontend**
```bash
cd F:/APPS/fisiocan-saas/client
npm run dev
# → http://localhost:5173
```

Entra en http://localhost:5173 con:
- Email: `maria@fisiocan.es`
- Contraseña: `fisiocan2024`

## Conectar el formulario de captación

En `F:/APPS/fisiocan/index.html`, línea 776, está la variable:
```js
const SAAS_API = 'http://localhost:3001/api/intake';
```
Cuando el servidor esté en producción, cambia esa URL.
Cuando un cliente rellene el formulario, el paciente se crea automáticamente en el SaaS.

## Estructura del proyecto

```
fisiocan-saas/
├── server/
│   ├── prisma/schema.prisma   — modelo de datos (SQLite)
│   ├── prisma/seed.ts         — usuario inicial
│   └── src/
│       ├── index.ts           — entrada Express
│       ├── middleware/auth.ts — JWT
│       └── routes/
│           ├── auth.ts        — POST /api/auth/login
│           ├── dashboard.ts   — GET  /api/dashboard
│           ├── patients.ts    — CRUD /api/patients
│           ├── tutors.ts      — CRUD /api/tutors
│           ├── appointments.ts— CRUD /api/appointments
│           ├── routines.ts    — CRUD /api/routines
│           ├── messages.ts    — Chat /api/messages
│           └── intake.ts      — POST /api/intake (público)
└── client/
    └── src/pages/
        ├── LoginPage.tsx
        ├── DashboardPage.tsx
        ├── PatientsPage.tsx
        ├── PatientDetailPage.tsx
        ├── TutorsPage.tsx
        ├── AppointmentsPage.tsx
        ├── RoutinesPage.tsx
        └── ChatPage.tsx
```
