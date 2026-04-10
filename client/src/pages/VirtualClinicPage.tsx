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

// ── Dog sprite display size ───────────────────────────────────────────
const DOG_W = 48;
const DOG_H = 48;

// ── Layout constants ──────────────────────────────────────────────────
const W = 640, H = 520;
const WALL_W = 22, TOP_W = 30, HDR_H = 44;
const MID_Y = 318, MID_H = 28;
const DOOR_X = 192, DOOR_W = 52;

const STATIONS = [
  { x: 130, y: 162 }, { x: 308, y: 162 }, { x: 486, y: 162 },
  { x: 130, y: 272 }, { x: 308, y: 272 }, { x: 486, y: 272 },
];

const WB = {  // waiting area bounds
  x1: WALL_W + 10, y1: MID_Y + MID_H + 18,
  x2: 400,         y2: H - TOP_W - 20,
};

// ── Scene ─────────────────────────────────────────────────────────────
type DogState = 'patrol' | 'heading' | 'on_table';

interface DogEntry {
  patient: Patient;
  outer: Phaser.GameObjects.Container;
  dogImg: Phaser.GameObjects.Image;
  face: 1 | -1;
  state: DogState;
  tableSlot: number;
  moveTween?: Phaser.Tweens.Tween;
  bobTween?: Phaser.Tweens.Tween;
}

class ClinicScene extends Phaser.Scene {
  private dogs = new Map<number, DogEntry>();
  private tableOccupied = new Array(6).fill(false);

  constructor() { super({ key: 'ClinicScene' }); }

  preload() {
    this.load.image('dog', '/dog.png');
  }

  create() {
    this.buildTextures();
    this.buildRoom();
  }

  // ── Procedural floor textures ─────────────────────────────────
  private buildTextures() {
    const make = (key: string, fill: number, grout: number) => {
      const g = this.make.graphics({ x: 0, y: 0 } as Phaser.Types.GameObjects.Graphics.Options);
      g.fillStyle(fill);   g.fillRect(0, 0, 32, 32);
      g.fillStyle(grout);  g.fillRect(0, 31, 32, 1); g.fillRect(31, 0, 1, 32);
      g.generateTexture(key, 32, 32);
      g.destroy();
    };
    make('t-treat', 0xcecec6, 0xb8b8b0);
    make('t-wait',  0xd6d2c4, 0xc4c0b4);
  }

  // ── Room layout ───────────────────────────────────────────────
  private buildRoom() {
    const treatY = HDR_H + TOP_W, treatH = MID_Y - treatY;
    const waitY  = MID_Y + MID_H, waitH  = H - TOP_W - waitY;

    this.add.tileSprite(WALL_W, treatY, W - WALL_W * 2, treatH, 't-treat').setOrigin(0, 0);
    this.add.tileSprite(WALL_W, waitY,  W - WALL_W * 2, waitH,  't-wait' ).setOrigin(0, 0);

    // Header
    const hdr = this.add.graphics();
    hdr.fillStyle(0x0f1e3d); hdr.fillRect(0, 0, W, HDR_H);
    hdr.fillStyle(0x3ecad8); hdr.fillRect(0, HDR_H - 4, W, 4);
    hdr.fillStyle(0x3ecad8); hdr.fillRoundedRect(10, 8, 28, 28, 6);
    hdr.fillStyle(0xffffff); hdr.fillCircle(24, 22, 7);
    hdr.fillStyle(0x0f1e3d); hdr.fillCircle(24, 22, 4);
    this.add.text(46, 22, 'FISIOCAN — Consulta Virtual', {
      fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#fff', fontStyle: 'bold',
    }).setOrigin(0, 0.5);

    // Walls
    this.drawWall(0, HDR_H, WALL_W, H - HDR_H);
    this.drawWall(W - WALL_W, HDR_H, WALL_W, H - HDR_H);
    this.drawWall(0, HDR_H, W, TOP_W);
    this.drawWall(0, H - TOP_W, W, TOP_W);
    // Middle wall with door gap
    this.drawWall(0, MID_Y, DOOR_X, MID_H);
    this.drawWall(DOOR_X + DOOR_W, MID_Y, W - DOOR_X - DOOR_W, MID_H);
    // Doorway
    const dg = this.add.graphics();
    dg.fillStyle(0xc8a870); dg.fillRect(DOOR_X, MID_Y, DOOR_W, MID_H);
    dg.lineStyle(2, 0xa08050); dg.strokeRect(DOOR_X, MID_Y, DOOR_W, MID_H);

    // Labels
    this.add.text(WALL_W + 6, treatY + 4, 'ZONA DE TRATAMIENTO', {
      fontFamily: 'Arial, sans-serif', fontSize: '8px', color: '#888',
    });
    this.add.text(WALL_W + 6, waitY + 4, 'SALA DE ESPERA', {
      fontFamily: 'Arial, sans-serif', fontSize: '8px', color: '#888',
    });
    this.add.text(DOOR_X + DOOR_W / 2, MID_Y + MID_H / 2, 'ENTRADA', {
      fontFamily: 'Arial, sans-serif', fontSize: '7px', color: '#a07040',
    }).setOrigin(0.5);

    // Exam tables
    STATIONS.forEach((s, i) => this.drawTable(s.x, s.y, i + 1));

    // Waiting furniture
    this.drawBench(WALL_W + 6, waitY + 12, 190);
    this.drawBench(WALL_W + 6, waitY + 60, 150);
    this.drawReception(415, waitY + 4);

    // Plants & wall art
    this.drawPlant(W - WALL_W - 14, treatY + 18);
    this.drawPlant(WALL_W + 14,     treatY + 18);
    this.drawPlant(W - WALL_W - 14, H - TOP_W - 20);
    this.drawPlant(WALL_W + 14,     H - TOP_W - 20);
    [80, 185, 340, 445, 560].forEach(px => this.drawPoster(px, HDR_H + TOP_W / 2));

    // Floor shadows
    const sh = this.add.graphics();
    sh.fillStyle(0x000000, 0.04);
    sh.fillRect(WALL_W, treatY, W - WALL_W * 2, 7);
    sh.fillRect(WALL_W, waitY, W - WALL_W * 2, 7);
  }

  private drawWall(x: number, y: number, w: number, h: number) {
    const g = this.add.graphics();
    g.fillStyle(0x383838); g.fillRect(x, y, w, 3);
    g.fillStyle(0x767676); g.fillRect(x, y + 3, w, 12);
    g.fillStyle(0x8e8e8e); g.fillRect(x, y + 15, w, h - 15);
    g.fillStyle(0x000000, 0.16); g.fillRect(x, y + h - 4, w, 4);
  }

  private drawTable(cx: number, cy: number, n: number) {
    const g = this.add.graphics();
    g.fillStyle(0x50a8b8); g.fillRect(cx - 46, cy + 12, 92, 10);
    g.fillStyle(0x96dce8); g.fillRect(cx - 46, cy - 8, 92, 20);
    g.lineStyle(1.5, 0x28b0c8); g.strokeRect(cx - 46, cy - 8, 92, 20);
    g.fillStyle(0xe8fafd); g.fillRoundedRect(cx - 38, cy - 4, 76, 12, 4);
    g.lineStyle(0.8, 0x68c8d8, 0.5); g.strokeRoundedRect(cx - 38, cy - 4, 76, 12, 4);
    this.add.text(cx, cy - 16, `M${n}`, {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#0891b2', fontStyle: 'bold',
    }).setOrigin(0.5);
  }

  private drawBench(x: number, y: number, w: number) {
    const g = this.add.graphics();
    g.fillStyle(0x6a4828); g.fillRect(x, y + 16, w, 8);
    g.fillStyle(0xb07840); g.fillRect(x, y, w, 16);
    g.fillStyle(0xc09050); g.fillRect(x + 2, y + 2, w - 4, 8);
    g.lineStyle(0.5, 0x886030, 0.5);
    for (let i = 16; i < w; i += 16) g.lineBetween(x + i, y, x + i, y + 16);
    g.fillStyle(0x000000, 0.25);
    [x + 8, x + w - 14].forEach(lx => g.fillRect(lx, y + 22, 6, 8));
  }

  private drawReception(x: number, y: number) {
    const rw = 195, rh = 145;
    const g = this.add.graphics();
    g.fillStyle(0x0a1628); g.fillRect(x + 4, y + 4, rw, rh);
    g.fillStyle(0x1e3a5f); g.fillRect(x, y, rw, rh);
    g.fillStyle(0x2d4a72); g.fillRect(x + 3, y + 3, rw - 6, 64);
    g.fillStyle(0x090f1a); g.fillRect(x + 14, y + 8, 70, 48);
    g.fillStyle(0x0ea5e9, 0.3); g.fillRect(x + 16, y + 10, 66, 44);
    g.lineStyle(1, 0x3ecad8, 0.4); g.strokeRect(x + 16, y + 10, 66, 44);
    g.fillStyle(0x0a1628); g.fillRoundedRect(x + 92, y + 30, 94, 24, 3);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 8; c++) {
        g.fillStyle(0x1e3050);
        g.fillRect(x + 96 + c * 10, y + 33 + r * 7, 8, 5);
      }
    this.add.text(x + rw / 2, y + 112, '📋 Recepción', {
      fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#7dd3fc',
    }).setOrigin(0.5);
  }

  private drawPoster(cx: number, cy: number) {
    const g = this.add.graphics();
    const pal = [0x3ecad8, 0x42a5f5, 0xef5350, 0x66bb6a, 0xffb300];
    const c1 = pal[Phaser.Math.Between(0, pal.length - 1)];
    const c2 = pal[Phaser.Math.Between(0, pal.length - 1)];
    g.fillStyle(0xffffff, 0.9); g.fillRect(cx - 18, cy - 13, 36, 26);
    g.lineStyle(1, 0x888888, 0.4); g.strokeRect(cx - 18, cy - 13, 36, 26);
    g.fillStyle(c1); g.fillRect(cx - 14, cy - 9, 13, 18);
    g.fillStyle(c2); g.fillRect(cx + 1,  cy - 9, 13, 18);
  }

  private drawPlant(x: number, y: number) {
    const g = this.add.graphics();
    g.fillStyle(0x6d3a1a); g.fillRoundedRect(x - 7, y + 10, 14, 13, 3);
    g.fillStyle(0x256028); g.fillCircle(x, y, 13);
    g.fillStyle(0x388e3c); g.fillCircle(x - 5, y - 4, 8); g.fillCircle(x + 5, y - 4, 8);
    g.fillStyle(0x4caf50); g.fillCircle(x, y - 6, 6);
    g.fillStyle(0x81c784); g.fillCircle(x, y - 9, 4);
  }

  // ── Dogs ──────────────────────────────────────────────────────
  setPatients(patients: Patient[], onClick: (p: Patient) => void) {
    _onClick = onClick;
    this.dogs.forEach(d => {
      d.moveTween?.stop(); d.bobTween?.stop();
      d.outer.destroy();
    });
    this.dogs.clear();
    this.tableOccupied.fill(false);

    patients.forEach((p, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const sx = WB.x1 + 55 + col * 90;
      const sy = WB.y1 + 15 + row * 52;
      this.spawnDog(p, sx, sy);
    });
  }

  private spawnDog(patient: Patient, startX: number, startY: number) {
    const outer = this.add.container(startX, startY);

    // Drop shadow (added first so it sits behind the dog)
    const shad = this.add.graphics();
    shad.fillStyle(0x000000, 0.18);
    shad.fillEllipse(DOG_W / 2, DOG_H + 2, DOG_W * 0.8, 8);
    outer.addAt(shad, 0);

    // Dog image sprite
    const dogImg = this.add.image(0, 0, 'dog')
      .setOrigin(0, 0)
      .setDisplaySize(DOG_W, DOG_H);
    outer.add(dogImg);

    // Name badge
    const label = patient.name.length > 9 ? patient.name.substring(0, 8) + '…' : patient.name;
    const bw = Math.max(46, label.length * 7 + 12);
    const badgeX = DOG_W / 2;
    const badgeY = DOG_H + 4;
    const badge = this.add.graphics();
    badge.fillStyle(0x0f1e3d, 0.88);
    badge.fillRoundedRect(badgeX - bw / 2, badgeY, bw, 16, 5);
    outer.add(badge);
    outer.add(this.add.text(badgeX, badgeY + 8, label, {
      fontFamily: 'Arial, sans-serif', fontSize: '9px', color: '#e2e8f0',
    }).setOrigin(0.5));

    // Hover highlight ring
    const highlight = this.add.graphics();
    highlight.lineStyle(2, 0xffd700, 0.85);
    highlight.strokeRect(-2, -2, DOG_W + 4, DOG_H + 4);
    highlight.setVisible(false);
    outer.add(highlight);

    // Interactive hit area
    outer.setSize(DOG_W, DOG_H).setInteractive({ useHandCursor: true });
    outer.on('pointerover', () => { highlight.setVisible(true); });
    outer.on('pointerout',  () => { highlight.setVisible(false); });
    outer.on('pointerdown', () => this.handleDogClick(patient.id));

    const entry: DogEntry = { patient, outer, dogImg, face: 1, state: 'patrol', tableSlot: -1 };
    this.dogs.set(patient.id, entry);

    this.patrol(entry);
  }

  private handleDogClick(id: number) {
    const dog = this.dogs.get(id);
    if (!dog) return;

    // Always fire the info panel
    _onClick?.(dog.patient);

    if (dog.state !== 'patrol') return; // already heading to / on a table

    // Find nearest free table slot
    let bestSlot = -1, bestDist = Infinity;
    STATIONS.forEach((s, i) => {
      if (this.tableOccupied[i]) return;
      const d = Phaser.Math.Distance.Between(dog.outer.x, dog.outer.y, s.x, s.y);
      if (d < bestDist) { bestDist = d; bestSlot = i; }
    });

    if (bestSlot === -1) return; // all tables full

    this.tableOccupied[bestSlot] = true;
    dog.state     = 'heading';
    dog.tableSlot = bestSlot;
    dog.moveTween?.stop();
    dog.bobTween?.stop();

    this.walkTo(dog, STATIONS[bestSlot].x, STATIONS[bestSlot].y, () => {
      dog.state = 'on_table';
      dog.bobTween?.stop();
      // Sitting pose: tilt the dog slightly on the table
      dog.dogImg.setAngle(-18).setDisplaySize(DOG_W * 0.9, DOG_H * 0.9);
    });
  }

  // ── Walk to a target position ─────────────────────────────────
  private walkTo(
    dog: DogEntry,
    tx: number, ty: number,
    onArrive?: () => void,
  ) {
    const { outer, dogImg } = dog;
    const dist = Phaser.Math.Distance.Between(outer.x, outer.y, tx, ty);
    const dur  = Math.max(600, (dist / 60) * 1000);

    // Flip sprite to face direction of travel
    const newFace: 1 | -1 = tx >= outer.x ? 1 : -1;
    if (newFace !== dog.face) {
      dog.face = newFace;
      dogImg.setFlipX(newFace === -1);
    }

    // Walk bob
    dog.bobTween = this.tweens.add({
      targets: outer, y: outer.y - 2,
      duration: 130, yoyo: true,
      repeat: Math.ceil(dur / 260),
      ease: 'Sine.easeInOut',
    });

    dog.moveTween = this.tweens.add({
      targets: outer, x: tx, y: ty,
      duration: dur, ease: 'Sine.easeInOut',
      onComplete: () => {
        dog.bobTween?.stop();
        outer.setY(ty);
        onArrive?.();
      },
    });
  }

  // ── Patrol in waiting area ────────────────────────────────────
  private patrol(dog: DogEntry) {
    const pick = () => {
      if (!dog.outer.active || dog.state !== 'patrol') return;

      const tx = Phaser.Math.Between(WB.x1 + 10, WB.x2);
      const ty = Phaser.Math.Between(WB.y1 + 5,  WB.y2);

      this.walkTo(dog, tx, ty, () => {
        if (dog.state === 'patrol') {
          this.time.delayedCall(Phaser.Math.Between(600, 2800), pick);
        }
      });
    };

    this.time.delayedCall(Math.random() * 1800, pick);
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
    queryFn: () => api.get('/patients'),
  });

  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: canvasRef.current,
      width: W, height: H,
      backgroundColor: '#cececc',
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

  // Determines which slide animation to use based on current viewport
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* ── Canvas column ── */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <div className="px-4 pt-4 pb-1 md:px-6 md:pt-6 flex-shrink-0">
          <h1 className="text-xl font-bold text-navy-700">Consulta Virtual</h1>
          <p className="text-navy-400 text-sm">
            {patients.length} paciente{patients.length !== 1 ? 's' : ''} · haz clic en un perro para asignarlo a camilla
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-2 md:p-4 min-h-0">
          {/* Container: 100% width up to 640px, height derived from aspect ratio */}
          <div
            ref={canvasRef}
            className="rounded-2xl overflow-hidden shadow-xl border border-navy-100 w-full"
            style={{ maxWidth: W, aspectRatio: `${W} / ${H}` }}
          />
        </div>
      </div>

      {/* ── Mobile backdrop ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSelected(null)}
        />
      )}

      {/* ── Info panel: bottom sheet on mobile, side panel on md+ ── */}
      {selected && (
        <aside className={[
          // Mobile: fixed bottom sheet
          'fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] rounded-t-2xl',
          // Desktop: static side panel
          'md:static md:bottom-auto md:left-auto md:right-auto md:z-auto',
          'md:w-80 md:max-h-none md:rounded-none',
          // Shared
          'bg-white border-t border-navy-100 md:border-t-0 md:border-l',
          'flex flex-col shadow-xl overflow-y-auto',
          isMobile ? 'animate-slide-up' : 'animate-slide-in',
        ].join(' ')}>
          <div className="flex items-center justify-between p-4 border-b border-navy-50">
            <h2 className="font-bold text-navy-700">Ficha del paciente</h2>
            <button
              onClick={() => setSelected(null)}
              className="p-1 text-navy-300 hover:text-navy-700 rounded-lg hover:bg-navy-50 transition-colors"
            >
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
              <MessageSquare size={16} /> Chatear con {selected.tutor.name.split(' ')[0]}
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
