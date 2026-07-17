import type { Metadata } from "next";
import { defaultLocale, getLocaleByInternalLocale } from "../../i18n/locale-registry";
import type { ContentRepository } from "../content/repository";
import type { PublishedContent } from "../content/types";

function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function buildAlternates(
  content: PublishedContent,
  repository: ContentRepository,
  siteUrl: string
): { canonical: string; languages: Record<string, string> } {
  const canonical = absoluteUrl(siteUrl, content.version.publicPath);
  const languages: Record<string, string> = {};

  for (const { version } of repository.getPublishedVersions(content.entity.id)) {
    if (!version.hreflangData.include) continue;
    const definition = getLocaleByInternalLocale(version.locale);
    if (!definition?.public) continue;
    languages[definition.hreflang] = absoluteUrl(siteUrl, version.publicPath);
  }

  const english = repository.getPublishedVersion(content.entity.id, defaultLocale.internalLocale);
  if (english) {
    languages["x-default"] = absoluteUrl(siteUrl, english.version.publicPath);
  }

  return { canonical, languages };
}

export function buildLocalizedMetadata(
  content: PublishedContent,
  repository: ContentRepository,
  siteUrl: string,
  siteName: string
): Metadata {
  const { version } = content;
  const definition = getLocaleByInternalLocale(version.locale);
  if (!definition) throw new Error(`Unsupported locale: ${version.locale}`);

  const alternates = buildAlternates(content, repository, siteUrl);
  const canonical = alternates.canonical;
  const noindex = version.canonicalData.noindex === true;

  return {
    title: version.title,
    description: version.description,
    robots: { index: !noindex, follow: !noindex },
    alternates,
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
      "content-language": definition.internalLocale
    }
  };
}
