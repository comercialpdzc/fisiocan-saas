import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageSquare, Send, PawPrint, ArrowLeft } from 'lucide-react';
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

export default function ChatPage() {
  const { tutorId } = useParams<{ tutorId?: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const user = getStoredUser();
  const [text, setText] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  const { data: conversations = [] } = useQuery<TutorConversation[]>({
    queryKey: ['conversations'],
    queryFn: () => api.get('/messages/conversations'),
    refetchInterval: 30_000,
  });

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages', tutorId],
    queryFn: () => api.get(`/messages/tutor/${tutorId}`),
    enabled: !!tutorId,
    refetchInterval: 15_000,
  });

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
      {/* Conversation list — hidden on mobile when a chat is open */}
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
                  <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-navy-500">{c.name[0].toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-navy-700 text-sm truncate">{c.name}</div>
                    {last ? (
                      <div className="text-xs text-navy-400 truncate">{last.fromTutor ? '← ' : ''}{last.body}</div>
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

      {/* Chat area — full screen on mobile when tutorId is set */}
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

          {/* Input */}
          <form onSubmit={handleSend} className="px-4 md:px-6 py-4 border-t border-navy-100 bg-white flex gap-3">
            <input
              className="input flex-1"
              placeholder="Escribe un mensaje…"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button type="submit" disabled={!text.trim() || sendMsg.isPending} className="btn-primary px-4 min-h-[44px]">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
