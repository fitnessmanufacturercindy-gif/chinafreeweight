import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["en", "/resources/weight-plate-tolerance-bulk-order-guide"],
  ["pt-BR", "/pt/blog/tolerancia-peso-anilhas-compra-atacado"],
  ["es", "/es/blog/tolerancia-peso-discos-compra-mayorista"],
  ["de", "/de/blog/gewichtsscheiben-toleranz-grosshandel-pruefen"],
  ["fr", "/fr/blog/tolerance-poids-disques-achat-gros"],
  ["vi", "/vi/blog/sai-so-khoi-luong-banh-ta-mua-si"],
  ["sv", "/sv/blogg/vikttolerans-viktskivor-grossist"],
  ["it", "/it/blog/tolleranza-peso-dischi-acquisto-ingrosso"],
  ["nl", "/nl/blog/gewichtstolerantie-halterschijven-inkoop"],
  ["ar", "/ar/blog/hamish-inhiraf-wazn-aqras-athqal"],
  ["ko", "/ko/blog/weight-plate-weight-tolerance-bulk-order"],
  ["id", "/id/blog/toleransi-berat-piring-beban-grosir"],
  ["pl", "/pl/blog/tolerancja-masy-talerzy-zamowienie-hurtowe"]
];
const expectedHreflang = [...routes.map(([locale]) => locale), "x-default"];
const artifactDirectory = path.join(process.cwd(), ".artifacts", "weight-plate-tolerance-guide");
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
fs.mkdirSync(artifactDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];

async function inspectPage(page, locale, route, mobile) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 90_000 });
  if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status()}`);
  await page.evaluate(async () => {
    for (let position = 0; position < document.documentElement.scrollHeight; position += 700) {
      window.scrollTo(0, position);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForFunction(() => [...document.querySelectorAll('img[src*="/assets/resources/weight-plate-tolerance/"]')].every((image) => image.complete), undefined, { timeout: 10_000 });

  const result = await page.evaluate(({ expectedHreflang, locale, route }) => {
    const images = [...document.querySelectorAll('img[src*="/assets/resources/weight-plate-tolerance/"]')];
    const sources = [...document.querySelectorAll('source[srcset*="/assets/resources/weight-plate-tolerance/"][type="image/avif"]')];
    const canonicals = [...document.querySelectorAll('link[rel="canonical"]')].map((node) => node.href);
    const alternates = new Map([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((node) => [node.getAttribute("hreflang"), node.href]));
    const schemaTypes = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => {
      try {
        const value = JSON.parse(node.textContent || "{}");
        const graph = Array.isArray(value["@graph"]) ? value["@graph"] : [value];
        return graph.map((item) => item["@type"]);
      } catch {
        return [];
      }
    });
    return {
      lang: document.documentElement.lang,
      direction: document.documentElement.dir,
      h1Count: document.querySelectorAll("h1").length,
      h2Count: document.querySelectorAll("main h2").length,
      faqCount: document.querySelectorAll('.localized-faq details, .faq-question, [data-page-family="article"] section[class*="faqSection"] article').length,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      canonicalCount: canonicals.length,
      canonicalPath: canonicals[0] ? new URL(canonicals[0]).pathname : "",
      missingAlternates: expectedHreflang.filter((value) => !alternates.has(value)),
      imageCount: images.length,
      avifSourceCount: sources.length,
      unloaded: images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src")),
      intrinsicSizeMissing: images.filter((image) => !image.getAttribute("width") || !image.getAttribute("height")).map((image) => image.getAttribute("src")),
      blankAlt: images.filter((image) => !image.getAttribute("alt")?.trim()).map((image) => image.getAttribute("src")),
      schemaTypes,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      visibleText: document.body.innerText,
      internalLinks: [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((node) => node.getAttribute("href")).filter(Boolean))],
      expectedDirection: locale === "ar" ? "rtl" : "ltr",
      expectedRoute: route
    };
  }, { expectedHreflang, locale, route });

  if (!result.title || result.description.length < 60) failures.push(`${route}: title or description missing`);
  if (result.h1Count !== 1) failures.push(`${route}: ${result.h1Count} H1 elements`);
  if (result.h2Count < 14 || result.faqCount !== 8) failures.push(`${route}: article sections or FAQ missing`);
  if (result.canonicalCount !== 1 || result.canonicalPath !== route) failures.push(`${route}: canonical mismatch`);
  if (result.missingAlternates.length) failures.push(`${route}: missing hreflang ${result.missingAlternates.join(", ")}`);
  if (result.imageCount !== 5 || result.avifSourceCount !== 5 || result.unloaded.length || result.intrinsicSizeMissing.length || result.blankAlt.length) failures.push(`${route}: image delivery failed`);
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
  if (result.direction !== result.expectedDirection) failures.push(`${route}: direction ${result.direction || "unset"}`);
  if (result.overflow) failures.push(`${route}: ${mobile ? "mobile" : "desktop"} horizontal overflow`);
  const banned = [...new Set(result.visibleText.match(bannedVisibleTerms) ?? [])];
  if (banned.length) failures.push(`${route}: banned visible wording ${banned.join(", ")}`);

  if (mobile && locale === "en") {
    const imageLocators = page.locator('img[src*="/assets/resources/weight-plate-tolerance/"]');
    for (let index = 0; index < await imageLocators.count(); index += 1) await imageLocators.nth(index).screenshot({ path: path.join(artifactDirectory, `english-mobile-image-${index + 1}.png`) });
  }

  if (!mobile) {
    for (const href of result.internalLinks) {
      const linkResponse = await page.request.get(`${baseUrl}${href}`);
      if (linkResponse.status() >= 400) failures.push(`${route}: broken internal link ${href} (${linkResponse.status()})`);
    }
  }
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  for (const [locale, route] of routes) await inspectPage(page, locale, route, false);
  await inspectPage(page, routes[0][0], routes[0][1], false);
  await page.screenshot({ path: path.join(artifactDirectory, "english-desktop.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [locale, route] of routes) {
    await inspectPage(page, locale, route, true);
    if (locale === "en" || locale === "ar") await page.screenshot({ path: path.join(artifactDirectory, `${locale}-mobile.png`), fullPage: true });
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Weight plate tolerance rendering verified: ${routes.length}/13 pages, desktop/mobile, AVIF/WebP images, links, canonical, hreflang, schema and RTL.`);
