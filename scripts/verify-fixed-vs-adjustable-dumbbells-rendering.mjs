import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["en", "/resources/fixed-vs-adjustable-dumbbells-commercial-gym"],
  ["pt-BR", "/pt/blog/halteres-fixos-ou-ajustaveis-academia"],
  ["es", "/es/blog/mancuernas-fijas-o-ajustables-gimnasio"],
  ["de", "/de/blog/feste-oder-verstellbare-kurzhanteln-studio"],
  ["fr", "/fr/blog/halteres-fixes-ou-reglables-salle"],
  ["vi", "/vi/blog/ta-tay-co-dinh-hay-dieu-chinh-phong-gym"],
  ["sv", "/sv/blogg/fasta-eller-justerbara-hantlar-gym"],
  ["it", "/it/blog/manubri-fissi-o-regolabili-palestra"],
  ["nl", "/nl/blog/vaste-of-verstelbare-halters-sportschool"],
  ["ar", "/ar/blog/dumbbell-thabit-am-qabil-liltaadil-gym"],
  ["ko", "/ko/blog/fixed-vs-adjustable-dumbbells-gym"],
  ["id", "/id/blog/dumbbell-tetap-atau-adjustable-gym"],
  ["pl", "/pl/blog/hantle-stale-czy-regulowane-silownia"]
];
const expectedHreflang = [...routes.map(([locale]) => locale), "x-default"];
const expectedAlternates = Object.fromEntries([
  ...routes.map(([locale, route]) => [locale, `https://www.chinafreeweight.com${route}`]),
  ["x-default", `https://www.chinafreeweight.com${routes[0][1]}`]
]);
const imageFragment = "/assets/resources/fixed-vs-adjustable-dumbbells/";
const artifactDirectory = path.join(process.cwd(), ".artifacts", "fixed-vs-adjustable-dumbbells");
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
fs.mkdirSync(artifactDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];
const results = [];

async function inspectPage(page, locale, route, viewportLabel, checkLinks = false) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 90_000 });
  if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status()}`);
  await page.evaluate(async () => {
    for (let position = 0; position < document.documentElement.scrollHeight; position += 700) {
      window.scrollTo(0, position);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForFunction(
    (fragment) => [...document.querySelectorAll(`img[src*="${fragment}"]`)].every((image) => image.complete),
    imageFragment,
    { timeout: 15_000 }
  );
  await page.evaluate(async (fragment) => {
    const images = [...document.querySelectorAll(`img[src*="${fragment}"]`)];
    await Promise.all(images.map((image) => image.decode?.().catch(() => undefined)));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, imageFragment);

  const result = await page.evaluate(({ expectedHreflang, expectedAlternates, imageFragment, locale, route }) => {
    const images = [...document.querySelectorAll(`img[src*="${imageFragment}"]`)];
    const avifSources = [...document.querySelectorAll(`source[srcset*="${imageFragment}"][type="image/avif"]`)];
    const heading = document.querySelector("h1");
    const headingRange = document.createRange();
    if (heading) headingRange.selectNodeContents(heading);
    const headingBox = heading?.getBoundingClientRect();
    const headingClipped = Boolean(headingBox && [...headingRange.getClientRects()].some((rect) => rect.left < headingBox.left - 1 || rect.right > headingBox.right + 1));
    const canonicals = [...document.querySelectorAll('link[rel="canonical"]')].map((node) => node.href);
    const alternates = new Map([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((node) => [node.getAttribute("hreflang"), node.href]));
    const schemaNodes = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => {
      try {
        const value = JSON.parse(node.textContent || "{}");
        return Array.isArray(value["@graph"]) ? value["@graph"] : [value];
      } catch {
        return [];
      }
    });
    return {
      lang: document.documentElement.lang,
      direction: document.documentElement.dir,
      h1Count: document.querySelectorAll("h1").length,
      h2Count: document.querySelectorAll("main h2").length,
      h3Count: document.querySelectorAll("main h3").length,
      faqCount: document.querySelectorAll('.localized-faq details, .faq-question, [data-page-family="article"] section[class*="faqSection"] article').length,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      canonicalCount: canonicals.length,
      canonicalPath: canonicals[0] ? new URL(canonicals[0]).pathname : "",
      canonicalUrl: canonicals[0],
      missingAlternates: expectedHreflang.filter((value) => !alternates.has(value)),
      wrongAlternates: Object.entries(expectedAlternates).filter(([language, url]) => alternates.get(language) !== url).map(([language]) => language),
      imageCount: images.length,
      heroPath: images[0] ? new URL(images[0].src).pathname : "",
      avifSourceCount: avifSources.length,
      unloaded: images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src")),
      intrinsicSizeMissing: images.filter((image) => !image.getAttribute("width") || !image.getAttribute("height")).map((image) => image.getAttribute("src")),
      blankAlt: images.filter((image) => !image.getAttribute("alt")?.trim()).map((image) => image.getAttribute("src")),
      headingClipped,
      schemaTypes: schemaNodes.map((item) => item["@type"]),
      structuredFaqCounts: schemaNodes.filter((item) => item["@type"] === "FAQPage").map((item) => item.mainEntity?.length || 0),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      auditText: [document.body.innerText, document.title, document.querySelector('meta[name="description"]')?.content, ...images.map((image) => image.alt), ...schemaNodes.map((node) => JSON.stringify(node))].join("\n"),
      internalLinks: [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((node) => node.getAttribute("href")).filter(Boolean))],
      expectedDirection: locale === "ar" ? "rtl" : "ltr",
      expectedRoute: route
    };
  }, { expectedHreflang, expectedAlternates, imageFragment, locale, route });

  if (!result.title || result.description.length < 55) failures.push(`${route}: title or description missing`);
  if (result.h1Count !== 1) failures.push(`${route}: ${result.h1Count} H1 elements`);
  if (result.headingClipped) failures.push(`${route}: ${viewportLabel} heading clipped`);
  if (result.heroPath !== `${imageFragment}${locale.toLowerCase()}-fixed-adjustable-dumbbells.webp`) failures.push(`${route}: incorrect locale hero ${result.heroPath}`);
  if (result.h2Count < 10 || result.h3Count < 8 || result.faqCount !== 8) failures.push(`${route}: article hierarchy or FAQ missing`);
  if (result.canonicalCount !== 1 || result.canonicalPath !== route || result.canonicalUrl !== `https://www.chinafreeweight.com${route}`) failures.push(`${route}: canonical mismatch`);
  if (!result.structuredFaqCounts.includes(8)) failures.push(`${route}: eight structured FAQ answers required`);
  if (result.missingAlternates.length) failures.push(`${route}: missing hreflang ${result.missingAlternates.join(", ")}`);
  if (result.wrongAlternates.length) failures.push(`${route}: incorrect alternate URLs ${result.wrongAlternates.join(", ")}`);
  if (result.imageCount !== 3 || result.avifSourceCount !== 3 || result.unloaded.length || result.intrinsicSizeMissing.length || result.blankAlt.length) failures.push(`${route}: image delivery failed`);
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
  if (result.direction !== result.expectedDirection) failures.push(`${route}: direction ${result.direction || "unset"}`);
  if (result.overflow) failures.push(`${route}: ${viewportLabel} horizontal overflow`);
  const banned = [...new Set(result.auditText.match(bannedVisibleTerms) ?? [])];
  if (banned.length) failures.push(`${route}: banned visible wording ${banned.join(", ")}`);

  results.push({ locale, route, viewportLabel, ...result, auditText: undefined });
  if (checkLinks) {
    for (const href of result.internalLinks) {
      const linkResponse = await page.request.get(`${baseUrl}${href}`);
      if (linkResponse.status() >= 400) failures.push(`${route}: broken internal link ${href} (${linkResponse.status()})`);
    }
  }
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  page.on("pageerror", (error) => failures.push(`Browser error: ${error.message}`));
  for (const [locale, route] of routes) {
    await inspectPage(page, locale, route, "desktop", true);
    await page.screenshot({ path: path.join(artifactDirectory, `${locale}-desktop.png`), fullPage: true });
  }

  await page.setViewportSize({ width: 834, height: 1112 });
  await inspectPage(page, "en", routes[0][1], "tablet");
  await inspectPage(page, "ar", routes.find(([locale]) => locale === "ar")[1], "tablet");

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [locale, route] of routes) {
    await inspectPage(page, locale, route, "mobile");
    await page.screenshot({ path: path.join(artifactDirectory, `${locale}-mobile.png`), fullPage: true });
  }
} finally {
  await browser.close();
}

const outputName = new URL(baseUrl).hostname === "127.0.0.1" ? "render-local.json" : "render-production.json";
fs.writeFileSync(path.join(artifactDirectory, outputName), JSON.stringify({ baseUrl, checkedAt: new Date().toISOString(), results, failures }, null, 2));

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Fixed-versus-adjustable rendering verified: ${routes.length}/13 pages, desktop/tablet/mobile, images, links, canonical, hreflang, schema and RTL.`);
