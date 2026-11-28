import assert from "node:assert/strict";
import robots from "../app/robots";
import { siteUrl } from "../app/site";
import { GET as imageSitemap } from "../app/sitemaps/images.xml/route";
import { GET as videoSitemap } from "../app/sitemaps/videos.xml/route";
import { isSitemapPagePath, sitemapPageUrl } from "../lib/seo/sitemap-eligibility";
import sitemap from "../app/sitemap";

const shouldRun = process.env.VERCEL_ENV === "production" || process.env.SITEMAP_REGRESSION_CHECK === "1";

if (!shouldRun) {
  console.log("Production sitemap regression guard skipped outside a production build.");
  process.exit(0);
}

const productionOrigin = (process.env.SITEMAP_GUARD_BASE_URL || "https://www.chinafreeweight.com").replace(/\/$/u, "");
const allowlist = new Set(
  (process.env.SITEMAP_REMOVAL_ALLOWLIST || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);

function comparableUrl(value: string) {
  const url = new URL(value, productionOrigin);
  return `${url.pathname.replace(/\/$/u, "") || "/"}${url.search}`;
}

async function checkCandidate() {
  const entries = sitemap();
  const urls = new Set(entries.map(({ url }) => url));
  assert.equal(urls.size, entries.length);
  for (const entry of entries) {
    const url = new URL(entry.url);
    assert.ok(isSitemapPagePath(url.pathname) && !url.search && !url.hash, entry.url);
    assert.equal(entry.url, sitemapPageUrl(url.pathname, siteUrl));
    assert.equal(entry.images, undefined, entry.url);
    const languages = entry.alternates?.languages ?? {};
    assert.ok(Object.entries(languages).some(([lang, href]) => lang !== "x-default" && href === entry.url), entry.url);
    assert.equal(languages["x-default"], languages.en, entry.url);
    for (const href of Object.values(languages)) assert.ok(urls.has(String(href)), String(href));
  }

  const imageXml = await imageSitemap().text();
  const imagePages = new Set<string>();
  for (const [, block] of imageXml.matchAll(/<url>([\s\S]*?)<\/url>/gu)) {
    const page = block.match(/<loc>([^<]+)<\/loc>/u)?.[1];
    assert.ok(page && urls.has(page) && !imagePages.has(page), page);
    imagePages.add(page);
    const images = [...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/gu)].map((match) => match[1]);
    assert.ok(images.length && images.length === new Set(images).size, page);
  }
  assert.ok(imagePages.size > 0);

  const videoXml = await videoSitemap().text();
  const videos = [...videoXml.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => match[1]);
  assert.ok(videos.every((url) => urls.has(url)));
  assert.deepEqual(robots().sitemap, [
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/sitemaps/images.xml`,
    ...(videos.length ? [`${siteUrl}/sitemaps/videos.xml`] : [])
  ]);
  return urls;
}

async function main() {
  const candidate = await checkCandidate();
  let response: Response | undefined;
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(`${productionOrigin}/sitemap.xml`, {
        headers: { "user-agent": "ChinaFreeWeight production sitemap regression guard" },
        signal: AbortSignal.timeout(30_000)
      });
      if (response.ok || attempt === 3) break;
      await response.body?.cancel();
    } catch (error) {
      lastError = error;
      if (attempt === 3) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 500));
  }

  if (!response) throw lastError instanceof Error ? lastError : new Error("Production sitemap request failed.");

  if (!response.ok) {
    throw new Error(`Production sitemap regression guard could not read ${productionOrigin}/sitemap.xml: HTTP ${response.status}`);
  }

  const liveXml = await response.text();
  const liveUrls = [...liveXml.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => comparableUrl(match[1].replace(/&amp;/gu, "&")));
  const candidateUrls = new Set([...candidate].map(comparableUrl));

  if (liveUrls.length === 0 || candidateUrls.size === 0) {
    throw new Error(`Production sitemap regression guard received an empty URL set (live=${liveUrls.length}, candidate=${candidateUrls.size}).`);
  }

  const missing = [...new Set(liveUrls.filter((url) =>
    isSitemapPagePath(url) && url !== "/ar" && !candidateUrls.has(url) && !allowlist.has(url)
  ))];

  if (missing.length > 0) {
    const sample = missing.slice(0, 20).map((url) => `  - ${url}`).join("\n");
    throw new Error(
      `Production sitemap regression blocked: candidate build removes ${missing.length} live URL(s) `
      + `(live=${liveUrls.length}, candidate=${candidateUrls.size}).\n${sample}`
    );
  }

  console.log(`Production sitemap regression guard passed: live=${liveUrls.length}, candidate=${candidateUrls.size}, unexpected removals=0.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
