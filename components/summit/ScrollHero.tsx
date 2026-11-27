'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const FRAMES = 72;
const src = (set: 'd' | 'm', i: number) => `/assets/scroll/${set}/${String(i).padStart(3, '0')}.webp`;

/** 0 before a, 1 after b, smooth in between. */
const ramp = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
/** Fades in over [a, b] and out over [c, d]. */
const band = (p: number, a: number, b: number, c: number, d: number) => Math.min(ramp(p, a, b), 1 - ramp(p, c, d));
const ease = (t: number) => t * t * (3 - 2 * t);

const WORDS = [
  { w: 'Learn', line: 'Insights from the leaders shaping what’s next.', at: [0.3, 0.36, 0.46, 0.52] },
  { w: 'Connect', line: 'Across pharma, retail, consulting and academia.', at: [0.52, 0.58, 0.66, 0.72] },
  { w: 'Grow', line: 'Your career, and your organization’s bench.', at: [0.72, 0.78, 0.86, 0.92] },
];

/**
 * Scroll-driven Summit hero: the page is pinned while scrolling walks the
 * camera from the back of the 2026 hall towards the stage (72 depth-rendered
 * frames on a canvas). The headline gives way to Learn / Connect / Grow.
 */
export function ScrollHero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const words = useRef<(HTMLDivElement | null)[]>([]);
  const outro = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!, cv = canvas.current!, ctx = cv.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const set: 'd' | 'm' = innerWidth < 760 ? 'm' : 'd';
    const imgs: (HTMLImageElement | null)[] = Array(FRAMES).fill(null);
    let want = 0, drawn = -1, raf = 0, alive = true, size = '';

    const draw = () => {
      // nearest loaded frame at or before the one we want
      let i = want;
      while (i > 0 && !imgs[i]) i--;
      const img = imgs[i];
      if (!img) return;
      const w = cv.clientWidth, h = cv.clientHeight, dpr = Math.min(devicePixelRatio || 1, 2);
      const key = `${Math.round(w * dpr)}x${Math.round(h * dpr)}`;
      if (key !== size) { size = key; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); drawn = -1; }
      if (i === drawn) return;
      const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.drawImage(img, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh);
      drawn = i;
    };

    const load = (i: number) => new Promise<void>((res) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => { imgs[i] = im; if (alive) draw(); res(); };
      im.onerror = () => res();
      im.src = src(set, i);
    });

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, el.offsetHeight - innerHeight);
      const p = reduce ? 0 : Math.min(1, Math.max(0, -r.top / span));
      want = Math.round(ease(p) * (FRAMES - 1));
      draw();
      const a = 1 - ramp(p, 0.16, 0.28);
      if (intro.current) { intro.current.style.opacity = String(a); intro.current.style.transform = `translateY(${-40 * (1 - a)}px)`; intro.current.style.pointerEvents = a < 0.2 ? 'none' : ''; }
      WORDS.forEach((wd, k) => {
        const n = words.current[k]; if (!n) return;
        const o = band(p, ...(wd.at as [number, number, number, number]));
        n.style.opacity = String(o);
        n.style.transform = `translateY(${30 * (1 - o)}px) scale(${0.96 + 0.04 * o})`;
      });
      const e = ramp(p, 0.92, 0.98);
      if (outro.current) { outro.current.style.opacity = String(e); outro.current.style.transform = `translateY(${24 * (1 - e)}px)`; outro.current.style.pointerEvents = e > 0.5 ? '' : 'none'; }
      if (hint.current) hint.current.style.opacity = String(1 - ramp(p, 0, 0.06));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    load(0).then(async () => {
      update();
      if (reduce) return;
      // the rest, every 4th frame first so a coarse scrub works early
      const order = [...Array(FRAMES).keys()].sort((x, y) => (x % 4) - (y % 4) || x - y).filter((i) => i > 0);
      for (let k = 0; k < order.length && alive; k += 6) await Promise.all(order.slice(k, k + 6).map(load));
    });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
    return () => { alive = false; removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={root} className="sh" aria-label="DISCOVER Summit 2027">
      <div className="sh-stick">
        <canvas ref={canvas} className="sh-canvas" aria-hidden="true" style={{ backgroundImage: `url(${src('d', 0)})` }} />
        <div className="sh-shade" aria-hidden="true" />

        <div className="wrap sh-layer">
          <div ref={intro} className="sh-intro">
            <h1>The future of supply chain starts <em>with connection.</em></h1>
            <p className="lead">Join emerging talent, industry leaders and organizations shaping the next generation of supply chain leadership. Two days, 100+ leaders, one Gala.</p>
            <div className="chips s-chips"><span>September 2027</span><span>New Jersey · venue soon</span><span>2 days + Gala</span></div>
            <div className="ctas">
              <a className="btn btn-primary" href="#tickets">Register for the Summit <span className="arr">→</span></a>
              <Link className="btn btn-ghost s-ghost" href="/sponsors">Explore sponsorship</Link>
            </div>
          </div>

          {WORDS.map((wd, k) => (
            <div key={wd.w} ref={(n) => { words.current[k] = n; }} className="sh-word" aria-hidden="true">
              <b>{wd.w}</b>
              <span>{wd.line}</span>
            </div>
          ))}

          <div ref={outro} className="sh-outro" aria-hidden="true">
            <b>Take your seat.</b>
            <div className="ctas">
              <a className="btn btn-white" href="#tickets" tabIndex={-1}>Get your pass · $299 <span className="arr">→</span></a>
            </div>
          </div>
        </div>

        <div ref={hint} className="sh-hint" aria-hidden="true"><span>Scroll to walk in</span><i /></div>
        <div className="sh-bar" aria-hidden="true"><div ref={bar} /></div>
      </div>
    </section>
  );
}
