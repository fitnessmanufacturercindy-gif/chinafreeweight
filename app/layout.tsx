import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import AnalyticsEvents from "./components/AnalyticsEvents";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import WhatsAppButton from "./components/WhatsAppButton";
import { organizationJsonLd, siteName, siteUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: "PowerBaseFit | Free Weight Equipment Manufacturer",
  description:
    "OEM dumbbells, weight plates, barbells, benches, racks and gym accessories for global fitness equipment importers and commercial gyms.",
  keywords: [
    "free weight equipment manufacturer",
    "dumbbell manufacturer",
    "weight plates supplier",
    "OEM gym equipment China",
    "home gym functional trainer"
  ],
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: "PowerBaseFit | Free Weight Equipment Manufacturer",
    description:
      "OEM dumbbells, weight plates, barbells, benches, racks and gym accessories for global fitness equipment importers and commercial gyms."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/hero-poster.avif"
          type="image/avif"
          media="(min-width: 701px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/hero-poster-mobile.avif"
          type="image/avif"
          media="(max-width: 700px)"
          fetchPriority="high"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <AnalyticsEvents />
      </body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}
