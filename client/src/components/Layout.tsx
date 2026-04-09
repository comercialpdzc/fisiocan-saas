import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Users, CalendarDays, Dumbbell, MessageSquare, LogOut, FileText, Menu, X } from 'lucide-react';
import { clearAuth, getStoredUser } from '../lib/auth';

const navItems = [
  { to: '/dashboard',    label: 'Panel',      icon: LayoutDashboard },
  { to: '/patients',     label: 'Pacientes',  icon: PawPrint },
  { to: '/tutors',       label: 'Tutores',    icon: Users },
  { to: '/appointments', label: 'Citas',      icon: CalendarDays },
  { to: '/plans',        label: 'Planes',     icon: FileText },
  { to: '/routines',     label: 'Ejercicios', icon: Dumbbell },
  { to: '/chat',         label: 'Chat',       icon: MessageSquare },
];

export default function Layout() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [open, setOpen] = useState(false);

  function logout() { clearAuth(); navigate('/login'); }
  function close() { setOpen(false); }

  return (
    <div className="flex h-screen bg-cream">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-navy-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-teal-400 rounded-lg flex items-center justify-center">
            <PawPrint size={15} className="text-white" />
          </div>
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
            <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center">
              <PawPrint size={22} className="text-white" />
            </div>
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
              <Icon size={18} />{label}
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
    </div>
  );
}
