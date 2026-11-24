export const INTERESTS = [
  "Audit for my brand",
  "Audit for an agency client",
  "Pitch or onboarding support",
  "Something else",
] as const;

export type Interest = (typeof INTERESTS)[number];
export type Enquiry = {
  name: string;
  email: string;
  company: string;
  interest: Interest;
  message: string;
};
