import type { CSSProperties } from 'react';

/** Route-network background: nodes joined by dashed, flowing routes. Deterministic per seed. */
export function Net({ seed = 7, density = 22, className, style }: { seed?: number; density?: number; className?: string; style?: CSSProperties }) {
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const W = 1440, H = 800;
  const pts: [number, number][] = [];
  for (let i = 0; i < density; i++) pts.push([rnd() * W, rnd() * H]);
  const lines: string[] = [];
  pts.forEach((p, i) => {
    const near = pts.map((q, j) => [Math.hypot(p[0] - q[0], p[1] - q[1]), j] as const).sort((a, b) => a[0] - b[0]).slice(1, 3);
    near.forEach(([, j]) => {
      if (j < i) return;
      const q = pts[j], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 - 60;
      lines.push(`M${p[0]},${p[1]} Q${mx},${my} ${q[0]},${q[1]}`);
    });
  });
  return (
    <div className={className} style={style} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <radialGradient id={`glow${seed}`}>
            <stop offset="0" stopColor="#0a72ba" stopOpacity=".55" />
            <stop offset="1" stopColor="#0a72ba" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={W * 0.78} cy={H * 0.3} r="520" fill={`url(#glow${seed})`} />
        <g fill="none" stroke="#5cb8f0" strokeOpacity=".38" strokeWidth="1.2" strokeDasharray="5 8" className="flow">
          {lines.map((d, i) => <path key={i} d={d} />)}
        </g>
        <g fill="#5cb8f0">
          {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i % 5 === 0 ? 5 : 3} />)}
        </g>
      </svg>
    </div>
  );
}
