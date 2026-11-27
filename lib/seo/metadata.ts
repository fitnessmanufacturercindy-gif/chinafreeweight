import type { Metadata } from "next";
import { getLocaleByInternalLocale } from "../../i18n/locale-registry";
import type { ContentRepository } from "../content/repository";
import type { PublishedContent } from "../content/types";

import { buildLanguageCluster } from "./hreflang";
import { isSitemapContentEligible, sitemapPageUrl } from "./sitemap-eligibility";

function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export const englishIndexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  }
} satisfies Metadata["robots"];

export function buildLocalizedMetadata(
  content: PublishedContent,
  repository: ContentRepository,
  siteUrl: string,
  siteName: string,
  sitemapLanguages?: ReadonlyMap<string, Record<string, string>>
): Metadata {
  const { version } = content;
  const definition = getLocaleByInternalLocale(version.locale);
  if (!definition) throw new Error(`Unsupported locale: ${version.locale}`);

  const canonical = sitemapPageUrl(version.publicPath, siteUrl);
  const languages = sitemapLanguages
    ? sitemapLanguages.get(canonical)
    : isSitemapContentEligible(content, repository)
      ? buildLanguageCluster(content.entity.id, repository, siteUrl)
      : undefined;
  const indexable = Boolean(languages);

  return {
    title: version.title,
    description: version.description,
    robots: indexable && definition.default
      ? englishIndexableRobots
      : { index: indexable, follow: indexable },
    alternates: { canonical, languages },
    openGraph: {
      type: content.entity.type === "blog" ? "article" : "website",
      siteName,
      title: version.title,
      description: version.description,
      url: canonical,
      locale: definition.internalLocale.replace("-", "_"),
      images: version.images[0] ? [{ url: absoluteUrl(siteUrl, version.images[0].src), alt: version.images[0].alt }] : undefined
    },
    twitter: {
      card: version.images.length ? "summary_large_image" : "summary",
      title: version.title,
      description: version.description,
      images: version.images[0]?.src ? [version.images[0].src] : undefined
    },
    other: {
      "content-language": definition.hreflang
    }
  };
}
