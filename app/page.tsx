import type { Metadata } from "next";
import { Globe } from "../components/orbit/Globe";
import { ExampleWork } from "../components/orbit/ExampleWork";
import { Contact } from "../components/orbit/Contact";
import {
  ABOUT_URL,
  AGENCY_AUDIT_URL,
  AUDIT_CHECKLIST_URL,
  AUDIT_DOWNLOAD_URL,
  AUDIT_EXAMPLE_URL,
  AUDIT_PILLARS,
  AUDIT_URL,
  FAQ,
} from "../lib/site-content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const AUDIT_SITUATIONS = [
  {
    title: "You’re taking over an account",
    copy: "Find out what’s working and what needs attention before you change the setup.",
  },
  {
    title: "Costs are rising",
    copy: "See where spend has shifted and which campaigns are bringing in fewer leads or sales for the money.",
  },
  {
    title: "You’re planning to spend more",
    copy: "Check that Google Ads is counting the right conversions before you increase the budget.",
  },
] as const;

const PROCESS = [
  { title: "Scope the question", copy: "Tell us what you need to decide: where to invest, what to fix, or how to get a new account off to a good start." },
  { title: "Open up the account", copy: "Give us read-only access or share the agreed exports. We trace search, spend and measurement across the markets in scope." },
  { title: "Get a report you keep", copy: "Open the interactive report in a browser, dig into the evidence and share the action plan with the people doing the work." },
] as const;

function PillarArt({ type }: { type: (typeof AUDIT_PILLARS)[number]["id"] }) {
  return (
    <div className={"pillar-art pillar-" + type} aria-hidden="true">
      <svg viewBox="0 0 320 108" fill="none" preserveAspectRatio="xMidYMid meet">
        {type === "structure" ? (
          <>
            <path d="M160 28V49M56 72V49h208v23M160 49v23" stroke="#80927b" strokeDasharray="3.5 4" />
            <rect x="121" y="12" width="78" height="25" rx="5" fill="#425e42" />
            <circle cx="135" cy="24.5" r="3.5" fill="#dbf69e"/>
            <path d="M145 24.5h39" stroke="#d8edc3" strokeWidth="2" strokeLinecap="round" />
            {[23, 127, 231].map((x, i) => <g key={x}><rect x={x} y="65" width="66" height="25" rx="5" fill={i === 1 ? "#d5e7b9" : "#ecf2e8"} stroke="#b6c4af" /><circle cx={x+13} cy="77.5" r="3" fill="#65805a"/><path d={"M"+(x+23)+" 77.5h30"} stroke="#88a17e" strokeWidth="2" strokeLinecap="round" /></g>)}
          </>
        ) : type === "query" ? (
          <>
            {[30, 54, 78].map((y, i) => (
              <g key={y}>
                <rect x="22" y={y-8} width={79+i*23} height="16" rx="3" fill={i === 1 ? "#a4be80" : "#c2d2b8"} />
                <path d={"M"+(105+i*23)+" "+y+"h"+(127-i*23)} stroke="#a2b49a" strokeDasharray="3 4" />
                <circle cx="241" cy={y} r="6.5" fill={i === 1 ? "#4c6d40" : "#ccdac5"} />
                <path d={"M254 "+y+"h34"} stroke={i === 1 ? "#6a865e" : "#a2b49a"} strokeWidth="2.2" strokeLinecap="round" />
              </g>
            ))}
          </>
        ) : (
          <>
            <path d="M25 27h270M25 52h270M25 77h270" stroke="#bdc9b7" strokeDasharray="3 5" />
            <path d="M26 78 61 65 93 74 126 49 161 53 194 44 228 54 260 30 294 24v64H26Z" fill="url(#plot-light)" />
            <path d="M26 78 61 65 93 74 126 49 161 53 194 44 228 54 260 30 294 24" stroke="#416a39" strokeWidth="2.3" strokeLinejoin="round" />
            <circle cx="260" cy="30" r="12" fill="#5a8238" fillOpacity=".14" />
            <circle cx="260" cy="30" r="4.1" fill="#4b7438" stroke="#f4f7ec" strokeWidth="1.5" />
            <defs><linearGradient id="plot-light" x1="160" x2="160" y1="24" y2="88" gradientUnits="userSpaceOnUse"><stop stopColor="#a9c38c" stopOpacity=".55" /><stop offset="1" stopColor="#a9c38c" stopOpacity=".04" /></linearGradient></defs>
          </>
        )}
      </svg>
    </div>
  );
}

function ProcessIcon({ i }: { i: number }) {
  return <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    {i === 0 ? <>
      <circle cx="15" cy="15" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="15" r="2.5" fill="currentColor" />
      <path d="M15 2v6m0 14v6M2 15h6m14 0h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </> : i === 1 ? <>
      <path d="M3 15S7 8 15 8s12 7 12 7-4 7-12 7S3 15 3 15Z" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="15" cy="15" r="3.75" stroke="currentColor" strokeWidth="1.45" />
    </> : <>
      <rect x="6" y="4.5" width="18" height="21" rx="2.5" stroke="currentColor" strokeWidth="1.45" />
      <path d="M10.5 10h9m-9 4.5h9m-9 4.5h5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
    </>}
  </svg>;
}

export default function Home() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Orbit Audits",
        url: "https://orbit.njmurray.com/",
        description: "Independent Google Ads audits for agencies and in-house marketing teams.",
      }) }} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> Paid search. In full view.</p>
            <h1 id="hero-title">Independent <br />Google Ads <em>audits</em></h1>
            <p className="hero-intro">See what’s working, where spend is leaking and what to fix first. Get an interactive audit your team can explore, share and keep.</p>
            <div className="hero-actions">
              <a className="button button-lime" href={AUDIT_URL}>View a sample audit</a>
              <a className="button button-outline" href="#contact">Discuss an audit</a>
            </div>
            <div className="hero-detail">
              <p>For agencies and in-house teams.</p>
              <p>Standard audits take about a week once we’ve agreed the scope and have access.</p>
            </div>
          </div>
          <div className="hero-globe"><Globe /></div>
        </div>
        <div className="wrap hero-footer">
          <p><span className="tick-mark" aria-hidden="true">✓</span> Read-only access</p>
          <p><span className="tick-mark" aria-hidden="true">✓</span> Clear, evidence-backed actions</p>
          <p><span className="tick-mark" aria-hidden="true">✓</span> A report you can keep offline</p>
        </div>
      </section>

      <section className="services light-section section-space" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark" /> What we audit</p>
              <h2 id="services-title">What’s included in a Google Ads audit<span className="green-period">?</span></h2>
            </div>
            <p>We follow the details that explain the results: from the settings that control bidding to the search terms your ads actually matched.</p>
          </div>
          <div className="pillar-grid">
            {AUDIT_PILLARS.map(item => (
              <article key={item.id} className="pillar-card">
                <PillarArt type={item.id} />
                <div className="pillar-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="pill-tags">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <p className="section-link"><a className="button button-ink" href={AUDIT_CHECKLIST_URL}>Use the audit checklist</a></p>
        </div>
      </section>

      <section className="light-section audit-timing" id="when-to-get-an-audit" aria-labelledby="audit-timing-title">
        <div className="wrap">
          <div className="section-heading">
            <h2 id="audit-timing-title">When to get a Google Ads audit<span className="green-period">.</span></h2>
          </div>
          <ul className="process-grid audit-cards">
            {AUDIT_SITUATIONS.map(({ title, copy }) => (
              <li className="process-step" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="work section-space" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark" /> Sample work</p>
              <h2 id="work-title">Example audit reports<span className="lime-period">.</span></h2>
            </div>
            <p>Explore sample audits for three fictional mid-sized brands. Each example shows the kind of issue we’d investigate and the next step we’d recommend.</p>
          </div>
          <ExampleWork />
          <div className="download-strip">
            <div>
              <strong>The Alder &amp; Orbit audit</strong>
              <p>Three findings and the 90-day plan they informed.</p>
            </div>
            <div className="download-actions">
              <a className="button button-outline" href={AUDIT_EXAMPLE_URL}>See the sample Google Ads audit</a>
              <a className="button button-lime" href={AUDIT_DOWNLOAD_URL} download="Orbit-Audits-Sample.html">Download HTML</a>
            </div>
          </div>
        </div>
      </section>

      <section className="process light-section section-space" id="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow"><span className="eyebrow-mark" /> How it works</p>
            <h2 id="process-title">From account to action<span className="green-period">.</span></h2>
          </div>
          <ol className="process-grid">
            {PROCESS.map((step, i) => <li className="process-step" key={step.title}><div className="process-icon"><ProcessIcon i={i} /></div><h3>{step.title}</h3><p>{step.copy}</p></li>)}
          </ol>
          <aside className="agency-panel" aria-label="Support for agencies">
            <div className="agency-text">
              <p className="eyebrow"><span className="eyebrow-mark" /> For agencies</p>
              <h3>You present it.<br />We do the digging.</h3>
              <p>Use an independent audit to strengthen a pitch, find quick wins in a new account or give an existing client a fresh perspective. We can deliver it under your branding.</p>
              <a className="button button-outline" href={AGENCY_AUDIT_URL}>Explore white-label audits</a>
            </div>
            <div className="agency-art" aria-hidden="true">
              <div className="orbit-system"><i /><i /><i /><i /><span /></div>
            </div>
          </aside>
          <div className="faq-layout" id="faq">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark" /> FAQs</p>
              <h2>A few things<br />to know<span className="green-period">.</span></h2>
            </div>
            <div className="faq-list">
              {FAQ.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true" /></summary><p>{item.answer}</p></details>)}
            </div>
          </div>
        </div>
      </section>

      <section className="home-about light-section section-space" id="about" aria-labelledby="home-about-title">
        <div className="wrap audit-details">
          <div className="section-heading">
            <h2 id="home-about-title">About Orbit Audits<span className="green-period">.</span></h2>
          </div>
          <div className="home-about-copy">
            <p>We’re Sam and Nic. Sam helps you decide what the audit should answer. Nic reviews the account and turns the findings into an interactive report your team can use.</p>
            <a className="button button-ink" href={ABOUT_URL}>Meet Sam and Nic</a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
