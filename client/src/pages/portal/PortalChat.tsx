import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Send, PawPrint } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Message {
  id: number; body: string; createdAt: string; fromTutor: boolean;
  fisio?: { name: string };
}

export default function PortalChat() {
  const qc = useQueryClient();
  const [text, setText] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['portal-messages'],
    queryFn: () => portalApi.get('/portal/messages'),
    refetchInterval: 15_000,
  });

  const sendMsg = useMutation({
    mutationFn: (body: string) => portalApi.post('/portal/messages', { body }),
    onSuccess: () => { setText(''); qc.invalidateQueries({ queryKey: ['portal-messages'] }); },
  });

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMsg.mutate(text.trim());
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-navy-100 bg-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center">
          <PawPrint size={18} className="text-navy-500" />
        </div>
        <div>
          <div className="font-semibold text-navy-700">María Díaz — FISIOCAN</div>
          <div className="text-xs text-teal-500">Fisioterapeuta veterinaria</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-cream">
        {messages.length === 0 && (
          <div className="text-center py-12 text-navy-300 text-sm">
            <p>Sin mensajes aún.</p>
            <p className="mt-1">¡Escríbele a María cualquier duda sobre el tratamiento!</p>
          </div>
        )}
        {messages.map(msg => {
          const isMine = msg.fromTutor;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              {!isMine && (
                <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center mr-2 flex-shrink-0 self-end">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              )}
              <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                isMine
                  ? 'bg-navy-700 text-white rounded-br-sm'
                  : 'bg-white border border-navy-100 text-navy-700 rounded-bl-sm'
              }`}>
                <p>{msg.body}</p>
                <p className={`text-xs mt-1 ${isMine ? 'text-navy-300' : 'text-navy-400'}`}>
                  {format(new Date(msg.createdAt), "d MMM · HH:mm", { locale: es })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="px-6 py-4 border-t border-navy-100 bg-white flex gap-3">
        <input
          className="input flex-1"
          placeholder="Escribe a tu fisioterapeuta…"
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
        />
        <button type="submit" disabled={!text.trim() || sendMsg.isPending} className="btn-primary px-4">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
