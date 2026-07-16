import type { Metadata, Viewport } from "next";
import RootDocument from "../components/RootDocument";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { siteName, siteUrl } from "../site";

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
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/pt",
      es: "/es",
      "x-default": "/"
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument
      lang="en"
      direction="ltr"
      header={<SiteHeader />}
      footer={<SiteFooter />}
      preloadEnglishHero
    >
      {children}
    </RootDocument>
  );
}
