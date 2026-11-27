import type { Metadata } from "next";
import { AUDIT_QUOTE_URLS } from "../../lib/enquiry";
import {
  AGENCY_AUDIT_URL,
  ALDER_ORBIT_CASE,
  AUDIT_CHECKLIST_URL,
  AUDIT_DOWNLOAD_URL,
  AUDIT_EXAMPLE_URL,
  AUDIT_URL,
} from "../../lib/site-content";

const title = "Google Ads audit example";
const description = "See a sample Google Ads Search audit for a fictional retailer. Explore findings on purchase tracking, negative keywords and where to move budget.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: AUDIT_EXAMPLE_URL },
  openGraph: {
    title,
    description,
    url: AUDIT_EXAMPLE_URL,
    siteName: "Orbit Audits",
    type: "website",
    locale: "en_GB",
    images: [{ url: ALDER_ORBIT_CASE.image, alt: ALDER_ORBIT_CASE.imageAlt }],
  },
};

const findings = [
  {
    title: "Two purchase actions could steer US bidding",
    evidence: "Two purchase actions were eligible to inform bidding in the US. If both record the same order, bidding can optimise against duplicated sales signals.",
    action: "Check both actions against actual orders and use one validated purchase action as the primary bidding signal.",
  },
  {
    title: "A shared negative blocked a UK product term",
    evidence: "A shared negative keyword made a priority UK product search ineligible, even though there was a relevant campaign and landing page.",
    action: "Remove the conflict at the narrowest scope and verify the product search can reach the intended ad group.",
  },
  {
    title: "Branded demand lifted the total Search return",
    evidence: "Searches for the retailer’s name lifted reported returns overall. The blended figure hid how much the results varied across non-brand campaigns and markets.",
    action: "Split brand and non-brand performance by market before deciding where to test higher budgets.",
  },
];

export default function AuditExamplePage() {
  return (
    <main id="main-content">
      <section className="hero audit-hero" aria-labelledby="audit-example-title">
        <div className="wrap audit-hero-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" /> Alder &amp; Orbit · Fictional example</p>
            <h1 id="audit-example-title">Google Ads <em>audit example</em></h1>
            <p className="hero-intro">Alder &amp; Orbit is a fictional lighting retailer with Google Search campaigns in 12 markets. Its brief was to find which markets could support more investment.</p>
            <div className="hero-actions">
              <a className="button button-lime" href={AUDIT_URL}>Open the interactive report</a>
              <a className="button button-outline" href={AUDIT_DOWNLOAD_URL} download="Orbit-Audits-Sample.html">Download HTML</a>
            </div>
          </div>
          <img
            className="audit-example-image"
            src={ALDER_ORBIT_CASE.image}
            alt={ALDER_ORBIT_CASE.imageAlt}
            width={720}
            height={720}
          />
        </div>
      </section>

      <section className="light-section section-space" aria-labelledby="audit-findings-title">
        <div className="wrap">
          <div className="section-heading split-heading">
            <h2 id="audit-findings-title">What the audit found</h2>
            <p>We’d verify the purchase signal first, fix the blocked search term, then use the non-brand numbers to decide where to invest.</p>
          </div>
          <ol className="process-grid audit-cards">
            {findings.map(finding => (
              <li className="process-step" key={finding.title}>
                <h3>{finding.title}</h3>
                <p>{finding.evidence}</p>
                <p className="audit-action"><strong>Recommended fix</strong> {finding.action}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="work section-space" aria-labelledby="audit-plan-title">
        <div className="wrap audit-details">
          <div className="section-heading">
            <h2 id="audit-plan-title">From findings to a 90-day plan</h2>
            <p>The full report lets you explore campaign data by market and see how each finding led to a recommendation in the plan. You can open the same HTML file in a browser and share it with the people making the changes.</p>
            <p className="section-link"><a href={AUDIT_CHECKLIST_URL}>Apply the same checks to your account</a></p>
          </div>
          <div className="audit-brief">
            <h3>Want the same review for your account?</h3>
            <p>Tell us what you want to find out from your Google Search campaigns. We’ll come back with a scope, timing and a fixed quote.</p>
            <a className="button button-lime" href={AUDIT_QUOTE_URLS.brand}>Get a fixed quote</a>
            <p className="section-link"><a href={AGENCY_AUDIT_URL}>Working on an agency client’s account? See white-label audits</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}
