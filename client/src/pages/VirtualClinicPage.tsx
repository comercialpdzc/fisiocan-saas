import { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { X, MessageSquare, PawPrint, Activity, Users, CalendarDays } from 'lucide-react';
import Phaser from 'phaser';
import { api } from '../lib/api';

// ── Types ─────────────────────────────────────────────────────────────
interface Patient {
  id: number;
  name: string;
  species: string;
  breed?: string;
  active: boolean;
  tutor: { id: number; name: string; phone: string; email?: string };
  _count?: { appointments: number };
}

// ── Global callback (Phaser → React) ──────────────────────────────────
let _onPatientClick: ((p: Patient) => void) | null = null;

// ── Color palette per patient slot ────────────────────────────────────
const SLOT_COLORS = [0x26c6da, 0xff7043, 0xab47bc, 0x26a69a, 0xef5350, 0x42a5f5];
const WAIT_COLOR  = 0x90a4ae;

// ── Table stations (treatment zone) ───────────────────────────────────
const STATIONS = [
  { x: 130, y: 175 }, { x: 300, y: 175 }, { x: 470, y: 175 },
  { x: 130, y: 300 }, { x: 300, y: 300 }, { x: 470, y: 300 },
];

// ── Patrol bounds for waiting room dogs ───────────────────────────────
const WAIT_BOUNDS = { x1: 28, y1: 398, x2: 390, y2: 522 };

// ── Phaser Scene ──────────────────────────────────────────────────────
class ClinicScene extends Phaser.Scene {
  private sprites: Map<number, Phaser.GameObjects.Container> = new Map();

  constructor() { super({ key: 'ClinicScene' }); }

  create() {
    this.buildRoom();
  }

  // ── Room layout ───────────────────────────────────────────────────
  private buildRoom() {
    const W = 640, H = 540;

    // ── Floor tiles: treatment zone ──
    this.drawTiles(0, 48, W, 330, 0xf0ebe0, 0xe8e1d3, 32);

    // ── Floor tiles: waiting zone ──
    this.drawTiles(0, 378, W, 162, 0xfbf4e8, 0xf3e9d8, 32);

    // ── Outer walls ──
    const walls = this.add.graphics();
    walls.fillStyle(0x0f1e3d);
    walls.fillRect(0, 0, W, 48);          // top header
    walls.fillRect(0, 48, 12, 330);        // left wall treatment
    walls.fillRect(W - 12, 48, 12, 330);   // right wall treatment
    walls.fillRect(0, 378, 12, 162);       // left wall waiting
    walls.fillRect(W - 12, 378, 12, 162);  // right wall waiting

    // ── Divider wall (treatment ↔ waiting) ──
    walls.fillStyle(0x1a2e5a);
    walls.fillRect(0, 368, 200, 20);       // left segment
    walls.fillRect(250, 368, 390, 20);     // right segment (doorway gap 200-250)

    // ── Doorway arch detail ──
    const arch = this.add.graphics();
    arch.lineStyle(2, 0x3ecad8, 0.8);
    arch.strokeRect(200, 363, 50, 15);

    // ── Header ──
    const hdr = this.add.graphics();
    hdr.fillStyle(0x3ecad8);
    hdr.fillRect(0, 44, W, 4);
    // Logo icon
    hdr.fillStyle(0x3ecad8);
    hdr.fillRoundedRect(10, 8, 32, 32, 7);
    hdr.fillStyle(0xffffff);
    hdr.fillCircle(26, 24, 8);
    hdr.fillStyle(0x0f1e3d);
    hdr.fillCircle(26, 24, 5);

    this.add.text(50, 24, 'FISIOCAN — Consulta Virtual', {
      fontFamily: 'Arial, sans-serif', fontSize: '14px',
      color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0, 0.5);

    // ── Zone labels ──
    this.add.text(20, 55, 'ZONA DE TRATAMIENTO', {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#94a3b8',
    });
    this.add.text(20, 382, 'SALA DE ESPERA', {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#94a3b8',
    });
    this.add.text(220, 356, 'ENTRADA', {
      fontFamily: 'Arial, sans-serif', fontSize: '8px', color: '#7dd3fc',
    }).setOrigin(0.5, 1);

    // ── Treatment tables ──
    STATIONS.forEach((s, i) => this.drawTable(s.x, s.y, i + 1));

    // ── Waiting benches ──
    this.drawBench(25, 420, 180);
    this.drawBench(25, 470, 160);

    // ── Reception desk ──
    this.drawReception(430, 388);

    // ── Decorations ──
    this.drawPlant(W - 22, 60); this.drawPlant(18, 60);
    this.drawPlant(W - 22, 500);
    this.drawWallArt(550, 62); this.drawWallArt(450, 62);
    this.drawWallArt(200, 62); this.drawWallArt(310, 62);

    // ── Shadow lines (depth) ──
    const depth = this.add.graphics();
    depth.fillStyle(0x000000, 0.04);
    depth.fillRect(0, 48, W, 6);
    depth.fillRect(0, 378, W, 5);
  }

  private drawTiles(ox: number, oy: number, w: number, h: number, c1: number, c2: number, sz: number) {
    const g = this.add.graphics();
    for (let y = oy; y < oy + h; y += sz) {
      for (let x = ox; x < ox + w; x += sz) {
        const even = (Math.floor(x / sz) + Math.floor(y / sz)) % 2 === 0;
        g.fillStyle(even ? c1 : c2);
        g.fillRect(x, y, sz, sz);
      }
    }
    // subtle grid lines
    g.lineStyle(0.5, 0x000000, 0.06);
    for (let y = oy; y <= oy + h; y += sz) g.lineBetween(ox, y, ox + w, y);
    for (let x = ox; x <= ox + w; x += sz) g.lineBetween(x, oy, x, oy + h);
  }

  private drawTable(cx: number, cy: number, n: number) {
    const g = this.add.graphics();
    // Table legs shadow
    g.fillStyle(0x000000, 0.12);
    g.fillRect(cx - 46, cy - 2, 92, 42);
    // Table surface
    g.fillStyle(0xb2f5f5);
    g.fillRect(cx - 48, cy - 4, 96, 40);
    g.lineStyle(1.5, 0x2dd4bf);
    g.strokeRect(cx - 48, cy - 4, 96, 40);
    // Table edges (3D look)
    g.fillStyle(0x7ee8e8);
    g.fillRect(cx - 48, cy + 34, 96, 4);
    // Pillow
    g.fillStyle(0xe0fffe);
    g.fillRoundedRect(cx - 38, cy + 2, 76, 26, 5);
    g.lineStyle(1, 0x67e8f9, 0.5);
    g.strokeRoundedRect(cx - 38, cy + 2, 76, 26, 5);
    // Number
    this.add.text(cx, cy - 12, `M${n}`, {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#0891b2', fontStyle: 'bold',
    }).setOrigin(0.5);
  }

  private drawBench(x: number, y: number, w: number) {
    const g = this.add.graphics();
    g.fillStyle(0x000000, 0.1);
    g.fillRect(x + 2, y + 2, w, 22);
    g.fillStyle(0xc8955c);
    g.fillRect(x, y, w, 20);
    g.fillStyle(0xd4a574);
    g.fillRect(x + 2, y + 2, w - 4, 10);
    g.fillStyle(0x8b5e3c);
    [x + 8, x + w - 14].forEach(lx => g.fillRect(lx, y + 19, 6, 12));
  }

  private drawReception(x: number, y: number) {
    const g = this.add.graphics();
    // Desk shadow
    g.fillStyle(0x000000, 0.1);
    g.fillRect(x + 3, y + 3, 190, 140);
    // Desk body
    g.fillStyle(0x1e3a5f);
    g.fillRect(x, y, 190, 140);
    g.fillStyle(0x2d4a72);
    g.fillRect(x + 4, y + 4, 182, 70);
    // Monitor
    g.fillStyle(0x0f172a);
    g.fillRect(x + 18, y + 10, 72, 46);
    g.fillStyle(0x0ea5e9, 0.3);
    g.fillRect(x + 20, y + 12, 68, 42);
    g.lineStyle(1, 0x3ecad8, 0.5);
    g.strokeRect(x + 20, y + 12, 68, 42);
    // Keyboard
    g.fillStyle(0x0f1e3d);
    g.fillRoundedRect(x + 100, y + 34, 70, 20, 2);
    for (let i = 0; i < 4; i++) {
      g.fillStyle(0x1e3a5f);
      g.fillRect(x + 104 + i * 16, y + 38, 12, 7);
    }
    this.add.text(x + 95, y + 106, '📋 Recepción', {
      fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#7dd3fc',
    }).setOrigin(0.5);
  }

  private drawPlant(x: number, y: number) {
    const g = this.add.graphics();
    g.fillStyle(0x7d4c2a);
    g.fillRoundedRect(x - 8, y + 14, 16, 14, 3);
    g.fillStyle(0x2d6a2f);
    g.fillCircle(x, y, 14);
    g.fillStyle(0x388e3c);
    g.fillCircle(x - 6, y - 5, 9); g.fillCircle(x + 6, y - 5, 9);
    g.fillStyle(0x4caf50);
    g.fillCircle(x, y - 7, 7);
    g.fillStyle(0x66bb6a);
    g.fillCircle(x, y - 10, 5);
  }

  private drawWallArt(x: number, y: number) {
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.85);
    g.fillRoundedRect(x, y, 52, 28, 4);
    g.lineStyle(1, 0xb0c4d8, 0.8);
    g.strokeRoundedRect(x, y, 52, 28, 4);
    const data = [{ c: 0x26c6da, h: 16 }, { c: 0x42a5f5, h: 10 }, { c: 0xef5350, h: 20 }, { c: 0x66bb6a, h: 13 }];
    data.forEach(({ c, h }, i) => {
      g.fillStyle(c);
      g.fillRect(x + 6 + i * 11, y + 28 - h, 8, h);
    });
  }

  // ── Patient sprites ──────────────────────────────────────────────
  setPatients(patients: Patient[], onClick: (p: Patient) => void) {
    _onPatientClick = onClick;
    this.sprites.forEach(c => { this.tweens.killTweensOf(c); c.destroy(); });
    this.sprites.clear();

    const active   = patients.filter(p => p.active);
    const inactive = patients.filter(p => !p.active);

    // Treatment stations (stationary, lying on table)
    active.slice(0, STATIONS.length).forEach((p, i) => {
      const s = STATIONS[i];
      this.buildPatient(p, s.x, s.y - 50, SLOT_COLORS[i % SLOT_COLORS.length], 'table');
    });

    // Waiting room (walking patrol)
    const waiting = [...active.slice(STATIONS.length), ...inactive];
    waiting.slice(0, 6).forEach((p, i) => {
      const startX = WAIT_BOUNDS.x1 + 40 + i * 55;
      const startY = WAIT_BOUNDS.y1 + 30 + (i % 2) * 40;
      this.buildPatient(p, startX, startY, WAIT_COLOR, 'wait');
    });
  }

  private buildPatient(patient: Patient, x: number, y: number, color: number, mode: 'table' | 'wait') {
    const outer = this.add.container(x, y);
    const isDog = !['gato', 'cat', 'felino'].some(k =>
      (patient.species || '').toLowerCase().includes(k)
    );

    // ── Inner sprite (flippable) ──
    const inner = this.add.container(0, 0);
    outer.add(inner);

    const rgb = Phaser.Display.Color.IntegerToRGB(color);
    const ear  = Phaser.Display.Color.GetColor(
      Math.max(0, rgb.r - 50), Math.max(0, rgb.g - 50), Math.max(0, rgb.b - 50)
    );

    const body = this.add.graphics();

    // Shadow
    body.fillStyle(0x000000, 0.14);
    body.fillEllipse(1, 26, 38, 12);

    // Pulse ring (active)
    if (mode === 'table') {
      const pulse = this.add.graphics();
      pulse.lineStyle(2, color, 0.5);
      pulse.strokeCircle(0, 0, 28);
      inner.add(pulse);
      this.tweens.add({
        targets: pulse, alpha: 0, scaleX: 1.6, scaleY: 1.6,
        duration: 1800, repeat: -1, ease: 'Sine.easeOut',
      });
    }

    // Ears
    if (isDog) {
      body.fillStyle(ear);
      body.fillEllipse(-17, -8, 16, 24); // left ear (floppy)
      body.fillEllipse(17, -8, 16, 24);  // right ear (floppy)
    } else {
      body.fillStyle(ear);
      body.fillTriangle(-19, -4, -10, -4, -15, -22); // cat ear left
      body.fillTriangle(10, -4, 19, -4, 15, -22);    // cat ear right
    }

    // Head
    body.fillStyle(color);
    body.fillCircle(0, 0, 19);

    // Eyes
    body.fillStyle(0x1a2e5a);
    body.fillCircle(-5.5, -3, 3.5); body.fillCircle(5.5, -3, 3.5);
    body.fillStyle(0xffffff);
    body.fillCircle(-4.5, -4.5, 1.5); body.fillCircle(6.5, -4.5, 1.5);

    // Nose
    body.fillStyle(0x1a2e5a);
    if (isDog) {
      body.fillRoundedRect(-4.5, 5, 9, 6, 2);
      // Smile lines
      body.fillStyle(0x000000, 0.3);
      body.fillRect(-4, 11, 3, 2);
      body.fillRect(1, 11, 3, 2);
    } else {
      body.fillTriangle(0, 10, -4, 5, 4, 5);
    }

    inner.add(body);

    // Tail (wagging)
    const tail = this.add.graphics();
    if (isDog) {
      tail.fillStyle(ear);
      tail.fillEllipse(22, 6, 18, 8);
    } else {
      tail.fillStyle(ear);
      tail.fillEllipse(22, 8, 20, 6);
    }
    inner.add(tail);

    // Status dot
    if (mode === 'table') {
      const dot = this.add.graphics();
      dot.fillStyle(0x22c55e);
      dot.fillCircle(15, -16, 5);
      dot.lineStyle(2, 0xffffff);
      dot.strokeCircle(15, -16, 5);
      inner.add(dot);
    }

    // ── Name badge (stays upright even when inner flips) ──
    const label = patient.name.length > 9 ? patient.name.substring(0, 8) + '…' : patient.name;
    const bw = Math.max(46, label.length * 7 + 16);
    const badge = this.add.graphics();
    badge.fillStyle(0x0f1e3d, 0.9);
    badge.fillRoundedRect(-bw / 2, 25, bw, 18, 5);
    outer.add(badge);
    outer.add(this.add.text(0, 34, label, {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#e2e8f0',
    }).setOrigin(0.5));

    // ── Hover ring ──
    const ring = this.add.graphics();
    ring.lineStyle(3, color, 0.9);
    ring.strokeCircle(0, 0, 26);
    ring.setVisible(false);
    outer.add(ring);

    // ── Interaction ──
    outer.setSize(64, 86).setInteractive({ useHandCursor: true });
    outer.on('pointerover', () => {
      ring.setVisible(true);
      this.tweens.add({ targets: outer, scaleX: 1.1, scaleY: 1.1, duration: 110 });
    });
    outer.on('pointerout', () => {
      ring.setVisible(false);
      this.tweens.add({ targets: outer, scaleX: 1, scaleY: 1, duration: 110 });
    });
    outer.on('pointerdown', () => {
      _onPatientClick?.(patient);
      this.tweens.add({ targets: outer, scaleX: 0.88, scaleY: 0.88, duration: 75, yoyo: true });
    });

    // ── Animations ──
    if (mode === 'table') {
      // Idle bob on table
      this.tweens.add({
        targets: inner, y: -4,
        duration: 1600 + Math.random() * 600, yoyo: true,
        repeat: -1, ease: 'Sine.easeInOut',
        delay: Math.random() * 1000,
      });
      // Tail wag
      this.tweens.add({
        targets: tail, rotation: 0.3,
        duration: 300, yoyo: true,
        repeat: -1, ease: 'Sine.easeInOut',
        delay: Math.random() * 500,
      });
    } else {
      // Tail wag always
      this.tweens.add({
        targets: tail, rotation: 0.4,
        duration: 260, yoyo: true, repeat: -1,
        ease: 'Sine.easeInOut', delay: Math.random() * 400,
      });
      // Patrol walk
      this.patrol(outer, inner);
    }

    this.sprites.set(patient.id, outer);
  }

  private patrol(outer: Phaser.GameObjects.Container, inner: Phaser.GameObjects.Container) {
    const walk = () => {
      if (!outer.active) return;

      const tx = Phaser.Math.Between(WAIT_BOUNDS.x1 + 10, WAIT_BOUNDS.x2);
      const ty = Phaser.Math.Between(WAIT_BOUNDS.y1 + 10, WAIT_BOUNDS.y2);
      const dist = Phaser.Math.Distance.Between(outer.x, outer.y, tx, ty);
      const duration = Math.max(800, (dist / 55) * 1000);

      // Face direction of travel
      if (Math.abs(tx - outer.x) > 4) {
        inner.setScale(tx < outer.x ? -1 : 1, 1);
      }

      // Step bob tween on inner while walking
      const stepTween = this.tweens.add({
        targets: inner, y: -3,
        duration: 160, yoyo: true,
        repeat: Math.floor(duration / 320),
        ease: 'Sine.easeInOut',
      });

      this.tweens.add({
        targets: outer, x: tx, y: ty,
        duration,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          stepTween.stop();
          inner.setY(0);
          this.time.delayedCall(
            Phaser.Math.Between(1200, 3500),
            () => { if (outer.active) walk(); }
          );
        },
      });
    };

    this.time.delayedCall(Math.random() * 2200, walk);
  }
}

// ── React Component ────────────────────────────────────────────────────
export default function VirtualClinicPage() {
  const navigate  = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameRef   = useRef<Phaser.Game | null>(null);
  const [selected, setSelected] = useState<Patient | null>(null);

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn:  () => api.get('/patients'),
  });

  // Init Phaser once
  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: canvasRef.current,
      width: 640, height: 540,
      backgroundColor: '#f0ebe0',
      scene: [ClinicScene],
      roundPixels: true,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    });
    gameRef.current = game;
    return () => { game.destroy(true); gameRef.current = null; _onPatientClick = null; };
  }, []);

  // Push patients into scene whenever query updates
  const handleClick = useCallback((p: Patient) => setSelected(p), []);

  useEffect(() => {
    if (!gameRef.current || patients.length === 0) return;
    const trySet = () => {
      const scene = gameRef.current?.scene.getScene('ClinicScene') as ClinicScene | null;
      if (scene?.sys.isActive()) {
        scene.setPatients(patients, handleClick);
      } else {
        setTimeout(trySet, 200);
      }
    };
    trySet();
  }, [patients, handleClick]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Canvas area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 pt-4 pb-2 md:px-6 md:pt-6">
          <h1 className="text-xl font-bold text-navy-700">Consulta Virtual</h1>
          <p className="text-navy-400 text-sm mt-0.5">
            {patients.filter(p => p.active).length} en tratamiento ·{' '}
            {patients.filter(p => !p.active).length} en espera
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-2 md:p-4 min-h-0">
          <div
            ref={canvasRef}
            className="rounded-2xl overflow-hidden shadow-xl border border-navy-100"
            style={{ width: 640, height: 540, maxWidth: '100%' }}
          />
        </div>
        <p className="text-center text-xs text-navy-300 pb-2">
          Haz clic en un paciente para ver su ficha
        </p>
      </div>

      {/* Patient side panel */}
      {selected && (
        <aside className="w-80 bg-white border-l border-navy-100 flex flex-col shadow-xl animate-slide-in overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-navy-50">
            <h2 className="font-bold text-navy-700">Ficha del paciente</h2>
            <button onClick={() => setSelected(null)}
              className="p-1 text-navy-300 hover:text-navy-700 rounded-lg hover:bg-navy-50 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4 flex-1">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <PawPrint size={22} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-navy-700 text-lg leading-tight">{selected.name}</h3>
                <p className="text-sm text-navy-400">
                  {selected.species}{selected.breed ? ` · ${selected.breed}` : ''}
                </p>
                <span className={`${selected.active ? 'badge-green' : 'badge-gray'} mt-1.5 inline-block`}>
                  {selected.active ? 'En tratamiento' : 'En espera'}
                </span>
              </div>
            </div>

            <div className="card !p-3 !rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-navy-400 uppercase tracking-wide">
                <Users size={12} /> Propietario
              </div>
              <p className="font-semibold text-navy-700">{selected.tutor.name}</p>
              <p className="text-sm text-navy-400">{selected.tutor.phone}</p>
              {selected.tutor.email && <p className="text-xs text-navy-300">{selected.tutor.email}</p>}
            </div>

            {selected._count && (
              <div className="card !p-3 !rounded-xl">
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <CalendarDays size={14} />
                  {selected._count.appointments} cita{selected._count.appointments !== 1 ? 's' : ''} registrada{selected._count.appointments !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-navy-50 space-y-2">
            <button
              onClick={() => navigate(`/chat/${selected.tutor.id}`)}
              className="btn-secondary w-full justify-center"
            >
              <MessageSquare size={16} />
              Chatear con {selected.tutor.name.split(' ')[0]}
            </button>
            <button
              onClick={() => navigate(`/patients/${selected.id}`)}
              className="btn-ghost w-full justify-center"
            >
              <Activity size={16} /> Ver historial completo
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
