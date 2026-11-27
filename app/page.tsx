import type { Metadata } from 'next';
import { Net } from '@/components/Net';
import { PageChrome } from '@/components/PageChrome';
import { Marquee } from '@/components/Marquee';

export const metadata: Metadata = {
  title: 'DISCOVER Supply Chain · The network that builds supply chain leaders',
  description: 'DISCOVER is a not-for-profit, cross-industry network where supply chain professionals grow and companies build their leadership pipeline. Annual Summit, executive Career Chats and a year-round community since 2017.',
};

export default function HomePage() {
  return (
    <PageChrome page="home">
      <section className="hero hero-video">
        {/* Background film: one slow 3D move from the back of the Summit hall to the stage. */}
        <video className="hero-bg" autoPlay muted loop playsInline preload="auto" poster="/assets/video/hero-poster.jpg" aria-hidden="true">
          <source src="/assets/video/hero.webm" type="video/webm" />
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" aria-hidden="true"></div>
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="tag">Cross-industry supply chain network · Since 2017</div>
              <h1>Supply chain runs on people. <em>We connect them.</em></h1>
              <p className="lead">DISCOVER brings together the professionals who move the world's goods and the companies that depend on them. We build bridges across pharma, consumer goods, retail and consulting, and grow the next generation of supply chain leaders.</p>
              <div className="ctas">
                <a className="btn btn-primary" href="/professionals">I'm a professional <span className="arr">→</span></a>
                <a className="btn btn-ghost" href="/sponsors">I represent a company <span className="arr">→</span></a>
              </div>
            </div>
            <div className="hero-side">
              <div className="chip">
                <div className="k">NEXT STOP</div>
                <div className="v">DISCOVER Summit 2027 · 11th annual</div>
                <div className="route">NJ <i></i> SEP 2027</div>
              </div>
            </div>
          </div>
          <div className="stats">
            <div><small>01 · TRACK RECORD</small><b>10<sup>yrs</sup></b><span>of Summits, chats and community</span></div>
            <div><small>02 · IN THE ROOM</small><b>100<sup>+</sup></b><span>supply chain leaders every Summit</span></div>
            <div><small>03 · NETWORK</small><b>25<sup>+</sup></b><span>partner companies and universities</span></div>
            <div><small>04 · YEAR-ROUND</small><b>20<sup>+</sup></b><span>executive Career Development Chats</span></div>
          </div>
        </div>
      </section>

      <div className="logos">
        <p>Leaders from these organizations build DISCOVER</p>
        <Marquee>
          <img src="/assets/logos/jj.png" alt="Johnson & Johnson" /><img src="/assets/logos/pfizer.png" alt="Pfizer" /><img src="/assets/logos/merck.png" alt="Merck" /><img src="/assets/logos/WM_Logo.png" alt="Walmart" /><img src="/assets/logos/bcg.jpg" alt="BCG" /><img src="/assets/logos/Hershey.jpg" alt="Hershey" /><img src="/assets/logos/BMS.jpg" alt="Bristol Myers Squibb" /><img src="/assets/logos/EY.jpg" alt="EY" /><img src="/assets/logos/gartner.jpg" alt="Gartner" /><img src="/assets/logos/GEP-Sponsor-Logo.png" alt="GEP" /><img src="/assets/logos/3M.jpg" alt="3M" /><img src="/assets/logos/Organon-Sponsor-Logo-210x130-1.png" alt="Organon" /><img src="/assets/logos/Land-o-Lankes-Sponsor-Logo.png" alt="Land O'Lakes" /><img src="/assets/logos/Rutgers-Sponsor-Logo_210x130.png" alt="Rutgers" /><img src="/assets/logos/Penn-State-Sponsor-Logo-210x130-1.png" alt="Penn State" /><img src="/assets/logos/Walker.jpg" alt="Walker SCM" />
        </Marquee>
      </div>

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Two routes in</div><h2>Built for the people who lead supply chains, and the companies that need them.</h2></div>
            <p>Whether you're growing your own career or building your company's bench of future leaders, there's a clear path for you.</p>
          </div>
          <div className="paths">
            <a className="path reveal" href="/professionals">
              <img className="bg" src="/assets/img/IMG_5188.jpg" alt="" />
              <div className="in">
                <div className="tag">For professionals</div>
                <h3>Grow faster with people who've done it.</h3>
                <ul><li>Meet senior leaders from 25+ companies</li><li>Live Career Development Chats with executives</li><li>Two days at the Summit, plus the Gala</li><li>Membership from $99 a year</li></ul>
                <span className="btn btn-white">Explore membership <span className="arr">→</span></span>
              </div>
            </a>
            <a className="path co reveal" href="/sponsors">
              <img className="bg" src="/assets/img/DSC00102-scaled.jpg" alt="" />
              <div className="in">
                <div className="tag">For companies</div>
                <h3>Build your diverse leadership pipeline.</h3>
                <ul><li>Put your leaders on stage and on the Board</li><li>Access the Diverse Talent Network</li><li>Executive coaching and showcase opportunities</li><li>Partnerships from $3,000 to Summit Host</li></ul>
                <span className="btn btn-white">Why sponsor DISCOVER <span className="arr">→</span></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">What we run</div><h2>One network. Four ways to plug in.</h2></div>
            <p>Year-round programs that keep the connections made at the Summit working long after the Gala.</p>
          </div>
          <div className="programs reveal">
            <div className="prog"><span className="num">01</span><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="17" rx="3" /><path d="M8 2v4M16 2v4M3 10h18" /></svg></div><h3>Annual Summit</h3><p>Two days of keynotes, panels, a career fair and the DISCOVER Gala. The flagship since 2017.</p><div className="meta">SEP 2027 · NEW JERSEY</div></div>
            <div className="prog"><span className="num">02</span><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v11H8l-4 4z" /></svg></div><h3>Career Development Chats</h3><p>One-hour live sessions with supply chain executives on leadership, careers and the road ahead.</p><div className="meta">MONTHLY · VIRTUAL</div></div>
            <div className="prog"><span className="num">03</span><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21c-5-3-8-7-8-11a8 8 0 0116 0c0 4-3 8-8 11z" /><path d="M12 7v7M9 11h6" /></svg></div><h3>Earth Day Sustainability Summit</h3><p>Responsible leadership across supply chains, with students, emerging leaders and advocates.</p><div className="meta">APRIL · NEWARK, NJ</div></div>
            <div className="prog"><span className="num">04</span><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="18" r="3" /><path d="M8.5 7.5l2 8M15.5 7.5l-2 8M9 6h6" /></svg></div><h3>Diverse Talent Network</h3><p>A curated pipeline of students and early-career talent from Rutgers, Penn State and partner universities.</p><div className="meta">FOR PARTNER COMPANIES</div></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">In their words</div><h2>Hear it from the people in the room.</h2></div>
            <p>Attendees, speakers and sponsors on what DISCOVER changed for them.</p>
          </div>
          <div className="videos reveal">
            <div className="vid big"><img src="/assets/img/IMG_2611.jpg" alt="" /><div className="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg></div><div className="cap"><div className="k">Sponsor story</div><h4>Why our company keeps coming back</h4></div></div>
            <div className="vid"><img src="/assets/img/IMG_9101.jpg" alt="" /><div className="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg></div><div className="cap"><div className="k">Attendee story</div><h4>The conversation that changed my career</h4></div></div>
            <div className="vid"><img src="/assets/img/IMG_5203.jpg" alt="" /><div className="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg></div><div className="cap"><div className="k">Speaker story</div><h4>Building bridges across industries</h4></div></div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: '0' }}>
        <div className="wrap">
          <div className="summit-band reveal">
            <Net className="net" seed={5} />
            <div>
              <div className="tag" style={{ color: '#9fd4ff' }}>11th annual · Early-bird open</div>
              <h2>DISCOVER Summit 2027</h2>
              <p className="lead" style={{ color: '#c8d4f2', margin: '18px 0 30px' }}>Two days, 100+ supply chain leaders, one Gala. Our second decade starts here.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}><a className="btn btn-white" href="/summit#tickets">Get your pass <span className="arr">→</span></a><a className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} href="/summit">See the Summit</a></div>
            </div>
            <div className="count"><div><b data-count="days">00</b><span>days</span></div><div><b data-count="hrs">00</b><span>hours</span></div><div><b data-count="min">00</b><span>mins</span></div><div><b data-count="sec">00</b><span>secs</span></div></div>
          </div>
        </div>
      </section>

      <section className="mist" id="chats">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Career Development Chats</div><h2>Executive insight, one hour at a time.</h2></div>
            <p>Live and free for members. Replays and key takeaways stay in the member library.</p>
          </div>
          <div className="cards reveal">
            <div className="card"><div className="img"><img src="/assets/img/DISCOVER_Ridgwell_Chat_Series.png" alt="Career chat with Jonathan Ridgwell" /></div><div className="bd"><div className="k">SEP 2026 · REPLAY</div><h4>Career Development Chat with Jonathan Ridgwell</h4><p>Leadership lessons from the top of the supply chain.</p></div></div>
            <div className="card"><div className="img"><img src="/assets/img/Dapo_Ajayi.png" alt="Career chat with Dapo Ajayi" /></div><div className="bd"><div className="k">AUG 2026 · REPLAY</div><h4>Career Development Chat with Dapo Ajayi</h4><p>Innovation and the future of medicine supply chains.</p></div></div>
            <div className="card"><div className="img"><img src="/assets/img/IMG_5180.jpg" alt="" /></div><div className="bd"><div className="k">NOV 2026 · UPCOMING</div><h4>Your next chat is coming</h4><p>Join the list to be first to register for the next session.</p></div></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="news reveal">
            <div><div className="tag">Stay on the route</div><h2 style={{ fontSize: '2.3rem' }}>Get the DISCOVER dispatch.</h2><p style={{ color: 'var(--muted)', marginTop: '12px' }}>Summit news, upcoming chats and career insight. One email a month.</p></div>
            <div><form data-demo><input type="email" placeholder="Your work email" required aria-label="Email" /><button className="btn btn-primary">Subscribe</button></form><div className="form-ok">Thanks! You're on the list (demo).</div></div>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
