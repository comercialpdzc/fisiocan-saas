import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PawPrint, CalendarDays, Dumbbell, FileText, MessageSquare } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { getPortalUser } from '../../lib/portalAuth';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PortalMe {
  id: number; name: string;
  patients: Array<{
    id: number; name: string; species: string; breed?: string; active: boolean;
    rehabRoutines: Array<{ id: number; routine: { name: string } }>;
    appointments: Array<{ id: number; date: string; duration: number }>;
    _count: { plans: number };
  }>;
}

export default function PortalDashboard() {
  const user = getPortalUser();
  const { data: me, isLoading } = useQuery<PortalMe>({
    queryKey: ['portal-me'],
    queryFn: () => portalApi.get('/portal/me'),
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-700">Bienvenido/a, {user?.name} 👋</h1>
        <p className="text-navy-400 mt-1">{format(new Date(), "EEEE d 'de' MMMM yyyy", { locale: es })}</p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { to: '/portal/appointments', icon: CalendarDays, label: 'Próximas citas', color: 'navy' },
          { to: '/portal/routines',     icon: Dumbbell,     label: 'Mis ejercicios', color: 'teal' },
          { to: '/portal/plans',        icon: FileText,     label: 'Mis planes',    color: 'navy' },
          { to: '/portal/chat',         icon: MessageSquare,label: 'Mensajes',      color: 'teal' },
        ].map(({ to, icon: Icon, label, color }) => (
          <Link key={to} to={to} className="card flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color === 'teal' ? 'bg-teal-100' : 'bg-navy-100'}`}>
              <Icon size={22} className={color === 'teal' ? 'text-teal-600' : 'text-navy-600'} />
            </div>
            <span className="text-sm font-medium text-navy-700">{label}</span>
          </Link>
        ))}
      </div>

      {/* Patients */}
      <h2 className="font-semibold text-navy-700 mb-4">Mis mascotas</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {me?.patients.map(p => (
          <Link key={p.id} to="/portal/routines" className="card hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <PawPrint size={22} className="text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-navy-700">{p.name}</h3>
                  <span className={p.active ? 'badge-green' : 'badge-gray'}>{p.active ? 'En tratamiento' : 'Inactivo'}</span>
                </div>
                <p className="text-sm text-navy-400">{p.species}{p.breed ? ` · ${p.breed}` : ''}</p>
                <div className="flex gap-4 mt-3 text-xs text-navy-400">
                  <span className="flex items-center gap-1"><Dumbbell size={11} /> {p.rehabRoutines.length} ejercicios</span>
                  <span className="flex items-center gap-1"><FileText size={11} /> {p._count.plans} planes</span>
                  {p.appointments.length > 0 && (
                    <span className="flex items-center gap-1 text-teal-600 font-medium">
                      <CalendarDays size={11} />
                      {format(new Date(p.appointments[0].date), "d MMM · HH:mm", { locale: es })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {me?.patients.length === 0 && (
          <div className="card text-navy-300 text-sm">Sin mascotas registradas aún.</div>
        )}
      </div>
    </div>
  );
}
