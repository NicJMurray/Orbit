export const ABOUT_URL = "/about";
export const AGENCY_AUDIT_URL = "/white-label-google-ads-audit";
export const AUDIT_CHECKLIST_URL = "/google-ads-audit-checklist";
export const AUDIT_EXAMPLE_URL = "/google-ads-audit-example";
export const AUDIT_URL = "/examples/alder-and-orbit";
export const AUDIT_DOWNLOAD_URL = "/alder-orbit-audit.html";

export const AUDIT_PILLARS = [
  {
    id: "structure",
    title: "Campaigns & spend",
    description: "Review campaign structure, budgets and bidding. Compare brand and non-brand performance.",
  },
  {
    id: "query",
    title: "Search terms, ads & landing pages",
    description: "Find irrelevant searches, keyword conflicts and mismatches between ads and landing pages.",
  },
  {
    id: "signal",
    title: "Conversion tracking",
    description: "Check which actions count as conversions and whether bidding uses the right signals.",
  },
] as const;

export const ALDER_ORBIT_CASE = {
  id: "alder",
  name: "Alder & Orbit",
  sector: "Home & lighting",
  category: "Ecommerce",
  image: "/work/alder-and-orbit.webp",
  imageAlt: "A dark green table lamp on a stone plinth",
  headline: "Brand searches hid weaker returns",
  summary: "The audit split brand and non-brand returns by market before recommending where to test more spend.",
  brief: "A direct-to-consumer lighting retailer wants to know which markets are ready for more Search investment.",
  finding: "Branded demand lifted the headline return while two purchase actions could steer bidding in the US. A shared negative also blocked an important UK product term.",
  action: "Verify one primary purchase action, fix the negative at the narrowest scope and compare non-brand returns before moving budget.",
  openDemo: true,
} as const;

export const CASES = [
  ALDER_ORBIT_CASE,
  {
    id: "fellmark",
    name: "Fellmark Athletics",
    sector: "Performance apparel",
    category: "Sports",
    image: "/work/fellmark.webp",
    imageAlt: "A runner crossing a rocky ridgeline in mist",
    headline: "Advice searches used the product budget",
    summary: "People looking for training advice and race entries competed for budget with shoppers.",
    brief: "A running apparel brand needs to decide which campaigns should support a product launch.",
    finding: "Training and race-entry searches shared a budget with product searches. An old seasonal ad was still eligible.",
    action: "Separate shopping searches, review negative keywords and update the ad. Compare sales by search intent.",
    openDemo: false,
  },
  {
    id: "morrowline",
    name: "Morrowline Motors",
    sector: "Electric vehicles",
    category: "Automotive",
    image: "/work/morrowline.webp",
    imageAlt: "A graphite electric car on an empty track at dusk",
    headline: "Downloads counted the same as test drives",
    summary: "Bidding treated brochure downloads and test-drive bookings as equivalent conversions.",
    brief: "A car brand wants to know which campaigns generate qualified enquiries.",
    finding: "Google Ads used downloads and test-drive bookings for the same bidding goal.",
    action: "Verify bookings in the CRM. Use qualified enquiries for bidding and keep downloads for reporting.",
    openDemo: false,
  },
] as const;

export const FAQ = [
  {
    question: "Will you make changes in our account?",
    answer: "The audit is a one-off review. Your team decides which recommendations to implement.",
  },
  {
    question: "What affects the price?",
    answer: "We quote based on the number of accounts and markets, and how much analysis the brief requires.",
  },
] as const;
