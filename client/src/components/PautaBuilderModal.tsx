/**
 * PautaBuilderModal – formulario visual para crear pautas domiciliarias
 * con el mismo diseño que la pauta HTML de Dana.
 */
import { useState } from 'react';
import { X, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

interface Pill     { id: string; text: string; color: '' | 'g' | 'o' }
interface GridItem { id: string; title: string; body: string; color: '' | 'b' | 'g' | 'o' | 'r' }
interface Note     { id: string; title: string; body: string; type: '' | 'y' | 'r' }
interface Step     { id: string; text: string }
interface Exercise {
  id: string; name: string; subtitle: string;
  pills: Pill[]; steps: Step[];
  noteBody: string; noteTitle: string; noteType: '' | 'y' | 'r';
}
interface TableRow { id: string; moment: string; activity: string; duration: string; frequency: string }

interface SecInstrucciones { id: string; type: 'instrucciones'; title: string; pills: Pill[]; items: GridItem[]; notes: Note[] }
interface SecEjercicios    { id: string; type: 'ejercicios';    title: string; quote: string; exercises: Exercise[] }
interface SecTabla         { id: string; type: 'tabla';         title: string; rows: TableRow[] }
type Section = SecInstrucciones | SecEjercicios | SecTabla;

interface PautaForm {
  weekRange: string; intro: string;
  sections: Section[];
  closingTag: string; closingTitle: string; closingMsg: string;
}

// ── HTML generator ─────────────────────────────────────────────────────────────
function esc(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function nl2br(s: string): string { return esc(s).replace(/\n/g,'<br/>'); }

const CSS = `<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
:root{--azul:#1B3E6F;--azul-m:#2E75B6;--azul-l:#D6E8F7;--azul-xl:#EBF4FB;--verde:#16a34a;--verde-l:#dcfce7;--rojo:#dc2626;--rojo-l:#fee2e2;--naranja:#ea580c;--naranja-l:#fff7ed;--fg:#0f172a;--fg-2:#475569;--fg-3:#94a3b8;--border:#e2e8f0;--bg:#f1f5f9;--card:#ffffff;--ease:cubic-bezier(.22,1,.36,1);--r:14px;--rs:10px;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--fg);line-height:1.6;overflow-x:hidden;}
#pb{position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,var(--azul),var(--azul-m));z-index:9999;border-radius:0 2px 2px 0;transition:width .08s linear;}
nav{position:fixed;top:2px;left:0;right:0;height:52px;background:rgba(241,245,249,.92);backdrop-filter:blur(14px);border-bottom:1px solid transparent;display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:1000;transition:border-color .3s,box-shadow .3s;}
nav.on{border-color:var(--border);box-shadow:0 1px 16px rgba(15,23,42,.06);}
.logo{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--azul);}
.logo b{color:var(--azul-m);font-weight:400;}
.nav-btns{display:flex;gap:8px;}
.btn{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;font-size:13px;font-weight:500;font-family:inherit;border-radius:7px;cursor:pointer;border:none;text-decoration:none;transition:opacity .2s,transform .2s;}
.btn:hover{opacity:.82;}
.btn-g{background:transparent;border:1px solid var(--border);color:var(--fg-2);}
.btn-s{background:var(--azul);color:#fff;}
.r{opacity:0;transform:translateY(18px);transition:opacity .5s var(--ease),transform .5s var(--ease);}
.r.on{opacity:1;transform:none;}
.r.d1{transition-delay:.06s;}.r.d2{transition-delay:.12s;}.r.d3{transition-delay:.18s;}.r.d4{transition-delay:.24s;}.r.d5{transition-delay:.30s;}
main{padding-top:52px;}
.wrap{max-width:700px;margin:0 auto;padding:0 16px;}
.sec{padding:32px 0;}
.hero{background:linear-gradient(150deg,#1B3E6F 0%,#2E75B6 55%,#4a9fd4 100%);padding:44px 20px 36px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,.04);top:-100px;right:-80px;pointer-events:none;}
.hero-photo-ring{width:110px;height:110px;border-radius:50%;padding:3px;background:rgba(255,255,255,.25);box-shadow:0 0 0 3px rgba(255,255,255,.12),0 8px 28px rgba(0,0,0,.25);display:inline-block;margin-bottom:14px;}
.hero-photo-ring img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,.8);display:block;}
.hero-label{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:6px;}
.hero-title{font-family:'Instrument Serif',serif;font-size:clamp(32px,7vw,52px);font-weight:400;color:#fff;line-height:1.1;margin-bottom:4px;}
.hero-title i{font-style:italic;color:var(--azul-l);}
.hero-sub{font-size:13px;color:rgba(255,255,255,.7);margin-bottom:20px;letter-spacing:.02em;}
.hero-chips{display:inline-flex;flex-wrap:wrap;justify-content:center;gap:8px;}
.hero-chip{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:4px 14px;font-size:12px;font-weight:600;color:rgba(255,255,255,.9);}
.sec-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.sec-num{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--fg-3);}
.sec-title{font-family:'Instrument Serif',serif;font-size:clamp(20px,4vw,26px);font-weight:400;color:var(--azul);line-height:1.2;}
.card{background:var(--card);border-radius:var(--r);box-shadow:0 1px 4px rgba(15,23,42,.06),0 4px 16px rgba(15,23,42,.06);border:1px solid rgba(226,232,240,.8);overflow:hidden;margin-bottom:14px;}
.card:hover{transform:translateY(-2px);box-shadow:0 2px 8px rgba(15,23,42,.08),0 8px 28px rgba(15,23,42,.09);}
.card-inner{padding:20px 22px;}
.pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;}
.pill{padding:3px 11px;border-radius:999px;font-size:12px;font-weight:600;background:var(--azul-xl);color:var(--azul);border:1px solid var(--azul-l);}
.pill-g{background:var(--verde-l);color:var(--verde);border-color:#bbf7d0;}
.pill-o{background:var(--naranja-l);color:var(--naranja);border-color:#fed7aa;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;}
.gi{background:#f8fafc;border-radius:var(--rs);padding:14px 16px;border:1px solid var(--border);}
.gi-o{background:var(--naranja-l);border-color:#fed7aa;}
.gi-r{background:var(--rojo-l);border-color:#fecaca;}
.gi-b{background:var(--azul-xl);border-color:var(--azul-l);}
.gi strong{font-size:13px;font-weight:600;color:var(--fg);display:block;margin-bottom:3px;}
.gi-o strong{color:#7c2d12;}.gi-r strong{color:#7f1d1d;}.gi-b strong{color:var(--azul);}
.gi p{font-size:13px;color:var(--fg-2);line-height:1.5;}
.gi-o p{color:#9a3412;}.gi-r p{color:#991b1b;}.gi-b p{color:var(--azul-m);}
.steps{display:flex;flex-direction:column;gap:0;margin-bottom:16px;border-top:1px solid var(--border);}
.step{display:flex;gap:12px;align-items:flex-start;padding:11px 0;border-bottom:1px solid var(--border);}
.step:last-child{border-bottom:none;}
.snum{width:24px;height:24px;min-width:24px;border-radius:50%;background:var(--azul);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px;flex-shrink:0;}
.stext{font-size:14px;line-height:1.6;color:var(--fg-2);}
.note{border-left:3px solid var(--azul-m);padding:10px 0 10px 16px;font-size:13px;line-height:1.65;color:var(--fg-2);margin-top:8px;}
.note strong{display:block;color:var(--fg);font-weight:600;margin-bottom:2px;}
.note-y{border-color:#f59e0b;color:#78350f;}.note-y strong{color:#92400e;}
.note-r{border-color:var(--rojo);background:var(--rojo-l);border-radius:0 var(--rs) var(--rs) 0;padding:10px 14px 10px 16px;color:#7f1d1d;}.note-r strong{color:#991b1b;}
.quote{border-left:3px solid var(--azul-m);padding:12px 0 12px 18px;margin-bottom:20px;}
.quote p{font-family:'Instrument Serif',serif;font-style:italic;font-size:18px;color:var(--azul);line-height:1.5;}
.tbl-wrap{overflow-x:auto;border-radius:var(--rs);border:1px solid var(--border);}
table{width:100%;border-collapse:collapse;font-size:14px;}
thead tr{background:var(--azul);color:#fff;print-color-adjust:exact;-webkit-print-color-adjust:exact;}
thead th{padding:10px 14px;text-align:left;font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;}
tbody tr{border-bottom:1px solid var(--border);}
tbody tr:last-child{border-bottom:none;}
tbody tr:nth-child(even){background:#f8fafc;}
tbody tr:hover{background:var(--azul-xl);}
td{padding:9px 14px;color:var(--fg);vertical-align:top;line-height:1.5;}
.tm{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--fg-3);white-space:nowrap;}
.cierre{background:var(--azul);color:#fff;border-radius:var(--r);padding:36px 36px;position:relative;overflow:hidden;print-color-adjust:exact;-webkit-print-color-adjust:exact;margin-bottom:14px;}
.cierre::before{content:'';position:absolute;top:-40%;right:-15%;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.05);pointer-events:none;}
.cierre-tag{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:14px;}
.cierre-title{font-family:'Instrument Serif',serif;font-size:clamp(24px,5vw,36px);font-weight:400;line-height:1.15;margin-bottom:14px;}
.cierre-title i{font-style:italic;color:var(--azul-l);}
.cierre p{font-size:14px;color:rgba(255,255,255,.72);line-height:1.7;max-width:480px;}
footer{border-top:1px solid var(--border);padding:24px 16px;text-align:center;margin-top:8px;}
footer p{font-size:12px;color:var(--fg-3);line-height:1.8;}
@media print{nav,#pb{display:none!important;}main{padding-top:0!important;}.r{opacity:1!important;transform:none!important;}.card{box-shadow:none;border:1px solid var(--border);page-break-inside:avoid;}.cierre{page-break-inside:avoid;}*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}
@media(max-width:520px){.g2{grid-template-columns:1fr;}.cierre{padding:28px 20px;}.wrap{padding:0 14px;}}
</style>`;

const SCRIPT = `<script>
(function(){
  var pb=document.getElementById('pb'),nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){
    var s=window.scrollY,h=document.body.scrollHeight-window.innerHeight;
    if(pb)pb.style.width=(h>0?s/h*100:0)+'%';
    if(nav){if(s>10)nav.classList.add('on');else nav.classList.remove('on');}
  });
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}});},{threshold:0.1});
  document.querySelectorAll('.r').forEach(function(el){obs.observe(el);});
})();
<\/script>`;

function renderPills(pills: Pill[]): string {
  if (!pills.length) return '';
  return `<div class="pills">${pills.map(p => `<span class="pill${p.color ? ' pill-' + p.color : ''}">${esc(p.text)}</span>`).join('')}</div>`;
}
function renderNote(n: Note): string {
  if (!n.body) return '';
  const cls = n.type ? ` note-${n.type}` : '';
  return `<div class="note${cls}">${n.title ? `<strong>${esc(n.title)}</strong>` : ''}${nl2br(n.body)}</div>`;
}
function renderSecInstrucciones(sec: SecInstrucciones, num: string): string {
  const gridHtml = sec.items.length ? `<div class="g2">${sec.items.map(it => {
    const cls = it.color ? ` gi-${it.color}` : '';
    return `<div class="gi${cls}"><strong>${esc(it.title)}</strong><p>${nl2br(it.body)}</p></div>`;
  }).join('')}</div>` : '';
  return `\n<!-- ${num} ${esc(sec.title).toUpperCase()} -->\n<div class="sec">\n  <div class="sec-head r">\n    <span class="sec-num">${num}</span>\n    <h2 class="sec-title">${esc(sec.title)}</h2>\n  </div>\n  <div class="card r d1"><div class="card-inner">${renderPills(sec.pills)}${gridHtml}${sec.notes.map(renderNote).join('')}</div></div>\n</div>`;
}
function renderSecEjercicios(sec: SecEjercicios, num: string): string {
  const quoteHtml = sec.quote ? `<div class="quote r"><p>&ldquo;${nl2br(sec.quote)}&rdquo;</p></div>` : '';
  const exHtml = sec.exercises.map((ex, i) => {
    const exNum = String(i + 1).padStart(2, '0');
    const stepsHtml = ex.steps.length ? `<div class="steps">${ex.steps.map((s, si) => `<div class="step"><span class="snum">${si + 1}</span><span class="stext">${nl2br(s.text)}</span></div>`).join('')}</div>` : '';
    const noteHtml = ex.noteBody ? `<div class="note${ex.noteType ? ' note-' + ex.noteType : ''}">${ex.noteTitle ? `<strong>${esc(ex.noteTitle)}</strong>` : ''}${nl2br(ex.noteBody)}</div>` : '';
    return `  <div class="card r d${Math.min(i + 1, 5)}"><div class="card-inner"><p style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--fg-3);margin-bottom:6px;">Ejercicio ${exNum}</p><h3 style="font-family:'Instrument Serif',serif;font-size:20px;color:var(--fg);margin-bottom:2px;">${esc(ex.name)}</h3>${ex.subtitle ? `<p style="font-size:12px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--fg-3);margin-bottom:14px;">${esc(ex.subtitle)}</p>` : ''}${renderPills(ex.pills)}${stepsHtml}${noteHtml}</div></div>`;
  }).join('\n');
  return `\n<!-- ${num} ${esc(sec.title).toUpperCase()} -->\n<div class="sec">\n  <div class="sec-head r">\n    <span class="sec-num">${num}</span>\n    <h2 class="sec-title">${esc(sec.title)}</h2>\n  </div>\n  ${quoteHtml}\n${exHtml}\n</div>`;
}
function renderSecTabla(sec: SecTabla, num: string): string {
  const rowsHtml = sec.rows.map(r => `<tr><td class="tm">${esc(r.moment)}</td><td>${esc(r.activity)}</td><td>${esc(r.duration)}</td><td>${esc(r.frequency)}</td></tr>`).join('');
  return `\n<!-- ${num} ${esc(sec.title).toUpperCase()} -->\n<div class="sec">\n  <div class="sec-head r">\n    <span class="sec-num">${num}</span>\n    <h2 class="sec-title">${esc(sec.title)}</h2>\n  </div>\n  <div class="tbl-wrap r d1"><table><thead><tr><th>Momento</th><th>Qué hacer</th><th>Duración</th><th>Frec.</th></tr></thead><tbody>${rowsHtml}</tbody></table></div>\n</div>`;
}

export function generatePautaHtml(form: PautaForm, patientName: string, photoUrl?: string, chips: string[] = []): string {
  const [weekLine, ...restTitle] = form.weekRange.split('\n');
  const titleHtml = restTitle.length
    ? `${esc(weekLine)}<br/><i>${esc(restTitle.join(' '))}</i>`
    : esc(weekLine);

  const photoHtml = photoUrl
    ? `<div class="hero-photo-ring"><img src="${esc(photoUrl)}" alt="${esc(patientName)}"/></div>`
    : '';

  const chipsHtml = chips.length
    ? `<div class="hero-chips">${chips.map(c => `<span class="hero-chip">${esc(c)}</span>`).join('')}</div>`
    : '';

  const sectionsHtml = form.sections.map((sec, i) => {
    const num = String(i + 1).padStart(2, '0');
    if (sec.type === 'instrucciones') return renderSecInstrucciones(sec, num);
    if (sec.type === 'ejercicios')    return renderSecEjercicios(sec, num);
    return renderSecTabla(sec, num);
  }).join('');

  const cierreHtml = (form.closingTag || form.closingTitle || form.closingMsg) ? `
<!-- CIERRE -->
<div class="wrap"><div class="cierre r">
  ${form.closingTag ? `<div class="cierre-tag">${esc(form.closingTag)}</div>` : ''}
  ${form.closingTitle ? `<h2 class="cierre-title">${nl2br(form.closingTitle)}</h2>` : ''}
  ${form.closingMsg ? `<p>${nl2br(form.closingMsg)}</p>` : ''}
</div></div>` : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Pautas en Casa &middot; ${esc(patientName)} &middot; ${esc(form.weekRange)}</title>
${CSS}
</head>
<body>
<div id="pb"></div>
<nav id="nav">
  <div class="logo">FISIOCAN <b>&middot;</b> Fisioterapia Veterinaria</div>
  <div class="nav-btns">
    <button class="btn btn-g" onclick="window.print()">&#8595;&thinsp;PDF</button>
  </div>
</nav>
<main>
<!-- HERO -->
<div class="hero">
  ${photoHtml}
  <div class="hero-label">Pautas en Casa &middot; Rehabilitación</div>
  <h1 class="hero-title">${titleHtml}</h1>
  <p class="hero-sub">con ${esc(patientName).toUpperCase()}</p>
  ${chipsHtml}
</div>

${form.intro ? `<!-- INTRO -->\n<div class="wrap"><div class="sec"><p style="font-size:15px;line-height:1.75;color:var(--fg-2);">${nl2br(form.intro)}</p></div></div>` : ''}

<div class="wrap">${sectionsHtml}</div>

${cierreHtml}

<footer><p>FISIOCAN &middot; Fisioterapia Veterinaria<br/>Documento generado el ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</p></footer>
</main>
${SCRIPT}
</body>
</html>`;
}

// ── Form helpers ───────────────────────────────────────────────────────────────
const emptyPill     = (): Pill     => ({ id: uid(), text: '', color: '' });
const emptyGridItem = (): GridItem => ({ id: uid(), title: '', body: '', color: '' });
const emptyNote     = (): Note     => ({ id: uid(), title: '', body: '', type: '' });
const emptyStep     = (): Step     => ({ id: uid(), text: '' });
const emptyExercise = (): Exercise => ({ id: uid(), name: '', subtitle: '', pills: [emptyPill()], steps: [emptyStep()], noteBody: '', noteTitle: '', noteType: '' });
const emptyRow      = (): TableRow => ({ id: uid(), moment: '', activity: '', duration: '', frequency: '' });

function newSection(type: Section['type']): Section {
  if (type === 'instrucciones') return { id: uid(), type, title: '', pills: [emptyPill()], items: [emptyGridItem(), emptyGridItem()], notes: [] };
  if (type === 'ejercicios')    return { id: uid(), type, title: '', quote: '', exercises: [emptyExercise()] };
  return { id: uid(), type: 'tabla', title: 'Rutina diaria', rows: [emptyRow()] };
}

const initialForm: PautaForm = {
  weekRange: '', intro: '', sections: [], closingTag: 'Siguiente paso', closingTitle: '', closingMsg: '',
};

// ── Small editor sub-components ────────────────────────────────────────────────
function PillsEditor({ pills, onChange }: { pills: Pill[]; onChange: (pills: Pill[]) => void }) {
  const update = (id: string, key: keyof Pill, val: string) =>
    onChange(pills.map(p => p.id === id ? { ...p, [key]: val } : p));
  return (
    <div className="space-y-1">
      {pills.map(p => (
        <div key={p.id} className="flex gap-1 items-center">
          <input className="input flex-1 text-xs py-1" placeholder="Texto del badge" value={p.text} onChange={e => update(p.id, 'text', e.target.value)} />
          <select className="input py-1 text-xs w-24" value={p.color} onChange={e => update(p.id, 'color', e.target.value)}>
            <option value="">Azul</option>
            <option value="g">Verde</option>
            <option value="o">Naranja</option>
          </select>
          <button type="button" onClick={() => onChange(pills.filter(x => x.id !== p.id))} className="text-navy-300 hover:text-red-400"><X size={13} /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...pills, emptyPill()])} className="text-xs text-teal-600 hover:underline flex items-center gap-0.5"><Plus size={11} />Badge</button>
    </div>
  );
}

function GridEditor({ items, onChange }: { items: GridItem[]; onChange: (items: GridItem[]) => void }) {
  const update = (id: string, key: keyof GridItem, val: string) =>
    onChange(items.map(it => it.id === id ? { ...it, [key]: val } : it));
  return (
    <div className="space-y-2">
      {items.map(it => (
        <div key={it.id} className="border border-navy-100 rounded-lg p-2 space-y-1">
          <div className="flex gap-1">
            <input className="input flex-1 text-xs py-1" placeholder="Título" value={it.title} onChange={e => update(it.id, 'title', e.target.value)} />
            <select className="input py-1 text-xs w-28" value={it.color} onChange={e => update(it.id, 'color', e.target.value)}>
              <option value="">Gris</option><option value="b">Azul</option>
              <option value="g">Verde</option><option value="o">Naranja</option><option value="r">Rojo</option>
            </select>
            <button type="button" onClick={() => onChange(items.filter(x => x.id !== it.id))} className="text-navy-300 hover:text-red-400"><X size={13} /></button>
          </div>
          <textarea className="input text-xs py-1 w-full" rows={2} placeholder="Descripción" value={it.body} onChange={e => update(it.id, 'body', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, emptyGridItem()])} className="text-xs text-teal-600 hover:underline flex items-center gap-0.5"><Plus size={11} />Punto</button>
    </div>
  );
}

function NoteEditor({ notes, onChange }: { notes: Note[]; onChange: (notes: Note[]) => void }) {
  const update = (id: string, key: keyof Note, val: string) =>
    onChange(notes.map(n => n.id === id ? { ...n, [key]: val } : n));
  return (
    <div className="space-y-2">
      {notes.map(n => (
        <div key={n.id} className="border border-navy-100 rounded-lg p-2 space-y-1">
          <div className="flex gap-1">
            <input className="input flex-1 text-xs py-1" placeholder="Título nota (opcional)" value={n.title} onChange={e => update(n.id, 'title', e.target.value)} />
            <select className="input py-1 text-xs w-28" value={n.type} onChange={e => update(n.id, 'type', e.target.value)}>
              <option value="">Azul</option><option value="y">Amarillo</option><option value="r">Rojo</option>
            </select>
            <button type="button" onClick={() => onChange(notes.filter(x => x.id !== n.id))} className="text-navy-300 hover:text-red-400"><X size={13} /></button>
          </div>
          <textarea className="input text-xs py-1 w-full" rows={2} placeholder="Texto de la nota" value={n.body} onChange={e => update(n.id, 'body', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...notes, emptyNote()])} className="text-xs text-teal-600 hover:underline flex items-center gap-0.5"><Plus size={11} />Nota / aviso</button>
    </div>
  );
}

function ExerciseCard({ ex, index, onChange, onDelete }: { ex: Exercise; index: number; onChange: (ex: Exercise) => void; onDelete: () => void }) {
  const [open, setOpen] = useState(true);
  const updStep = (id: string, text: string) => onChange({ ...ex, steps: ex.steps.map(s => s.id === id ? { ...s, text } : s) });
  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-navy-50 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <GripVertical size={14} className="text-navy-300" />
        <span className="text-xs font-semibold text-navy-600 flex-1">Ejercicio {index + 1}: {ex.name || '(sin nombre)'}</span>
        <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }} className="text-navy-300 hover:text-red-400"><Trash2 size={12} /></button>
        {open ? <ChevronUp size={14} className="text-navy-400" /> : <ChevronDown size={14} className="text-navy-400" />}
      </div>
      {open && (
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div><label className="label text-[10px]">Nombre</label><input className="input text-xs py-1" value={ex.name} onChange={e => onChange({ ...ex, name: e.target.value })} placeholder="Ej: Transferencia de peso" /></div>
            <div><label className="label text-[10px]">Subtítulo</label><input className="input text-xs py-1" value={ex.subtitle} onChange={e => onChange({ ...ex, subtitle: e.target.value })} placeholder="Ej: Weight Shifting" /></div>
          </div>
          <div><label className="label text-[10px]">Badges (dosis, repeticiones…)</label><PillsEditor pills={ex.pills} onChange={p => onChange({ ...ex, pills: p })} /></div>
          <div>
            <label className="label text-[10px]">Pasos (uno por línea numerada)</label>
            <div className="space-y-1">
              {ex.steps.map((s, si) => (
                <div key={s.id} className="flex gap-1 items-center">
                  <span className="text-[10px] font-bold text-navy-400 w-4 text-right">{si + 1}</span>
                  <input className="input flex-1 text-xs py-1" value={s.text} onChange={e => updStep(s.id, e.target.value)} placeholder={`Paso ${si + 1}`} />
                  <button type="button" onClick={() => onChange({ ...ex, steps: ex.steps.filter(x => x.id !== s.id) })} className="text-navy-300 hover:text-red-400"><X size={12} /></button>
                </div>
              ))}
              <button type="button" onClick={() => onChange({ ...ex, steps: [...ex.steps, emptyStep()] })} className="text-xs text-teal-600 hover:underline flex items-center gap-0.5"><Plus size={11} />Paso</button>
            </div>
          </div>
          <div>
            <label className="label text-[10px]">Nota/aviso al pie</label>
            <div className="flex gap-1">
              <input className="input flex-1 text-xs py-1" placeholder="Título nota (opcional)" value={ex.noteTitle} onChange={e => onChange({ ...ex, noteTitle: e.target.value })} />
              <select className="input py-1 text-xs w-28" value={ex.noteType} onChange={e => onChange({ ...ex, noteType: e.target.value as Exercise['noteType'] })}>
                <option value="">Azul</option><option value="y">Amarillo</option><option value="r">Rojo</option>
              </select>
            </div>
            <textarea className="input text-xs py-1 w-full mt-1" rows={2} placeholder="Texto de la nota" value={ex.noteBody} onChange={e => onChange({ ...ex, noteBody: e.target.value })} />
          </div>
        </div>
      )}
    </div>
  );
}

function SectionEditor({ sec, index, onChange, onDelete, onMove }: {
  sec: Section; index: number;
  onChange: (sec: Section) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(true);
  const typeLabel = sec.type === 'instrucciones' ? 'Instrucciones' : sec.type === 'ejercicios' ? 'Ejercicios' : 'Tabla rutina';

  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-navy-50 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <div className="flex flex-col gap-0.5">
          <button type="button" onClick={e => { e.stopPropagation(); onMove(-1); }} className="text-navy-300 hover:text-navy-600"><ChevronUp size={12} /></button>
          <button type="button" onClick={e => { e.stopPropagation(); onMove(1); }} className="text-navy-300 hover:text-navy-600"><ChevronDown size={12} /></button>
        </div>
        <span className="text-[10px] font-bold uppercase text-navy-400 w-5">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-xs font-semibold text-navy-700 flex-1">{sec.title || '(sin título)'} <span className="text-navy-400 font-normal">· {typeLabel}</span></span>
        <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }} className="text-navy-300 hover:text-red-400"><Trash2 size={13} /></button>
        {open ? <ChevronUp size={14} className="text-navy-400" /> : <ChevronDown size={14} className="text-navy-400" />}
      </div>

      {open && (
        <div className="p-4 space-y-4 bg-white">
          <input className="input text-sm font-medium" placeholder="Título de la sección" value={sec.title} onChange={e => onChange({ ...sec, title: e.target.value })} />

          {sec.type === 'instrucciones' && (
            <>
              <div><label className="label text-[11px]">Badges / dosis</label><PillsEditor pills={sec.pills} onChange={p => onChange({ ...sec, pills: p } as SecInstrucciones)} /></div>
              <div><label className="label text-[11px]">Puntos en cuadrícula</label><GridEditor items={sec.items} onChange={it => onChange({ ...sec, items: it } as SecInstrucciones)} /></div>
              <div><label className="label text-[11px]">Notas / avisos</label><NoteEditor notes={sec.notes} onChange={n => onChange({ ...sec, notes: n } as SecInstrucciones)} /></div>
            </>
          )}

          {sec.type === 'ejercicios' && (
            <>
              <div>
                <label className="label text-[11px]">Cita inspiracional (opcional)</label>
                <textarea className="input text-xs py-1 w-full" rows={2} placeholder="Se mostrará en cursiva antes de los ejercicios" value={sec.quote} onChange={e => onChange({ ...sec, quote: e.target.value } as SecEjercicios)} />
              </div>
              <div className="space-y-2">
                {sec.exercises.map((ex, i) => (
                  <ExerciseCard
                    key={ex.id} ex={ex} index={i}
                    onChange={updated => onChange({ ...sec, exercises: sec.exercises.map(x => x.id === ex.id ? updated : x) } as SecEjercicios)}
                    onDelete={() => onChange({ ...sec, exercises: sec.exercises.filter(x => x.id !== ex.id) } as SecEjercicios)}
                  />
                ))}
                <button type="button" onClick={() => onChange({ ...sec, exercises: [...sec.exercises, emptyExercise()] } as SecEjercicios)} className="btn-ghost gap-1 text-xs w-full justify-center"><Plus size={13} />Añadir ejercicio</button>
              </div>
            </>
          )}

          {sec.type === 'tabla' && (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold text-navy-400 uppercase tracking-wider px-1">
                <span>Momento</span><span>Actividad</span><span>Duración</span><span>Frec.</span>
              </div>
              {sec.rows.map(r => (
                <div key={r.id} className="grid grid-cols-4 gap-1 items-center">
                  {(['moment','activity','duration','frequency'] as (keyof TableRow)[]).filter(k => k !== 'id').map(k => (
                    <input key={k} className="input text-xs py-1" placeholder={k === 'moment' ? 'Mañana' : k === 'activity' ? 'Calor lumbar' : k === 'duration' ? '10 min' : '1×/día'} value={r[k as keyof TableRow] as string} onChange={e => onChange({ ...sec, rows: sec.rows.map(x => x.id === r.id ? { ...x, [k]: e.target.value } : x) } as SecTabla)} />
                  ))}
                  <button type="button" onClick={() => onChange({ ...sec, rows: sec.rows.filter(x => x.id !== r.id) } as SecTabla)} className="text-navy-300 hover:text-red-400 col-span-4 flex justify-end -mt-1"><X size={12} /></button>
                </div>
              ))}
              <button type="button" onClick={() => onChange({ ...sec, rows: [...sec.rows, emptyRow()] } as SecTabla)} className="btn-ghost gap-1 text-xs w-full justify-center"><Plus size={13} />Añadir fila</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main modal ─────────────────────────────────────────────────────────────────
interface Props {
  patientName: string;
  photoUrl?: string;
  onClose: () => void;
  onSave: (html: string, title: string, weekRange: string, notes: string) => Promise<void>;
}

export default function PautaBuilderModal({ patientName, photoUrl, onClose, onSave }: Props) {
  const [form, setForm] = useState<PautaForm>(initialForm);
  const [chips, setChips] = useState('');
  const [saving, setSaving] = useState(false);

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...form.sections];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setForm(f => ({ ...f, sections: arr }));
  };

  async function handleSave() {
    if (!form.weekRange.trim()) return alert('Escribe el período (ej: Semanas 1-2)');
    setSaving(true);
    const chipList = chips.split(',').map(c => c.trim()).filter(Boolean);
    const html = generatePautaHtml(form, patientName, photoUrl, chipList);
    const title = `Pautas en casa – ${form.weekRange}`;
    const notes = form.intro;
    try { await onSave(html, title, form.weekRange, notes); } finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-4 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-base font-bold text-navy-700">Crear pauta domiciliaria</h2>
            <p className="text-xs text-navy-400 mt-0.5">Para {patientName} · mismo diseño que la guía de Dana</p>
          </div>
          <button onClick={onClose} className="text-navy-400 hover:text-navy-700"><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Datos básicos */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Datos básicos</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Período *</label>
                <input className="input" placeholder="Ej: Semanas 1-2" value={form.weekRange} onChange={e => setForm(f => ({ ...f, weekRange: e.target.value }))} />
              </div>
              <div>
                <label className="label">Chips del hero (coma)</label>
                <input className="input" placeholder="Labrador, 26 kg, Hembra" value={chips} onChange={e => setChips(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label">Texto de introducción</label>
              <textarea className="input w-full" rows={3} placeholder="Breve descripción de la fase del tratamiento..." value={form.intro} onChange={e => setForm(f => ({ ...f, intro: e.target.value }))} />
            </div>
          </div>

          {/* Secciones */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Secciones</h3>
            {form.sections.length === 0 && (
              <p className="text-xs text-navy-400 text-center py-4 border border-dashed border-navy-100 rounded-xl">Añade secciones usando los botones de abajo</p>
            )}
            {form.sections.map((sec, i) => (
              <SectionEditor
                key={sec.id} sec={sec} index={i}
                onChange={updated => setForm(f => ({ ...f, sections: f.sections.map(s => s.id === sec.id ? updated : s) }))}
                onDelete={() => setForm(f => ({ ...f, sections: f.sections.filter(s => s.id !== sec.id) }))}
                onMove={dir => move(i, dir)}
              />
            ))}
            <div className="flex gap-2 flex-wrap">
              {(['instrucciones','ejercicios','tabla'] as Section['type'][]).map(t => (
                <button key={t} type="button" onClick={() => setForm(f => ({ ...f, sections: [...f.sections, newSection(t)] }))}
                  className="btn-ghost text-xs gap-1.5 flex-1 justify-center capitalize">
                  <Plus size={13} />{t === 'instrucciones' ? 'Instrucciones' : t === 'ejercicios' ? 'Ejercicios' : 'Tabla rutina'}
                </button>
              ))}
            </div>
          </div>

          {/* Cierre */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Cierre</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Etiqueta</label><input className="input" placeholder="Siguiente paso" value={form.closingTag} onChange={e => setForm(f => ({ ...f, closingTag: e.target.value }))} /></div>
              <div><label className="label">Título</label><input className="input" placeholder="Nos vemos en la semana 3" value={form.closingTitle} onChange={e => setForm(f => ({ ...f, closingTitle: e.target.value }))} /></div>
            </div>
            <div><label className="label">Mensaje</label><textarea className="input w-full" rows={2} placeholder="Cualquier duda durante la semana — contacta antes de esperar a la visita." value={form.closingMsg} onChange={e => setForm(f => ({ ...f, closingMsg: e.target.value }))} /></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-navy-100 bg-navy-50 rounded-b-2xl">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancelar</button>
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
            {saving ? 'Generando…' : 'Crear pauta'}
          </button>
        </div>
      </div>
    </div>
  );
}
