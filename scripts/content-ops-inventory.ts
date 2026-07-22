import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { contentAutomationConfig } from "../content-ops/config";
import { contentRepository } from "../lib/content/repository";

function locs(xml: string) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(/&amp;/g, "&"));
}

async function fetchXml(url: string) {
  const response = await fetch(url, { headers: { "User-Agent": "ChinaFreeWeightContentInventory/1.0" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function main() {
  const date = process.env.CONTENT_RUN_DATE || new Intl.DateTimeFormat("en-CA", { timeZone: contentAutomationConfig.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const researchDir = path.join(process.cwd(), "content-ops", "runs", date, "research");
  await mkdir(researchDir, { recursive: true });

  const indexUrl = `${contentAutomationConfig.siteUrl}/sitemap-index.xml`;
  const indexXml = await fetchXml(indexUrl);
  const sitemapUrls = locs(indexXml);
  const sitemaps = await Promise.all(sitemapUrls.map(async (url) => {
    try {
      const xml = await fetchXml(url);
      return { url, ok: true, urls: locs(xml) };
    } catch (error) {
      return { url, ok: false, error: error instanceof Error ? error.message : String(error), urls: [] as string[] };
    }
  }));
  const productionUrls = [...new Set(sitemaps.flatMap((sitemap) => sitemap.urls))].sort();
  const repository = contentRepository.listPublished().map(({ entity, version }) => ({
    entityId: entity.id,
    type: entity.type,
    locale: version.locale,
    title: version.title,
    h1: version.h1,
    slug: version.slug,
    publicPath: version.publicPath,
    internalLinkTargets: version.internalLinks.map((link) => link.targetContentId),
  }));
  await writeFile(path.join(researchDir, "production-sitemap.json"), `${JSON.stringify({ capturedAt: new Date().toISOString(), indexUrl, sitemaps, urlCount: productionUrls.length, urls: productionUrls }, null, 2)}\n`);
  await writeFile(path.join(researchDir, "repository-inventory.json"), `${JSON.stringify({ capturedAt: new Date().toISOString(), versionCount: repository.length, entries: repository }, null, 2)}\n`);
  console.log(JSON.stringify({ productionUrlCount: productionUrls.length, repositoryVersionCount: repository.length, failedSitemaps: sitemaps.filter((item) => !item.ok).map((item) => item.url) }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
