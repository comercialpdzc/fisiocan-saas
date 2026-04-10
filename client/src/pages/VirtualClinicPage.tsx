import { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { X, MessageSquare, PawPrint, Activity, Users, CalendarDays } from 'lucide-react';
import Phaser from 'phaser';
import { api } from '../lib/api';

// ── Types ─────────────────────────────────────────────────────────────
interface Patient {
  id: number; name: string; species: string; breed?: string;
  active: boolean;
  tutor: { id: number; name: string; phone: string; email?: string };
  _count?: { appointments: number };
}

let _onClick: ((p: Patient) => void) | null = null;

// ── Layout constants ──────────────────────────────────────────────────
const W = 640, H = 520;
const WALL_W = 22;   // side wall thickness
const TOP_W  = 30;   // top/bottom wall thickness
const HDR_H  = 44;   // header bar height
const MID_Y  = 322;  // middle wall top
const MID_H  = 28;   // middle wall height
const DOOR_X = 190, DOOR_W = 56; // doorway in middle wall

const COLORS = [0x26c6da, 0xff7043, 0xab47bc, 0x26a69a, 0xef5350, 0x42a5f5];

const STATIONS = [
  { x: 130, y: 162 }, { x: 308, y: 162 }, { x: 486, y: 162 },
  { x: 130, y: 272 }, { x: 308, y: 272 }, { x: 486, y: 272 },
];

const WAIT_BOUNDS = {
  x1: WALL_W + 10, y1: MID_Y + MID_H + 10,
  x2: 395, y2: H - TOP_W - 10,
};

// ── Phaser scene ──────────────────────────────────────────────────────
class ClinicScene extends Phaser.Scene {
  private sprites = new Map<number, Phaser.GameObjects.Container>();

  constructor() { super({ key: 'ClinicScene' }); }

  create() {
    this.makeTextures();
    this.buildRoom();
  }

  // ── Procedural tile textures ────────────────────────────────────
  private makeTextures() {
    const make = (key: string, fill: number, grout: number) => {
      const g = this.make.graphics({ x: 0, y: 0 } as Phaser.Types.GameObjects.Graphics.Options);
      g.fillStyle(fill);
      g.fillRect(0, 0, 32, 32);
      g.fillStyle(grout);
      g.fillRect(0, 31, 32, 1);
      g.fillRect(31, 0, 1, 32);
      g.generateTexture(key, 32, 32);
      g.destroy();
    };
    make('tile-treat', 0xcdcdc4, 0xb8b8b0);
    make('tile-wait',  0xd4d0c4, 0xc4c0b4);
  }

  // ── Room ────────────────────────────────────────────────────────
  private buildRoom() {
    // ── Floors (tiled sprites) ──
    const treatY = HDR_H + TOP_W;
    const treatH = MID_Y - treatY;
    const waitY  = MID_Y + MID_H;
    const waitH  = H - TOP_W - waitY;

    this.add.tileSprite(WALL_W, treatY, W - WALL_W * 2, treatH, 'tile-treat').setOrigin(0, 0);
    this.add.tileSprite(WALL_W, waitY,  W - WALL_W * 2, waitH,  'tile-wait').setOrigin(0, 0);

    // ── Header bar ──
    const hdr = this.add.graphics();
    hdr.fillStyle(0x0f1e3d);
    hdr.fillRect(0, 0, W, HDR_H);
    hdr.fillStyle(0x3ecad8);
    hdr.fillRect(0, HDR_H - 4, W, 4);
    hdr.fillStyle(0x3ecad8);
    hdr.fillRoundedRect(10, 7, 30, 30, 6);
    hdr.fillStyle(0xffffff);
    hdr.fillCircle(25, 22, 7);
    hdr.fillStyle(0x0f1e3d);
    hdr.fillCircle(25, 22, 4);
    this.add.text(48, 22, 'FISIOCAN — Consulta Virtual', {
      fontFamily: 'Arial, sans-serif', fontSize: '14px',
      color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0, 0.5);

    // ── Outer walls ──
    this.wall(0, HDR_H, WALL_W, H - HDR_H);                // left
    this.wall(W - WALL_W, HDR_H, WALL_W, H - HDR_H);       // right
    this.wall(0, HDR_H, W, TOP_W);                          // top (treatment)
    this.wall(0, H - TOP_W, W, TOP_W);                      // bottom

    // ── Middle wall ──
    this.wall(0, MID_Y, DOOR_X, MID_H);                              // left of door
    this.wall(DOOR_X + DOOR_W, MID_Y, W - DOOR_X - DOOR_W, MID_H);  // right of door

    // ── Doorway ──
    const door = this.add.graphics();
    door.fillStyle(0xc8a87a);
    door.fillRect(DOOR_X, MID_Y, DOOR_W, MID_H);
    door.lineStyle(2, 0xa8885a);
    door.strokeRect(DOOR_X, MID_Y, DOOR_W, MID_H);

    // ── Zone labels ──
    this.add.text(WALL_W + 6, HDR_H + TOP_W + 4, 'ZONA DE TRATAMIENTO', {
      fontFamily: 'Arial, sans-serif', fontSize: '8px', color: '#888',
    });
    this.add.text(WALL_W + 6, MID_Y + MID_H + 4, 'SALA DE ESPERA', {
      fontFamily: 'Arial, sans-serif', fontSize: '8px', color: '#888',
    });
    this.add.text(DOOR_X + DOOR_W / 2, MID_Y + MID_H / 2, 'ENTRADA', {
      fontFamily: 'Arial, sans-serif', fontSize: '7px', color: '#a07040',
    }).setOrigin(0.5, 0.5);

    // ── Exam tables ──
    STATIONS.forEach((s, i) => this.examTable(s.x, s.y, i + 1));

    // ── Wall art on top wall ──
    [80, 180, 340, 440, 560].forEach(px => this.poster(px, HDR_H + TOP_W / 2));

    // ── Waiting furniture ──
    this.bench(WALL_W + 6, MID_Y + MID_H + 16, 180);
    this.bench(WALL_W + 6, MID_Y + MID_H + 60, 140);

    // ── Reception desk ──
    this.reception(410, MID_Y + MID_H + 6);

    // ── Plants ──
    [
      { x: W - WALL_W - 14, y: HDR_H + TOP_W + 20 },
      { x: WALL_W + 14,     y: HDR_H + TOP_W + 20 },
      { x: W - WALL_W - 14, y: H - TOP_W - 22 },
      { x: WALL_W + 14,     y: H - TOP_W - 22 },
    ].forEach(p => this.plant(p.x, p.y));

    // ── Intra-floor shadows ──
    const sh = this.add.graphics();
    sh.fillStyle(0x000000, 0.045);
    sh.fillRect(WALL_W, HDR_H + TOP_W, W - WALL_W * 2, 8);
    sh.fillRect(WALL_W, MID_Y + MID_H, W - WALL_W * 2, 7);
    sh.fillRect(WALL_W, treatY, 8, treatH);
    sh.fillRect(W - WALL_W - 8, treatY, 8, treatH);
  }

  // ── Wall drawing (RPG-Maker style) ──────────────────────────────
  private wall(x: number, y: number, w: number, h: number) {
    const g = this.add.graphics();
    g.fillStyle(0x3a3a3a);
    g.fillRect(x, y, w, 3);           // top dark cap
    g.fillStyle(0x787878);
    g.fillRect(x, y + 3, w, 12);      // wall cap surface
    g.fillStyle(0x909090);
    g.fillRect(x, y + 15, w, h - 15); // wall face
    g.fillStyle(0x000000, 0.18);
    g.fillRect(x, y + h - 4, w, 4);   // bottom shadow
  }

  // ── Furniture ──────────────────────────────────────────────────
  private examTable(cx: number, cy: number, n: number) {
    const g = this.add.graphics();
    // Side depth (RPG top-down 3D)
    g.fillStyle(0x50a8b8);
    g.fillRect(cx - 46, cy + 12, 92, 10);
    g.fillRect(cx - 46, cy + 20, 8, 4);    // leg
    g.fillRect(cx + 38, cy + 20, 8, 4);    // leg
    // Table top
    g.fillStyle(0x98dce8);
    g.fillRect(cx - 46, cy - 8, 92, 20);
    g.lineStyle(1.5, 0x2bb8d0);
    g.strokeRect(cx - 46, cy - 8, 92, 20);
    // Pillow/mat
    g.fillStyle(0xeafafd);
    g.fillRoundedRect(cx - 38, cy - 4, 76, 12, 4);
    g.lineStyle(1, 0x6acedd, 0.5);
    g.strokeRoundedRect(cx - 38, cy - 4, 76, 12, 4);
    this.add.text(cx, cy - 16, `M${n}`, {
      fontFamily: 'Arial, sans-serif', fontSize: '9px',
      color: '#0891b2', fontStyle: 'bold',
    }).setOrigin(0.5);
  }

  private bench(x: number, y: number, w: number) {
    const g = this.add.graphics();
    g.fillStyle(0x6a4828);
    g.fillRect(x, y + 16, w, 8);        // depth/side
    g.fillStyle(0xb07840);
    g.fillRect(x, y, w, 16);            // seat top
    g.fillStyle(0xc09050);
    g.fillRect(x + 2, y + 2, w - 4, 8); // highlight
    g.lineStyle(0.5, 0x886030, 0.6);
    for (let i = 16; i < w; i += 16) g.lineBetween(x + i, y, x + i, y + 16);
    // Legs
    g.fillStyle(0x000000, 0.3);
    [x + 8, x + w - 14].forEach(lx => g.fillRect(lx, y + 22, 6, 8));
  }

  private reception(x: number, y: number) {
    const rw = 200, rh = 148;
    const g = this.add.graphics();
    // Depth shadow
    g.fillStyle(0x0a1628);
    g.fillRect(x + 4, y + 4, rw, rh);
    // Desk body
    g.fillStyle(0x1e3a5f);
    g.fillRect(x, y, rw, rh);
    // Counter top
    g.fillStyle(0x2d4a72);
    g.fillRect(x + 3, y + 3, rw - 6, 66);
    // Monitor bezel
    g.fillStyle(0x090f1a);
    g.fillRect(x + 14, y + 8, 72, 50);
    // Monitor screen
    g.fillStyle(0x0ea5e9, 0.3);
    g.fillRect(x + 16, y + 10, 68, 46);
    g.lineStyle(1, 0x3ecad8, 0.5);
    g.strokeRect(x + 16, y + 10, 68, 46);
    // Keyboard
    g.fillStyle(0x0a1628);
    g.fillRoundedRect(x + 92, y + 32, 94, 24, 3);
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 8; col++) {
        g.fillStyle(0x1e3050);
        g.fillRect(x + 96 + col * 10, y + 35 + row * 7, 8, 5);
      }
    this.add.text(x + rw / 2, y + 116, '📋 Recepción', {
      fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#7dd3fc',
    }).setOrigin(0.5);
  }

  private poster(cx: number, cy: number) {
    const g = this.add.graphics();
    const palette = [0x3ecad8, 0x42a5f5, 0xef5350, 0x66bb6a, 0xffb300, 0xab47bc];
    const c1 = palette[Math.floor(Phaser.Math.Between(0, palette.length - 1))];
    const c2 = palette[Math.floor(Phaser.Math.Between(0, palette.length - 1))];
    g.fillStyle(0xffffff, 0.9);
    g.fillRect(cx - 18, cy - 13, 36, 26);
    g.lineStyle(1, 0x888888, 0.5);
    g.strokeRect(cx - 18, cy - 13, 36, 26);
    g.fillStyle(c1); g.fillRect(cx - 14, cy - 9, 14, 18);
    g.fillStyle(c2); g.fillRect(cx + 0,  cy - 9, 14, 18);
  }

  private plant(x: number, y: number) {
    const g = this.add.graphics();
    g.fillStyle(0x6d3a1a);
    g.fillRoundedRect(x - 7, y + 10, 14, 13, 3);
    g.fillStyle(0x256028);
    g.fillCircle(x, y, 13);
    g.fillStyle(0x348038);
    g.fillCircle(x - 5, y - 4, 8); g.fillCircle(x + 5, y - 4, 8);
    g.fillStyle(0x4caf50);
    g.fillCircle(x, y - 6, 6);
    g.fillStyle(0x7dc87e);
    g.fillCircle(x, y - 9, 4);
  }

  // ── Patient sprites ──────────────────────────────────────────────
  setPatients(patients: Patient[], onClick: (p: Patient) => void) {
    _onClick = onClick;
    this.sprites.forEach(c => { this.tweens.killTweensOf(c); c.destroy(); });
    this.sprites.clear();

    const active   = patients.filter(p => p.active);
    const inactive = patients.filter(p => !p.active);

    active.slice(0, STATIONS.length).forEach((p, i) => {
      const s = STATIONS[i];
      this.buildSprite(p, s.x, s.y, COLORS[i % COLORS.length], 'table');
    });

    const waiting = [...active.slice(STATIONS.length), ...inactive];
    waiting.slice(0, 6).forEach((p, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      this.buildSprite(p,
        WALL_W + 55 + col * 100,
        MID_Y + MID_H + 32 + row * 60,
        0x7a90a8, 'wait'
      );
    });
  }

  private buildSprite(patient: Patient, x: number, y: number, color: number, mode: 'table' | 'wait') {
    const outer = this.add.container(x, y);
    const inner = this.add.container(0, 0);
    outer.add(inner);

    const isDog = !['gato', 'cat', 'felino'].some(k =>
      (patient.species || '').toLowerCase().includes(k)
    );
    const rgb  = Phaser.Display.Color.IntegerToRGB(color);
    const dark = Phaser.Display.Color.GetColor(
      Math.max(0, rgb.r - 55), Math.max(0, rgb.g - 55), Math.max(0, rgb.b - 55)
    );

    const g = this.add.graphics();

    if (mode === 'table') {
      /* ── Lying down on table (top-down oval) ── */
      g.fillStyle(0x000000, 0.14);
      g.fillEllipse(2, 5, 50, 22);
      // Body
      g.fillStyle(color);
      g.fillEllipse(0, 0, 52, 20);
      // Head at left end
      g.fillStyle(dark);
      if (isDog) {
        g.fillEllipse(-28, -4, 10, 18); // floppy ear left
        g.fillEllipse(-28, 4,  10, 18);
      } else {
        g.fillTriangle(-30, -3, -24, -3, -28, -15);
        g.fillTriangle(-30,  3, -24,  3, -28,  15);
      }
      g.fillStyle(color);
      g.fillCircle(-22, 0, 14);
      g.fillStyle(0x1a2e5a);
      g.fillCircle(-25, -2, 2); g.fillCircle(-19, -2, 2);
      g.fillStyle(0xffffff);
      g.fillCircle(-24, -3, 1); g.fillCircle(-18, -3, 1);
      g.fillStyle(0x1a2e5a);
      if (isDog) g.fillRoundedRect(-25, 4, 6, 4, 2);
      else       g.fillTriangle(-22, 7, -25, 3, -19, 3);
      // Tail at right end
      g.fillStyle(dark);
      g.fillEllipse(28, 0, 10, 16);
      // Body highlight
      g.fillStyle(0xffffff, 0.12);
      g.fillEllipse(-5, -5, 22, 8);

      inner.add(g);

      // Pulse ring
      const pulse = this.add.graphics();
      pulse.lineStyle(2, color, 0.45);
      pulse.strokeEllipse(0, 0, 60, 28);
      inner.add(pulse);
      this.tweens.add({
        targets: pulse, alpha: 0, scaleX: 1.55, scaleY: 1.55,
        duration: 1900, repeat: -1, ease: 'Sine.easeOut',
      });

      // Status dot
      const dot = this.add.graphics();
      dot.fillStyle(0x22c55e); dot.fillCircle(28, -12, 5);
      dot.lineStyle(1.5, 0xffffff); dot.strokeCircle(28, -12, 5);
      inner.add(dot);

      // Breathing tween
      this.tweens.add({
        targets: inner, scaleX: 1.05, scaleY: 0.96,
        duration: 1800 + Math.random() * 500,
        yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
        delay: Math.random() * 900,
      });

    } else {
      /* ── Standing / walking (RPG top-down character) ── */
      // Shadow
      g.fillStyle(0x000000, 0.15);
      g.fillEllipse(1, 26, 28, 10);

      // Body
      g.fillStyle(color);
      g.fillRoundedRect(-11, 4, 22, 16, 4);
      g.fillStyle(dark);
      g.fillRoundedRect(-11, 16, 22, 4, { bl: 4, br: 4, tl: 0, tr: 0 });

      // Legs
      g.fillStyle(dark);
      g.fillRoundedRect(-10, 19, 8, 9, 2);
      g.fillRoundedRect(2,   19, 8, 9, 2);
      g.fillStyle(Phaser.Display.Color.GetColor(
        Math.min(255, rgb.r + 30), Math.min(255, rgb.g + 30), Math.min(255, rgb.b + 30)
      ));
      g.fillRect(-9, 19, 4, 5); g.fillRect(3, 19, 4, 5);

      // Ears
      if (isDog) {
        g.fillStyle(dark);
        g.fillEllipse(-14, -4, 11, 18);
        g.fillEllipse(14,  -4, 11, 18);
      } else {
        g.fillStyle(dark);
        g.fillTriangle(-17, -2, -9, -2, -14, -16);
        g.fillTriangle(9,   -2, 17, -2,  14, -16);
      }

      // Head
      g.fillStyle(color);
      g.fillCircle(0, -2, 14);

      // Eyes
      g.fillStyle(0x1a2e5a);
      g.fillCircle(-4, -2, 3); g.fillCircle(4, -2, 3);
      g.fillStyle(0xffffff);
      g.fillCircle(-3, -3.5, 1.5); g.fillCircle(5, -3.5, 1.5);

      // Nose
      g.fillStyle(0x1a2e5a);
      if (isDog) g.fillRoundedRect(-3, 5, 6, 4, 2);
      else       g.fillTriangle(0, 8, -3, 4, 3, 4);

      // Tail
      g.fillStyle(dark);
      g.fillEllipse(17, 9, 13, 7);

      inner.add(g);

      // Patrol
      this.patrol(outer, inner);
    }

    // ── Hover ring ──
    const ring = this.add.graphics();
    ring.lineStyle(2.5, color, 0.9);
    if (mode === 'table') ring.strokeEllipse(0, 0, 62, 30);
    else ring.strokeCircle(0, 0, 22);
    ring.setVisible(false);
    outer.add(ring);

    // ── Name badge ──
    const label = patient.name.length > 9 ? patient.name.substring(0, 8) + '…' : patient.name;
    const bw = Math.max(46, label.length * 7 + 14);
    const by = mode === 'table' ? 18 : 30;
    const badge = this.add.graphics();
    badge.fillStyle(0x0f1e3d, 0.88);
    badge.fillRoundedRect(-bw / 2, by, bw, 17, 5);
    outer.add(badge);
    outer.add(this.add.text(0, by + 8.5, label, {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#e2e8f0',
    }).setOrigin(0.5));

    // ── Interaction ──
    outer.setSize(mode === 'table' ? 62 : 52, 70).setInteractive({ useHandCursor: true });
    outer.on('pointerover', () => {
      ring.setVisible(true);
      this.tweens.add({ targets: outer, scaleX: 1.1, scaleY: 1.1, duration: 100 });
    });
    outer.on('pointerout', () => {
      ring.setVisible(false);
      this.tweens.add({ targets: outer, scaleX: 1, scaleY: 1, duration: 100 });
    });
    outer.on('pointerdown', () => {
      _onClick?.(patient);
      this.tweens.add({ targets: outer, scaleX: 0.88, scaleY: 0.88, duration: 70, yoyo: true });
    });

    this.sprites.set(patient.id, outer);
  }

  // ── Walking patrol ────────────────────────────────────────────
  private patrol(outer: Phaser.GameObjects.Container, inner: Phaser.GameObjects.Container) {
    const walk = () => {
      if (!outer.active) return;
      const tx = Phaser.Math.Between(WAIT_BOUNDS.x1 + 10, WAIT_BOUNDS.x2);
      const ty = Phaser.Math.Between(WAIT_BOUNDS.y1 + 5, WAIT_BOUNDS.y2);
      const dist = Phaser.Math.Distance.Between(outer.x, outer.y, tx, ty);
      const dur  = Math.max(700, (dist / 55) * 1000);

      if (Math.abs(tx - outer.x) > 5) inner.setScale(tx < outer.x ? -1 : 1, 1);

      const bob = this.tweens.add({
        targets: inner, y: -3, duration: 140, yoyo: true,
        repeat: Math.ceil(dur / 280), ease: 'Sine.easeInOut',
      });

      this.tweens.add({
        targets: outer, x: tx, y: ty, duration: dur, ease: 'Sine.easeInOut',
        onComplete: () => {
          bob.stop(); inner.setY(0);
          if (outer.active) this.time.delayedCall(Phaser.Math.Between(900, 3200), walk);
        },
      });
    };
    this.time.delayedCall(Math.random() * 2000, walk);
  }
}

// ── React component ───────────────────────────────────────────────────
export default function VirtualClinicPage() {
  const navigate  = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameRef   = useRef<Phaser.Game | null>(null);
  const [selected, setSelected] = useState<Patient | null>(null);

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn:  () => api.get('/patients'),
  });

  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: canvasRef.current,
      width: W, height: H,
      backgroundColor: '#cdcdc4',
      scene: [ClinicScene],
      roundPixels: true,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    });
    gameRef.current = game;
    return () => { game.destroy(true); gameRef.current = null; _onClick = null; };
  }, []);

  const handleClick = useCallback((p: Patient) => setSelected(p), []);

  useEffect(() => {
    if (!gameRef.current || patients.length === 0) return;
    const trySet = () => {
      const scene = gameRef.current?.scene.getScene('ClinicScene') as ClinicScene | null;
      if (scene?.sys.isActive()) scene.setPatients(patients, handleClick);
      else setTimeout(trySet, 200);
    };
    trySet();
  }, [patients, handleClick]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Canvas */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 pt-4 pb-1 md:px-6 md:pt-6">
          <h1 className="text-xl font-bold text-navy-700">Consulta Virtual</h1>
          <p className="text-navy-400 text-sm">
            {patients.filter(p => p.active).length} en tratamiento ·{' '}
            {patients.filter(p => !p.active).length} en espera
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-2 md:p-4 min-h-0">
          <div
            ref={canvasRef}
            className="rounded-2xl overflow-hidden shadow-xl border border-navy-100"
            style={{ width: W, height: H, maxWidth: '100%' }}
          />
        </div>
        <p className="text-center text-xs text-navy-300 pb-2">
          Haz clic en un paciente para ver su ficha
        </p>
      </div>

      {/* Side panel */}
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
            <button onClick={() => navigate(`/chat/${selected.tutor.id}`)} className="btn-secondary w-full justify-center">
              <MessageSquare size={16} />
              Chatear con {selected.tutor.name.split(' ')[0]}
            </button>
            <button onClick={() => navigate(`/patients/${selected.id}`)} className="btn-ghost w-full justify-center">
              <Activity size={16} /> Ver historial completo
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
