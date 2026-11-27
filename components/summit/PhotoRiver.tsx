'use client';

import { useState } from 'react';
import { Lightbox, type Shot } from './Lightbox';

/** "Moments that matter": two rows of photos drifting in opposite directions. Hover pauses, click opens. */
export function PhotoRiver({ rows }: { rows: Shot[][] }) {
  const all = rows.flat();
  const [open, setOpen] = useState<number | null>(null);
  let base = 0;
  return (
    <>
      <div className="river">
        {rows.map((row, r) => {
          const offset = base;
          base += row.length;
          return (
            <div className={`river-row${r % 2 ? ' rev' : ''}`} key={r}>
              <div className="river-track" style={{ animationDuration: `${row.length * 7}s` }}>
                {[0, 1].map((copy) =>
                  row.map((it, i) => (
                    <button key={`${copy}-${it.name}`} className="river-item" onClick={() => setOpen(offset + i)} tabIndex={copy ? -1 : 0} aria-hidden={copy ? true : undefined} aria-label={`Open photo: ${it.alt}`}>
                      <img src={`/assets/summit/${it.name}-800.jpg`} alt={copy ? '' : it.alt} loading="lazy" decoding="async" />
                    </button>
                  )),
                )}
              </div>
            </div>
          );
        })}
      </div>
      {open !== null && <Lightbox items={all} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
