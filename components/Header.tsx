'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <>
      <div className="announce">
        <b>DISCOVER Summit 2027</b> · 11th annual · September 2027, New Jersey · Early-bird passes open
        <Link href="/summit#tickets">Get your pass</Link>
      </div>
      <header className={`site${open ? ' open' : ''}`}>
        <div className="wrap">
          <Link className="logo" href="/" aria-label="DISCOVER home">
            <img src="/assets/img/discover-logo.png" alt="DISCOVER Supply Chain" />
          </Link>
          <nav className="main">
            {NAV.map(([href, label]) => (
              <Link key={href} href={href} className={path === href ? 'active' : ''}>
                {label}
              </Link>
            ))}
            <Link className="btn btn-primary nav-cta" href="/summit#tickets">Get Summit pass →</Link>
          </nav>
          <div className="head-cta">
            <a className="login" href="mailto:info@discover-org.us?subject=Member%20access">Member login</a>
            <Link className="btn btn-primary" href="/summit#tickets">
              Get Summit pass <span className="arr">→</span>
            </Link>
            <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
