import type { Metadata } from "next";
import { CopyFindingsTemplate } from "../../components/orbit/CopyFindingsTemplate";
import { AUDIT_QUOTE_URLS } from "../../lib/enquiry";
import { ALDER_ORBIT_CASE, AUDIT_CHECKLIST_URL, AUDIT_EXAMPLE_URL, AUDIT_URL } from "../../lib/site-content";

const title = "Google Ads audit checklist";
const description = "Audit your Google Search campaigns with six practical checks, a worked example and a findings template you can copy into a spreadsheet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: AUDIT_CHECKLIST_URL },
  openGraph: {
    title,
    description,
    url: AUDIT_CHECKLIST_URL,
    siteName: "Orbit Audits",
    type: "website",
    locale: "en_GB",
    images: [{ url: ALDER_ORBIT_CASE.image, alt: ALDER_ORBIT_CASE.imageAlt }],
  },
};

const checks = [
  {
    title: "Conversion tracking",
    location: "Open the Conversions summary under Goals. Check which conversion goals each Search campaign uses and which actions are included.",
    flag: "A sale recorded by both the Google Ads tag and a GA4 import, or a campaign bidding towards an action that rarely becomes a customer.",
    action: "Trace a test order or enquiry through to the systems that receive it. Verify the recorded action, ID and value where available, then confirm which action the campaign should use for bidding.",
    reference: { href: "https://support.google.com/google-ads/answer/10995103?hl=en-GB", label: "Google Ads conversion goals" },
  },
  {
    title: "Account structure",
    location: "Review campaigns and ad groups by brand, market, product or service, and the intent of the searches they cover.",
    flag: "Branded searches dominate the combined return, or different markets and search intents share a budget despite having different goals.",
    action: "Report brand and non-brand performance separately. Compare each against its objective, then decide whether a change to budgets or structure would help.",
  },
  {
    title: "Search terms and negative keywords",
    location: "Open Search terms under Insights and reports. Include the matched keyword, cost and conversions. Check any shared negative lists attached to those campaigns.",
    flag: "Spend on searches that clearly fall outside the offer, or an active keyword blocked by a campaign, ad group or shared negative.",
    action: "Review search intent and allow for conversion lag before judging a term by performance. Resolve confirmed negative keyword conflicts at the narrowest level and check eligibility afterwards.",
    reference: { href: "https://support.google.com/google-ads/answer/2472708?hl=en-GB", label: "Google Ads search terms report" },
  },
  {
    title: "Bidding and budgets",
    location: "Compare spend, budgets, bid strategies and targets in the campaign table. Use the bid strategy report and change history for context.",
    flag: "A budget moved on the strength of blended return, or a target that changed before enough conversions had been recorded to judge it.",
    action: "Choose one budget or bidding change to test. Set the spend limit, success metric and review date up front.",
    reference: { href: "https://support.google.com/google-ads/answer/7074568?hl=en-GB", label: "Find Google Ads bid strategy reports" },
  },
  {
    title: "Ads and assets",
    location: "Review active Search ads and their assets alongside the highest-spend queries in each ad group.",
    flag: "An expired offer, a sitelink to a retired page, or headlines that promise something the landing page doesn’t deliver.",
    action: "Update the parts that create the mismatch. Check the ad copy and destination together before reviewing the new performance.",
  },
  {
    title: "Landing pages",
    location: "Review final URLs by campaign or ad group. Open the destinations on mobile and follow the path to purchase or enquiry.",
    flag: "A redirect to the wrong product, language or market, or a form that’s difficult to complete on mobile.",
    action: "Send the ad to the closest relevant page. Verify the destination and the conversion event after the change.",
  },
];

const columns = ["Check", "Evidence", "Priority", "Next action", "How to verify"];
const workedFinding = [
  "Search terms and negative keywords",
  "In the fictional UK Product intent campaign, an attached shared negative list blocks the enabled [portable table lamp] keyword.",
  "High",
  "Resolve the conflict for the affected campaign.",
  "Confirm eligibility and check the intended ad and final URL.",
];
const findingsTemplate = [
  columns,
  workedFinding,
  ...checks.map(check => [check.title, "", "", "", ""]),
].map(row => row.join("\t")).join("\n");

export default function AuditChecklistPage() {
  return (
    <main id="main-content">
      <section className="hero audit-hero" aria-labelledby="checklist-title">
        <div className="wrap audit-hero-layout">
          <div>
            <h1 id="checklist-title">Google Ads <em>audit checklist</em></h1>
            <p className="hero-intro">Use these six checks to review your Google Search campaigns. Start with what the account counts as a conversion, then work through the settings and searches that shape where the money goes.</p>
            <div className="hero-actions">
              <a className="button button-lime" href="#audit-checks">Jump to the checks</a>
              <a className="button button-outline" href="#findings-template">Findings template</a>
            </div>
          </div>
          <aside className="audit-brief" aria-labelledby="checklist-prep-title">
            <h2 id="checklist-prep-title">Before you start</h2>
            <ul className="checklist-prep">
              <li>Write down the decision the audit needs to support, such as where to cut spend or what to fix after taking over the account.</li>
              <li>Choose a representative date range and compare like-for-like periods. Give recent clicks time to convert.</li>
              <li>Agree which outcomes count, such as paid orders or qualified enquiries, and gather the data you’ll use to verify them.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="light-section section-space" id="audit-checks" aria-labelledby="checks-title">
        <div className="wrap">
          <div className="section-heading">
            <h2 id="checks-title">Six checks for a Search account</h2>
          </div>
          <ol className="audit-card-grid checklist-list">
            {checks.map(check => (
              <li className="audit-card" key={check.title}>
                <h3>{check.title}</h3>
                <dl>
                  <div>
                    <dt>Where to look</dt>
                    <dd>{check.location}</dd>
                  </div>
                  <div>
                    <dt>What to flag</dt>
                    <dd>{check.flag}</dd>
                  </div>
                  <div>
                    <dt>What to do next</dt>
                    <dd>{check.action}</dd>
                  </div>
                </dl>
                {check.reference && <p className="section-link"><a href={check.reference.href}>{check.reference.label}</a></p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="work section-space" id="findings-template" aria-labelledby="template-title">
        <div className="wrap">
          <div className="section-heading split-heading">
            <h2 id="template-title">Record your findings</h2>
            <p>Keep one row per finding. Save the evidence and how you’ll verify the fix so someone else can pick up the work.</p>
          </div>
          <div className="findings-table-wrap" role="region" aria-label="Worked finding from the fictional audit" tabIndex={0}>
            <table className="findings-table">
              <caption>Worked example from the fictional Alder &amp; Orbit audit</caption>
              <thead>
                <tr>{columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{workedFinding[0]}</th>
                  {workedFinding.slice(1).map(value => <td key={value}>{value}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <CopyFindingsTemplate template={findingsTemplate} />
          <p className="section-link"><a href={AUDIT_URL}>Open the full interactive audit</a></p>
        </div>
      </section>

      <section className="light-section section-space" aria-labelledby="checklist-next-title">
        <div className="wrap">
          <div className="section-heading">
            <h2 id="checklist-next-title">Get a second opinion</h2>
          </div>
          <p className="guide-intro">We review Google Search campaigns and deliver the evidence, priorities and next steps in an interactive report your team can share and keep.</p>
          <p className="section-link"><a href={AUDIT_EXAMPLE_URL}>See what a Google Ads audit looks like</a></p>
          <p className="section-link"><a className="button button-ink" href={AUDIT_QUOTE_URLS.brand}>Get a fixed quote</a></p>
        </div>
      </section>
    </main>
  );
}
