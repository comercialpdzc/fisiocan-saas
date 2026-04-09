import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PawPrint, Plus, Search, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';

interface Patient {
  id: number;
  name: string;
  species: string;
  breed?: string;
  weight?: string;
  sex?: string;
  active: boolean;
  tutor: { id: number; name: string; phone: string };
  _count: { appointments: number };
}

interface Tutor { id: number; name: string; phone: string; }

export default function PatientsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: () => api.get('/patients'),
  });

  const { data: tutors = [] } = useQuery<Tutor[]>({
    queryKey: ['tutors'],
    queryFn: () => api.get('/tutors'),
  });

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tutor.name.toLowerCase().includes(search.toLowerCase()) ||
    p.species.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Pacientes</h1>
          <p className="text-navy-400 text-sm mt-0.5">{patients.filter(p => p.active).length} activos</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary">
          <Plus size={16} /> Nuevo paciente
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
        <input
          className="input pl-9"
          placeholder="Buscar por nombre, tutor o especie…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="card p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-navy-300">
            <PawPrint size={40} className="mx-auto mb-3 opacity-40" />
            <p>No hay pacientes{search ? ' con ese filtro' : ''}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr>
                {['Paciente', 'Especie / Raza', 'Tutor', 'Citas', 'Estado', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-navy-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-navy-50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <PawPrint size={14} className="text-teal-600" />
                      </div>
                      <span className="font-medium text-navy-700">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-500">{p.species}{p.breed ? ` · ${p.breed}` : ''}</td>
                  <td className="px-4 py-3 text-sm text-navy-500">{p.tutor.name}</td>
                  <td className="px-4 py-3 text-sm text-navy-400">{p._count.appointments}</td>
                  <td className="px-4 py-3">
                    <span className={p.active ? 'badge-green' : 'badge-gray'}>
                      {p.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/patients/${p.id}`} className="text-navy-300 group-hover:text-teal-500 transition-colors">
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showNew && <NewPatientModal tutors={tutors} onClose={() => setShowNew(false)} onCreated={() => { qc.invalidateQueries({ queryKey: ['patients'] }); setShowNew(false); }} />}
    </div>
  );
}

function NewPatientModal({ tutors, onClose, onCreated }: { tutors: Tutor[]; onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: '', species: 'Perro', breed: '', weight: '', sex: '', neutered: '', tutorId: '' });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/patients', { ...form, tutorId: Number(form.tutorId), weight: form.weight ? `${form.weight} kg` : '' });
      onCreated();
    } finally { setLoading(false); }
  }

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-navy-700 mb-4">Nuevo paciente</h2>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Nombre *</label><input className="input" value={form.name} onChange={f('name')} required /></div>
            <div><label className="label">Especie *</label>
              <select className="input" value={form.species} onChange={f('species')}>
                <option>Perro</option><option>Gato</option><option>Caballo</option><option>Otro</option>
              </select>
            </div>
            <div><label className="label">Raza</label><input className="input" value={form.breed} onChange={f('breed')} /></div>
            <div><label className="label">Peso (kg)</label><input className="input" type="number" step="0.1" value={form.weight} onChange={f('weight')} /></div>
            <div><label className="label">Sexo</label>
              <select className="input" value={form.sex} onChange={f('sex')}>
                <option value="">—</option><option>Macho</option><option>Hembra</option>
              </select>
            </div>
            <div><label className="label">Esterilizado</label>
              <select className="input" value={form.neutered} onChange={f('neutered')}>
                <option value="">—</option><option>Sí</option><option>No</option>
              </select>
            </div>
          </div>
          <div><label className="label">Tutor *</label>
            <select className="input" value={form.tutorId} onChange={f('tutorId')} required>
              <option value="">Seleccionar tutor…</option>
              {tutors.map(t => <option key={t.id} value={t.id}>{t.name} · {t.phone}</option>)}
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">{loading ? 'Guardando…' : 'Crear paciente'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
