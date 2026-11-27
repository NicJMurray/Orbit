import { ABOUT_URL, AGENCY_AUDIT_URL, AUDIT_CHECKLIST_URL } from "../../lib/site-content";
import { MobileMenu } from "./MobileMenu";

export const navLinks = [
  { href: "/#services", label: "Audit scope" },
  { href: "/#work", label: "Examples" },
  { href: AGENCY_AUDIT_URL, label: "For agencies" },
  { href: ABOUT_URL, label: "About" },
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
        <a className="button button-nav" href="/contact">Contact</a>
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <Wordmark />
        <nav aria-label="Footer navigation">
          {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href={AUDIT_CHECKLIST_URL}>Audit checklist</a>
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
