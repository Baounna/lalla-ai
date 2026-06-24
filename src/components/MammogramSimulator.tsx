"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLang } from "@/lib/language";

/* Deterministic pseudo-random so SSR and client render identically (no hydration mismatch). */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rnd = mulberry32(7);
// Fibroglandular "clouds" scattered inside the breast region (chest wall on the left).
const CLOUDS = Array.from({ length: 36 }, () => {
  const a = rnd() * Math.PI * 2;
  const r = Math.sqrt(rnd());
  return {
    cx: 205 + Math.cos(a) * r * 150,
    cy: 250 + Math.sin(a) * r * 165,
    rr: 20 + rnd() * 30,
  };
});

const FINDING = { cx: 290, cy: 232 };

type Cat = "A" | "B" | "C" | "D";

const CATS: Record<
  Cat,
  { clouds: number; cloudOpacity: number; haze: number; visibility: number; en: { name: string; desc: string }; fr: { name: string; desc: string } }
> = {
  A: {
    clouds: 5,
    cloudOpacity: 0.1,
    haze: 0,
    visibility: 95,
    en: { name: "A · Almost entirely fatty", desc: "Mostly fatty tissue (dark on the X-ray). Abnormal findings are easy to see." },
    fr: { name: "A · Presque entièrement graisseux", desc: "Surtout du tissu graisseux (sombre sur la radio). Les anomalies sont faciles à voir." },
  },
  B: {
    clouds: 13,
    cloudOpacity: 0.16,
    haze: 0.05,
    visibility: 76,
    en: { name: "B · Scattered density", desc: "Scattered areas of dense tissue. Findings are usually still visible." },
    fr: { name: "B · Densité dispersée", desc: "Des zones éparses de tissu dense. Les anomalies restent en général visibles." },
  },
  C: {
    clouds: 23,
    cloudOpacity: 0.26,
    haze: 0.12,
    visibility: 44,
    en: { name: "C · Heterogeneously dense", desc: "Dense throughout. Dense tissue is white and can hide small masses." },
    fr: { name: "C · Hétérogènement dense", desc: "Dense partout. Le tissu dense est blanc et peut cacher de petites masses." },
  },
  D: {
    clouds: 36,
    cloudOpacity: 0.4,
    haze: 0.22,
    visibility: 17,
    en: { name: "D · Extremely dense", desc: "Extremely dense — lowers mammogram sensitivity. An MRI/ultrasound may be advised." },
    fr: { name: "D · Extrêmement dense", desc: "Extrêmement dense — réduit la sensibilité de la mammographie. Une IRM/échographie peut être conseillée." },
  },
};

export function MammogramSimulator() {
  const { lang } = useLang();
  const [cat, setCat] = useState<Cat>("A");
  const [highlight, setHighlight] = useState(false);
  const c = CATS[cat];
  const tr = lang === "fr" ? c.fr : c.en;

  return (
    <div className="grid gap-5 md:grid-cols-[1.1fr_1fr] items-stretch">
      {/* Radiology viewer */}
      <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {lang === "fr" ? "Vue mammographie · simulation" : "Mammogram view · simulation"}
        </div>
        <div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-cyan-400/70">
          BI-RADS · {cat}
        </div>

        <svg viewBox="0 0 420 500" className="w-full h-auto block">
          <defs>
            <radialGradient id="cloud" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="finding" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#f4f4f5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="breastFat" cx="35%" cy="50%" r="75%">
              <stop offset="0%" stopColor="#3a3a3f" />
              <stop offset="100%" stopColor="#1a1a1d" />
            </radialGradient>
            <clipPath id="breastClip">
              <path d="M20 60 C 210 30, 392 95, 384 252 C 376 415, 190 470, 20 442 Z" />
            </clipPath>
          </defs>

          {/* breast tissue base (fat = dark) */}
          <g clipPath="url(#breastClip)">
            <path d="M20 60 C 210 30, 392 95, 384 252 C 376 415, 190 470, 20 442 Z" fill="url(#breastFat)" />

            {/* the suspicious finding (drawn under the tissue so density can obscure it) */}
            <circle cx={FINDING.cx} cy={FINDING.cy} r="11" fill="url(#finding)" />
            {[0, 45, 90, 135].map((deg) => {
              const a = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={FINDING.cx - Math.cos(a) * 16}
                  y1={FINDING.cy - Math.sin(a) * 16}
                  x2={FINDING.cx + Math.cos(a) * 16}
                  y2={FINDING.cy + Math.sin(a) * 16}
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.55"
                />
              );
            })}

            {/* fibroglandular density clouds */}
            {CLOUDS.slice(0, c.clouds).map((cl, i) => (
              <circle key={i} cx={cl.cx} cy={cl.cy} r={cl.rr} fill="url(#cloud)" opacity={c.cloudOpacity} />
            ))}

            {/* overall haze for dense categories */}
            <rect x="0" y="0" width="420" height="500" fill="#ffffff" opacity={c.haze} />
          </g>

          {/* skin line + nipple */}
          <path
            d="M20 60 C 210 30, 392 95, 384 252 C 376 415, 190 470, 20 442"
            fill="none"
            stroke="#52525b"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle cx="384" cy="252" r="5" fill="#71717a" />

          {/* highlight overlay */}
          {highlight && (
            <g>
              <circle cx={FINDING.cx} cy={FINDING.cy} r="26" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="5 4">
                <animateTransform attributeName="transform" type="rotate" from={`0 ${FINDING.cx} ${FINDING.cy}`} to={`360 ${FINDING.cx} ${FINDING.cy}`} dur="8s" repeatCount="indefinite" />
              </circle>
              <line x1={FINDING.cx + 26} y1={FINDING.cy - 26} x2={FINDING.cx + 60} y2={FINDING.cy - 60} stroke="#fbbf24" strokeWidth="2" />
              <text x={FINDING.cx + 64} y={FINDING.cy - 62} fill="#fbbf24" fontSize="13" fontFamily="monospace" fontWeight="bold">
                {lang === "fr" ? "anomalie" : "finding"}
              </text>
            </g>
          )}
        </svg>

        <button
          onClick={() => setHighlight((v) => !v)}
          className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xs font-medium border border-white/20"
        >
          {highlight ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {highlight
            ? lang === "fr" ? "Masquer l'anomalie" : "Hide finding"
            : lang === "fr" ? "Localiser l'anomalie" : "Locate finding"}
        </button>
      </div>

      {/* Controls + readout */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            {lang === "fr" ? "Densité mammaire (BI-RADS)" : "Breast density (BI-RADS)"}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(CATS) as Cat[]).map((k) => (
              <button
                key={k}
                onClick={() => setCat(k)}
                className={`h-12 rounded-xl font-bold text-lg transition-all ${
                  cat === k
                    ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-rose-50 dark:hover:bg-zinc-700"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-rose-100 dark:border-rose-950 bg-white dark:bg-zinc-900 p-5 flex-1">
          <h3 className="font-bold text-lg mb-1">{tr.name}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">{tr.desc}</p>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-zinc-500">{lang === "fr" ? "Lisibilité de la radio" : "Finding visibility"}</span>
              <span className={c.visibility > 60 ? "text-emerald-600" : c.visibility > 35 ? "text-amber-600" : "text-rose-600"}>
                {c.visibility}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  c.visibility > 60 ? "bg-emerald-500" : c.visibility > 35 ? "bg-amber-500" : "bg-rose-500"
                }`}
                style={{ width: `${c.visibility}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 pt-1">
              {lang === "fr"
                ? "Plus le tissu est dense (blanc), plus une anomalie peut se cacher — d'où l'importance d'examens adaptés."
                : "The denser the tissue (white), the more a finding can hide — which is why tailored screening matters."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MammogramSimulator;
