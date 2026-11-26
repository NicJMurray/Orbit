import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiry privacy", description: "How Orbit Audits handles information submitted through the enquiry form.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <main id="main-content" className="light-section">
      <section className="wrap privacy-content" aria-labelledby="privacy-title">
        <p className="eyebrow"><span className="eyebrow-mark" /> Orbit Audits</p>
        <h1 id="privacy-title">Enquiry privacy<span className="green-period">.</span></h1>
        <p>When you send an enquiry, we collect the name, email address, company and project details you provide. We use them to respond, clarify the scope and keep a record of the conversation.</p>
        <p>The form stores enquiries with the website’s hosting service and sends the details to our enquiry inbox. Please only include information needed to describe the project. You can arrange account access or share any exports separately if you choose to work with us.</p>
        <p>To ask about your enquiry details or request a correction or deletion, use the enquiry form and select “Something else”.</p>
        <a className="button button-ink" href="/contact">Contact us</a>
      </section>
    </main>
  );
}
