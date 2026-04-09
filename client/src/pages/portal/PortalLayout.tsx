import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Dumbbell, FileText, MessageSquare, LogOut, CalendarDays, Menu, X } from 'lucide-react';
import { clearPortalAuth, getPortalUser } from '../../lib/portalAuth';
const logoUrl = '/logo.png';

const navItems = [
  { to: '/portal/dashboard',    label: 'Inicio',       icon: LayoutDashboard },
  { to: '/portal/patients',     label: 'Mis mascotas', icon: PawPrint },
  { to: '/portal/appointments', label: 'Citas',        icon: CalendarDays },
  { to: '/portal/routines',     label: 'Ejercicios',   icon: Dumbbell },
  { to: '/portal/plans',        label: 'Planes',       icon: FileText },
  { to: '/portal/chat',         label: 'Mensajes',     icon: MessageSquare },
];

export default function PortalLayout() {
  const navigate = useNavigate();
  const user = getPortalUser();
  const [open, setOpen] = useState(false);

  function logout() { clearPortalAuth(); navigate('/portal'); }
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
              <div className="text-teal-300 text-xs">Portal del propietario</div>
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
