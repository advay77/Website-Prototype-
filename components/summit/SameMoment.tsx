'use client';

import { useEffect, useRef, useState } from 'react';
import { MOMENTS } from '@/lib/years';

const EVERY = 4000;

/**
 * "Same moment, every year", as a departures board: every few seconds the
 * whole row flips, card by card, to the next kind of moment. Tabs pick one;
 * hovering the board holds it.
 */
export function SameMoment() {
  const [m, setM] = useState(0);
  const [prev, setPrev] = useState(0);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const years = Object.keys(MOMENTS[0].shots).sort();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  const go = (k: number) => { setPrev(m); setM(k); setTick((t) => t + 1); };

  useEffect(() => {
    if (!visible || hold || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setTimeout(() => go((m + 1) % MOMENTS.length), EVERY);
    return () => clearTimeout(id);
  }, [visible, hold, m]);

  const cur = MOMENTS[m], old = MOMENTS[prev];
  return (
    <div className="same" ref={root}>
      <div className="same-top">
        <div className="xp-tabs same-tabs" role="tablist" aria-label="Moment">
          {MOMENTS.map((x, i) => (
            <button key={x.key} role="tab" aria-selected={i === m} className={i === m ? 'on' : ''} onClick={() => { setHold(true); go(i); }}>
              {x.label}
            </button>
          ))}
        </div>
        <div className="board-now" aria-live="polite">
          <span>Now showing</span>
          <b key={tick}>{cur.label}</b>
        </div>
      </div>

      <div className="board" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        {years.map((y, i) => (
          <figure key={y} className={`flip${y === '2026' ? ' now' : ''}`}>
            <div className="flip-in" key={`${tick}-${y}`} style={{ animationDelay: `${i * 0.11}s` }}>
              <img className="face back" src={old.shots[y].thumb} alt="" aria-hidden="true" style={{ objectPosition: old.shots[y].pos }} />
              <img className="face front" src={cur.shots[y].thumb} alt={`${cur.label}, DISCOVER Summit ${y}`} style={{ objectPosition: cur.shots[y].pos }} />
            </div>
            <figcaption><span>{y}</span></figcaption>
          </figure>
        ))}
        <div className="board-bar" key={`bar-${tick}-${hold}`}><i className={hold || !visible ? 'held' : ''} /></div>
      </div>
      <p className="same-note">Seven Summits, side by side. The board flips to a new moment every few seconds; hover to hold it.</p>
    </div>
  );
}
