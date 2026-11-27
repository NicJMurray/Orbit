import type { Metadata } from "next";
import { Contact } from "../../components/orbit/Contact";
import { getAuditInterest } from "../../lib/enquiry";

export const metadata: Metadata = { title: "Contact", description: "Tell Orbit Audits what you want to learn from your Google Ads account.", alternates: { canonical: "/contact" } };
export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ sent?: string | string[]; audit?: string | string[] }> }) {
  const params = await searchParams;
  return <main id="main-content"><Contact standalone initialSent={params.sent === "1"} initialInterest={getAuditInterest(params.audit)} /></main>;
}
