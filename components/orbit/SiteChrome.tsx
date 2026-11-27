import { AGENCY_AUDIT_URL, AUDIT_EXAMPLE_URL } from "../../lib/site-content";
import { MobileMenu } from "./MobileMenu";

export const navLinks = [
  { href: "/#services", label: "What we audit" },
  { href: "/#work", label: "Sample work" },
  { href: "/#process", label: "How it works" },
  { href: AGENCY_AUDIT_URL, label: "For agencies" },
] as const;

export function Mark({ size = 33 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="10.25" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="24" cy="24" rx="21" ry="8.8" transform="rotate(-32 24 24)" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="40.5" cy="13.5" r="3.1" fill="currentColor" />
    </svg>
  );
}

export function Wordmark() {
  return <a className="wordmark" href="/" aria-label="Orbit Audits home"><Mark /><span>Orbit<span className="wordmark-audit"> Audits</span><span className="brand-period">.</span></span></a>;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-layout">
        <Wordmark />
        <nav className="primary-nav" aria-label="Main navigation">
          {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="button button-nav" href="/contact">Get in touch</a>
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Wordmark />
          <p>Independent Google Ads audits.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/#services">What we audit</a>
          <a href="/#work">Sample work</a>
          <a href={AUDIT_EXAMPLE_URL}>Audit example</a>
          <a href={AGENCY_AUDIT_URL}>For agencies</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Enquiry privacy</a>
        </nav>
      </div>
      <div className="wrap footer-note">
        <span>© {new Date().getUTCFullYear()} Orbit Audits</span>
        <span>Map geometry: Natural Earth</span>
      </div>
    </footer>
  );
}
