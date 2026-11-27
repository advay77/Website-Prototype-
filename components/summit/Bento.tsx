'use client';

import { useEffect, useRef, useState } from 'react';
import { Lightbox, type Shot } from './Lightbox';

export type Tile = { area: string; name: string; alt: string; label: string; video?: boolean; pos?: string };

/** A looping clip that only plays while on screen (and never with reduced motion). */
function Clip({ name, alt }: { name: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current!;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} muted loop playsInline preload="none" poster={`/assets/summit/clips/${name}.jpg`} aria-label={alt}>
      <source src={`/assets/summit/clips/${name}.webm`} type="video/webm" />
      <source src={`/assets/summit/clips/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

/** "The 2026 Summit, in motion": aligned bento of living clips and photos, plus a full photo viewer. */
export function Bento({ tiles, photos }: { tiles: Tile[]; photos: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const openPhoto = (name: string) => setOpen(Math.max(0, photos.findIndex((p) => p.name === name)));
  return (
    <>
      <div className="bento reveal stagger">
        {tiles.map((t) => (
          <button key={t.area} className={`b-tile${t.video ? ' is-video' : ''}`} style={{ gridArea: t.area }} onClick={() => openPhoto(t.name)} aria-label={`Open photo: ${t.alt}`}>
            {t.video ? (
              <Clip name={t.name} alt={t.alt} />
            ) : (
              <img src={`/assets/summit/${t.name}-1600.jpg`} srcSet={`/assets/summit/${t.name}-800.jpg 800w, /assets/summit/${t.name}-1600.jpg 1600w`} sizes="(max-width: 980px) 50vw, 25vw" alt={t.alt} style={t.pos ? { objectPosition: t.pos } : undefined} />
            )}
            <span className="b-cap">{t.video && <i className="b-live" aria-hidden="true" />}{t.label}</span>
          </button>
        ))}
      </div>
      <div className="b-more reveal">
        <button className="btn btn-ghost" onClick={() => setOpen(0)}>See all {photos.length} photos <span className="arr">→</span></button>
      </div>
      {open !== null && <Lightbox items={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
