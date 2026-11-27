'use client';

import { useEffect, useState } from 'react';

/** Phones: a register bar that appears after the hero and steps aside at the passes. */
export function StickyRegister() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.sh');
      const tickets = document.getElementById('tickets');
      const final = document.querySelector('.s-final');
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : scrollY > 600;
      const inView = (n: Element | null) => { if (!n) return false; const r = n.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
      setShow(pastHero && !inView(tickets) && !inView(final));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-reg${show ? ' on' : ''}`} aria-hidden={!show}>
      <div><b>DISCOVER Summit 2027</b><span>Sept · New Jersey · from $299</span></div>
      <a className="btn btn-primary" href="#tickets" tabIndex={show ? 0 : -1}>Register</a>
    </div>
  );
}
