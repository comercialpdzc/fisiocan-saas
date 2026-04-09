import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Users, Plus, Search, MessageSquare, PawPrint } from 'lucide-react';
import { api } from '../lib/api';

interface Tutor {
  id: number;
  name: string;
  phone: string;
  email?: string;
  howFoundUs?: string;
  _count: { patients: number };
}

export default function TutorsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const { data: tutors = [] } = useQuery<Tutor[]>({
    queryKey: ['tutors'],
    queryFn: () => api.get('/tutors'),
  });

  const filtered = tutors.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.phone.includes(search) ||
    (t.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Tutores</h1>
          <p className="text-navy-400 text-sm mt-0.5">{tutors.length} registrados</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary"><Plus size={16} /> Nuevo tutor</button>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
        <input className="input pl-9" placeholder="Buscar por nombre, teléfono o email…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-navy-300">
            <Users size={40} className="mx-auto mb-3 opacity-40" />
            <p>No hay tutores{search ? ' con ese filtro' : ''}</p>
          </div>
        )}
        {filtered.map(t => (
          <div key={t.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center">
                <Users size={18} className="text-navy-500" />
              </div>
              <Link to={`/chat/${t.id}`} className="p-1.5 text-navy-300 hover:text-teal-500 transition-colors rounded-lg hover:bg-navy-50">
                <MessageSquare size={16} />
              </Link>
            </div>
            <h3 className="font-semibold text-navy-700">{t.name}</h3>
            <p className="text-sm text-navy-400 mt-0.5">{t.phone}</p>
            {t.email && <p className="text-xs text-navy-300 mt-0.5">{t.email}</p>}
            {t.howFoundUs && <p className="text-xs text-navy-300 mt-0.5">Nos conoció: {t.howFoundUs}</p>}
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-navy-50 text-xs text-navy-400">
              <PawPrint size={12} />
              <span>{t._count.patients} paciente{t._count.patients !== 1 ? 's' : ''}</span>
            </div>
          </div>
        ))}
      </div>

      {showNew && (
        <NewTutorModal
          onClose={() => setShowNew(false)}
          onCreated={() => { qc.invalidateQueries({ queryKey: ['tutors'] }); setShowNew(false); }}
        />
      )}
    </div>
  );
}

function NewTutorModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', howFoundUs: '' });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await api.post('/tutors', form); onCreated(); }
    finally { setLoading(false); }
  }

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-navy-700 mb-4">Nuevo tutor</h2>
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">Nombre *</label><input className="input" value={form.name} onChange={f('name')} required /></div>
          <div><label className="label">Teléfono *</label><input className="input" value={form.phone} onChange={f('phone')} required /></div>
          <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={f('email')} /></div>
          <div><label className="label">Cómo nos conoció</label>
            <select className="input" value={form.howFoundUs} onChange={f('howFoundUs')}>
              <option value="">—</option>
              <option>Redes sociales</option><option>Recomendación</option>
              <option>Google</option><option>Veterinario</option><option>Otro</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">{loading ? 'Guardando…' : 'Crear tutor'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
