import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { api } from '../lib/api';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { getStoredUser } from '../lib/auth';

interface Appointment {
  id: number; date: string; duration: number; status: string; notes?: string;
  patient: { id: number; name: string; tutor: { name: string } };
  fisio: { id: number; name: string };
}
interface Patient { id: number; name: string; tutor: { name: string } }

const STATUS_LABEL: Record<string, string> = { SCHEDULED: 'Programada', COMPLETED: 'Completada', CANCELLED: 'Cancelada', NO_SHOW: 'No asistió' };
const STATUS_CLASS: Record<string, string> = { SCHEDULED: 'badge-blue', COMPLETED: 'badge-green', CANCELLED: 'badge-red', NO_SHOW: 'badge-yellow' };
const HOURS = Array.from({ length: 11 }, (_, i) => i + 9); // 9-19

export default function AppointmentsPage() {
  const qc = useQueryClient();
  const user = getStoredUser();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [showNew, setShowNew] = useState(false);

  const weekEnd = addDays(weekStart, 6);
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', weekStart.toISOString()],
    queryFn: () => api.get(`/appointments?from=${weekStart.toISOString()}&to=${weekEnd.toISOString()}`),
  });

  const deleteAppt = useMutation({
    mutationFn: (id: number) => api.delete(`/appointments/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  function apptForDayHour(day: Date, hour: number) {
    return appointments.filter(a => {
      const d = new Date(a.date);
      return isSameDay(d, day) && d.getHours() === hour;
    });
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Agenda</h1>
          <p className="text-navy-400 text-sm mt-0.5">
            {format(weekStart, "d MMM", { locale: es })} – {format(weekEnd, "d MMM yyyy", { locale: es })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekStart(w => subWeeks(w, 1))} className="btn-ghost p-2"><ChevronLeft size={18} /></button>
          <button onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))} className="btn-ghost text-sm px-3">Hoy</button>
          <button onClick={() => setWeekStart(w => addWeeks(w, 1))} className="btn-ghost p-2"><ChevronRight size={18} /></button>
          <button onClick={() => setShowNew(true)} className="btn-primary ml-2"><Plus size={16} /> Nueva cita</button>
        </div>
      </div>

      {/* Week grid */}
      <div className="card p-0 overflow-auto">
        <div className="grid" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
          {/* Header */}
          <div className="border-b border-navy-100 p-2" />
          {days.map(day => (
            <div key={day.toISOString()} className={`border-b border-l border-navy-100 p-2 text-center ${isSameDay(day, new Date()) ? 'bg-teal-50' : ''}`}>
              <div className="text-xs text-navy-400">{format(day, 'EEE', { locale: es })}</div>
              <div className={`text-sm font-semibold mt-0.5 ${isSameDay(day, new Date()) ? 'text-teal-600' : 'text-navy-700'}`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
          {/* Hour rows */}
          {HOURS.map(hour => (
            <>
              <div key={`h-${hour}`} className="border-b border-navy-50 px-2 py-1 text-xs text-navy-300 text-right">{hour}:00</div>
              {days.map(day => {
                const appts = apptForDayHour(day, hour);
                return (
                  <div key={`${day.toISOString()}-${hour}`} className={`border-b border-l border-navy-50 p-1 min-h-[48px] ${isSameDay(day, new Date()) ? 'bg-teal-50/40' : ''}`}>
                    {appts.map(a => (
                      <div key={a.id} className="bg-navy-700 text-white text-xs rounded-lg px-2 py-1 mb-1 group relative">
                        <div className="font-medium truncate">{a.patient.name}</div>
                        <div className="text-navy-200 truncate">{a.patient.tutor.name}</div>
                        <button
                          onClick={() => deleteAppt.mutate(a.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-navy-300 hover:text-red-400"
                        ><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {showNew && user && (
        <NewAppointmentModal
          fisioId={user.id}
          onClose={() => setShowNew(false)}
          onCreated={() => { qc.invalidateQueries({ queryKey: ['appointments'] }); setShowNew(false); }}
        />
      )}
    </div>
  );
}

function NewAppointmentModal({ fisioId, onClose, onCreated }: { fisioId: number; onClose: () => void; onCreated: () => void }) {
  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const [form, setForm] = useState({ date: today, duration: '60', patientId: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const { data: patients = [] } = useQuery<Patient[]>({ queryKey: ['patients'], queryFn: () => api.get('/patients') });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/appointments', { ...form, duration: Number(form.duration), patientId: Number(form.patientId), fisioId });
      onCreated();
    } finally { setLoading(false); }
  }

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-navy-700 mb-4">Nueva cita</h2>
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">Paciente *</label>
            <select className="input" value={form.patientId} onChange={f('patientId')} required>
              <option value="">Seleccionar…</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} · {p.tutor.name}</option>)}
            </select>
          </div>
          <div><label className="label">Fecha y hora *</label>
            <input className="input" type="datetime-local" value={form.date} onChange={f('date')} required />
          </div>
          <div><label className="label">Duración (min)</label>
            <select className="input" value={form.duration} onChange={f('duration')}>
              {[30, 45, 60, 90, 120].map(d => <option key={d} value={d}>{d} min</option>)}
            </select>
          </div>
          <div><label className="label">Notas</label>
            <textarea className="input resize-none" rows={2} value={form.notes} onChange={f('notes')} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">{loading ? 'Guardando…' : 'Crear cita'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
