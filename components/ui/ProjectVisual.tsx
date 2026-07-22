import { cn } from "@/lib/utils";

const accentMap: Record<string, { a: string; b: string; grid: string }> = {
  copper: { a: "#e0653a", b: "#ff8a5c", grid: "#e0653a" },
  amber: { a: "#e0973a", b: "#f2c14a", grid: "#e0973a" },
  rust: { a: "#c9542d", b: "#e0653a", grid: "#c9542d" },
  sage: { a: "#a6c77e", b: "#cfe0a8", grid: "#a6c77e" },
  ink: { a: "#8a8078", b: "#d8cfc4", grid: "#b8afa3" },
};

/** Small deterministic PRNG so each slug yields a stable composition. */
function seededRand(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Props {
  slug: string;
  accent: string;
  label?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Generative abstract cover art — layered concentric contours over a
 * warm gradient field, unique and stable per project slug.
 */
export function ProjectVisual({ slug, accent, label, className }: Props) {
  const c = accentMap[accent] ?? accentMap.copper;
  const rand = seededRand(slug);
  const cx = 30 + rand() * 40;
  const cy = 28 + rand() * 44;
  const rings = 9;
  const rot = Math.floor(rand() * 360);
  const uid = `pv-${slug}`;

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={`${uid}-field`} cx={`${cx}%`} cy={`${cy}%`} r="85%">
            <stop offset="0%" stopColor={c.a} stopOpacity="0.42" />
            <stop offset="45%" stopColor={c.b} stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0b0a09" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.b} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c.a} stopOpacity="0.25" />
          </linearGradient>
          <pattern id={`${uid}-grid`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M8 0H0V8" fill="none" stroke={c.grid} strokeOpacity="0.08" strokeWidth="0.3" />
          </pattern>
        </defs>

        <rect width="100" height="100" fill="#131110" />
        <rect width="100" height="100" fill={`url(#${uid}-grid)`} />
        <rect width="100" height="100" fill={`url(#${uid}-field)`} />

        <g transform={`rotate(${rot} ${cx} ${cy})`} opacity="0.85">
          {Array.from({ length: rings }).map((_, i) => {
            const r = 6 + i * (5 + rand() * 3.5);
            const dash = 2 + rand() * 8;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={r}
                ry={r * (0.62 + rand() * 0.3)}
                fill="none"
                stroke={`url(#${uid}-line)`}
                strokeWidth={0.35 + (i % 3) * 0.12}
                strokeDasharray={i % 2 === 0 ? `${dash} ${dash * 0.6}` : undefined}
                opacity={1 - i * 0.07}
              />
            );
          })}
        </g>

        {/* nodes */}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={i}
            cx={cx + (rand() - 0.5) * 60}
            cy={cy + (rand() - 0.5) * 55}
            r={0.6 + rand() * 1.1}
            fill={c.b}
            opacity={0.5 + rand() * 0.4}
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

      {label && (
        <span className="absolute bottom-3 left-4 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ink-dim/80">
          {label}
        </span>
      )}
    </div>
  );
}
