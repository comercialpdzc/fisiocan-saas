// En desarrollo: Vite proxy → localhost:3001
// En producción: VITE_API_URL apunta al servidor Railway
const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';

function getToken(portal = false) {
  return localStorage.getItem(portal ? 'portal_token' : 'token');
}

async function request<T>(path: string, options?: RequestInit, portal = false): Promise<T> {
  const token = getToken(portal);
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get:    <T>(path: string)              => request<T>(path),
  post:   <T>(path: string, body: unknown) => request<T>(path, { method: 'POST',  body: JSON.stringify(body) }),
  patch:  <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string)              => request<T>(path, { method: 'DELETE' }),
};

// Portal API (uses different token)
export const portalApi = {
  get:    <T>(path: string)              => request<T>(path, undefined, true),
  post:   <T>(path: string, body: unknown) => request<T>(path, { method: 'POST',  body: JSON.stringify(body) }, true),
  patch:  <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, true),
};
