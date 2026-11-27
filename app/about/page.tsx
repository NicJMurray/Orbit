import type { Metadata } from "next";
import { ABOUT_URL, AUDIT_EXAMPLE_URL } from "../../lib/site-content";

const title = "About Orbit Audits";
const description = "Meet Sam and Nic, the team behind Orbit Audits. We review Google Search campaigns for agencies and in-house teams.";

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: { canonical: ABOUT_URL },
  openGraph: {
    title,
    description,
    url: ABOUT_URL,
    siteName: "Orbit Audits",
    type: "website",
    locale: "en_GB",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="hero audit-hero" aria-labelledby="about-title">
        <div className="wrap audit-hero-layout about-hero">
          <h1 id="about-title">About <em>Orbit Audits</em></h1>
          <p className="hero-intro">We’re Sam and Nic. We run independent Google Search audits for agencies and in-house teams.</p>
          <div className="hero-actions">
            <a className="button button-lime" href="/contact">Contact us</a>
            <a className="button button-outline" href={AUDIT_EXAMPLE_URL}>View a sample audit</a>
          </div>
        </div>
      </section>

      <section className="light-section section-space" aria-labelledby="about-team-title">
        <div className="wrap">
          <div className="section-heading">
            <h2 id="about-team-title">Who you’ll work with</h2>
          </div>
          <div className="audit-card-grid">
            <article className="audit-card">
              <h3>Sam</h3>
              <p className="team-role">Scoping and client contact</p>
              <p>Sam helps define what the audit needs to answer and is your point of contact throughout.</p>
            </article>
            <article className="audit-card">
              <h3>Nic</h3>
              <p className="team-role">Analysis and reporting</p>
              <p>Nic reviews the account, builds the interactive report and prioritises the recommended fixes.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
