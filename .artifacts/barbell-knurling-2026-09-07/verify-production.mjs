import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const base = "https://www.chinafreeweight.com";
const copyFiles = [
  "content/i18n/barbell-knurling-guide-copy.json",
  "content/i18n/barbell-knurling-guide-copy-eu.json",
  "content/i18n/barbell-knurling-guide-copy-apac.json"
];
const endpoints = [
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap-index.xml",
  "/sitemaps/products.xml",
  "/sitemaps/blogs.xml",
  "/sitemaps/images.xml",
  "/sitemaps/videos.xml",
  "/sitemaps/languages.xml",
  "/llms.txt"
];

const copies = (await Promise.all(copyFiles.map(async (file) => JSON.parse(await fs.readFile(path.join(root, file), "utf8"))))).flat();
const assetDir = path.join(root, "public", "assets", "resources", "barbell-knurling");
const assetNames = (await fs.readdir(assetDir)).sort();

async function request(relativePath, method = "GET") {
  const response = await fetch(`${base}${relativePath}`, { method, redirect: "follow" });
  return { relativePath, status: response.status, ok: response.ok, url: response.url, text: method === "GET" ? await response.text() : "" };
}

const [pages, assets, endpointResults] = await Promise.all([
  Promise.all(copies.map((copy) => request(copy.path))),
  Promise.all(assetNames.map((name) => request(`/assets/resources/barbell-knurling/${name}`, "HEAD"))),
  Promise.all(endpoints.map((endpoint) => request(endpoint)))
]);

const endpointMap = new Map(endpointResults.map((result) => [result.relativePath, result]));
const blogSitemap = endpointMap.get("/sitemaps/blogs.xml")?.text || "";
const imageSitemap = endpointMap.get("/sitemaps/images.xml")?.text || "";
const languageSitemap = endpointMap.get("/sitemaps/languages.xml")?.text || "";
const failures = [];

for (const [index, page] of pages.entries()) {
  const copy = copies[index];
  const absoluteUrl = `${base}${copy.path}`;
  if (!page.ok) failures.push(`Page ${copy.locale} returned ${page.status}: ${absoluteUrl}`);
  if (!page.text.includes(`<link rel="canonical" href="${absoluteUrl}"`)) failures.push(`Canonical missing for ${copy.locale}`);
  if (!blogSitemap.includes(`<loc>${absoluteUrl}</loc>`)) failures.push(`Blog sitemap missing ${copy.locale}`);
  if (!languageSitemap.includes(`<loc>${absoluteUrl}</loc>`)) failures.push(`Language sitemap missing ${copy.locale}`);
}

for (const asset of assets) {
  if (!asset.ok) failures.push(`Asset returned ${asset.status}: ${asset.relativePath}`);
  if (asset.relativePath.endsWith(".webp") && !imageSitemap.includes(`${base}${asset.relativePath}`)) {
    failures.push(`Image sitemap missing canonical WebP ${asset.relativePath}`);
  }
}
for (const endpoint of endpointResults) {
  if (!endpoint.ok) failures.push(`Endpoint returned ${endpoint.status}: ${endpoint.relativePath}`);
}

const report = {
  checkedAt: new Date().toISOString(),
  base,
  pages: pages.map((page, index) => ({ locale: copies[index].locale, path: page.relativePath, status: page.status })),
  assets: assets.map(({ relativePath, status }) => ({ path: relativePath, status })),
  endpoints: endpointResults.map(({ relativePath, status }) => ({ path: relativePath, status })),
  sitemapCoverage: {
    blogRoutes: copies.length,
    languageRoutes: copies.length,
    canonicalImages: assetNames.filter((name) => name.endsWith(".webp")).length,
    deliveredAssets: assetNames.length
  },
  failures
};
await fs.writeFile(path.join(root, ".artifacts", "barbell-knurling-2026-09-07", "production-http-report.json"), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Production HTTP verification passed: ${pages.length} pages, ${assets.length} assets, ${endpointResults.length} endpoints, complete sitemap coverage.`);
