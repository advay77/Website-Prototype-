'use client';

import { useEffect, useRef, useState } from 'react';

export type Story = {
  k: string;
  h: string;
  photos: string[]; // full image URLs; they rotate every few seconds
  video?: { src: string; poster: string; x?: number }; // x: horizontal focus (0-1) for the portrait card crop
  wide?: boolean; // fills a whole page (all three frames)
};

const EVERY = 3500;
const PER_VIEW = 3;

const Arrow = (left: boolean) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={left ? { transform: 'scaleX(-1)' } : undefined}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const PlayIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg>;

/** One card: photos cross-fade every 4s (staggered per card), or a video that plays on hover. */
function StoryCard({ s, index, live, onPlay }: { s: Story; index: number; live: boolean; onPlay: () => void }) {
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (!live || s.video || s.photos.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => { id = setInterval(() => setAt((a) => (a + 1) % s.photos.length), EVERY); }, (index % PER_VIEW) * 700);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [live, index, s.video, s.photos.length]);

  // Video cards: the person starts talking when the pointer is over the card
  // (with sound once the visitor has interacted with the page), and stops
  // when it leaves. On touch screens the card plays muted while centred.
  const vid = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const start = () => {
    const v = vid.current; if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { userActivation?: { hasBeenActive: boolean } };
    v.muted = !nav.userActivation?.hasBeenActive; setMuted(v.muted);
    if (v.ended) v.currentTime = 0;
    v.play().catch(() => { v.muted = true; setMuted(true); v.play().catch(() => {}); });
  };
  const stop = () => vid.current?.pause();
  useEffect(() => {
    if (!s.video || matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.intersectionRatio > 0.7 ? start() : stop()), { threshold: [0, 0.7] });
    io.observe(card.current!);
    return () => io.disconnect();
  }, [s.video]);
  useEffect(() => { if (!live) stop(); }, [live]);

  return (
    <article ref={card} className={`story${s.video ? ' has-video' : ''}${s.wide ? ' wide' : ''}${playing ? ' playing' : ''}`}
      onPointerEnter={(e) => { if (s.video && e.pointerType === 'mouse') start(); }}
      onPointerLeave={(e) => { if (s.video && e.pointerType === 'mouse') stop(); }}>
      {s.video ? (
        <video ref={vid} className="on" src={s.video.src} poster={s.video.poster} muted playsInline preload="metadata" aria-hidden="true"
          style={{ objectPosition: `${(s.video.x ?? 0.5) * 100}% 50%` }}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
      ) : s.photos.map((src, i) => (
        <img key={src} className={i === at ? 'on' : ''} src={src} alt="" loading={i === 0 && index < PER_VIEW ? 'eager' : 'lazy'} decoding="async" aria-hidden="true" />
      ))}
      {s.video ? (
        <button className="play" onClick={() => { stop(); onPlay(); }} aria-label={`Play video with sound: ${s.h}`}>{PlayIcon}</button>
      ) : (
        <div className="play" aria-hidden="true">{PlayIcon}</div>
      )}
      {!s.video && <div className="story-dots" aria-hidden="true">{s.photos.map((src, i) => <i key={src} className={i === at ? 'on' : ''} />)}</div>}
      <div className="cap">
        <div className="k">{s.k}</div>
        <h4>{s.h}</h4>
        {s.video ? (
          <button className="soon watch" onClick={() => { stop(); onPlay(); }}>
            {playing ? (muted ? 'Playing muted · tap for sound' : 'Playing · open full screen') : 'Hover to play · tap for sound'}
          </button>
        ) : <span className="soon">Video coming soon</span>}
      </div>
    </article>
  );
}

/** Six stories, three at a time; the arrow on the right brings in the next three. */
export function Stories({ items }: { items: Story[] }) {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [per, setPer] = useState(PER_VIEW);
  const [live, setLive] = useState(false);
  const [video, setVideo] = useState<Story | null>(null);
  const snapBack = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = track.current!;
    const step = () => t.clientWidth + (parseFloat(getComputedStyle(t).columnGap) || 0);
    const measure = () => {
      setPages(Math.max(1, Math.round((t.scrollWidth + step() - t.clientWidth) / step())));
      const c = t.firstElementChild as HTMLElement | null;
      if (c) setPer(Math.max(1, Math.round(step() / (c.offsetWidth + (parseFloat(getComputedStyle(t).columnGap) || 0)))));
    };
    const onScroll = () => setPage(Math.round(t.scrollLeft / step()));
    measure();
    t.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', measure);
    return () => { t.removeEventListener('scroll', onScroll); removeEventListener('resize', measure); };
  }, []);

  // How many stories have been shown up to the current page (the wide card counts as one).
  const seen = () => {
    const t = track.current;
    if (!t) return Math.min(items.length, (page + 1) * per);
    const step = t.clientWidth + (parseFloat(getComputedStyle(t).columnGap) || 0);
    return Array.from(t.children).filter((c) => (c as HTMLElement).offsetLeft < (page + 1) * step - 2).length;
  };
  const go = (p: number) => {
    const t = track.current!;
    const next = (p + pages) % pages;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Scroll-snap cancels a smooth programmatic scroll in Chromium, so pause it while we glide.
    t.style.scrollSnapType = 'none';
    t.scrollTo({ left: next * (t.clientWidth + (parseFloat(getComputedStyle(t).columnGap) || 0)), behavior: reduce ? 'auto' : 'smooth' });
    clearTimeout(snapBack.current);
    snapBack.current = setTimeout(() => { t.style.scrollSnapType = ''; }, reduce ? 0 : 900);
  };
  const last = page >= pages - 1;

  return (
    <div className="stories-wrap" ref={root}>
      <div className="stories" ref={track}>
        {items.map((s, i) => <StoryCard key={s.h} s={s} index={i} live={live} onPlay={() => setVideo(s)} />)}
      </div>
      {pages > 1 && (
        <div className="stories-bar">
          <div className="stories-pager" aria-hidden="true">
            {Array.from({ length: pages }, (_, i) => <i key={i} className={i === page ? 'on' : ''} />)}
            <span>{String(seen()).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          </div>
          <div className="stories-ctl">
            <button className="stories-arrow" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous stories">{Arrow(true)}</button>
            <button className={`stories-more${last ? ' back' : ''}`} onClick={() => go(last ? 0 : page + 1)} aria-label={last ? 'Back to the first stories' : 'Show more stories'}>
              <span>{last ? 'Back to start' : 'More stories'}</span>
              <i aria-hidden="true">{Arrow(last)}</i>
            </button>
          </div>
        </div>
      )}
      {video?.video && (
        <div className="story-modal" role="dialog" aria-modal="true" aria-label={video.h} onClick={() => setVideo(null)}>
          <video src={video.video.src} poster={video.video.poster} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} />
          <button className="story-close" onClick={() => setVideo(null)} aria-label="Close video">×</button>
        </div>
      )}
    </div>
  );
}
