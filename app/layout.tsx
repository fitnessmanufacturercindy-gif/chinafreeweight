import type { Metadata, Viewport } from "next";
import "./globals.css";
import DelayedAnalyticsEvents from "./components/DelayedAnalyticsEvents";
import GoogleAnalyticsLoader from "./components/GoogleAnalyticsLoader";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import WhatsAppButton from "./components/WhatsAppButton";
import { localBusinessJsonLd, organizationJsonLd, siteName, siteUrl, websiteJsonLd } from "./site";

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
      "OEM dumbbells, weight plates, barbells, benches, racks and gym accessories for global fitness equipment importers and commercial gyms.",
    images: [
      {
        url: "/assets/hero-poster.avif",
        width: 1375,
        height: 701,
        alt: "PowerBaseFit free weight equipment manufacturing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerBaseFit | Free Weight Equipment Manufacturer",
    description:
      "OEM dumbbells, weight plates, barbells, benches, racks and gym accessories for global fitness equipment importers and commercial gyms.",
    images: ["/assets/hero-poster.avif"]
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <DelayedAnalyticsEvents />
        <GoogleAnalyticsLoader measurementId={gaMeasurementId} />
      </body>
    </html>
  );
}
