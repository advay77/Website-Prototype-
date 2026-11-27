'use client';

import { useEffect, useRef, useState } from 'react';

type Speaker = { photo: string; role: string; session: string; pos?: string };

/** "Meet the people on stage": a fanned deck of speaker cards. Drag, swipe, arrows or wait. */
export function SpeakerDeck({ items }: { items: Speaker[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; dx: number } | null>(null);
  const [dx, setDx] = useState(0);
  const n = items.length;
  const go = (k: number) => setI((v) => (v + k + n) % n);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => go(1), 4200);
    return () => clearInterval(id);
  }, [paused, n]);

  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, dx: 0 }; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setPaused(true); };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) return; drag.current.dx = e.clientX - drag.current.x; setDx(drag.current.dx); };
  const onUp = () => {
    if (!drag.current) return;
    const d = drag.current.dx; drag.current = null; setDx(0);
    if (Math.abs(d) > 60) go(d < 0 ? 1 : -1);
  };

  const cur = items[i];
  return (
    <div className="deck" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="deck-copy">
        <h2>Meet the people on stage.</h2>
        <p>Executives, practitioners and rising leaders from across the industry. These are moments from the 2026 stage; drag the cards or use the arrows.</p>
        <div className="deck-now" key={i}>
          <span>{cur.role}</span>
          <b>{cur.session}</b>
        </div>
        <div className="deck-ctrl">
          <button onClick={() => go(-1)} aria-label="Previous speaker">←</button>
          <div className="deck-dots">{items.map((_, k) => <i key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}</div>
          <button onClick={() => go(1)} aria-label="Next speaker">→</button>
        </div>
      </div>
      <div className="deck-stage" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {items.map((it, k) => {
          const off = (k - i + n) % n; // 0 = front
          const back = Math.min(off, 3);
          const front = off === 0;
          const style: React.CSSProperties = {
            zIndex: 10 - back,
            opacity: off > 2 ? 0 : 1 - back * 0.18,
            transform: front
              ? `translateX(${dx}px) rotate(${3 + dx / 25}deg)`
              : `translateX(${-back * 70}px) translateY(${back * 14}px) rotate(${3 - back * 6}deg) scale(${1 - back * 0.06})`,
            transition: drag.current && front ? 'none' : undefined,
          };
          return (
            <figure key={it.photo} className={`deck-card${front ? ' front' : ''}`} style={style} aria-hidden={!front}>
              <img src={`/assets/summit/${it.photo}-800.jpg`} alt={front ? `${it.role} at the 2026 DISCOVER Summit` : ''} draggable={false} style={it.pos ? { objectPosition: it.pos } : undefined} />
              <figcaption><span>{it.role}</span><b>{it.session}</b></figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
