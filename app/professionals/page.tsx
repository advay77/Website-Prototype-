import type { Metadata } from 'next';
import { Net } from '@/components/Net';
import { PageChrome } from '@/components/PageChrome';

export const metadata: Metadata = {
  title: 'For professionals · DISCOVER membership and community',
  description: 'Grow your supply chain career with DISCOVER. Executive Career Development Chats, the annual Summit and a cross-industry network, with membership from $99 a year.',
};

export default function ProfessionalsPage() {
  return (
    <PageChrome page="pro">
      <section className="phero">
        <Net className="net" seed={17} />
        <div className="wrap">
          <div className="crumbs">HOME / FOR PROFESSIONALS</div>
          <div className="cols">
            <div>
              <div className="tag">Membership</div>
              <h1>Grow your supply chain career with people who've done it.</h1>
              <p className="lead">DISCOVER connects you with leaders from 25+ companies, all year round. Learn from executives, find mentors, and build the network that gets you to your next role.</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '36px' }}><a className="btn btn-primary" href="#join">Become a member <span className="arr">→</span></a><a className="btn btn-ghost" href="#employer">Get my employer to pay</a></div>
            </div>
            <div className="hero-photos" style={{ height: '420px' }}>
              <div className="ph p1" style={{ height: '290px' }}><img src="/assets/img/DISC_0083-min.jpg" alt="DISCOVER members at a Summit table" /></div>
              <div className="ph p2" style={{ height: '200px' }}><img src="/assets/img/IMG_5175.jpg" alt="Attendee networking at the Summit" /></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div className="reveal">
            <div className="tag">What you get</div>
            <h2>A year-round network, not a once-a-year event.</h2>
            <ul className="checks">
              <li><i>01</i><div><b>Executive Career Development Chats</b><span>Live sessions with supply chain leaders, plus the full replay library.</span></div></li>
              <li><i>02</i><div><b>The DISCOVER network</b><span>A member directory spanning pharma, consumer goods, retail, consulting and academia.</span></div></li>
              <li><i>03</i><div><b>Member pricing on every event</b><span>Discounts on the Summit, Earth Day Summit and partner events.</span></div></li>
              <li><i>04</i><div><b>Visibility with partner companies</b><span>Students and early-career members can join the Diverse Talent Network.</span></div></li>
            </ul>
          </div>
          <div className="media reveal"><img src="/assets/img/IMG_2525.jpg" alt="DISCOVER members group photo" /></div>
        </div>
      </section>

      <section className="mist" id="join">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Choose your route</div><h2>Simple, honest pricing.</h2></div>
            <p>Annual memberships run 12 months from the day you join. Students, ask us about our university programs.</p>
          </div>
          <div className="prices reveal">
            <div className="price">
              <div className="k">Year-round</div><h3>Community</h3>
              <div className="amt">$99 <small>/ year</small></div><div className="note">The DISCOVER network and every Career Chat.</div>
              <ul><li>Every live Career Development Chat</li><li>Replay library and takeaways</li><li>Member directory</li><li>Member pricing on all events</li></ul>
              <a className="btn btn-ghost" href="mailto:info@discover-org.us?subject=Community%20membership">Join Community</a>
            </div>
            <div className="price feat"><span className="badge">MOST POPULAR</span>
              <div className="k">Summit + 12 months</div><h3>All-Access</h3>
              <div className="amt">$349 <small>/ year</small></div><div className="note">Community membership plus a full Summit Pass. Save $49.</div>
              <ul><li>Everything in Community</li><li>Full Summit Pass: both days and the Gala</li><li>Priority registration for limited sessions</li><li>Early access to speaker announcements</li></ul>
              <a className="btn btn-primary" href="mailto:info@discover-org.us?subject=All-Access%20membership">Get All-Access <span className="arr">→</span></a>
            </div>
            <div className="price">
              <div className="k">One event</div><h3>Summit Pass</h3>
              <div className="amt">$299</div><div className="note">Just the Summit. Upgrade to All-Access for $50.</div>
              <ul><li>Both Summit days</li><li>All meals and the DISCOVER Gala</li><li>Career fair and workshops</li></ul>
              <a className="btn btn-ghost" href="/summit#tickets">Buy Summit Pass</a>
            </div>
          </div>
          <p className="indicative">Pricing indicative for the 2027 proposal</p>
        </div>
      </section>

      <section className="dark" id="employer">
        <Net className="net" seed={29} style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="wrap split" style={{ position: 'relative' }}>
          <div className="reveal">
            <div className="tag">Employer-sponsored</div>
            <h2>Let your company invest in you.</h2>
            <p className="lead" style={{ marginTop: '18px' }}>Most professional development budgets cover DISCOVER. We've written the request for you: a one-page justification with outcomes, agenda and costs, ready to send to your manager.</p>
            <ul className="checks" style={{ color: '#fff' }}>
              <li><i>1</i><div><b>Download the letter</b><span style={{ color: '#a9b8d2' }}>Pre-filled with DISCOVER's value and costs.</span></div></li>
              <li><i>2</i><div><b>Add your goals</b><span style={{ color: '#a9b8d2' }}>Two lines on what you'll bring back to the team.</span></div></li>
              <li><i>3</i><div><b>Send and join</b><span style={{ color: '#a9b8d2' }}>We invoice your company directly.</span></div></li>
            </ul>
          </div>
          <div className="form-card reveal">
            <h3 style={{ marginBottom: '6px' }}>Get the employer letter</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '22px', fontSize: '.95rem' }}>We'll email the template and a cost summary.</p>
            <form data-demo>
              <div className="row"><div><label>Name</label><input required /></div><div><label>Work email</label><input type="email" required /></div></div>
              <div className="row"><div><label>Company</label><input /></div><div><label>I'm requesting</label><select><option>All-Access ($349)</option><option>Summit Pass ($299)</option><option>Community ($99)</option></select></div></div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Email me the letter <span className="arr">→</span></button>
              <div className="form-ok">Sent! Check your inbox (demo).</div>
            </form>
          </div>
        </div>
      </section>

      <section id="chats">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Career Development Chats</div><h2>20+ executives. One hour each. All on replay.</h2></div>
            <p>Members get every live session and the full library of past chats.</p>
          </div>
          <div className="cards reveal">
            <div className="card"><div className="img"><img src="/assets/img/DISCOVER_Ridgwell_Chat_Series.png" alt="" /></div><div className="bd"><div className="k">SEP 2026</div><h4>Jonathan Ridgwell</h4><p>Leadership lessons from the top.</p></div></div>
            <div className="card"><div className="img"><img src="/assets/img/Dapo_Ajayi.png" alt="" /></div><div className="bd"><div className="k">AUG 2026</div><h4>Dapo Ajayi</h4><p>Innovation in medicine supply chains.</p></div></div>
            <div className="card"><div className="img"><img src="/assets/img/IMG_2625.jpg" alt="" /></div><div className="bd"><div className="k">ARCHIVE · 2021–2026</div><h4>Browse the full library</h4><p>Staci Collins, Anu Hans, Lynn Cinelli, Michelle Dilley and more.</p></div></div>
          </div>
        </div>
      </section>

      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal"><div><div className="tag">FAQ</div><h2>Before you join.</h2></div><p></p></div>
          <div className="faq reveal">
            <details open><summary>Who can join DISCOVER?</summary><p>Anyone working in or studying supply chain, from students and early-career talent to executives, in any industry.</p></details>
            <details><summary>Is my company already a partner?</summary><p>Check the partner list on our For Companies page. Partner employees may have Summit registrations included.</p></details>
            <details><summary>Can I upgrade from Community to All-Access?</summary><p>Yes, any time before the Summit. You only pay the difference.</p></details>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
