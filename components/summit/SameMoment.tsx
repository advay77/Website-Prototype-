'use client';

import { useState } from 'react';
import { MOMENTS } from '@/lib/years';

/** "Same moment, every year": one kind of photo across every Summit, side by side. */
export function SameMoment() {
  const [m, setM] = useState(0);
  const cur = MOMENTS[m];
  const years = Object.keys(cur.shots).sort();
  return (
    <div className="same">
      <div className="xp-tabs same-tabs" role="tablist" aria-label="Moment">
        {MOMENTS.map((x, i) => (
          <button key={x.key} role="tab" aria-selected={i === m} className={i === m ? 'on' : ''} onClick={() => setM(i)}>{x.label}</button>
        ))}
      </div>
      <div className="same-row" key={cur.key}>
        {years.map((y, i) => (
          <figure key={y} className={`same-card${y === '2026' ? ' now' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
            <img src={cur.shots[y].thumb} alt={`${cur.label}, DISCOVER Summit ${y}`} loading="lazy" />
            <figcaption>{y}</figcaption>
          </figure>
        ))}
      </div>
      <p className="same-note">Same moment, seven Summits. The room keeps getting fuller.</p>
    </div>
  );
}
