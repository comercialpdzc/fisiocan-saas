import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { ArrowLeft, PawPrint, Phone, Mail, Dumbbell, CalendarDays, FileText, Plus, X } from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Routine { id: number; name: string; category?: string; duration?: number; videoUrl?: string; }
interface PatientRoutine { id: number; routine: Routine; notes?: string; }

interface Patient {
  id: number; name: string; species: string; breed?: string; birthDate?: string;
  weight?: string; sex?: string; neutered?: string; active: boolean;
  tutor: { id: number; name: string; phone: string; email?: string };
  intakeData?: Record<string, string>;
  appointments: Array<{ id: number; date: string; duration: number; status: string; notes?: string }>;
  rehabRoutines: PatientRoutine[];
}

const STATUS_LABEL: Record<string, string> = { SCHEDULED: 'Programada', COMPLETED: 'Completada', CANCELLED: 'Cancelada', NO_SHOW: 'No asistió' };
const STATUS_CLASS: Record<string, string> = { SCHEDULED: 'badge-blue', COMPLETED: 'badge-green', CANCELLED: 'badge-red', NO_SHOW: 'badge-yellow' };

type TabKey = 'intake' | 'appointments' | 'routines';
const TABS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
  { key: 'intake',        label: 'Ficha inicial', Icon: FileText },
  { key: 'appointments',  label: 'Citas',         Icon: CalendarDays },
  { key: 'routines',      label: 'Rutinas',        Icon: Dumbbell },
];

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const [tab, setTab] = useState<TabKey>('intake');
  const [showAddRoutine, setShowAddRoutine] = useState(false);

  const { data: patient, isLoading } = useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: () => api.get(`/patients/${id}`),
  });

  const { data: allRoutines = [] } = useQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: () => api.get('/routines'),
    enabled: showAddRoutine,
  });

  const removeRoutine = useMutation({
    mutationFn: (prId: number) => api.delete(`/routines/assign/${prId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['patient', id] }),
  });

  const addRoutine = useMutation({
    mutationFn: (routineId: number) => api.post('/routines/assign', { patientId: Number(id), routineId }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['patient', id] }); setShowAddRoutine(false); },
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;
  if (!patient) return <div className="p-8 text-red-500">Paciente no encontrado</div>;

  const assignedIds = new Set(patient.rehabRoutines.map(pr => pr.routine.id));

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <Link to="/patients" className="inline-flex items-center gap-1 text-sm text-navy-400 hover:text-navy-600 mb-6">
        <ArrowLeft size={14} /> Volver a pacientes
      </Link>

      <div className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
          <PawPrint size={28} className="text-teal-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-navy-700">{patient.name}</h1>
            <span className={patient.active ? 'badge-green' : 'badge-gray'}>{patient.active ? 'Activo' : 'Inactivo'}</span>
          </div>
          <p className="text-navy-400 mt-0.5">{patient.species}{patient.breed ? ` · ${patient.breed}` : ''}{patient.weight ? ` · ${patient.weight}` : ''}{patient.sex ? ` · ${patient.sex}` : ''}{patient.neutered ? ` · ${patient.neutered === 'Sí' ? 'Esterilizado/a' : 'Sin esterilizar'}` : ''}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1 text-navy-500"><Phone size={13} /> {patient.tutor.name} · {patient.tutor.phone}</span>
            {patient.tutor.email && <span className="flex items-center gap-1 text-navy-400"><Mail size={13} /> {patient.tutor.email}</span>}
          </div>
        </div>
        <Link to={`/chat/${patient.tutor.id}`} className="btn-secondary text-sm">Contactar tutor</Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-navy-100 rounded-xl p-1 w-fit">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? 'bg-white text-navy-700 shadow-sm' : 'text-navy-500 hover:text-navy-700'}`}
          >
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {/* Intake */}
      {tab === 'intake' && (
        <div className="card space-y-5">
          {!patient.intakeData ? (
            <p className="text-navy-300">Sin ficha de anamnesis registrada.</p>
          ) : (
            Object.entries({
              'Motivo consulta': patient.intakeData.motivoConsulta,
              'Desde cuándo': patient.intakeData.desdeCuando,
              'Inicio síntomas': patient.intakeData.inicioSintomas,
              'Momentos peor/mejor': patient.intakeData.momentosPeorMejor,
              'Síntomas observados': patient.intakeData.sintomasObservados,
              'Dolor al comer': patient.intakeData.dolorAlComer,
              'Lesiones previas': patient.intakeData.lesionesPrevias,
              'Cirugía previa': patient.intakeData.cirugiaPrevia,
              'Detalle cirugía': patient.intakeData.cirugiaDetalle,
              'Diagnóstico previo': patient.intakeData.diagnosticoPrevio,
              'Medicación': patient.intakeData.medicacion,
              'Detalle medicación': patient.intakeData.medicacionDetalle,
              'Fisioterapia previa': patient.intakeData.fisioterapiaPrevia,
              'Detalle fisioterapia': patient.intakeData.fisioterapiaDetalle,
              'Mejoría con': patient.intakeData.mejoriaCon,
              'Veterinario referencia': patient.intakeData.veterinarioRef,
              'Nivel actividad': patient.intakeData.nivelActividad,
              'Tipo paseos': patient.intakeData.tipoPaseos,
              'Dónde duerme': patient.intakeData.dondeDuerme,
              'Escaleras': patient.intakeData.escaleras,
              'Observaciones': patient.intakeData.observaciones,
              'Objetivos': patient.intakeData.objetivos,
            }).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-2 text-sm border-b border-navy-50 pb-3 last:border-0 last:pb-0">
                <span className="font-medium text-navy-500">{k}</span>
                <span className="col-span-2 text-navy-700">{v}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Appointments */}
      {tab === 'appointments' && (
        <div className="card p-0 overflow-hidden">
          {patient.appointments.length === 0 ? (
            <p className="p-6 text-navy-300">Sin citas registradas.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-navy-50 border-b border-navy-100">
                <tr>
                  {['Fecha', 'Duración', 'Estado', 'Notas'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-navy-500 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {patient.appointments.map(a => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 text-sm text-navy-700">{format(new Date(a.date), "d MMM yyyy · HH:mm", { locale: es })}</td>
                    <td className="px-4 py-3 text-sm text-navy-500">{a.duration} min</td>
                    <td className="px-4 py-3"><span className={STATUS_CLASS[a.status]}>{STATUS_LABEL[a.status]}</span></td>
                    <td className="px-4 py-3 text-sm text-navy-400">{a.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Routines */}
      {tab === 'routines' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button onClick={() => setShowAddRoutine(true)} className="btn-secondary text-sm"><Plus size={14} /> Añadir rutina</button>
          </div>
          {patient.rehabRoutines.length === 0 && <div className="card text-navy-300">Sin rutinas asignadas.</div>}
          {patient.rehabRoutines.map(pr => (
            <div key={pr.id} className="card flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-navy-700">{pr.routine.name}</span>
                  {pr.routine.category && <span className="badge-blue">{pr.routine.category}</span>}
                  {pr.routine.duration && <span className="text-xs text-navy-400">{pr.routine.duration} min</span>}
                </div>
                {pr.notes && <p className="text-sm text-navy-400 mt-1">{pr.notes}</p>}
                {pr.routine.videoUrl && (
                  <a href={pr.routine.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-teal-500 hover:underline mt-1 inline-block">Ver video →</a>
                )}
              </div>
              <button onClick={() => removeRoutine.mutate(pr.id)} className="p-1.5 text-navy-300 hover:text-red-500 transition-colors rounded-lg">
                <X size={16} />
              </button>
            </div>
          ))}

          {showAddRoutine && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowAddRoutine(false)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-navy-700 mb-4">Añadir rutina</h2>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {allRoutines.filter(r => !assignedIds.has(r.id)).map(r => (
                    <button key={r.id} onClick={() => addRoutine.mutate(r.id)}
                      className="w-full text-left p-3 rounded-xl hover:bg-navy-50 transition-colors border border-navy-100">
                      <div className="font-medium text-navy-700 text-sm">{r.name}</div>
                      <div className="text-xs text-navy-400">{r.category}{r.duration ? ` · ${r.duration} min` : ''}</div>
                    </button>
                  ))}
                  {allRoutines.filter(r => !assignedIds.has(r.id)).length === 0 && (
                    <p className="text-navy-300 text-sm text-center py-4">Todas las rutinas ya asignadas</p>
                  )}
                </div>
                <button onClick={() => setShowAddRoutine(false)} className="btn-ghost w-full justify-center mt-4">Cerrar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
