import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outputPath = resolve(process.argv[2] || "content-ops/protected-baseline.json");
const sites = [
  { siteId: "chinafreeweight", origin: "https://www.chinafreeweight.com", inspectMetadata: true },
  { siteId: "powerbasefit", origin: "https://www.powerbasefitequipment.com", inspectMetadata: false },
  { siteId: "homegymfactory", origin: "https://www.homegymfactory.com", inspectMetadata: false },
];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function xmlLocations(xml) {
  return unique([...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/giu)].map((match) => match[1].trim()));
}

async function fetchText(url, method = "GET") {
  const response = await fetch(url, {
    method,
    redirect: "follow",
    headers: { "user-agent": "ChinaFreeWeight content health audit/1.0" },
  });
  return {
    ok: response.ok,
    status: response.status,
    finalUrl: response.url,
    text: method === "HEAD" ? "" : await response.text(),
  };
}

async function discoverSitemap(site) {
  const candidates = [
    `${site.origin}/sitemap.xml`,
    `${site.origin}/sitemap-index.xml`,
    `${site.origin}/sitemap_index.xml`,
  ];
  const queue = [];
  const sitemapStatuses = [];
  for (const candidate of candidates) {
    const response = await fetchText(candidate).catch((error) => ({ ok: false, status: 0, text: "", error: error.message }));
    sitemapStatuses.push({ url: candidate, status: response.status, ok: response.ok, error: response.error });
    if (response.ok && response.text.includes("<loc>")) {
      queue.push({ url: candidate, xml: response.text });
      break;
    }
  }
  const seenSitemaps = new Set();
  const urls = new Set();
  while (queue.length) {
    const entry = queue.shift();
    if (seenSitemaps.has(entry.url)) continue;
    seenSitemaps.add(entry.url);
    for (const location of xmlLocations(entry.xml)) {
      const normalized = new URL(location, site.origin).toString();
      if (normalized.endsWith(".xml")) {
        if (seenSitemaps.has(normalized)) continue;
        const response = await fetchText(normalized).catch((error) => ({ ok: false, status: 0, text: "", error: error.message }));
        sitemapStatuses.push({ url: normalized, status: response.status, ok: response.ok, error: response.error });
        if (response.ok) queue.push({ url: normalized, xml: response.text });
      } else if (new URL(normalized).origin === new URL(site.origin).origin) {
        urls.add(normalized);
      }
    }
  }
  return { sitemapStatuses, urls: [...urls].sort() };
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function matchOne(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1]?.replace(/<[^>]+>/gu, " ").replace(/\s+/gu, " ").trim() || "");
}

function metadataFromHtml(html) {
  const canonical = matchOne(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/iu)
    || matchOne(html, /<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/iu);
  const robots = matchOne(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/iu);
  const hreflang = unique(
    [...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/giu)]
      .map((match) => `${match[1]}=${decodeHtml(match[2])}`),
  ).sort();
  const schemaTypes = unique(
    [...html.matchAll(/"@type"\s*:\s*(?:"([^"]+)"|\[([^\]]+)\])/gu)].flatMap((match) => {
      if (match[1]) return [match[1]];
      return [...match[2].matchAll(/"([^"]+)"/gu)].map((item) => item[1]);
    }),
  ).sort();
  return {
    indexable: !/noindex/iu.test(robots),
    robots,
    canonical,
    hreflang,
    title: matchOne(html, /<title[^>]*>([\s\S]*?)<\/title>/iu),
    h1: matchOne(html, /<h1[^>]*>([\s\S]*?)<\/h1>/iu),
    schemaTypes,
  };
}

async function mapConcurrent(values, concurrency, mapper) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length || 1) }, worker));
  return results;
}

async function inspectUrl(url) {
  try {
    const response = await fetchText(url);
    const metadata = response.ok ? metadataFromHtml(response.text) : {};
    return { url, status: response.status, finalUrl: response.finalUrl, ...metadata };
  } catch (error) {
    return { url, status: 0, error: error.message };
  }
}

const report = {
  schemaVersion: 1,
  capturedAt: new Date().toISOString(),
  policy: "Every URL present before this automation run is treated as protected; competitor sites are inventoried only.",
  sites: [],
};

for (const site of sites) {
  const discovery = await discoverSitemap(site);
  const entry = {
    siteId: site.siteId,
    origin: site.origin,
    sitemapStatuses: discovery.sitemapStatuses,
    urlCount: discovery.urls.length,
    urls: discovery.urls,
  };
  if (site.inspectMetadata) {
    entry.protectedUrls = await mapConcurrent(discovery.urls, 8, inspectUrl);
  }
  report.sites.push(entry);
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  sites: report.sites.map((site) => ({
    siteId: site.siteId,
    urlCount: site.urlCount,
    inspected: site.protectedUrls?.length || 0,
    failed: site.protectedUrls?.filter((item) => !item.status || item.status >= 400).length || 0,
  })),
}, null, 2));
