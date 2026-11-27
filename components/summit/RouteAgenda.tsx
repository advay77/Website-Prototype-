'use client';

import { useEffect, useRef, useState } from 'react';

type Slot = { time: string; title: string; short: string; note: string; photo: string; alt: string; stop?: string };

const PER_STOP = 5;
const PHOTO_MS = 2600;
const img = (stop: string, k: number, w: 400 | 1600) => `/assets/summit/stops/${stop}-${k}-${w}.jpg`;
type Day = { key: string; label: string; theme: string; slots: Slot[] };

const Truck = () => (
  <svg viewBox="0 0 64 40" aria-hidden="true">
    <rect x="2" y="6" width="36" height="22" rx="4" fill="#0a72ba" />
    <path d="M38 12h12l10 10v6H38z" fill="#22398a" />
    <path d="M42 15h7l6 6H42z" fill="#9fd4ff" />
    <circle cx="14" cy="31" r="6" fill="#081634" /><circle cx="14" cy="31" r="2.4" fill="#fff" />
    <circle cx="48" cy="31" r="6" fill="#081634" /><circle cx="48" cy="31" r="2.4" fill="#fff" />
    <text x="20" y="21" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="sans-serif">DSC</text>
  </svg>
);

/**
 * "Your two days, mapped like a supply chain route": a truck drives the
 * dashed route to each session stop. Auto-advances while on screen until
 * someone picks a stop.
 */
export function RouteAgenda({ days }: { days: Day[] }) {
  const [day, setDay] = useState(0);
  const [stop, setStop] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [shot, setShot] = useState(0);
  const [hold, setHold] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const d = days[day];
  const n = d.slots.length;
  const pos = (i: number) => (n === 1 ? 50 : 9 + (82 * i) / (n - 1));

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setTimeout(() => {
      if (stop < n - 1) setStop(stop + 1);
      else { setDay((day + 1) % days.length); setStop(0); }
    }, PHOTO_MS * PER_STOP);
    return () => clearTimeout(id);
  }, [auto, visible, stop, day, n, days.length]);

  // New stop: start from its first photo.
  useEffect(() => setShot(0), [day, stop]);

  // Photos inside the stop rotate on their own, unless the pointer rests on them.
  useEffect(() => {
    if (!visible || hold || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setShot((k) => (k + 1) % PER_STOP), PHOTO_MS);
    return () => clearInterval(id);
  }, [visible, hold, day, stop]);

  const pick = (i: number) => { setAuto(false); setStop(i); };
  const s = d.slots[stop];

  return (
    <div className="route" ref={root}>
      <div className="route-top">
        <div className="xp-tabs route-tabs" role="tablist" aria-label="Summit days">
          {days.map((dd, i) => (
            <button key={dd.key} role="tab" aria-selected={i === day} className={i === day ? 'on' : ''} onClick={() => { setAuto(false); setDay(i); setStop(0); }}>
              {dd.label}<small>{dd.theme}</small>
            </button>
          ))}
        </div>
        <span className="route-eta"><i />{d.label} · stop {stop + 1} of {n}</span>
      </div>

      <div className="route-map">
        <div className="route-line" />
        <div className="route-done" style={{ width: `${pos(stop) - 9}%` }} />
        <div className="route-truck" style={{ left: `${pos(stop)}%` }}><Truck /></div>
        {d.slots.map((sl, i) => (
          <button key={`${day}-${sl.time}`} className={`route-stop${i === stop ? ' on' : ''}${i < stop ? ' past' : ''}`} style={{ left: `${pos(i)}%` }} onClick={() => pick(i)} aria-pressed={i === stop} aria-label={`${sl.time} ${sl.title}`}>
            <i style={{ backgroundImage: `url(${sl.stop ? img(sl.stop, 0, 400) : `/assets/summit/${sl.photo}-800.jpg`})` }}>{sl.stop && <em>{PER_STOP}</em>}</i>
            <b>{sl.short}</b>
            <small>{sl.time}</small>
          </button>
        ))}
      </div>

      <div className="route-card" key={`${day}-${stop}`}>
        <div className="route-ph" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {s.stop ? (
            <>
              {Array.from({ length: PER_STOP }, (_, k) => (
                <img key={k} className={k === shot ? 'on' : ''} src={img(s.stop!, k, 1600)} alt={k === shot ? `${s.alt} (${k + 1} of ${PER_STOP})` : ''} loading={k === 0 ? 'eager' : 'lazy'} aria-hidden={k !== shot} />
              ))}
              <div className="bubbles" role="group" aria-label="Photos from this moment">
                {Array.from({ length: PER_STOP }, (_, k) => (
                  <button key={k} className={`bubble${k === shot ? ' on' : ''}`} style={{ animationDelay: `${k * -0.7}s` }} onClick={() => { setShot(k); setHold(true); setAuto(false); }} aria-label={`Photo ${k + 1} of ${PER_STOP}`} aria-pressed={k === shot}>
                    <span style={{ backgroundImage: `url(${img(s.stop!, k, 400)})` }} />
                  </button>
                ))}
              </div>
              <div className="route-progress" key={`${day}-${stop}-${shot}-${hold}`}><i className={hold ? 'held' : ''} /></div>
            </>
          ) : (
            <img className="on" src={`/assets/summit/${s.photo}-1600.jpg`} alt={s.alt} />
          )}
        </div>
        <div className="route-txt">
          <div className="tag">Stop {stop + 1} · {s.time} · {d.label}</div>
          <h3>{s.title}</h3>
          <p>{s.note}</p>
          <div className="route-nav">
            <button onClick={() => pick(Math.max(0, stop - 1))} disabled={stop === 0} aria-label="Previous stop">←</button>
            <button onClick={() => pick(Math.min(n - 1, stop + 1))} disabled={stop === n - 1} aria-label="Next stop">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
