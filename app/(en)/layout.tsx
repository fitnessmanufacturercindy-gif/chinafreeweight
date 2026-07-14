import type { Metadata } from "next";
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
      "OEM dumbbells, weight plates, barbells, benches, racks and gym accessories for global fitness equipment importers and commercial gyms."
  },
  robots: { index: true, follow: true }
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
