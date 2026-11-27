'use client';

import { useEffect, useRef } from 'react';
import { GALLERY } from '@/lib/gallery';

/**
 * Background for the final call to action: every Summit photo as a dim
 * tile, with tiles quietly lighting up and changing photo, like a room
 * full of people. The centre is left dark for the message.
 */
export function LiveMosaicBg() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = cv.current!, ctx = canvas.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = GALLERY.items.length, AC = GALLERY.cols, T = GALLERY.tile;
    const atlas = new Image(); atlas.src = '/assets/gallery/atlas.jpg';
    type Cell = { x: number; y: number; ph: number; glow: number; base: number };
    let cells: Cell[] = [], s = 60, W = 0, H = 0, dpr = 1, raf = 0, visible = false, last = 0, acc = 0;

    const build = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      s = W < 700 ? 44 : 64;
      const cols = Math.ceil(W / s) + 1, rows = Math.ceil(H / s) + 1;
      cells = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const nx = (c * s + s / 2 - W / 2) / (W / 2), ny = (r * s + s / 2 - H / 2) / (H / 2);
        const centre = Math.max(0, 1 - Math.hypot(nx * 0.9, ny * 1.3)); // darker in the middle
        cells.push({ x: c * s, y: r * s, ph: Math.floor(Math.random() * N), glow: 0, base: 0.42 * (1 - centre * 0.85) });
      }
    };
    const draw = (now = 0) => {
      raf = 0;
      const dt = Math.min(64, now - last || 16); last = now; acc += dt;
      if (!reduce) while (acc > 90) { acc -= 90; const c = cells[Math.floor(Math.random() * cells.length)]; if (c) { c.glow = 1; c.ph = Math.floor(Math.random() * N); } }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#081634'; ctx.fillRect(0, 0, W, H);
      const gap = 3;
      for (const c of cells) {
        c.glow *= 0.985;
        ctx.globalAlpha = Math.min(1, c.base + c.glow * 0.55);
        ctx.drawImage(atlas, (c.ph % AC) * T, Math.floor(c.ph / AC) * T, T, T, c.x + gap / 2, c.y + gap / 2, s - gap, s - gap);
      }
      ctx.globalAlpha = 1;
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(draw); }, { threshold: 0 });
    atlas.onload = () => { build(); draw(); io.observe(canvas); };
    const onResize = () => { build(); if (!raf) raf = requestAnimationFrame(draw); };
    addEventListener('resize', onResize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={cv} className="s-final-cv" aria-hidden="true" />;
}
