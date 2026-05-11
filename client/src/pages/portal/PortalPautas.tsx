import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, PawPrint, ExternalLink } from 'lucide-react';
import { portalApi } from '../../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PautaMediaItem { id: number; url: string; caption?: string; }
interface PortalPauta {
  id: number;
  title: string;
  weekRange: string;
  notes?: string;
  createdAt: string;
  patient: { id: number; name: string };
  media: PautaMediaItem[];
}

export default function PortalPautas() {
  const { data: pautas = [], isLoading } = useQuery<PortalPauta[]>({
    queryKey: ['portal-pautas'],
    queryFn: () => portalApi.get('/portal/pautas'),
  });

  if (isLoading) return <div className="p-8 text-navy-400">Cargando…</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Pautas en casa</h1>
        <p className="text-navy-400 text-sm mt-0.5">Guías de rehabilitación domiciliaria preparadas por tu fisioterapeuta</p>
      </div>

      {pautas.length === 0 ? (
        <div className="card flex flex-col items-center py-14 text-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center">
            <BookOpen size={28} className="text-teal-500" />
          </div>
          <div>
            <p className="font-medium text-navy-700">Sin pautas disponibles</p>
            <p className="text-sm text-navy-400 mt-1">
              Tu fisioterapeuta preparará una guía personalizada para cada fase del tratamiento.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {pautas.map(p => (
            <PautaCard key={p.id} pauta={p} />
          ))}
        </div>
      )}
    </div>
  );
}

const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';

async function openPautaHtml(id: number) {
  const token = localStorage.getItem('portal_token');
  const res = await fetch(`${BASE}/portal/pautas/${id}/html`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) { alert('Esta pauta no tiene contenido HTML disponible.'); return; }
  let html = await res.text();
  html = html.replace('</head>', '<style>@page{margin:10mm}#pb,nav{display:none!important}body,main{padding-top:0!important;margin-top:0!important}</style></head>');
  const blob = new Blob([html], { type: 'text/html' });
  window.open(URL.createObjectURL(blob), '_blank');
}

function PautaCard({ pauta }: { pauta: PortalPauta }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="card space-y-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
          <BookOpen size={22} className="text-teal-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy-700">{pauta.title}</h3>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-xs font-medium text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
              {pauta.weekRange}
            </span>
            <span className="flex items-center gap-1 text-xs text-navy-400">
              <PawPrint size={11} /> {pauta.patient.name}
            </span>
            <span className="text-xs text-navy-400">
              {format(new Date(pauta.createdAt), "d MMM yyyy", { locale: es })}
            </span>
          </div>
          {pauta.notes && (
            <p className="text-sm text-navy-500 mt-2 leading-relaxed">{pauta.notes}</p>
          )}
        </div>
        <button
          onClick={() => openPautaHtml(pauta.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold transition-colors shrink-0"
        >
          <ExternalLink size={13} />
          Ver guía
        </button>
      </div>

      {/* Images */}
      {pauta.media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {pauta.media.map(m => (
            <button
              key={m.id}
              onClick={() => setLightbox(m.url)}
              className="aspect-square rounded-xl overflow-hidden bg-navy-50 group relative"
            >
              <img src={m.url} alt={m.caption ?? ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
              {m.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1.5 py-0.5 truncate">
                  {m.caption}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl object-contain" />
        </div>
      )}
    </div>
  );
}
