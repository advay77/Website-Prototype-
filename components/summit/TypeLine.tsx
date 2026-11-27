'use client';

import { useEffect, useRef, useState } from 'react';

/** Types each line, holds it, deletes it, moves to the next. */
export function TypeLine({ lines, className }: { lines: string[]; className?: string }) {
  const [text, setText] = useState(lines[0]);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0, n = 0, del = false, t: ReturnType<typeof setTimeout>;
    setText('');
    const tick = () => {
      const full = lines[i];
      if (!del) { n++; setText(full.slice(0, n)); if (n === full.length) { del = true; t = setTimeout(tick, 2200); return; } t = setTimeout(tick, 38 + Math.random() * 40); }
      else { n--; setText(full.slice(0, n)); if (n === 0) { del = false; i = (i + 1) % lines.length; t = setTimeout(tick, 350); return; } t = setTimeout(tick, 18); }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [visible, lines]);
  return (
    <span ref={ref} className={className} aria-label={lines.join(' · ')}>
      <span aria-hidden="true">{text}</span><i className="caret" aria-hidden="true" />
    </span>
  );
}
