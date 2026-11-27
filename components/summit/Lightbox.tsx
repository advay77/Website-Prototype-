'use client';

import { useCallback, useEffect, useRef } from 'react';

export type Shot = { name: string; alt: string; src?: string };

/** Full-screen photo viewer: arrows, Esc, swipe. */
export function Lightbox({ items, index, onChange, onClose }: { items: Shot[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const step = useCallback((n: number) => onChange((index + n + items.length) % items.length), [index, items.length, onChange]);
  const touchX = useRef(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [step, onClose]);
  const it = items[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }}>
      <img src={it.src ?? `/assets/summit/${it.name}-1600.jpg`} alt={it.alt} onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn lb-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
      <button className="lb-btn lb-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
      <button className="lb-close" aria-label="Close" onClick={onClose}>×</button>
      <span className="lb-count">{index + 1} / {items.length}</span>
    </div>
  );
}
