import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="top">
          <div>
            <span className="logo-box"><img src="/assets/img/discover-logo.png" alt="DISCOVER" /></span>
            <p style={{ marginTop: 22, maxWidth: 320 }}>A not-for-profit, cross-industry network building the next generation of supply chain leaders. Since 2017.</p>
          </div>
          <div><h5>For professionals</h5><ul><li><Link href="/professionals">Membership</Link></li><li><Link href="/professionals#chats">Career Development Chats</Link></li><li><Link href="/professionals#employer">Get your employer to pay</Link></li><li><Link href="/summit">Summit 2027</Link></li></ul></div>
          <div><h5>For companies</h5><ul><li><Link href="/sponsors">Why sponsor</Link></li><li><Link href="/sponsors#tiers">Sponsorship tiers</Link></li><li><Link href="/sponsors#prospectus">Download prospectus</Link></li><li><Link href="/sponsors#host">Host the Summit</Link></li></ul></div>
          <div><h5>DISCOVER</h5><ul><li><Link href="/about">Our story</Link></li><li><Link href="/about#leaders">Leadership</Link></li><li><a href="mailto:info@discover-org.us">info@discover-org.us</a></li><li>800-380-1408</li></ul></div>
        </div>
        <div className="bot"><span>© {new Date().getFullYear()} DISCOVER Supply Chain · A not-for-profit organization</span><span>Privacy · Terms · Accessibility</span></div>
      </div>
    </footer>
  );
}
