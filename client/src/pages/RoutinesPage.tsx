import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Dumbbell, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { api } from '../lib/api';

interface Routine {
  id: number; name: string; description?: string;
  videoUrl?: string; duration?: number; category?: string;
}

const CATEGORIES = ['Movilidad', 'Hidroterapia', 'Propiocepción', 'Fortalecimiento', 'Flexibilidad', 'Masoterapia', 'Otro'];

export default function RoutinesPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Routine | null>(null);
  const [showNew, setShowNew] = useState(false);

  const { data: routines = [] } = useQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: () => api.get('/routines'),
  });

  const deleteRoutine = useMutation({
    mutationFn: (id: number) => api.delete(`/routines/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['routines'] }),
  });

  const byCategory = CATEGORIES.reduce<Record<string, Routine[]>>((acc, cat) => {
    acc[cat] = routines.filter(r => r.category === cat);
    return acc;
  }, {});
  const uncategorized = routines.filter(r => !r.category || !CATEGORIES.includes(r.category));

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-700">Rutinas</h1>
          <p className="text-navy-400 text-sm mt-0.5">{routines.length} en biblioteca</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary">
          <Plus size={16} /><span className="hidden sm:inline"> Nueva rutina</span>
        </button>
      </div>

      <div className="space-y-6">
        {[...CATEGORIES.filter(c => byCategory[c].length > 0), ...(uncategorized.length ? ['Sin categoría'] : [])].map(cat => (
          <div key={cat}>
            <h2 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">{cat}</h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {(cat === 'Sin categoría' ? uncategorized : byCategory[cat]).map(r => (
                <div key={r.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-navy-700 text-sm">{r.name}</span>
                        {r.duration && <span className="text-xs text-navy-400">{r.duration} min</span>}
                      </div>
                      {r.description && <p className="text-xs text-navy-400 mt-1 line-clamp-2">{r.description}</p>}
                      {r.videoUrl && (
                        <a href={r.videoUrl} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-teal-500 hover:underline mt-2">
                          <ExternalLink size={11} /> Ver video
                        </a>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => setEditing(r)} className="p-2 text-navy-300 hover:text-navy-600 transition-colors rounded-lg hover:bg-navy-50 min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => { if (confirm('¿Eliminar esta rutina?')) deleteRoutine.mutate(r.id); }}
                        className="p-2 text-navy-300 hover:text-red-500 transition-colors rounded-lg hover:bg-navy-50 min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {routines.length === 0 && (
          <div className="text-center py-12 text-navy-300">
            <Dumbbell size={40} className="mx-auto mb-3 opacity-40" />
            <p>Sin rutinas en biblioteca</p>
          </div>
        )}
      </div>

      {(showNew || editing) && (
        <RoutineModal
          initial={editing ?? undefined}
          onClose={() => { setShowNew(false); setEditing(null); }}
          onSaved={() => { qc.invalidateQueries({ queryKey: ['routines'] }); setShowNew(false); setEditing(null); }}
        />
      )}
    </div>
  );
}

function RoutineModal({ initial, onClose, onSaved }: { initial?: Routine; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    videoUrl: initial?.videoUrl ?? '',
    duration: initial?.duration?.toString() ?? '',
    category: initial?.category ?? '',
  });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, duration: form.duration ? Number(form.duration) : undefined };
      if (initial) { await api.patch(`/routines/${initial.id}`, payload); }
      else { await api.post('/routines', payload); }
      onSaved();
    } finally { setLoading(false); }
  }

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-navy-700 mb-4">{initial ? 'Editar rutina' : 'Nueva rutina'}</h2>
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">Nombre *</label><input className="input" value={form.name} onChange={f('name')} required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Categoría</label>
              <select className="input" value={form.category} onChange={f('category')}>
                <option value="">—</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="label">Duración (min)</label>
              <input className="input" type="number" min="1" value={form.duration} onChange={f('duration')} />
            </div>
          </div>
          <div><label className="label">Descripción</label>
            <textarea className="input resize-none" rows={3} value={form.description} onChange={f('description')} />
          </div>
          <div><label className="label">URL del vídeo</label>
            <input className="input" type="url" placeholder="https://youtube.com/…" value={form.videoUrl} onChange={f('videoUrl')} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">{loading ? 'Guardando…' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
