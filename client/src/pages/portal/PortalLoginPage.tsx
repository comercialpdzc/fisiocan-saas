import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { savePortalAuth, PortalUser } from '../../lib/portalAuth';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, config: object) => void;
        };
      };
    };
  }
}

export default function PortalLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredential,
      });
      const btn = document.getElementById('google-signin-btn');
      if (btn) {
        window.google.accounts.id.renderButton(btn, {
          theme: 'outline',
          size: 'large',
          width: btn.offsetWidth,
          text: 'continue_with',
          locale: 'es',
        });
      }
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  async function handleGoogleCredential(response: { credential: string }) {
    setError('');
    setLoading(true);
    try {
      const res = await portalApi.post<{ token: string; tutor: PortalUser }>(
        '/portal/auth/google',
        { credential: response.credential }
      );
      savePortalAuth(res.token, res.tutor);
      navigate('/portal/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await portalApi.post<{ token: string; tutor: PortalUser }>('/portal/auth/login', { email, password });
      savePortalAuth(res.token, res.tutor);
      navigate('/portal/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-400 rounded-2xl mb-4 shadow-lg">
            <PawPrint size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">FISIOCAN</h1>
          <p className="text-navy-200 text-sm mt-1">Portal para propietarios</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-5">
          {/* Google Sign-In */}
          {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
            <>
              <div id="google-signin-btn" className="w-full" />
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-navy-100" />
                <span className="text-xs text-navy-300">o con contraseña</span>
                <div className="flex-1 h-px bg-navy-100" />
              </div>
            </>
          )}

          {/* Email / password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
              {loading ? 'Entrando…' : 'Acceder al portal'}
            </button>
          </form>

          <p className="text-center text-xs text-navy-400">
            ¿No tienes acceso? Contacta con tu fisioterapeuta.
          </p>
        </div>

        <p className="text-center text-navy-400 text-xs mt-4">
          ¿Eres fisioterapeuta? <a href="/login" className="text-teal-300 hover:underline">Entra aquí</a>
        </p>
      </div>
    </div>
  );
}
