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
    title: "US purchases could be counted twice",
    evidence: "US campaigns could bid on two purchase actions. If both record the same order, Google Ads counts it twice.",
    action: "Check both actions against orders. Use one verified purchase action for bidding.",
  },
  {
    title: "A shared negative blocked a UK product term",
    evidence: "A shared negative keyword blocked a product search that had a relevant campaign and landing page.",
    action: "Fix the rule where it applies and check that the intended ad can show.",
  },
  {
    title: "Brand searches hid weaker returns",
    evidence: "Searches for the retailer’s name lifted overall returns and masked differences across non-brand campaigns.",
    action: "Compare brand and non-brand returns by market before raising budgets.",
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
            <p className="hero-intro">A fictional lighting retailer runs Google Search campaigns in 12 markets. Which can support more spend?</p>
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
          <div className="section-heading">
            <h2 id="audit-findings-title">What the audit found</h2>
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
            <h2 id="audit-plan-title">The 90-day plan</h2>
            <p>The full report shows the evidence by market and the order we’d tackle each fix.</p>
            <p className="section-link"><a href={AUDIT_CHECKLIST_URL}>Use the audit checklist</a></p>
          </div>
          <div className="audit-brief">
            <h3>Need an audit?</h3>
            <a className="button button-lime" href={AUDIT_QUOTE_URLS.brand}>Get a fixed quote</a>
            <p className="section-link"><a href={AGENCY_AUDIT_URL}>See white-label audits for agencies</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}
