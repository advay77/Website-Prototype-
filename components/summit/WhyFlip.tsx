'use client';

import { useEffect, useRef, useState } from 'react';
import { Photo } from './Photo';

type Card = { key: string; title: string; lead: string; photo: string; icon: React.ReactNode; stat: [string, string]; points: string[]; cta: [string, string] };

/**
 * Learn / Connect / Grow as flip cards: the photo stays on the front; a tap
 * turns the card over to what you actually get. A gentle nudge flips the
 * first card once when the section appears, so people know they can.
 */
export function WhyFlip({ cards }: { cards: Card[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [nudged, setNudged] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setTimeout(() => setNudged(true), 900);
      setTimeout(() => setNudged(false), 1700);
    }, { threshold: 0.5 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div className="why why-flip reveal stagger" ref={root}>
      {cards.map((c, i) => {
        const flipped = open === c.key;
        return (
          <div key={c.key} className={`fc${flipped ? ' flipped' : ''}${nudged && i === 0 && !open ? ' nudge' : ''}`}>
            <div className="fc-in">
              {/* front */}
              <button className="fc-face fc-front" onClick={() => setOpen(c.key)} aria-expanded={flipped} aria-label={`${c.title}: show what you get`} tabIndex={flipped ? -1 : 0}>
                <Photo name={c.photo} alt="" sizes="(max-width: 980px) 100vw, 33vw" />
                <span className="fc-shade" />
                <span className="fc-num">0{i + 1}</span>
                <span className="fc-front-txt">
                  <span className="why-ico">{c.icon}</span>
                  <b>{c.title}</b>
                  <span>{c.lead}</span>
                </span>
                <span className="fc-hint"><i>↻</i> Tap to see what you get</span>
              </button>
              {/* back */}
              <div className="fc-face fc-back" aria-hidden={!flipped}>
                <div className="fc-back-ph"><Photo name={c.photo} alt="" sizes="120px" /></div>
                <div className="fc-back-top">
                  <span className="why-ico">{c.icon}</span>
                  <b>{c.title}</b>
                  <button className="fc-close" onClick={() => setOpen(null)} aria-label={`Back to ${c.title} photo`} tabIndex={flipped ? 0 : -1}>↺</button>
                </div>
                <div className="fc-stat"><strong>{c.stat[0]}</strong><span>{c.stat[1]}</span></div>
                <ul>{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <a className="fc-cta" href={c.cta[1]} tabIndex={flipped ? 0 : -1}>{c.cta[0]} <span className="arr">→</span></a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
