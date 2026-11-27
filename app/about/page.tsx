import type { Metadata } from 'next';
import { Net } from '@/components/Net';
import { PageChrome } from '@/components/PageChrome';

export const metadata: Metadata = {
  title: 'About DISCOVER · Building bridges across supply chain since 2017',
  description: 'DISCOVER is a not-for-profit, cross-industry organization that drives the development of leaders in supply chain. Meet our Board, Member Partners and Advisory Council.',
};

export default function AboutPage() {
  return (
    <PageChrome page="about">
      <section className="phero">
        <Net className="net" seed={52} />
        <div className="wrap">
          <div className="crumbs">HOME / ABOUT</div>
          <div className="cols">
            <div>
              <div className="tag">Our story</div>
              <h1>Building bridges. Breaking down barriers.</h1>
              <p className="lead">DISCOVER is a not-for-profit, cross-industry organization that drives the development of leaders in supply chain. Through cross-company collaboration we advance, develop and engage the people who keep the world moving.</p>
            </div>
            <div className="hero-photos" style={{ height: '400px' }}>
              <div className="ph p1" style={{ height: '300px' }}><img src="/assets/img/Discover-213-min.jpg" alt="DISCOVER leaders at an early Summit" /></div>
              <div className="ph p2" style={{ height: '190px' }}><img src="/assets/img/IMG_8806-min.jpg" alt="Keynote speaker at DISCOVER" /></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="programs reveal" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <div className="prog"><span className="num">MISSION</span><h3 style={{ marginTop: '22px' }}>Develop supply chain leaders</h3><p>Advance, develop and engage leaders in supply chain functions, adding value to member organizations and the industry as a whole.</p></div>
            <div className="prog"><span className="num">WHO WE SERVE</span><h3 style={{ marginTop: '22px' }}>Professionals and students</h3><p>Professionals seeking networking, development and advancement, and students exploring supply chain careers.</p></div>
            <div className="prog"><span className="num">OUR OPPORTUNITY</span><h3 style={{ marginTop: '22px' }}>Change the talent pipeline</h3><p>Drive sustainable change in the pipeline of supply chain leaders, with diversity at its core.</p></div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <div className="sec-head reveal"><div><div className="tag">Ten years in motion</div><h2>From one Summit to a year-round network.</h2></div><p>Every year a new route, a new host city and more leaders in the network.</p></div>
          <div className="track-line reveal">
            <div className="stop"><div className="dot"></div><b>2017</b><span>DISCOVER founded · first Summit</span></div>
            <div className="stop"><div className="dot"></div><b>2018</b><span>First sponsor cohort</span></div>
            <div className="stop"><div className="dot"></div><b>2019</b><span>Summit III</span></div>
            <div className="stop"><div className="dot"></div><b>2020</b><span>Goes virtual</span></div>
            <div className="stop"><div className="dot"></div><b>2021</b><span>Career Chats launch</span></div>
            <div className="stop"><div className="dot"></div><b>2022</b><span>Back in person · Hershey</span></div>
            <div className="stop"><div className="dot"></div><b>2023</b><span>"United for IMPACT"</span></div>
            <div className="stop"><div className="dot"></div><b>2024</b><span>Pfizer hosts in NYC</span></div>
            <div className="stop"><div className="dot"></div><b>2025</b><span>Summit + Gala · Jersey City</span></div>
            <div className="stop now"><div className="dot"></div><b>2026</b><span>Decade of DISCOVER</span></div>
          </div>
        </div>
      </section>

      <section id="leaders">
        <div className="wrap">
          <div className="sec-head reveal"><div><div className="tag">Board of Directors</div><h2>Led by practitioners.</h2></div><p>Volunteers from the companies that make up the DISCOVER network.</p></div>
          <div className="people reveal">
            <div className="person"><img src="/assets/people/yh3.png" alt="Yahne Henry" /><b>Yahne Henry</b><span>President · Johnson &amp; Johnson</span></div>
            <div className="person"><img src="/assets/people/portrait_sharpened_original.png" alt="Odi Ikpe" /><b>Odi Ikpe</b><span>Past President · Elite Prep Center</span></div>
            <div className="person"><img src="/assets/people/gagan.jpg" alt="Gagan Dep Prabhu" /><b>Gagan Dep Prabhu</b><span>EY</span></div>
            <div className="person"><img src="/assets/people/R_Barcena.jpg" alt="Regina Barcena" /><b>Regina Barcena</b><span>Hershey</span></div>
            <div className="person"><img src="/assets/people/randy.jpg" alt="Randy Desir" /><b>Randy Desir</b><span>Johnson &amp; Johnson</span></div>
            <div className="person"><img src="/assets/people/Deb.png" alt="Deborah Gross" /><b>Deborah Gross</b><span>BCG</span></div>
            <div className="person"><img src="/assets/people/minu.jpg" alt="Minu Patel" /><b>Minu Patel</b><span>Board member</span></div>
            <div className="person"><img src="/assets/people/jon.jpg" alt="Jovonsia Guidry" /><b>Jovonsia Guidry</b><span>Walmart</span></div>
            <div className="person"><img src="/assets/people/CR.jpeg" alt="Candace Renfrow" /><b>Candace Renfrow</b><span>Flex</span></div>
          </div>
        </div>
      </section>

      <section className="mist">
        <div className="wrap">
          <div className="sec-head reveal"><div><div className="tag">Member Partners</div><h2>The companies behind DISCOVER.</h2></div><p>Partner representatives who shape our programs every year.</p></div>
          <div className="people reveal">
            <div className="person"><img src="/assets/people/image002.jpg" alt="Ricco Estanislao" /><b>Ricco Estanislao</b><span>J&amp;J</span></div>
            <div className="person"><img src="/assets/people/Alicia-Petross.jpg" alt="Alicia Petross" /><b>Alicia Petross</b><span>Hershey</span></div>
            <div className="person"><img src="/assets/people/Picture1.jpg" alt="Jim Cafone" /><b>Jim Cafone</b><span>Pfizer</span></div>
            <div className="person"><img src="/assets/people/B.Walker_Headshot.jpg" alt="Brittany Walker" /><b>Brittany Walker</b><span>Walker SCM</span></div>
            <div className="person"><img src="/assets/people/Lu-Chen.jpg" alt="Lu Chen" /><b>Lu Chen</b><span>BCG</span></div>
            <div className="person"><img src="/assets/people/Amol-Jawale.png" alt="Amol Jawale" /><b>Amol Jawale</b><span>GEP</span></div>
            <div className="person"><img src="/assets/people/B_Sreenivi.jpg" alt="Bala Sreenivasan" /><b>Bala Sreenivasan</b><span>Merck</span></div>
            <div className="person"><img src="/assets/people/g_bell.jpg" alt="Geno Bell" /><b>Geno Bell</b><span>Walmart</span></div>
            <div className="person"><img src="/assets/people/k_boyle.jpg" alt="Kelly Boyle" /><b>Kelly Boyle</b><span>Walmart</span></div>
            <div className="person"><img src="/assets/people/CINELLI_LYNN2.jpg" alt="Lynn Cinelli" /><b>Lynn Cinelli</b><span>BMS</span></div>
          </div>
          <div style={{ marginTop: '56px' }} className="reveal">
            <div className="tag">Advisory Council</div>
            <div className="chips"><span>Anu Hans · J&amp;J</span><span>Alicia Petross · Hershey</span><span>Bala Sreenivasan · Merck</span><span>Laverne Bastress · J&amp;J</span><span>Lu Chen · BCG</span><span>Steve Tracey · Penn State</span><span>Felisa Higgins · Penn State</span><span>Anita Ricketts · DiversityInc</span><span>Brittany Walker · Walker SCM</span><span>Michelle Dilley · AWESOME</span><span>Nick Vyas · USC</span><span>Barry Blake · Gartner</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="paths">
            <a className="path reveal" href="/professionals" style={{ minHeight: '380px' }}><img className="bg" src="/assets/img/IMG_5224.jpg" alt="" /><div className="in"><div className="tag">For professionals</div><h3>Join the network</h3><span className="btn btn-white">Explore membership <span className="arr">→</span></span></div></a>
            <a className="path co reveal" href="/sponsors" style={{ minHeight: '380px' }}><img className="bg" src="/assets/img/DSC00270-scaled.jpg" alt="" /><div className="in"><div className="tag">For companies</div><h3>Become a partner</h3><span className="btn btn-white">Why sponsor <span className="arr">→</span></span></div></a>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
