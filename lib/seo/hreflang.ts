import { getLocaleByInternalLocale } from "../../i18n/locale-registry";
import type { ContentRepository } from "../content/repository";
import { isSitemapContentEligible, sitemapPageUrl } from "./sitemap-eligibility";

export function buildLanguageCluster(
  entityId: string,
  repository: ContentRepository,
  siteUrl: string,
  englishUrls?: ReadonlySet<string>
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const content of repository.getPublishedVersions(entityId)) {
    const locale = getLocaleByInternalLocale(content.version.locale);
    if (!locale?.public || !isSitemapContentEligible(content, repository)) continue;

    const url = sitemapPageUrl(content.version.publicPath, siteUrl);
    if (locale.default && englishUrls && !englishUrls.has(url)) continue;
    languages[locale.hreflang] = url;
  }

  if (languages.en) languages["x-default"] = languages.en;
  return languages;
}

export function englishLanguageCluster(canonical: string) {
  return { en: canonical, "x-default": canonical };
}
