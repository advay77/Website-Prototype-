'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Three scenes, each slowly zooming in, then cross-fading to the next.
const SCENES = [
  { video: true },
  { src: '/assets/gallery/l/167.webp', origin: '50% 55%' },      // the ballroom set for the Summit
  { src: '/assets/gallery/l/442.webp', origin: '50% 60%' },      // 2026 Gala, conga line
] as const;
const SCENE_MS = 8000;

/**
 * Summit hero: three scenes behind the headline. The home-page film (back of
 * the hall to the stage), then two Summit photos, each zooming in slowly and
 * cross-fading to the next. No scroll sequence.
 */
export function ScrollHero() {
  const [{ at, prev, run }, setS] = useState({ at: 0, prev: -1, run: 0 });
  const film = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const id = setTimeout(() => setS((x) => ({ at: (x.at + 1) % SCENES.length, prev: x.at, run: x.run + 1 })), SCENE_MS);
    return () => clearTimeout(id);
  }, [at]);
  useEffect(() => {
    const v = film.current; if (!v) return;
    if (at === 0) { v.currentTime = 0; v.play().catch(() => {}); }
  }, [at]);

  return (
    <section className="sh" aria-label="DISCOVER Summit 2027">
      <div className="sh-stick">
        <video ref={film} className={`sh-film sh-scene${at === 0 ? ' on' : ''}`} autoPlay muted playsInline preload="auto" poster="/assets/video/hero-poster.jpg" aria-hidden="true">
          <source src="/assets/video/hero.webm" type="video/webm" />
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>
        {SCENES.map((sc, i) => 'src' in sc && (
          <div key={sc.src} className={`sh-scene sh-photo${at === i ? ' on' : ''}${prev === i ? ' out' : ''}`} aria-hidden="true">
            {/* a new key each time the scene comes back restarts its zoom; it keeps zooming while it fades out */}
            <img key={at === i ? run : run - 1} src={sc.src} alt="" style={{ transformOrigin: sc.origin }} loading={i === 1 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <div className="sh-shade" aria-hidden="true" />

        <div className="wrap sh-layer">
          <div className="sh-intro">
            <h1>The future of supply chain starts <em>with connection.</em></h1>
            <p className="lead">Join emerging talent, industry leaders and organizations shaping the next generation of supply chain leadership.</p>
            <div className="chips s-chips"><span>September 2027</span><span>New York · venue soon</span></div>
            <div className="ctas">
              <a className="btn btn-primary" href="#tickets">Register for the Summit <span className="arr">→</span></a>
              <Link className="btn btn-ghost s-ghost" href="/sponsors">Explore sponsorship</Link>
            </div>
          </div>
        </div>

        <a className="sh-hint" href="#why" aria-label="Scroll to the next section"><span>Scroll</span><i /></a>
      </div>
    </section>
  );
}
