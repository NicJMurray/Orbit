import { ContactForm } from "./ContactForm";

export function Contact({ initialSent = false, standalone = false }: { initialSent?: boolean; standalone?: boolean }) {
  const Title = standalone ? "h1" : "h2";
  return (
    <section className={"contact-section" + (standalone ? " contact-standalone" : "")} id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-layout">
        <div className="contact-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> Contact us</p>
          <Title id="contact-title">Let’s talk<br />paid search<span className="green-period">.</span></Title>
          <p>Tell us what you’re working on and what you want the audit to answer. We’ll come back with a scope, timing and a fixed quote.</p>
          <div className="contact-tags"><span>For agencies</span><span>For in-house teams</span></div>
          <svg className="contact-orbits" viewBox="0 0 560 340" width="560" height="340" fill="none" aria-hidden="true">
            <g transform="rotate(-25 280 180)" stroke="currentColor">
              <ellipse cx="280" cy="180" rx="270" ry="72" />
              <ellipse cx="280" cy="180" rx="232" ry="53" />
              <ellipse cx="280" cy="180" rx="191" ry="34" />
              <ellipse cx="280" cy="180" rx="150" ry="16" />
              <circle cx="280" cy="180" r="84" />
              <path d="M280 64v232m-117-116h234" strokeDasharray="2 5" />
              <circle cx="85" cy="140" r="5" fill="currentColor" />
              <circle cx="470" cy="145" r="3" fill="currentColor" />
            </g>
          </svg>
        </div>
        <ContactForm initialSent={initialSent} />
      </div>
    </section>
  );
}
