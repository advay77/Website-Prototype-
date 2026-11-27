/** Logo strip that scrolls forever: the track is rendered twice for a seamless loop. */
export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="marquee">
      <div className="track">
        {children}
        <span style={{ display: 'contents' }} aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}
