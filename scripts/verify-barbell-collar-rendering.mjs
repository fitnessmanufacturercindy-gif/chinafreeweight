import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/u, "");
const routes = [
  ["en", "/resources/olympic-barbell-collar-buying-inspection-guide"],
  ["pt-BR", "/pt/blog/presilha-barra-olimpica-compra-inspecao"],
  ["es", "/es/blog/cierres-barra-olimpica-compra-inspeccion"],
  ["de", "/de/blog/hantelverschluss-olympische-stange-pruefen-kaufen"],
  ["fr", "/fr/blog/collier-barre-olympique-achat-controle"],
  ["vi", "/vi/blog/khoa-don-ta-olympic-chon-kiem-tra"],
  ["sv", "/sv/blogg/skivstangslas-olympiska-kopa-kontrollera"],
  ["it", "/it/blog/collari-bilanciere-olimpico-acquisto-controllo"],
  ["nl", "/nl/blog/olympische-haltersluitingen-inkoop-controle"],
  ["ar", "/ar/blog/olympic-barbell-collar-buying-inspection"],
  ["ko", "/ko/blog/olympic-barbell-collar-buying-inspection"],
  ["id", "/id/blog/collar-barbel-olimpiade-pembelian-inspeksi"],
  ["pl", "/pl/blog/zaciski-sztangi-olimpijskiej-zakup-kontrola"],
];
const hreflangByLocale = { en: "en", "pt-BR": "pt-BR", es: "es", de: "de", fr: "fr", vi: "vi", sv: "sv", it: "it", nl: "nl", ar: "ar", ko: "ko", id: "id", pl: "pl" };
const expectedHreflang = [...Object.values(hreflangByLocale), "x-default"];
const expectedAlternates = Object.fromEntries([...routes.map(([locale, route]) => [hreflangByLocale[locale], `https://www.chinafreeweight.com${route}`]), ["x-default", `https://www.chinafreeweight.com${routes[0][1]}`]]);
const imageFragment = "/assets/resources/barbell-collars/";
const artifactDirectory = path.join(process.cwd(), ".artifacts", "barbell-collars-2026-09-19");
const banned = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const failures = [];
const results = [];
const assetLocale = (locale) => locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
fs.mkdirSync(artifactDirectory, { recursive: true });

async function inspectPage(page, locale, route, viewport, checkLinks = false) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 90_000 });
  if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status()}`);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 12));
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
      } catch { return []; }
    });
    return {
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
  if (!result.title || result.description.length < 50) failures.push(`${route}: metadata missing`);
  if (result.h1Count !== 1 || result.h2Count < 5 || result.h3Count < 4 || result.faqCount !== 5) failures.push(`${route}: hierarchy or FAQ missing`);
  if (result.headingClipped) failures.push(`${route}: ${viewport} heading clipped`);
  if (result.heroPath !== `${imageFragment}${assetLocale(locale)}-olympic-barbell-collars.webp`) failures.push(`${route}: wrong hero ${result.heroPath}`);
  if (result.canonicalCount !== 1 || result.canonicalPath !== route || result.canonicalUrl !== `https://www.chinafreeweight.com${route}`) failures.push(`${route}: canonical mismatch`);
  if (!result.structuredFaqCounts.some((count) => count === 5)) failures.push(`${route}: structured FAQ count`);
  if (result.missingAlternates.length || result.wrongAlternates.length) failures.push(`${route}: hreflang mismatch`);
  if (result.imageCount !== 3 || result.avifSourceCount !== 3 || result.unloaded || result.intrinsicSizeMissing || result.blankAlt) failures.push(`${route}: image delivery`);
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
  if (result.direction !== result.expectedDirection) failures.push(`${route}: direction ${result.direction || "unset"}`);
  if (result.overflow) failures.push(`${route}: ${viewport} horizontal overflow`);
  const matches = [...new Set(result.auditText.match(banned) ?? [])];
  if (matches.length) failures.push(`${route}: banned visible wording ${matches.join(", ")}`);
  results.push({ locale, route, viewport, ...result, auditText: undefined });
  if (checkLinks) for (const href of result.internalLinks) {
    const linkResponse = await page.request.get(`${baseUrl}${href}`, { timeout: 30_000 }).catch(() => null);
    if (!linkResponse || linkResponse.status() >= 400) failures.push(`${route}: broken internal link ${href} (${linkResponse?.status() ?? "request failed"})`);
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
} finally { await browser.close(); }

const output = baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1") ? "render-local.json" : "render-production.json";
fs.writeFileSync(path.join(artifactDirectory, output), `${JSON.stringify({ baseUrl, checkedAt: new Date().toISOString(), results, failures }, null, 2)}\n`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Barbell collar rendering verified: ${routes.length}/13 pages, desktop/tablet/mobile, images, links, canonical, hreflang, schema and RTL.`);
