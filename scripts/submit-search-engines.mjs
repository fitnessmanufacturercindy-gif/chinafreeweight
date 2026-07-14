import fs from "node:fs";
import path from "node:path";

const SITE_URL = (process.env.SEO_SUBMIT_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.chinafreeweight.com").replace(/\/$/, "");
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "e0ad369810e295747f3e88ba667e37f8";
const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const REPORT_DIR = path.join(process.cwd(), "reports", "search-submissions");
const DATE_ID = new Date().toISOString().replace(/[:.]/g, "-");
const REPORT_PATH = path.join(REPORT_DIR, `${DATE_ID}-search-submission.json`);

const sitemapSources = [
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/sitemaps/products.xml`,
  `${SITE_URL}/sitemaps/blogs.xml`,
  `${SITE_URL}/sitemaps/languages.xml`
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function parseLocs(xml) {
  return unique([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => match[1].trim()));
}

async function fetchSitemapUrls() {
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

  return { urls: unique(urls), sitemapStatuses };
}

async function submitIndexNow(urlList) {
  if (!urlList.length) {
    return { ok: false, skipped: true, reason: "No URLs discovered from sitemap." };
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList
    })
  });

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    submittedUrls: urlList.length,
    body: await response.text().catch(() => "")
  };
}

function webmasterStatus() {
  return {
    googleSearchConsole: process.env.GSC_SERVICE_ACCOUNT_JSON
      ? "Credential detected. Use the Search Console API integration layer for sitemap inspection and URL state checks."
      : "Skipped: GSC_SERVICE_ACCOUNT_JSON is not configured. Sitemap discovery remains active.",
    bingWebmaster: process.env.BING_WEBMASTER_API_KEY
      ? "Credential detected. IndexNow handles URL notifications; Bing Webmaster API can be added for diagnostics."
      : "Skipped: BING_WEBMASTER_API_KEY is not configured. IndexNow still notifies Bing/Yahoo-compatible engines.",
    yandexWebmaster: process.env.YANDEX_WEBMASTER_TOKEN
      ? "Credential detected. Yandex Webmaster diagnostics can be added without changing public pages."
      : "Skipped: YANDEX_WEBMASTER_TOKEN is not configured. robots.txt and sitemap remain Yandex-compatible."
  };
}

async function main() {
  ensureDir(REPORT_DIR);
  const { urls, sitemapStatuses } = await fetchSitemapUrls();
  const indexNow = await submitIndexNow(urls);
  const report = {
    checkedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    sitemapStatuses,
    discoveredUrls: urls.length,
    indexNow,
    webmasterStatus: webmasterStatus()
  };

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Search submission report written: ${REPORT_PATH}`);
  console.log(`Discovered URLs: ${urls.length}`);
  console.log(`IndexNow: ${indexNow.ok ? "submitted" : "not submitted"} (${indexNow.status || indexNow.reason || "n/a"})`);

  if (!indexNow.ok && !indexNow.skipped) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
