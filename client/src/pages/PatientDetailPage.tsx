import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  ArrowLeft, PawPrint, Phone, Mail, Dumbbell, CalendarDays, FileText,
  Plus, X, Camera, Image, Video, Trash2, Upload, Pencil, ClipboardList,
  Stethoscope, ChevronDown, ChevronUp, Loader2, NotebookPen, Mic, MicOff, Save,
  BookOpen, Printer, ExternalLink,
} from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import PautaBuilderModal, { type PautaForm } from '../components/PautaBuilderModal';

// ── Types ──────────────────────────────────────────────────────────────────

interface Routine { id: number; name: string; category?: string; duration?: number; videoUrl?: string; }
interface PatientRoutine { id: number; routine: Routine; notes?: string; }
interface PatientMedia { id: number; url: string; mediaType: string; caption?: string; takenAt: string; }
interface FollowUpMedia { id: number; url: string; mediaType: string; caption?: string; createdAt: string; }

interface Patient {
  id: number; name: string; species: string; breed?: string; birthDate?: string;
  weight?: string; sex?: string; neutered?: string; active: boolean; photoUrl?: string;
  diseases?: string; allergies?: string;
  tutor: { id: number; name: string; phone: string; email?: string; howFoundUs?: string };
  intakeData?: Record<string, string>;
  appointments: Array<{ id: number; date: string; duration: number; status: string; notes?: string }>;
  rehabRoutines: PatientRoutine[];
  evaluation?: PatientEvaluation | null;
}

interface PatientEvaluation {
  id?: number;
  fechaEvaluacion?: string;
  cirugiasPrevias?: string; medicacionActual?: string; tratamientosAnteriores?: string;
  respuestaTratamientos?: string; alergias?: string; sintomasReferidos?: string; otrosSintomas?: string;
  // Exploración estática
  posturaGeneral?: string; distribucionPeso?: string; estadoMuscularGeneral?: string;
  condicionCorporal?: number; masaMuscularWsava?: string; estadoPiel?: string;
  alineacionExtremidades?: string; columnaVertebral?: string; cabezaCuello?: string;
  comportamientoReposo?: string; observacionesEstaticas?: string;
  // Exploración dinámica
  tipoMarcha?: string; cojeraSiNo?: string; cojeraGrado?: number; cojeraMiembro?: string;
  inicioMarcha?: string; troteGalope?: string; subidaBajada?: string; proprioceptivePlacing?: string;
  marchaAlPaso?: string; marchaAlTrote?: string; analisisMiembros?: string;
  girosSentarse?: string; compensacionesDin?: string; observacionesDinamicas?: string;
  palpacionROM?: string; dolorReposo?: number; dolorMovimiento?: number; nivelFuncional?: number; palpacionInfoAdicional?: string;
  pruebasComplementarias?: string;
  hipotesisDiagnostica?: string; pronosticoFuncional?: string; limitacionesTratamiento?: string;
  objetivoCortoplazo?: string; objetivoMedioplazo?: string; objetivoLargoplazo?: string;
  tecnicasPrevistas?: string; frecuenciaSemana?: number; duracionSesionMin?: number; reevaluacionPrevista?: string;
}

interface SessionFollowup {
  id: number; sessionNumber: number; date: string; durationMin?: number;
  fisio: { id: number; name: string };
  dolorReferido?: number; movilidadReferida?: string; evolucionGeneral?: string;
  respuestaInmediata?: string; descripcionTratamiento?: string;
}

interface MediaFile { url: string; fileType: string; description: string; }

const STATUS_LABEL: Record<string, string> = { SCHEDULED: 'Programada', COMPLETED: 'Completada', CANCELLED: 'Cancelada', NO_SHOW: 'No asistió' };
const STATUS_CLASS: Record<string, string> = { SCHEDULED: 'badge-blue', COMPLETED: 'badge-green', CANCELLED: 'badge-red', NO_SHOW: 'badge-yellow' };

type TabKey = 'intake' | 'evaluation' | 'sessions' | 'appointments' | 'routines' | 'media' | 'followup' | 'notes' | 'pautas';
const TABS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
  { key: 'intake',       label: 'Ficha',       Icon: FileText },
  { key: 'evaluation',   label: 'Evaluación',  Icon: Stethoscope },
  { key: 'pautas',       label: 'Pautas',      Icon: BookOpen },
  { key: 'sessions',     label: 'Sesiones',    Icon: ClipboardList },
  { key: 'appointments', label: 'Citas',        Icon: CalendarDays },
  { key: 'routines',     label: 'Rutinas',     Icon: Dumbbell },
  { key: 'media',        label: 'Multimedia',  Icon: Camera },
  { key: 'followup',     label: 'Seguimiento', Icon: Image },
  { key: 'notes',        label: 'Notas',       Icon: NotebookPen },
];

// ── Checkbox/radio helpers ────────────────────────────────────────────────

const SINTOMAS = [
  ['dolor_moverse', 'Dolor al moverse'],
  ['rigidez_articular', 'Rigidez articular'],
  ['cojera', 'Cojera / alteración marcha'],
  ['dificultad_levantarse', 'Dificultad para levantarse'],
  ['perdida_fuerza', 'Pérdida de fuerza'],
  ['atrofia_muscular', 'Atrofia muscular'],
  ['cambios_comportamiento', 'Cambios de comportamiento'],
  ['disminucion_actividad', 'Disminución de actividad'],
  ['dificultad_subir_bajar', 'Dificultad para subir/bajar'],
  ['incontinencia', 'Incontinencia'],
  ['alteracion_propioceptiva', 'Alteración propioceptiva'],
];

const TECNICAS = [
  ['masoterapia', 'Masoterapia'],
  ['movilizaciones', 'Movilizaciones articulares'],
  ['electroterapia', 'Electroterapia / TENS'],
  ['ultrasonidos', 'Ultrasonidos terapéuticos'],
  ['termoterapia', 'Termoterapia (calor)'],
  ['crioterapia', 'Crioterapia (frío)'],
  ['ejercicio', 'Ejercicio terapéutico'],
  ['hidroterapia', 'Hidroterapia'],
  ['kinesiotaping', 'Kinesiotaping'],
  ['laser', 'Láser terapéutico'],
  ['acupuntura', 'Acupuntura'],
  ['pautas_domiciliarias', 'Pautas domiciliarias'],
];

const PALPACION_ZONAS = [
  'Columna cervical', 'Columna torácica', 'Columna lumbar',
  'Cintura escapular', 'Cadera/pelvis',
  'Miembro anterior D', 'Miembro anterior I',
  'Miembro posterior D', 'Miembro posterior I',
];

const PRUEBAS = [
  ['radiografia', 'Radiografía'],
  ['ecografia', 'Ecografía'],
  ['tc_rm', 'TC / RM'],
  ['laboratorio', 'Análisis laboratorio'],
  ['otras', 'Otras'],
];

// ── Audio recording + Groq Whisper transcription (notes) ─────────────────────

type NotesMicState = 'idle' | 'recording' | 'transcribing';

function useNotesMic(onTranscript: (t: string) => void) {
  const [micState, setMicState] = useState<NotesMicState>('idle');
  const mrRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const cbRef = useRef(onTranscript);
  useEffect(() => { cbRef.current = onTranscript; }, [onTranscript]);

  async function stopAndTranscribe() {
    const mr = mrRef.current;
    if (!mr || mr.state === 'inactive') return;
    const blob: Blob = await new Promise(resolve => {
      mr.onstop = () => resolve(new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' }));
      mr.stop();
    });
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null; mrRef.current = null;
    setMicState('transcribing');
    try {
      const fd = new FormData();
      fd.append('audio', blob, 'recording.webm');
      const res = await api.postForm<{ transcript: string | null }>('/brain/transcribe', fd);
      if (res.transcript) cbRef.current(res.transcript);
    } catch { /* silent */ }
    finally { setMicState('idle'); }
  }

  function toggleMic() {
    if (micState === 'recording') { stopAndTranscribe(); return; }
    if (micState !== 'idle') return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      mrRef.current = mr; chunksRef.current = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start(100); setMicState('recording');
    }).catch(() => alert('No se pudo acceder al micrófono. Verifica los permisos.'));
  }

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (mrRef.current?.state !== 'inactive') mrRef.current?.stop();
  }, []);

  return { micState, toggleMic };
}

// ── BrainNote interface ───────────────────────────────────────────────────

interface BrainNote {
  id: number; title: string; content: string; tags: string;
  originType: string; createdAt: string; updatedAt: string;
}

// ── NotesTab ──────────────────────────────────────────────────────────────

function NotesTab({ patientName }: { patientName: string }) {
  const qc = useQueryClient();
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const appendTranscript = useCallback((t: string) => {
    setNoteText(prev => prev ? `${prev} ${t}` : t);
  }, []);
  const { micState, toggleMic } = useNotesMic(appendTranscript);

  const { data: allNotes = [] } = useQuery<BrainNote[]>({
    queryKey: ['brain-notes'],
    queryFn: () => api.get('/brain/notes'),
  });

  const patientNotes = allNotes.filter(n =>
    n.tags?.split(',').map(t => t.trim().toLowerCase()).includes(patientName.toLowerCase()) ||
    n.title.toLowerCase().includes(patientName.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  async function saveNote() {
    if (!noteText.trim()) return;
    setSaving(true);
    try {
      const today = format(new Date(), "d MMM yyyy", { locale: es });
      await api.post('/brain/notes', {
        title: `Visita ${patientName} — ${today}`,
        content: noteText.trim(),
        tags: `visita,${patientName},sesión`,
        originType: 'session',
      });
      setNoteText('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      qc.invalidateQueries({ queryKey: ['brain-notes'] });
    } catch { alert('Error al guardar la nota'); }
    finally { setSaving(false); }
  }

  const deleteNote = useMutation({
    mutationFn: (id: number) => api.delete(`/brain/notes/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['brain-notes'] }),
  });

  return (
    <div className="space-y-4">
      {/* Create new note */}
      <div className="card space-y-3">
        <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Nueva nota de visita</h3>
        <div className="relative">
          <textarea
            className="input resize-none pr-12"
            rows={5}
            placeholder={micState === 'recording' ? 'Escuchando… habla ahora' : 'Escribe o dicta tus observaciones de la sesión…'}
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleMic}
            disabled={micState === 'transcribing'}
            title={micState === 'recording' ? 'Detener y transcribir' : 'Grabar nota por voz'}
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              micState === 'recording'
                ? 'bg-red-500 text-white animate-pulse'
                : micState === 'transcribing'
                ? 'bg-navy-100 text-navy-400 cursor-wait'
                : 'bg-navy-100 text-navy-500 hover:bg-navy-200'
            }`}
          >
            {micState === 'transcribing' ? <Loader2 size={15} className="animate-spin" /> : micState === 'recording' ? <MicOff size={15} /> : <Mic size={15} />}
          </button>
        </div>
        {micState === 'recording' && (
          <div className="flex items-center gap-2 text-xs text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Grabando… pulsa el micrófono para transcribir
          </div>
        )}
        {micState === 'transcribing' && (
          <div className="flex items-center gap-2 text-xs text-navy-400">
            <Loader2 size={10} className="animate-spin" />
            Transcribiendo…
          </div>
        )}
        <button
          type="button"
          onClick={saveNote}
          disabled={!noteText.trim() || saving}
          className={`btn-primary w-full justify-center gap-2 ${saved ? 'bg-green-500 hover:bg-green-500' : ''}`}
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saved ? '¡Nota guardada!' : saving ? 'Guardando…' : 'Guardar nota'}
        </button>
      </div>

      {/* Past notes */}
      <div className="card space-y-3">
        <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">
          Notas anteriores <span className="ml-1 text-navy-300 font-normal normal-case">({patientNotes.length})</span>
        </h3>
        {patientNotes.length === 0 ? (
          <p className="text-sm text-navy-300 py-2">Sin notas registradas para {patientName}.</p>
        ) : (
          <div className="space-y-3">
            {patientNotes.map(note => (
              <div key={note.id} className="border border-navy-100 rounded-xl p-4 group">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy-700">{note.title}</p>
                    <p className="text-xs text-navy-400 mt-0.5">
                      {format(new Date(note.createdAt), "d MMM yyyy · HH:mm", { locale: es })}
                    </p>
                  </div>
                  <button
                    onClick={() => { if (confirm('¿Eliminar esta nota?')) deleteNote.mutate(note.id); }}
                    className="p-1.5 text-navy-200 hover:text-red-400 transition-colors rounded-lg opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-sm text-navy-600 mt-2 whitespace-pre-wrap">{note.content}</p>
                {note.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                      <span key={tag} className="text-xs bg-navy-50 text-navy-400 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── PautasTab ─────────────────────────────────────────────────────────────

interface PautaMediaItem { id: number; url: string; caption?: string; createdAt: string; }
interface Pauta {
  id: number; title: string; weekRange: string; notes?: string;
  createdAt: string; showInPortal: boolean; htmlContent?: string; builderData?: string; media: PautaMediaItem[];
}

function PautasTab({ patient }: { patient: Patient }) {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [creating, setCreating] = useState(false);
  const [building, setBuilding] = useState(false);
  const [form, setForm] = useState({ title: '', weekRange: '', notes: '' });
  const [saving, setSaving] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<number | null>(null);
  const [editingBuilder, setEditingBuilder] = useState<Pauta | null>(null);
  const [editingSimple, setEditingSimple] = useState<Pauta | null>(null);
  const [editSimpleForm, setEditSimpleForm] = useState({ title: '', weekRange: '', notes: '' });
  const [editSimpleSaving, setEditSimpleSaving] = useState(false);

  const { data: pautas = [], isLoading } = useQuery<Pauta[]>({
    queryKey: ['pautas', patient.id],
    queryFn: () => api.get(`/pautas?patientId=${patient.id}`),
    retry: false,
  });

  async function openHtml(id: number) {
    const token = localStorage.getItem('token');
    const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';
    const res = await fetch(`${BASE}/pautas/${id}/html`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    let html = await res.text();
    // Fix blank first page on print: reset any padding-top from fixed nav
    html = html.replace('</head>', '<style>@page{margin:10mm}#pb,nav{display:none!important}body,main{padding-top:0!important;margin-top:0!important}</style></head>');
    const blob = new Blob([html], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
  }

  async function togglePortal(p: Pauta) {
    await api.patch(`/pautas/${p.id}/portal`, {});
    qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
  }

  async function createPauta(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.weekRange.trim()) return;
    setSaving(true);
    try {
      await api.post('/pautas', { patientId: patient.id, ...form });
      qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
      setCreating(false);
      setForm({ title: '', weekRange: '', notes: '' });
    } catch { alert('Error al crear la pauta'); }
    finally { setSaving(false); }
  }

  async function uploadImage(pautaId: number, file: File) {
    setUploadingFor(pautaId);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('patientName', patient.name);
      fd.append('context', 'general');
      const { url } = await api.postForm<{ url: string }>('/upload', fd);
      await api.post(`/pautas/${pautaId}/media`, { url });
      qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
    } catch { alert('Error al subir la imagen'); }
    finally { setUploadingFor(null); }
  }

  async function deleteMedia(pautaId: number, mediaId: number) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    await api.delete(`/pautas/${pautaId}/media/${mediaId}`);
    qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
  }

  async function deletePauta(id: number) {
    if (!confirm('¿Eliminar esta pauta y todas sus imágenes?')) return;
    await api.delete(`/pautas/${id}`);
    qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-navy-700">Pautas domiciliarias</h3>
          <p className="text-xs text-navy-400 mt-0.5">
            Guías e imágenes visibles para el tutor de {patient.name}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="btn-ghost gap-2" onClick={() => setCreating(true)}>
            <Plus size={15} />
            Simple
          </button>
          <button className="btn-primary gap-2" onClick={() => setBuilding(true)}>
            <Plus size={15} />
            Constructor
          </button>
        </div>
      </div>

      {/* Builder modal */}
      {building && (
        <PautaBuilderModal
          patientName={patient.name}
          photoUrl={patient.photoUrl}
          onClose={() => setBuilding(false)}
          onSave={async (html, title, weekRange, notes, builderData) => {
            await api.post('/pautas', { patientId: patient.id, title, weekRange, notes, htmlContent: html, builderData });
            qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
            setBuilding(false);
          }}
        />
      )}

      {/* Builder edit modal */}
      {editingBuilder && (() => {
        let parsedForm: PautaForm | undefined;
        let parsedChips = '';
        try { const d = JSON.parse(editingBuilder.builderData!); parsedForm = d.form; parsedChips = d.chips ?? ''; } catch {}
        return (
          <PautaBuilderModal
            patientName={patient.name}
            photoUrl={patient.photoUrl}
            mode="edit"
            initialForm={parsedForm}
            initialChips={parsedChips}
            onClose={() => setEditingBuilder(null)}
            onSave={async (html, title, weekRange, notes, builderData) => {
              await api.put(`/pautas/${editingBuilder.id}`, { title, weekRange, notes, htmlContent: html, builderData });
              qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
              setEditingBuilder(null);
            }}
          />
        );
      })()}

      {/* Simple edit modal */}
      {editingSimple && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setEditingSimple(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-bold text-navy-700 mb-4">Editar pauta</h2>
            <form onSubmit={async e => {
              e.preventDefault();
              if (!editSimpleForm.title.trim() || !editSimpleForm.weekRange.trim()) return;
              setEditSimpleSaving(true);
              try {
                await api.put(`/pautas/${editingSimple.id}`, editSimpleForm);
                qc.invalidateQueries({ queryKey: ['pautas', patient.id] });
                setEditingSimple(null);
              } catch { alert('Error al guardar'); }
              finally { setEditSimpleSaving(false); }
            }} className="space-y-3">
              <div>
                <label className="label">Título</label>
                <input className="input" value={editSimpleForm.title}
                  onChange={e => setEditSimpleForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Período</label>
                <input className="input" value={editSimpleForm.weekRange}
                  onChange={e => setEditSimpleForm(f => ({ ...f, weekRange: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Notas (opcional)</label>
                <textarea className="input resize-none" rows={3}
                  value={editSimpleForm.notes}
                  onChange={e => setEditSimpleForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setEditingSimple(null)} className="btn-ghost flex-1 justify-center">Cancelar</button>
                <button type="submit" disabled={editSimpleSaving} className="btn-primary flex-1 justify-center">
                  {editSimpleSaving ? <Loader2 size={14} className="animate-spin" /> : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create modal */}
      {creating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setCreating(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-bold text-navy-700 mb-4">Nueva pauta domiciliaria</h2>
            <form onSubmit={createPauta} className="space-y-3">
              <div>
                <label className="label">Título</label>
                <input className="input" placeholder="Ej: Pautas Semanas 1-2" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Período</label>
                <input className="input" placeholder="Ej: Semanas 1–2" value={form.weekRange}
                  onChange={e => setForm(f => ({ ...f, weekRange: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Notas (opcional)</label>
                <textarea className="input resize-none" rows={3}
                  placeholder="Indicaciones adicionales para el tutor…"
                  value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setCreating(false)} className="btn-ghost flex-1 justify-center">Cancelar</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="card flex items-center justify-center py-8">
          <Loader2 size={20} className="animate-spin text-navy-300" />
        </div>
      ) : pautas.length === 0 ? (
        <div className="card flex flex-col items-center py-10 gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
            <BookOpen size={26} className="text-teal-500" />
          </div>
          <p className="text-sm font-medium text-navy-700">Sin pautas creadas</p>
          <p className="text-xs text-navy-400 max-w-xs">
            El tutor verá aquí las guías e imágenes de rehabilitación en casa.
          </p>
          <button className="btn-primary mt-1 gap-2" onClick={() => setBuilding(true)}>
            <Plus size={14} />Crear primera pauta
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {pautas.map(p => (
            <div key={p.id} className="card space-y-3">
              {/* Pauta header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy-700">{p.title}</p>
                  <p className="text-xs text-navy-400">
                    {p.weekRange} · {format(new Date(p.createdAt), "d MMM yyyy", { locale: es })}
                  </p>
                  {p.notes && <p className="text-xs text-navy-500 mt-1 leading-relaxed">{p.notes}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {/* Portal toggle */}
                  <button
                    onClick={() => togglePortal(p)}
                    title={p.showInPortal ? 'Visible en portal del tutor — clic para ocultar' : 'Oculto en portal — clic para mostrar'}
                    className="flex items-center gap-1.5 focus:outline-none"
                  >
                    <span className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${p.showInPortal ? 'bg-teal-500' : 'bg-navy-200'}`}>
                      <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${p.showInPortal ? 'translate-x-4' : 'translate-x-0'}`} />
                    </span>
                    <span className={`text-[10px] font-medium ${p.showInPortal ? 'text-teal-600' : 'text-navy-400'}`}>
                      {p.showInPortal ? 'Portal' : 'Oculto'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      if (p.htmlContent) {
                        setEditingBuilder(p);
                      } else {
                        setEditingSimple(p);
                        setEditSimpleForm({ title: p.title, weekRange: p.weekRange, notes: p.notes ?? '' });
                      }
                    }}
                    title="Editar pauta"
                    className="p-1.5 text-navy-300 hover:text-teal-500 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  {p.htmlContent && (
                    <button onClick={() => openHtml(p.id)} title="Ver pauta" className="p-1.5 text-navy-300 hover:text-teal-500 transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  )}
                  <button onClick={() => deletePauta(p.id)} className="p-1.5 text-navy-300 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Images grid */}
              {p.media.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {p.media.map(m => (
                    <div key={m.id} className="relative group aspect-square rounded-xl overflow-hidden bg-navy-50">
                      <img src={m.url} alt={m.caption ?? ''} className="w-full h-full object-cover" />
                      {m.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1.5 py-0.5 truncate">
                          {m.caption}
                        </div>
                      )}
                      <button
                        onClick={() => deleteMedia(p.id, m.id)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload button */}
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(p.id, f);
                    e.target.value = '';
                  }}
                />
                <button
                  className="btn-ghost gap-2 text-xs w-full justify-center"
                  disabled={uploadingFor === p.id}
                  onClick={() => { setUploadingFor(p.id); fileRef.current?.click(); }}
                >
                  {uploadingFor === p.id
                    ? <><Loader2 size={13} className="animate-spin" />Subiendo…</>
                    : <><Upload size={13} />Añadir imagen</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Utility components ────────────────────────────────────────────────────

function Row({ label, value, always }: { label: string; value?: string | number | null; always?: boolean }) {
  if (!always && (value == null || value === '')) return null;
  const empty = value == null || value === '';
  return (
    <div className="text-sm border-b border-navy-50 pb-3 last:border-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-2">
      <span className="font-medium text-navy-500 block mb-0.5 sm:mb-0">{label}</span>
      <span className={`sm:col-span-2 whitespace-pre-wrap ${empty ? 'text-navy-300 italic' : 'text-navy-700'}`}>
        {empty ? '—' : String(value)}
      </span>
    </div>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-navy-500">
        <span>{label}</span><span className="font-semibold text-navy-700">{value}/10</span>
      </div>
      <input type="range" min={0} max={10} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-teal-500" />
    </div>
  );
}

// ── JSON field helpers ────────────────────────────────────────────────────

function parseJson<T>(val: string | undefined, def: T): T {
  if (!val) return def;
  try { return { ...def as object, ...JSON.parse(val) } as T; } catch { return def; }
}

// ── AlineacionExtremidades component ────────────────────────────────────

function AlineacionExtremidades({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const d = parseJson(value, { ma: [] as string[], mp: [] as string[], notas_ma: '', notas: '' });
  const [notasMA, setNotasMA] = useState(d.notas_ma);
  const upd = (patch: Partial<typeof d>) => onChange(JSON.stringify({ ...d, ...patch }));
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide">Miembros anteriores</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {(['Normal','Valgo','Varo','Rotación interna','Rotación externa','Asimetría'] as const).map(o => (
            <label key={o} className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer">
              <input type="checkbox" className="accent-teal-500 w-4 h-4 flex-shrink-0"
                checked={d.ma.includes(o)}
                onChange={() => upd({ ma: d.ma.includes(o) ? d.ma.filter(c => c !== o) : [...d.ma, o] })} />
              {o}
            </label>
          ))}
        </div>
        <textarea
          className="input resize-none text-xs"
          rows={2}
          placeholder="Observaciones libres..."
          defaultValue={notasMA}
          onBlur={e => onChange(JSON.stringify({ ...d, notas_ma: e.target.value }))}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        />
      </div>
      <MultiCheck label="Miembros posteriores"
        options={['Normal','Valgo','Varo','Luxación de rótula','Angulaciones','Asimetría']}
        checks={d.mp} onChecks={v => upd({ mp: v })}
        notes={d.notas} onNotes={v => upd({ notas: v })} />
    </div>
  );
}

// ── MultiCheck: checkboxes + free notes ──────────────────────────────────

function MultiCheck({ label, options, checks, onChecks, notes, onNotes }: {
  label?: string; options: string[];
  checks: string[]; onChecks: (v: string[]) => void;
  notes: string; onNotes: (v: string) => void;
}) {
  const toggle = (o: string) =>
    onChecks(checks.includes(o) ? checks.filter(c => c !== o) : [...checks, o]);
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide">{label}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {options.map(o => (
          <label key={o} className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer">
            <input type="checkbox" className="accent-teal-500 w-4 h-4 flex-shrink-0"
              checked={checks.includes(o)} onChange={() => toggle(o)} />
            {o}
          </label>
        ))}
      </div>
      <textarea className="input resize-none text-xs" rows={2} value={notes}
        onChange={e => onNotes(e.target.value)} placeholder="Observaciones libres…"
        data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" />
    </div>
  );
}

// ── ShowChecksField: renders a parsed JSON check field in view mode ───────

function ShowChecksField({ value, label }: { value?: string; label: string }) {
  if (!value) return null;
  let obj: Record<string, unknown> = {};
  let wasPlainText = false;
  try { obj = JSON.parse(value); } catch { wasPlainText = true; }
  if (wasPlainText) return <Row label={label} value={value} />;

  const allChecks: string[] = [];
  for (const k of Object.keys(obj)) {
    if (k === 'notas') continue;
    const v = obj[k];
    if (Array.isArray(v)) allChecks.push(...(v as string[]));
    else if (typeof v === 'string' && v) allChecks.push(`${k}: ${v}`);
  }
  const notas = typeof obj.notas === 'string' ? obj.notas : '';
  if (!allChecks.length && !notas) return null;
  return (
    <div className="text-sm border-b border-navy-50 pb-3 last:border-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-2">
      <span className="font-medium text-navy-500 block mb-1 sm:mb-0">{label}</span>
      <div className="sm:col-span-2 space-y-1">
        {allChecks.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {allChecks.map(c => <span key={c} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-100">{c}</span>)}
          </div>
        )}
        {notas && <p className="text-navy-600 whitespace-pre-wrap text-xs mt-1">{notas}</p>}
      </div>
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full text-left">
        <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">{title}</h3>
        {open ? <ChevronUp size={14} className="text-navy-400" /> : <ChevronDown size={14} className="text-navy-400" />}
      </button>
      {open && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );
}

// ── Media grid (shared between EvaluationTab and SessionForm) ─────────────

function MediaGrid({ files, onDescChange }: { files: MediaFile[]; onDescChange: (idx: number, desc: string) => void }) {
  if (files.length === 0) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
      {files.map((f, i) => (
        <div key={i} className="relative rounded-xl overflow-hidden bg-navy-50 aspect-video">
          {f.fileType.startsWith('video')
            ? <video src={f.url} controls className="w-full h-full object-cover" />
            : <img src={f.url} alt="" className="w-full h-full object-cover" />}
          <input
            value={f.description}
            onChange={e => onDescChange(i, e.target.value)}
            placeholder="Descripción…"
            className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 placeholder-white/60 outline-none border-0"
          />
        </div>
      ))}
    </div>
  );
}

// ── Primera Evaluación Form ───────────────────────────────────────────────

function EvaluationTab({ patientId, patientName, evaluation: initEval }: { patientId: number; patientName: string; evaluation?: PatientEvaluation | null }) {
  const qc = useQueryClient();

  const hasData = !!(initEval && Object.keys(initEval).some(k => k !== 'id' && (initEval as Record<string, unknown>)[k] != null && (initEval as Record<string, unknown>)[k] !== ''));
  const [viewMode, setViewMode] = useState<'edit' | 'view'>(hasData ? 'view' : 'edit');

  const [form, setForm] = useState<PatientEvaluation>(() => {
    const base = initEval ?? {};
    return {
      ...base,
      dolorReposo: base.dolorReposo ?? 0,
      dolorMovimiento: base.dolorMovimiento ?? 0,
      nivelFuncional: base.nivelFuncional ?? 5,
      condicionCorporal: base.condicionCorporal ?? 5,
    };
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [autoSaveToast, setAutoSaveToast] = useState(false);

  // Dirty tracking for autosave
  const isDirty = useRef(false);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    isDirty.current = true;
  }, [form]);

  // Autosave every 30s
  useEffect(() => {
    if (viewMode !== 'edit') return;
    const timer = setInterval(async () => {
      if (!isDirty.current) return;
      try {
        await api.put(`/evaluations/${patientId}`, form);
        isDirty.current = false;
        qc.invalidateQueries({ queryKey: ['patient', String(patientId)] });
        setAutoSaveToast(true);
        setTimeout(() => setAutoSaveToast(false), 2000);
      } catch { /* silent */ }
    }, 30000);
    return () => clearInterval(timer);
  }, [viewMode, form, patientId, qc]);

  // Multimedia — loaded from DB, independent of evaluation form
  const evalFileRef = useRef<HTMLInputElement>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const { data: evalMediaFiles = [] } = useQuery<Array<{
    id: number; driveUrl: string | null; localUrl: string | null;
    thumbnailUrl: string | null; fileType: string; description: string | null;
  }>>({
    queryKey: ['eval-media', patientId],
    queryFn: () => api.get(`/drive/files?patientId=${patientId}&originType=evaluation`),
  });

  async function handleEvalFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadingCount(files.length);
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('patientId', String(patientId));
        fd.append('patientName', patientName);
        fd.append('type', 'evaluation');
        await api.postForm('/drive/upload', fd);
        qc.invalidateQueries({ queryKey: ['eval-media', patientId] });
      } catch (err: any) {
        alert(`Error al subir ${file.name}: ${err?.message ?? err}`);
      }
      setUploadingCount(prev => Math.max(0, prev - 1));
    }
    if (evalFileRef.current) evalFileRef.current.value = '';
  }

  async function deleteEvalMedia(id: number) {
    if (!confirm('¿Eliminar este archivo?')) return;
    try {
      await api.delete(`/drive/files/${id}`);
      qc.invalidateQueries({ queryKey: ['eval-media', patientId] });
    } catch { alert('Error al eliminar'); }
  }

  function set<K extends keyof PatientEvaluation>(k: K, v: PatientEvaluation[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function toggleCheckArr(field: 'sintomasReferidos' | 'tecnicasPrevistas', key: string) {
    const current: string[] = JSON.parse(form[field] || '[]');
    const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key];
    set(field, JSON.stringify(next));
  }

  function checkedArr(field: 'sintomasReferidos' | 'tecnicasPrevistas', key: string) {
    return (JSON.parse(form[field] || '[]') as string[]).includes(key);
  }

  const palpacion: { zona: string; tono: string; dolor: number; notas: string }[] =
    JSON.parse(form.palpacionROM || 'null') ??
    PALPACION_ZONAS.map(zona => ({ zona, tono: '', dolor: 0, notas: '' }));

  function updatePalpacion(idx: number, field: string, val: string | number) {
    const next = palpacion.map((r, i) => i === idx ? { ...r, [field]: val } : r);
    set('palpacionROM', JSON.stringify(next));
  }

  const pruebas: Record<string, { activa: boolean; hallazgos: string }> =
    JSON.parse(form.pruebasComplementarias || 'null') ??
    Object.fromEntries(PRUEBAS.map(([k]) => [k, { activa: false, hallazgos: '' }]));

  function updatePrueba(key: string, field: 'activa' | 'hallazgos', val: boolean | string) {
    const next = { ...pruebas, [key]: { ...pruebas[key], [field]: val } };
    set('pruebasComplementarias', JSON.stringify(next));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/evaluations/${patientId}`, form);
      isDirty.current = false;
      qc.invalidateQueries({ queryKey: ['patient', String(patientId)] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setViewMode('view');
    } catch (err) {
      alert('Error al guardar la evaluación');
    } finally {
      setSaving(false);
    }
  }

  const f = (k: keyof PatientEvaluation) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(k, e.target.value as never);

  // ── View mode ──
  if (viewMode === 'view') {
    const sintomas: string[] = JSON.parse(form.sintomasReferidos || '[]');
    const tecnicas: string[] = JSON.parse(form.tecnicasPrevistas || '[]');
    const sintomasLabel = SINTOMAS.filter(([k]) => sintomas.includes(k)).map(([, l]) => l).join(', ');
    const tecnicasLabel = TECNICAS.filter(([k]) => tecnicas.includes(k)).map(([, l]) => l).join(', ');
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button type="button" onClick={() => setViewMode('edit')} className="btn-secondary text-sm flex items-center gap-1">
            <Pencil size={13} /> Editar evaluación
          </button>
        </div>
        {saved && <span className="text-sm text-teal-600 font-medium">Guardado</span>}

        {form.fechaEvaluacion && (
          <div className="text-sm text-navy-500 -mb-2">
            Fecha de evaluación: <span className="font-medium text-navy-700">{form.fechaEvaluacion.slice(0, 10)}</span>
          </div>
        )}

        <Section title="Anamnesis">
          <Row label="Cirugías previas" value={form.cirugiasPrevias} />
          <Row label="Medicación actual" value={form.medicacionActual} />
          <Row label="Tratamientos anteriores" value={form.tratamientosAnteriores} />
          <Row label="Respuesta a tratamientos previos" value={form.respuestaTratamientos} />
          <Row label="Alergias conocidas" value={form.alergias} />
          <Row label="Síntomas referidos" value={sintomasLabel || undefined} />
          <Row label="Otros síntomas" value={form.otrosSintomas} />
        </Section>

        <Section title="Exploración Estática">
          <Row label="Postura global" value={form.posturaGeneral} />
          <Row label="Distribución del peso" value={form.distribucionPeso} />
          <ShowChecksField label="Alineación de las extremidades" value={form.alineacionExtremidades} />
          <Row label="Musculatura general" value={form.estadoMuscularGeneral} />
          <ShowChecksField label="Columna vertebral" value={form.columnaVertebral} />
          <ShowChecksField label="Cabeza y cuello" value={form.cabezaCuello} />
          <Row label="Condición corporal (WSAVA)" value={form.condicionCorporal != null ? `${form.condicionCorporal}/9` : undefined} />
          <Row label="Masa muscular (WSAVA)" value={form.masaMuscularWsava} />
          <Row label="Piel y tejidos blandos" value={form.estadoPiel} />
          <ShowChecksField label="Comportamiento en reposo" value={form.comportamientoReposo} />
          <Row label="Observaciones estáticas" value={form.observacionesEstaticas} />
        </Section>

        <Section title="Exploración Dinámica">
          <Row label="Tipo de marcha" value={form.tipoMarcha} />
          <Row label="Cojera" value={form.cojeraSiNo} />
          {form.cojeraSiNo === 'Sí' && <>
            <Row label="Grado de cojera" value={form.cojeraGrado != null ? `Grado ${form.cojeraGrado}` : undefined} />
            <Row label="Miembro/s afectado/s" value={form.cojeraMiembro} />
          </>}
          <Row label="Inicio de la marcha" value={form.inicioMarcha} />
          <ShowChecksField label="Marcha al paso" value={form.marchaAlPaso} />
          <ShowChecksField label="Marcha al trote" value={form.marchaAlTrote} />
          <ShowChecksField label="Análisis por zonas (miembros/columna)" value={form.analisisMiembros} />
          <ShowChecksField label="Giros, sentarse y levantarse" value={form.girosSentarse} />
          <ShowChecksField label="Compensaciones" value={form.compensacionesDin} />
          <Row label="Trote / Galope" value={form.troteGalope} />
          <Row label="Subida / bajada de rampas" value={form.subidaBajada} />
          <Row label="Proprioceptive placing" value={form.proprioceptivePlacing} />
          <Row label="Observaciones dinámicas" value={form.observacionesDinamicas} />
        </Section>

        <Section title="Palpación y Rango de Movimiento">
          <Row label="Dolor en reposo" value={`${form.dolorReposo ?? 0}/10`} />
          <Row label="Dolor en movimiento" value={`${form.dolorMovimiento ?? 0}/10`} />
          <Row label="Nivel funcional" value={`${form.nivelFuncional ?? 5}/10`} />
          {form.palpacionInfoAdicional && (
            <div className="mt-3 p-3 bg-navy-50 rounded-lg border border-navy-100">
              <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">Información adicional</p>
              <p className="text-sm text-navy-700 whitespace-pre-wrap">{form.palpacionInfoAdicional}</p>
            </div>
          )}
        </Section>

        <Section title="Diagnóstico Funcional Fisioterapéutico">
          <Row label="Hipótesis diagnóstica" value={form.hipotesisDiagnostica} />
          <Row label="Pronóstico funcional" value={form.pronosticoFuncional} />
          <Row label="Limitaciones para el tratamiento" value={form.limitacionesTratamiento} />
        </Section>

        <Section title="Plan de Tratamiento Propuesto">
          <Row label="Objetivo a corto plazo" value={form.objetivoCortoplazo} />
          <Row label="Objetivo a medio plazo" value={form.objetivoMedioplazo} />
          <Row label="Objetivo a largo plazo" value={form.objetivoLargoplazo} />
          <Row label="Técnicas previstas" value={tecnicasLabel || undefined} />
          <Row label="Frecuencia (veces/semana)" value={form.frecuenciaSemana} />
          <Row label="Duración sesión (min)" value={form.duracionSesionMin} />
          <Row label="Reevaluación prevista" value={form.reevaluacionPrevista?.slice(0, 10)} />
        </Section>

        <Section title="Fotos y vídeos de la evaluación" defaultOpen={false}>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => evalFileRef.current?.click()}
              className="btn-secondary text-sm flex items-center gap-1">
              <Upload size={14} /> Añadir archivo
            </button>
            {uploadingCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-navy-400">
                <Loader2 size={12} className="animate-spin" /> Subiendo {uploadingCount} archivo{uploadingCount > 1 ? 's' : ''}…
              </span>
            )}
          </div>
          <input ref={evalFileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleEvalFileChange} />
          {evalMediaFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {evalMediaFiles.map(f => {
                const url = f.driveUrl ?? f.localUrl ?? '';
                return (
                  <div key={f.id} className="relative rounded-xl overflow-hidden bg-navy-50 aspect-video group">
                    {f.fileType === 'video'
                      ? <video src={url} controls className="w-full h-full object-cover" />
                      : <img src={url} alt="" className="w-full h-full object-cover" />}
                    <button type="button" onClick={() => deleteEvalMedia(f.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </div>
    );
  }

  // ── Edit mode ──
  return (
    <form onSubmit={handleSave} className="space-y-4">
      {/* Autosave toast */}
      {autoSaveToast && (
        <div className="fixed bottom-20 right-4 z-50 bg-teal-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          Guardado automáticamente
        </div>
      )}

      {/* FECHA DE EVALUACIÓN */}
      <div className="card">
        <div><label className="label">Fecha de la evaluación</label>
          <input type="date" className="input" value={form.fechaEvaluacion?.slice(0, 10) ?? ''}
            onChange={f('fechaEvaluacion')} />
        </div>
      </div>

      {/* ANAMNESIS */}
      <Section title="Anamnesis">
        <div><label className="label">Cirugías previas</label>
          <textarea className="input resize-none" rows={2} value={form.cirugiasPrevias || ''} onChange={f('cirugiasPrevias')} /></div>
        <div><label className="label">Medicación actual</label>
          <textarea className="input resize-none" rows={2} value={form.medicacionActual || ''} onChange={f('medicacionActual')} /></div>
        <div><label className="label">Tratamientos anteriores</label>
          <textarea className="input resize-none" rows={2} value={form.tratamientosAnteriores || ''} onChange={f('tratamientosAnteriores')} /></div>
        <div><label className="label">Respuesta a tratamientos previos</label>
          <textarea className="input resize-none" rows={2} value={form.respuestaTratamientos || ''} onChange={f('respuestaTratamientos')} /></div>
        <div><label className="label">Alergias conocidas</label>
          <textarea className="input resize-none" rows={2} value={form.alergias || ''} onChange={f('alergias')} /></div>
        <div>
          <label className="label mb-2">Síntomas referidos por el tutor</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SINTOMAS.map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer">
                <input type="checkbox" checked={checkedArr('sintomasReferidos', key)}
                  onChange={() => toggleCheckArr('sintomasReferidos', key)}
                  className="accent-teal-500 w-4 h-4" />
                {label}
              </label>
            ))}
          </div>
          <div className="mt-2">
            <label className="label">Otros síntomas</label>
            <input className="input" value={form.otrosSintomas || ''} onChange={f('otrosSintomas')} placeholder="Descripción libre" />
          </div>
        </div>
      </Section>

      {/* EXPLORACIÓN ESTÁTICA */}
      <Section title="Exploración Estática">
        {/* POSTURA GLOBAL */}
        <div><label className="label">Postura global</label>
          <select className="input" value={form.posturaGeneral || ''} onChange={f('posturaGeneral')}>
            <option value="">—</option>
            {['Normal', 'Cifosis', 'Lordosis', 'Escoliosis', 'Asimétrica'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>

        {/* DISTRIBUCIÓN DEL PESO */}
        <div><label className="label">Distribución del peso</label>
          <select className="input" value={form.distribucionPeso || ''} onChange={f('distribucionPeso')}>
            <option value="">—</option>
            {['Homogénea', 'Anterior', 'Posterior', 'Lateral D', 'Lateral I', 'Diagonal'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>

        {/* ALINEACIÓN DE LAS EXTREMIDADES */}
        <div className="space-y-3">
          <label className="label">Alineación de las extremidades</label>
          <AlineacionExtremidades
            value={form.alineacionExtremidades}
            onChange={v => set('alineacionExtremidades', v)}
          />
        </div>

        {/* MUSCULATURA */}
        <div><label className="label">Musculatura general</label>
          <select className="input" value={form.estadoMuscularGeneral || ''} onChange={f('estadoMuscularGeneral')}>
            <option value="">—</option>
            {['Normal', 'Hipertonía', 'Hipotonía', 'Atrofia focal', 'Atrofia generalizada'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>

        {/* COLUMNA VERTEBRAL */}
        <div className="space-y-2">
          <label className="label">Columna vertebral</label>
          {(() => {
            const d = parseJson(form.columnaVertebral, { cervical: '', toracica: '', lumbar: '', notas: '' });
            const upd = (patch: Partial<typeof d>) => set('columnaVertebral', JSON.stringify({ ...d, ...patch }));
            return (
              <div className="space-y-2">
                {([
                  ['Cervical', 'cervical', ['Normal','Cifosis','Lordosis','Escoliosis','Rigidez']] as const,
                  ['Torácica', 'toracica', ['Normal','Cifosis','Escoliosis','Rigidez']] as const,
                  ['Lumbar',   'lumbar',   ['Normal','Lordosis','Cifosis','Escoliosis']] as const,
                ] as [string, 'cervical'|'toracica'|'lumbar', readonly string[]][]).map(([lbl, key, opts]) => (
                  <div key={key} className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-navy-500 w-16 flex-shrink-0">{lbl}</span>
                    <div className="flex flex-wrap gap-2">
                      {opts.map(o => (
                        <label key={o} className="flex items-center gap-1.5 text-sm text-navy-600 cursor-pointer">
                          <input type="radio" name={`columna-${key}`} value={o} checked={d[key] === o}
                            onChange={() => upd({ [key]: o })} className="accent-teal-500" />
                          {o}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <textarea className="input resize-none text-xs" rows={2} value={d.notas}
                  onChange={e => upd({ notas: e.target.value })} placeholder="Observaciones columna…" />
              </div>
            );
          })()}
        </div>

        {/* CABEZA Y CUELLO */}
        <div className="space-y-2">
          <label className="label">Cabeza y cuello</label>
          {(() => {
            const d = parseJson(form.cabezaCuello, { checks: [] as string[], notas: '' });
            const upd = (patch: Partial<typeof d>) => set('cabezaCuello', JSON.stringify({ ...d, ...patch }));
            return (
              <MultiCheck
                options={['Normal','Inclinación lateral D','Inclinación lateral I','Rotación D','Rotación I','Extensión','Flexión']}
                checks={d.checks} onChecks={v => upd({ checks: v })}
                notes={d.notas} onNotes={v => upd({ notas: v })} />
            );
          })()}
        </div>

        {/* CONDICIÓN CORPORAL WSAVA */}
        <div>
          <div className="flex justify-between text-xs text-navy-500 mb-1">
            <span>Condición corporal (WSAVA 1–9)</span>
            <span className="font-semibold text-navy-700">{form.condicionCorporal ?? 5}/9</span>
          </div>
          <input type="range" min={1} max={9} value={form.condicionCorporal ?? 5}
            onChange={e => set('condicionCorporal', Number(e.target.value))}
            className="w-full accent-teal-500" />
          <div className="flex justify-between text-[10px] text-navy-300 mt-0.5">
            <span>1 Caquexia</span><span>5 Ideal</span><span>9 Obesidad</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="label">Masa muscular (WSAVA muscle condition score)</label>
          <select className="input" value={form.masaMuscularWsava?.split('\n')[0] || ''}
            onChange={e => set('masaMuscularWsava', e.target.value + (form.masaMuscularWsava?.includes('\n') ? '\n' + form.masaMuscularWsava.split('\n').slice(1).join('\n') : ''))}>
            <option value="">—</option>
            {['Normal','Pérdida leve','Pérdida moderada','Pérdida grave'].map(v => <option key={v}>{v}</option>)}
          </select>
          {(() => {
            const parts = (form.masaMuscularWsava || '').split('\n');
            const notas = parts.slice(1).join('\n');
            return (
              <textarea className="input resize-none text-xs" rows={2}
                value={notas} placeholder="Localización de la atrofia si existe…"
                onChange={e => set('masaMuscularWsava', (parts[0] || '') + '\n' + e.target.value)} />
            );
          })()}
        </div>

        {/* PIEL Y TEJIDOS BLANDOS */}
        <div><label className="label">Piel y tejidos blandos</label>
          <textarea className="input resize-none" rows={2} value={form.estadoPiel || ''} onChange={f('estadoPiel')}
            placeholder="Normal / Cicatrices / Eritema / Edema / Inflamación — localización…" />
        </div>

        {/* COMPORTAMIENTO EN REPOSO */}
        <div className="space-y-2">
          <label className="label">Comportamiento en reposo</label>
          {(() => {
            const d = parseJson(form.comportamientoReposo, { estado: '', checks: [] as string[], notas: '' });
            const upd = (patch: Partial<typeof d>) => set('comportamientoReposo', JSON.stringify({ ...d, ...patch }));
            return (
              <div className="space-y-2">
                <select className="input" value={d.estado} onChange={e => upd({ estado: e.target.value })}>
                  <option value="">Estado general —</option>
                  {['Tranquilo','Inquieto','Ansioso','Agresivo'].map(v => <option key={v}>{v}</option>)}
                </select>
                <MultiCheck
                  options={['Posturas antiálgicas','Evita tumbarse de un lado','Cambios frecuentes de postura','Dificultad para levantarse del suelo']}
                  checks={d.checks} onChecks={v => upd({ checks: v })}
                  notes={d.notas} onNotes={v => upd({ notas: v })} />
              </div>
            );
          })()}
        </div>

        <div><label className="label">Observaciones estáticas adicionales</label>
          <textarea className="input resize-none" rows={2} value={form.observacionesEstaticas || ''} onChange={f('observacionesEstaticas')} />
        </div>
      </Section>

      {/* EXPLORACIÓN DINÁMICA */}
      <Section title="Exploración Dinámica">
        <div><label className="label">Tipo de marcha</label>
          <select className="input" value={form.tipoMarcha || ''} onChange={f('tipoMarcha')}>
            <option value="">—</option>
            {['Normal', 'Atáxica', 'Espástica', 'Parética', 'Otros'].map(v => <option key={v}>{v}</option>)}
          </select></div>
        <div className="space-y-2">
          <label className="label">Cojera</label>
          <div className="flex gap-4">
            {['No', 'Sí'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="cojeraSiNo" value={v} checked={form.cojeraSiNo === v}
                  onChange={() => set('cojeraSiNo', v)} className="accent-teal-500" />
                {v}
              </label>
            ))}
          </div>
          {form.cojeraSiNo === 'Sí' && (
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-32">
                <label className="label">Grado</label>
                <select className="input" value={form.cojeraGrado ?? ''} onChange={e => set('cojeraGrado', Number(e.target.value))}>
                  <option value="">—</option>
                  {[1,2,3,4].map(v => <option key={v} value={v}>Grado {v}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-32">
                <label className="label">Miembro/s afectado/s</label>
                <input className="input" value={form.cojeraMiembro || ''} onChange={f('cojeraMiembro')} placeholder="Ej: MPD, MAI" />
              </div>
            </div>
          )}
        </div>
        <div><label className="label">Inicio de la marcha</label>
          <select className="input" value={form.inicioMarcha || ''} onChange={f('inicioMarcha')}>
            <option value="">—</option>
            {['Fluido', 'Dificultoso', 'Con apoyo'].map(v => <option key={v}>{v}</option>)}
          </select></div>
        <div><label className="label">Trote / Galope</label>
          <select className="input" value={form.troteGalope || ''} onChange={f('troteGalope')}>
            <option value="">—</option>
            {['Normal', 'Alterado', 'No evaluado'].map(v => <option key={v}>{v}</option>)}
          </select></div>
        <div><label className="label">Subida / bajada de rampas</label>
          <select className="input" value={form.subidaBajada || ''} onChange={f('subidaBajada')}>
            <option value="">—</option>
            {['Normal', 'Dificultosa', 'No evaluado'].map(v => <option key={v}>{v}</option>)}
          </select></div>
        <div><label className="label">Proprioceptive placing</label>
          <select className="input" value={form.proprioceptivePlacing || ''} onChange={f('proprioceptivePlacing')}>
            <option value="">—</option>
            {['Normal', 'Retrasado', 'Ausente'].map(v => <option key={v}>{v}</option>)}
          </select></div>
        {/* MARCHA AL PASO */}
        <div className="space-y-2">
          <label className="label">Marcha al paso — análisis detallado</label>
          {(() => {
            const d = parseJson(form.marchaAlPaso, { patron: '', cojera: '', gradoCojera: 0, checks: [] as string[], notas: '' });
            const upd = (p: Partial<typeof d>) => set('marchaAlPaso', JSON.stringify({ ...d, ...p }));
            return (
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs font-medium text-navy-500 mb-1">Patrón de pisada</p>
                    <select className="input" value={d.patron} onChange={e => upd({ patron: e.target.value })}>
                      <option value="">—</option>
                      {['Normal','Asimétrico','Irregular','No evaluado'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-navy-500 mb-1">Tipo de cojera</p>
                    <select className="input" value={d.cojera} onChange={e => upd({ cojera: e.target.value })}>
                      <option value="">—</option>
                      {['De apoyo','De suspensión','Mixta','No evaluado'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-navy-500 mb-1">
                    <span>Grado de cojera (0–5)</span><span className="font-semibold text-navy-700">{d.gradoCojera}</span>
                  </div>
                  <input type="range" min={0} max={5} value={d.gradoCojera}
                    onChange={e => upd({ gradoCojera: Number(e.target.value) })} className="w-full accent-teal-500" />
                  <div className="flex justify-between text-[10px] text-navy-300 mt-0.5">
                    <span>0 Sin cojera</span><span>3 Moderada</span><span>5 No apoya</span>
                  </div>
                </div>
                <MultiCheck
                  options={['Longitud de paso simétrica','Cadencia regular','Fase apoyo/vuelo normal','Aterrizaje talón primero','Aterrizaje plano','Aterrizaje de punta']}
                  checks={d.checks} onChecks={v => upd({ checks: v })}
                  notes={d.notas} onNotes={v => upd({ notas: v })} />
              </div>
            );
          })()}
        </div>

        {/* MARCHA AL TROTE */}
        <div className="space-y-2">
          <label className="label">Marcha al trote — análisis detallado</label>
          {(() => {
            const d = parseJson(form.marchaAlTrote, { checks: [] as string[], notas: '' });
            const upd = (p: Partial<typeof d>) => set('marchaAlTrote', JSON.stringify({ ...d, ...p }));
            return (
              <MultiCheck
                options={['Simétrico','Head bob (anterior)','Hip hike (posterior)','Extensión reducida en vuelo','Compensación visible','No evaluado']}
                checks={d.checks} onChecks={v => upd({ checks: v })}
                notes={d.notas} onNotes={v => upd({ notas: v })} />
            );
          })()}
        </div>

        {/* ANÁLISIS POR ZONAS */}
        <div className="space-y-2">
          <label className="label">Análisis por zonas (miembros y columna)</label>
          {(() => {
            const d = parseJson(form.analisisMiembros, { ma: [] as string[], mp: [] as string[], columna: [] as string[], notas: '' });
            const upd = (p: Partial<typeof d>) => set('analisisMiembros', JSON.stringify({ ...d, ...p }));
            return (
              <div className="space-y-3">
                <MultiCheck label="Miembros anteriores"
                  options={['Ext. hombro/codo normal','Flexión carpo normal','Aterrizaje normal','Aterrizaje de punta','Reducción extensión']}
                  checks={d.ma} onChecks={v => upd({ ma: v })}
                  notes="" onNotes={() => {}} />
                <MultiCheck label="Miembros posteriores"
                  options={['Propulsión normal','Ext. rodilla/corvejón normal','Arrastre de dedos','Sobrepisada normal','Sobrepisada anterior','Sobrepisada posterior']}
                  checks={d.mp} onChecks={v => upd({ mp: v })}
                  notes="" onNotes={() => {}} />
                <MultiCheck label="Columna"
                  options={['Flexión lateral rítmica normal','Segmentos rígidos','Lordosis dinámica','Cifosis dinámica']}
                  checks={d.columna} onChecks={v => upd({ columna: v })}
                  notes={d.notas} onNotes={v => upd({ notas: v })} />
              </div>
            );
          })()}
        </div>

        {/* GIROS Y SENTARSE */}
        <div className="space-y-2">
          <label className="label">Inicio/parada, giros, sentarse y levantarse</label>
          {(() => {
            const d = parseJson(form.girosSentarse, { inicio: [] as string[], giros: [] as string[], sentarse: [] as string[], levantarse: [] as string[], notas: '' });
            const upd = (p: Partial<typeof d>) => set('girosSentarse', JSON.stringify({ ...d, ...p }));
            return (
              <div className="space-y-3">
                <MultiCheck label="Inicio y parada"
                  options={['Inicio fluido','Rigidez inicial','Rigidez mejora al caminar','Necesita ayuda para arrancar']}
                  checks={d.inicio} onChecks={v => upd({ inicio: v })}
                  notes="" onNotes={() => {}} />
                <MultiCheck label="Giros"
                  options={['Simétrico','Evita girar D','Evita girar I','Arrastra miembros al girar']}
                  checks={d.giros} onChecks={v => upd({ giros: v })}
                  notes="" onNotes={() => {}} />
                <MultiCheck label="Sentarse"
                  options={['Cadera centrada','Desplaza cadera D','Desplaza cadera I','Se deja caer','Descenso controlado']}
                  checks={d.sentarse} onChecks={v => upd({ sentarse: v })}
                  notes="" onNotes={() => {}} />
                <MultiCheck label="Levantarse"
                  options={['Normal','Varios intentos','Impulsa con MAD','Impulsa con MAI','Impulsa con MPD','Impulsa con MPI']}
                  checks={d.levantarse} onChecks={v => upd({ levantarse: v })}
                  notes={d.notas} onNotes={v => upd({ notas: v })} />
              </div>
            );
          })()}
        </div>

        {/* COMPENSACIONES */}
        <div className="space-y-2">
          <label className="label">Compensaciones observadas</label>
          {(() => {
            const d = parseJson(form.compensacionesDin, { checks: [] as string[], notas: '' });
            const upd = (p: Partial<typeof d>) => set('compensacionesDin', JSON.stringify({ ...d, ...p }));
            return (
              <MultiCheck
                options={['Rigidez cervical (compensa lumbar)','Sobrecarga miembros anteriores','Hiperext. corvejón (compensa rodilla)','Cifosis torácica','Knuckling','Arrastre de uñas']}
                checks={d.checks} onChecks={v => upd({ checks: v })}
                notes={d.notas} onNotes={v => upd({ notas: v })} />
            );
          })()}
        </div>
        <div><label className="label">Observaciones dinámicas adicionales</label>
          <textarea className="input resize-none" rows={2} value={form.observacionesDinamicas || ''} onChange={f('observacionesDinamicas')} /></div>
      </Section>

      {/* PALPACIÓN Y ROM */}
      <Section title="Palpación y Rango de Movimiento">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr className="bg-navy-50">
                <th className="text-left p-2 text-navy-500 font-semibold">Zona</th>
                <th className="text-left p-2 text-navy-500 font-semibold">Tono muscular</th>
                <th className="text-left p-2 text-navy-500 font-semibold w-32">Dolor (0–10)</th>
                <th className="text-left p-2 text-navy-500 font-semibold">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {palpacion.map((row, i) => (
                <tr key={row.zona}>
                  <td className="p-2 text-navy-600 font-medium whitespace-nowrap">{row.zona}</td>
                  <td className="p-2">
                    <select className="input py-1 text-xs" value={row.tono} onChange={e => updatePalpacion(i, 'tono', e.target.value)}>
                      <option value="">—</option>
                      {['Normal', 'Hipertonía', 'Hipotonía', 'Contractura', 'Atrofia'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-1">
                      <input type="range" min={0} max={10} value={row.dolor}
                        onChange={e => updatePalpacion(i, 'dolor', Number(e.target.value))}
                        className="flex-1 accent-teal-500" />
                      <span className="text-navy-700 font-semibold w-4 text-right">{row.dolor}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <input className="input py-1 text-xs" value={row.notas}
                      onChange={e => updatePalpacion(i, 'notas', e.target.value)} placeholder="Observaciones…" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Slider label="Dolor en reposo" value={form.dolorReposo ?? 0} onChange={v => set('dolorReposo', v)} />
          <Slider label="Dolor en movimiento" value={form.dolorMovimiento ?? 0} onChange={v => set('dolorMovimiento', v)} />
          <Slider label="Nivel funcional" value={form.nivelFuncional ?? 5} onChange={v => set('nivelFuncional', v)} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-navy-600 mb-1">Observaciones generales</label>
          <textarea className="input resize-none" rows={3}
            value={form.palpacionInfoAdicional ?? ''}
            onChange={e => set('palpacionInfoAdicional', e.target.value)}
            placeholder="Observaciones generales sobre palpación y rango de movimiento…" />
        </div>
      </Section>

      {/* PRUEBAS COMPLEMENTARIAS */}
      <Section title="Pruebas Complementarias" defaultOpen={false}>
        <div className="space-y-3">
          {PRUEBAS.map(([key, label]) => (
            <div key={key}>
              <label className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer font-medium mb-1">
                <input type="checkbox" checked={pruebas[key]?.activa ?? false}
                  onChange={e => updatePrueba(key, 'activa', e.target.checked)}
                  className="accent-teal-500 w-4 h-4" />
                {label}
              </label>
              {pruebas[key]?.activa && (
                <textarea className="input resize-none ml-6" rows={2}
                  value={pruebas[key]?.hallazgos || ''}
                  onChange={e => updatePrueba(key, 'hallazgos', e.target.value)}
                  placeholder="Hallazgos…" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* DIAGNÓSTICO FUNCIONAL */}
      <Section title="Diagnóstico Funcional Fisioterapéutico">
        <div><label className="label">Hipótesis diagnóstica / Problemas identificados</label>
          <textarea className="input resize-none" rows={4} value={form.hipotesisDiagnostica || ''} onChange={f('hipotesisDiagnostica')} /></div>
        <div><label className="label">Pronóstico funcional</label>
          <select className="input" value={form.pronosticoFuncional || ''} onChange={f('pronosticoFuncional')}>
            <option value="">—</option>
            {['Favorable', 'Reservado', 'Desfavorable'].map(v => <option key={v}>{v}</option>)}
          </select></div>
        <div><label className="label">Limitaciones para el tratamiento</label>
          <textarea className="input resize-none" rows={2} value={form.limitacionesTratamiento || ''} onChange={f('limitacionesTratamiento')} /></div>
      </Section>

      {/* PLAN DE TRATAMIENTO */}
      <Section title="Plan de Tratamiento Propuesto">
        <div><label className="label">Objetivo a corto plazo (1–2 semanas)</label>
          <textarea className="input resize-none" rows={2} value={form.objetivoCortoplazo || ''} onChange={f('objetivoCortoplazo')} /></div>
        <div><label className="label">Objetivo a medio plazo (1 mes)</label>
          <textarea className="input resize-none" rows={2} value={form.objetivoMedioplazo || ''} onChange={f('objetivoMedioplazo')} /></div>
        <div><label className="label">Objetivo a largo plazo</label>
          <textarea className="input resize-none" rows={2} value={form.objetivoLargoplazo || ''} onChange={f('objetivoLargoplazo')} /></div>
        <div>
          <label className="label mb-2">Técnicas previstas</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TECNICAS.map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer">
                <input type="checkbox" checked={checkedArr('tecnicasPrevistas', key)}
                  onChange={() => toggleCheckArr('tecnicasPrevistas', key)}
                  className="accent-teal-500 w-4 h-4" />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div><label className="label">Frec. (veces/semana)</label>
            <input type="number" min={1} max={7} className="input" value={form.frecuenciaSemana ?? ''}
              onChange={e => set('frecuenciaSemana', Number(e.target.value))} /></div>
          <div><label className="label">Duración sesión (min)</label>
            <input type="number" min={10} max={180} className="input" value={form.duracionSesionMin ?? ''}
              onChange={e => set('duracionSesionMin', Number(e.target.value))} /></div>
          <div><label className="label">Reevaluación prevista</label>
            <input type="date" className="input" value={form.reevaluacionPrevista?.slice(0, 10) ?? ''}
              onChange={f('reevaluacionPrevista')} /></div>
        </div>
      </Section>

      {/* FOTOS Y VÍDEOS */}
      <div className="flex items-center justify-end gap-3 sticky bottom-4 z-10">
        {saved && <span className="text-sm text-teal-600 font-medium">Guardado</span>}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Guardando…' : 'Guardar evaluación'}
        </button>
      </div>
    </form>
  );
}

// ── Sesiones Tab ──────────────────────────────────────────────────────────

const EVOLUCION_COLOR: Record<string, string> = {
  'Mejoría significativa': 'badge-green',
  'Mejoría leve': 'badge-blue',
  'Estable': 'badge-yellow',
  'Empeoramiento': 'badge-red',
};

function SessionsTab({ patientId, patientName }: { patientId: number; patientName: string }) {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { data: sessions = [] } = useQuery<SessionFollowup[]>({
    queryKey: ['sessions', patientId],
    queryFn: () => api.get(`/session-followups?patientId=${patientId}`),
  });

  const deleteSession = useMutation({
    mutationFn: (id: number) => api.delete(`/session-followups/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sessions', patientId] }),
  });

  if (editId !== null) {
    return (
      <SessionForm
        patientId={patientId}
        patientName={patientName}
        sessionId={editId === 0 ? undefined : editId}
        onClose={() => setEditId(null)}
        onSaved={() => { qc.invalidateQueries({ queryKey: ['sessions', patientId] }); setEditId(null); }}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button onClick={() => setEditId(0)} className="btn-primary text-sm"><Plus size={14} /> Nueva sesión</button>
      </div>
      {sessions.length === 0 && (
        <div className="card text-center py-8">
          <ClipboardList size={32} className="mx-auto mb-3 text-navy-200" />
          <p className="text-navy-300 text-sm">Sin sesiones de seguimiento registradas.</p>
        </div>
      )}
      {sessions.map(s => (
        <div key={s.id} className="card">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-navy-700 text-sm">Sesión {s.sessionNumber}</span>
                <span className="text-xs text-navy-400">{format(new Date(s.date), "d MMM yyyy · HH:mm", { locale: es })}</span>
                {s.durationMin && <span className="text-xs text-navy-400">{s.durationMin} min</span>}
                {s.evolucionGeneral && <span className={EVOLUCION_COLOR[s.evolucionGeneral] ?? 'badge-gray'}>{s.evolucionGeneral}</span>}
              </div>
              <p className="text-xs text-navy-400 mt-1">{s.fisio.name}</p>
              {s.descripcionTratamiento && (
                <p className="text-sm text-navy-600 mt-1 line-clamp-2">{s.descripcionTratamiento}</p>
              )}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setEditId(s.id)} className="p-2 text-navy-400 hover:text-navy-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"><Pencil size={14} /></button>
              <button onClick={() => deleteSession.mutate(s.id)} className="p-2 text-navy-300 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      ))}
      {/* suppress unused warning */}
      {showForm && null}
    </div>
  );
}

interface SessionFormProps {
  patientId: number;
  patientName: string;
  sessionId?: number;
  onClose: () => void;
  onSaved: () => void;
}

function SessionForm({ patientId, patientName, sessionId, onClose, onSaved }: SessionFormProps) {
  const apiUrl = (import.meta.env.VITE_API_URL ?? '') + '/api';
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: existing } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => api.get(`/session-followups/${sessionId}`),
    enabled: !!sessionId,
  });

  const [form, setForm] = useState<Record<string, unknown>>(() => ({
    date: new Date().toISOString().slice(0, 16),
    durationMin: 60,
    dolorReferido: 5,
    dolorReposoRapido: 0,
    dolorMovimientoRapido: 0,
    rangoMovimiento: 5,
    nivelFuncionalRapido: 5,
    dolorPostSesion: 0,
    tecnicasRealizadas: '[]',
    ...(existing ?? {}),
  }));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingName, setUploadingName] = useState('');
  const [autoSaveToast, setAutoSaveToast] = useState(false);
  const [sessionMediaFiles, setSessionMediaFiles] = useState<MediaFile[]>([]);

  // Dirty tracking for autosave
  const isDirty = useRef(false);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    isDirty.current = true;
  }, [form]);

  // Autosave every 30s (only for existing sessions)
  useEffect(() => {
    if (!sessionId) return;
    const timer = setInterval(async () => {
      if (!isDirty.current) return;
      try {
        await api.patch(`/session-followups/${sessionId}`, { ...form, patientId });
        isDirty.current = false;
        setAutoSaveToast(true);
        setTimeout(() => setAutoSaveToast(false), 2000);
      } catch { /* silent */ }
    }, 30000);
    return () => clearInterval(timer);
  }, [sessionId, form, patientId]);

  function set(k: string, v: unknown) { setForm(f => ({ ...f, [k]: v })); }

  function toggleTecnica(key: string) {
    const current: string[] = JSON.parse((form.tecnicasRealizadas as string) || '[]');
    const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key];
    set('tecnicasRealizadas', JSON.stringify(next));
  }
  function hasTecnica(key: string) {
    return (JSON.parse((form.tecnicasRealizadas as string) || '[]') as string[]).includes(key);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, patientId };
      if (sessionId) {
        await api.patch(`/session-followups/${sessionId}`, payload);
      } else {
        await api.post('/session-followups', payload);
      }
      isDirty.current = false;
      onSaved();
    } catch { alert('Error al guardar'); }
    finally { setSaving(false); }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadingName(file.name);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('patientName', patientName);
      fd.append('context', 'session');
      if (form.sessionNumber != null) fd.append('sessionNum', String(form.sessionNumber));
      const r = await fetch(`${apiUrl}/drive/upload`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error('Upload failed');
      const { url } = await r.json();
      setSessionMediaFiles(prev => [...prev, { url, fileType: file.type, description: '' }]);
    } catch { alert('Error al subir archivo'); }
    finally { setUploading(false); setUploadingName(''); if (fileRef.current) fileRef.current.value = ''; }
  }

  function updateSessionMediaDesc(idx: number, desc: string) {
    setSessionMediaFiles(prev => prev.map((f, i) => i === idx ? { ...f, description: desc } : f));
  }

  const txt = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(k, e.target.value);
  const num = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => set(k, Number(e.target.value));

  return (
    <div>
      {/* Autosave toast */}
      {autoSaveToast && (
        <div className="fixed bottom-20 right-4 z-50 bg-teal-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          Guardado automáticamente
        </div>
      )}
      <button onClick={onClose} className="flex items-center gap-1 text-sm text-navy-400 hover:text-navy-600 mb-4">
        <ArrowLeft size={14} /> Volver a sesiones
      </button>
      <form onSubmit={handleSave} className="space-y-4">

        <Section title="Datos de la sesión">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Fecha</label>
              <input type="datetime-local" className="input" value={(form.date as string) || ''} onChange={txt('date')} /></div>
            <div><label className="label">Duración (min)</label>
              <input type="number" min={15} max={180} className="input" value={(form.durationMin as number) || 60} onChange={num('durationMin')} /></div>
          </div>
        </Section>

        <Section title="Estado al inicio">
          <Slider label="Dolor referido por tutor" value={(form.dolorReferido as number) ?? 5} onChange={v => set('dolorReferido', v)} />
          <div><label className="label">Movilidad referida</label>
            <select className="input" value={(form.movilidadReferida as string) || ''} onChange={txt('movilidadReferida')}>
              <option value="">—</option>
              {['Igual', 'Mejor', 'Peor'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Actividad en casa</label>
            <select className="input" value={(form.actividadCasa as string) || ''} onChange={txt('actividadCasa')}>
              <option value="">—</option>
              {['Igual', 'Mejor', 'Peor'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Incidencias desde última sesión</label>
            <textarea className="input resize-none" rows={2} value={(form.incidenciasDesde as string) || ''} onChange={txt('incidenciasDesde')} /></div>
          <div><label className="label">Observaciones del tutor</label>
            <textarea className="input resize-none" rows={2} value={(form.observacionesTutor as string) || ''} onChange={txt('observacionesTutor')} /></div>
        </Section>

        <Section title="Exploración rápida">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Slider label="Dolor en reposo" value={(form.dolorReposoRapido as number) ?? 0} onChange={v => set('dolorReposoRapido', v)} />
            <Slider label="Dolor en movimiento" value={(form.dolorMovimientoRapido as number) ?? 0} onChange={v => set('dolorMovimientoRapido', v)} />
            <Slider label="Rango de movimiento" value={(form.rangoMovimiento as number) ?? 5} onChange={v => set('rangoMovimiento', v)} />
            <Slider label="Nivel funcional" value={(form.nivelFuncionalRapido as number) ?? 5} onChange={v => set('nivelFuncionalRapido', v)} />
          </div>
          <div><label className="label">Marcha</label>
            <select className="input" value={(form.marchaRapida as string) || ''} onChange={txt('marchaRapida')}>
              <option value="">—</option>
              {['Normal', 'Cojera'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Tono muscular zona tratada</label>
            <select className="input" value={(form.tonoMuscular as string) || ''} onChange={txt('tonoMuscular')}>
              <option value="">—</option>
              {['Normal', 'Aumentado', 'Disminuido'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Proprioceptive placing</label>
            <select className="input" value={(form.proprioceptiveRapido as string) || ''} onChange={txt('proprioceptiveRapido')}>
              <option value="">—</option>
              {['Normal', 'Retrasado', 'Ausente', 'No evaluado'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Hallazgos palpación</label>
            <textarea className="input resize-none" rows={2} value={(form.hallazgosPalpacion as string) || ''} onChange={txt('hallazgosPalpacion')} /></div>
        </Section>

        <Section title="Tratamiento realizado">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {TECNICAS.map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer">
                <input type="checkbox" checked={hasTecnica(key)} onChange={() => toggleTecnica(key)}
                  className="accent-teal-500 w-4 h-4" />
                {label}
              </label>
            ))}
          </div>
          <div><label className="label">Descripción del tratamiento y zonas tratadas</label>
            <textarea className="input resize-none" rows={4} value={(form.descripcionTratamiento as string) || ''} onChange={txt('descripcionTratamiento')} /></div>
        </Section>

        <Section title="Respuesta al tratamiento">
          <div><label className="label">Respuesta inmediata</label>
            <select className="input" value={(form.respuestaInmediata as string) || ''} onChange={txt('respuestaInmediata')}>
              <option value="">—</option>
              {['Buena', 'Regular', 'Sin cambios', 'Leve empeoramiento'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <Slider label="Dolor post-sesión" value={(form.dolorPostSesion as number) ?? 0} onChange={v => set('dolorPostSesion', v)} />
          <div><label className="label">Tolerancia del paciente</label>
            <select className="input" value={(form.tolerancia as string) || ''} onChange={txt('tolerancia')}>
              <option value="">—</option>
              {['Buena', 'Aceptable', 'Pobre', 'Sedación'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Observaciones durante la sesión</label>
            <textarea className="input resize-none" rows={2} value={(form.observacionesSesion as string) || ''} onChange={txt('observacionesSesion')} /></div>
        </Section>

        <Section title="Evolución respecto a sesión anterior">
          <div><label className="label">Evolución general</label>
            <select className="input" value={(form.evolucionGeneral as string) || ''} onChange={txt('evolucionGeneral')}>
              <option value="">—</option>
              {['Mejoría significativa', 'Mejoría leve', 'Estable', 'Empeoramiento'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          <div><label className="label">Objetivos alcanzados</label>
            <input className="input" value={(form.objetivosAlcanzados as string) || ''} onChange={txt('objetivosAlcanzados')} /></div>
          <div><label className="label">Modificación del plan</label>
            <select className="input" value={(form.modificacionPlan as string) || ''} onChange={txt('modificacionPlan')}>
              <option value="">—</option>
              {['No', 'Sí'].map(v => <option key={v}>{v}</option>)}
            </select></div>
          {form.modificacionPlan === 'Sí' && (
            <div><label className="label">Descripción del cambio</label>
              <textarea className="input resize-none" rows={2} value={(form.modificacionDetalle as string) || ''} onChange={txt('modificacionDetalle')} /></div>
          )}
          <div><label className="label">Comentarios de evolución</label>
            <textarea className="input resize-none" rows={2} value={(form.comentariosEvolucion as string) || ''} onChange={txt('comentariosEvolucion')} /></div>
        </Section>

        <Section title="Pautas domiciliarias" defaultOpen={false}>
          <div><label className="label">Ejercicios / recomendaciones</label>
            <textarea className="input resize-none" rows={3} value={(form.ejerciciosRecomendaciones as string) || ''} onChange={txt('ejerciciosRecomendaciones')} /></div>
          <div><label className="label">Restricciones de actividad</label>
            <input className="input" value={(form.restriccionesActividad as string) || ''} onChange={txt('restriccionesActividad')} /></div>
          <div><label className="label">Calor/frío en casa</label>
            <input className="input" value={(form.calorFrioEnCasa as string) || ''} onChange={txt('calorFrioEnCasa')} placeholder="Ej: Frío 10 min en cadera, 2 veces/día" /></div>
          <div><label className="label">Otras indicaciones</label>
            <textarea className="input resize-none" rows={2} value={(form.otrasIndicaciones as string) || ''} onChange={txt('otrasIndicaciones')} /></div>
        </Section>

        <Section title="Próxima sesión" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Fecha próxima sesión</label>
              <input type="date" className="input" value={((form.fechaProximaSesion as string) || '').slice(0, 10)} onChange={txt('fechaProximaSesion')} /></div>
            <div><label className="label">Frecuencia</label>
              <input className="input" value={(form.frecuenciaProxima as string) || ''} onChange={txt('frecuenciaProxima')} placeholder="Ej: 2 veces/semana" /></div>
          </div>
          <div><label className="label">Objetivos para próxima sesión</label>
            <textarea className="input resize-none" rows={2} value={(form.objetivosProxima as string) || ''} onChange={txt('objetivosProxima')} /></div>
          <div><label className="label">Alertas / signos a vigilar</label>
            <textarea className="input resize-none" rows={2} value={(form.alertasSigns as string) || ''} onChange={txt('alertasSigns')} /></div>
        </Section>

        {/* Multimedia */}
        <Section title="Multimedia de la sesión" defaultOpen={false}>
          <div className="card border-2 border-dashed border-navy-200 hover:border-teal-300 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
            <div className="flex flex-col items-center py-4 gap-2">
              {uploading
                ? <><Loader2 size={20} className="text-teal-500 animate-spin" /><p className="text-sm text-navy-500">Subiendo {uploadingName}…</p></>
                : <><Upload size={20} className="text-navy-300" /><p className="text-sm font-medium text-navy-500">Añadir fotos/vídeos</p><p className="text-xs text-navy-300">JPG, PNG, MP4 · máx 50 MB</p></>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
          </div>
          <MediaGrid files={sessionMediaFiles} onDescChange={updateSessionMediaDesc} />
        </Section>

        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
            {saving ? 'Guardando…' : sessionId ? 'Guardar cambios' : 'Crear sesión'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const apiUrl = (import.meta.env.VITE_API_URL ?? '') + '/api';
  const [tab, setTab] = useState<TabKey>('intake');
  const [showAddRoutine, setShowAddRoutine] = useState(false);
  const [editBasic, setEditBasic] = useState(false);
  const [editForm, setEditForm] = useState({ species: '', breed: '', birthDate: '', weight: '', sex: '', neutered: '', diseases: '', allergies: '' });
  const [uploading, setUploading] = useState(false);
  const [mediaForm, setMediaForm] = useState<{ caption: string; takenAt: string } | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: patient, isLoading } = useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: () => api.get(`/patients/${id}`),
  });

  const { data: allRoutines = [] } = useQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: () => api.get('/routines'),
    enabled: showAddRoutine,
  });

  const { data: patientMedia = [] } = useQuery<PatientMedia[]>({
    queryKey: ['patient-media', id],
    queryFn: () => api.get(`/patients/${id}/media`),
    enabled: tab === 'media',
  });

  const { data: followUpMedia = [] } = useQuery<FollowUpMedia[]>({
    queryKey: ['patient-followup', id],
    queryFn: () => api.get(`/patients/${id}/followup`),
    enabled: tab === 'followup',
  });

  const removeRoutine = useMutation({
    mutationFn: (prId: number) => api.delete(`/routines/assign/${prId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['patient', id] }),
  });

  const addRoutine = useMutation({
    mutationFn: (routineId: number) => api.post('/routines/assign', { patientId: Number(id), routineId }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['patient', id] }); setShowAddRoutine(false); },
  });

  const deleteMedia = useMutation({
    mutationFn: (mediaId: number) => api.delete(`/patients/${id}/media/${mediaId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['patient-media', id] }),
  });

  const updateBasic = useMutation({
    mutationFn: (data: typeof editForm) => api.patch(`/patients/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['patient', id] }); setEditBasic(false); },
  });

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setMediaForm({ caption: '', takenAt: new Date().toISOString().slice(0, 16) });
  }

  async function uploadMedia(e: React.FormEvent) {
    e.preventDefault();
    if (!pendingFile || !mediaForm) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', pendingFile);
      fd.append('patientName', patient?.name ?? '');
      fd.append('context', 'evaluation');
      const uploadRes = await fetch(`${apiUrl}/upload`, { method: 'POST', body: fd });
      if (!uploadRes.ok) throw new Error('Error al subir archivo');
      const { url } = await uploadRes.json();
      const mediaType = pendingFile.type.startsWith('video') ? 'video' : 'photo';
      await api.post(`/patients/${id}/media`, { url, mediaType, caption: mediaForm.caption, takenAt: mediaForm.takenAt });
      qc.invalidateQueries({ queryKey: ['patient-media', id] });
      setPendingFile(null);
      setMediaForm(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al subir');
    } finally {
      setUploading(false);
    }
  }

  if (isLoading) return <div className="p-4 md:p-8 text-navy-400">Cargando…</div>;
  if (!patient) return <div className="p-4 md:p-8 text-red-500">Paciente no encontrado</div>;

  const assignedIds = new Set(patient.rehabRoutines.map(pr => pr.routine.id));

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <Link to="/patients" className="inline-flex items-center gap-1 text-sm text-navy-400 hover:text-navy-600 mb-6">
        <ArrowLeft size={14} /> Volver a pacientes
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {patient.photoUrl
            ? <img src={patient.photoUrl} alt={patient.name} className="w-full h-full object-cover" />
            : <PawPrint size={22} className="md:text-[28px] text-teal-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-navy-700">{patient.name}</h1>
            <span className={patient.active ? 'badge-green' : 'badge-gray'}>{patient.active ? 'Activo' : 'Inactivo'}</span>
          </div>
          <p className="text-navy-400 text-sm mt-0.5 truncate">{patient.species}{patient.breed ? ` · ${patient.breed}` : ''}{patient.weight ? ` · ${patient.weight}` : ''}{patient.sex ? ` · ${patient.sex}` : ''}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
            <span className="flex items-center gap-1 text-navy-500"><Phone size={13} /> {patient.tutor.name} · {patient.tutor.phone}</span>
            {patient.tutor.email && <span className="flex items-center gap-1 text-navy-400"><Mail size={13} /> {patient.tutor.email}</span>}
          </div>
        </div>
        <Link to={`/chat/${patient.tutor.id}`} className="btn-secondary text-sm flex-shrink-0">Contactar</Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 mb-6 bg-navy-100 rounded-xl p-1 w-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0 ${tab === key ? 'bg-white text-navy-700 shadow-sm' : 'text-navy-500 hover:text-navy-700'}`}
          >
            <Icon size={12} />{label}
          </button>
        ))}
      </div>

      {/* ── Ficha ── */}
      {tab === 'intake' && (
        <div className="space-y-4">
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Datos del paciente</h3>
              <button onClick={() => { setEditForm({ species: patient.species ?? '', breed: patient.breed ?? '', birthDate: patient.birthDate ?? '', weight: patient.weight ?? '', sex: patient.sex ?? '', neutered: patient.neutered ?? '', diseases: patient.diseases ?? '', allergies: patient.allergies ?? '' }); setEditBasic(true); }} className="flex items-center gap-1 text-xs text-navy-400 hover:text-navy-600 transition-colors">
                <Pencil size={12} /> Editar
              </button>
            </div>
            <Row label="Especie / Raza" value={[patient.species, patient.breed].filter(Boolean).join(' · ')} />
            <Row label="Fecha nacimiento / Edad" value={patient.birthDate} />
            <Row label="Peso" value={patient.weight} />
            <Row label="Sexo" value={patient.sex} />
            <Row label="Esterilizado/a" value={patient.neutered} />
            <Row label="Enfermedades" value={patient.diseases} />
            <Row label="Alergias" value={patient.allergies} />
          </div>

          {patient.tutor.howFoundUs && (
            <div className="card space-y-3">
              <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Tutor / Propietario</h3>
              <Row label="Cómo nos conoció" value={patient.tutor.howFoundUs} />
            </div>
          )}

          {!patient.intakeData ? (
            <div className="card"><p className="text-navy-300">Sin ficha de anamnesis registrada.</p></div>
          ) : (
            <>
              {/* Motivo y síntomas */}
              <div className="card space-y-3">
                <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Motivo de consulta</h3>
                <Row always label="Motivo consulta" value={patient.intakeData.motivoConsulta} />
                <Row always label="Desde cuándo" value={patient.intakeData.desdeCuando} />
                <Row always label="Inicio síntomas" value={patient.intakeData.inicioSintomas} />
                <Row always label="Momentos peor/mejor" value={patient.intakeData.momentosPeorMejor} />
                <Row always label="Síntomas observados" value={patient.intakeData.sintomasObservados} />
                <Row always label="Dolor al comer" value={patient.intakeData.dolorAlComer} />
                <Row always label="Mejora con" value={patient.intakeData.mejoriaCon} />
              </div>

              {/* Historia clínica */}
              <div className="card space-y-3">
                <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Historia clínica</h3>
                <Row always label="Enfermedades diagnosticadas" value={patient.intakeData.enfermedades} />
                <Row always label="Alergias conocidas" value={patient.intakeData.alergias} />
                <Row always label="Lesiones previas" value={patient.intakeData.lesionesPrevias} />
                <Row always label="Cirugía previa" value={patient.intakeData.cirugiaPrevia} />
                <Row always label="Detalle cirugía" value={patient.intakeData.cirugiaDetalle} />
                <Row always label="Diagnóstico previo" value={patient.intakeData.diagnosticoPrevio} />
                <Row always label="Veterinario referente" value={patient.intakeData.veterinarioRef} />
              </div>

              {/* Tratamientos */}
              <div className="card space-y-3">
                <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Tratamientos</h3>
                <Row always label="Medicación actual" value={patient.intakeData.medicacion} />
                <Row always label="Detalle medicación" value={patient.intakeData.medicacionDetalle} />
                <Row always label="Fisioterapia previa" value={patient.intakeData.fisioterapiaPrevia} />
                <Row always label="Detalle fisioterapia" value={patient.intakeData.fisioterapiaDetalle} />
              </div>

              {/* Estilo de vida */}
              <div className="card space-y-3">
                <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Estilo de vida</h3>
                <Row always label="Nivel de actividad" value={patient.intakeData.nivelActividad} />
                <Row always label="Tipo de paseos" value={patient.intakeData.tipoPaseos} />
                <Row always label="Dónde duerme" value={patient.intakeData.dondeDuerme} />
                <Row always label="Escaleras" value={patient.intakeData.escaleras} />
              </div>

              {/* Objetivos y notas */}
              <div className="card space-y-3">
                <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Objetivos y observaciones</h3>
                <Row always label="Objetivos del tutor" value={patient.intakeData.objetivos} />
                <Row always label="Observaciones" value={patient.intakeData.observaciones} />
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Primera Evaluación ── */}
      {tab === 'evaluation' && (
        <EvaluationTab patientId={patient.id} patientName={patient.name} evaluation={patient.evaluation} />
      )}

      {/* ── Sesiones ── */}
      {tab === 'sessions' && (
        <SessionsTab patientId={patient.id} patientName={patient.name} />
      )}

      {/* ── Citas ── */}
      {tab === 'appointments' && (
        <div className="card p-0 overflow-hidden">
          {patient.appointments.length === 0 ? (
            <p className="p-6 text-navy-300">Sin citas registradas.</p>
          ) : (
            <>
              <div className="md:hidden divide-y divide-navy-50">
                {patient.appointments.map(a => (
                  <div key={a.id} className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-navy-700">{format(new Date(a.date), "d MMM yyyy · HH:mm", { locale: es })}</span>
                      <span className={STATUS_CLASS[a.status]}>{STATUS_LABEL[a.status]}</span>
                    </div>
                    <div className="text-xs text-navy-400">{a.duration} min{a.notes ? ` · ${a.notes}` : ''}</div>
                  </div>
                ))}
              </div>
              <table className="hidden md:table w-full">
                <thead className="bg-navy-50 border-b border-navy-100">
                  <tr>{['Fecha', 'Duración', 'Estado', 'Notas'].map(h => <th key={h} className="text-left text-xs font-semibold text-navy-500 px-4 py-3">{h}</th>)}</tr>
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
            </>
          )}
        </div>
      )}

      {/* ── Rutinas ── */}
      {tab === 'routines' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button onClick={() => setShowAddRoutine(true)} className="btn-secondary text-sm"><Plus size={14} /> Añadir rutina</button>
          </div>
          {patient.rehabRoutines.length === 0 && <div className="card text-navy-300">Sin rutinas asignadas.</div>}
          {patient.rehabRoutines.map(pr => (
            <div key={pr.id} className="card flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-navy-700">{pr.routine.name}</span>
                  {pr.routine.category && <span className="badge-blue">{pr.routine.category}</span>}
                  {pr.routine.duration && <span className="text-xs text-navy-400">{pr.routine.duration} min</span>}
                </div>
                {pr.notes && <p className="text-sm text-navy-400 mt-1">{pr.notes}</p>}
                {pr.routine.videoUrl && <a href={pr.routine.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-teal-500 hover:underline mt-1 inline-block">Ver video →</a>}
              </div>
              <button onClick={() => removeRoutine.mutate(pr.id)} className="p-2 text-navy-300 hover:text-red-500 transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center">
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
                    <button key={r.id} onClick={() => addRoutine.mutate(r.id)} className="w-full text-left p-3 rounded-xl hover:bg-navy-50 transition-colors border border-navy-100 min-h-[44px]">
                      <div className="font-medium text-navy-700 text-sm">{r.name}</div>
                      <div className="text-xs text-navy-400">{r.category}{r.duration ? ` · ${r.duration} min` : ''}</div>
                    </button>
                  ))}
                  {allRoutines.filter(r => !assignedIds.has(r.id)).length === 0 && <p className="text-navy-300 text-sm text-center py-4">Todas las rutinas ya asignadas</p>}
                </div>
                <button onClick={() => setShowAddRoutine(false)} className="btn-ghost w-full justify-center mt-4">Cerrar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Multimedia ── */}
      {tab === 'media' && (
        <div className="space-y-4">
          <div className="card border-2 border-dashed border-navy-200 hover:border-teal-300 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="flex flex-col items-center py-6 gap-2">
              <Upload size={24} className="text-navy-300" />
              <p className="text-sm font-medium text-navy-500">Subir foto o vídeo</p>
              <p className="text-xs text-navy-300">JPG, PNG, MP4 · máx 50 MB</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
          </div>

          {patientMedia.length === 0 && !mediaForm && (
            <div className="card text-center py-8">
              <Camera size={32} className="mx-auto mb-3 text-navy-200" />
              <p className="text-navy-300 text-sm">Sin multimedia registrada.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {patientMedia.map(m => (
              <div key={m.id} className="card p-0 overflow-hidden group">
                <div className="relative aspect-video bg-navy-50">
                  {m.mediaType === 'video'
                    ? <video src={m.url} className="w-full h-full object-cover" controls />
                    : <img src={m.url} alt={m.caption || ''} className="w-full h-full object-cover" />}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
                    {m.mediaType === 'video' ? <Video size={10} /> : <Image size={10} />}
                    {m.mediaType}
                  </div>
                  <button onClick={() => deleteMedia.mutate(m.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-navy-500 font-medium">{format(new Date(m.takenAt), "d MMM yyyy", { locale: es })}</p>
                  {m.caption && <p className="text-xs text-navy-400 mt-0.5">{m.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Seguimiento (portal uploads) ── */}
      {tab === 'followup' && (
        <div className="space-y-4">
          {followUpMedia.length === 0 ? (
            <div className="card text-center py-8">
              <Image size={32} className="mx-auto mb-3 text-navy-200" />
              <p className="text-navy-300 text-sm">El propietario no ha enviado ningún seguimiento todavía.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {followUpMedia.map(m => (
                <div key={m.id} className="card p-0 overflow-hidden">
                  <div className="relative aspect-video bg-navy-50">
                    {m.mediaType === 'video'
                      ? <video src={m.url} className="w-full h-full object-cover" controls />
                      : <img src={m.url} alt={m.caption || ''} className="w-full h-full object-cover" />}
                    <div className="absolute top-2 left-2 bg-teal-500/80 text-white text-xs px-2 py-1 rounded-lg">Cliente</div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-navy-500 font-medium">{format(new Date(m.createdAt), "d MMM yyyy · HH:mm", { locale: es })}</p>
                    {m.caption && <p className="text-xs text-navy-400 mt-0.5">{m.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Notas ── */}
      {tab === 'notes' && (
        <NotesTab patientName={patient.name} />
      )}

      {/* ── Pautas ── */}
      {tab === 'pautas' && (
        <PautasTab patient={patient} />
      )}

      {/* ── Edit modal ── */}
      {editBasic && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setEditBasic(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-navy-700 mb-4">Editar datos del paciente</h2>
            <form onSubmit={e => { e.preventDefault(); updateBasic.mutate(editForm); }} className="space-y-3">
              {([
                ['Especie', 'species', 'text', 'Ej: Canino, Equino'],
                ['Raza', 'breed', 'text', 'Ej: Labrador Retriever'],
                ['Fecha de nacimiento', 'birthDate', 'text', 'Ej: 15/03/2020'],
                ['Peso', 'weight', 'text', 'Ej: 28 kg'],
              ] as const).map(([label, key, type, placeholder]) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input className="input" type={type} placeholder={placeholder}
                    value={editForm[key as keyof typeof editForm]}
                    onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <div><label className="label">Sexo</label>
                <select className="input" value={editForm.sex} onChange={e => setEditForm(f => ({ ...f, sex: e.target.value }))}>
                  <option value="">Sin especificar</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select></div>
              <div><label className="label">Esterilizado/a</label>
                <select className="input" value={editForm.neutered} onChange={e => setEditForm(f => ({ ...f, neutered: e.target.value }))}>
                  <option value="">Sin especificar</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select></div>
              <div><label className="label">Enfermedades diagnosticadas</label>
                <textarea className="input resize-none" rows={2} value={editForm.diseases}
                  onChange={e => setEditForm(f => ({ ...f, diseases: e.target.value }))} /></div>
              <div><label className="label">Alergias conocidas</label>
                <textarea className="input resize-none" rows={2} value={editForm.allergies}
                  onChange={e => setEditForm(f => ({ ...f, allergies: e.target.value }))} /></div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setEditBasic(false)} className="btn-ghost flex-1 justify-center">Cancelar</button>
                <button type="submit" disabled={updateBasic.isPending} className="btn-primary flex-1 justify-center">
                  {updateBasic.isPending ? 'Guardando…' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Upload modal ── */}
      {mediaForm && pendingFile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => { setMediaForm(null); setPendingFile(null); }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-navy-700 mb-4">Añadir {pendingFile.type.startsWith('video') ? 'vídeo' : 'foto'}</h2>
            <form onSubmit={uploadMedia} className="space-y-3">
              <div className="bg-navy-50 rounded-xl p-3 text-sm text-navy-500 truncate">{pendingFile.name}</div>
              <div><label className="label">Fecha</label>
                <input type="datetime-local" className="input" value={mediaForm.takenAt} onChange={e => setMediaForm(f => f && ({ ...f, takenAt: e.target.value }))} /></div>
              <div><label className="label">Descripción / Evaluación</label>
                <textarea className="input resize-none" rows={3} value={mediaForm.caption} onChange={e => setMediaForm(f => f && ({ ...f, caption: e.target.value }))} /></div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setMediaForm(null); setPendingFile(null); }} className="btn-ghost flex-1 justify-center">Cancelar</button>
                <button type="submit" disabled={uploading} className="btn-primary flex-1 justify-center">{uploading ? 'Subiendo…' : 'Subir'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
