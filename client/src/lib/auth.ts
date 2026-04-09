export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'FISIO';
}

export function saveAuth(token: string, user: AuthUser) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
