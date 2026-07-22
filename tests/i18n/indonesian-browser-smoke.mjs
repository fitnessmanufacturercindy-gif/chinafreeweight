import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const executablePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const bypassSecret = process.env.VERCEL_BYPASS_SECRET;
const shareSecret = process.env.VERCEL_SHARE_SECRET;
const siteUrl = "https://www.chinafreeweight.com";
const testUrl = (path) => {
  const url = new URL(path, `${baseUrl}/`);
  if (shareSecret) url.searchParams.set("_vercel_share", shareSecret);
  return url.toString();
};

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  extraHTTPHeaders: bypassSecret ? { "x-vercel-protection-bypass": bypassSecret } : undefined
});
const page = await context.newPage();

function schemaNodes(documents) {
  return documents.flatMap((document) => {
    if (Array.isArray(document)) return document.flatMap((item) => item?.["@graph"] ?? [item]);
    return document?.["@graph"] ?? [document];
  });
}

try {
  const sitemapResponse = await page.goto(testUrl("/sitemap.xml"), { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.ok(sitemapResponse);
  assert.equal(sitemapResponse.status(), 200);
  const sitemapXml = await sitemapResponse.text();
  const paths = [...sitemapXml.matchAll(/<loc>https:\/\/www\.chinafreeweight\.com(\/id(?:\/[^<]*)?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(paths.length, 122);
  assert.equal(new Set(paths).size, 122);

  for (const path of paths) {
    const response = await page.goto(testUrl(path), { waitUntil: "domcontentloaded", timeout: 30000 });
    assert.ok(response, path);
    assert.equal(response.status(), 200, path);
    assert.equal(new URL(page.url()).pathname, path, `${path}: no redirect`);
    const html = await response.text();
    assert.match(html, /<html lang="id" dir="ltr">/, `${path}: SSR html lang`);
    assert.match(html, /<title>[^<]+<\/title>/, `${path}: title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: description`);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, `${path}: indexable`);
    assert.ok((await page.locator("h1").first().textContent())?.trim(), `${path}: H1`);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${siteUrl}${path}`, `${path}: self canonical`);
    assert.equal(await page.locator('link[hreflang="id"]').getAttribute("href"), `${siteUrl}${path}`, `${path}: self hreflang`);
    assert.equal(await page.locator('link[hreflang="x-default"]').count(), 1, `${path}: x-default`);
    const documents = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((value) => JSON.parse(value));
    const nodes = schemaNodes(documents);
    assert.ok(nodes.some((node) => node?.["@type"] === "BreadcrumbList" && node.inLanguage === "id"), `${path}: breadcrumb schema`);
    assert.ok(nodes.some((node) => node?.["@type"] === "FAQPage" && node.inLanguage === "id"), `${path}: FAQ schema`);
    if (/^\/id\/produk\/[^/]+\/[^/]+$/.test(path)) assert.ok(nodes.some((node) => node?.["@type"] === "Product" && node.inLanguage === "id"), `${path}: Product schema`);
    if (/^\/id\/blog\/[^/]+$/.test(path)) assert.ok(nodes.some((node) => node?.["@type"] === "BlogPosting" && node.inLanguage === "id"), `${path}: BlogPosting schema`);
    const images = page.locator('main img[src^="/gambar-id/"]');
    assert.ok(await images.count() >= 2, `${path}: localized real images`);
    for (let index = 0; index < await images.count(); index += 1) assert.ok(((await images.nth(index).getAttribute("alt")) ?? "").length >= 20, `${path}: image alt`);
    assert.equal(await page.locator('.route-language-switcher--desktop a[lang="id"]').count(), 1, `${path}: Indonesian switch option`);
  }

  await page.goto(testUrl("/id/produk"), { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="en"]').getAttribute("href"), "/products");
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="pt-BR"]').getAttribute("href"), "/pt/produtos");
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="es"]').getAttribute("href"), "/es/productos");
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="id"]').getAttribute("href"), "/id/produk");

  await page.goto(testUrl("/id/kontak"), { waitUntil: "networkidle" });
  assert.equal(await page.locator("form.quote-form").getAttribute("action"), "https://formsubmit.co/kloe@powerbasefit.com");
  assert.equal(await page.locator("form.quote-form").getAttribute("method"), "POST");
  assert.equal(await page.locator('form.quote-form input[name="_subject"]').getAttribute("value"), "Permintaan B2B baru dalam Bahasa Indonesia — ChinaFreeWeight");
  assert.match(await page.locator(".whatsapp-button").getAttribute("href"), /^https:\/\/wa\.me\/8618963018533/);

  const languageResponse = await page.goto(testUrl("/sitemaps/languages.xml"), { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.ok(languageResponse);
  assert.equal(languageResponse.status(), 200);
  const languageXml = await languageResponse.text();
  assert.equal((languageXml.match(/<loc>/g) ?? []).length, 1237);
  assert.equal((languageXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/id(?:<|\/)/g) ?? []).length, 122);
  const robotsResponse = await page.goto(testUrl("/robots.txt"), { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.ok(robotsResponse);
  assert.equal(robotsResponse.status(), 200);
  assert.doesNotMatch(await robotsResponse.text(), /Disallow:\s*\/id/i);
  const missing = await page.goto(testUrl("/id/produk/tidak-diterbitkan"), { waitUntil: "domcontentloaded" });
  assert.equal(missing?.status(), 404);
  console.log(`Indonesian browser smoke passed: ${paths.length} SSR pages, schemas, metadata, switcher, sitemaps, robots and 404.`);
} finally {
  await browser.close();
}
