import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LayoutDashboard, PawPrint, Users, CalendarDays, Dumbbell, MessageSquare, LogOut, FileText, Menu, X, Hospital, Brain } from 'lucide-react';
import { clearAuth, getStoredUser } from '../lib/auth';
import { api } from '../lib/api';
const logoUrl = '/logo.png';

const STORAGE_KEY = 'fisiocan_last_msg_ids';

interface TutorConversation {
  id: number; name: string; phone: string;
  messages: Array<{ id: number; body: string; createdAt: string; fromTutor: boolean }>;
  _count: { patients: number };
}

interface Toast {
  key: string;
  tutorId: number;
  tutorName: string;
  body: string;
}

const navItems = [
  { to: '/dashboard',    label: 'Panel',      icon: LayoutDashboard },
  { to: '/patients',     label: 'Pacientes',  icon: PawPrint },
  { to: '/tutors',       label: 'Tutores',    icon: Users },
  { to: '/appointments', label: 'Citas',      icon: CalendarDays },
  { to: '/plans',        label: 'Planes',     icon: FileText },
  { to: '/routines',     label: 'Ejercicios', icon: Dumbbell },
  { to: '/chat',         label: 'Chat',       icon: MessageSquare },
  { to: '/clinic',       label: 'Clínica',    icon: Hospital },
  { to: '/brain',        label: 'Cerebro',    icon: Brain },
];

function loadLastSeen(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); } catch { return {}; }
}
function saveLastSeen(data: Record<string, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const [open, setOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const initialized = useRef(false);

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

  const totalUnread = unreadCounts.reduce((sum, u) => sum + u._count.id, 0);

  // Toast notifications for new tutor messages
  useEffect(() => {
    if (!conversations.length) return;
    const lastSeen = loadLastSeen();

    if (!initialized.current) {
      conversations.forEach(c => {
        const last = c.messages[0];
        if (last && !(String(c.id) in lastSeen)) lastSeen[String(c.id)] = last.id;
      });
      saveLastSeen(lastSeen);
      initialized.current = true;
      return;
    }

    const updated = { ...lastSeen };
    const newToasts: Toast[] = [];

    conversations.forEach(c => {
      const last = c.messages[0];
      if (!last || !last.fromTutor) return;
      const seenId = updated[String(c.id)] ?? 0;
      if (last.id > seenId) {
        const isViewingThisChat = location.pathname === `/chat/${c.id}`;
        if (!isViewingThisChat) {
          newToasts.push({ key: `${c.id}-${last.id}`, tutorId: c.id, tutorName: c.name, body: last.body });
        }
        updated[String(c.id)] = last.id;
      }
    });

    if (newToasts.length > 0) {
      saveLastSeen(updated);
      setToasts(prev => {
        const existingKeys = new Set(prev.map(t => t.key));
        return [...prev, ...newToasts.filter(t => !existingKeys.has(t.key))];
      });
    }
  }, [conversations, location.pathname]);

  // Dismiss toasts when opening that chat
  useEffect(() => {
    const match = location.pathname.match(/^\/chat\/(\d+)$/);
    if (!match) return;
    setToasts(prev => prev.filter(t => String(t.tutorId) !== match[1]));
  }, [location.pathname]);

  function dismiss(key: string) {
    setToasts(prev => prev.filter(t => t.key !== key));
  }

  function logout() { clearAuth(); navigate('/login'); }
  function close() { setOpen(false); }

  return (
    <div className="flex h-screen bg-cream">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-navy-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="FISIOCAN" className="h-8 w-8 rounded-lg object-contain bg-white p-0.5" />
          <span className="text-white font-bold text-base">FISIOCAN</span>
        </div>
        <button onClick={() => setOpen(true)} className="text-white p-1 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={close} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50 w-64 bg-navy-700 flex flex-col
        transform transition-transform duration-200 md:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-navy-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="FISIOCAN" className="h-10 w-10 rounded-xl object-contain bg-white p-0.5 flex-shrink-0" />
            <div>
              <div className="text-white font-bold text-lg leading-tight">FISIOCAN</div>
              <div className="text-navy-300 text-xs">Panel de clínica</div>
            </div>
          </div>
          <button onClick={close} className="md:hidden text-navy-300 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-teal-400 text-white' : 'text-navy-200 hover:bg-navy-600 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
              {to === '/chat' && totalUnread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {totalUnread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-2">
          <a
            href="/portal"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-navy-400 hover:text-navy-200 hover:bg-navy-600 transition-colors"
          >
            <PawPrint size={14} /> Portal clientes →
          </a>
        </div>

        <div className="p-4 border-t border-navy-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{user?.name}</div>
              <div className="text-navy-300 text-xs truncate">{user?.email}</div>
            </div>
            <button onClick={logout} className="p-2 text-navy-300 hover:text-white transition-colors rounded-lg hover:bg-navy-600 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <Outlet />
      </main>

      {/* Toast notifications */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <ToastItem
            key={toast.key}
            toast={toast}
            onDismiss={() => dismiss(toast.key)}
            onOpen={() => { dismiss(toast.key); navigate(`/chat/${toast.tutorId}`); close(); }}
          />
        ))}
      </div>
    </div>
  );
}

function ToastItem({ toast, onDismiss, onOpen }: { toast: Toast; onDismiss: () => void; onOpen: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="pointer-events-auto bg-white rounded-2xl shadow-xl border border-navy-100 overflow-hidden animate-slide-in">
      <div className="bg-navy-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-teal-300" />
          <span className="text-white text-xs font-semibold">Nuevo mensaje</span>
        </div>
        <button onClick={onDismiss} className="text-navy-300 hover:text-white p-0.5">
          <X size={14} />
        </button>
      </div>
      <div className="p-4">
        <p className="font-semibold text-navy-700 text-sm mb-0.5">{toast.tutorName}</p>
        <p className="text-navy-400 text-sm truncate">{toast.body}</p>
        <button
          onClick={onOpen}
          className="mt-3 w-full bg-teal-400 hover:bg-teal-500 text-white text-sm font-medium rounded-xl py-2 transition-colors"
        >
          Ver mensaje
        </button>
      </div>
    </div>
  );
}
