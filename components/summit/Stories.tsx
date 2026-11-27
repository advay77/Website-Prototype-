'use client';

import { useEffect, useRef, useState } from 'react';

export type Story = {
  k: string;
  h: string;
  photos: string[]; // full image URLs; they rotate every few seconds
  video?: { src: string; loop: string; poster: string };
};

const EVERY = 4000;
const PER_VIEW = 3;

const PlayIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg>;

/** One card: its photos cross-fade every 4s (staggered per card); a video plays when there is one. */
function StoryCard({ s, index, live, onPlay }: { s: Story; index: number; live: boolean; onPlay: () => void }) {
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (!live || s.video || s.photos.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => { id = setInterval(() => setAt((a) => (a + 1) % s.photos.length), EVERY); }, (index % PER_VIEW) * 700);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [live, index, s.video, s.photos.length]);

  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vid.current; if (!v) return;
    if (live && !matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
    else v.pause();
  }, [live]);

  return (
    <article className={`story${s.video ? ' has-video' : ''}`}>
      {s.video ? (
        <video ref={vid} className="on" src={s.video.loop} poster={s.video.poster} muted loop playsInline preload="none" aria-hidden="true" />
      ) : s.photos.map((src, i) => (
        <img key={src} className={i === at ? 'on' : ''} src={src} alt="" loading={i === 0 && index < PER_VIEW ? 'eager' : 'lazy'} decoding="async" aria-hidden="true" />
      ))}
      {s.video ? (
        <button className="play" onClick={onPlay} aria-label={`Play video: ${s.h}`}>{PlayIcon}</button>
      ) : (
        <div className="play" aria-hidden="true">{PlayIcon}</div>
      )}
      {!s.video && <div className="story-dots" aria-hidden="true">{s.photos.map((src, i) => <i key={src} className={i === at ? 'on' : ''} />)}</div>}
      <div className="cap">
        <div className="k">{s.k}</div>
        <h4>{s.h}</h4>
        {s.video ? <button className="soon watch" onClick={onPlay}>Watch the story</button> : <span className="soon">Video coming soon</span>}
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
    const measure = () => setPages(Math.max(1, Math.round(t.scrollWidth / t.clientWidth)));
    const onScroll = () => setPage(Math.round(t.scrollLeft / t.clientWidth));
    measure();
    t.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', measure);
    return () => { t.removeEventListener('scroll', onScroll); removeEventListener('resize', measure); };
  }, []);

  const go = (p: number) => {
    const t = track.current!;
    const next = (p + pages) % pages;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Scroll-snap cancels a smooth programmatic scroll in Chromium, so pause it while we glide.
    t.style.scrollSnapType = 'none';
    t.scrollTo({ left: next * t.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
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
        <>
          <button className={`stories-next${last ? ' back' : ''}`} onClick={() => go(last ? 0 : page + 1)} aria-label={last ? 'Back to the first stories' : 'Show more stories'}>
            <span aria-hidden="true">{last ? '←' : '→'}</span>
            <small>{last ? 'Back' : 'More stories'}</small>
          </button>
          <div className="stories-pager" aria-hidden="true">
            {Array.from({ length: pages }, (_, i) => <i key={i} className={i === page ? 'on' : ''} />)}
            <span>{String(Math.min(items.length, (page + 1) * PER_VIEW)).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          </div>
        </>
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
