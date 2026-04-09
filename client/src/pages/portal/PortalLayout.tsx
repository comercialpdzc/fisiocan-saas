import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Dumbbell, FileText, MessageSquare, LogOut, CalendarDays } from 'lucide-react';
import { clearPortalAuth, getPortalUser } from '../../lib/portalAuth';

const navItems = [
  { to: '/portal/dashboard',    label: 'Inicio',     icon: LayoutDashboard },
  { to: '/portal/patients',     label: 'Mis mascotas', icon: PawPrint },
  { to: '/portal/appointments', label: 'Citas',       icon: CalendarDays },
  { to: '/portal/routines',     label: 'Ejercicios', icon: Dumbbell },
  { to: '/portal/plans',        label: 'Planes',     icon: FileText },
  { to: '/portal/chat',         label: 'Mensajes',   icon: MessageSquare },
];

export default function PortalLayout() {
  const navigate = useNavigate();
  const user = getPortalUser();

  function logout() {
    clearPortalAuth();
    navigate('/portal');
  }

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-700 flex flex-col">
        <div className="p-6 border-b border-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center">
              <PawPrint size={22} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">FISIOCAN</div>
              <div className="text-teal-300 text-xs">Portal del propietario</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
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

        <div className="p-4 border-t border-navy-600">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{user?.name}</div>
              <div className="text-navy-300 text-xs truncate">{user?.email}</div>
            </div>
            <button onClick={logout} className="p-2 text-navy-300 hover:text-white transition-colors rounded-lg hover:bg-navy-600">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
