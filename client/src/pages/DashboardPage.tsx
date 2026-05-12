import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PawPrint, Users, CalendarDays, TrendingUp, Clock, HardDrive, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getStoredUser } from '../lib/auth';

interface DashboardData {
  stats: {
    totalPatients: number;
    activePatients: number;
    totalTutors: number;
    todayAppointments: number;
    weekAppointments: number;
  };
  recentPatients: Array<{ id: number; name: string; species: string; breed?: string; createdAt: string; tutor: { name: string } }>;
  upcomingAppointments: Array<{ id: number; date: string; duration: number; patient: { name: string; tutor: { name: string } } }>;
}

type SyncResult = { total: number; synced: number; skipped?: number; failed?: number } | null;
type SyncState = 'idle' | 'loading' | 'done' | 'error';

const SYNC_JOBS = [
  { key: 'sync-patient-photos',  label: 'Fotos de perfil',         desc: 'patient.photoUrl → Drive' },
  { key: 'sync-drive',           label: 'Archivos de sesión/eval.', desc: 'MediaFile Blob → Drive' },
  { key: 'sync-followup-media',  label: 'Seguimiento portal',       desc: 'FollowUpMedia → Drive' },
  { key: 'sync-patient-media',   label: 'Galería pacientes',        desc: 'PatientMedia → Drive' },
  { key: 'sync-pauta-media',     label: 'Imágenes pautas',          desc: 'PautaMedia → Drive' },
] as const;

export default function DashboardPage() {
  const user = getStoredUser();
  const [syncStates, setSyncStates] = useState<Record<string, SyncState>>({});
  const [syncResults, setSyncResults] = useState<Record<string, SyncResult>>({});

  async function runSync(key: string) {
    setSyncStates(s => ({ ...s, [key]: 'loading' }));
    try {
      const result = await api.post<SyncResult>(`/admin/${key}`, {});
      setSyncResults(r => ({ ...r, [key]: result }));
      setSyncStates(s => ({ ...s, [key]: 'done' }));
    } catch {
      setSyncStates(s => ({ ...s, [key]: 'error' }));
    }
  }

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/dashboard'),
  });

  if (isLoading) return <div className="p-4 md:p-8 text-navy-400">Cargando…</div>;

  const s = data?.stats;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-navy-700">Bienvenida, {user?.name} 👋</h1>
        <p className="text-navy-400 mt-1 text-sm">{format(new Date(), "EEEE d 'de' MMMM yyyy", { locale: es })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard icon={PawPrint} color="teal" label="Pacientes activos" value={s?.activePatients ?? 0} sub={`${s?.totalPatients ?? 0} total`} />
        <StatCard icon={Users} color="navy" label="Tutores" value={s?.totalTutors ?? 0} />
        <StatCard icon={CalendarDays} color="teal" label="Citas hoy" value={s?.todayAppointments ?? 0} />
        <StatCard icon={TrendingUp} color="navy" label="Esta semana" value={s?.weekAppointments ?? 0} />
      </div>

      {/* Google Drive sync */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <HardDrive size={16} className="text-teal-500" />
          <h2 className="font-semibold text-navy-700">Sincronizar con Google Drive</h2>
          <a href="https://drive.google.com/drive/folders/1zCRsV_O-FmgqwiABCJaYaV5P4yWyK3dn" target="_blank" rel="noreferrer" className="ml-auto text-xs text-teal-500 hover:text-teal-600 font-medium">Abrir Drive →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SYNC_JOBS.map(job => {
            const state = syncStates[job.key] ?? 'idle';
            const result = syncResults[job.key];
            return (
              <div key={job.key} className="flex items-center gap-3 p-3 rounded-xl border border-navy-100 bg-navy-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-700">{job.label}</p>
                  {state === 'done' && result
                    ? <p className="text-xs text-teal-600">{result.synced} subidos · {result.skipped ?? 0} ya en Drive</p>
                    : <p className="text-xs text-navy-400">{job.desc}</p>}
                  {state === 'error' && <p className="text-xs text-red-500">Error — reintentar</p>}
                </div>
                <button
                  onClick={() => runSync(job.key)}
                  disabled={state === 'loading'}
                  className="flex-shrink-0 p-1.5 rounded-lg text-navy-400 hover:text-teal-500 hover:bg-white transition-colors disabled:opacity-50"
                >
                  {state === 'loading' ? <RefreshCw size={15} className="animate-spin text-teal-500" />
                    : state === 'done' ? <CheckCircle2 size={15} className="text-teal-500" />
                    : state === 'error' ? <AlertCircle size={15} className="text-red-500" />
                    : <RefreshCw size={15} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent patients */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy-700">Últimos pacientes</h2>
            <Link to="/patients" className="text-sm text-teal-500 hover:text-teal-600 font-medium">Ver todos →</Link>
          </div>
          <div className="space-y-2">
            {data?.recentPatients.length === 0 && <p className="text-navy-300 text-sm">Sin pacientes aún</p>}
            {data?.recentPatients.map(p => (
              <Link key={p.id} to={`/patients/${p.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <PawPrint size={16} className="text-teal-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-navy-700 group-hover:text-teal-600 truncate text-sm">{p.name}</div>
                  <div className="text-xs text-navy-400 truncate">{p.species}{p.breed ? ` · ${p.breed}` : ''} · {p.tutor.name}</div>
                </div>
                <div className="text-xs text-navy-300 flex-shrink-0">
                  {format(new Date(p.createdAt), 'd MMM', { locale: es })}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy-700">Próximas citas</h2>
            <Link to="/appointments" className="text-sm text-teal-500 hover:text-teal-600 font-medium">Ver agenda →</Link>
          </div>
          <div className="space-y-2">
            {data?.upcomingAppointments.length === 0 && <p className="text-navy-300 text-sm">Sin citas próximas</p>}
            {data?.upcomingAppointments.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-navy-50">
                <div className="w-9 h-9 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-navy-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-navy-700 truncate text-sm">{a.patient.name}</div>
                  <div className="text-xs text-navy-400 truncate">{a.patient.tutor.name} · {a.duration} min</div>
                </div>
                <div className="text-xs text-navy-500 flex-shrink-0 text-right">
                  <div className="font-medium">{format(new Date(a.date), 'd MMM', { locale: es })}</div>
                  <div>{format(new Date(a.date), 'HH:mm')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, color, label, value, sub }: { icon: React.ElementType; color: 'teal' | 'navy'; label: string; value: number; sub?: string }) {
  return (
    <div className="card flex items-center gap-3 p-4 md:p-6">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color === 'teal' ? 'bg-teal-100' : 'bg-navy-100'}`}>
        <Icon size={20} className={color === 'teal' ? 'text-teal-600' : 'text-navy-600'} />
      </div>
      <div className="min-w-0">
        <div className="text-xl md:text-2xl font-bold text-navy-700">{value}</div>
        <div className="text-xs text-navy-400 leading-tight">{label}</div>
        {sub && <div className="text-xs text-navy-300">{sub}</div>}
      </div>
    </div>
  );
}
