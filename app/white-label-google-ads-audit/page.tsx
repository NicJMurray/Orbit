import type { Metadata } from "next";
import { AUDIT_QUOTE_URLS } from "../../lib/enquiry";
import { AGENCY_AUDIT_URL, ALDER_ORBIT_CASE, AUDIT_EXAMPLE_URL } from "../../lib/site-content";

const title = "White-label Google Ads audits for agencies";
const description = "Get a one-off Google Search audit you can present under your agency’s branding. Use it in a pitch, when onboarding an account or at a client review.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: AGENCY_AUDIT_URL },
  openGraph: {
    title,
    description,
    url: AGENCY_AUDIT_URL,
    siteName: "Orbit Audits",
    type: "website",
    locale: "en_GB",
    images: [{ url: ALDER_ORBIT_CASE.image, alt: ALDER_ORBIT_CASE.imageAlt }],
  },
};

const useCases = [
  {
    title: "Pitches",
    description: "Back up your pitch with account evidence. Show where spend is going, what you’d fix first and where there’s room to grow.",
  },
  {
    title: "New account onboarding",
    description: "Check conversion tracking and find the campaign settings or search terms that need attention before you change budgets.",
  },
  {
    title: "Client reviews",
    description: "Give an existing client a fresh view of what’s working. Use the findings to agree the next set of priorities with the team running the account.",
  },
];

export default function AgencyAuditPage() {
  return (
    <main id="main-content">
      <section className="hero audit-hero" aria-labelledby="agency-title">
        <div className="wrap audit-hero-layout">
          <div>
            <h1 id="agency-title">White-label Google Ads audits <em>for agencies</em></h1>
            <p className="hero-intro">A one-off review of your client’s Google Search campaigns, delivered as an interactive report under your agency’s branding. Your team presents the findings and implements the changes.</p>
            <div className="hero-actions">
              <a className="button button-lime" href={AUDIT_QUOTE_URLS.agency}>Get a fixed quote</a>
              <a className="button button-outline" href={AUDIT_EXAMPLE_URL}>See a sample report</a>
            </div>
          </div>
          <div className="audit-brief">
            <h2>What you can share with your client</h2>
            <p>You stay the point of contact. We deliver the report to your team, and you decide when and how to share it.</p>
            <dl>
              <div><dt>Executive summary</dt><dd>Lead with the issues that matter most to the account.</dd></div>
              <div><dt>Evidence behind each finding</dt><dd>Drill into the campaigns, markets and search terms that support each recommendation.</dd></div>
              <div><dt>Prioritised action plan</dt><dd>Hand the next steps to the team running the account. The HTML report opens in a browser and works offline.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="light-section section-space" aria-labelledby="agency-uses-title">
        <div className="wrap">
          <div className="section-heading">
            <h2 id="agency-uses-title">When to bring us in</h2>
          </div>
          <ul className="process-grid audit-cards">
            {useCases.map(item => (
              <li className="process-step" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="work section-space" aria-labelledby="agency-scope-title">
        <div className="wrap audit-details">
          <div className="section-heading">
            <h2 id="agency-scope-title">What the PPC audit covers</h2>
            <p>We review account structure, bidding, budgets, search terms, negative keywords, ads, landing pages and conversion tracking. We agree which accounts, campaigns and markets to cover before starting.</p>
          </div>
          <div className="audit-brief">
            <h3>Access and turnaround</h3>
            <p>Tell us how many accounts and markets you want reviewed and what the audit needs to answer. We’ll agree a fixed fee and delivery date upfront.</p>
            <p>We aim to deliver a standard audit in about a week once we’ve agreed the scope and received read-only access or the agreed exports.</p>
            <a className="button button-lime" href={AUDIT_QUOTE_URLS.agency}>Get a fixed quote</a>
          </div>
        </div>
      </section>
    </main>
  );
}
