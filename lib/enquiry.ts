export const INTERESTS = [
  "Audit for my brand",
  "Audit for an agency client",
  "Pitch or onboarding support",
  "Something else",
] as const;

export type Interest = (typeof INTERESTS)[number];

export const AUDIT_QUOTE_URLS = {
  agency: "/contact?audit=agency#contact",
  brand: "/contact?audit=brand#contact",
} as const;

export function getAuditInterest(audit: string | string[] | undefined): Interest | undefined {
  if (audit === "agency") return "Audit for an agency client";
  if (audit === "brand") return "Audit for my brand";
  return undefined;
}

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  interest: Interest;
  message: string;
};
