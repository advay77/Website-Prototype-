import type { Metadata } from 'next';
import { Net } from '@/components/Net';
import { PageChrome } from '@/components/PageChrome';

export const metadata: Metadata = {
  title: 'Why sponsor DISCOVER · Partner with the supply chain leadership network',
  description: 'Put your brand and your leaders in the room with 100+ supply chain professionals. DISCOVER partnerships from Corporate Membership to Summit Host Partner.',
};

export default function SponsorsPage() {
  return (
    <PageChrome page="co">
      <section className="phero">
        <Net className="net" seed={21} />
        <div className="wrap">
          <div className="crumbs">HOME / FOR COMPANIES</div>
          <div className="cols">
            <div>
              <div className="tag">Partner with DISCOVER</div>
              <h1>Put your company in the room where supply chain leaders are made.</h1>
              <p className="lead">For ten years, J&amp;J, Pfizer, Merck, Walmart, BCG, Hershey and 20+ more have used DISCOVER to develop their people, find diverse talent and lead the industry conversation. Here's how your company can too.</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '36px' }}>
                <a className="btn btn-primary" href="#prospectus">Get the 2027 prospectus <span className="arr">→</span></a>
                <a className="btn btn-ghost" href="#prospectus">Book a 20-min call</a>
              </div>
            </div>
            <div className="hero-photos" style={{ height: '440px' }}>
              <div className="ph p1" style={{ height: '300px' }}><img src="/assets/img/DSC00102-scaled.jpg" alt="Pfizer-hosted DISCOVER Summit stage" /></div>
              <div className="ph p2" style={{ height: '200px' }}><img src="/assets/img/IMG_2593.jpg" alt="Walmart recognized on stage at the Summit" /></div>
              <div className="chip" style={{ bottom: '20px' }}><div className="k">2024 SUMMIT</div><div className="v">Hosted by Pfizer, New York City</div><div className="route">HOST <i></i> PARTNER</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="stats" style={{ marginTop: '0' }}>
            <div><small>WHO'S IN THE ROOM</small><b>100<sup>+</sup></b><span>supply chain professionals and leaders at every Summit</span></div>
            <div><small>CROSS-INDUSTRY</small><b>5</b><span>sectors: pharma, consumer goods, retail, consulting, academia</span></div>
            <div><small>PROVEN</small><b>25<sup>+</sup></b><span>companies and universities have partnered with us</span></div>
            <div><small>ALWAYS ON</small><b>12<sup>mo</sup></b><span>of visibility through chats, socials and the network</span></div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Why sponsor</div><h2>Four returns on every partnership.</h2></div>
            <p>Sponsorship isn't a logo on a banner. It's a year-round seat at the table where the next generation of supply chain leadership is being built.</p>
          </div>
          <div className="outcomes reveal">
            <div className="outcome"><div className="n">01 · TALENT</div><h3>Build your diverse pipeline</h3><p>Meet emerging talent through the Diverse Talent Network, the career fair and our university partners.</p></div>
            <div className="outcome"><div className="n">02 · DEVELOPMENT</div><h3>Grow your own leaders</h3><p>Conference seats, executive coaching sessions and panel spots that stretch your high-potentials.</p></div>
            <div className="outcome"><div className="n">03 · VISIBILITY</div><h3>Be seen leading the industry</h3><p>Keynotes, signage, social recognition and a showcase in front of peers from 25+ companies.</p></div>
            <div className="outcome"><div className="n">04 · INFLUENCE</div><h3>Shape the agenda</h3><p>Champion and Guardian partners take a seat on the Advisory Council and Board.</p></div>
          </div>
        </div>
      </section>

      <section id="tiers">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Partnership tiers</div><h2>Choose your level of impact.</h2></div>
            <p>Every tier includes event branding and a year of recognition. Not sure which fits? We'll build a package around your goals.</p>
          </div>
          <div className="tiers-wrap reveal">
          <table className="tiers">
            <thead><tr>
              <th style={{ textAlign: 'left', verticalAlign: 'bottom' }}><span style={{ fontFamily: 'var(--mono)', fontSize: '.74rem', color: 'var(--muted)', fontWeight: '500' }}>BENEFITS</span></th>
              <th><span className="nm">Corporate</span><span className="pr">$3,000 / yr</span></th>
              <th><span className="nm">Advocate</span><span className="pr">$5K – $25K</span></th>
              <th><span className="nm">Champion</span><span className="pr">$25K – $50K</span></th>
              <th><span className="nm">Guardian</span><span className="pr">$50K+</span></th>
              <th className="host"><span className="nm">Summit Host</span><span className="pr">By application</span></th>
            </tr></thead>
            <tbody>
              <tr><td>Full Summit registrations</td><td>1</td><td>2</td><td>4</td><td>6</td><td className="host">10+</td></tr>
              <tr><td>Logo and signage in event promotions</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="y">✓</td><td className="host y">Presenting</td></tr>
              <tr><td>Exhibit table</td><td className="y">✓</td><td className="n">—</td><td className="n">—</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Lead executive coaching session</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Diverse Talent Network access</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Social media recognition</td><td className="n">—</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Company showcase at the career fair</td><td className="n">—</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Panel seat</td><td className="n">—</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Seat on the Advisory Council and Board</td><td className="n">—</td><td className="n">—</td><td className="y">✓</td><td className="y">✓</td><td className="host y">✓</td></tr>
              <tr><td>Keynote speaking opportunity</td><td className="n">—</td><td className="n">—</td><td className="n">—</td><td className="y">✓</td><td className="host y">Opening keynote</td></tr>
              <tr><td>Co-design the Summit at your venue</td><td className="n">—</td><td className="n">—</td><td className="n">—</td><td className="n">—</td><td className="host y">✓</td></tr>
              <tr><td></td><td><a className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: '.85rem' }} href="#prospectus">Join</a></td><td><a className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: '.85rem' }} href="#prospectus">Enquire</a></td><td><a className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: '.85rem' }} href="#prospectus">Enquire</a></td><td><a className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '.85rem' }} href="#prospectus">Enquire</a></td><td className="host"><a className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '.85rem' }} href="#host">Apply</a></td></tr>
            </tbody>
          </table>
          </div>
        </div>
      </section>

      <section className="mist" id="host">
        <div className="wrap split">
          <div className="media reveal"><img src="/assets/img/DSC00270-scaled.jpg" alt="DISCOVER Gala dinner" /></div>
          <div className="reveal">
            <div className="tag">Summit Host Partner</div>
            <h2>Host the Summit. Own the moment.</h2>
            <p className="lead" style={{ marginTop: '18px' }}>Our flagship partnership. Bring 100+ supply chain leaders to your venue, co-design the agenda and open the Summit as presenting partner.</p>
            <ul className="checks">
              <li><i>01</i><div><b>"DISCOVER Summit, presented by you"</b><span>Presenting credit on every page, badge, screen and post.</span></div></li>
              <li><i>02</i><div><b>Your leaders open the stage</b><span>Opening keynote plus a curated panel on your priority topic.</span></div></li>
              <li><i>03</i><div><b>A legacy, not a logo</b><span>Joins the line of host partners, including Pfizer (2024).</span></div></li>
            </ul>
            <a className="btn btn-primary" href="#prospectus">Apply to host 2028 <span className="arr">→</span></a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Partner voices</div><h2>Why partners stay with DISCOVER.</h2></div>
            <p>Hear directly from the companies who've sponsored, hosted and sent their teams.</p>
          </div>
          <div className="videos reveal">
            <div className="vid big"><img src="/assets/img/IMG_2611.jpg" alt="" /><div className="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg></div><div className="cap"><div className="k">Guardian partner</div><h4>What a decade of DISCOVER has meant for our talent</h4></div></div>
            <div className="vid"><img src="/assets/img/IMG_2552.jpg" alt="" /><div className="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg></div><div className="cap"><div className="k">Host partner</div><h4>Hosting 100+ leaders at our home</h4></div></div>
            <div className="vid"><img src="/assets/img/IMG_9042.jpg" alt="" /><div className="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l14 8-14 8z" /></svg></div><div className="cap"><div className="k">Exhibitor</div><h4>The career fair that fills our pipeline</h4></div></div>
          </div>
        </div>
      </section>

      <section className="mist" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="tag">Partners since 2018</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '14px', marginTop: '10px' }} className="reveal">
            <img src="/assets/logos/jj.png" alt="J&J" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/pfizer.png" alt="Pfizer" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/merck.png" alt="Merck" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/WM_Logo.png" alt="Walmart" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/bcg.jpg" alt="BCG" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/Hershey.jpg" alt="Hershey" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/BMS.jpg" alt="BMS" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/EY.jpg" alt="EY" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/gartner.jpg" alt="Gartner" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/GEP-Sponsor-Logo.png" alt="GEP" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/3M.jpg" alt="3M" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/Organon-Sponsor-Logo-210x130-1.png" alt="Organon" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/Land-o-Lankes-Sponsor-Logo.png" alt="Land O'Lakes" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/Walker.jpg" alt="Walker SCM" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/Rutgers-Sponsor-Logo_210x130.png" alt="Rutgers" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
            <img src="/assets/logos/Penn-State-Sponsor-Logo-210x130-1.png" alt="Penn State" style={{ background: '#fff', borderRadius: '14px', padding: '18px', height: '84px', width: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      <section className="dark" id="prospectus">
        <Net className="net" seed={33} style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div className="wrap split" style={{ position: 'relative' }}>
          <div>
            <div className="tag">Next step</div>
            <h2>Get the 2027 partnership prospectus.</h2>
            <p className="lead" style={{ marginTop: '18px' }}>Audience profile, full tier details, Host Partner terms and the 2027 calendar. We'll follow up within two business days.</p>
            <div className="chips" style={{ marginTop: '28px' }}><span>Audience profile</span><span>Tier benefits</span><span>Host Partner terms</span><span>2027 calendar</span></div>
          </div>
          <div className="form-card">
            <form data-demo>
              <div className="row"><div><label>Full name</label><input required /></div><div><label>Work email</label><input type="email" required /></div></div>
              <div className="row"><div><label>Company</label><input required /></div><div><label>Interested in</label><select><option>Not sure yet</option><option>Corporate Membership</option><option>Advocate</option><option>Champion</option><option>Guardian</option><option>Summit Host Partner</option></select></div></div>
              <div className="full"><label>What would success look like for your company?</label><textarea rows={3}></textarea></div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send me the prospectus <span className="arr">→</span></button>
              <div className="form-ok">Thanks! The prospectus is on its way (demo).</div>
            </form>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
