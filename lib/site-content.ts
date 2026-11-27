export const ABOUT_URL = "/about";
export const AGENCY_AUDIT_URL = "/white-label-google-ads-audit";
export const AUDIT_CHECKLIST_URL = "/google-ads-audit-checklist";
export const AUDIT_EXAMPLE_URL = "/google-ads-audit-example";
export const AUDIT_URL = "/examples/alder-and-orbit";
export const AUDIT_DOWNLOAD_URL = "/alder-orbit-audit.html";

export const AUDIT_PILLARS = [
  {
    id: "structure",
    title: "Account structure & spend",
    description: "See how campaigns, markets and budgets fit together. Spot brand spend masking weak acquisition, and bidding settings that work against your goals.",
    tags: ["Campaign structure", "Budgets & bidding"],
  },
  {
    id: "query",
    title: "Queries, ads & landing pages",
    description: "Follow the path from a search term to the page it lands on. Find a blocked keyword, an outdated ad or an expensive search that never had a chance of converting.",
    tags: ["Search terms & negatives", "Ad and page checks"],
  },
  {
    id: "signal",
    title: "Measurement & next moves",
    description: "Check what gets counted as a conversion and what your bidding uses. Leave with a short list of fixes and tests you can hand to whoever runs the account.",
    tags: ["Conversion goals", "Prioritised action plan"],
  },
] as const;

export const ALDER_ORBIT_CASE = {
  id: "alder",
  name: "Alder & Orbit",
  sector: "Home & lighting",
  category: "Ecommerce",
  image: "/work/alder-and-orbit.webp",
  imageAlt: "A dark green table lamp on a stone plinth",
  headline: "Separate branded demand from growth.",
  summary: "A retailer’s headline return looked healthy. A look at queries and purchase actions changed where the next pound should go.",
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
    headline: "Make the most of race-day demand.",
    summary: "Event, training and product searches shared one budget. Separating them made it clear which traffic was ready to shop.",
    brief: "A running apparel brand is about to launch a spring collection and wants to understand which campaigns should carry the launch.",
    finding: "Training advice and race-entry queries competed with product searches. A past seasonal headline was also still eligible to appear.",
    action: "Separate commercial product intent, review negatives carefully and swap outdated messaging before the next launch. Measure purchase performance by query intent.",
    openDemo: false,
  },
  {
    id: "morrowline",
    name: "Morrowline Motors",
    sector: "Electric vehicles",
    category: "Automotive",
    image: "/work/morrowline.webp",
    imageAlt: "A graphite electric car on an empty track at dusk",
    headline: "Give qualified enquiries their own signal.",
    summary: "Brochure downloads and test-drive requests were treated as the same result. That changed the picture of which campaigns worked.",
    brief: "An automotive team wants its Search campaigns assessed against meaningful enquiries ahead of a dealer launch.",
    finding: "Campaigns optimised towards the same conversion goal for both brochure downloads and test-drive bookings, despite the actions having different value.",
    action: "Validate booking and lead quality with the CRM, then give bidding a goal based on verified enquiries. Keep brochure downloads visible for reporting.",
    openDemo: false,
  },
] as const;

export const FAQ = [
  {
    question: "Do you need admin access?",
    answer: "Read-only access or an agreed set of exports is enough. We review the account and recommend changes for your team to make.",
  },
  {
    question: "Can an agency present the audit as its own?",
    answer: "Yes. We can deliver the report under your agency’s branding. You can use it in a pitch, onboarding or client review and present it yourselves.",
  },
  {
    question: "What do we get at the end?",
    answer: "An interactive HTML report with an executive summary, evidence you can drill into and a prioritised action plan. Download it, open it in a browser and share it with the people doing the work. It works offline.",
  },
  {
    question: "How long does it take and what does it cost?",
    answer: "We agree a fixed price and delivery date upfront based on account size and scope. For a standard audit, we aim for about a week once we have the inputs.",
  },
] as const;
