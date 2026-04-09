import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PawPrint, Users, CalendarDays, TrendingUp, Clock } from 'lucide-react';
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

export default function DashboardPage() {
  const user = getStoredUser();
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
