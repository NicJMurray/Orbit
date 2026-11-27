import type { Metadata } from "next";
import { ABOUT_URL, AGENCY_AUDIT_URL, AUDIT_CHECKLIST_URL, AUDIT_EXAMPLE_URL } from "../../lib/site-content";

const title = "About Orbit Audits";
const description = "Meet Sam and Nic, the team behind Orbit Audits. Learn how we review Google Search campaigns for agencies and in-house teams.";

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
        <div className="wrap audit-hero-layout">
          <div>
            <h1 id="about-title">About <em>Orbit Audits</em></h1>
            <p className="hero-intro">We’re Sam and Nic. We review Google Search campaigns for agencies and in-house teams who want to know where their spend is going, what to fix and which opportunities are worth testing.</p>
            <div className="hero-actions">
              <a className="button button-lime" href="/contact">Talk to us about an audit</a>
              <a className="button button-outline" href={AUDIT_EXAMPLE_URL}>See an example report</a>
            </div>
          </div>
          <aside className="audit-brief" aria-labelledby="about-offer-title">
            <h2 id="about-offer-title">What we deliver</h2>
            <p>A one-off audit with evidence you can explore by campaign and market, and a prioritised action plan for the people who run the account.</p>
            <p>Agencies can present the report under their own branding. It works offline as a single HTML file.</p>
          </aside>
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
              <p className="team-role">Project scope and client contact</p>
              <p>Sam works in paid media planning and performance reporting. He helps you decide what the audit should answer, whether you’re preparing a pitch, taking over an account or trying to understand a change in performance.</p>
            </article>
            <article className="audit-card">
              <h3>Nic</h3>
              <p className="team-role">Account analysis and report delivery</p>
              <p>Nic leads the review, following the evidence from account settings and search terms through to conversions. He builds the interactive report, sets out the recommended actions and shows how you can check each change.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="work section-space" aria-labelledby="about-method-title">
        <div className="wrap audit-details">
          <div className="section-heading">
            <h2 id="about-method-title">How we work</h2>
            <p>We agree the scope and a fixed fee with you. We use read-only account access or agreed exports, check the evidence behind each finding, and show where the available data limits what we can conclude.</p>
            <p>We aim to deliver a standard audit in about a week once the scope is agreed and we have the inputs. Your team gets the report and decides which recommendations to implement.</p>
            <p className="section-link"><a href={AUDIT_CHECKLIST_URL}>See what we check in a Google Ads audit</a></p>
          </div>
          <div className="audit-brief">
            <h3>Working on behalf of a client?</h3>
            <p>We work with agencies on pitches, account handovers and client reviews. You can share the audit with your client or use it to brief your paid search team.</p>
            <a className="button button-lime" href={AGENCY_AUDIT_URL}>Explore white-label audits</a>
          </div>
        </div>
      </section>
    </main>
  );
}
