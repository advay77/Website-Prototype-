'use client';

import { useState } from 'react';
import { Photo } from './Photo';

type Slot = { time: string; title: string; note: string; photo: string; alt: string };
type Day = { key: string; label: string; theme: string; slots: Slot[] };

/** "Experience the Summit": Day 1 / Day 2 timeline; the photo follows the selected moment. */
export function DayTimeline({ days }: { days: Day[] }) {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(0);
  const d = days[day];
  const s = d.slots[slot];

  return (
    <div className="xp">
      <div className="xp-media">
        {days.flatMap((dd, di) =>
          dd.slots.map((ss, si) => (
            <div key={`${di}-${si}`} className={`xp-photo${di === day && si === slot ? ' on' : ''}`} aria-hidden={!(di === day && si === slot)}>
              <Photo name={ss.photo} alt={ss.alt} sizes="(max-width: 980px) 100vw, 55vw" />
            </div>
          )),
        )}
        <div className="xp-cap">
          <span>{d.label} · {s.time}</span>
          <b>{s.title}</b>
        </div>
      </div>

      <div className="xp-side">
        <div className="xp-tabs" role="tablist" aria-label="Summit days">
          {days.map((dd, i) => (
            <button key={dd.key} role="tab" aria-selected={i === day} className={i === day ? 'on' : ''} onClick={() => { setDay(i); setSlot(0); }}>
              {dd.label}
              <small>{dd.theme}</small>
            </button>
          ))}
        </div>
        <ol className="xp-list" role="tabpanel">
          {d.slots.map((ss, i) => (
            <li key={ss.time}>
              <button className={i === slot ? 'on' : ''} onClick={() => setSlot(i)} onMouseEnter={() => setSlot(i)} aria-pressed={i === slot}>
                <time>{ss.time}</time>
                <span>
                  <b>{ss.title}</b>
                  <em>{ss.note}</em>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
