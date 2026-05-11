/**
 * Rebuilds Dana's pauta (id=1) using the exact same generatePautaHtml
 * function and format as the PautaBuilderModal.
 * Run: npx ts-node -r tsconfig-paths/register src/scripts/rebuild-dana-pauta.ts
 */
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// ── Copy of the generator (mirrors PautaBuilderModal.tsx) ─────────────────────

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

// ── Types (mirror of PautaBuilderModal) ───────────────────────────────────────
interface Pill     { text: string; color: '' | 'g' | 'o' }
interface GridItem { title: string; body: string; color: '' | 'b' | 'g' | 'o' | 'r' }
interface Note     { title: string; body: string; type: '' | 'y' | 'r' }
interface Step     { text: string }
interface Exercise { name: string; subtitle: string; pills: Pill[]; steps: Step[]; noteBody: string; noteTitle: string; noteType: '' | 'y' | 'r' }
interface TableRow { moment: string; activity: string; duration: string; frequency: string }
interface SecInstrucciones { type: 'instrucciones'; title: string; pills: Pill[]; items: GridItem[]; notes: Note[] }
interface SecEjercicios    { type: 'ejercicios'; title: string; quote: string; exercises: Exercise[] }
interface SecTabla         { type: 'tabla'; title: string; rows: TableRow[] }
type Section = SecInstrucciones | SecEjercicios | SecTabla;
interface PautaForm { weekRange: string; intro: string; sections: Section[]; closingTag: string; closingTitle: string; closingMsg: string }

// ── Render helpers ────────────────────────────────────────────────────────────
function renderPills(pills: Pill[]): string {
  if (!pills.length) return '';
  return `<div class="pills">${pills.map(p => `<span class="pill${p.color ? ' pill-' + p.color : ''}">${esc(p.text)}</span>`).join('')}</div>`;
}
function renderNote(n: Note): string {
  if (!n.body) return '';
  return `<div class="note${n.type ? ' note-' + n.type : ''}">${n.title ? `<strong>${esc(n.title)}</strong>` : ''}${nl2br(n.body)}</div>`;
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

function generatePautaHtml(form: PautaForm, patientName: string, photoUrl?: string, chips: string[] = []): string {
  const [weekLine, ...restTitle] = form.weekRange.split('\n');
  const titleHtml = restTitle.length ? `${esc(weekLine)}<br/><i>${esc(restTitle.join(' '))}</i>` : esc(weekLine);
  const photoHtml = photoUrl ? `<div class="hero-photo-ring"><img src="${esc(photoUrl)}" alt="${esc(patientName)}"/></div>` : '';
  const chipsHtml = chips.length ? `<div class="hero-chips">${chips.map(c => `<span class="hero-chip">${esc(c)}</span>`).join('')}</div>` : '';
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
<title>Pautas en Casa · ${esc(patientName)} · ${esc(form.weekRange.split('\n')[0])}</title>
${CSS}
</head>
<body>
<div id="pb"></div>
<nav id="nav">
  <div class="logo">FISIOCAN <b>·</b> Fisioterapia Veterinaria</div>
  <div class="nav-btns">
    <button class="btn btn-g" onclick="window.print()">↓ PDF</button>
  </div>
</nav>
<main>
<!-- HERO -->
<div class="hero">
  ${photoHtml}
  <div class="hero-label">Pautas en Casa · Rehabilitación</div>
  <h1 class="hero-title">${titleHtml}</h1>
  <p class="hero-sub">con ${esc(patientName).toUpperCase()}</p>
  ${chipsHtml}
</div>

${form.intro ? `<!-- INTRO -->\n<div class="wrap"><div class="sec"><p style="font-size:15px;line-height:1.75;color:var(--fg-2);">${nl2br(form.intro)}</p></div></div>` : ''}

<div class="wrap">${sectionsHtml}</div>

${cierreHtml}

<footer><p>FISIOCAN · Fisioterapia Veterinaria<br/>Documento generado el ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</p></footer>
</main>
${SCRIPT}
</body>
</html>`;
}

// ── Dana's pauta data ─────────────────────────────────────────────────────────

const danaForm: PautaForm = {
  weekRange: 'Semanas 1 y 2\ncon Dana',
  intro: 'Este documento es tu guía diaria para las dos primeras semanas. El objetivo ahora es reducir el dolor, relajar la musculatura y empezar a movilizar suavemente. Con constancia es más que suficiente.',
  sections: [
    // 01 – Paseos diarios
    {
      type: 'instrucciones',
      title: 'Paseos diarios',
      pills: [
        { text: '15–20 min', color: '' },
        { text: '2–3 veces al día', color: '' },
        { text: 'Correa corta o sin correa', color: 'g' },
        { text: 'Sin juegos bruscos', color: 'o' },
      ],
      items: [
        { title: 'Superficie',           body: 'Hierba o tierra compacta si es posible. Evitar asfalto muy duro.',                       color: '' },
        { title: 'Ritmo',                body: 'Lento y tranquilo. Ella marca el paso. Sin correr ni trotar.',                            color: '' },
        { title: 'Evitar',               body: 'Saltos, giros bruscos, escaleras repetidas fuera.',                                       color: 'r' },
        { title: 'Si se cansa',          body: 'Parar antes de tiempo, sin problema. Regresa directamente a casa.',                       color: '' },
        { title: 'Cuestas suaves',       body: 'Activar los posteriores y el core de forma natural. 1–2 por paseo.',                      color: 'b' },
        { title: 'Cuestas: con cuidado', body: 'Solo muy suaves. Si cojea o se para, evitarlas ese día. La bajada carga más.',            color: 'o' },
      ],
      notes: [
        { title: 'Calentamiento previo', body: 'Antes de salir, deja que camine 3–5 minutos muy despacio por casa. Las articulaciones necesitan calentarse, especialmente por las mañanas.', type: 'y' },
      ],
    } as SecInstrucciones,

    // 02 – Escaleras en casa
    {
      type: 'instrucciones',
      title: 'Escaleras en casa',
      pills: [],
      items: [
        { title: 'Reducir al mínimo',         body: 'Solo las imprescindibles. No varias veces seguidas.',                                     color: 'o' },
        { title: 'Siempre despacio',           body: 'Sin forzar el ritmo. Peldaño a peldaño, sin prisas.',                                     color: '' },
        { title: 'La bajada es lo más dañino', body: '3× más impacto que la subida. Ayudarla físicamente o evitarla.',                          color: 'r' },
        { title: 'Acompañarla siempre',        body: 'A su lado para que no corra ni tropiece, especialmente bajando.',                          color: '' },
        { title: 'Subida y bajada del coche',  body: 'Usar rampa o ayudarla con las manos. El impacto del salto es muy dañino.',                 color: 'o' },
      ],
      notes: [
        { title: 'Señal de dolor ese día', body: 'Si le cuesta más de lo habitual o duda antes de bajar, es que algo le duele más ese día. Que descanse y lo comentamos en la próxima visita.', type: 'r' },
      ],
    } as SecInstrucciones,

    // 03 – Calor en la zona lumbar
    {
      type: 'ejercicios',
      title: 'Calor en la zona lumbar',
      quote: '',
      exercises: [
        {
          name: 'Calor lumbar',
          subtitle: 'Termoterapia · 10–15 min',
          pills: [
            { text: '10–15 min', color: '' },
            { text: '1 vez al día', color: '' },
            { text: 'Mejor por la mañana', color: 'g' },
          ],
          steps: [
            { text: 'Usa una manta eléctrica en nivel bajo o una bolsa de agua caliente tibia (no caliente).' },
            { text: 'Colócala sobre la zona del lomo y la zona lumbar — la parte de atrás antes de la cola.' },
            { text: 'Pon siempre una toalla entre el calor y la piel para que no queme. Revisa cada 2–3 min.' },
            { text: 'Si se levanta o se mueve para alejarse, retira el calor — puede ser demasiado.' },
          ],
          noteBody: 'Aplicar el calor antes del paseo matutino ayuda a reducir la rigidez con la que se levanta por las mañanas.',
          noteTitle: '',
          noteType: 'y',
        },
      ],
    } as SecEjercicios,

    // 04 – Masaje de relajación
    {
      type: 'ejercicios',
      title: 'Masaje de relajación',
      quote: '',
      exercises: [
        {
          name: 'Masaje de relajación',
          subtitle: 'Miofascial suave · 5–10 min',
          pills: [
            { text: '5–10 min', color: '' },
            { text: '1 vez al día', color: '' },
            { text: 'Mejor por la tarde/noche', color: 'g' },
          ],
          steps: [
            { text: 'Espera a que esté tranquila y tumbada. Nunca hagas el masaje si está nerviosa o inquieta.' },
            { text: 'Empieza por el cuello y ve bajando con movimientos suaves usando la palma de la mano.' },
            { text: 'Zonas a trabajar: lomo, zona lumbar y muslos. Movimientos siempre de delante hacia atrás.' },
            { text: 'Presión muy suave — no es un masaje profundo. Solo el peso de tu mano apoyada.' },
            { text: 'Si en alguna zona se tensa, se queja o se mueve para alejarse, para en esa zona y continúa en otra.' },
          ],
          noteBody: '',
          noteTitle: '',
          noteType: '',
        },
      ],
    } as SecEjercicios,

    // 05 – Ejercicios suaves
    {
      type: 'ejercicios',
      title: 'Ejercicios suaves',
      quote: 'Primero quitar el dolor, después fortalecer. Si intentas fortalecer sobre dolor, el animal no activará bien la musculatura.',
      exercises: [
        {
          name: 'Transferencia de peso',
          subtitle: 'Weight Shifting',
          pills: [
            { text: '5 rep cada lado', color: '' },
            { text: '1–2 veces/día', color: '' },
            { text: '~2–3 min', color: '' },
          ],
          steps: [
            { text: 'Dana de pie, quieta y relajada.' },
            { text: 'Coloca las manos en sus costados a altura de cadera, una a cada lado.' },
            { text: 'Presión suave hacia un lado durante 3 seg — ella compensa cargando el contrario.' },
            { text: 'Suelta, pausa 2 seg, alterna. Eso es 1 repetición.' },
          ],
          noteBody: 'La presión ajusta su postura — no la desestabiliza. Si se mueve mucho, reduce la fuerza.',
          noteTitle: '',
          noteType: '',
        },
        {
          name: 'Superficie inestable',
          subtitle: 'Propiocepción sobre foam',
          pills: [
            { text: '3 series × 30–60 seg', color: '' },
            { text: '1 vez/día', color: '' },
          ],
          steps: [
            { text: 'Colchoneta foam, almohada firme o manta bien doblada en el suelo.' },
            { text: 'Dana de pie encima — no necesita moverse, solo estar quieta.' },
            { text: 'Mantén 30–60 seg × 3 series con 30 seg de descanso entre ellas.' },
          ],
          noteBody: 'La superficie inestable activa sola la musculatura estabilizadora. La quietud es el ejercicio.',
          noteTitle: '',
          noteType: '',
        },
        {
          name: 'Estiramiento de cuello',
          subtitle: 'Con premio · Movilidad cervical',
          pills: [
            { text: '5 rep por dirección', color: '' },
            { text: '5 seg cada una', color: '' },
            { text: '1 vez/día', color: '' },
          ],
          steps: [
            { text: 'Dana de pie, quieta. Premio en la mano cerrada.' },
            { text: 'Guía hacia la derecha, mantén 5 seg, suelta el premio.' },
            { text: 'Repite: izquierda · arriba (nariz al techo) · abajo (entre las patas).' },
          ],
          noteBody: 'Solo en caliente — siempre tras el paseo o el calor. Mueve la mano muy despacio: si vas rápido, Dana tira del cuello en lugar de estirarlo.',
          noteTitle: 'Importante',
          noteType: 'y',
        },
      ],
    } as SecEjercicios,

    // 06 – Cama y descanso
    {
      type: 'instrucciones',
      title: 'Cama y descanso',
      pills: [],
      items: [
        { title: 'Cama ortopédica',   body: 'Memory foam o cama dura acolchada — que soporte sin hundir.',               color: '' },
        { title: 'Sin corrientes',     body: 'Alejada de puertas, ventanas y suelos fríos de baldosa.',                  color: '' },
        { title: 'Sin saltar al sofá', body: 'Impedir el acceso estas semanas. El impacto de bajada es elevado.',        color: 'o' },
        { title: 'Rampa en el coche',  body: 'Siempre plegable, ni subir ni bajar de un salto.',                         color: 'o' },
      ],
      notes: [],
    } as SecInstrucciones,

    // 07 – Rutina diaria
    {
      type: 'tabla',
      title: 'Rutina diaria',
      rows: [
        { moment: 'Mañana',        activity: 'Calor lumbar',            duration: '10–15 min',      frequency: '1×/día' },
        { moment: 'Antes de salir',activity: 'Calentamiento en casa',   duration: '3–5 min',        frequency: 'Cada paseo' },
        { moment: 'Mañana',        activity: 'Paseo 1',                 duration: '15–20 min',      frequency: '1×/día' },
        { moment: 'Mediodía',      activity: 'Paseo 2',                 duration: '15 min',         frequency: '1×/día' },
        { moment: 'Tarde',         activity: 'Weight Shifting',         duration: '2–3 min',        frequency: '1–2×/día' },
        { moment: 'Tarde',         activity: 'Superficie inestable',    duration: '3 × 30–60 seg',  frequency: '1×/día' },
        { moment: 'Tarde',         activity: 'Estiramiento cuello',     duration: '~5 min',         frequency: '1×/día' },
        { moment: 'Tarde/noche',   activity: 'Paseo 3',                 duration: '15–20 min',      frequency: '1×/día' },
        { moment: 'Noche',         activity: 'Masaje lomo',             duration: '5–10 min',       frequency: '1×/día' },
      ],
    } as SecTabla,
  ],
  closingTag: 'Siguiente paso',
  closingTitle: 'Nos vemos en la semana 2',
  closingMsg: 'Evaluaremos cómo ha respondido Dana y, si la evolución es favorable, valoraremos introducir el disco de equilibrio y ejercicios de fortalecimiento de tren posterior.\n\nCualquier duda durante la semana — contacta antes de esperar a la visita.',
};

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Get Dana's photo URL from DB
  const patient = await prisma.patient.findUnique({ where: { id: 7 }, select: { name: true, photoUrl: true } });
  const photoUrl = patient?.photoUrl ?? undefined;

  const html = generatePautaHtml(danaForm, 'Dana', photoUrl, ['Labrador Retriever', '26 kg', 'Hembra', 'Semanas 1–2']);

  // Find existing pauta for Dana (id=7)
  const existing = await prisma.patientPauta.findFirst({ where: { patientId: 7 }, orderBy: { createdAt: 'asc' } });

  if (existing) {
    await prisma.patientPauta.update({
      where: { id: existing.id },
      data: {
        title: 'Pautas en casa – Semanas 1–2',
        weekRange: 'Semanas 1–2',
        notes: 'Guía de rehabilitación domiciliaria para las primeras dos semanas.',
        htmlContent: html,
      },
    });
    console.log(`✓ Pauta id=${existing.id} actualizada (${html.length} bytes)`);
  } else {
    const pauta = await prisma.patientPauta.create({
      data: {
        patientId: 7,
        title: 'Pautas en casa – Semanas 1–2',
        weekRange: 'Semanas 1–2',
        notes: 'Guía de rehabilitación domiciliaria para las primeras dos semanas.',
        htmlContent: html,
      },
    });
    console.log(`✓ Pauta id=${pauta.id} creada (${html.length} bytes)`);
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
