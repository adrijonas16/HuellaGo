import { Stethoscope, Trees, CalendarHeart, Footprints, Clock } from 'lucide-react';

/**
 * Momento firma del inicio: un mini mapa de Arequipa donde una ruta se dibuja
 * y las huellas aparecen pisada a pisada; al final caen los pines de lugares.
 * Todo es SVG + CSS (sin JS), y con prefers-reduced-motion se muestra completo.
 */

const W = 520;
const H = 520;

// Ruta: Plaza de Armas → puente → Selva Alegre
const ROUTE: [number, number][] = [
  [118, 392], [160, 370], [196, 338], [226, 318], [262, 312],
  [296, 290], [318, 254], [338, 222], [372, 200], [404, 168], [420, 132],
];

function routePath(pts: [number, number][]) {
  // Curva suave (Catmull-Rom → Bézier)
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/** Puntos equiespaciados a lo largo de la polilínea, alternando izquierda/derecha */
function pawSteps(pts: [number, number][], count: number) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  const steps: { x: number; y: number; rot: number }[] = [];
  for (let k = 0; k < count; k++) {
    let dist = (total * (k + 0.5)) / count;
    let i = 0;
    while (i < seg.length - 1 && dist > seg[i]) dist -= seg[i++];
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const t = dist / seg[i];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy);
    const side = k % 2 === 0 ? 1 : -1;
    const nx = (-dy / len) * 9 * side;
    const ny = (dx / len) * 9 * side;
    const rot = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    steps.push({ x: ax + dx * t + nx, y: ay + dy * t + ny, rot });
  }
  return steps;
}

const STEPS = pawSteps(ROUTE, 14);
const STEP_START = 0.5;
const STEP_GAP = 0.16;
const PIN_START = STEP_START + STEPS.length * STEP_GAP;

const PINS = [
  { x: 118, y: 392, label: 'Plaza de Armas', icon: Footprints, tone: 'bg-dark text-white', delay: 0.2 },
  { x: 300, y: 372, label: 'Veterinaria 24h', icon: Stethoscope, tone: 'bg-rose text-white', delay: PIN_START },
  { x: 196, y: 214, label: 'Mascotatón · sáb', icon: CalendarHeart, tone: 'bg-accent text-dark', delay: PIN_START + 0.15 },
  { x: 420, y: 132, label: 'Selva Alegre', icon: Trees, tone: 'bg-secondary text-white', delay: PIN_START + 0.3 },
];

function Paw({ x, y, rot, delay }: { x: number; y: number; rot: number; delay: number }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)})`}>
      <g className="paw-step" style={{ animationDelay: `${delay}s` }} fill="#191C33">
        <ellipse cx="0" cy="3" rx="4.6" ry="3.8" />
        <ellipse cx="-4.6" cy="-2.6" rx="1.7" ry="2.2" />
        <ellipse cx="-1.6" cy="-5" rx="1.7" ry="2.2" />
        <ellipse cx="1.6" cy="-5" rx="1.7" ry="2.2" />
        <ellipse cx="4.6" cy="-2.6" rx="1.7" ry="2.2" />
      </g>
    </g>
  );
}

export function HeroWalk() {
  const d = routePath(ROUTE);
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square">
      <div className="absolute inset-0 rounded-[36px] bg-[#E9ECF3] overflow-hidden ring-1 ring-dark/5 shadow-[0_40px_80px_-40px_rgba(25,28,51,0.45)] animate-scale-in">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" role="img" aria-label="Mapa ilustrado de un paseo por Arequipa, de la Plaza de Armas al parque Selva Alegre">
          {/* manzanas */}
          <g fill="#F7F8FB">
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => (
                <rect key={`${r}-${c}`} x={14 + c * 74} y={14 + r * 74} width="62" height="62" rx="10" />
              )),
            )}
          </g>
          {/* río Chili */}
          <path d="M-20,90 C80,120 120,200 210,250 S330,330 360,420 S420,520 440,560" fill="none" stroke="#BFD0FF" strokeWidth="26" strokeLinecap="round" />
          <path d="M-20,90 C80,120 120,200 210,250 S330,330 360,420 S420,520 440,560" fill="none" stroke="#D6E0FF" strokeWidth="12" strokeLinecap="round" />
          {/* parque Selva Alegre */}
          <path d="M360,40 h140 v150 a20 20 0 0 1 -20 20 h-70 c-30 0 -60 -30 -60 -60 v-90 z" fill="#C7EBD8" />
          <g fill="#8FD3B0">
            <circle cx="400" cy="70" r="12" /><circle cx="460" cy="90" r="15" /><circle cx="440" cy="165" r="11" /><circle cx="478" cy="150" r="9" />
          </g>
          {/* plaza */}
          <rect x="74" y="356" width="88" height="74" rx="14" fill="#FFF4CF" />
          {/* Misti en el horizonte */}
          <path d="M20,520 L120,446 L150,462 L250,520 Z" fill="#DADFEA" />

          {/* ruta */}
          <path d={d} fill="none" stroke="#3352F5" strokeOpacity="0.18" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} pathLength={1} className="route-draw" fill="none" stroke="#3352F5" strokeWidth="3" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="1" />

          {STEPS.map((s, i) => (
            <Paw key={i} {...s} delay={STEP_START + i * STEP_GAP} />
          ))}
        </svg>

        {/* pines (HTML para tipografía e iconos nítidos) */}
        {PINS.map(({ x, y, label, icon: Icon, tone, delay }) => (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
          >
            <div className="animate-bounce-in flex flex-col items-center" style={{ animationDelay: `${delay}s` }}>
              <span className={`flex items-center gap-1.5 rounded-full pl-1 pr-3 py-1 text-[12px] sm:text-[13px] font-bold whitespace-nowrap shadow-card-hover ${tone}`}>
                <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                  <Icon size={14} strokeWidth={2.4} />
                </span>
                {label}
              </span>
              <span className={`w-2 h-2 rotate-45 -mt-1 ${tone.split(' ')[0]}`} />
            </div>
          </div>
        ))}
      </div>

      {/* resumen del paseo: aparece cuando terminan las huellas */}
      <div
        className="absolute -bottom-5 right-4 sm:-right-4 bg-white rounded-2xl shadow-card-hover px-4 py-3 flex items-center gap-3 animate-bounce-in"
        style={{ animationDelay: `${PIN_START + 0.5}s` }}
      >
        <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center -rotate-6">
          <Footprints size={20} className="text-dark" />
        </span>
        <div>
          <p className="text-[13px] text-bark leading-none">Paseo de Luna</p>
          <p className="font-heading font-extrabold text-dark text-lg leading-tight mt-1 flex items-center gap-2">
            2,4 km <span className="text-bark/50 font-normal">/</span>
            <span className="inline-flex items-center gap-1"><Clock size={14} className="text-bark" />38 min</span>
          </p>
        </div>
      </div>
    </div>
  );
}
