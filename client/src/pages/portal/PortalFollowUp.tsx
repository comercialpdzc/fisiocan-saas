import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, Upload, Trash2, Plus, Video, Image } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PortalMe {
  patients: Array<{ id: number; name: string }>;
}

interface FollowUpMedia {
  id: number;
  patientId: number;
  url: string;
  mediaType: string;
  caption?: string;
  createdAt: string;
  patient: { id: number; name: string };
}

export default function PortalFollowUp() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ patientId: '', caption: '' });
  const [pendingFile, setPendingFile] = useState<{ file: File; preview: string; type: string } | null>(null);

  const { data: me } = useQuery<PortalMe>({
    queryKey: ['portal-me'],
    queryFn: () => portalApi.get('/portal/me'),
  });

  const { data: media = [], isLoading } = useQuery<FollowUpMedia[]>({
    queryKey: ['portal-followup'],
    queryFn: () => portalApi.get('/portal/followup'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => portalApi.delete(`/portal/followup/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['portal-followup'] }),
  });

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const preview = isVideo ? '' : URL.createObjectURL(file);
    setPendingFile({ file, preview, type: isVideo ? 'video' : 'photo' });
    if (me?.patients.length === 1) setForm(f => ({ ...f, patientId: String(me.patients[0].id) }));
    e.target.value = '';
  }

  async function handleUpload() {
    if (!pendingFile || !form.patientId) return;
    const patientName = me?.patients.find(p => p.id === Number(form.patientId))?.name ?? '';
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', pendingFile.file);
      fd.append('patientName', patientName);
      fd.append('context', 'followup');
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.url) { alert(data.error ?? 'Error al subir'); return; }
      await portalApi.post('/portal/followup', {
        patientId: Number(form.patientId),
        url: data.url,
        mediaType: pendingFile.type,
        caption: form.caption || undefined,
      });
      qc.invalidateQueries({ queryKey: ['portal-followup'] });
      setPendingFile(null);
      setForm(f => ({ ...f, caption: '' }));
    } finally { setUploading(false); }
  }

  const byPatient = media.reduce<Record<string, FollowUpMedia[]>>((acc, m) => {
    const key = m.patient.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-navy-700">Seguimiento</h1>
        <p className="text-navy-400 text-sm mt-0.5">Sube fotos o vídeos de progreso para compartir con tu fisioterapeuta</p>
      </div>

      {/* Upload card */}
      <div className="card mb-8">
        {!pendingFile ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-navy-200 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-teal-400 hover:bg-teal-50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <Upload size={22} className="text-teal-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-navy-700">Subir foto o vídeo</p>
              <p className="text-xs text-navy-400 mt-0.5">JPG, PNG, MP4, MOV · máx 20 MB</p>
            </div>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {pendingFile.type === 'photo' && pendingFile.preview ? (
                <img src={pendingFile.preview} alt="preview" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <Video size={28} className="text-navy-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-700 truncate">{pendingFile.file.name}</p>
                <p className="text-xs text-navy-400">{(pendingFile.file.size / (1024 * 1024)).toFixed(1)} MB</p>
              </div>
              <button onClick={() => setPendingFile(null)} className="p-2 text-navy-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
            {(me?.patients.length ?? 0) > 1 && (
              <div>
                <label className="label">Mascota *</label>
                <select className="input" value={form.patientId} onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))}>
                  <option value="">Seleccionar…</option>
                  {me?.patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="label">Nota (opcional)</label>
              <input className="input" placeholder="Ej: Día 7 del tratamiento, ya apoya mejor la pata..." value={form.caption}
                onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} />
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading || !form.patientId}
              className="btn-primary w-full justify-center">
              {uploading ? 'Subiendo…' : <><Plus size={16} /> Enviar a mi fisioterapeuta</>}
            </button>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
      </div>

      {/* Gallery */}
      {isLoading && <div className="text-navy-400 text-sm">Cargando…</div>}

      {Object.entries(byPatient).map(([patientName, items]) => (
        <div key={patientName} className="mb-8">
          <h2 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Camera size={13} /> {patientName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map(m => (
              <div key={m.id} className="group relative rounded-xl overflow-hidden bg-navy-100 aspect-square">
                {m.mediaType === 'photo' ? (
                  <img src={m.url} alt={m.caption ?? ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Video size={28} className="text-navy-400" />
                    <a href={m.url} target="_blank" rel="noreferrer" className="text-xs text-teal-600 font-medium hover:underline">Ver vídeo</a>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                  {m.caption && <p className="text-white text-xs truncate mb-1">{m.caption}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">{format(new Date(m.createdAt), 'd MMM', { locale: es })}</span>
                    <button
                      onClick={() => { if (confirm('¿Eliminar este archivo?')) deleteMutation.mutate(m.id); }}
                      className="p-1 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isLoading && media.length === 0 && (
        <div className="text-center py-12 text-navy-300">
          <Image size={40} className="mx-auto mb-3 opacity-40" />
          <p>Aún no has subido ningún archivo de seguimiento</p>
        </div>
      )}
    </div>
  );
}
