import type { Metadata } from "next";
import { AUDIT_QUOTE_URLS } from "../../lib/enquiry";
import { AGENCY_AUDIT_URL, ALDER_ORBIT_CASE, AUDIT_CHECKLIST_URL, AUDIT_EXAMPLE_URL } from "../../lib/site-content";

const title = "White-label Google Ads audits for agencies";
const description = "Get an independent Google Search audit under your agency’s branding. Use the interactive report in a pitch, account handover or client review.";

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

export default function AgencyAuditPage() {
  return (
    <main id="main-content">
      <section className="hero audit-hero" aria-labelledby="agency-title">
        <div className="wrap audit-hero-layout">
          <div>
            <h1 id="agency-title">White-label Google Ads audits <em>for agencies</em></h1>
            <p className="hero-intro">We review your client’s Google Search campaigns. You get an interactive report under your agency’s branding and stay the client’s point of contact.</p>
            <div className="hero-actions">
              <a className="button button-lime" href={AUDIT_QUOTE_URLS.agency}>Get a fixed quote</a>
              <a className="button button-outline" href={AUDIT_EXAMPLE_URL}>View a sample audit</a>
            </div>
          </div>
          <div className="audit-brief">
            <h2>What you get</h2>
            <p>One HTML file you can share or present offline.</p>
            <dl>
              <div><dt>Executive summary</dt><dd>The findings that matter most.</dd></div>
              <div><dt>Interactive evidence</dt><dd>Explore results by campaign and market.</dd></div>
              <div><dt>Action plan</dt><dd>See what to fix first and how to verify it.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="work section-space" aria-labelledby="agency-scope-title">
        <div className="wrap audit-details">
          <div className="section-heading">
            <h2 id="agency-scope-title">Scope and delivery</h2>
            <p>Bring us in for a pitch, account handover or client review. We check campaign structure, bidding, search terms, ads, landing pages and conversion tracking.</p>
            <p className="section-link"><a href={AUDIT_CHECKLIST_URL}>See the audit checklist</a></p>
          </div>
          <div className="audit-brief">
            <h3>Timing and fees</h3>
            <p>We agree a fixed fee upfront. Standard audits take about a week once we’ve agreed the scope and received read-only access or the agreed exports.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
