'use client';

import { useEffect, useState } from 'react';

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

const Sent = ({ onBack, dark }: { onBack: () => void; dark?: boolean }) => (
  <div className={`ct-sent${dark ? ' dark' : ''}`} role="status">
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

/* ─────────────── B · Conversation ─────────────── */
const STRIP = [421, 534, 344, 667, 237, 309, 336, 566, 178, 405, 496, 339];
function Conversation() {
  const { f, setF, set, sent, setSent, submit } = useContactForm();
  return (
    <section className="ct2">
      <div className="ct2-strip" aria-hidden="true">
        <div className="ct2-row">{[...STRIP, ...STRIP].map((id, i) => <img key={i} src={g(id, 't')} alt="" />)}</div>
      </div>
      <div className="wrap">
        <div className="ct2-head">
          <div className="ct-eyebrow">Contact us</div>
          <h1>Let&apos;s start a <em>conversation.</em></h1>
        </div>
        {sent ? <Sent onBack={() => setSent(false)} /> : (
          <form className="ct2-card" onSubmit={submit}>
            <p className="madlib">
              Hi DISCOVER, I&apos;m{' '}
              <input required value={f.name} onChange={set('name')} placeholder="your name" aria-label="Your name" autoComplete="name" style={{ width: `${Math.max(9, f.name.length + 1)}ch` }} />
              {' '}from{' '}
              <input value={f.org} onChange={set('org')} placeholder="company or university" aria-label="Company or university" autoComplete="organization" style={{ width: `${Math.max(18, f.org.length + 1)}ch` }} />.
              {' '}I&apos;d love to talk about
            </p>
            <div className="chips-pick big" role="radiogroup" aria-label="Topic">
              {TOPICS.map((t) => (
                <button type="button" role="radio" aria-checked={f.topic === t.key} key={t.key} className={f.topic === t.key ? 'on' : ''} onClick={() => setF((x) => ({ ...x, topic: t.key }))}>{t.key}</button>
              ))}
            </div>
            <textarea required value={f.message} onChange={set('message')} rows={3} placeholder="Tell us a little more…" aria-label="Message" />
            <p className="madlib">
              You can reach me at{' '}
              <input required type="email" value={f.email} onChange={set('email')} placeholder="you@company.com" aria-label="Your email" autoComplete="email" style={{ width: `${Math.max(16, f.email.length + 1)}ch` }} />.
            </p>
            <div className="ct2-foot">
              <span>A real person replies within 2 business days.</span>
              <button className="btn btn-primary" type="submit">Send message <span className="arr">→</span></button>
            </div>
          </form>
        )}
        <div className="ct2-cards">
          <a href={`mailto:${EMAIL}`}><i>{Icon.mail}</i><b>Write to us</b><span>{EMAIL}</span></a>
          <a href={`tel:${PHONE.replace(/-/g, '')}`}><i>{Icon.phone}</i><b>Call us</b><span>{PHONE}</span></a>
          <a href="/summit"><i>{Icon.pin}</i><b>Meet us in person</b><span>DISCOVER Summit · Sept 2027, New York</span></a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── C · Pick your path ─────────────── */
function Paths() {
  const { f, setF, set, sent, setSent, submit } = useContactForm();
  const pick = (k: string) => { setF((x) => ({ ...x, topic: k })); document.getElementById('ct3-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <section className="ct3">
      <div className="wrap">
        <div className="ct3-head">
          <div>
            <div className="ct-eyebrow">Contact us</div>
            <h1>How can we <em>help?</em></h1>
          </div>
          <p>Pick what you&apos;re here for and we&apos;ll get your note to the right person on the team.</p>
        </div>
        <div className="ct3-paths">
          {TOPICS.map((t, i) => (
            <button key={t.key} type="button" className={`ct3-path${f.topic === t.key ? ' on' : ''}`} onClick={() => pick(t.key)} aria-pressed={f.topic === t.key}>
              <img src={g(t.photo)} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
              <span className="ct3-num">0{i + 1}</span>
              <span className="ct3-txt"><b>{t.key}</b><small>{t.line}</small></span>
              <span className="ct3-check" aria-hidden="true">✓</span>
            </button>
          ))}
        </div>

        <div className="ct3-panel" id="ct3-form">
          <div className="ct3-route">
            <h3>What happens next</h3>
            <ol>
              <li><b>You send a note</b><span>About {f.topic}.</span></li>
              <li><b>We reply in 2 business days</b><span>From a real person on the team, not a bot.</span></li>
              <li><b>Let&apos;s meet</b><span>A call, a coffee, or at the Summit in New York.</span></li>
            </ol>
            <div className="ct3-direct">
              <a href={`mailto:${EMAIL}`}>{Icon.mail}{EMAIL}</a>
              <a href={`tel:${PHONE.replace(/-/g, '')}`}>{Icon.phone}{PHONE}</a>
            </div>
          </div>
          {sent ? <Sent dark onBack={() => setSent(false)} /> : (
            <form className="ct3-form" onSubmit={submit}>
              <div className="ct3-topic">Topic: <b>{f.topic}</b></div>
              <div className="ct3-row">
                <label className="fl"><input required value={f.name} onChange={set('name')} placeholder=" " autoComplete="name" /><span>Your name</span></label>
                <label className="fl"><input required type="email" value={f.email} onChange={set('email')} placeholder=" " autoComplete="email" /><span>Email</span></label>
              </div>
              <label className="fl"><input value={f.org} onChange={set('org')} placeholder=" " autoComplete="organization" /><span>Company or university (optional)</span></label>
              <label className="fl"><textarea required value={f.message} onChange={set('message')} placeholder=" " rows={5} /><span>Your message</span></label>
              <button className="btn btn-primary" type="submit">Send message <span className="arr">→</span></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const DESIGNS = { a: Postcard, b: Conversation, c: Paths } as const;
type Key = keyof typeof DESIGNS;

/** Three design options for the client; ?v=a|b|c picks one, and a small switcher flips between them. */
export function Contact() {
  const [v, setV] = useState<Key>('a');
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('v') as Key | null;
    if (q && q in DESIGNS) setV(q);
  }, []);
  const choose = (k: Key) => { setV(k); history.replaceState(null, '', `?v=${k}`); scrollTo({ top: 0 }); };
  const D = DESIGNS[v];
  return (
    <>
      <D />
      <div className="ct-switch" role="group" aria-label="Design option">
        <span>Design</span>
        {(Object.keys(DESIGNS) as Key[]).map((k) => <button key={k} className={v === k ? 'on' : ''} onClick={() => choose(k)}>{k.toUpperCase()}</button>)}
      </div>
    </>
  );
}
