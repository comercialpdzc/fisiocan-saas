import { useState, useEffect, useRef, useMemo, Suspense, lazy, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Brain, Send, Plus, Trash2, X, BookOpen, Loader2, Network, MessageSquare, Search, RefreshCw, Link2, Mail, Inbox, PenSquare, Reply, ChevronLeft, User, Mic, MicOff } from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ForceGraph3D = lazy(() => import('react-force-graph-3d'));

// ── Audio / speech recognition ─────────────────────────────────────────────────

type RecordState = 'idle' | 'recording' | 'transcribing';

type SpeechRecognitionCtor = new () => {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

function getWebSpeechCtor(): SpeechRecognitionCtor | undefined {
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition) as SpeechRecognitionCtor | undefined;
}

/**
 * Prefers Web Speech API (real-time, no server round-trip).
 * Falls back to MediaRecorder → /api/brain/transcribe (Whisper) when Web Speech is unavailable.
 */
function useAudioRecorder(onTranscript: (text: string) => void) {
  const [state, setState] = useState<RecordState>('idle');
  const recognitionRef = useRef<InstanceType<SpeechRecognitionCtor> | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);

  // ── Web Speech path ────────────────────────────────────────────────────────
  function startWebSpeech() {
    const Ctor = getWebSpeechCtor()!;
    const r = new Ctor();
    r.lang = 'es-ES';
    r.continuous = true;
    r.interimResults = false;
    r.onresult = (e) => {
      const idx = e.results.length - 1;
      const text = e.results[idx][0].transcript;
      if (text) onTranscriptRef.current(text);
    };
    r.onerror = () => setState('idle');
    r.onend = () => setState('idle');
    recognitionRef.current = r;
    r.start();
    setState('recording');
  }

  function stopWebSpeech() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setState('idle');
  }

  // ── MediaRecorder + Whisper path ───────────────────────────────────────────
  const stopMediaRecorder = useCallback(async () => {
    const mr = mediaRecorder.current;
    if (!mr || mr.state === 'inactive') return;
    const blob: Blob = await new Promise(resolve => {
      mr.onstop = () => resolve(new Blob(chunks.current, { type: mr.mimeType || 'audio/webm' }));
      mr.stop();
    });
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    mediaRecorder.current = null;
    setState('transcribing');
    try {
      const fd = new FormData();
      fd.append('audio', blob, 'recording.webm');
      const res = await api.postForm<{ transcript: string | null; noApiKey?: boolean }>('/brain/transcribe', fd);
      if (res.transcript) onTranscriptRef.current(res.transcript);
    } catch { /* silent fail */ }
    finally { setState('idle'); }
  }, []);

  async function startMediaRecorder() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      mediaRecorder.current = mr;
      chunks.current = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunks.current.push(e.data); };
      mr.start(100);
      setState('recording');
    } catch { alert('No se pudo acceder al micrófono. Verifica los permisos.'); }
  }

  // ── Toggle ─────────────────────────────────────────────────────────────────
  const webSpeechAvailable = !!getWebSpeechCtor();

  function toggle() {
    if (state === 'idle') {
      if (webSpeechAvailable) startWebSpeech();
      else startMediaRecorder();
    } else if (state === 'recording') {
      if (webSpeechAvailable) stopWebSpeech();
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

// ── Types ──────────────────────────────────────────────────────────────────────

interface BrainConversation {
  id: number;
  title: string;
  createdAt: string;
  messages: { content: string; createdAt: string }[];
}
interface BrainMessage { id: number; role: 'user' | 'assistant'; content: string; createdAt: string; }
interface BrainNote {
  id: number;
  title: string;
  content: string;
  tags: string;
  originType: string;
  sourceRef?: string;
  x?: number;
  y?: number;
  z?: number;
  createdAt: string;
}
interface BrainSynapse {
  id: number;
  nodeIdA: number;
  nodeIdB: number;
  strength: number;
  count: number;
  firstLinkedAt: string;
}

interface GmailMessage {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
  isRead: boolean;
  labelIds: string[];
}
interface GmailContact {
  id: number;
  email: string;
  name?: string;
  type: string;
  notes?: string;
  lastContactAt?: string;
}

interface GraphNode {
  id: number;
  name: string;
  tags: string[];
  content: string;
  val: number;
  originType: string;
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
}
interface GraphLink {
  source: number | GraphNode;
  target: number | GraphNode;
  count: number;
  strength: number;
  firstLinkedAt: string;
}

// ── Color helpers ──────────────────────────────────────────────────────────────

function originColor(type: string): string {
  switch (type) {
    case 'conversation': return '#22c55e';  // verde — extraído de conversaciones
    case 'base':         return '#3b82f6';  // azul  — conocimiento base
    case 'file':         return '#a855f7';  // morado — desde archivo
    default:             return '#f97316';  // naranja — nota manual
  }
}

function originLabel(type: string): string {
  switch (type) {
    case 'conversation': return 'Práctica clínica';
    case 'base':         return 'Conocimiento base';
    case 'file':         return 'Archivo';
    default:             return 'Nota manual';
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function BrainPage() {
  const qc = useQueryClient();
  const [view, setView] = useState<'chat' | 'graph' | 'gmail'>('chat');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'chats' | 'notes'>('chats');
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [noteForm, setNoteForm] = useState<{ title: string; content: string; tags: string; linkedNodeId?: number } | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [graphRightTab, setGraphRightTab] = useState<'stats' | 'node'>('stats');
  const [searchQuery, setSearchQuery] = useState('');
  const [indexing, setIndexing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  const appendTranscript = useCallback((t: string) => {
    setInput(prev => prev ? `${prev} ${t}` : t);
  }, []);
  const { state: micState, toggle: toggleMic } = useAudioRecorder(appendTranscript);
  const fgRef = useRef<any>(null);
  const [graphSize, setGraphSize] = useState({ width: 800, height: 600 });

  // Gmail state
  const [selectedEmail, setSelectedEmail] = useState<GmailMessage | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });
  const [composeSending, setComposeSending] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [replySending, setReplySending] = useState(false);
  const [aiDrafting, setAiDrafting] = useState(false);

  // ── Queries ──────────────────────────────────────────────────────────────────

  const { data: conversations = [], isLoading: convsLoading } = useQuery<BrainConversation[]>({
    queryKey: ['brain-conversations'],
    queryFn: () => api.get('/brain/conversations'),
  });

  const { data: messages = [] } = useQuery<BrainMessage[]>({
    queryKey: ['brain-messages', selectedConvId],
    queryFn: () => api.get(`/brain/messages${selectedConvId ? `?conversationId=${selectedConvId}` : ''}`),
    enabled: selectedConvId !== null,
  });

  const { data: notes = [] } = useQuery<BrainNote[]>({
    queryKey: ['brain-notes'],
    queryFn: () => api.get('/brain/notes'),
    refetchInterval: view === 'graph' ? 15000 : false, // auto-refresh graph every 15s
  });

  const { data: synapses = [] } = useQuery<BrainSynapse[]>({
    queryKey: ['brain-synapses'],
    queryFn: () => api.get('/brain/synapses'),
    refetchInterval: view === 'graph' ? 15000 : false,
  });

  const { data: gmailInbox, isLoading: inboxLoading, refetch: refetchInbox } = useQuery<{ messages: GmailMessage[]; unread: number }>({
    queryKey: ['gmail-inbox'],
    queryFn: () => api.get('/gmail/inbox'),
    enabled: view === 'gmail',
    refetchInterval: view === 'gmail' ? 60000 : false,
  });

  const { data: gmailUnread } = useQuery<{ count: number }>({
    queryKey: ['gmail-unread'],
    queryFn: () => api.get('/gmail/unread-count'),
    refetchInterval: 120000,
  });

  const { data: gmailContacts = [] } = useQuery<GmailContact[]>({
    queryKey: ['gmail-contacts'],
    queryFn: () => api.get('/gmail/contacts'),
    enabled: view === 'gmail',
  });

  // ── Effects ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!convsLoading && selectedConvId === null && conversations.length > 0) {
      setSelectedConvId(conversations[0].id);
    }
  }, [conversations, convsLoading, selectedConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (view !== 'graph') return;
    function measure() {
      if (graphContainerRef.current) {
        setGraphSize({ width: graphContainerRef.current.offsetWidth, height: graphContainerRef.current.offsetHeight });
      }
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (graphContainerRef.current) ro.observe(graphContainerRef.current);
    return () => ro.disconnect();
  }, [view]);

  // ── Graph data ───────────────────────────────────────────────────────────────

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = notes.map(n => ({
      id: n.id,
      name: n.title,
      tags: n.tags.split(',').map(t => t.trim()).filter(Boolean),
      content: n.content,
      originType: n.originType || 'manual',
      val: Math.max(3, Math.min(12, n.content.length / 60 + 2)),
      ...(n.x != null ? { x: n.x, y: n.y ?? 0, z: n.z ?? 0 } : {}),
    }));

    // Primary: synapse-based edges
    const synapsePairs = new Set<string>();
    const links: GraphLink[] = synapses.map(s => {
      synapsePairs.add(`${Math.min(s.nodeIdA, s.nodeIdB)}_${Math.max(s.nodeIdA, s.nodeIdB)}`);
      return { source: s.nodeIdA, target: s.nodeIdB, count: s.count, strength: s.strength, firstLinkedAt: s.firstLinkedAt };
    });

    // Fallback: tag-based connections for nodes without synapses
    for (let i = 0; i < notes.length; i++) {
      const tagsA = new Set(notes[i].tags.split(',').map(t => t.trim()).filter(Boolean));
      if (tagsA.size === 0) continue;
      for (let j = i + 1; j < notes.length; j++) {
        const key = `${Math.min(notes[i].id, notes[j].id)}_${Math.max(notes[i].id, notes[j].id)}`;
        if (synapsePairs.has(key)) continue;
        const shared = notes[j].tags.split(',').map(t => t.trim()).filter(t => tagsA.has(t));
        if (shared.length > 0) {
          links.push({ source: notes[i].id, target: notes[j].id, count: shared.length, strength: 0.25, firstLinkedAt: '' });
        }
      }
    }

    return { nodes, links };
  }, [notes, synapses]);

  const highlightNodeIds = useMemo(() => {
    if (!searchQuery.trim()) return new Set<number>();
    const q = searchQuery.toLowerCase();
    return new Set(notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.toLowerCase().includes(q)
    ).map(n => n.id));
  }, [searchQuery, notes]);

  const tagStats = useMemo(() => {
    const counts: Record<string, number> = {};
    notes.forEach(n => n.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const max = sorted[0]?.[1] ?? 1;
    return sorted.map(([tag, count]) => ({ tag, count, pct: count / max }));
  }, [notes]);

  const connectedNodes = useMemo(() => {
    if (!selectedNode) return [];
    return synapses
      .filter(s => s.nodeIdA === selectedNode.id || s.nodeIdB === selectedNode.id)
      .map(s => {
        const otherId = s.nodeIdA === selectedNode.id ? s.nodeIdB : s.nodeIdA;
        const other = notes.find(n => n.id === otherId);
        return other ? { note: other, count: s.count, strength: s.strength } : null;
      })
      .filter((x): x is { note: BrainNote; count: number; strength: number } => x !== null)
      .sort((a, b) => b.count - a.count);
  }, [selectedNode, synapses, notes]);

  // ── Mutations ─────────────────────────────────────────────────────────────────

  const createConv = useMutation({
    mutationFn: () => api.post<BrainConversation>('/brain/conversations', {}),
    onSuccess: (conv: BrainConversation) => {
      qc.invalidateQueries({ queryKey: ['brain-conversations'] });
      setSelectedConvId(conv.id);
      setSidebarTab('chats');
    },
  });

  const deleteConv = useMutation({
    mutationFn: (id: number) => api.delete(`/brain/conversations/${id}`),
    onSuccess: (_: unknown, id: number) => {
      qc.invalidateQueries({ queryKey: ['brain-conversations'] });
      if (selectedConvId === id) {
        const next = conversations.find(c => c.id !== id);
        setSelectedConvId(next?.id ?? null);
      }
    },
  });

  const clearChat = useMutation({
    mutationFn: () => api.delete(`/brain/messages${selectedConvId ? `?conversationId=${selectedConvId}` : ''}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['brain-messages', selectedConvId] });
      qc.invalidateQueries({ queryKey: ['brain-conversations'] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: (id: number) => api.delete(`/brain/notes/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['brain-notes'] });
      qc.invalidateQueries({ queryKey: ['brain-synapses'] });
    },
  });

  // ── Handlers ──────────────────────────────────────────────────────────────────

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput('');
    setSending(true);
    try {
      const result: { reply: string; conversationId: number } = await api.post('/brain/chat', {
        message: text,
        conversationId: selectedConvId ?? undefined,
      });
      if (result.conversationId && result.conversationId !== selectedConvId) {
        setSelectedConvId(result.conversationId);
      }
      qc.invalidateQueries({ queryKey: ['brain-messages', result.conversationId] });
      qc.invalidateQueries({ queryKey: ['brain-conversations'] });
      // Refresh notes/synapses after a short delay (background indexing may have run)
      setTimeout(() => {
        qc.invalidateQueries({ queryKey: ['brain-notes'] });
        qc.invalidateQueries({ queryKey: ['brain-synapses'] });
      }, 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al enviar');
    } finally {
      setSending(false);
    }
  }

  async function saveNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteForm) return;
    await api.post('/brain/notes', noteForm);
    qc.invalidateQueries({ queryKey: ['brain-notes'] });
    qc.invalidateQueries({ queryKey: ['brain-synapses'] });
    setNoteForm(null);
  }

  async function triggerIndex() {
    setIndexing(true);
    try {
      const result: { queued: number } = await api.post('/brain/index', {});
      qc.invalidateQueries({ queryKey: ['brain-notes'] });
      qc.invalidateQueries({ queryKey: ['brain-synapses'] });
      if (result.queued > 0) {
        // Wait a bit for background processing then refresh again
        setTimeout(() => {
          qc.invalidateQueries({ queryKey: ['brain-notes'] });
          qc.invalidateQueries({ queryKey: ['brain-synapses'] });
        }, 8000);
      }
    } catch { /* ignore */ } finally {
      setIndexing(false);
    }
  }

  // ── Gmail handlers ────────────────────────────────────────────────────────────

  async function openEmail(msg: GmailMessage) {
    setSelectedEmail(msg);
    if (!msg.isRead) {
      await api.patch(`/gmail/read/${msg.id}`, {});
      qc.invalidateQueries({ queryKey: ['gmail-inbox'] });
      qc.invalidateQueries({ queryKey: ['gmail-unread'] });
    }
  }

  async function sendCompose(e: React.FormEvent) {
    e.preventDefault();
    setComposeSending(true);
    try {
      await api.post('/gmail/send', composeData);
      setComposeOpen(false);
      setComposeData({ to: '', subject: '', body: '' });
      qc.invalidateQueries({ queryKey: ['gmail-contacts'] });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al enviar');
    } finally {
      setComposeSending(false);
    }
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEmail) return;
    setReplySending(true);
    try {
      await api.post(`/gmail/reply/${selectedEmail.threadId}`, {
        originalMessageId: selectedEmail.id,
        to: selectedEmail.from.match(/<(.+)>/)?.[1] ?? selectedEmail.from,
        subject: selectedEmail.subject,
        body: replyBody,
      });
      setReplyOpen(false);
      setReplyBody('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al responder');
    } finally {
      setReplySending(false);
    }
  }

  async function aiDraftReply() {
    if (!selectedEmail) return;
    setAiDrafting(true);
    try {
      const result: { reply: string } = await api.post('/brain/chat', {
        message: `Redacta una respuesta profesional y amable en español para este email de ${selectedEmail.from} con asunto "${selectedEmail.subject}":\n\n${selectedEmail.body.slice(0, 800)}`,
        conversationId: undefined,
      });
      setReplyBody(result.reply);
      setReplyOpen(true);
    } catch { /* ignore */ } finally {
      setAiDrafting(false);
    }
  }

  async function aiDraftCompose() {
    setAiDrafting(true);
    try {
      const result: { reply: string } = await api.post('/brain/chat', {
        message: 'Redacta un email profesional en español sobre fisioterapia veterinaria para enviar a un tutor/veterinario. Devuelve solo el cuerpo del mensaje, sin saludos ni despedidas.',
        conversationId: undefined,
      });
      setComposeData(d => ({ ...d, body: result.reply }));
    } catch { /* ignore */ } finally {
      setAiDrafting(false);
    }
  }

  const handleNodeClick = useCallback((node: object) => {
    const n = node as GraphNode;
    setSelectedNode(n);
    setGraphRightTab('node');
  }, []);

  const handleNodeDragEnd = useCallback((node: object) => {
    const n = node as any;
    if (n.x == null) return;
    // Pin at dropped position so it doesn't snap back
    n.fx = n.x;
    n.fy = n.y ?? 0;
    n.fz = n.z ?? 0;
    api.patch(`/brain/nodes/${n.id}/position`, { x: n.x, y: n.y ?? 0, z: n.z ?? 0 }).catch(console.error);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full">
      {/* Top header */}
      <div className={`flex items-center justify-between px-4 md:px-6 py-3 border-b flex-shrink-0 ${view === 'graph' ? 'bg-[#0d1420] border-green-900/30' : 'bg-white border-navy-100'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${view === 'graph' ? 'bg-green-900/40' : 'bg-gradient-to-br from-navy-700 to-teal-500'}`}>
            <Brain size={16} className={view === 'graph' ? 'text-green-400' : 'text-white'} />
          </div>
          <div>
            <h1 className={`font-bold text-sm ${view === 'graph' ? 'text-green-400' : 'text-navy-700'}`}>Cerebro FISIOCAN</h1>
            <p className={`text-xs ${view === 'graph' ? 'text-green-700' : 'text-navy-400'}`}>
              {notes.length} nodo{notes.length !== 1 ? 's' : ''} · {synapses.length} sinapsis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {view === 'graph' && (
            <button
              onClick={triggerIndex}
              disabled={indexing}
              title="Indexar conversaciones y detectar conexiones nuevas"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-green-500 hover:bg-green-900/20 transition-colors border border-green-900/30"
            >
              <RefreshCw size={11} className={indexing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          )}
          {view === 'gmail' && (
            <button
              onClick={() => refetchInbox()}
              title="Actualizar bandeja"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-navy-400 hover:bg-navy-50 transition-colors border border-navy-100"
            >
              <RefreshCw size={11} className={inboxLoading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          )}
          <div className="flex items-center gap-1 bg-navy-50 rounded-xl p-1">
            <button onClick={() => setView('chat')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === 'chat' ? 'bg-white shadow-sm text-navy-700' : 'text-navy-400 hover:text-navy-600'}`}>
              Chat
            </button>
            <button onClick={() => setView('graph')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === 'graph' ? 'bg-white shadow-sm text-navy-700' : 'text-navy-400 hover:text-navy-600'}`}>
              <Network size={12} /> Grafo 3D
            </button>
            <button onClick={() => setView('gmail')} className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === 'gmail' ? 'bg-white shadow-sm text-navy-700' : 'text-navy-400 hover:text-navy-600'}`}>
              <Mail size={12} /> Gmail
              {(gmailUnread?.count ?? 0) > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full px-0.5 leading-none">
                  {gmailUnread!.count > 99 ? '99+' : gmailUnread!.count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── CHAT VIEW ── */}
      {view === 'chat' && (
        <div className="flex flex-1 min-h-0">
          {showSidebar && (
            <div className="md:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setShowSidebar(false)} />
          )}

          {/* Left sidebar */}
          <aside className={`
            fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white border-r border-navy-100 flex flex-col
            transform transition-transform duration-200 md:translate-x-0
            ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex items-center border-b border-navy-100 flex-shrink-0">
              <button onClick={() => setSidebarTab('chats')} className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${sidebarTab === 'chats' ? 'text-navy-700 border-b-2 border-teal-500' : 'text-navy-400 hover:text-navy-600'}`}>
                <MessageSquare size={12} /> Chats
              </button>
              <button onClick={() => setSidebarTab('notes')} className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${sidebarTab === 'notes' ? 'text-navy-700 border-b-2 border-teal-500' : 'text-navy-400 hover:text-navy-600'}`}>
                <BookOpen size={12} /> Conocimiento
              </button>
              <button onClick={() => setShowSidebar(false)} className="md:hidden p-2 mr-1 text-navy-400 hover:text-navy-600">
                <X size={16} />
              </button>
            </div>

            {sidebarTab === 'chats' && (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="px-3 pt-3 pb-2 flex-shrink-0">
                  <button onClick={() => createConv.mutate()} disabled={createConv.isPending} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-navy-200 text-xs text-navy-400 hover:border-teal-300 hover:text-teal-600 transition-colors">
                    <Plus size={13} /> Nueva conversación
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
                  {conversations.length === 0 && !convsLoading && (
                    <p className="text-xs text-navy-300 text-center py-6">Sin conversaciones. Crea una para empezar.</p>
                  )}
                  {conversations.map(conv => (
                    <button key={conv.id} onClick={() => { setSelectedConvId(conv.id); setShowSidebar(false); }}
                      className={`w-full text-left p-3 rounded-xl transition-colors group relative ${selectedConvId === conv.id ? 'bg-teal-50 border border-teal-100' : 'hover:bg-navy-50 border border-transparent'}`}>
                      <div className="flex items-start gap-1 pr-5">
                        <p className={`text-xs font-medium leading-tight flex-1 ${selectedConvId === conv.id ? 'text-teal-700' : 'text-navy-700'}`}>{conv.title}</p>
                      </div>
                      {conv.messages[0] && (
                        <p className="text-[10px] text-navy-400 mt-1 truncate">{conv.messages[0].content.slice(0, 55)}</p>
                      )}
                      <p className="text-[10px] text-navy-300 mt-0.5">{format(new Date(conv.createdAt), "d MMM · HH:mm", { locale: es })}</p>
                      <button onClick={e => { e.stopPropagation(); deleteConv.mutate(conv.id); }}
                        className="absolute top-2.5 right-2 opacity-0 group-hover:opacity-100 p-0.5 text-navy-300 hover:text-red-400 transition-all">
                        <Trash2 size={11} />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sidebarTab === 'notes' && (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="px-3 pt-3 pb-2 flex-shrink-0">
                  <button onClick={() => setNoteForm({ title: '', content: '', tags: '' })}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-navy-200 text-xs text-navy-400 hover:border-teal-300 hover:text-teal-600 transition-colors">
                    <Plus size={13} /> Nueva nota
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
                  {notes.length === 0 && (
                    <p className="text-xs text-navy-300 text-center py-6">Añade notas para enriquecer al Cerebro con tu experiencia clínica.</p>
                  )}
                  {notes.map(note => (
                    <div key={note.id} className="p-3 rounded-xl border border-navy-100 hover:border-teal-200 transition-colors group">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: originColor(note.originType) }} />
                          <p className="font-medium text-navy-700 text-xs leading-tight truncate">{note.title}</p>
                        </div>
                        <button onClick={() => deleteNote.mutate(note.id)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-navy-300 hover:text-red-400 transition-all flex-shrink-0">
                          <Trash2 size={11} />
                        </button>
                      </div>
                      <p className="text-[10px] text-navy-400 mt-1 line-clamp-2">{note.content}</p>
                      {note.tags && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {note.tags.split(',').filter(Boolean).map(t => (
                            <span key={t} className="text-[10px] bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded-md">{t.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main chat */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-4 md:px-6 py-3 border-b border-navy-100 bg-white flex items-center justify-between flex-shrink-0">
              <button onClick={() => setShowSidebar(s => !s)} className="btn-ghost text-xs gap-1.5">
                {sidebarTab === 'chats'
                  ? <><MessageSquare size={14} /><span className="hidden md:inline">Chats ({conversations.length})</span></>
                  : <><BookOpen size={14} /><span className="hidden md:inline">Notas ({notes.length})</span></>
                }
              </button>
              {messages.length > 0 && selectedConvId && (
                <button onClick={() => clearChat.mutate()} className="btn-ghost text-xs gap-1.5 text-navy-400">
                  <Trash2 size={14} /> Limpiar
                </button>
              )}
            </div>

            {!selectedConvId && !convsLoading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-100 to-teal-100 flex items-center justify-center mb-4">
                  <Brain size={32} className="text-teal-500" />
                </div>
                <h2 className="font-bold text-navy-700 text-lg mb-2">Hola, soy el Cerebro de FISIOCAN</h2>
                <p className="text-navy-400 text-sm max-w-sm mb-6">Estoy especializado en fisioterapia veterinaria. Puedo ayudarte con diagnósticos, tratamientos, crear citas y planes terapéuticos.</p>
                <button onClick={() => createConv.mutate()} className="btn-primary">
                  <Plus size={16} /> Nueva conversación
                </button>
              </div>
            )}

            {selectedConvId && (
              <>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10">
                      <p className="text-navy-400 text-sm max-w-sm mb-4">Conversación nueva. Escribe tu pregunta sobre fisioterapia, o pídeme crear una cita o plan terapéutico.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                        {[
                          '¿Qué ejercicios recomiendas para recuperación post-TPLO?',
                          '¿Cómo evalúo el dolor en un perro con artrosis?',
                          'Crea una cita para mañana a las 10:00',
                          'Guarda un protocolo de hidroterapia en la base de conocimiento',
                        ].map(q => (
                          <button key={q} onClick={() => setInput(q)}
                            className="text-left text-xs p-3 rounded-xl border border-navy-100 hover:border-teal-200 hover:bg-teal-50 transition-colors text-navy-600">
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-navy-700 to-teal-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                          <Brain size={14} className="text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] md:max-w-2xl px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-navy-700 text-white rounded-br-sm' : 'bg-white border border-navy-100 text-navy-700 rounded-bl-sm shadow-sm'}`}>
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                        <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-navy-300' : 'text-navy-400'}`}>
                          {format(new Date(msg.createdAt), "d MMM · HH:mm", { locale: es })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {sending && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-navy-700 to-teal-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                        <Brain size={14} className="text-white" />
                      </div>
                      <div className="bg-white border border-navy-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin text-teal-500" />
                        <span className="text-sm text-navy-400">Pensando…</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} className="px-4 md:px-6 py-4 border-t border-navy-100 bg-white flex gap-2 items-center flex-shrink-0">
                  <button
                    type="button"
                    onClick={toggleMic}
                    disabled={micState === 'transcribing' || sending}
                    title={micState === 'recording' ? 'Detener grabación' : 'Grabar mensaje de voz'}
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
                    placeholder={micState === 'recording' ? 'Grabando…' : micState === 'transcribing' ? 'Transcribiendo…' : 'Pregunta, crea una cita, un plan terapéutico…'}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={sending || micState !== 'idle'}
                  />
                  <button type="submit" disabled={!input.trim() || sending || micState !== 'idle'} className="btn-primary px-4 min-h-[44px]">
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── GRAPH VIEW ── */}
      {view === 'graph' && (
        <div className="flex flex-1 min-h-0 bg-[#070b14]">
          <div ref={graphContainerRef} className="flex-1 relative overflow-hidden">
            {/* Search bar */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#0d1420]/90 border border-green-900/40 rounded-xl px-3 py-2 backdrop-blur-sm">
                <Search size={12} className="text-green-600 flex-shrink-0" />
                <input
                  className="bg-transparent text-xs text-green-300 placeholder-green-800 outline-none w-44"
                  placeholder="Buscar concepto…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-green-700 hover:text-green-400">
                    <X size={10} />
                  </button>
                )}
              </div>
              {searchQuery && (
                <span className="text-xs text-green-600 bg-[#0d1420]/90 px-2 py-1.5 rounded-xl border border-green-900/30">
                  {highlightNodeIds.size} encontrado{highlightNodeIds.size !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Network size={48} className="text-green-800 mb-4" />
                <p className="text-green-600 text-sm mb-3">Sin nodos. Añade notas en la pestaña Chat para ver el grafo.</p>
                <p className="text-green-800 text-xs">O pulsa "Actualizar" para indexar las conversaciones automáticamente.</p>
              </div>
            ) : (
              <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 size={24} className="animate-spin text-green-500" /></div>}>
                <ForceGraph3D
                  ref={fgRef}
                  width={graphSize.width}
                  height={graphSize.height}
                  graphData={graphData}
                  nodeLabel={(node) => (node as GraphNode).name}
                  nodeColor={(node) => {
                    const n = node as GraphNode;
                    if (searchQuery.trim()) {
                      return highlightNodeIds.has(n.id) ? '#ffffff' : originColor(n.originType) + '22';
                    }
                    return originColor(n.originType);
                  }}
                  nodeVal={(node) => {
                    const n = node as GraphNode;
                    if (searchQuery.trim() && highlightNodeIds.has(n.id)) return (n.val ?? 4) * 2;
                    return n.val ?? 4;
                  }}
                  nodeOpacity={0.92}
                  linkColor={(link) => {
                    const l = link as GraphLink;
                    const opacity = Math.min(0.75, 0.1 + l.strength * 0.65);
                    return `rgba(0,255,136,${opacity})`;
                  }}
                  linkWidth={(link) => {
                    const l = link as GraphLink;
                    return Math.max(0.3, Math.min(3.5, l.strength * 2.5));
                  }}
                  linkDirectionalParticles={(link) => {
                    const l = link as GraphLink;
                    return Math.max(1, Math.min(6, l.count));
                  }}
                  linkDirectionalParticleColor={(link) => {
                    const l = link as GraphLink;
                    const opacity = Math.min(0.9, 0.4 + l.strength * 0.5);
                    return `rgba(0,255,136,${opacity})`;
                  }}
                  linkDirectionalParticleWidth={(link) => {
                    const l = link as GraphLink;
                    return Math.max(0.8, Math.min(2.5, l.strength * 2));
                  }}
                  linkDirectionalParticleSpeed={0.004}
                  backgroundColor="#070b14"
                  // Liquid suspension physics: moderate friction prevents slingshot, slow alpha decay = floaty
                  d3VelocityDecay={0.2}
                  d3AlphaDecay={0.008}
                  warmupTicks={0}
                  cooldownTime={8000}
                  onNodeClick={handleNodeClick}
                  onNodeDragEnd={handleNodeDragEnd}
                />
              </Suspense>
            )}

            {/* Origin legend */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              {([
                ['manual', 'Nota manual'],
                ['conversation', 'Práctica clínica'],
                ['base', 'Conocimiento base'],
                ['file', 'Archivo'],
              ] as [string, string][]).map(([type, label]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: originColor(type) }} />
                  <span className="text-[10px] text-green-400/60 font-mono">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="w-64 bg-[#0d1420] border-l border-green-900/20 flex flex-col flex-shrink-0">
            <div className="flex border-b border-green-900/20">
              {(['stats', 'node'] as const).map(tab => (
                <button key={tab} onClick={() => setGraphRightTab(tab)}
                  className={`flex-1 py-3 text-xs font-medium transition-colors ${graphRightTab === tab ? 'text-green-400 border-b-2 border-green-400' : 'text-green-700 hover:text-green-500'}`}>
                  {tab === 'stats' ? 'Estadísticas' : 'Nodo'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {graphRightTab === 'stats' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-900/20 border border-green-900/30 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-green-400">{graphData.nodes.length}</div>
                      <div className="text-xs text-green-700">Nodos</div>
                    </div>
                    <div className="bg-green-900/20 border border-green-900/30 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-green-400">{graphData.links.length}</div>
                      <div className="text-xs text-green-700">Sinapsis</div>
                    </div>
                  </div>

                  {/* Origin breakdown */}
                  {['manual', 'conversation', 'base', 'file'].map(type => {
                    const cnt = notes.filter(n => n.originType === type).length;
                    if (cnt === 0) return null;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: originColor(type) }} />
                          <span className="text-xs text-green-600">{originLabel(type)}</span>
                        </div>
                        <span className="text-xs text-green-500 font-medium">{cnt}</span>
                      </div>
                    );
                  })}

                  {tagStats.length > 0 && (
                    <div>
                      <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-2">Por etiqueta</p>
                      <div className="space-y-2">
                        {tagStats.slice(0, 6).map(({ tag, count, pct }) => (
                          <div key={tag}>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs text-green-300">{tag}</span>
                              <span className="text-xs text-green-600">{count}</span>
                            </div>
                            <div className="h-0.5 bg-green-900/30 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct * 100}%`, backgroundColor: '#22c55e' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-2">Controles 3D</p>
                    <div className="space-y-1 text-xs text-green-700">
                      <p>Arrastrar fondo → rotar</p>
                      <p>Scroll → zoom</p>
                      <p>Click nodo → ver detalle</p>
                      <p>Arrastrar nodo → fijar posición</p>
                    </div>
                  </div>

                  <button
                    onClick={() => { setView('chat'); setSidebarTab('notes'); setNoteForm({ title: '', content: '', tags: '' }); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-green-900/30 text-xs text-green-500 hover:bg-green-900/20 transition-colors">
                    <Plus size={14} /> Añadir nodo
                  </button>
                </>
              )}

              {graphRightTab === 'node' && (
                selectedNode ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: originColor(selectedNode.originType) }} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-green-300 text-sm leading-tight">{selectedNode.name}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full mt-1 inline-block"
                            style={{ backgroundColor: originColor(selectedNode.originType) + '22', color: originColor(selectedNode.originType) }}>
                            {originLabel(selectedNode.originType)}
                          </span>
                        </div>
                      </div>
                      {selectedNode.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {selectedNode.tags.map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full border text-green-400 border-green-900/40">{t}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-green-600 leading-relaxed whitespace-pre-wrap line-clamp-5">{selectedNode.content}</p>
                    </div>

                    {/* Connected nodes */}
                    {connectedNodes.length > 0 && (
                      <div>
                        <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-2">
                          <Link2 size={10} className="inline mr-1" />
                          {connectedNodes.length} sinapsis
                        </p>
                        <div className="space-y-1.5">
                          {connectedNodes.slice(0, 6).map(({ note, count, strength }) => (
                            <button
                              key={note.id}
                              onClick={() => {
                                const gn = graphData.nodes.find(n => n.id === note.id);
                                if (gn) { setSelectedNode(gn); }
                              }}
                              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-green-900/20 transition-colors text-left group"
                            >
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: originColor(note.originType) }} />
                              <span className="flex-1 text-[11px] text-green-400 truncate group-hover:text-green-300">{note.title}</span>
                              <span className="text-[10px] text-green-800 flex-shrink-0"
                                title={`Fuerza: ${(strength * 100).toFixed(0)}% · Mencionados juntos ${count}×`}>
                                {count}×
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setNoteForm({ title: '', content: '', tags: selectedNode.tags.join(', '), linkedNodeId: selectedNode.id });
                          setView('chat');
                          setSidebarTab('notes');
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-green-900/30 text-xs text-green-500 hover:bg-green-900/20 transition-colors">
                        <Plus size={12} /> Añadir nota a este nodo
                      </button>
                      <button
                        onClick={() => { setSelectedNode(null); setGraphRightTab('stats'); }}
                        className="w-full text-xs text-green-800 hover:text-green-600 transition-colors py-1">
                        ← Volver
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-green-700">Haz clic en un nodo del grafo para ver su detalle y conexiones.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── GMAIL VIEW ── */}
      {view === 'gmail' && (
        <div className="flex flex-1 min-h-0">
          {/* Inbox list */}
          <div className={`${selectedEmail ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 border-r border-navy-100 flex-shrink-0`}>
            {/* Compose button */}
            <div className="px-3 py-3 border-b border-navy-100 flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => { setComposeData({ to: '', subject: '', body: '' }); setComposeOpen(true); }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-navy-700 text-white text-xs font-medium hover:bg-navy-600 transition-colors"
              >
                <PenSquare size={13} /> Redactar
              </button>
              <span className="text-xs text-navy-400">{gmailInbox?.unread ?? 0} sin leer</span>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto divide-y divide-navy-50">
              {inboxLoading && (
                <div className="flex items-center justify-center py-10">
                  <Loader2 size={20} className="animate-spin text-navy-300" />
                </div>
              )}
              {!inboxLoading && !gmailInbox && (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <Mail size={32} className="text-navy-200 mb-3" />
                  <p className="text-sm text-navy-400 font-medium mb-1">Gmail no configurado</p>
                  <p className="text-xs text-navy-300">Añade GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET y GOOGLE_REFRESH_TOKEN en las variables de entorno.</p>
                </div>
              )}
              {gmailInbox?.messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => openEmail(msg)}
                  className={`w-full text-left px-4 py-3 hover:bg-navy-50 transition-colors ${selectedEmail?.id === msg.id ? 'bg-teal-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {!msg.isRead && <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-0.5" />}
                      {msg.isRead && <div className="w-2 h-2 flex-shrink-0" />}
                      <p className={`text-xs truncate ${!msg.isRead ? 'font-semibold text-navy-800' : 'text-navy-600'}`}>
                        {msg.from.replace(/<.*>/, '').trim() || msg.from}
                      </p>
                    </div>
                    <p className="text-[10px] text-navy-400 flex-shrink-0">{
                      (() => { try { return format(new Date(msg.date), 'd MMM', { locale: es }); } catch { return ''; } })()
                    }</p>
                  </div>
                  <p className={`text-xs mt-0.5 truncate pl-4 ${!msg.isRead ? 'font-medium text-navy-700' : 'text-navy-500'}`}>{msg.subject || '(Sin asunto)'}</p>
                  <p className="text-[11px] text-navy-400 mt-0.5 truncate pl-4">{msg.snippet}</p>
                </button>
              ))}
              {gmailInbox?.messages.length === 0 && !inboxLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Inbox size={28} className="text-navy-200 mb-2" />
                  <p className="text-sm text-navy-400">Bandeja de entrada vacía</p>
                </div>
              )}
            </div>

            {/* Contacts footer */}
            {gmailContacts.length > 0 && (
              <div className="border-t border-navy-100 px-4 py-3 flex-shrink-0">
                <p className="text-[10px] font-semibold text-navy-400 uppercase tracking-wider mb-2">Contactos recientes</p>
                <div className="space-y-1">
                  {gmailContacts.slice(0, 3).map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setComposeData({ to: c.email, subject: '', body: '' }); setComposeOpen(true); }}
                      className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                        <User size={11} className="text-navy-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-navy-700 truncate">{c.name || c.email}</p>
                        {c.name && <p className="text-[10px] text-navy-400 truncate">{c.email}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Email detail */}
          {selectedEmail ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Email header */}
              <div className="px-4 md:px-6 py-4 border-b border-navy-100 bg-white flex-shrink-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <button onClick={() => setSelectedEmail(null)} className="md:hidden btn-ghost text-xs gap-1 flex-shrink-0">
                    <ChevronLeft size={14} /> Volver
                  </button>
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={aiDraftReply}
                      disabled={aiDrafting}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-teal-200 text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      {aiDrafting ? <Loader2 size={12} className="animate-spin" /> : <Brain size={12} />}
                      Borrador IA
                    </button>
                    <button
                      onClick={() => setReplyOpen(r => !r)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-navy-700 text-white hover:bg-navy-600 transition-colors"
                    >
                      <Reply size={12} /> Responder
                    </button>
                  </div>
                </div>
                <h2 className="font-semibold text-navy-800 text-sm leading-tight mb-1">{selectedEmail.subject || '(Sin asunto)'}</h2>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-navy-500">{selectedEmail.from}</p>
                  <p className="text-xs text-navy-400 flex-shrink-0">{
                    (() => { try { return format(new Date(selectedEmail.date), "d MMM yyyy · HH:mm", { locale: es }); } catch { return selectedEmail.date; } })()
                  }</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
                <pre className="text-sm text-navy-700 whitespace-pre-wrap font-sans leading-relaxed">{selectedEmail.body || selectedEmail.snippet}</pre>
              </div>

              {/* Reply box */}
              {replyOpen && (
                <div className="border-t border-navy-100 px-4 md:px-6 py-4 bg-white flex-shrink-0">
                  <form onSubmit={sendReply} className="space-y-2">
                    <textarea
                      className="input resize-none w-full"
                      rows={4}
                      placeholder="Escribe tu respuesta…"
                      value={replyBody}
                      onChange={e => setReplyBody(e.target.value)}
                      required
                    />
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={() => setReplyOpen(false)} className="btn-ghost text-xs">Cancelar</button>
                      <button type="submit" disabled={replySending || !replyBody.trim()} className="btn-primary text-xs gap-1.5">
                        {replySending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-center">
              <div>
                <Mail size={40} className="text-navy-200 mx-auto mb-3" />
                <p className="text-sm text-navy-400">Selecciona un email para leerlo</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compose modal */}
      {composeOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4" onClick={() => setComposeOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
              <h2 className="font-bold text-navy-700 text-sm">Nuevo email</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={aiDraftCompose}
                  disabled={aiDrafting}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs border border-teal-200 text-teal-600 hover:bg-teal-50 transition-colors"
                >
                  {aiDrafting ? <Loader2 size={11} className="animate-spin" /> : <Brain size={11} />}
                  Borrador IA
                </button>
                <button onClick={() => setComposeOpen(false)} className="text-navy-400 hover:text-navy-600"><X size={18} /></button>
              </div>
            </div>
            <form onSubmit={sendCompose} className="p-5 space-y-3">
              <div>
                <label className="label">Para *</label>
                <input
                  className="input"
                  type="email"
                  placeholder="email@ejemplo.com"
                  value={composeData.to}
                  onChange={e => setComposeData(d => ({ ...d, to: e.target.value }))}
                  required
                  list="gmail-contacts-list"
                />
                <datalist id="gmail-contacts-list">
                  {gmailContacts.map(c => <option key={c.id} value={c.email}>{c.name}</option>)}
                </datalist>
              </div>
              <div>
                <label className="label">Asunto *</label>
                <input
                  className="input"
                  placeholder="Asunto del email"
                  value={composeData.subject}
                  onChange={e => setComposeData(d => ({ ...d, subject: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="label">Mensaje *</label>
                <textarea
                  className="input resize-none"
                  rows={7}
                  placeholder="Escribe tu mensaje…"
                  value={composeData.body}
                  onChange={e => setComposeData(d => ({ ...d, body: e.target.value }))}
                  required
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setComposeOpen(false)} className="btn-ghost flex-1 justify-center text-xs">Cancelar</button>
                <button type="submit" disabled={composeSending} className="btn-primary flex-1 justify-center text-xs gap-1.5">
                  {composeSending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add note modal ── */}
      {noteForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setNoteForm(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-navy-700 mb-1">Nueva nota de conocimiento</h2>
            {noteForm.linkedNodeId && (
              <p className="text-xs text-teal-600 mb-3 flex items-center gap-1">
                <Link2 size={11} /> Vinculada al nodo seleccionado
              </p>
            )}
            <form onSubmit={saveNote} className="space-y-3 mt-3">
              <div>
                <label className="label">Título *</label>
                <input className="input" value={noteForm.title} onChange={e => setNoteForm(n => n && ({ ...n, title: e.target.value }))} required placeholder="Ej: Protocolo post-TPLO" />
              </div>
              <div>
                <label className="label">Contenido *</label>
                <textarea className="input resize-none" rows={6} value={noteForm.content} onChange={e => setNoteForm(n => n && ({ ...n, content: e.target.value }))} required placeholder="Escribe tu protocolo, observación o conocimiento clínico…" />
              </div>
              <div>
                <label className="label">Etiquetas (separadas por coma)</label>
                <input className="input" value={noteForm.tags} onChange={e => setNoteForm(n => n && ({ ...n, tags: e.target.value }))} placeholder="ej: rehabilitación, perro, rodilla" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setNoteForm(null)} className="btn-ghost flex-1 justify-center">Cancelar</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Guardar nota</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
