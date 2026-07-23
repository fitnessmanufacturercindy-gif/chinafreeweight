import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const executablePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const siteUrl = "https://www.chinafreeweight.com";
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const testUrl = (path) => new URL(path, `${baseUrl}/`).toString();
const schemaNodes = (documents) => documents.flatMap((document) => document?.["@graph"] ?? [document]);

try {
  const sitemapResponse = await page.goto(testUrl("/sitemap.xml"), { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.equal(sitemapResponse?.status(), 200);
  const sitemapXml = await sitemapResponse.text();
  const paths = [...sitemapXml.matchAll(/<loc>https:\/\/www\.chinafreeweight\.com(\/nl(?:\/[^<]*)?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(paths.length, 122);
  assert.equal(new Set(paths).size, 122);

  for (const path of paths) {
    const response = await page.goto(testUrl(path), { waitUntil: "domcontentloaded", timeout: 30000 });
    assert.equal(response?.status(), 200, path);
    assert.equal(new URL(page.url()).pathname, path, `${path}: no redirect`);
    const html = await response.text();
    assert.match(html, /<html lang="nl" dir="ltr">/, `${path}: lang`);
    assert.match(html, /<title>[^<]+<\/title>/, `${path}: title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: description`);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, `${path}: indexable`);
    assert.ok((await page.locator("h1").first().textContent())?.trim(), `${path}: H1`);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${siteUrl}${path}`, `${path}: canonical`);
    assert.equal(await page.locator('link[hreflang="nl"]').getAttribute("href"), `${siteUrl}${path}`, `${path}: hreflang`);
    assert.equal(await page.locator('link[hreflang="x-default"]').count(), 1, `${path}: x-default`);
    const documents = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse);
    const nodes = schemaNodes(documents);
    assert.ok(nodes.some((node) => node?.["@type"] === "BreadcrumbList" && node.inLanguage === "nl"), `${path}: BreadcrumbList`);
    assert.ok(nodes.some((node) => node?.["@type"] === "FAQPage" && node.inLanguage === "nl"), `${path}: FAQPage`);
    if (/^\/nl\/producten\/[^/]+\/[^/]+$/.test(path)) {
      assert.ok(nodes.some((node) => node?.["@type"] === "Product" && node.inLanguage === "nl"), `${path}: Product`);
      assert.equal(await page.locator('main[data-page-family="product-detail"]').count(), 1, `${path}: product family`);
      assert.ok(await page.locator('main[data-page-family="product-detail"] img[src^="/assets/products/"]').count() >= 1, `${path}: corresponding product asset`);
    }
    if (/^\/nl\/blog\/[^/]+$/.test(path)) assert.ok(nodes.some((node) => node?.["@type"] === "BlogPosting" && node.inLanguage === "nl"), `${path}: BlogPosting`);
    assert.equal(await page.locator("main[data-page-family]").count(), 1, `${path}: mirrored page family`);
    assert.equal(await page.locator("main.localized-page").count(), 0, `${path}: no generic legacy page`);
    assert.ok(await page.locator("main[data-page-family] img").count() >= 1, `${path}: imagery`);
    assert.equal(await page.locator('.route-language-switcher--desktop a[lang="nl"]').count(), 1, `${path}: Dutch switch option`);
  }

  await page.goto(testUrl("/nl/producten"), { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="en"]').getAttribute("href"), "/products");
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="id"]').getAttribute("href"), "/id/produk");
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="pl"]').getAttribute("href"), "/pl/produkty");
  assert.equal(await page.locator('.route-language-switcher--desktop a[lang="nl"]').getAttribute("href"), "/nl/producten");

  await page.goto(testUrl("/nl/contact"), { waitUntil: "networkidle" });
  assert.equal(await page.locator('main[data-page-family="contact"] img[src="/assets/project-dumbbell-zone.avif"]').count(), 1);
  assert.equal(await page.locator("form.quote-form").getAttribute("action"), "https://formsubmit.co/kloe@powerbasefit.com");
  assert.equal(await page.locator("form.quote-form").getAttribute("method"), "POST");
  assert.equal(await page.locator('form.quote-form input[name="_subject"]').getAttribute("value"), "Nieuwe Nederlandstalige B2B-aanvraag — ChinaFreeWeight");
  assert.equal(await page.locator('form.quote-form input[name="_next"]').getAttribute("value"), "https://www.chinafreeweight.com/nl/contact?inquiry=sent#aanvraag");
  assert.match(await page.locator(".whatsapp-button").getAttribute("href"), /^https:\/\/wa\.me\/8618963018533/);

  await page.goto(testUrl("/nl"), { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator('main[data-page-family="home"] img[src="/assets/hero-poster.avif"]').count(), 1);

  const languages = await page.goto(testUrl("/sitemaps/languages.xml"), { waitUntil: "domcontentloaded" });
  const languageXml = await languages.text();
  assert.equal((languageXml.match(/<loc>/g) ?? []).length, 1481);
  assert.equal((languageXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/nl(?:<|\/)/g) ?? []).length, 122);
  const robots = await page.goto(testUrl("/robots.txt"), { waitUntil: "domcontentloaded" });
  assert.doesNotMatch(await robots.text(), /^Disallow:\s*\/nl(?:\/|$)/im);
  const missing = await page.goto(testUrl("/nl/producten/niet-bestaand-product"), { waitUntil: "domcontentloaded" });
  assert.equal(missing?.status(), 404);
  console.log(`Dutch browser smoke passed: ${paths.length} SSR pages, assets, schemas, forms, sitemaps, robots and 404.`);
} finally {
  await browser.close();
}
