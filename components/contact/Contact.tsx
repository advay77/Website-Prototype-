'use client';

import { useState } from 'react';

const EMAIL = 'info@discover-org.us';
const PHONE = '800-380-1408';
const g = (id: number, size: 'l' | 't' = 'l') => `/assets/gallery/${size}/${id}.webp`;

const TOPICS = [
  { key: 'Summit 2027', line: 'Passes, groups, venue and the Gala', photo: 344 },
  { key: 'Sponsorship', line: 'Partner with us or host the Summit', photo: 566 },
  { key: 'Membership', line: 'Join the network as a professional or company', photo: 309 },
  { key: 'Speaking', line: 'Take the stage, mentor or judge', photo: 667 },
  { key: 'Press', line: 'Stories, photos and interviews', photo: 534 },
  { key: 'Something else', line: 'Any other question, we will route it', photo: 336 },
];

type Form = { topic: string; name: string; email: string; org: string; message: string };

/** Shared form state. The site is static, so "send" opens the visitor's email app with the message filled in. */
function useContactForm() {
  const [f, setF] = useState<Form>({ topic: TOPICS[0].key, name: '', email: '', org: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.message}\n\n${f.name}${f.org ? `, ${f.org}` : ''}\n${f.email}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`[${f.topic}] Message from ${f.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return { f, setF, set, sent, setSent, submit };
}

const Icon = {
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 6.5 12 13l8.5-6.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
};

const Sent = ({ onBack }: { onBack: () => void }) => (
  <div className="ct-sent" role="status">
    <b>Your email app is opening.</b>
    <span>Just press send there. If nothing opened, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</span>
    <button type="button" onClick={onBack}>← Write another</button>
  </div>
);

/* ─────────────── A · Postcard ─────────────── */
function Postcard() {
  const { f, setF, set, sent, setSent, submit } = useContactForm();
  return (
    <section className="ct1">
      <div className="wrap ct1-grid">
        <div className="ct1-left">
          <div className="ct-eyebrow">Contact · DISCOVER Supply Chain</div>
          <h1>Say hello.<br /><em>We read every message.</em></h1>
          <p className="ct1-lead">Questions about the Summit, sponsoring, membership or anything else: send us a note and a real person on the team will write back.</p>
          <div className="ct1-lines">
            <a href={`mailto:${EMAIL}`}><i>{Icon.mail}</i><span><small>Email</small>{EMAIL}</span></a>
            <a href={`tel:${PHONE.replace(/-/g, '')}`}><i>{Icon.phone}</i><span><small>Phone</small>{PHONE}</span></a>
            <div><i>{Icon.clock}</i><span><small>Reply time</small>Within 2 business days</span></div>
          </div>
          <div className="ct1-polas" aria-hidden="true">
            <figure style={{ ['--r' as string]: '-7deg' }}><img src={g(421, 't')} alt="" /><figcaption>Gala night</figcaption></figure>
            <figure style={{ ['--r' as string]: '4deg' }}><img src={g(237, 't')} alt="" /><figcaption>Class of 2026</figcaption></figure>
            <figure style={{ ['--r' as string]: '-2deg' }}><img src={g(178, 't')} alt="" /><figcaption>See you in NY</figcaption></figure>
          </div>
        </div>

        <form className="postcard" onSubmit={submit}>
          <div className="pc-stamp" aria-hidden="true"><img src="/assets/img/discover-logo.png" alt="" /><span>2027</span></div>
          <div className="pc-postmark" aria-hidden="true">NEW YORK · SEPT 2027 · NEW YORK · SEPT 2027 ·</div>
          {sent ? <Sent onBack={() => setSent(false)} /> : (
            <div className="pc-grid">
              <div className="pc-msg">
                <div className="pc-title">Dear DISCOVER,</div>
                <div className="pc-label">I&apos;m writing about</div>
                <div className="chips-pick" role="radiogroup" aria-label="Topic">
                  {TOPICS.map((t) => (
                    <button type="button" role="radio" aria-checked={f.topic === t.key} key={t.key} className={f.topic === t.key ? 'on' : ''} onClick={() => setF((x) => ({ ...x, topic: t.key }))}>{t.key}</button>
                  ))}
                </div>
                <textarea required value={f.message} onChange={set('message')} placeholder="Your message…" aria-label="Message" rows={6} />
              </div>
              <div className="pc-to">
                <label><span>From</span><input required value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" /></label>
                <label><span>Email</span><input required type="email" value={f.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" /></label>
                <label><span>Company / University</span><input value={f.org} onChange={set('org')} placeholder="Optional" autoComplete="organization" /></label>
                <button className="btn btn-primary pc-send" type="submit">Send it <span className="arr">→</span></button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/** Contact page: the postcard design (option A, chosen by the client). */
export function Contact() {
  return <Postcard />;
}
