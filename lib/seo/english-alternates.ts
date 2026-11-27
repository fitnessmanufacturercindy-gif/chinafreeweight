import { siteUrl } from "../../app/site";
import { getSitemapLanguages } from "../../app/sitemap-languages";
import { englishLanguageCluster } from "./hreflang";
import { englishIndexableRobots } from "./metadata";
import { sitemapPageUrl } from "./sitemap-eligibility";

export function getEnglishPageMetadata(path: string) {
  const canonical = sitemapPageUrl(path, siteUrl);
  return {
    robots: englishIndexableRobots,
    alternates: {
      canonical,
      languages: getSitemapLanguages().get(canonical) ?? englishLanguageCluster(canonical)
    }
  };
}
