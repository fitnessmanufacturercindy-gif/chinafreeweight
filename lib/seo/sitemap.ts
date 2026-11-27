import type { MetadataRoute } from "next";
import { getLocaleByInternalLocale } from "../../i18n/locale-registry";
import type { ContentRepository } from "../content/repository";
import { buildLanguageCluster, englishLanguageCluster } from "./hreflang";
import { isSitemapContentEligible, isSitemapPagePath, sitemapPageUrl } from "./sitemap-eligibility";

type SitemapEntry = MetadataRoute.Sitemap[number] & {
  alternates: { languages: Record<string, string> };
};

export function buildPublishedSitemap(
  repository: ContentRepository,
  siteUrl: string,
  options?: { englishEntries?: MetadataRoute.Sitemap }
): SitemapEntry[] {
  const origin = new URL(siteUrl).origin;
  const englishEntries = options?.englishEntries;
  const entries = new Map<string, SitemapEntry>();
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
      alternates: { languages: englishLanguageCluster(canonical) }
    });
  }

  const englishUrls = englishEntries && new Set(entries.keys());
  for (const content of repository.listPublished()) {
    if (!isSitemapContentEligible(content, repository)) continue;
    const { entity, version } = content;
    const url = sitemapPageUrl(version.publicPath, origin);
    const locale = getLocaleByInternalLocale(version.locale);
    if (!locale?.public || (locale.default && englishUrls && !englishUrls.has(url))) continue;

    const languages = clusters.get(entity.id) ?? buildLanguageCluster(entity.id, repository, origin, englishUrls);
    clusters.set(entity.id, languages);
    entries.set(url, {
      url,
      lastModified: new Date(version.updatedAt),
      changeFrequency: entity.type === "blog" ? "monthly" : "weekly",
      ...entries.get(url),
      alternates: { languages }
    });
  }

  return [...entries.values()];
}
