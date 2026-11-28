import sitemap from "./sitemap";

let languagesByUrl: ReadonlyMap<string, Record<string, string>> | undefined;

export function getSitemapLanguages(): ReadonlyMap<string, Record<string, string>> {
  return languagesByUrl ??= new Map(sitemap().map(({ url, alternates }) => [
    url,
    alternates.languages
  ]));
}
