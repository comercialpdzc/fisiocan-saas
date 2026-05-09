import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageSquare, Send, PawPrint, ArrowLeft, Mic, MicOff, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getStoredUser } from '../lib/auth';

interface TutorConversation {
  id: number; name: string; phone: string;
  messages: Array<{ id: number; body: string; createdAt: string; fromTutor: boolean }>;
  _count: { patients: number };
}

interface Message {
  id: number; body: string; createdAt: string; fromTutor: boolean;
  fisio?: { id: number; name: string };
  tutor?: { id: number; name: string };
}

// ─── Audio / speech recognition ──────────────────────────────────────────────
type RecordState = 'idle' | 'recording' | 'transcribing';

type SpeechRecognitionCtor = new () => {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};

function getWebSpeechCtor(): SpeechRecognitionCtor | undefined {
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition) as SpeechRecognitionCtor | undefined;
}

/**
 * Prefers Web Speech API (real-time, no server round-trip).
 * Falls back to MediaRecorder → Whisper when Web Speech is unavailable.
 */
function useAudioRecorder(onTranscript: (text: string) => void) {
  const [state, setState] = useState<RecordState>('idle');
  const recognitionRef = useRef<InstanceType<SpeechRecognitionCtor> | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);

  function startWebSpeech() {
    const Ctor = getWebSpeechCtor()!;
    const r = new Ctor();
    r.lang = 'es-ES'; r.continuous = true; r.interimResults = true;
    let lastInterim = '';
    r.onresult = (e: any) => {
      for (let i = e.resultIndex ?? 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          const t = (e.results[i][0].transcript as string).trim();
          if (t) { onTranscriptRef.current(t); lastInterim = ''; }
        } else {
          lastInterim = (lastInterim + ' ' + e.results[i][0].transcript).trim();
        }
      }
    };
    r.onerror = (e: any) => {
      setState('idle');
      recognitionRef.current = null;
      const code = e.error as string;
      console.error('[SpeechRecognition] error:', code);
      if (code === 'aborted') return;
      if (code === 'not-allowed') {
        alert('Permiso de micrófono denegado. Ve a Configuración del sitio → Micrófono y permite el acceso.');
      } else if (code === 'no-speech') {
        alert('No se detectó habla. Verifica que el micrófono esté activo y habla más cerca de él.');
      } else {
        alert(`Error de reconocimiento de voz: ${code}`);
      }
    };
    r.onend = () => {
      if (lastInterim) { onTranscriptRef.current(lastInterim); lastInterim = ''; }
      setState('idle'); recognitionRef.current = null;
    };
    recognitionRef.current = r;
    try {
      r.start();
      setState('recording');
    } catch (err: any) {
      setState('idle');
      recognitionRef.current = null;
      alert(`No se pudo iniciar el micrófono: ${err?.message ?? err}`);
    }
  }

  function stopWebSpeech() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setState('idle');
  }

  const stopMediaRecorder = useCallback(async () => {
    const mr = mediaRecorder.current;
    if (!mr || mr.state === 'inactive') return;
    const blob: Blob = await new Promise(resolve => {
      mr.onstop = () => resolve(new Blob(chunks.current, { type: mr.mimeType || 'audio/webm' }));
      mr.stop();
    });
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null; mediaRecorder.current = null;
    setState('transcribing');
    try {
      const fd = new FormData();
      fd.append('audio', blob, 'recording.webm');
      const res = await api.postForm<{ transcript: string | null; noApiKey?: boolean }>('/brain/transcribe', fd);
      if (res.transcript) onTranscriptRef.current(res.transcript);
    } catch { /* silent */ }
    finally { setState('idle'); }
  }, []);

  async function startMediaRecorder() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      mediaRecorder.current = mr; chunks.current = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunks.current.push(e.data); };
      mr.start(100); setState('recording');
    } catch { alert('No se pudo acceder al micrófono. Verifica los permisos.'); }
  }

  function toggle() {
    if (state === 'idle') {
      if (getWebSpeechCtor()) startWebSpeech();
      else startMediaRecorder();
    } else if (state === 'recording') {
      if (recognitionRef.current) stopWebSpeech();
      else stopMediaRecorder();
    }
  }

  useEffect(() => () => {
    recognitionRef.current?.abort();
    if (mediaRecorder.current?.state !== 'inactive') mediaRecorder.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
  }, []);

  return { state, toggle };
}

// ─── ChatPage ────────────────────────────────────────────────────────────────
export default function ChatPage() {
  const { tutorId } = useParams<{ tutorId?: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const user = getStoredUser();
  const [text, setText] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  const appendTranscript = useCallback((t: string) => {
    setText(prev => prev ? `${prev} ${t}` : t);
  }, []);

  const { state: micState, toggle: toggleMic } = useAudioRecorder(appendTranscript);

  const { data: conversations = [] } = useQuery<TutorConversation[]>({
    queryKey: ['conversations'],
    queryFn: () => api.get('/messages/conversations'),
    refetchInterval: 15_000,
  });

  const { data: unreadCounts = [] } = useQuery<{ tutorId: number; _count: { id: number } }[]>({
    queryKey: ['messages-unread'],
    queryFn: () => api.get('/messages/unread'),
    refetchInterval: 15_000,
  });

  const unreadMap = Object.fromEntries(unreadCounts.map(u => [u.tutorId, u._count.id]));

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages', tutorId],
    queryFn: () => api.get(`/messages/tutor/${tutorId}`),
    enabled: !!tutorId,
    refetchInterval: 15_000,
  });

  useEffect(() => {
    if (!tutorId) return;
    api.patch(`/messages/read/${tutorId}`, {}).then(() => {
      qc.invalidateQueries({ queryKey: ['messages-unread'] });
    }).catch(() => {});
  }, [tutorId]);

  const sendMsg = useMutation({
    mutationFn: (body: string) => api.post('/messages', { body, tutorId: Number(tutorId) }),
    onSuccess: () => {
      setText('');
      qc.invalidateQueries({ queryKey: ['messages', tutorId] });
      qc.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeTutor = conversations.find(c => c.id === Number(tutorId));

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !tutorId) return;
    sendMsg.mutate(text.trim());
  }

  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <div className={`
        w-full md:w-72 border-r border-navy-100 bg-white flex flex-col
        ${tutorId ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 border-b border-navy-100">
          <h2 className="font-semibold text-navy-700">Mensajes</h2>
          <p className="text-xs text-navy-400 mt-0.5">{conversations.length} tutores</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <div className="p-6 text-center text-navy-300 text-sm">Sin conversaciones</div>
          )}
          {conversations.map(c => {
            const last = c.messages[0];
            return (
              <button
                key={c.id}
                onClick={() => navigate(`/chat/${c.id}`)}
                className={`w-full text-left p-4 border-b border-navy-50 hover:bg-navy-50 transition-colors min-h-[60px] ${Number(tutorId) === c.id ? 'bg-teal-50 border-l-2 border-l-teal-400' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-navy-500">{c.name[0].toUpperCase()}</span>
                    </div>
                    {unreadMap[c.id] > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                        {unreadMap[c.id]}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm truncate ${unreadMap[c.id] > 0 ? 'font-bold text-navy-800' : 'font-medium text-navy-700'}`}>{c.name}</div>
                    {last ? (
                      <div className={`text-xs truncate ${unreadMap[c.id] > 0 && last.fromTutor ? 'text-navy-600 font-medium' : 'text-navy-400'}`}>
                        {last.fromTutor ? '← ' : ''}{last.body}
                      </div>
                    ) : (
                      <div className="text-xs text-navy-300 flex items-center gap-1"><PawPrint size={10} /> {c._count.patients} paciente{c._count.patients !== 1 ? 's' : ''}</div>
                    )}
                  </div>
                  {last && <div className="text-xs text-navy-300 flex-shrink-0">{format(new Date(last.createdAt), 'HH:mm')}</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      {!tutorId ? (
        <div className="hidden md:flex flex-1 items-center justify-center text-navy-300">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
            <p>Selecciona un tutor para chatear</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          {/* Header */}
          <div className="px-4 md:px-6 py-4 border-b border-navy-100 bg-white flex items-center gap-3">
            <button onClick={() => navigate('/chat')} className="md:hidden p-1 text-navy-400 hover:text-navy-600 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="font-semibold text-navy-700">{activeTutor?.name ?? `Tutor #${tutorId}`}</div>
              <div className="text-xs text-navy-400">{activeTutor?.phone}</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
            {messages.map(msg => {
              const isMine = !msg.fromTutor;
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] md:max-w-md px-4 py-2.5 rounded-2xl text-sm ${isMine ? 'bg-navy-700 text-white rounded-br-sm' : 'bg-white border border-navy-100 text-navy-700 rounded-bl-sm shadow-sm'}`}>
                    <p>{msg.body}</p>
                    <p className={`text-xs mt-1 ${isMine ? 'text-navy-300' : 'text-navy-400'}`}>
                      {format(new Date(msg.createdAt), "d MMM · HH:mm", { locale: es })}
                    </p>
                  </div>
                </div>
              );
            })}
            {messages.length === 0 && (
              <div className="text-center text-navy-300 text-sm py-8">Sin mensajes aún. ¡Escribe el primero!</div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input bar */}
          <form onSubmit={handleSend} className="px-4 md:px-6 py-4 border-t border-navy-100 bg-white flex gap-2 items-center">
            {/* Mic button */}
            <button
              type="button"
              onClick={toggleMic}
              disabled={micState === 'transcribing'}
              title={micState === 'recording' ? 'Detener grabación' : 'Grabar audio'}
              className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                micState === 'recording'
                  ? 'bg-red-500 text-white animate-pulse'
                  : micState === 'transcribing'
                  ? 'bg-navy-100 text-navy-400 cursor-wait'
                  : 'bg-navy-100 text-navy-500 hover:bg-navy-200'
              }`}
            >
              {micState === 'transcribing'
                ? <Loader2 size={18} className="animate-spin" />
                : micState === 'recording'
                ? <MicOff size={18} />
                : <Mic size={18} />
              }
            </button>

            <input
              className="input flex-1"
              placeholder={micState === 'recording' ? 'Grabando…' : micState === 'transcribing' ? 'Transcribiendo…' : 'Escribe un mensaje…'}
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={micState !== 'idle'}
            />
            <button type="submit" disabled={!text.trim() || sendMsg.isPending || micState !== 'idle'} className="btn-primary px-4 min-h-[44px]">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
