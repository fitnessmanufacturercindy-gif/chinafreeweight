import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnalyticsEvents from "./components/AnalyticsEvents";
import GoogleAnalyticsLoader from "./components/GoogleAnalyticsLoader";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import WhatsAppButton from "./components/WhatsAppButton";
import { localBusinessJsonLd, organizationJsonLd, siteName, siteUrl, websiteJsonLd } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  category: "B2B fitness equipment manufacturing",
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
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/pt/",
      "x-default": "/"
    }
  },
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
        width: 1600,
        height: 900,
        alt: "PowerBaseFit commercial free weight equipment manufacturing"
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
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark light"
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
        <AnalyticsEvents />
        <GoogleAnalyticsLoader measurementId={gaMeasurementId} />
      </body>
    </html>
  );
}
