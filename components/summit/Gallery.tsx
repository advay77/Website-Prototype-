'use client';

import { useCallback, useEffect, useState } from 'react';
import { Photo } from './Photo';

type Item = { name: string; alt: string; span?: 'wide' | 'tall' };

/** "Moments That Matter": photo grid with a full-screen viewer (arrows, Esc, swipe). */
export function Gallery({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((n: number) => setOpen((o) => (o === null ? o : (o + n + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, close, step]);

  let touchX = 0;
  return (
    <>
      <div className="moments">
        {items.map((it, i) => (
          <button key={it.name} className={`m ${it.span ?? ''}`} onClick={() => setOpen(i)} aria-label={`Open photo: ${it.alt}`}>
            <Photo name={it.name} alt={it.alt} sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}
          onTouchStart={(e) => { touchX = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }}>
          <img src={`/assets/summit/${items[open].name}-1600.jpg`} alt={items[open].alt} onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          <button className="lb-btn lb-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
          <button className="lb-close" aria-label="Close" onClick={close}>×</button>
          <span className="lb-count">{open + 1} / {items.length}</span>
        </div>
      )}
    </>
  );
}
