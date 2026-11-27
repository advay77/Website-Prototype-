'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SUMMIT_DATE } from '@/lib/site';

/**
 * The prototype's page interactions (scroll reveal, countdown, demo forms,
 * phone tier cards), re-run on every route change.
 */
export function Enhance() {
  const path = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Scroll reveal (?static shows everything, for screenshots)
    const reveals = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (location.search.includes('static') || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
        { threshold: 0.12 },
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Countdown
    const target = new Date(SUMMIT_DATE).getTime();
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      const v: Record<string, number> = { days: Math.floor(d / 864e5), hrs: Math.floor(d / 36e5) % 24, min: Math.floor(d / 6e4) % 60, sec: Math.floor(d / 1e3) % 60 };
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => (el.textContent = String(v[el.dataset.count!]).padStart(2, '0')));
    };
    if (document.querySelector('[data-count]')) {
      tick();
      const id = setInterval(tick, 1000);
      cleanups.push(() => clearInterval(id));
    }

    // Demo forms: nothing leaves the page
    document.querySelectorAll<HTMLFormElement>('form[data-demo]').forEach((f) => {
      const onSubmit = (e: Event) => {
        e.preventDefault();
        const ok = (f.querySelector('.form-ok') || f.parentElement?.querySelector('.form-ok')) as HTMLElement | null;
        if (ok) ok.style.display = 'block';
        f.reset();
      };
      f.addEventListener('submit', onSubmit);
      cleanups.push(() => f.removeEventListener('submit', onSubmit));
    });

    // Phones: one card per sponsorship tier, built from the table
    document.querySelectorAll<HTMLTableElement>('.tiers').forEach((table) => {
      const wrap = table.closest('.tiers-wrap');
      if (!wrap || wrap.nextElementSibling?.classList.contains('tier-cards')) return;
      const heads = [...table.querySelectorAll('thead th')].slice(1);
      const rows = [...table.querySelectorAll<HTMLTableRowElement>('tbody tr')];
      const benefits = rows.filter((r) => r.cells[0].textContent!.trim());
      const ctas = rows.find((r) => !r.cells[0].textContent!.trim());
      const cards = heads.map((th, i) => {
        const items = benefits
          .map((r) => [r.cells[0].textContent!.trim(), r.cells[i + 1].textContent!.trim()])
          .filter(([, v]) => v && v !== '—')
          .map(([k, v]) => `<li><span>${v === '✓' ? k : `${k}: <b>${v}</b>`}</span></li>`).join('');
        const cta = ctas?.cells[i + 1]?.innerHTML || '';
        return `<div class="tier-card${th.classList.contains('host') ? ' host' : ''}"><span class="nm">${th.querySelector('.nm')?.textContent}</span><span class="pr">${th.querySelector('.pr')?.textContent}</span><ul>${items}</ul>${cta}</div>`;
      });
      wrap.insertAdjacentHTML('afterend', `<div class="tier-cards">${cards.join('')}</div>`);
    });

    return () => cleanups.forEach((c) => c());
  }, [path]);

  return null;
}
