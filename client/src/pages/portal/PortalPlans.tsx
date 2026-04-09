import { useQuery } from '@tanstack/react-query';
import { FileText, Dumbbell, Apple, Pin } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Plan {
  id: number; title: string; type: string; content: string; pinned: boolean;
  createdAt: string; updatedAt: string;
  patient: { id: number; name: string };
  createdBy: { name: string };
}

const TYPE_CONFIG: Record<string, { label: string; icon: React.ElementType; badge: string }> = {
  EXERCISE:  { label: 'Ejercicios',  icon: Dumbbell,  badge: 'bg-orange-100 text-orange-700 badge' },
  NUTRITION: { label: 'Nutrición',   icon: Apple,     badge: 'bg-green-100 text-green-700 badge'  },
  GENERAL:   { label: 'General',     icon: FileText,  badge: 'badge-blue'                          },
};

export default function PortalPlans() {
  const { data: plans = [], isLoading } = useQuery<Plan[]>({
    queryKey: ['portal-plans'],
    queryFn: () => portalApi.get('/portal/plans'),
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;

  const pinned = plans.filter(p => p.pinned);
  const rest   = plans.filter(p => !p.pinned);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Planes de tratamiento</h1>
        <p className="text-navy-400 text-sm mt-0.5">Planes de ejercicio, nutrición y seguimiento enviados por tu fisioterapeuta</p>
      </div>

      {plans.length === 0 && (
        <div className="card text-center py-12">
          <FileText size={40} className="mx-auto mb-3 text-navy-200" />
          <p className="text-navy-300">Sin planes asignados aún</p>
        </div>
      )}

      {pinned.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3 flex items-center gap-1">
            <Pin size={12} /> Fijados
          </h2>
          <div className="space-y-4">
            {pinned.map(plan => <PlanCard key={plan.id} plan={plan} />)}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          {pinned.length > 0 && <h2 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">Todos los planes</h2>}
          <div className="space-y-4">
            {rest.map(plan => <PlanCard key={plan.id} plan={plan} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const cfg = TYPE_CONFIG[plan.type] ?? TYPE_CONFIG.GENERAL;
  const Icon = cfg.icon;

  return (
    <div className={`card ${plan.pinned ? 'border-teal-200 bg-teal-50/30' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${plan.type === 'NUTRITION' ? 'bg-green-100' : plan.type === 'EXERCISE' ? 'bg-orange-100' : 'bg-blue-100'}`}>
            <Icon size={18} className={plan.type === 'NUTRITION' ? 'text-green-600' : plan.type === 'EXERCISE' ? 'text-orange-600' : 'text-blue-600'} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-navy-700">{plan.title}</h3>
              {plan.pinned && <Pin size={12} className="text-teal-500" />}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cfg.badge}>{cfg.label}</span>
              <span className="text-xs text-navy-400">para {plan.patient.name}</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-navy-400 text-right flex-shrink-0">
          <div>{format(new Date(plan.updatedAt), "d MMM yyyy", { locale: es })}</div>
          <div className="text-navy-300">por {plan.createdBy.name}</div>
        </div>
      </div>
      {/* Render content as preformatted text — supports markdown-style line breaks */}
      <div className="text-sm text-navy-600 bg-white rounded-xl p-4 border border-navy-100 whitespace-pre-wrap leading-relaxed">
        {plan.content}
      </div>
    </div>
  );
}
