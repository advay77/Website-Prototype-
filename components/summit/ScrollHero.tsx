import Link from 'next/link';

/**
 * Summit hero: the home-page film (one slow move from the back of the hall to
 * the stage) loops behind the headline. No scroll sequence; the page simply
 * scrolls on to the next section.
 */
export function ScrollHero() {
  return (
    <section className="sh" aria-label="DISCOVER Summit 2027">
      <div className="sh-stick">
        <video className="sh-film" autoPlay muted loop playsInline preload="auto" poster="/assets/video/hero-poster.jpg" aria-hidden="true">
          <source src="/assets/video/hero.webm" type="video/webm" />
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="sh-shade" aria-hidden="true" />

        <div className="wrap sh-layer">
          <div className="sh-intro">
            <h1>The future of supply chain starts <em>with connection.</em></h1>
            <p className="lead">Join emerging talent, industry leaders and organizations shaping the next generation of supply chain leadership.</p>
            <div className="chips s-chips"><span>September 2027</span><span>New York · venue soon</span></div>
            <div className="ctas">
              <a className="btn btn-primary" href="#tickets">Register for the Summit <span className="arr">→</span></a>
              <Link className="btn btn-ghost s-ghost" href="/sponsors">Explore sponsorship</Link>
            </div>
          </div>
        </div>

        <a className="sh-hint" href="#why" aria-label="Scroll to the next section"><span>Scroll</span><i /></a>
      </div>
    </section>
  );
}
