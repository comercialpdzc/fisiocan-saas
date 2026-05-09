import { useState, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Clock, X, Pencil, Search, Users } from 'lucide-react';
import { api } from '../lib/api';
import {
  format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks,
  startOfMonth, endOfMonth, addMonths, subMonths,
  eachDayOfInterval, getDay, addDays as _addDays, subDays,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { getStoredUser } from '../lib/auth';

interface ApptPatient { patient: { id: number; name: string; tutor: { name: string } } }
interface Appointment {
  id: number; date: string; duration: number; status: string; notes?: string;
  patient: { id: number; name: string; tutor: { name: string } };
  fisio: { id: number; name: string };
  appointmentPatients?: ApptPatient[];
}
interface Patient { id: number; name: string; tutor: { name: string } }

type CalView = 'day' | 'week' | 'month';

const STATUS_LABEL: Record<string, string> = { SCHEDULED: 'Programada', COMPLETED: 'Completada', CANCELLED: 'Cancelada', NO_SHOW: 'No asistió' };
const STATUS_CLASS: Record<string, string> = { SCHEDULED: 'badge-blue', COMPLETED: 'badge-green', CANCELLED: 'badge-red', NO_SHOW: 'badge-yellow' };
const SLOTS = Array.from({ length: 26 }, (_, i) => 8.5 + i * 0.5);

function slotLabel(slot: number) {
  const h = Math.floor(slot);
  const m = slot % 1 !== 0 ? '30' : '00';
  return `${h}:${m}`;
}

function localToISO(dt: string) { return new Date(dt).toISOString(); }

function isoToLocal(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function apptPatientNames(a: Appointment): string[] {
  if (a.appointmentPatients && a.appointmentPatients.length > 0)
    return a.appointmentPatients.map(ap => ap.patient.name);
  return [a.patient.name];
}

// ─── Swipe hook ─────────────────────────────────────────────────────────────
function useSwipe(onLeft: () => void, onRight: () => void, threshold = 60) {
  const startX = useRef<number | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (dx < -threshold) onLeft();
      else if (dx > threshold) onRight();
      startX.current = null;
    },
  };
}

export default function AppointmentsPage() {
  const qc = useQueryClient();
  const user = getStoredUser();
  const [calView, setCalView] = useState<CalView>('week');
  const [anchor, setAnchor] = useState(() => new Date()); // current day/week/month anchor
  const [showNew, setShowNew] = useState(false);
  const [editAppt, setEditAppt] = useState<Appointment | null>(null);

  // Derive query range from view + anchor
  const { queryFrom, queryTo, weekStart, label } = (() => {
    if (calView === 'day') {
      const from = new Date(anchor); from.setHours(0,0,0,0);
      const to   = new Date(anchor); to.setHours(23,59,59,999);
      return { queryFrom: from, queryTo: to, weekStart: from, label: format(anchor, "EEEE d MMMM yyyy", { locale: es }) };
    }
    if (calView === 'week') {
      const ws = startOfWeek(anchor, { weekStartsOn: 1 });
      const we = addDays(ws, 7);
      return { queryFrom: ws, queryTo: we, weekStart: ws, label: `${format(ws, "d MMM", { locale: es })} – ${format(addDays(ws,6), "d MMM yyyy", { locale: es })}` };
    }
    // month
    const ms = startOfMonth(anchor);
    const me = endOfMonth(anchor);
    return { queryFrom: ms, queryTo: addDays(me,1), weekStart: ms, label: format(anchor, "MMMM yyyy", { locale: es }) };
  })();

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', calView, queryFrom.toISOString()],
    queryFn: () => api.get(`/appointments?from=${queryFrom.toISOString()}&to=${queryTo.toISOString()}`),
  });

  const deleteAppt = useMutation({
    mutationFn: (id: number) => api.delete(`/appointments/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] }),
  });

  function prev() {
    if (calView === 'day')   setAnchor(d => subDays(d, 1));
    if (calView === 'week')  setAnchor(d => subWeeks(d, 1));
    if (calView === 'month') setAnchor(d => subMonths(d, 1));
  }
  function next() {
    if (calView === 'day')   setAnchor(d => addDays(d, 1));
    if (calView === 'week')  setAnchor(d => addWeeks(d, 1));
    if (calView === 'month') setAnchor(d => addMonths(d, 1));
  }
  function goToday() { setAnchor(new Date()); }

  const swipe = useSwipe(next, prev);

  // Desktop week grid helpers
  const days7 = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  function apptForDaySlot(day: Date, slot: number) {
    return appointments.filter(a => {
      const d = new Date(a.date);
      const s = d.getHours() + (d.getMinutes() >= 30 ? 0.5 : 0);
      return isSameDay(d, day) && s === slot;
    });
  }

  // Month grid
  const monthDays = (() => {
    const first = startOfMonth(anchor);
    const last  = endOfMonth(anchor);
    // pad start to Monday
    const startPad = (getDay(first) + 6) % 7; // Mon=0
    const cells: Array<Date | null> = Array(startPad).fill(null);
    eachDayOfInterval({ start: first, end: last }).forEach(d => cells.push(d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  })();

  const apptsByDay = (day: Date) =>
    appointments.filter(a => isSameDay(new Date(a.date), day));

  return (
    <div className="p-4 md:p-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-700">Agenda</h1>
          <p className="text-navy-400 text-sm mt-0.5 capitalize">{label}</p>
        </div>
        <div className="flex items-center gap-1 flex-wrap justify-end">
          <button onClick={prev}    className="btn-ghost p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"><ChevronLeft size={18} /></button>
          <button onClick={goToday} className="btn-ghost text-sm px-3 min-h-[44px]">Hoy</button>
          <button onClick={next}    className="btn-ghost p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"><ChevronRight size={18} /></button>
          <button onClick={() => setShowNew(true)} className="btn-primary min-h-[44px]"><Plus size={16} /><span className="hidden sm:inline"> Nueva cita</span></button>
        </div>
      </div>

      {/* ── View selector (mobile: all views; desktop: week only shown in grid) ── */}
      <div className="flex gap-1 mb-4 p-1 bg-navy-50 rounded-xl w-fit">
        {(['day','week','month'] as CalView[]).map(v => (
          <button
            key={v}
            onClick={() => setCalView(v)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${
              calView === v ? 'bg-white text-navy-700 shadow-sm' : 'text-navy-400 hover:text-navy-600'
            }`}
          >
            {{ day: 'Día', week: 'Semana', month: 'Mes' }[v]}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/* MOBILE views                                            */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="md:hidden" {...swipe}>

        {/* ── DAY view (mobile) ── */}
        {calView === 'day' && (
          <div className="space-y-1">
            {SLOTS.map(slot => {
              const appts = apptForDaySlot(anchor, slot);
              return (
                <div key={slot} className="flex gap-2 items-start">
                  <span className="w-11 text-right text-xs text-navy-300 pt-2 flex-shrink-0">{slotLabel(slot)}</span>
                  <div className={`flex-1 min-h-[40px] rounded-lg border border-navy-50 ${appts.length ? '' : 'bg-transparent'}`}>
                    {appts.map(a => {
                      const names = apptPatientNames(a);
                      return (
                        <div key={a.id} className="bg-navy-700 text-white rounded-lg px-3 py-2 mb-1 flex items-center gap-2 cursor-pointer" onClick={() => setEditAppt(a)}>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{names.join(', ')}</div>
                            <div className="text-navy-300 text-xs">{a.patient.tutor.name} · {a.duration} min</div>
                          </div>
                          <span className={`text-[10px] rounded px-1.5 py-0.5 flex-shrink-0 ${
                            a.status === 'COMPLETED' ? 'bg-green-500/30 text-green-200' :
                            a.status === 'CANCELLED' ? 'bg-red-500/30 text-red-200' :
                            a.status === 'NO_SHOW' ? 'bg-yellow-500/30 text-yellow-200' :
                            'bg-blue-500/30 text-blue-200'
                          }`}>{STATUS_LABEL[a.status]}</span>
                          <button onClick={e => { e.stopPropagation(); setEditAppt(a); }} className="text-navy-300 hover:text-white transition-colors"><Pencil size={13} /></button>
                          <button onClick={e => { e.stopPropagation(); deleteAppt.mutate(a.id); }} className="text-navy-300 hover:text-red-400 transition-colors"><X size={13} /></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── WEEK view (mobile) — list grouped by day ── */}
        {calView === 'week' && (
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <div className="card text-center py-10">
                <CalendarDays size={36} className="mx-auto mb-3 text-navy-200" />
                <p className="text-navy-300 text-sm">Sin citas esta semana</p>
              </div>
            ) : (
              days7.map(day => {
                const dayAppts = apptsByDay(day);
                if (dayAppts.length === 0) return null;
                return (
                  <div key={day.toISOString()}>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1.5 px-1 ${isSameDay(day, new Date()) ? 'text-teal-600' : 'text-navy-400'}`}>
                      {format(day, 'EEEE d', { locale: es })}
                    </div>
                    <div className="space-y-2">
                      {dayAppts.sort((a,b) => new Date(a.date).getTime()-new Date(b.date).getTime()).map(a => {
                        const names = apptPatientNames(a);
                        return (
                          <div key={a.id} className="card flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
                              {names.length > 1 ? <Users size={18} className="text-navy-500" /> : <Clock size={18} className="text-navy-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-navy-700 truncate">{names.join(', ')}</div>
                              <div className="text-xs text-navy-400">{a.patient.tutor.name} · {a.duration} min</div>
                              <div className="text-xs text-navy-500 font-medium mt-0.5">{format(new Date(a.date), 'HH:mm', { locale: es })}</div>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <span className={STATUS_CLASS[a.status]}>{STATUS_LABEL[a.status]}</span>
                              <div className="flex gap-1">
                                <button onClick={() => setEditAppt(a)} className="p-1 text-navy-300 hover:text-navy-600 transition-colors"><Pencil size={13} /></button>
                                <button onClick={() => deleteAppt.mutate(a.id)} className="p-1 text-navy-300 hover:text-red-400 transition-colors"><X size={14} /></button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── MONTH view (mobile) ── */}
        {calView === 'month' && (
          <div>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {['L','M','X','J','V','S','D'].map(d => (
                <div key={d} className="text-center text-xs font-semibold text-navy-400 py-1">{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {monthDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const dayAppts = apptsByDay(day);
                const isToday = isSameDay(day, new Date());
                return (
                  <button
                    key={i}
                    onClick={() => { setAnchor(day); setCalView('day'); }}
                    className={`rounded-lg p-1 text-center transition-colors min-h-[44px] flex flex-col items-center ${
                      isToday ? 'bg-teal-500 text-white' : 'hover:bg-navy-50 text-navy-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{format(day, 'd')}</span>
                    {dayAppts.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                        {dayAppts.slice(0,3).map(a => (
                          <span key={a.id} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white/70' : 'bg-teal-500'}`} />
                        ))}
                        {dayAppts.length > 3 && <span className={`text-[9px] ${isToday ? 'text-white/80' : 'text-navy-400'}`}>+{dayAppts.length-3}</span>}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Upcoming list below grid */}
            <div className="mt-4 space-y-2">
              {appointments.length === 0 ? (
                <p className="text-center text-navy-300 text-sm py-4">Sin citas este mes</p>
              ) : (
                appointments
                  .slice()
                  .sort((a,b) => new Date(a.date).getTime()-new Date(b.date).getTime())
                  .map(a => {
                    const names = apptPatientNames(a);
                    return (
                      <div key={a.id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-navy-50 transition-colors cursor-pointer" onClick={() => setEditAppt(a)}>
                        <div className="text-center w-9 flex-shrink-0">
                          <div className="text-xs text-navy-400 uppercase">{format(new Date(a.date), 'EEE', { locale: es })}</div>
                          <div className="text-base font-bold text-navy-700 leading-none">{format(new Date(a.date), 'd')}</div>
                        </div>
                        <div className="w-px h-8 bg-navy-100 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-navy-700 text-sm truncate">{names.join(', ')}</div>
                          <div className="text-xs text-navy-400">{format(new Date(a.date), 'HH:mm')} · {a.duration} min</div>
                        </div>
                        <span className={`${STATUS_CLASS[a.status]} flex-shrink-0`}>{STATUS_LABEL[a.status]}</span>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/* DESKTOP: always week grid                               */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="hidden md:block card p-0 overflow-auto">
        <div className="grid" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
          <div className="border-b border-navy-100 p-2" />
          {days7.map(day => (
            <div key={day.toISOString()} className={`border-b border-l border-navy-100 p-2 text-center ${isSameDay(day, new Date()) ? 'bg-teal-50' : ''}`}>
              <div className="text-xs text-navy-400">{format(day, 'EEE', { locale: es })}</div>
              <div className={`text-sm font-semibold mt-0.5 ${isSameDay(day, new Date()) ? 'text-teal-600' : 'text-navy-700'}`}>{format(day, 'd')}</div>
            </div>
          ))}
          {SLOTS.map(slot => (
            <>
              <div key={`h-${slot}`} className="border-b border-navy-50 px-2 py-1 text-xs text-navy-300 text-right leading-[36px]">{slotLabel(slot)}</div>
              {days7.map(day => {
                const appts = apptForDaySlot(day, slot);
                return (
                  <div key={`${day.toISOString()}-${slot}`} className={`border-b border-l border-navy-50 p-1 min-h-[36px] ${isSameDay(day, new Date()) ? 'bg-teal-50/40' : ''}`}>
                    {appts.map(a => {
                      const names = apptPatientNames(a);
                      return (
                        <div key={a.id} onClick={() => setEditAppt(a)}
                          className="bg-navy-700 text-white text-xs rounded-lg px-2 py-1 mb-1 group relative cursor-pointer hover:bg-navy-600 transition-colors"
                        >
                          <div className="font-medium truncate flex items-center gap-1">
                            {names.length > 1 && <Users size={9} className="flex-shrink-0 opacity-70" />}
                            {names.join(', ')}
                          </div>
                          <div className="text-navy-200 truncate text-[10px]">{a.patient.tutor.name} · {a.duration}min</div>
                          <div className="text-[10px] mt-0.5">
                            <span className={`inline-block rounded px-1 ${
                              a.status === 'COMPLETED' ? 'bg-green-500/30 text-green-200' :
                              a.status === 'CANCELLED' ? 'bg-red-500/30 text-red-200' :
                              a.status === 'NO_SHOW' ? 'bg-yellow-500/30 text-yellow-200' :
                              'bg-blue-500/30 text-blue-200'
                            }`}>{STATUS_LABEL[a.status]}</span>
                          </div>
                          <button onClick={e => { e.stopPropagation(); deleteAppt.mutate(a.id); }}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-navy-300 hover:text-red-400"
                          ><X size={10} /></button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {showNew && user && (
        <AppointmentModal mode="new" fisioId={user.id}
          onClose={() => setShowNew(false)}
          onSaved={() => { qc.invalidateQueries({ queryKey: ['appointments'] }); setShowNew(false); }}
        />
      )}
      {editAppt && (
        <AppointmentModal mode="edit" appointment={editAppt} fisioId={editAppt.fisio.id}
          onClose={() => setEditAppt(null)}
          onSaved={() => { qc.invalidateQueries({ queryKey: ['appointments'] }); setEditAppt(null); }}
        />
      )}
    </div>
  );
}

// ─── PatientPicker ───────────────────────────────────────────────────────────
function PatientPicker({ value, onChange, patients }: {
  value: number[];
  onChange: (ids: number[]) => void;
  patients: Patient[];
}) {
  const [search, setSearch] = useState('');
  const filtered = patients.filter(p =>
    `${p.name} ${p.tutor.name}`.toLowerCase().includes(search.toLowerCase())
  );
  const selected = patients.filter(p => value.includes(p.id));

  function toggle(id: number) {
    onChange(value.includes(id) ? value.filter(x => x !== id) : [...value, id]);
  }

  return (
    <div className="space-y-2">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map(p => (
            <span key={p.id} className="inline-flex items-center gap-1 bg-navy-100 text-navy-700 text-xs rounded-full px-2 py-0.5">
              {p.name}
              <button type="button" onClick={() => toggle(p.id)} className="text-navy-400 hover:text-red-500 transition-colors"><X size={10} /></button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-navy-300 pointer-events-none" />
        <input className="input pl-7 text-sm" placeholder="Buscar paciente…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="border border-navy-100 rounded-xl max-h-40 overflow-y-auto divide-y divide-navy-50">
        {filtered.length === 0 && <p className="text-xs text-navy-300 text-center py-3">Sin resultados</p>}
        {filtered.map(p => (
          <label key={p.id} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-navy-50 transition-colors">
            <input type="checkbox" checked={value.includes(p.id)} onChange={() => toggle(p.id)} className="accent-teal-500" />
            <span className="text-sm text-navy-700">{p.name}</span>
            <span className="text-xs text-navy-400 ml-auto">{p.tutor.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── AppointmentModal ────────────────────────────────────────────────────────
interface ModalProps {
  mode: 'new' | 'edit';
  fisioId: number;
  appointment?: Appointment;
  onClose: () => void;
  onSaved: () => void;
}

function AppointmentModal({ mode, fisioId, appointment, onClose, onSaved }: ModalProps) {
  const initialPatientIds = (() => {
    if (!appointment) return [];
    if (appointment.appointmentPatients?.length) return appointment.appointmentPatients.map(ap => ap.patient.id);
    return appointment.patient ? [appointment.patient.id] : [];
  })();

  const [form, setForm] = useState(() => ({
    date: appointment ? isoToLocal(appointment.date) : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    duration: String(appointment?.duration ?? 60),
    status: appointment?.status ?? 'SCHEDULED',
    notes: appointment?.notes ?? '',
  }));
  const [patientIds, setPatientIds] = useState<number[]>(initialPatientIds);
  const [loading, setLoading] = useState(false);

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: () => api.get('/patients'),
  });

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'new' && patientIds.length === 0) return;
    setLoading(true);
    try {
      const payload = { date: localToISO(form.date), duration: Number(form.duration), status: form.status, notes: form.notes };
      if (mode === 'new') {
        await api.post('/appointments', { ...payload, patientId: patientIds[0], patientIds, fisioId });
      } else {
        await api.patch(`/appointments/${appointment!.id}`, { ...payload, ...(patientIds.length > 0 && { patientIds }) });
      }
      onSaved();
    } finally {
      setLoading(false);
    }
  }

  const editPatientNames = (() => {
    if (!appointment) return '';
    if (appointment.appointmentPatients?.length) return appointment.appointmentPatients.map(ap => ap.patient.name).join(', ');
    return appointment.patient?.name ?? '';
  })();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-navy-700 mb-4">
          {mode === 'new' ? 'Nueva cita' : `Editar — ${editPatientNames}`}
        </h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">Paciente(s) {mode === 'new' && '*'}</label>
            <PatientPicker value={patientIds} onChange={setPatientIds} patients={patients} />
            {mode === 'new' && patientIds.length === 0 && (
              <p className="text-xs text-red-400 mt-1">Selecciona al menos un paciente</p>
            )}
          </div>
          <div><label className="label">Fecha y hora *</label>
            <input className="input" type="datetime-local" value={form.date} onChange={f('date')} required />
          </div>
          <div><label className="label">Duración (min)</label>
            <select className="input" value={form.duration} onChange={f('duration')}>
              {[30,45,60,90,120].map(d => <option key={d} value={d}>{d} min</option>)}
            </select>
          </div>
          {mode === 'edit' && (
            <div><label className="label">Estado</label>
              <select className="input" value={form.status} onChange={f('status')}>
                <option value="SCHEDULED">Programada</option>
                <option value="COMPLETED">Completada</option>
                <option value="CANCELLED">Cancelada</option>
                <option value="NO_SHOW">No asistió</option>
              </select>
            </div>
          )}
          <div><label className="label">Notas</label>
            <textarea className="input resize-none" rows={2} value={form.notes} onChange={f('notes')} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
            <button type="submit" disabled={loading || (mode === 'new' && patientIds.length === 0)} className="btn-primary flex-1 justify-center">
              {loading ? 'Guardando…' : mode === 'new' ? 'Crear cita' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
