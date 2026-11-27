import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/orbit/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://orbit.njmurray.com"),
  title: { default: "Orbit Audits | Independent Google Ads & PPC Audits", template: "%s · Orbit Audits" },
  description: "Independent Google Ads and paid search audits for agencies and in-house teams. Find wasted spend, tracking gaps and what to fix first in an interactive report you can keep.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Orbit Audits | Independent Google Ads audits",
    description: "See where your Google Search spend goes and what to fix first, in an interactive report you can keep.",
    siteName: "Orbit Audits",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/work/alder-and-orbit.webp", alt: "Alder & Orbit, an example Google Ads audit" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
