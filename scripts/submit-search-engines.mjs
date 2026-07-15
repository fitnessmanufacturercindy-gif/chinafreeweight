import fs from "node:fs";
import path from "node:path";

const SITE_URL = (process.env.SEO_SUBMIT_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.chinafreeweight.com").replace(/\/$/, "");
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "d787e9478e6f40c6f5b2e42327a8f7ab";
const REPORT_DIR = path.join(process.cwd(), "reports", "search-submissions");
const DATE_ID = new Date().toISOString().replace(/[:.]/g, "-");
const REPORT_PATH = path.join(REPORT_DIR, `${DATE_ID}-search-submission.json`);

const sitemapSources = [
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/sitemaps/products.xml`,
  `${SITE_URL}/sitemaps/blogs.xml`,
  `${SITE_URL}/sitemaps/languages.xml`
];

function parseLocs(xml) {
  return [...new Set([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => match[1].trim()))];
}

async function discoverUrls() {
  const urls = [];
  const sitemapStatuses = [];
  for (const sitemapUrl of sitemapSources) {
    try {
      const response = await fetch(sitemapUrl);
      const text = await response.text();
      sitemapStatuses.push({ sitemapUrl, status: response.status, ok: response.ok });
      if (response.ok) urls.push(...parseLocs(text).filter((url) => url.startsWith(SITE_URL)));
    } catch (error) {
      sitemapStatuses.push({ sitemapUrl, status: 0, ok: false, error: error.message });
    }
  }
  return { urls: [...new Set(urls)], sitemapStatuses };
}

async function submitIndexNow(urlList) {
  if (!urlList.length) return { ok: false, skipped: true, reason: "No URLs discovered from sitemap." };
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList
    })
  });
  return { ok: response.ok, status: response.status, statusText: response.statusText, submittedUrls: urlList.length, body: await response.text().catch(() => "") };
}

function webmasterStatus() {
  return {
    googleSearchConsole: process.env.GSC_SERVICE_ACCOUNT_JSON ? "Credential detected." : "Skipped: GSC_SERVICE_ACCOUNT_JSON is not configured.",
    bingWebmaster: process.env.BING_WEBMASTER_API_KEY ? "Credential detected. IndexNow already notifies Bing-compatible engines." : "Skipped: BING_WEBMASTER_API_KEY is not configured. IndexNow remains active.",
    yandexWebmaster: process.env.YANDEX_WEBMASTER_TOKEN ? "Credential detected." : "Skipped: YANDEX_WEBMASTER_TOKEN is not configured."
  };
}

async function main() {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const { urls, sitemapStatuses } = await discoverUrls();
  const indexNow = await submitIndexNow(urls);
  const report = { checkedAt: new Date().toISOString(), siteUrl: SITE_URL, discoveredUrls: urls.length, sitemapStatuses, indexNow, webmasterStatus: webmasterStatus() };
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Search submission report written: ${REPORT_PATH}`);
  console.log(`Discovered URLs: ${urls.length}`);
  console.log(`IndexNow: ${indexNow.ok ? "submitted" : "not submitted"} (${indexNow.status || indexNow.reason || "n/a"})`);
  if (!indexNow.ok && !indexNow.skipped) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
