import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["en", "/resources/olympic-barbell-sleeve-retention-end-cap-guide"],
  ["pt-BR", "/pt/blog/manga-barra-olimpica-anel-trava-tampa-solta"],
  ["es", "/es/blog/manguito-barra-olimpica-anillo-retencion-tapa-suelta"],
  ["de", "/de/blog/langhantel-huelse-sicherungsring-endkappe-pruefen"],
  ["fr", "/fr/blog/manchon-barre-olympique-circlip-bouchon-controle"],
  ["vi", "/vi/blog/ong-tay-don-olympic-vong-ham-nap-dau-kiem-tra"],
  ["sv", "/sv/blogg/skivstangshylsa-lasring-andlock-kontroll"],
  ["it", "/it/blog/manicotto-bilanciere-anello-arresto-tappo-controllo"],
  ["nl", "/nl/blog/halterstang-sleeve-borgring-eindkap-controleren"],
  ["ar", "/ar/blog/barbell-sleeve-retaining-ring-end-cap-guide"],
  ["ko", "/ko/blog/barbell-sleeve-snap-ring-end-cap-guide"],
  ["id", "/id/blog/sleeve-barbel-snap-ring-tutup-ujung"],
  ["pl", "/pl/blog/tuleja-gryfu-pierscien-osadczy-zaslepka-kontrola"],
];
const hreflangByLocale = { en: "en", "pt-BR": "pt-BR", es: "es", de: "de", fr: "fr", vi: "vi", sv: "sv", it: "it", nl: "nl", ar: "ar", ko: "ko", id: "id", pl: "pl" };
const expectedHreflang = [...Object.values(hreflangByLocale), "x-default"];
const expectedAlternates = Object.fromEntries([...routes.map(([locale, route]) => [hreflangByLocale[locale], `https://www.chinafreeweight.com${route}`]), ["x-default", `https://www.chinafreeweight.com${routes[0][1]}`]]);
const imageFragment = "/assets/resources/barbell-sleeve-retention/";
const artifactDirectory = path.join(process.cwd(), ".artifacts", "barbell-sleeve-retention-2026-09-18");
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const failures = [];
const results = [];
const assetLocale = (locale) => locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
fs.mkdirSync(artifactDirectory, { recursive: true });

async function inspectPage(page, locale, route, viewportLabel, checkLinks = false) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 90_000 });
  if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status()}`);
  await page.evaluate(async () => {
    for (let position = 0; position < document.documentElement.scrollHeight; position += 700) {
      window.scrollTo(0, position);
      await new Promise((resolve) => setTimeout(resolve, 15));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForFunction((fragment) => [...document.querySelectorAll(`img[src*="${fragment}"]`)].every((image) => image.complete), imageFragment, { timeout: 15_000 });
  const result = await page.evaluate(({ expectedHreflang, expectedAlternates, imageFragment, locale, route }) => {
    const images = [...document.querySelectorAll(`img[src*="${imageFragment}"]`)];
    const avifSources = [...document.querySelectorAll(`source[srcset*="${imageFragment}"][type="image/avif"]`)];
    const heading = document.querySelector("h1");
    const range = document.createRange();
    if (heading) range.selectNodeContents(heading);
    const box = heading?.getBoundingClientRect();
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
      unloaded: images.filter((image) => !image.complete || image.naturalWidth === 0).length,
      intrinsicSizeMissing: images.filter((image) => !image.getAttribute("width") || !image.getAttribute("height")).length,
      blankAlt: images.filter((image) => !image.getAttribute("alt")?.trim()).length,
      headingClipped: Boolean(box && [...range.getClientRects()].some((rect) => rect.left < box.left - 1 || rect.right > box.right + 1)),
      schemaTypes: schemaNodes.map((item) => item["@type"]),
      structuredFaqCounts: schemaNodes.filter((item) => item["@type"] === "FAQPage").map((item) => item.mainEntity?.length || 0),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      auditText: [document.body.innerText, document.title, document.querySelector('meta[name="description"]')?.content, ...images.map((image) => image.alt), ...schemaNodes.map((node) => JSON.stringify(node))].join("\n"),
      internalLinks: [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((node) => node.getAttribute("href")).filter(Boolean))],
      expectedDirection: locale === "ar" ? "rtl" : "ltr",
      expectedRoute: route,
    };
  }, { expectedHreflang, expectedAlternates, imageFragment, locale, route });
  if (!result.title || result.description.length < 50) failures.push(`${route}: title or description missing`);
  if (result.h1Count !== 1 || result.h2Count < 5 || result.h3Count < 5 || result.faqCount !== 7) failures.push(`${route}: article hierarchy or FAQ missing`);
  if (result.headingClipped) failures.push(`${route}: ${viewportLabel} heading clipped`);
  if (result.heroPath !== `${imageFragment}${assetLocale(locale)}-barbell-sleeve-retention.webp`) failures.push(`${route}: incorrect locale hero ${result.heroPath}`);
  if (result.canonicalCount !== 1 || result.canonicalPath !== route || result.canonicalUrl !== `https://www.chinafreeweight.com${route}`) failures.push(`${route}: canonical mismatch`);
  if (!result.structuredFaqCounts.some((count) => count === 7)) failures.push(`${route}: seven structured FAQ answers required`);
  if (result.missingAlternates.length || result.wrongAlternates.length) failures.push(`${route}: hreflang mismatch`);
  if (result.imageCount !== 3 || result.avifSourceCount !== 3 || result.unloaded || result.intrinsicSizeMissing || result.blankAlt) failures.push(`${route}: image delivery failed`);
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
  if (result.direction !== result.expectedDirection) failures.push(`${route}: direction ${result.direction || "unset"}`);
  if (result.overflow) failures.push(`${route}: ${viewportLabel} horizontal overflow`);
  const banned = [...new Set(result.auditText.match(bannedVisibleTerms) ?? [])];
  if (banned.length) failures.push(`${route}: banned visible wording ${banned.join(", ")}`);
  results.push({ locale, route, viewportLabel, ...result, auditText: undefined });
  if (checkLinks) {
    for (const href of result.internalLinks) {
      let linkResponse;
      let lastError;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          linkResponse = await page.request.get(`${baseUrl}${href}`, { timeout: 30_000 });
          if (linkResponse.status() < 500) break;
        } catch (error) {
          lastError = error;
        }
        await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
      }
      if (!linkResponse || linkResponse.status() >= 400) failures.push(`${route}: broken internal link ${href} (${linkResponse?.status() ?? lastError?.code ?? "request failed"})`);
    }
  }
}

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  page.on("pageerror", (error) => failures.push(`Browser error: ${error.message}`));
  for (const [locale, route] of routes) {
    await inspectPage(page, locale, route, "desktop", true);
    await page.screenshot({ path: path.join(artifactDirectory, `${assetLocale(locale)}-desktop.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 834, height: 1112 });
  await inspectPage(page, "en", routes[0][1], "tablet");
  await inspectPage(page, "ar", routes.find(([locale]) => locale === "ar")[1], "tablet");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [locale, route] of routes) {
    await inspectPage(page, locale, route, "mobile");
    await page.screenshot({ path: path.join(artifactDirectory, `${assetLocale(locale)}-mobile.png`), fullPage: true });
  }
} finally {
  await browser.close();
}

const outputName = baseUrl.includes("127.0.0.1") || baseUrl.includes("localhost") ? "render-local.json" : "render-production.json";
fs.writeFileSync(path.join(artifactDirectory, outputName), JSON.stringify({ baseUrl, checkedAt: new Date().toISOString(), results, failures }, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Barbell sleeve retention rendering verified: ${routes.length}/13 pages, desktop/tablet/mobile, images, links, canonical, hreflang, schema and RTL.`);
