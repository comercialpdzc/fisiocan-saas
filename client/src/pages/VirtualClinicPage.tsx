import { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { X, MessageSquare, PawPrint, CalendarDays, Activity, Users } from 'lucide-react';
import Phaser from 'phaser';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ── Types ──────────────────────────────────────────────────────────────
interface Patient {
  id: number;
  name: string;
  species: string;
  breed?: string;
  active: boolean;
  tutor: { id: number; name: string; phone: string; email?: string };
  _count?: { appointments: number };
}

// ── Constants ──────────────────────────────────────────────────────────
const COLORS = [0x26c6da, 0xff7043, 0xab47bc, 0x26a69a, 0xef5350, 0x42a5f5, 0xffb300, 0x66bb6a];

const STATIONS = [
  { x: 148, y: 178 }, { x: 316, y: 178 }, { x: 484, y: 178 },
  { x: 148, y: 310 }, { x: 316, y: 310 }, { x: 484, y: 310 },
];

const WAITING = [
  { x: 76, y: 456 }, { x: 130, y: 456 },
  { x: 184, y: 456 }, { x: 238, y: 456 }, { x: 292, y: 456 },
];

// ── Global callback (Phaser → React) ──────────────────────────────────
let _onPatientClick: ((p: Patient) => void) | null = null;

// ── Phaser Scene ───────────────────────────────────────────────────────
class ClinicScene extends Phaser.Scene {
  private sprites: Map<number, Phaser.GameObjects.Container> = new Map();

  constructor() { super({ key: 'ClinicScene' }); }

  create() {
    this.buildRoom();
  }

  private buildRoom() {
    const W = 660, H = 540;

    // ── Floor ──
    const f = this.add.graphics();
    f.fillStyle(0xf5f1eb);
    f.fillRect(0, 48, W, H - 48);
    f.lineStyle(1, 0xe5ddd0, 0.7);
    for (let x = 0; x < W; x += 32) f.lineBetween(x, 48, x, H);
    for (let y = 48; y < H; y += 32) f.lineBetween(0, y, W, y);

    // ── Top wall + header ──
    const wall = this.add.graphics();
    wall.fillStyle(0x0f1e3d);
    wall.fillRect(0, 0, W, 48);
    wall.fillStyle(0x3ecad8);
    wall.fillRect(0, 44, W, 4);
    // Logo dot
    wall.fillStyle(0x3ecad8);
    wall.fillRoundedRect(10, 9, 30, 30, 6);
    wall.fillStyle(0xffffff);
    wall.fillCircle(25, 24, 7);
    wall.fillStyle(0x0f1e3d);
    wall.fillCircle(25, 24, 4);

    this.add.text(48, 24, 'FISIOCAN — Consulta Virtual', {
      fontSize: '14px', fontFamily: 'monospace', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0, 0.5);

    this.add.text(W - 10, 24, '🏥 Clínica', {
      fontSize: '10px', fontFamily: 'monospace', color: '#7dd3fc',
    }).setOrigin(1, 0.5);

    // ── Room divider ──
    const div = this.add.graphics();
    div.lineStyle(2, 0xb0c4de, 0.7);
    div.lineBetween(0, 376, W * 0.52, 376);
    div.lineBetween(W * 0.60, 376, W, 376);

    // ── Section labels ──
    this.add.text(8, 52, 'ZONA DE TRATAMIENTO', {
      fontSize: '8px', fontFamily: 'monospace', color: '#94a3b8',
    });
    this.add.text(8, 380, 'SALA DE ESPERA', {
      fontSize: '8px', fontFamily: 'monospace', color: '#94a3b8',
    });

    // ── Treatment tables ──
    STATIONS.forEach((s, i) => this.drawTable(s.x, s.y, i + 1));

    // ── Waiting bench ──
    this.drawBench(44, 422, 290);

    // ── Reception desk ──
    this.drawReception(470, 395, W);

    // ── Decorations ──
    this.drawPlant(626, 70); this.drawPlant(626, 488);
    this.drawPlant(14, 488);
    this.drawWallArt(290, 62); this.drawWallArt(430, 62);
    this.drawWallArt(560, 62);
  }

  private drawTable(cx: number, cy: number, n: number) {
    const g = this.add.graphics();
    g.fillStyle(0x000000, 0.07);
    g.fillRoundedRect(cx - 42, cy - 3, 84, 38, 6);
    g.fillStyle(0xa5f3f0);
    g.fillRoundedRect(cx - 44, cy - 5, 88, 38, 7);
    g.lineStyle(1.5, 0x3ecad8);
    g.strokeRoundedRect(cx - 44, cy - 5, 88, 38, 7);
    g.fillStyle(0xe0fffe);
    g.fillRoundedRect(cx - 36, cy + 2, 72, 24, 5);
    this.add.text(cx, cy - 14, `Mesa ${n}`, {
      fontSize: '8px', fontFamily: 'monospace', color: '#0891b2',
    }).setOrigin(0.5);
  }

  private drawBench(x: number, y: number, w: number) {
    const g = this.add.graphics();
    g.fillStyle(0xd4a574);
    g.fillRoundedRect(x, y, w, 24, 6);
    g.fillStyle(0xc8956c);
    g.fillRoundedRect(x + 2, y + 2, w - 4, 14, 4);
    g.fillStyle(0x8b5e3c);
    [10, w - 18].forEach(ox => g.fillRect(x + ox, y + 22, 8, 14));
  }

  private drawReception(x: number, y: number, W: number) {
    const g = this.add.graphics();
    g.fillStyle(0x1e3a5f);
    g.fillRoundedRect(x, y, W - x - 10, 110, 10);
    g.fillStyle(0x2d4a72);
    g.fillRoundedRect(x + 5, y + 5, W - x - 20, 55, 8);
    g.fillStyle(0x0ea5e9, 0.25);
    g.fillRoundedRect(x + 18, y + 12, 62, 34, 4);
    g.lineStyle(1, 0x3ecad8, 0.5);
    g.strokeRoundedRect(x + 18, y + 12, 62, 34, 4);
    g.fillStyle(0x0f1e3d);
    g.fillRoundedRect(x + 88, y + 32, 52, 16, 2);
    this.add.text(x + (W - x - 10) / 2, y + 82, '📋 Recepción', {
      fontSize: '11px', fontFamily: 'monospace', color: '#7dd3fc',
    }).setOrigin(0.5);
  }

  private drawPlant(x: number, y: number) {
    const g = this.add.graphics();
    g.fillStyle(0x7d4c2a);
    g.fillRoundedRect(x - 8, y + 14, 16, 12, 3);
    g.fillStyle(0x388e3c);
    g.fillCircle(x, y, 14);
    g.fillStyle(0x4caf50);
    g.fillCircle(x - 6, y - 6, 9);
    g.fillCircle(x + 6, y - 6, 9);
    g.fillStyle(0x66bb6a);
    g.fillCircle(x, y - 8, 7);
  }

  private drawWallArt(x: number, y: number) {
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.9);
    g.fillRoundedRect(x, y, 48, 30, 4);
    g.lineStyle(1, 0xb0c4d8);
    g.strokeRoundedRect(x, y, 48, 30, 4);
    const bars = [{ c: 0x26c6da, h: 16 }, { c: 0x42a5f5, h: 10 }, { c: 0xef5350, h: 20 }, { c: 0x66bb6a, h: 13 }];
    bars.forEach(({ c, h }, i) => {
      g.fillStyle(c);
      g.fillRect(x + 5 + i * 10, y + 30 - h, 7, h);
    });
  }

  // ── Patient sprites ────────────────────────────────────────────────
  setPatients(patients: Patient[], onClick: (p: Patient) => void) {
    _onPatientClick = onClick;
    this.sprites.forEach(c => { this.tweens.killTweensOf(c); c.destroy(); });
    this.sprites.clear();

    const active = patients.filter(p => p.active);
    const inactive = patients.filter(p => !p.active);

    active.slice(0, STATIONS.length).forEach((p, i) => {
      const s = STATIONS[i];
      this.spawnPatient(p, s.x, s.y - 56, COLORS[i % COLORS.length], true);
    });

    const waiting = [...active.slice(STATIONS.length), ...inactive].slice(0, WAITING.length);
    waiting.forEach((p, i) => this.spawnPatient(p, WAITING[i].x, WAITING[i].y, 0x90a4ae, false));
  }

  private spawnPatient(patient: Patient, x: number, y: number, color: number, active: boolean) {
    const ctr = this.add.container(x, y);
    const rgb = Phaser.Display.Color.IntegerToRGB(color);
    const earColor = Phaser.Display.Color.GetColor(
      Math.max(0, rgb.r - 45), Math.max(0, rgb.g - 45), Math.max(0, rgb.b - 45)
    );
    const isDog = !['gato', 'cat', 'felino'].some(k => (patient.species || '').toLowerCase().includes(k));

    // Shadow
    const sh = this.add.graphics();
    sh.fillStyle(0x000000, 0.12);
    sh.fillEllipse(1, 26, 34, 10);
    ctr.add(sh);

    // Pulse ring for active
    if (active) {
      const pulse = this.add.graphics();
      pulse.lineStyle(2, color, 0.5);
      pulse.strokeCircle(0, 0, 26);
      ctr.add(pulse);
      this.tweens.add({
        targets: pulse, alpha: 0, scaleX: 1.5, scaleY: 1.5,
        duration: 1600, repeat: -1, ease: 'Sine.easeOut',
      });
    }

    // Hover ring (hidden default)
    const ring = this.add.graphics();
    ring.lineStyle(2.5, color, 0.9);
    ring.strokeCircle(0, 0, 24);
    ring.setVisible(false);
    ctr.add(ring);

    // Body
    const body = this.add.graphics();
    if (isDog) {
      body.fillStyle(earColor);
      body.fillEllipse(-16, -7, 14, 20);
      body.fillEllipse(16, -7, 14, 20);
    } else {
      body.fillStyle(earColor);
      body.fillTriangle(-18, -5, -10, -5, -14, -20);
      body.fillTriangle(10, -5, 18, -5, 14, -20);
    }
    body.fillStyle(color);
    body.fillCircle(0, 0, 18);
    // Eyes
    body.fillStyle(0x1a2e5a);
    body.fillCircle(-5, -2, 3.5);
    body.fillCircle(5, -2, 3.5);
    body.fillStyle(0xffffff);
    body.fillCircle(-4, -3.5, 1.5);
    body.fillCircle(6, -3.5, 1.5);
    // Nose
    body.fillStyle(0x1a2e5a);
    if (isDog) body.fillRoundedRect(-4, 5, 8, 5, 2);
    else body.fillTriangle(0, 9, -4, 5, 4, 5);
    // Smile
    body.fillCircle(-5, 12, 2);
    body.fillCircle(5, 12, 2);
    ctr.add(body);

    // Status dot
    if (active) {
      const dot = this.add.graphics();
      dot.fillStyle(0x22c55e);
      dot.fillCircle(15, -14, 5);
      dot.lineStyle(1.5, 0xffffff);
      dot.strokeCircle(15, -14, 5);
      ctr.add(dot);
    }

    // Name badge
    const name = patient.name.length > 9 ? patient.name.substring(0, 8) + '…' : patient.name;
    const bw = Math.max(48, name.length * 7 + 14);
    const badge = this.add.graphics();
    badge.fillStyle(0x0f1e3d, 0.88);
    badge.fillRoundedRect(-bw / 2, 23, bw, 18, 5);
    ctr.add(badge);
    ctr.add(this.add.text(0, 32, name, {
      fontSize: '9px', fontFamily: 'monospace', color: '#e2e8f0',
    }).setOrigin(0.5));

    // Interaction
    ctr.setSize(62, 84).setInteractive({ useHandCursor: true });

    ctr.on('pointerover', () => {
      ring.setVisible(true);
      this.tweens.add({ targets: ctr, scaleX: 1.1, scaleY: 1.1, duration: 120 });
    });
    ctr.on('pointerout', () => {
      ring.setVisible(false);
      this.tweens.add({ targets: ctr, scaleX: 1, scaleY: 1, duration: 120 });
    });
    ctr.on('pointerdown', () => {
      _onPatientClick?.(patient);
      this.tweens.add({ targets: ctr, scaleX: 0.88, scaleY: 0.88, duration: 80, yoyo: true });
    });

    // Idle float
    this.tweens.add({
      targets: ctr, y: y - 5,
      duration: 1400 + Math.random() * 700,
      yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      delay: Math.random() * 1200,
    });

    this.sprites.set(patient.id, ctr);
  }
}

// ── React Component ────────────────────────────────────────────────────
export default function VirtualClinicPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [selected, setSelected] = useState<Patient | null>(null);

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: () => api.get('/patients'),
  });

  // Init Phaser once
  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 660,
      height: 540,
      backgroundColor: '#f5f1eb',
      scene: [ClinicScene],
      roundPixels: true,
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });
    gameRef.current = game;
    return () => { game.destroy(true); gameRef.current = null; _onPatientClick = null; };
  }, []);

  // Pass patients to scene whenever they load
  const handleClick = useCallback((p: Patient) => setSelected(p), []);

  useEffect(() => {
    if (!gameRef.current || patients.length === 0) return;
    const trySet = () => {
      const scene = gameRef.current!.scene.getScene('ClinicScene') as ClinicScene | null;
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
      {/* Game canvas */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4 md:p-6 pb-2">
          <h1 className="text-xl font-bold text-navy-700">Consulta Virtual</h1>
          <p className="text-navy-400 text-sm mt-0.5">
            {patients.filter(p => p.active).length} pacientes activos ·{' '}
            {patients.filter(p => !p.active).length} inactivos
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-2 md:p-4 min-h-0">
          <div
            ref={containerRef}
            className="rounded-2xl overflow-hidden shadow-xl border border-navy-100"
            style={{ width: '660px', height: '540px', maxWidth: '100%' }}
          />
        </div>
        <p className="text-center text-xs text-navy-300 pb-2">
          Haz clic en un paciente para ver su ficha y abrir el chat
        </p>
      </div>

      {/* Patient panel */}
      {selected && (
        <aside className="w-80 bg-white border-l border-navy-100 flex flex-col shadow-xl animate-slide-in overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-navy-50">
            <h2 className="font-bold text-navy-700">Ficha</h2>
            <button onClick={() => setSelected(null)} className="p-1 text-navy-300 hover:text-navy-700 rounded-lg hover:bg-navy-50 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-4 flex-1 space-y-4">
            {/* Patient info */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <PawPrint size={22} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-navy-700 text-lg">{selected.name}</h3>
                <p className="text-sm text-navy-400">
                  {selected.species}{selected.breed ? ` · ${selected.breed}` : ''}
                </p>
                <span className={selected.active ? 'badge-green mt-1' : 'badge-gray mt-1'}>
                  {selected.active ? 'En tratamiento' : 'Inactivo'}
                </span>
              </div>
            </div>

            {/* Tutor */}
            <div className="card !p-3 !rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-navy-600">
                <Users size={14} /> Propietario
              </div>
              <p className="font-medium text-navy-700">{selected.tutor.name}</p>
              <p className="text-sm text-navy-400">{selected.tutor.phone}</p>
              {selected.tutor.email && <p className="text-xs text-navy-300">{selected.tutor.email}</p>}
            </div>

            {/* Appointments count */}
            {selected._count && (
              <div className="card !p-3 !rounded-xl">
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <CalendarDays size={14} />
                  <span>{selected._count.appointments} cita{selected._count.appointments !== 1 ? 's' : ''} registrada{selected._count.appointments !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-navy-50 space-y-2">
            <button
              onClick={() => navigate(`/chat/${selected.tutor.id}`)}
              className="btn-secondary w-full justify-center"
            >
              <MessageSquare size={16} /> Chatear con {selected.tutor.name.split(' ')[0]}
            </button>
            <Link
              to={`/patients/${selected.id}`}
              className="btn-ghost w-full justify-center"
            >
              <Activity size={16} /> Ver historial completo
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
