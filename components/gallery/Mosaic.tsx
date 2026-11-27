'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY, large } from '@/lib/gallery';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/**
 * Every Summit photo, drawn as one tile each, forms the DISCOVER logo.
 * Scrolling dives into the mosaic: the tint falls away, tiles become real
 * photos and one of them opens up to fill the screen.
 */
export function Mosaic() {
  const root = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const big = useRef<HTMLImageElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const outro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = cv.current!, ctx = canvas.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = GALLERY.items.length, AC = GALLERY.cols, T = GALLERY.tile;
    const atlas = new Image(), logo = new Image();
    atlas.src = '/assets/gallery/atlas.jpg'; logo.src = '/assets/img/discover-logo.png';

    type Cell = { c: number; r: number; on: boolean; col: string; photo: number; sx: number; sy: number; d: number };
    let cells: Cell[] = [], cols = 0, rows = 0, focal = 0, ready = false;
    const state = { assemble: reduce ? 1 : 0, p: 0 };
    let W = 0, H = 0, dpr = 1;

    const build = () => {
      cols = innerWidth < 760 ? 46 : 78;
      rows = Math.round((cols * logo.naturalHeight) / logo.naturalWidth) + 2;
      const off = document.createElement('canvas'); off.width = cols; off.height = rows;
      const o = off.getContext('2d')!; o.drawImage(logo, 0, 1, cols, rows - 2);
      const px = o.getImageData(0, 0, cols, rows).data;
      cells = []; let k = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const j = (r * cols + c) * 4, a = px[j + 3];
        const on = a > 90;
        const photo = on ? (k++ * 37) % N : ((r * cols + c) * 13) % N;
        cells.push({ c, r, on, col: `rgb(${px[j]},${px[j + 1]},${px[j + 2]})`, photo, sx: (photo % AC) * T, sy: Math.floor(photo / AC) * T, d: Math.random() });
      }
      // focal tile: a filled cell near the middle of the logo
      const mid = cells.filter((x) => x.on).sort((a, b) => Math.hypot(a.c - cols * 0.5, a.r - rows * 0.5) - Math.hypot(b.c - cols * 0.5, b.r - rows * 0.5));
      focal = cells.indexOf(mid[0]);
      if (big.current) big.current.src = large(cells[focal].photo);
    };

    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
    };

    const draw = () => {
      if (!ready) return;
      const { p, assemble } = state;
      const s = Math.min((W * 0.9) / cols, (H * 0.62) / rows);          // tile size at rest
      const ox = (W - cols * s) / 2, oy = (H - rows * s) / 2 - H * 0.1 * (1 - ramp(p, 0, 0.3));
      const f = cells[focal];
      const fx = ox + (f.c + 0.5) * s, fy = oy + (f.r + 0.5) * s;
      const zMax = (Math.max(W, H) * 1.15) / s;
      const zp = ramp(p, 0.05, 0.8);
      const z = Math.pow(zMax, zp * zp * (3 - 2 * zp));
      const cx = W / 2 + (fx - W / 2) * (1 - zp), cy = H / 2 + (fy - H / 2) * (1 - zp); // drift focal to centre
      const tint = 0.8 * (1 - ramp(p, 0.02, 0.32));
      const ghost = 0.13 * (1 - ramp(p, 0, 0.25));
      const gap = Math.max(0.5, s * 0.08);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#081634'; ctx.fillRect(0, 0, W, H);
      for (const cl of cells) {
        if (!cl.on && ghost < 0.01) continue;
        // intro: tiles fly in from scattered spots
        const a = clamp((assemble - cl.d * 0.55) / 0.45);
        const e = 1 - Math.pow(1 - a, 3);
        let x = ox + cl.c * s, y = oy + cl.r * s;
        if (e < 1) { const ang = cl.d * 40, rad = (1 - e) * Math.max(W, H) * 0.7; x += Math.cos(ang) * rad; y += Math.sin(ang) * rad; }
        const X = cx + (x - fx) * z, Y = cy + (y - fy) * z, S = s * z;
        if (X > W || Y > H || X + S < 0 || Y + S < 0) continue;
        ctx.globalAlpha = (cl.on ? 1 : ghost) * e;
        ctx.drawImage(atlas, cl.sx, cl.sy, T, T, X + gap * z * 0.5, Y + gap * z * 0.5, S - gap * z, S - gap * z);
        if (cl.on && tint > 0.01) { ctx.globalAlpha = tint * e; ctx.fillStyle = cl.col; ctx.fillRect(X + gap * z * 0.5, Y + gap * z * 0.5, S - gap * z, S - gap * z); }
      }
      ctx.globalAlpha = 1;
      // The focal photo's full-size image rides on its tile and takes over as the tile grows.
      if (big.current) {
        const F = s * z, X = cx + (ox + f.c * s - fx) * z, Y = cy + (oy + f.r * s - fy) * z;
        const el = big.current;
        el.style.left = `${X}px`; el.style.top = `${Y}px`; el.style.width = `${F}px`; el.style.height = `${F}px`;
        el.style.opacity = String(ramp(F, 180, 520));
      }
      if (intro.current) { const v = 1 - ramp(p, 0.04, 0.18); intro.current.style.opacity = String(v * clamp(assemble * 1.4 - 0.4)); intro.current.style.transform = `translateY(${-30 * (1 - v)}px)`; }
      if (outro.current) { const v = ramp(p, 0.84, 0.95); outro.current.style.opacity = String(v); outro.current.style.transform = `translateY(${20 * (1 - v)}px)`; }
    };

    let st: ScrollTrigger | undefined;
    let n = 0;
    const go = () => {
      if (++n < 2) return;
      build(); size(); ready = true; draw();
      if (!reduce) gsap.to(state, { assemble: 1, duration: 2.4, ease: 'power2.out', onUpdate: draw });
      st = ScrollTrigger.create({ trigger: root.current!, start: 'top top', end: 'bottom bottom', scrub: 0.6, onUpdate: (self) => { state.p = self.progress; draw(); } });
    };
    atlas.onload = go; logo.onload = go;
    const onResize = () => { build(); size(); draw(); };
    addEventListener('resize', onResize);
    return () => { st?.kill(); removeEventListener('resize', onResize); gsap.killTweensOf(state); };
  }, []);

  return (
    <section ref={root} className="mosaic" aria-label={`${GALLERY.items.length} Summit photos forming the DISCOVER logo`}>
      <div className="mosaic-stick">
        <canvas ref={cv} className="mosaic-cv" aria-hidden="true" />
        <img ref={big} className="mosaic-big" alt="" aria-hidden="true" />
        <div ref={intro} className="mosaic-intro wrap">
          <div className="tag">The DISCOVER gallery · 2017–2026</div>
          <h1>{GALLERY.items.length} moments.<br /><em>One network.</em></h1>
          <p>Every tile in this logo is a real photo from a DISCOVER Summit. Scroll to step inside.</p>
        </div>
        <div ref={outro} className="mosaic-outro">
          <b>Now explore every one of them.</b>
          <span>Drag the wall below in any direction ↓</span>
        </div>
        <div className="mosaic-hint" aria-hidden="true">Scroll</div>
      </div>
    </section>
  );
}
