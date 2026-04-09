import { useQuery } from '@tanstack/react-query';
import { CalendarDays } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Appointment {
  id: number; date: string; duration: number; status: string; notes?: string;
  patient: { id: number; name: string };
}

export default function PortalAppointments() {
  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ['portal-appointments'],
    queryFn: () => portalApi.get('/portal/appointments'),
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Próximas citas</h1>
        <p className="text-navy-400 text-sm mt-0.5">Sesiones de fisioterapia programadas</p>
      </div>

      {appointments.length === 0 ? (
        <div className="card text-center py-12">
          <CalendarDays size={40} className="mx-auto mb-3 text-navy-200" />
          <p className="text-navy-300">Sin citas próximas</p>
          <p className="text-navy-300 text-xs mt-1">Contacta con FISIOCAN para reservar una sesión</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map(a => (
            <div key={a.id} className="card flex items-center gap-4">
              <div className="flex-shrink-0 bg-navy-700 text-white rounded-xl p-3 text-center min-w-[64px]">
                <div className="text-2xl font-bold leading-none">{format(new Date(a.date), 'd')}</div>
                <div className="text-xs text-navy-200 mt-0.5 uppercase">{format(new Date(a.date), 'MMM', { locale: es })}</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-navy-700">{a.patient.name}</div>
                <div className="text-sm text-navy-400 mt-0.5">
                  {format(new Date(a.date), "HH:mm", { locale: es })} · {a.duration} min
                </div>
                {a.notes && <p className="text-xs text-navy-400 mt-1">{a.notes}</p>}
              </div>
              <div className="text-right text-xs text-navy-400">
                {format(new Date(a.date), "EEEE", { locale: es })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
