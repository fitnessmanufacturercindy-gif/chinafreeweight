import type { MetadataRoute } from "next";
import { getLocaleByInternalLocale } from "../../i18n/locale-registry";
import type { ContentRepository } from "../content/repository";
import { isSitemapContentEligible, isSitemapPagePath, sitemapPageUrl } from "./sitemap-eligibility";

export function buildPublishedSitemap(
  repository: ContentRepository,
  siteUrl: string,
  options?: { englishEntries?: MetadataRoute.Sitemap }
): MetadataRoute.Sitemap {
  const origin = new URL(siteUrl).origin;
  const englishEntries = options?.englishEntries;
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const clusters = new Map<string, Record<string, string>>();

  for (const entry of englishEntries ?? []) {
    const url = new URL(entry.url);
    if (url.origin !== origin || url.search || url.hash || !isSitemapPagePath(url.pathname)) continue;
    const content = repository.resolvePublishedPath("en", url.pathname);
    if (content && !isSitemapContentEligible(content, repository)) continue;

    const canonical = sitemapPageUrl(url.pathname, origin);
    entries.set(canonical, {
      ...entry,
      url: canonical,
      alternates: { languages: { en: canonical, "x-default": canonical } }
    });
  }

  for (const content of repository.listPublished()) {
    if (!isSitemapContentEligible(content, repository)) continue;
    const { entity, version } = content;
    const url = sitemapPageUrl(version.publicPath, origin);
    const locale = getLocaleByInternalLocale(version.locale);
    if (!locale?.public || (locale.default && englishEntries && !entries.has(url))) continue;

    const languages = clusters.get(entity.id) ?? {};
    languages[locale.hreflang] = url;
    clusters.set(entity.id, languages);
    entries.set(url, {
      url,
      lastModified: new Date(version.updatedAt),
      changeFrequency: entity.type === "blog" ? "monthly" : "weekly",
      ...entries.get(url),
      alternates: { languages }
    });
  }

  for (const languages of clusters.values()) {
    if (languages.en) languages["x-default"] = languages.en;
  }
  return [...entries.values()];
}
