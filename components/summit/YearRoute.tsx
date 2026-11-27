'use client';

import { useEffect, useRef, useState } from 'react';
import { Lightbox } from './Lightbox';
import type { Year } from '@/lib/years';

const BUBBLES = 6;
const PHOTO_MS = 3500;

/**
 * Every Summit from 2017 to 2026 as a row of photo circles (no truck). Each
 * year shows its photos one at a time; "View all" opens them all.
 */
export function YearRoute({ years }: { years: Year[] }) {
  const [at, setAt] = useState(0);
  const [shot, setShot] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const n = years.length;
  const y = years[at];
  const shown = y.shots.slice(0, BUBBLES);
  const pos = (i: number) => 5 + (90 * i) / (n - 1);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);
  useEffect(() => setShot(0), [at]);

  // Photos rotate inside a year; after a full round the truck drives on.
  useEffect(() => {
    if (!visible || hold || viewer !== null || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setTimeout(() => {
      if (shown.length && shot < shown.length - 1) setShot(shot + 1);
      else if (auto) setAt((at + 1) % n);
      else if (shown.length) setShot(0);
    }, PHOTO_MS);
    return () => clearTimeout(id);
  }, [visible, hold, viewer, shot, at, auto, shown.length, n]);

  // Keep the current year in view on narrow screens.
  useEffect(() => {
    const sc = scroller.current; if (!sc || sc.scrollWidth <= sc.clientWidth) return;
    const el = sc.querySelector<HTMLElement>('.route-stop.on'); if (!el) return;
    sc.scrollTo({ left: el.offsetLeft - sc.clientWidth / 2, behavior: 'smooth' });
  }, [at]);

  const pick = (i: number) => { setAuto(false); setAt(i); };
  const cur = shown[shot];

  return (
    <div className="route yroute no-truck" ref={root}>
      <div className="route-top">
        <span className="route-eta"><i />{y.year} · {y.city}</span>
        <span className="yr-count">{years.length} Summits · since {years[0].year}</span>
      </div>

      <div className="yr-scroll" ref={scroller}>
        <div className="route-map yr-map">
          <div className="route-line" style={{ left: '5%', right: '5%' }} />
          {years.map((v, i) => (
            <button key={v.year} className={`route-stop${i === at ? ' on' : ''}${i < at ? ' past' : ''}${v.shots.length ? '' : ' empty'}`} style={{ left: `${pos(i)}%` }} onClick={() => pick(i)} aria-pressed={i === at} aria-label={`${v.year}, ${v.city}`}>
              <i style={v.shots[0] ? { backgroundImage: `url(${v.shots[0].thumb})` } : undefined}>
                {!v.shots.length && <span>{v.virtual ? '◎' : '…'}</span>}
              </i>
              <b>{v.year}</b>
              <small>{v.virtual ? 'Virtual' : v.city.split(',')[0]}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="route-card" key={y.year}>
        <div className="route-ph" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {shown.length ? (
            <>
              {shown.map((s, k) => (
                <img key={s.src} className={k === shot ? 'on' : ''} src={s.src} alt={k === shot ? s.alt : ''} aria-hidden={k !== shot} loading={k === 0 ? 'eager' : 'lazy'} onClick={() => setViewer(k)} style={{ cursor: 'zoom-in' }} />
              ))}
              <div className="bubbles" role="group" aria-label={`Photos from ${y.year}`}>
                {shown.map((s, k) => (
                  <button key={s.thumb} className={`bubble${k === shot ? ' on' : ''}`} style={{ animationDelay: `${k * -0.6}s` }} onClick={() => { setShot(k); setHold(true); setAuto(false); }} aria-label={`Photo ${k + 1}`} aria-pressed={k === shot}>
                    <span style={{ backgroundImage: `url(${s.thumb})` }} />
                  </button>
                ))}
                {y.shots.length > BUBBLES && (
                  <button className="bubble more" onClick={() => setViewer(BUBBLES)} aria-label={`View all photos from ${y.year}`}>
                    <span>View all</span>
                  </button>
                )}
              </div>
              <div className="route-progress" key={`${at}-${shot}-${hold}`}><i className={hold ? 'held' : ''} /></div>
            </>
          ) : (
            <div className="yr-empty">
              <b>{y.year}</b>
              <span>{y.virtual ? 'The Summit met online this year.' : 'Photos from this Summit are on their way.'}</span>
            </div>
          )}
        </div>
        <div className="route-txt">
          <div className="yr-num">{y.year}</div>
          <h3>{y.city}</h3>
          <p>{y.note}</p>
          <div className="route-nav">
            <button onClick={() => pick(Math.max(0, at - 1))} disabled={at === 0} aria-label="Previous year">←</button>
            <button onClick={() => pick(Math.min(n - 1, at + 1))} disabled={at === n - 1} aria-label="Next year">→</button>
            {y.shots.length > 0 && <button className="yr-all" onClick={() => setViewer(0)} aria-label={`View all photos from ${y.year}`}>View all</button>}
          </div>
        </div>
      </div>

      {viewer !== null && (
        <Lightbox items={y.shots.map((s) => ({ name: s.src, alt: s.alt, src: s.src }))} index={viewer} onChange={setViewer} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}
