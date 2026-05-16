import { PrismaClient } from './generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

// In Node.js (local dev / Vercel Node runtime), provide a WebSocket constructor
// Node 18+ has native WebSocket via globalThis.WebSocket — no polyfill needed on Vercel.
// For older local Node versions, fall back to the 'ws' package if available.
if (typeof globalThis.WebSocket === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ws = require('ws');
    neonConfig.webSocketConstructor = ws;
  } catch {
    // ws not installed — relies on native WebSocket (Node 22+)
  }
}

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter });
