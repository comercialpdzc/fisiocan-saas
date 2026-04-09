import { useQuery } from '@tanstack/react-query';
import { Dumbbell, ExternalLink, PlayCircle } from 'lucide-react';
import { portalApi } from '../../lib/api';

interface PatientRoutine {
  id: number;
  notes?: string;
  patient: { id: number; name: string };
  routine: { id: number; name: string; description?: string; videoUrl?: string; duration?: number; category?: string };
}

const CAT_COLORS: Record<string, string> = {
  'Movilidad': 'badge-blue',
  'Hidroterapia': 'bg-cyan-100 text-cyan-700 badge',
  'Propiocepción': 'bg-purple-100 text-purple-700 badge',
  'Fortalecimiento': 'bg-orange-100 text-orange-700 badge',
  'Flexibilidad': 'bg-green-100 text-green-700 badge',
  'Masoterapia': 'bg-pink-100 text-pink-700 badge',
};

export default function PortalRoutines() {
  const { data: routines = [], isLoading } = useQuery<PatientRoutine[]>({
    queryKey: ['portal-routines'],
    queryFn: () => portalApi.get('/portal/routines'),
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;

  const byPatient = routines.reduce<Record<string, PatientRoutine[]>>((acc, r) => {
    const key = r.patient.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Ejercicios y rutinas</h1>
        <p className="text-navy-400 text-sm mt-0.5">Rutinas de rehabilitación asignadas por tu fisioterapeuta</p>
      </div>

      {routines.length === 0 && (
        <div className="card text-center py-12">
          <Dumbbell size={40} className="mx-auto mb-3 text-navy-200" />
          <p className="text-navy-300">Sin ejercicios asignados aún</p>
        </div>
      )}

      {Object.entries(byPatient).map(([patientName, pRoutines]) => (
        <div key={patientName} className="mb-8">
          <h2 className="text-sm font-semibold text-navy-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Dumbbell size={14} /> {patientName}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pRoutines.map(pr => (
              <div key={pr.id} className="card">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-navy-700">{pr.routine.name}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {pr.routine.category && (
                      <span className={CAT_COLORS[pr.routine.category] ?? 'badge-gray'}>
                        {pr.routine.category}
                      </span>
                    )}
                    {pr.routine.duration && (
                      <span className="text-xs text-navy-400">{pr.routine.duration} min</span>
                    )}
                  </div>
                </div>
                {pr.routine.description && (
                  <p className="text-sm text-navy-500 mb-3">{pr.routine.description}</p>
                )}
                {pr.notes && (
                  <div className="bg-teal-50 rounded-lg px-3 py-2 text-sm text-teal-700 mb-3">
                    <span className="font-medium">Nota de tu fisio: </span>{pr.notes}
                  </div>
                )}
                {pr.routine.videoUrl ? (
                  <a
                    href={pr.routine.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-navy-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    <PlayCircle size={16} /> Ver vídeo del ejercicio
                  </a>
                ) : (
                  <span className="text-xs text-navy-300">Sin vídeo adjunto</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
