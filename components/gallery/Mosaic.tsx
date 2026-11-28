'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY, thumb } from '@/lib/gallery';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Magnifier: a few tiles near the pointer lift out of the logo as large,
// sharp photo cards (few pictures, each clearly visible). x/y are the card's
// offset from the pointer and z its size, in units of one card; dc/dr pick the
// tile (relative to the tile under the pointer) whose photo it shows.
type Slot = { dc: number; dr: number; x: number; y: number; z: number; rot?: number };
type Mag = { slots: Slot[]; polaroid?: boolean };
/** The client picks one of the screenshot options; the preview can try others with ?mag=1..5. */
const MAG_OPTIONS: Record<string, Mag> = {
  // 1 · Spotlight: one big photo
  1: { slots: [{ dc: 0, dr: 0, x: 0, y: 0, z: 1.75 }] },
  // 2 · Trio: three in a row, the middle one larger
  2: { slots: [{ dc: -1, dr: 0, x: -1.11, y: 0, z: 0.9 }, { dc: 1, dr: 0, x: 1.11, y: 0, z: 0.9 }, { dc: 0, dr: 0, x: 0, y: 0, z: 1.16 }] },
  // 3 · Plus: one in the middle, four around it
  3: { slots: [{ dc: 0, dr: -1, x: 0, y: -1.06, z: 0.78 }, { dc: -1, dr: 0, x: -1.06, y: 0, z: 0.78 }, { dc: 1, dr: 0, x: 1.06, y: 0, z: 0.78 }, { dc: 0, dr: 1, x: 0, y: 1.06, z: 0.78 }, { dc: 0, dr: 0, x: 0, y: 0, z: 1.18 }] },
  // 4 · Square: a 2 x 2 block
  4: { slots: [{ dc: 0, dr: 0, x: -0.54, y: -0.54, z: 1 }, { dc: 1, dr: 0, x: 0.54, y: -0.54, z: 1 }, { dc: 0, dr: 1, x: -0.54, y: 0.54, z: 1 }, { dc: 1, dr: 1, x: 0.54, y: 0.54, z: 1 }] },
  // 5 · Polaroids: three framed prints, fanned out
  5: { polaroid: true, slots: [{ dc: -1, dr: 0, x: -0.92, y: 0.08, z: 1, rot: -9 }, { dc: 1, dr: 0, x: 0.92, y: 0.08, z: 1, rot: 9 }, { dc: 0, dr: 0, x: 0, y: -0.04, z: 1.12, rot: -1.5 }] },
};
let MAGNIFIER: Mag = MAG_OPTIONS[2];
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/**
 * Every Summit photo, drawn as one tile each, forms the DISCOVER logo.
 * Scrolling dives into the mosaic: the tint falls away, tiles become real
 * photos and the view flies through the logo. At rest, the tiles under the
 * pointer magnify like a dock and lose their tint so the real photos show.
 */
export function Mosaic() {
  const root = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const outro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = cv.current!, ctx = canvas.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = GALLERY.items.length, AC = GALLERY.cols, T = GALLERY.tile;
    const atlas = new Image(), logo = new Image();
    atlas.src = '/assets/gallery/atlas.jpg'; logo.src = '/assets/img/discover-logo.png';

    type Cell = { c: number; r: number; on: boolean; col: string; photo: number; sx: number; sy: number; d: number; lift: number; slot?: Slot };
    let cells: Cell[] = [], cols = 0, rows = 0, focal = 0, ready = false;
    const q = new URLSearchParams(location.search).get('mag');
    if (q && MAG_OPTIONS[q]) MAGNIFIER = MAG_OPTIONS[q];
    // Sharp 360px thumbnails for magnified tiles (the atlas is only 64px a tile).
    const sharp = new Map<number, HTMLImageElement>();
    const drawPhoto = (cl: { photo: number; sx: number; sy: number }, X: number, Y: number, S: number) => {
      let im = sharp.get(cl.photo);
      if (!im) { im = new Image(); im.src = thumb(cl.photo); im.onload = () => kick(); sharp.set(cl.photo, im); }
      if (im.complete && im.naturalWidth) {
        const k = Math.min(im.naturalWidth, im.naturalHeight);
        ctx.drawImage(im, (im.naturalWidth - k) / 2, (im.naturalHeight - k) / 2, k, k, X, Y, S, S);
      } else ctx.drawImage(atlas, cl.sx, cl.sy, T, T, X, Y, S, S);
    };
    const state = { assemble: reduce ? 1 : 0, p: 0 };
    const ptr = { x: -9999, y: -9999, auto: true, t: 0 };
    let raf = 0, visible = true;
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
        cells.push({ c, r, on, col: `rgb(${px[j]},${px[j + 1]},${px[j + 2]})`, photo, sx: (photo % AC) * T, sy: Math.floor(photo / AC) * T, d: Math.random(), lift: 0 });
      }
      // The tiny tagline under the logo turns into grey specks at this size;
      // small islands of tiles become ordinary background photos instead.
      const seen = new Uint8Array(cells.length);
      for (let i0 = 0; i0 < cells.length; i0++) {
        if (!cells[i0].on || seen[i0]) continue;
        const comp: number[] = [], stack = [i0]; seen[i0] = 1;
        while (stack.length) {
          const i = stack.pop()!; comp.push(i);
          const c = i % cols, r = (i / cols) | 0;
          for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nc = c + dc, nr = r + dr, j = nr * cols + nc;
            if (nc >= 0 && nc < cols && nr >= 0 && nr < rows && !seen[j] && cells[j].on) { seen[j] = 1; stack.push(j); }
          }
        }
        const rs = comp.map((i) => (i / cols) | 0), tall = Math.max(...rs) - Math.min(...rs) + 1;
        if (tall <= Math.max(4, rows * 0.22)) for (const i of comp) cells[i].on = false;
      }
      // focal tile: a filled cell near the middle of the logo
      const mid = cells.filter((x) => x.on).sort((a, b) => Math.hypot(a.c - cols * 0.5, a.r - rows * 0.5) - Math.hypot(b.c - cols * 0.5, b.r - rows * 0.5));
      focal = cells.indexOf(mid[0]);
    };

    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
    };

    const draw = () => {
      if (!ready) return;
      const { p, assemble } = state;
      const s = Math.min((W * 0.9) / cols, (H * 0.62) / rows);          // tile size at rest
      const ox = (W - cols * s) / 2, oy = (H - rows * s) / 2;
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
      // Magnifier: only while the logo is at rest (not mid-dive).
      const mag = reduce ? 0 : (1 - ramp(p, 0, 0.04)) * ramp(assemble, 0.85, 1);
      if (mag > 0 && ptr.auto) { ptr.t += 0.006; ptr.x = W * (0.5 + 0.38 * Math.sin(ptr.t * 1.2)); ptr.y = oy + rows * s * (0.5 + 0.3 * Math.sin(ptr.t * 2.1)); }
      const M = MAGNIFIER;
      // Which tiles become cards this frame.
      const pc = Math.floor((ptr.x - ox) / s), pr = Math.floor((ptr.y - oy) / s);
      const picked = new Map<number, Slot>();
      if (mag > 0 && pr >= -1 && pr <= rows && pc >= -1 && pc <= cols) for (const sl of M.slots) {
        const c = Math.min(cols - 1, Math.max(0, pc + sl.dc)), r = Math.min(rows - 1, Math.max(0, pr + sl.dr));
        picked.set(r * cols + c, sl);
      }
      const B = Math.min(230, Math.max(92, Math.min(W, H) * 0.17));
      // Keep the whole group of cards on screen.
      let ex = 0, ey = 0;
      for (const sl of M.slots) { ex = Math.max(ex, Math.abs(sl.x) + sl.z * 0.62); ey = Math.max(ey, Math.abs(sl.y) + sl.z * (M.polaroid ? 0.75 : 0.62)); }
      const ax = clamp(ptr.x, ex * B + 8, W - ex * B - 8), ay = clamp(ptr.y, ey * B + 8, H - ey * B - 8);
      let moving = false;
      const lens: { cl: Cell; X: number; Y: number; S: number }[] = [];
      for (let i = 0; i < cells.length; i++) {
        const cl = cells[i];
        // intro: tiles fly in from scattered spots
        const a = clamp((assemble - cl.d * 0.55) / 0.45);
        const e = 1 - Math.pow(1 - a, 3);
        let x = ox + cl.c * s, y = oy + cl.r * s;
        if (e < 1) { const ang = cl.d * 40, rad = (1 - e) * Math.max(W, H) * 0.7; x += Math.cos(ang) * rad; y += Math.sin(ang) * rad; }
        const X = cx + (x - fx) * z, Y = cy + (y - fy) * z, S = s * z;
        const sl = picked.get(i);
        if (sl) cl.slot = sl;
        const target = sl ? mag : 0;
        cl.lift += (target - cl.lift) * 0.16; if (Math.abs(target - cl.lift) > 0.003) moving = true; else cl.lift = target;
        if (cl.lift > 0.005 && cl.slot) lens.push({ cl, X, Y, S });
        if (!cl.on && ghost < 0.01) continue;
        if (X > W || Y > H || X + S < 0 || Y + S < 0) continue;
        const g = gap * z * 0.5;
        ctx.globalAlpha = (cl.on ? 1 : ghost) * e;
        ctx.drawImage(atlas, cl.sx, cl.sy, T, T, X + g, Y + g, S - g * 2, S - g * 2);
        if (cl.on && tint > 0.01) { ctx.globalAlpha = tint * e; ctx.fillStyle = cl.col; ctx.fillRect(X + g, Y + g, S - g * 2, S - g * 2); }
      }
      // Cards fly out of their tile to their place by the pointer, and back again when dropped.
      lens.sort((m, n2) => (m.cl.lift - n2.cl.lift) || (m.cl.slot!.z - n2.cl.slot!.z));
      for (const { cl, X, Y, S } of lens) {
        const sl = cl.slot!, k = cl.lift * cl.lift * (3 - 2 * cl.lift);
        const size = S + (sl.z * B - S) * k;
        const ccx = X + S / 2 + (ax + sl.x * B - X - S / 2) * k, ccy = Y + S / 2 + (ay + sl.y * B - Y - S / 2) * k;
        const fr = Math.max(1, size * 0.035), foot = M.polaroid ? size * 0.2 : fr;
        ctx.save();
        ctx.translate(ccx, ccy); ctx.rotate(((sl.rot ?? 0) * k * Math.PI) / 180);
        ctx.globalAlpha = Math.min(1, 0.3 + k);
        ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 30 * k; ctx.shadowOffsetY = 12 * k;
        const w = size + fr * 2, h = size + fr + foot, r = M.polaroid ? 4 : Math.min(16, size * 0.09);
        ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, r); ctx.fillStyle = '#fff'; ctx.fill(); ctx.shadowColor = 'transparent';
        ctx.beginPath(); ctx.roundRect(-size / 2, -h / 2 + fr, size, size, M.polaroid ? 2 : Math.max(0, r - fr)); ctx.clip();
        drawPhoto(cl, -size / 2, -h / 2 + fr, size);
        ctx.restore();
      }
      if (visible && mag > 0 && (ptr.auto || moving)) { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); }
      ctx.globalAlpha = 1;
      // The dive ends on a calm navy screen for the closing line (no single photo).
      const fade = ramp(p, 0.4, 0.68);
      if (fade > 0) { ctx.globalAlpha = fade; ctx.fillStyle = '#081634'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
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
    const kick = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); };
    const sec = root.current!;
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); ptr.auto = false; ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; kick(); };
    const onLeave = () => { ptr.auto = true; kick(); };
    sec.addEventListener('pointermove', onMove); sec.addEventListener('pointerleave', onLeave);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); });
    io.observe(sec);
    const onResize = () => { build(); size(); draw(); };
    addEventListener('resize', onResize);
    return () => { st?.kill(); io.disconnect(); cancelAnimationFrame(raf); sec.removeEventListener('pointermove', onMove); sec.removeEventListener('pointerleave', onLeave); removeEventListener('resize', onResize); gsap.killTweensOf(state); };
  }, []);

  return (
    <section ref={root} className="mosaic" aria-label={`The DISCOVER gallery: ${GALLERY.items.length} Summit photos forming the DISCOVER logo`}>
      <div className="mosaic-stick">
        <h1 className="sr-only">The DISCOVER gallery: {GALLERY.items.length} Summit photos, 2017–2026</h1>
        <canvas ref={cv} className="mosaic-cv" aria-hidden="true" />
        <div ref={outro} className="mosaic-outro">
          <b>Now explore every one of them.</b>
          <span>Drag the wall below in any direction ↓</span>
        </div>
        <div className="mosaic-hint" aria-hidden="true">Scroll</div>
      </div>
    </section>
  );
}
