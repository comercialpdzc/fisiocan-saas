import { useQuery } from '@tanstack/react-query';
import { PawPrint, Dumbbell, FileText } from 'lucide-react';
import { portalApi } from '../../lib/api';

interface PortalMe {
  patients: Array<{
    id: number; name: string; species: string; breed?: string;
    weight?: string; sex?: string; neutered?: string; active: boolean;
    rehabRoutines: Array<{ routine: { name: string; category?: string } }>;
    _count: { plans: number };
    intakeData?: { motivoConsulta?: string; objetivos?: string };
  }>;
}

export default function PortalPatients() {
  const { data: me, isLoading } = useQuery<PortalMe>({
    queryKey: ['portal-me'],
    queryFn: () => portalApi.get('/portal/me'),
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Mis mascotas</h1>
        <p className="text-navy-400 text-sm mt-0.5">Información de cada paciente en tratamiento</p>
      </div>

      <div className="space-y-6">
        {me?.patients.map(p => (
          <div key={p.id} className="card">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <PawPrint size={26} className="text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-navy-700">{p.name}</h2>
                  <span className={p.active ? 'badge-green' : 'badge-gray'}>{p.active ? 'En tratamiento' : 'Inactivo'}</span>
                </div>
                <p className="text-navy-400 mt-0.5">
                  {p.species}{p.breed ? ` · ${p.breed}` : ''}
                  {p.weight ? ` · ${p.weight}` : ''}
                  {p.sex ? ` · ${p.sex}` : ''}
                  {p.neutered ? ` · ${p.neutered === 'Sí' ? 'Esterilizado/a' : 'Sin esterilizar'}` : ''}
                </p>
              </div>
            </div>

            {p.intakeData?.motivoConsulta && (
              <div className="bg-navy-50 rounded-xl p-4 mb-4">
                <div className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">Motivo de consulta</div>
                <p className="text-sm text-navy-700">{p.intakeData.motivoConsulta}</p>
                {p.intakeData.objetivos && (
                  <>
                    <div className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1 mt-3">Objetivos del tratamiento</div>
                    <p className="text-sm text-navy-700">{p.intakeData.objetivos}</p>
                  </>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-teal-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Dumbbell size={14} className="text-teal-600" />
                  <span className="text-xs font-semibold text-teal-700">Ejercicios asignados</span>
                </div>
                {p.rehabRoutines.length === 0
                  ? <p className="text-xs text-teal-600">Sin ejercicios aún</p>
                  : p.rehabRoutines.slice(0, 3).map((pr, i) => (
                    <p key={i} className="text-xs text-teal-700 truncate">· {pr.routine.name}</p>
                  ))
                }
                {p.rehabRoutines.length > 3 && <p className="text-xs text-teal-500">+{p.rehabRoutines.length - 3} más</p>}
              </div>
              <div className="bg-navy-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={14} className="text-navy-500" />
                  <span className="text-xs font-semibold text-navy-600">Planes enviados</span>
                </div>
                <p className="text-2xl font-bold text-navy-700">{p._count.plans}</p>
                <p className="text-xs text-navy-400">{p._count.plans === 1 ? 'plan' : 'planes'}</p>
              </div>
            </div>
          </div>
        ))}
        {me?.patients.length === 0 && (
          <div className="card text-center py-12 text-navy-300">Sin mascotas registradas.</div>
        )}
      </div>
    </div>
  );
}
