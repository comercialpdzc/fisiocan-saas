import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { FileText, Plus, Pin, Trash2, Pencil, Apple, Dumbbell } from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Plan {
  id: number; title: string; type: string; content: string; pinned: boolean;
  createdAt: string; updatedAt: string;
  patient: { id: number; name: string };
  createdBy: { id: number; name: string };
}
interface Patient { id: number; name: string; tutor: { name: string } }

const TYPE_CONFIG: Record<string, { label: string; icon: React.ElementType; cls: string }> = {
  EXERCISE:  { label: 'Ejercicios', icon: Dumbbell, cls: 'bg-orange-100 text-orange-700 badge' },
  NUTRITION: { label: 'Nutrición',  icon: Apple,    cls: 'bg-green-100 text-green-700 badge'   },
  GENERAL:   { label: 'General',    icon: FileText,  cls: 'badge-blue'                          },
};

export default function PlansPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Plan | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [filterPatient, setFilterPatient] = useState('');

  const { data: plans = [] } = useQuery<Plan[]>({
    queryKey: ['plans', filterPatient],
    queryFn: () => api.get(`/plans${filterPatient ? `?patientId=${filterPatient}` : ''}`),
  });

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: () => api.get('/patients'),
  });

  const deletePlan = useMutation({
    mutationFn: (id: number) => api.delete(`/plans/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['plans'] }),
  });

  const togglePin = useMutation({
    mutationFn: ({ id, pinned }: { id: number; pinned: boolean }) => api.patch(`/plans/${id}`, { pinned }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['plans'] }),
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Planes</h1>
          <p className="text-navy-400 text-sm mt-0.5">Planes de ejercicio, nutrición y seguimiento</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary"><Plus size={16} /> Nuevo plan</button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select className="input max-w-xs" value={filterPatient} onChange={e => setFilterPatient(e.target.value)}>
          <option value="">Todos los pacientes</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name} · {p.tutor.name}</option>)}
        </select>
      </div>

      {plans.length === 0 && (
        <div className="card text-center py-12">
          <FileText size={40} className="mx-auto mb-3 text-navy-200" />
          <p className="text-navy-300">Sin planes creados aún</p>
        </div>
      )}

      <div className="space-y-4">
        {plans.map(plan => {
          const cfg = TYPE_CONFIG[plan.type] ?? TYPE_CONFIG.GENERAL;
          const Icon = cfg.icon;
          return (
            <div key={plan.id} className={`card ${plan.pinned ? 'border-teal-200' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${plan.type === 'NUTRITION' ? 'bg-green-100' : plan.type === 'EXERCISE' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  <Icon size={18} className={plan.type === 'NUTRITION' ? 'text-green-600' : plan.type === 'EXERCISE' ? 'text-orange-600' : 'text-blue-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-navy-700">{plan.title}</span>
                    {plan.pinned && <Pin size={12} className="text-teal-500" />}
                    <span className={cfg.cls}>{cfg.label}</span>
                    <span className="text-xs text-navy-400">→ {plan.patient.name}</span>
                  </div>
                  <p className="text-xs text-navy-400 mt-0.5">
                    {format(new Date(plan.updatedAt), "d MMM yyyy", { locale: es })}
                  </p>
                  <p className="text-sm text-navy-600 mt-2 line-clamp-2 whitespace-pre-wrap">{plan.content}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => togglePin.mutate({ id: plan.id, pinned: !plan.pinned })}
                    className={`p-1.5 rounded-lg transition-colors ${plan.pinned ? 'text-teal-500 bg-teal-50' : 'text-navy-300 hover:text-teal-500 hover:bg-teal-50'}`}
                    title={plan.pinned ? 'Desfijar' : 'Fijar'}
                  ><Pin size={14} /></button>
                  <button onClick={() => setEditing(plan)} className="p-1.5 text-navy-300 hover:text-navy-600 transition-colors rounded-lg hover:bg-navy-50"><Pencil size={14} /></button>
                  <button onClick={() => { if (confirm('¿Eliminar este plan?')) deletePlan.mutate(plan.id); }}
                    className="p-1.5 text-navy-300 hover:text-red-500 transition-colors rounded-lg hover:bg-navy-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(showNew || editing) && (
        <PlanModal
          patients={patients}
          initial={editing ?? undefined}
          onClose={() => { setShowNew(false); setEditing(null); }}
          onSaved={() => { qc.invalidateQueries({ queryKey: ['plans'] }); setShowNew(false); setEditing(null); }}
        />
      )}
    </div>
  );
}

function PlanModal({ patients, initial, onClose, onSaved }: {
  patients: Patient[]; initial?: Plan; onClose: () => void; onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title:     initial?.title     ?? '',
    type:      initial?.type      ?? 'GENERAL',
    content:   initial?.content   ?? '',
    patientId: initial?.patient.id.toString() ?? '',
  });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, patientId: Number(form.patientId) };
      if (initial) { await api.patch(`/plans/${initial.id}`, payload); }
      else { await api.post('/plans', payload); }
      onSaved();
    } finally { setLoading(false); }
  }

  const f = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-navy-700 mb-4">{initial ? 'Editar plan' : 'Nuevo plan'}</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className="label">Título *</label>
              <input className="input" value={form.title} onChange={f('title')} required />
            </div>
            <div><label className="label">Tipo</label>
              <select className="input" value={form.type} onChange={f('type')}>
                <option value="GENERAL">General</option>
                <option value="EXERCISE">Ejercicios</option>
                <option value="NUTRITION">Nutrición</option>
              </select>
            </div>
            <div><label className="label">Paciente *</label>
              <select className="input" value={form.patientId} onChange={f('patientId')} required>
                <option value="">Seleccionar…</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name} · {p.tutor.name}</option>)}
              </select>
            </div>
          </div>
          <div><label className="label">Contenido *</label>
            <textarea
              className="input resize-none font-mono text-sm"
              rows={8}
              placeholder="Escribe el plan aquí. Puedes usar saltos de línea para estructurarlo:&#10;&#10;🏃 Ejercicio 1: Movilidad de cadera&#10;Repeticiones: 3x10&#10;Descripción: ..."
              value={form.content}
              onChange={f('content')}
              required
            />
            <p className="text-xs text-navy-300 mt-1">El texto se mostrará tal cual al propietario. Usa emojis y saltos de línea para estructurarlo.</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">{loading ? 'Guardando…' : 'Guardar plan'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
