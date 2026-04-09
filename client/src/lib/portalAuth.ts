export interface PortalUser {
  id: number;
  name: string;
  email: string;
}

export function savePortalAuth(token: string, tutor: PortalUser) {
  localStorage.setItem('portal_token', token);
  localStorage.setItem('portal_user', JSON.stringify(tutor));
}

export function clearPortalAuth() {
  localStorage.removeItem('portal_token');
  localStorage.removeItem('portal_user');
}

export function getPortalUser(): PortalUser | null {
  const raw = localStorage.getItem('portal_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isPortalAuthenticated() {
  return !!localStorage.getItem('portal_token');
}
