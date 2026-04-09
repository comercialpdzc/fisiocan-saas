import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Users, CalendarDays, Dumbbell, MessageSquare, LogOut } from 'lucide-react';
import { clearAuth, getStoredUser } from '../lib/auth';

const navItems = [
  { to: '/dashboard',    label: 'Panel',      icon: LayoutDashboard },
  { to: '/patients',     label: 'Pacientes',  icon: PawPrint },
  { to: '/tutors',       label: 'Tutores',    icon: Users },
  { to: '/appointments', label: 'Citas',      icon: CalendarDays },
  { to: '/routines',     label: 'Rutinas',    icon: Dumbbell },
  { to: '/chat',         label: 'Chat',       icon: MessageSquare },
];

export default function Layout() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function logout() {
    clearAuth();
    navigate('/login');
  }

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center">
              <PawPrint size={22} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">FISIOCAN</div>
              <div className="text-navy-300 text-xs">Fisioterapia veterinaria</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-400 text-white'
                    : 'text-navy-200 hover:bg-navy-600 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-navy-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{user?.name}</div>
              <div className="text-navy-300 text-xs truncate">{user?.email}</div>
            </div>
            <button onClick={logout} className="p-2 text-navy-300 hover:text-white transition-colors rounded-lg hover:bg-navy-600" title="Cerrar sesión">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
