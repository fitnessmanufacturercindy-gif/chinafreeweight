import type { Metadata } from "next";
import type { PtPageContent } from "./PtSeoPage";
import { siteName } from "../site";

export function ptMetadata(content: PtPageContent, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: content.path,
      languages: { en: content.englishPath, pt: content.path, "x-default": content.englishPath }
    },
    openGraph: { type: "website", locale: "pt_BR", alternateLocale: ["en_US", "pt_PT"], url: content.path, siteName, title, description, images: [{ url: content.image, alt: content.imageAlt }] }
  };
}
