import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }
  try {
    const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as { id: number; role: string };
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}
