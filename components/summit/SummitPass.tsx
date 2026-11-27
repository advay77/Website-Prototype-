'use client';

import { useEffect, useRef, useState } from 'react';

const PASSES = ['Summit Pass', 'All-Access', 'Student', 'Speaker', 'Sponsor'];

function loadImg(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}

/** Draws the square LinkedIn image of the pass. */
async function render(name: string, title: string, company: string, pass: string) {
  const S = 1200, c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d')!;
  const [photo, logo] = await Promise.all([loadImg('/assets/summit/hall-1600.jpg'), loadImg('/assets/img/discover-logo.png')]);
  await document.fonts?.ready;

  const bg = g.createLinearGradient(0, 0, S, S); bg.addColorStop(0, '#081634'); bg.addColorStop(1, '#22398a');
  g.fillStyle = bg; g.fillRect(0, 0, S, S);
  // route dots
  g.strokeStyle = 'rgba(92,184,240,.35)'; g.setLineDash([10, 14]); g.lineWidth = 3;
  g.beginPath(); g.moveTo(0, 1010); g.bezierCurveTo(300, 900, 800, 1120, S, 980); g.stroke(); g.setLineDash([]);

  g.fillStyle = '#5cb8f0'; g.font = '600 30px ui-monospace, monospace';
  g.fillText("I'M ATTENDING", 80, 120);
  g.fillStyle = '#fff'; g.font = '700 72px Inter, system-ui, sans-serif';
  g.fillText('DISCOVER', 80, 205); g.fillText('Summit 2027', 80, 285);
  g.fillStyle = '#c8d4f2'; g.font = '500 32px Inter, system-ui, sans-serif';
  g.fillText('September 2027', 80, 345); g.fillText('New Jersey', 80, 390);

  // badge
  g.save(); g.translate(830, 700); g.rotate(-0.06);
  const W = 420, H = 600, x = -W / 2, y = -H / 2;
  g.fillStyle = '#0a72ba'; g.fillRect(-22, y - 220, 44, 230);
  g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 60; g.shadowOffsetY = 30;
  g.fillStyle = '#fff'; g.beginPath(); g.roundRect(x, y, W, H, 32); g.fill(); g.shadowColor = 'transparent';
  g.save(); g.beginPath(); g.roundRect(x, y, W, 190, [32, 32, 0, 0]); g.clip();
  const s = Math.max(W / photo.width, 190 / photo.height);
  g.drawImage(photo, x + (W - photo.width * s) / 2, y + (190 - photo.height * s) / 2, photo.width * s, photo.height * s); g.restore();
  const lw = 190, lh = (logo.height / logo.width) * lw; g.drawImage(logo, x + 32, y + 216, lw, lh);
  const fit = (t: string, max: number, px: number, weight = 700) => { let p = px; do { g.font = `${weight} ${p}px Inter, system-ui, sans-serif`; p -= 2; } while (g.measureText(t).width > max && p > 18); };
  g.fillStyle = '#0f1b33'; fit(name || 'Your Name', W - 64, 44); g.fillText(name || 'Your Name', x + 32, y + 340);
  g.fillStyle = '#5a677d'; fit([title, company].filter(Boolean).join(' · ') || 'Title · Company', W - 64, 22, 500); g.fillText([title, company].filter(Boolean).join(' · ') || 'Title · Company', x + 32, y + 378);
  g.fillStyle = '#0a72ba'; g.font = '600 18px ui-monospace, monospace'; g.fillText('SUMMIT 2027', x + 32, y + 430); g.textAlign = 'right'; g.fillText('SEPT · NJ', x + W - 32, y + 430); g.textAlign = 'left';
  for (let i = 0, bx = x + 32; bx < x + W - 36; i++) { const w = [3, 2, 5, 2, 4, 3][i % 6]; g.fillStyle = '#0f1b33'; g.fillRect(bx, y + 450, w, 70); bx += w + [3, 4, 2, 5, 3][i % 5]; }
  g.fillStyle = '#22398a'; g.font = '800 22px Inter, system-ui, sans-serif'; g.textAlign = 'center'; g.fillText(pass.toUpperCase(), 0, y + 562);
  g.restore();
  g.fillStyle = '#c8d4f2'; g.font = '500 26px Inter, system-ui, sans-serif'; g.fillText('Join me · discover-org.us', 80, 1130);
  return c;
}

/** "I'm attending": a personal Summit pass that updates as you type and downloads for LinkedIn. */
export function SummitPass() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [pass, setPass] = useState(PASSES[1]);
  const [busy, setBusy] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  const tilt = (e: React.PointerEvent) => {
    const r = card.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.current!.style.setProperty('--rx', `${-y * 10}deg`);
    card.current!.style.setProperty('--ry', `${x * 14}deg`);
  };
  const reset = () => { card.current!.style.setProperty('--rx', '0deg'); card.current!.style.setProperty('--ry', '0deg'); };

  const download = async () => {
    setBusy(true);
    try {
      const c = await render(name.trim(), title.trim(), company.trim(), pass);
      const a = document.createElement('a');
      a.href = c.toDataURL('image/png');
      a.download = `discover-summit-2027-${(name.trim() || 'pass').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      a.click();
    } finally { setBusy(false); }
  };
  const [share, setShare] = useState('https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdiscover-org.us');
  useEffect(() => setShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.origin + '/summit')}`), []);

  return (
    <div className="pass">
      <div className="pass-form">
        <h2>“I’m attending.” Share your pass.</h2>
        <p>Type your details, download your personal Summit pass and post it on LinkedIn. Every share brings the community one connection closer.</p>
        <div className="pass-fields">
          <label><span>Full name</span><input value={name} maxLength={36} onChange={(e) => setName(e.target.value)} placeholder="Your Name" /></label>
          <label><span>Title</span><input value={title} maxLength={40} onChange={(e) => setTitle(e.target.value)} placeholder="Supply Chain Analyst" /></label>
          <label><span>Company or university</span><input value={company} maxLength={40} onChange={(e) => setCompany(e.target.value)} placeholder="Company" /></label>
          <label><span>Pass</span><select value={pass} onChange={(e) => setPass(e.target.value)}>{PASSES.map((p) => <option key={p}>{p}</option>)}</select></label>
        </div>
        <div className="ctas">
          <button className="btn btn-white" onClick={download} disabled={busy}>{busy ? 'Preparing…' : 'Download for LinkedIn'} <span className="arr">↓</span></button>
          <a className="btn btn-ghost s-ghost" href={share} target="_blank" rel="noopener noreferrer">Share the Summit on LinkedIn</a>
        </div>
        <p className="pass-note">Your details stay in your browser. Nothing is sent or stored.</p>
      </div>

      <div className="pass-stage" onPointerMove={tilt} onPointerLeave={reset}>
        <div className="pass-swing">
          <div className="pass-strap" />
          <div className="pass-card" ref={card}>
            <div className="pass-photo" />
            <div className="pass-body">
              <img src="/assets/img/discover-logo.png" alt="DISCOVER Supply Chain" />
              <b className="pass-name">{name || 'Your Name'}</b>
              <span className="pass-role">{[title, company].filter(Boolean).join(' · ') || 'Title · Company'}</span>
              <div className="pass-meta"><span>SUMMIT 2027</span><span>SEPT · NJ</span></div>
              <div className="pass-code" />
              <div className="pass-type" key={pass}>{pass}</div>
            </div>
            <div className="pass-shine" />
          </div>
        </div>
      </div>
    </div>
  );
}
