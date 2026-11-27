import type { Metadata } from 'next';
import Link from 'next/link';
import { PageChrome } from '@/components/PageChrome';
import { Photo } from '@/components/summit/Photo';
import { RouteAgenda } from '@/components/summit/RouteAgenda';
import { SpeakerDeck } from '@/components/summit/SpeakerDeck';
import { TypeLine } from '@/components/summit/TypeLine';
import { WhyFlip } from '@/components/summit/WhyFlip';
import { Net } from '@/components/Net';
import { SummitPass } from '@/components/summit/SummitPass';
import { Stories, type Story } from '@/components/summit/Stories';
import { TeaserMosaic } from '@/components/summit/TeaserMosaic';
import { LiveMosaicBg } from '@/components/summit/LiveMosaicBg';
import { ScrollHero } from '@/components/summit/ScrollHero';
import { Bento } from '@/components/summit/Bento';
import { CountUp } from '@/components/summit/CountUp';
import { StickyRegister } from '@/components/summit/StickyRegister';
import { Marquee } from '@/components/Marquee';
import './summit.css';

export const metadata: Metadata = {
  title: 'DISCOVER Summit 2027 · 11th annual supply chain leadership summit',
  description:
    'Two days, 100+ supply chain leaders and the DISCOVER Gala. Get your Summit Pass or All-Access membership for the 11th annual DISCOVER Summit, September 2027 in New Jersey.',
};

const DAYS = [
  {
    key: 'd1', label: 'Day 1', theme: 'Connect',
    slots: [
      { time: '08:30', title: 'Registration and breakfast', short: 'Arrive', note: 'Badge pick-up, coffee, first connections', photo: 'registration', stop: 'registration', alt: 'Attendees checking in at the registration desk' },
      { time: '09:30', title: "President's welcome and opening keynote", short: 'Keynote', note: 'Presented by the 2027 Summit Host Partner', photo: 'keynote', stop: 'keynote', alt: 'Keynote speaker at the DISCOVER podium' },
      { time: '11:00', title: 'Executive panel: leading through disruption', short: 'Panel', note: 'Cross-industry CSCO and VP perspectives', photo: 'panel', stop: 'panel', alt: 'Executive panel on the DISCOVER stage' },
      { time: '13:30', title: 'Breakouts', short: 'Breakouts', note: 'Sustainability · Digital and AI · Talent and inclusion', photo: 'breakouts', stop: 'breakouts', alt: 'Round-table breakout discussion' },
      { time: '18:30', title: 'DISCOVER Gala', short: 'Gala', note: 'Dinner, awards and celebration', photo: 'gala', stop: 'gala', alt: 'Award presented on stage at the DISCOVER Gala' },
    ],
  },
  {
    key: 'd2', label: 'Day 2', theme: 'Grow',
    slots: [
      { time: '08:30', title: 'Leadership breakfast', short: 'Breakfast', note: 'Small-table conversations with executives', photo: 'breakfast', stop: 'breakfast', alt: 'Attendees talking over breakfast' },
      { time: '09:30', title: 'Career workshops and executive coaching', short: 'Workshops', note: 'Led by sponsor leaders', photo: 'workshop', stop: 'workshop', alt: 'Workshop teams presenting their flip-chart ideas' },
      { time: '11:30', title: 'Career fair and company showcase', short: 'Career fair', note: 'Meet partner companies and university talent', photo: 'career-fair', stop: 'career-fair', alt: 'Attendees meeting and networking in the ballroom' },
      { time: '13:30', title: 'Closing keynote', short: 'Closing', note: 'The next decade of supply chain leadership', photo: 'closing-keynote', stop: 'closing', alt: 'Closing keynote speaker on stage' },
      { time: '15:00', title: 'Farewell and networking', short: 'Farewell', note: 'Until next year', photo: 'farewell', stop: 'farewell', alt: 'DISCOVER Summit attendees in a group photo' },
    ],
  },
];


const SPEAKERS = [
  { photo: 'voice-keynote-2', role: 'Keynote · 2026 Summit', session: 'Leading supply chains through disruption', pos: '78% 30%' },
  { photo: 'voice-panel-2', role: 'Executive panel', session: 'What the next decade asks of supply chain leaders', pos: '50% 30%' },
  { photo: 'voice-keynote', role: 'Keynote', session: 'Building the bench: talent as a supply chain', pos: '12% 40%' },
  { photo: 'voice-panel', role: 'Fireside chat', session: 'Careers that cross industries', pos: '22% 35%' },
  { photo: 'voice-keynote-3', role: 'Closing keynote', session: 'From data to decisions', pos: '40% 30%' },
  { photo: 'voice-stage', role: 'Recognition', session: 'Celebrating the people who move the world', pos: '62% 40%' },
];

const vid = (n: number) => ({ src: `/assets/summit/stories/v${n}.mp4`, loop: `/assets/summit/stories/v${n}-loop.mp4`, poster: `/assets/summit/stories/v${n}.jpg` });
// Interviews recorded at the 2025 Summit in Jersey City (DISCOVER Dropbox).
const STORIES: Story[] = [
  { k: 'Attendee voice · 2025', h: 'What the Summit means to me', photos: [], video: vid(1) },
  { k: 'Attendee voice · 2025', h: 'The people I met in this room', photos: [], video: vid(2) },
  { k: 'Attendee voice · 2025', h: 'What I’m taking home', photos: [], video: vid(3) },
  { k: 'Attendee voice · 2025', h: 'Why this community matters', photos: [], video: vid(4) },
  { k: 'Attendee voice · 2025', h: 'One day, in my own words', photos: [], video: vid(5) },
  { k: 'Community · 2025', h: 'The 2025 class, all in one frame', photos: [], video: vid(6) },
];

const MOMENTS = [
  { name: 'hall', alt: 'The full Summit ballroom during a keynote', span: 'wide' as const },
  { name: 'gala', alt: 'Award moment at the DISCOVER Gala' },
  { name: 'joy', alt: 'Attendee celebrating on the dance floor', span: 'tall' as const },
  { name: 'networking', alt: 'Leaders talking between sessions' },
  { name: 'panel-women', alt: 'Panelists on the DISCOVER stage' },
  { name: 'dance', alt: 'The Gala dance floor' },
  { name: 'workshop', alt: 'Workshop teams presenting ideas' },
  { name: 'awards', alt: 'Award winners on stage' },
  { name: 'conga', alt: 'Gala night celebration across the ballroom', span: 'wide' as const },
  { name: 'group-stairs', alt: 'Summit attendees gathered for a group photo', span: 'wide' as const },
  { name: 'keynote', alt: 'Keynote at the DISCOVER podium' },
  { name: 'breakouts', alt: 'Round-table breakout discussion' },
];

const BENTO = [
  { area: 'hall', name: 'hall', alt: 'The full Summit ballroom during a keynote', label: 'Keynote morning', video: true },
  { area: 'gala', name: 'gala', alt: 'Award moment at the DISCOVER Gala', label: 'Gala awards', video: true },
  { area: 'joy', name: 'joy', alt: 'Attendee celebrating on the dance floor', label: 'Gala night', pos: '50% 25%' },
  { area: 'net', name: 'networking', alt: 'Leaders talking between sessions', label: 'Between sessions' },
  { area: 'work', name: 'workshop', alt: 'Workshop teams presenting ideas', label: 'Workshops', pos: '45% 40%' },
  { area: 'dance', name: 'dance', alt: 'The Gala dance floor', label: 'The dance floor', video: true },
  { area: 'awards', name: 'awards', alt: 'Award winners on stage', label: 'Recognition', pos: '35% 40%' },
];

const RIVER = [
  ['r-01', 'Keynote on the DISCOVER stage'], ['r-02', 'Panelists in conversation'], ['r-03', 'Workshop teams sharing ideas'],
  ['r-04', 'Friends at the Gala reception'], ['r-05', 'Host on stage at the Gala'], ['r-06', 'Attendee at the Gala'],
  ['r-07', 'The dance floor at the Gala'], ['r-08', 'Attendee portrait at the photo wall'], ['r-09', 'Speaker on stage'],
  ['r-10', 'Keynote at the podium'], ['r-11', 'Executive panel'], ['r-12', 'Fireside chat'],
  ['r-13', 'Group photo by the windows'], ['r-14', 'Attendee in the ballroom'], ['r-15', 'Reception guests'], ['r-16', 'Gala celebration'],
].map(([name, alt]) => ({ name, alt }));

const LOGOS = [
  ['jj.png', 'Johnson & Johnson'], ['pfizer.png', 'Pfizer'], ['merck.png', 'Merck'], ['WM_Logo.png', 'Walmart'], ['bcg.jpg', 'BCG'],
  ['Hershey.jpg', 'Hershey'], ['BMS.jpg', 'Bristol Myers Squibb'], ['EY.jpg', 'EY'], ['gartner.jpg', 'Gartner'], ['GEP-Sponsor-Logo.png', 'GEP'],
  ['3M.jpg', '3M'], ['Organon-Sponsor-Logo-210x130-1.png', 'Organon'], ['Land-o-Lankes-Sponsor-Logo.png', "Land O'Lakes"],
  ['Rutgers-Sponsor-Logo_210x130.png', 'Rutgers'], ['Penn-State-Sponsor-Logo-210x130-1.png', 'Penn State'], ['Walker.jpg', 'Walker SCM'],
];


const FAQ: [string, React.ReactNode][] = [
  ['Where is the Summit held?', 'In New Jersey, in September 2027. The venue and the discounted hotel room block are announced with the 2027 details.'],
  ['Who is the Summit for?', 'Supply chain professionals at every stage, from students and early-career talent to directors and executives, across pharma, consumer goods, retail, consulting and academia.'],
  ["What's included in my pass?", 'Both Summit days, all meals, the DISCOVER Gala, the career fair and workshops. All-Access adds 12 months of membership.'],
  ['Can I bring a guest to the Gala only?', "Yes. Gala guest passes are $49 for people who aren't attending the Summit sessions."],
  ["What's the refund policy?", 'Passes can be transferred to a colleague. Full refund and transfer terms are shown at checkout.'],
  ['How can my organization sponsor?', <>Partnerships run from $3,000 up to Summit Host Partner. See the <Link href="/sponsors#tiers">sponsorship tiers</Link> or request the prospectus.</>],
];

const Icon = {
  learn: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /><path d="M22 9v6" /></svg>,
  connect: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" /><path d="M14 15.2c.9-.6 1.9-.9 3-.9 2.1 0 3.8 1.2 4.5 3.7" /></svg>,
  grow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 20V14M10 20V10M16 20V6" /><path d="M3 20h18" /><path d="M14 4h4v4" /></svg>,
  talent: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5" /></svg>,
  brand: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z" /><path d="M15 9a4 4 0 010 6M18 6.5a8 8 0 010 11" /></svg>,
  relations: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 12l3 3 5-5" /><path d="M2 12l4-4 3 2 3-2 3 2 3-2 4 4-6 6-4-3-4 3z" /></svg>,
  academic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 10l9-6 9 6" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" /></svg>,
  play: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg>,
};

export default function SummitPage() {
  return (
    <PageChrome page="summit">
      {/* 01 · Hero: scroll walks the camera from the back of the hall to the stage */}
      <ScrollHero />

      <section className="dark s-stats">
        <div className="wrap">
          <div className="stats">
            <div><small>EDITION</small><b><CountUp to={11} /><sup>th</sup></b><span>annual Summit since 2017</span></div>
            <div><small>ATTENDEES</small><b><CountUp to={100} /><sup>+</sup></b><span>senior and rising supply chain leaders</span></div>
            <div><small>FORMAT</small><b><CountUp to={2} /><sup>days</sup></b><span>keynotes, panels, career fair, workshops</span></div>
            <div className="s-cd"><small>THE SUMMIT STARTS IN</small><b data-count="days">00</b><span>days · early-bird pricing open now</span></div>
          </div>
        </div>
      </section>

      {/* 02 · Why attend */}
      <section>
        <div className="wrap">
          <div className="s-center reveal">
            <div className="tag">Why attend</div>
            <h2>Small enough to meet everyone. Senior enough to matter.</h2>
            <p>A two-day experience to learn, connect and grow with the supply chain community. No 8,000-person expo halls.</p>
          </div>
          <div className="s-partners s-partners-why reveal">
            <p>Leaders from these organizations have been in the room</p>
            <Marquee>{LOGOS.map(([f, n]) => <img key={f} src={`/assets/logos/${f}`} alt={n} />)}</Marquee>
          </div>
          <WhyFlip cards={[
            { key: 'learn', title: 'Learn', photo: 'voice-keynote', icon: Icon.learn,
              lead: 'Insights from the leaders shaping what’s next.',
              stat: ['3', 'breakout tracks: Sustainability · Digital and AI · Talent and inclusion'],
              points: ['Opening and closing keynotes', 'Executive panel: leading through disruption', 'CPOs, VPs and directors from J&J, Pfizer, Merck, Walmart, Hershey'],
              cta: ['See the two days', '#agenda'] },
            { key: 'connect', title: 'Connect', photo: 'networking', icon: Icon.connect,
              lead: 'Relationships across industry and academia.',
              stat: ['100+', 'supply chain leaders in one room'],
              points: ['Pharma, consumer goods, retail, consulting and universities', 'Leadership breakfast at small tables', 'The DISCOVER Gala: dinner, awards, dancing'],
              cta: ['Hear it from attendees', '#voices'] },
            { key: 'grow', title: 'Grow', photo: 'workshop', icon: Icon.grow,
              lead: 'Leave with a plan, not just notes.',
              stat: ['2 days', '+ the Gala, every meal included'],
              points: ['Career workshops and executive coaching', 'Career fair and company showcase', 'Diverse Talent Network for students and early career'],
              cta: ['Get your pass · $299', '#tickets'] },
          ]} />
        </div>
      </section>

      {/* 03 · Experience the Summit */}
      <section className="mist" id="agenda">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Experience the Summit</div><h2>Your two days, mapped like a supply chain route.</h2></div>
            <p>Follow the truck from badge pick-up to the Gala, or tap any stop. Based on the 2026 format; the full 2027 agenda is announced in spring.</p>
          </div>
          <div className="reveal"><RouteAgenda days={DAYS} /></div>
        </div>
      </section>

      {/* 04 · Speakers & leaders */}
      <section className="dark s-deck">
        <Net className="deck-net" seed={61} density={18} />
        <div className="deck-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="wrap reveal">
          <p className="deck-type"><span className="deck-type-k">&gt;</span><TypeLine lines={[
            'Your next mentor could be on this stage.',
            'One conversation here has changed careers.',
            'Next year, it could be you holding the mic.',
            'CPOs, VPs and directors. Same room as you.',
          ]} /></p>
          <SpeakerDeck items={SPEAKERS} />
          <a className="deck-next" href="#voices">
            <span className="deck-next-k">Up next</span>
            <b>What one conversation changed. <em>Hear it from them</em></b>
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </section>

      {/* 05 · Real voices */}
      <section className="dark s-stories" id="voices">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Real voices</div><h2>Hear it from the people in the room.</h2></div>
            <p>Students and professionals on what the Summit changed for them, recorded at the 2025 Summit in Jersey City. Tap a story to watch it with sound.</p>
          </div>
          <div className="reveal"><Stories items={STORIES} /></div>
        </div>
      </section>

      {/* 06 · Moments that matter */}
      <section className="s-moments">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Moments that matter</div><h2>The 2026 Summit, in motion.</h2></div>
            <p>Keynote mornings, Gala awards and a dance floor that didn’t empty until late. Tap any tile to see the photos full size.</p>
          </div>
          <Bento tiles={BENTO} photos={[...MOMENTS, ...RIVER]} />
        </div>
      </section>

      {/* The DISCOVER logo, built from photos */}
      <section className="s-teaser">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">The DISCOVER gallery</div><h2>DISCOVER, built from every face.</h2></div>
            <p>Scroll and the logo assembles from Summit photos. Move over it to magnify the people behind it, or tap to open the full gallery.</p>
          </div>
          <div className="reveal"><TeaserMosaic /></div>
        </div>
      </section>

      {/* 07 · Tickets */}
      <section id="tickets">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Tickets &amp; pricing</div><h2>Come for the Summit. Stay for the year.</h2></div>
            <p>Every pass includes both days, all meals and the Gala. All-Access adds a full year of DISCOVER community.</p>
          </div>
          <div className="prices reveal stagger">
            <div className="price">
              <div className="k">Summit only</div><h3>Summit Pass</h3>
              <div className="amt">$299</div><div className="note">Both days, all meals and the DISCOVER Gala.</div>
              <ul><li>All keynotes, panels and breakouts</li><li>Career fair and workshops</li><li>DISCOVER Gala dinner</li><li>Summit photo and recap pack</li></ul>
              <a className="btn btn-ghost" href="mailto:info@discover-org.us?subject=Summit%202027%20pass">Buy Summit Pass</a>
            </div>
            <div className="price feat"><span className="badge">BEST VALUE</span>
              <div className="k">Summit + 12 months</div><h3>All-Access</h3>
              <div className="amt">$349 <small>/ year</small></div><div className="note">Everything in the Summit Pass, plus a year of community. Save $49.</div>
              <ul><li>Everything in Summit Pass</li><li>12 months of DISCOVER membership</li><li>Every live Career Development Chat and the replay library</li><li>Member directory and network access</li><li>Member pricing on Earth Day and other events</li></ul>
              <Link className="btn btn-primary" href="/professionals#join">Get All-Access <span className="arr">→</span></Link>
            </div>
            <div className="price">
              <div className="k">Teams of 4+</div><h3>Team &amp; Corporate</h3>
              <div className="amt" style={{ fontSize: '2.2rem', marginTop: 26 }}>Group rates</div><div className="note">Send your rising leaders together. Bundled with Corporate Membership.</div>
              <ul><li>Discounted passes for 4+ colleagues</li><li>One invoice, one point of contact</li><li>Optional exhibit table</li><li>Upgrade to sponsorship any time</li></ul>
              <Link className="btn btn-ghost" href="/sponsors#prospectus">Talk to us</Link>
            </div>
          </div>
          <div className="s-approval reveal">
            <div><b>Need approval?</b> Most attendees are sponsored by their employer. Download our ready-to-send justification letter.</div>
            <Link className="btn btn-ghost" href="/professionals#employer">Get the letter <span className="arr">→</span></Link>
          </div>
          <p className="indicative">Gala-only guest passes available at $49 · Pricing indicative for the 2027 proposal</p>
        </div>
      </section>

      {/* Personal pass */}
      <section className="s-pass">
        <div className="wrap reveal"><SummitPass /></div>
      </section>

      {/* 08 · Corporate sponsorship */}
      <section className="mist">
        <div className="wrap">
          <div className="sponsor-box reveal">
            <div className="sponsor-ph"><Photo name="stage" alt="The DISCOVER stage ready for the Summit" sizes="(max-width: 980px) 100vw, 45vw" /></div>
            <div className="sponsor-in">
              <div className="tag">Corporate sponsorship</div>
              <h2>Put your organization at the center of the conversation.</h2>
              <div className="perks reveal stagger">
                {[
                  ['talent', 'Talent engagement', 'Meet students and early-career talent from Rutgers, Penn State and partner universities.'],
                  ['brand', 'Brand visibility', 'Your leaders on stage, your name in the program and at the Gala.'],
                  ['relations', 'Industry relationships', 'Sit at the same table as supply chain leaders from 25+ companies.'],
                  ['academic', 'Academic connections', 'Partner with universities through the Diverse Talent Network.'],
                ].map(([k, h, p]) => (
                  <div className="perk" key={k}><span className="why-ico">{Icon[k as 'talent']}</span><b>{h}</b><p>{p}</p></div>
                ))}
              </div>
              <div className="ctas">
                <Link className="btn btn-primary" href="/sponsors">Explore sponsorship <span className="arr">→</span></Link>
                <Link className="btn btn-ghost" href="/sponsors#host">Host the Summit</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 · FAQ */}
      <section>
        <div className="wrap">
          <div className="sec-head reveal"><div><div className="tag">FAQ &amp; logistics</div><h2>Good questions.</h2></div><p>Anything else? Email <a href="mailto:info@discover-org.us" style={{ color: 'var(--blue)' }}>info@discover-org.us</a></p></div>
          <div className="faq s-faq reveal">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · Final CTA */}
      <section className="s-final">
        <LiveMosaicBg />
        <div className="s-final-shade" aria-hidden="true" />
        <div className="wrap reveal">
          <div className="tag">The next connection starts here</div>
          <h2>Be part of what’s next.</h2>
          <p>Join the people, ideas and conversations shaping supply chain leadership.</p>
          <div className="ctas">
            <a className="btn btn-white" href="#tickets">Register to attend <span className="arr">→</span></a>
            <Link className="btn btn-ghost s-ghost" href="/sponsors">Explore sponsorship</Link>
          </div>
        </div>
      </section>
      <StickyRegister />
    </PageChrome>
  );
}
