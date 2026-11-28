'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ITEMS, YEARS, thumb, large, type GItem } from '@/lib/gallery';

/**
 * An endless wall of every Summit photo. Drag (or swipe) in any direction;
 * it glides to a stop. Only the tiles on screen exist in the page, so all
 * ~700 photos stay light. Tap a photo and it flies open full screen.
 */
export function Wall() {
  const [year, setYear] = useState<number | null>(null);
  const list = useMemo(() => (year ? ITEMS.filter((x) => x.y === year) : ITEMS), [year]);
  const [open, setOpen] = useState<number | null>(null); // index in list
  const stage = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const geo = useRef({ cw: 260, ch: 190, gap: 14, C: 1, R: 1 });
  const slots = useRef<{ el: HTMLButtonElement; img: HTMLImageElement; cap: HTMLSpanElement; idx: number }[]>([]);
  const listRef = useRef<GItem[]>(list);
  listRef.current = list;
  const opener = useRef<HTMLElement | null>(null);

  // Lay out a torus of columns x rows; odd columns sit half a tile lower.
  const layoutFor = useCallback((n: number) => {
    const small = innerWidth < 760;
    const cw = small ? 150 : 250, ch = small ? 112 : 180, gap = small ? 10 : 14;
    const C = Math.max(4, Math.min(28, Math.ceil(Math.sqrt(n * 1.7)))), R = Math.max(3, Math.ceil(n / C));
    geo.current = { cw, ch, gap, C, R };
  }, []);

  const render = useCallback(() => {
    const st = stage.current; if (!st) return;
    const { cw, ch, gap, C, R } = geo.current, L = listRef.current, n = L.length;
    const W = st.clientWidth, H = st.clientHeight, sx = cw + gap, sy = ch + gap;
    const c0 = Math.floor(-pos.current.x / sx) - 1, r0 = Math.floor(-pos.current.y / sy) - 2;
    const vc = Math.ceil(W / sx) + 3, vr = Math.ceil(H / sy) + 4;
    let k = 0;
    for (let c = c0; c < c0 + vc; c++) for (let r = r0; r < r0 + vr; r++) {
      const slot = slots.current[k++]; if (!slot) continue;
      const cc = ((c % C) + C) % C, rr = ((r % R) + R) % R;
      const idx = (rr * C + cc) % n;
      const x = c * sx + pos.current.x, y = r * sy + pos.current.y + (c & 1 ? sy / 2 : 0);
      slot.el.style.transform = `translate3d(${x}px,${y}px,0)`;
      slot.el.style.display = '';
      if (slot.idx !== idx) {
        slot.idx = idx;
        const it = L[idx];
        slot.img.src = thumb(it.i);
        slot.cap.textContent = String(it.y);
        slot.el.dataset.idx = String(idx);
        slot.el.setAttribute('aria-label', `Open photo from ${it.y}`);
      }
    }
    for (; k < slots.current.length; k++) slots.current[k].el.style.display = 'none';
  }, []);

  // Build the pool of tile elements once per size.
  const buildPool = useCallback(() => {
    const st = stage.current!, ly = layer.current!;
    const { cw, ch, gap } = geo.current;
    const need = (Math.ceil(st.clientWidth / (cw + gap)) + 3) * (Math.ceil(st.clientHeight / (ch + gap)) + 4);
    while (slots.current.length < need) {
      const el = document.createElement('button'); el.className = 'w-tile'; el.type = 'button';
      const img = document.createElement('img'); img.alt = ''; img.decoding = 'async'; img.draggable = false;
      const cap = document.createElement('span');
      el.append(img, cap); ly.appendChild(el);
      slots.current.push({ el, img, cap, idx: -1 });
    }
    slots.current.forEach((s) => { s.el.style.width = `${cw}px`; s.el.style.height = `${ch}px`; s.idx = -1; });
  }, []);

  useEffect(() => {
    layoutFor(list.length); buildPool(); render();
    const onResize = () => { layoutFor(listRef.current.length); buildPool(); render(); };
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter: tiles drop away, the wall re-deals, tiles rise back in.
  useEffect(() => {
    if (!slots.current.length) return;
    const els = slots.current.map((s) => s.el);
    gsap.to(els, {
      opacity: 0, scale: 0.85, duration: 0.25, stagger: { each: 0.004, from: 'center' }, ease: 'power2.in',
      onComplete: () => {
        layoutFor(list.length); slots.current.forEach((s) => (s.idx = -1)); pos.current = { x: 0, y: 0 }; render();
        gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, stagger: { each: 0.006, from: 'center' }, ease: 'back.out(1.6)' });
      },
    });
  }, [list, layoutFor, render]);

  // Gentle drift until the first touch, so the wall feels alive.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const drift = gsap.to(pos.current, { x: '-=600', y: '-=180', duration: 30, ease: 'none', repeat: -1, onUpdate: render });
    const stop = () => drift.kill();
    stage.current!.addEventListener('pointerdown', stop, { once: true });
    return () => { drift.kill(); };
  }, [render]);

  // Drag with inertia.
  useEffect(() => {
    const st = stage.current!;
    let down = false, moved = 0, lx = 0, ly = 0, vx = 0, vy = 0, lt = 0;
    let glide: gsap.core.Tween | null = null;
    const onDown = (e: PointerEvent) => {
      down = true; moved = 0; lx = e.clientX; ly = e.clientY; vx = vy = 0; lt = performance.now();
      glide?.kill(); st.setPointerCapture(e.pointerId); st.classList.add('dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - lx, dy = e.clientY - ly, now = performance.now(), dt = Math.max(1, now - lt);
      pos.current.x += dx; pos.current.y += dy; moved += Math.abs(dx) + Math.abs(dy);
      vx = dx / dt; vy = dy / dt; lx = e.clientX; ly = e.clientY; lt = now; render();
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return; down = false; st.classList.remove('dragging');
      if (moved < 6) {
        const t = (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null)?.closest<HTMLElement>('.w-tile');
        if (t?.dataset.idx) { opener.current = t; setOpen(+t.dataset.idx); }
        return;
      }
      glide = gsap.to(pos.current, { x: pos.current.x + vx * 420, y: pos.current.y + vy * 420, duration: 1.3, ease: 'power3.out', onUpdate: render });
    };
    st.addEventListener('pointerdown', onDown); st.addEventListener('pointermove', onMove);
    st.addEventListener('pointerup', onUp); st.addEventListener('pointercancel', onUp);
    const onKey = (e: KeyboardEvent) => {
      if (open !== null || !st.matches(':hover, :focus-within')) return;
      const m: Record<string, [number, number]> = { ArrowLeft: [300, 0], ArrowRight: [-300, 0], ArrowUp: [0, 240], ArrowDown: [0, -240] };
      if (!m[e.key]) return; e.preventDefault();
      gsap.to(pos.current, { x: `+=${m[e.key][0]}`, y: `+=${m[e.key][1]}`, duration: 0.6, ease: 'power2.out', onUpdate: render });
    };
    addEventListener('keydown', onKey);
    return () => { st.removeEventListener('pointerdown', onDown); st.removeEventListener('pointermove', onMove); st.removeEventListener('pointerup', onUp); st.removeEventListener('pointercancel', onUp); removeEventListener('keydown', onKey); };
  }, [render, open]);

  return (
    <section className="wall-sec" aria-label="All Summit photos">
      <div className="wall-bar wrap">
        <div>
          <h2>Drag to explore.</h2>
        </div>
        <div className="wall-filters" role="tablist" aria-label="Year">
          <button role="tab" aria-selected={year === null} className={year === null ? 'on' : ''} onClick={() => setYear(null)}>All</button>
          {YEARS.map((y) => (
            <button key={y} role="tab" aria-selected={year === y} className={year === y ? 'on' : ''} onClick={() => setYear(y)}>
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="wall" ref={stage} tabIndex={0} aria-label="Photo wall. Drag, swipe or use the arrow keys to move; select a photo to open it.">
        <div className="wall-layer" ref={layer} />
        <div className="wall-hint" aria-hidden="true"><span>✋</span> Drag · tap a photo</div>
      </div>
      {open !== null && <Viewer list={list} index={open} from={opener.current} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

/** Full-screen viewer that grows out of the tile that was tapped. */
function Viewer({ list, index, from, onChange, onClose }: { list: GItem[]; index: number; from: HTMLElement | null; onChange: (i: number) => void; onClose: () => void }) {
  const img = useRef<HTMLImageElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const it = list[index];
  const step = useCallback((d: number) => onChange((index + d + list.length) % list.length), [index, list.length, onChange]);
  const close = useCallback(() => {
    gsap.to(box.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const el = img.current!;
    if (first.current && from) {
      first.current = false;
      const a = from.getBoundingClientRect();
      gsap.fromTo(box.current, { backgroundColor: 'rgba(4,10,26,0)' }, { backgroundColor: 'rgba(4,10,26,.94)', duration: 0.5 });
      requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        gsap.fromTo(el, { x: a.left + a.width / 2 - (b.left + b.width / 2), y: a.top + a.height / 2 - (b.top + b.height / 2), scale: a.width / b.width, borderRadius: 14 },
          { x: 0, y: 0, scale: 1, borderRadius: 10, duration: 0.7, ease: 'expo.out' });
      });
    } else {
      gsap.fromTo(el, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    }
  }, [index, from]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    addEventListener('keydown', k); document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [close, step]);

  let tx = 0;
  return (
    <div ref={box} className="w-viewer" role="dialog" aria-modal="true" aria-label={`Photo from ${it.y}`} onClick={close}
      onTouchStart={(e) => { tx = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); }}>
      <img ref={img} key={it.i} src={large(it.i)} alt={`DISCOVER Summit ${it.y}`} onClick={(e) => e.stopPropagation()} style={{ aspectRatio: `${it.w} / ${it.h}` }} />
      <div className="w-meta" onClick={(e) => e.stopPropagation()}><b>{it.y}</b><span>{index + 1} / {list.length}</span></div>
      <button className="lb-btn lb-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
      <button className="lb-btn lb-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
      <button className="lb-close" aria-label="Close" onClick={(e) => { e.stopPropagation(); close(); }}>×</button>
    </div>
  );
}
