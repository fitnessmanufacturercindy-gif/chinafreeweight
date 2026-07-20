import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const executablePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const bypassSecret = process.env.VERCEL_BYPASS_SECRET;
const shareSecret = process.env.VERCEL_SHARE_SECRET;

function testUrl(path) {
  const url = new URL(path, `${baseUrl}/`);
  if (shareSecret) url.searchParams.set("_vercel_share", shareSecret);
  return url.toString();
}

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, extraHTTPHeaders: bypassSecret ? { "x-vercel-protection-bypass": bypassSecret } : undefined });
const page = await context.newPage();

async function goto(url, options) {
  let lastError;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await page.goto(url, options);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 750 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function requestImage(url) {
  let lastError;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await context.request.get(url);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 750 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function schemaNodes() {
  const documents = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((value) => JSON.parse(value));
  return documents.flatMap((document) => document?.["@graph"] ?? [document]).flat();
}

async function switchDesktop(locale) {
  const switcher = page.locator(".route-language-switcher--desktop");
  assert.ok(await switcher.locator("summary").isVisible());
  if (!(await switcher.getAttribute("open"))) await switcher.locator("summary").click();
  await switcher.locator(`a[lang="${locale}"]`).click();
}

const languageSitemap = await goto(testUrl("/sitemaps/languages.xml"), { waitUntil: "domcontentloaded" });
assert.equal(languageSitemap?.status(), 200);
const languageXml = await languageSitemap.text();
const sitemapUrls = [...languageXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const vietnamesePaths = sitemapUrls.map((url) => new URL(url).pathname).filter((path) => path === "/vi" || path.startsWith("/vi/"));
assert.equal(sitemapUrls.length, 605);
assert.equal(vietnamesePaths.length, 124);
assert.equal(new Set(vietnamesePaths).size, 124);

for (const path of vietnamesePaths) {
  const response = await goto(testUrl(path), { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, path);
  assert.equal(new URL(response.url()).pathname, path, `${path}: redirect`);
  assert.equal(await page.locator("html").getAttribute("lang"), "vi", `${path}: lang`);
  assert.equal(await page.locator("html").getAttribute("dir"), "ltr", `${path}: dir`);
  assert.ok((await page.title()).trim().length > 20, `${path}: title`);
  assert.ok(((await page.locator('meta[name="description"]').getAttribute("content")) || "").length > 80, `${path}: description`);
  assert.ok((await page.locator("h1").innerText()).trim().length > 10, `${path}: H1`);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://www.chinafreeweight.com${path}`, `${path}: canonical`);
  assert.equal(await page.locator('link[hreflang="vi"]').getAttribute("href"), `https://www.chinafreeweight.com${path}`, `${path}: vi hreflang`);
  assert.equal(await page.locator('meta[name="robots"][content*="noindex"]').count(), 0, `${path}: noindex`);
  assert.ok((await page.locator("main").innerText()).length > 700, `${path}: server HTML`);

  const schemas = await schemaNodes();
  assert.ok(schemas.some((node) => node?.["@type"] === "FAQPage" && node.inLanguage === "vi"), `${path}: FAQ schema`);
  assert.ok(schemas.some((node) => node?.["@type"] === "BreadcrumbList" && node.inLanguage === "vi"), `${path}: breadcrumb schema`);
  for (const node of schemas) {
    const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
    if (types.some((type) => ["WebSite", "Organization", "LocalBusiness", "Product", "FAQPage", "BreadcrumbList", "BlogPosting"].includes(type))) {
      assert.equal(node.inLanguage, "vi", `${path}: ${types.join("/")} language`);
    }
  }

  const images = await page.locator("main img").all();
  assert.ok(images.length >= 3, `${path}: image count`);
  for (const image of images) {
    assert.ok((await image.getAttribute("alt"))?.trim(), `${path}: image alt`);
    const source = await image.getAttribute("src");
    if (source?.startsWith("/hinh-anh-vi/")) {
      const imageResponse = await requestImage(testUrl(source));
      assert.equal(imageResponse.status(), 200, `${path}: ${source}`);
      assert.match(imageResponse.headers()["content-type"] || "", /^image\//, `${path}: image type`);
    }
  }
}

const mainSitemap = await goto(testUrl("/sitemap.xml"), { waitUntil: "domcontentloaded" });
assert.equal(mainSitemap?.status(), 200);
const mainXml = await mainSitemap.text();
assert.equal((mainXml.match(/<loc>/g) ?? []).length, 605);
assert.equal((mainXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/vi(?:<|\/)/g) ?? []).length, 124);

const productSitemap = await goto(testUrl("/sitemaps/products.xml"), { waitUntil: "domcontentloaded" });
assert.equal(productSitemap?.status(), 200);
const productXml = await productSitemap.text();
assert.equal((productXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/vi\/san-pham\/(?:ta-tay|banh-ta|khung-ghe-tap|phu-kien-gym)\//g) ?? []).length, 97);

const blogSitemap = await goto(testUrl("/sitemaps/blogs.xml"), { waitUntil: "domcontentloaded" });
assert.equal(blogSitemap?.status(), 200);
const blogXml = await blogSitemap.text();
assert.equal((blogXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/vi\/blog\//g) ?? []).length, 15);

const robots = await goto(testUrl("/robots.txt"), { waitUntil: "domcontentloaded" });
assert.equal(robots?.status(), 200);
assert.match(await robots.text(), /Allow: \/[\r\n]/);

await goto(testUrl("/products/dumbbells/hex-dumbbell-kg"), { waitUntil: "networkidle" });
await switchDesktop("vi");
await page.waitForURL("**/vi/san-pham/ta-tay/ta-tay-luc-giac-boc-cao-su");
await switchDesktop("fr");
await page.waitForURL("**/fr/produits/halteres/haltere-hexagonal-caoutchouc");
await switchDesktop("de");
await page.waitForURL("**/de/produkte/kurzhanteln/gummi-hex-kurzhantel");
await switchDesktop("pt-BR");
await page.waitForURL("**/pt/produtos/halteres/halter-sextavado-borracha");
await switchDesktop("es");
await page.waitForURL("**/es/productos/mancuernas/mancuerna-hexagonal-goma");
await switchDesktop("en");
await page.waitForURL("**/products/dumbbells/hex-dumbbell-kg");

await page.setViewportSize({ width: 390, height: 844 });
await goto(testUrl("/vi/lien-he"), { waitUntil: "networkidle" });
await page.locator(".mobile-nav-menu summary").click();
assert.ok(await page.locator(".route-language-switcher--mobile").isVisible());
assert.equal(await page.locator("form.quote-form").getAttribute("action"), "https://formsubmit.co/kloe@powerbasefit.com");
assert.equal(await page.locator('form.quote-form input[name="_subject"]').getAttribute("value"), "Yêu cầu B2B mới bằng tiếng Việt — ChinaFreeWeight");
assert.match(await page.locator(".whatsapp-button").getAttribute("href"), /^https:\/\/wa\.me\/8618963018533/);

for (const path of ["/vi/san-pham/khong-xuat-ban", "/vi/blog/khong-xuat-ban", "/it"]) {
  const response = await goto(testUrl(path), { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 404, path);
}

await browser.close();
console.log("Vietnamese browser smoke passed: 124 pages, SEO DOM, schema, images, sitemaps, switcher, form and 404.");
