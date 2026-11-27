'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { GALLERY } from '@/lib/gallery';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * "10 YEARS" spelled in Summit photos. Each letter tile is a real photo
 * under a navy/blue tint; a spotlight (the pointer, or a slow sweep when
 * idle) washes the tint away so the photos show through. Click → gallery.
 */
export function TeaserMosaic() {
  const cv = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = cv.current!, ctx = canvas.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = GALLERY.items.length, AC = GALLERY.cols, T = GALLERY.tile;
    const atlas = new Image(); atlas.src = '/assets/gallery/atlas.jpg';
    type Cell = { x: number; y: number; on: boolean; sx: number; sy: number; d: number; lift: number };
    let cells: Cell[] = [], s = 10, W = 0, H = 0, dpr = 1, raf = 0, visible = false;
    const st = { assemble: reduce ? 1 : 0, px: -9999, py: -9999, auto: true, t: 0 };

    const build = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      const cols = W < 700 ? 54 : 104, rows = Math.round(cols * (H / W));
      s = W / cols;
      const off = document.createElement('canvas'); off.width = cols; off.height = rows;
      const o = off.getContext('2d')!;
      o.fillStyle = '#000'; o.textAlign = 'center'; o.textBaseline = 'middle';
      let fs = rows * 0.9; o.font = `900 ${fs}px Arial, sans-serif`;
      while (o.measureText('10 YEARS').width > cols * 0.94 && fs > 4) { fs -= 0.5; o.font = `900 ${fs}px Arial, sans-serif`; }
      o.fillText('10 YEARS', cols / 2, rows / 2 + fs * 0.04);
      const px = o.getImageData(0, 0, cols, rows).data;
      cells = []; let k = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const on = px[(r * cols + c) * 4 + 3] > 110;
        const ph = on ? (k++ * 53) % N : ((r * 31 + c * 17) * 7) % N;
        cells.push({ x: c * s, y: r * s, on, sx: (ph % AC) * T, sy: Math.floor(ph / AC) * T, d: Math.random(), lift: 0 });
      }
    };

    const draw = () => {
      raf = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#081634'; ctx.fillRect(0, 0, W, H);
      if (st.auto && !reduce) { st.t += 0.006; st.px = W * (0.5 + 0.42 * Math.sin(st.t * 1.3)); st.py = H * (0.5 + 0.28 * Math.sin(st.t * 2.1)); }
      const R = Math.max(90, W * 0.11), gap = Math.max(0.6, s * 0.1);
      let moving = false;
      for (const c of cells) {
        const a = clamp((st.assemble - c.d * 0.5) / 0.5), e = 1 - Math.pow(1 - a, 3);
        if (e <= 0) continue;
        const dx = c.x + s / 2 - st.px, dy = c.y + s / 2 - st.py, dist = Math.hypot(dx, dy);
        const near = clamp(1 - dist / R);
        const target = c.on ? near : near * 0.6;
        c.lift += (target - c.lift) * 0.18; if (Math.abs(target - c.lift) > 0.01) moving = true;
        const grow = 1 + c.lift * (c.on ? 0.45 : 0.25);
        const S = (s - gap) * grow, X = c.x + s / 2 - S / 2, Y = c.y + s / 2 - S / 2 + (1 - e) * 40;
        ctx.globalAlpha = (c.on ? 1 : 0.1 + c.lift * 0.55) * e;
        ctx.drawImage(atlas, c.sx, c.sy, T, T, X, Y, S, S);
        if (c.on) {
          ctx.globalAlpha = 0.78 * (1 - c.lift) * e;
          ctx.fillStyle = c.y < H / 2 ? '#2f86d6' : '#22398a';
          ctx.fillRect(X, Y, S, S);
        }
      }
      ctx.globalAlpha = 1;
      if (visible && (st.auto || moving) && !reduce) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); st.auto = false; st.px = e.clientX - r.left; st.py = e.clientY - r.top; kick(); };
    const onLeave = () => { st.auto = true; kick(); };
    canvas.addEventListener('pointermove', onMove); canvas.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && st.assemble === 0) gsap.to(st, { assemble: 1, duration: 1.8, ease: 'power2.out', onUpdate: kick });
      kick();
    }, { threshold: 0.2 });
    atlas.onload = () => { build(); io.observe(canvas); draw(); };
    const onResize = () => { build(); kick(); };
    addEventListener('resize', onResize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener('resize', onResize); canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerleave', onLeave); };
  }, []);

  return (
    <div className="teaser">
      <canvas ref={cv} className="teaser-cv" role="link" tabIndex={0} aria-label={`Ten years of DISCOVER, spelled in ${GALLERY.items.length} Summit photos. Open the gallery.`}
        onClick={() => router.push('/gallery')} onKeyDown={(e) => { if (e.key === 'Enter') router.push('/gallery'); }} />
      <div className="teaser-foot">
        <span>Every tile is a real photo · move over the letters to look closer</span>
        <Link className="btn btn-white" href="/gallery">Explore all {GALLERY.items.length} photos <span className="arr">→</span></Link>
      </div>
    </div>
  );
}
