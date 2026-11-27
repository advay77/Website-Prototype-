'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY } from '@/lib/gallery';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * The DISCOVER logo, built from Summit photos. Scrolling in flies the tiles
 * into the logo; each tile wears the logo's own colour. Near the pointer the
 * tiles magnify like a dock (bigger, pushed apart, colour washed away) so the
 * real photos show through. Click → gallery.
 */
export function TeaserMosaic() {
  const cv = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = cv.current!, ctx = canvas.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = GALLERY.items.length, AC = GALLERY.cols, T = GALLERY.tile;
    const atlas = new Image(); atlas.src = '/assets/gallery/atlas.jpg';
    const logo = new Image(); logo.src = '/assets/img/discover-logo.png';
    type Cell = { x: number; y: number; sx: number; sy: number; d: number; fx: number; fy: number; rot: number; tint: string; lift: number };
    let cells: Cell[] = [], s = 10, W = 0, H = 0, dpr = 1, raf = 0, visible = false, loaded = 0;
    const st = { assemble: reduce ? 1 : 0, px: -9999, py: -9999, auto: true, t: 0 };
    let trig: ScrollTrigger | undefined;

    const build = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      const cols = W < 700 ? 56 : 96;
      s = W / cols;
      const rows = Math.floor(H / s);
      // Fit the logo inside the grid with a margin.
      const off = document.createElement('canvas'); off.width = cols; off.height = rows;
      const o = off.getContext('2d')!;
      const k = Math.min((cols * 0.9) / logo.naturalWidth, (rows * 0.8) / logo.naturalHeight);
      const lw = logo.naturalWidth * k, lh = logo.naturalHeight * k;
      o.drawImage(logo, (cols - lw) / 2, (rows - lh) / 2, lw, lh);
      const px = o.getImageData(0, 0, cols, rows).data;
      const oy = (H - rows * s) / 2;
      const solid = (r: number, c: number) => r >= 0 && c >= 0 && r < rows && c < cols && px[(r * cols + c) * 4 + 3] >= 120;
      cells = []; let n = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        if (!solid(r, c)) continue;
        // Drop specks (the tiny tagline) that have fewer than two solid neighbours.
        let nb = 0; for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if ((a || b) && solid(r + a, c + b)) nb++;
        if (nb < 2) continue;
        const ph = (n++ * 53) % N;
        const ang = Math.random() * Math.PI * 2, far = 0.35 + Math.random() * 0.5;
        cells.push({
          x: c * s, y: oy + r * s, sx: (ph % AC) * T, sy: Math.floor(ph / AC) * T, d: Math.random(),
          fx: Math.cos(ang) * W * far, fy: Math.sin(ang) * H * far * 1.4, rot: (Math.random() - 0.5) * 1.6,
          tint: `rgb(${px[i]},${px[i + 1]},${px[i + 2]})`, lift: 0,
        });
      }
    };

    const draw = () => {
      raf = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#081634'; ctx.fillRect(0, 0, W, H);
      if (st.auto && !reduce && st.assemble > 0.98) { st.t += 0.007; st.px = W * (0.5 + 0.4 * Math.sin(st.t * 1.2)); st.py = H * (0.5 + 0.18 * Math.sin(st.t * 2.3)); }
      const sigma = Math.max(46, W * 0.06), gap = Math.max(0.6, s * 0.1);
      let moving = false;
      const top: { c: Cell; X: number; Y: number; S: number }[] = [];
      for (const c of cells) {
        const a = clamp((st.assemble - c.d * 0.45) / 0.55), e = 1 - Math.pow(1 - a, 3);
        if (e <= 0.01) continue;
        const cx = c.x + s / 2, cy = c.y + s / 2;
        const dx = cx - st.px, dy = cy - st.py, dist = Math.hypot(dx, dy) || 1;
        const target = e > 0.98 ? Math.exp(-(dist * dist) / (2 * sigma * sigma)) : 0;
        c.lift += (target - c.lift) * 0.2; if (Math.abs(target - c.lift) > 0.004) moving = true;
        // Dock magnification: grow and push away from the pointer.
        const S = (s - gap) * (1 + c.lift * 2.6);
        const push = c.lift * s * 1.4;
        const X = cx + (dx / dist) * push + c.fx * (1 - e) - S / 2;
        const Y = cy + (dy / dist) * push + c.fy * (1 - e) - S / 2;
        if (c.lift > 0.04) { top.push({ c, X, Y, S }); continue; }
        ctx.globalAlpha = e;
        if (e < 1) {
          ctx.save(); ctx.translate(X + S / 2, Y + S / 2); ctx.rotate(c.rot * (1 - e));
          ctx.drawImage(atlas, c.sx, c.sy, T, T, -S / 2, -S / 2, S, S);
          ctx.globalAlpha = 0.8 * e; ctx.fillStyle = c.tint; ctx.fillRect(-S / 2, -S / 2, S, S);
          ctx.restore();
        } else {
          ctx.drawImage(atlas, c.sx, c.sy, T, T, X, Y, S, S);
          ctx.globalAlpha = 0.8; ctx.fillStyle = c.tint; ctx.fillRect(X, Y, S, S);
        }
      }
      // Magnified tiles last, smallest first, so the biggest sit on top.
      top.sort((p, q) => p.c.lift - q.c.lift);
      for (const { c, X, Y, S } of top) {
        const r = Math.min(8, S * 0.14);
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 14 * c.lift; ctx.shadowOffsetY = 4 * c.lift;
        ctx.beginPath(); ctx.roundRect(X, Y, S, S, r); ctx.fillStyle = '#0b1a36'; ctx.fill();
        ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.roundRect(X, Y, S, S, r); ctx.clip();
        ctx.drawImage(atlas, c.sx, c.sy, T, T, X, Y, S, S);
        ctx.globalAlpha = 0.8 * (1 - Math.min(1, c.lift * 1.6)); ctx.fillStyle = c.tint; ctx.fillRect(X, Y, S, S);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (visible && (st.auto || moving) && !reduce) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); st.auto = false; st.px = e.clientX - r.left; st.py = e.clientY - r.top; kick(); };
    const onLeave = () => { st.auto = true; kick(); };
    canvas.addEventListener('pointermove', onMove); canvas.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; kick(); }, { threshold: 0 });
    const go = () => {
      if (++loaded < 2) return;
      build(); io.observe(canvas);
      if (!reduce) {
        // Scrolling in assembles the logo.
        trig = ScrollTrigger.create({
          trigger: canvas, start: 'top 95%', end: 'center 55%', scrub: 0.6,
          onUpdate: (self) => { st.assemble = self.progress; kick(); },
        });
        st.assemble = trig.progress;
      }
      draw();
    };
    atlas.onload = go; logo.onload = go;
    const onResize = () => { build(); kick(); };
    addEventListener('resize', onResize);
    return () => { io.disconnect(); trig?.kill(); cancelAnimationFrame(raf); removeEventListener('resize', onResize); canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerleave', onLeave); };
  }, []);

  return (
    <div className="teaser">
      <canvas ref={cv} className="teaser-cv" role="link" tabIndex={0} aria-label={`The DISCOVER logo, built from ${GALLERY.items.length} Summit photos. Open the gallery.`}
        onClick={() => router.push('/gallery')} onKeyDown={(e) => { if (e.key === 'Enter') router.push('/gallery'); }} />
      <div className="teaser-foot">
        <span>Every tile is a real photo · move over the logo to magnify</span>
        <Link className="btn btn-white" href="/gallery">Explore all {GALLERY.items.length} photos <span className="arr">→</span></Link>
      </div>
    </div>
  );
}
