import fs from "node:fs";
import path from "node:path";
import { createSign } from "node:crypto";

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
      if (response.ok) {
        urls.push(
          ...parseLocs(text)
            .filter((url) => url.startsWith(SITE_URL))
            .map((url) => (url === `${SITE_URL}/` ? SITE_URL : url))
        );
      }
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

function base64url(value) {
  return Buffer.from(typeof value === "string" ? value : JSON.stringify(value)).toString("base64url");
}

async function submitGoogleSitemap() {
  if (!process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return { ok: false, skipped: true, reason: "GSC_SERVICE_ACCOUNT_JSON is not configured." };
  }
  try {
    const credential = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: credential.client_email,
      scope: "https://www.googleapis.com/auth/webmasters",
      aud: credential.token_uri || "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600
    };
    const unsigned = `${base64url({ alg: "RS256", typ: "JWT" })}.${base64url(claim)}`;
    const signer = createSign("RSA-SHA256");
    signer.update(unsigned);
    const assertion = `${unsigned}.${signer.sign(credential.private_key, "base64url")}`;
    const tokenResponse = await fetch(claim.aud, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion
      })
    });
    const tokenBody = await tokenResponse.json().catch(() => ({}));
    if (!tokenResponse.ok || !tokenBody.access_token) {
      return { ok: false, status: tokenResponse.status, reason: tokenBody.error_description || tokenBody.error || "OAuth token request failed." };
    }
    const property = process.env.GSC_SITE_URL || `${SITE_URL}/`;
    const sitemap = `${SITE_URL}/sitemap-index.xml`;
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemap)}`;
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { Authorization: `Bearer ${tokenBody.access_token}` }
    });
    return { ok: response.ok, status: response.status, property, sitemap, body: await response.text().catch(() => "") };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

async function submitBingSitemap() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  if (!apiKey) return { ok: false, skipped: true, reason: "BING_WEBMASTER_API_KEY is not configured; IndexNow remains active." };
  const sitemap = `${SITE_URL}/sitemap-index.xml`;
  try {
    const response = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/SubmitFeed?apikey=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ siteUrl: SITE_URL, feedUrl: sitemap })
    });
    return { ok: response.ok, status: response.status, sitemap, body: await response.text().catch(() => "") };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

async function submitYandexSitemap() {
  const token = process.env.YANDEX_WEBMASTER_TOKEN;
  if (!token) return { ok: false, skipped: true, reason: "YANDEX_WEBMASTER_TOKEN is not configured." };
  const headers = { Authorization: `OAuth ${token}`, Accept: "application/json" };
  try {
    const userResponse = await fetch("https://api.webmaster.yandex.net/v4/user", { headers });
    const user = await userResponse.json().catch(() => ({}));
    if (!userResponse.ok || !user.user_id) return { ok: false, status: userResponse.status, reason: user.error_message || "Unable to resolve Yandex user." };
    const hostsResponse = await fetch(`https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(user.user_id)}/hosts`, { headers });
    const hostsBody = await hostsResponse.json().catch(() => ({}));
    const siteHost = new URL(SITE_URL).host;
    const host = (hostsBody.hosts || []).find((item) =>
      [item.ascii_host_url, item.unicode_host_url].some((value) => {
        try { return value && new URL(value).host === siteHost; } catch { return false; }
      })
    );
    if (!hostsResponse.ok || !host?.host_id) return { ok: false, status: hostsResponse.status, reason: hostsBody.error_message || "Verified Yandex host was not found." };
    const sitemap = `${SITE_URL}/sitemap-index.xml`;
    const response = await fetch(`https://api.webmaster.yandex.net/v4/user/${encodeURIComponent(user.user_id)}/hosts/${encodeURIComponent(host.host_id)}/user-added-sitemaps`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ url: sitemap })
    });
    const body = await response.text().catch(() => "");
    return { ok: response.ok || response.status === 409, status: response.status, sitemap, body };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

async function main() {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const { urls, sitemapStatuses } = await discoverUrls();
  const indexNow = await submitIndexNow(urls);
  const [googleSearchConsole, bingWebmaster, yandexWebmaster] = await Promise.all([
    submitGoogleSitemap(),
    submitBingSitemap(),
    submitYandexSitemap()
  ]);
  const report = {
    checkedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    discoveredUrls: urls.length,
    sitemapStatuses,
    indexNow,
    webmasterSubmissions: { googleSearchConsole, bingWebmaster, yandexWebmaster }
  };
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Search submission report written: ${REPORT_PATH}`);
  console.log(`Discovered URLs: ${urls.length}`);
  console.log(`IndexNow: ${indexNow.ok ? "submitted" : "not submitted"} (${indexNow.status || indexNow.reason || "n/a"})`);
  console.log(`Google Search Console: ${googleSearchConsole.ok ? "submitted" : googleSearchConsole.skipped ? "skipped" : "failed"}`);
  console.log(`Bing Webmaster: ${bingWebmaster.ok ? "submitted" : bingWebmaster.skipped ? "skipped" : "failed"}`);
  console.log(`Yandex Webmaster: ${yandexWebmaster.ok ? "submitted" : yandexWebmaster.skipped ? "skipped" : "failed"}`);
  const configuredFailures = [indexNow, googleSearchConsole, bingWebmaster, yandexWebmaster].filter((item) => !item.ok && !item.skipped);
  if (configuredFailures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
