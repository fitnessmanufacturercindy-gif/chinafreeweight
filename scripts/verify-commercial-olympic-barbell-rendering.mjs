import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["en", "/resources/commercial-olympic-barbell-buying-guide"],
  ["pt-BR", "/pt/blog/como-escolher-barra-olimpica-academia"],
  ["es", "/es/blog/como-elegir-barra-olimpica-gimnasio"],
  ["de", "/de/blog/olympia-langhantel-fitnessstudio-kaufen"],
  ["fr", "/fr/blog/choisir-barre-olympique-salle-de-sport"],
  ["vi", "/vi/blog/chon-don-ta-olympic-phong-gym"],
  ["sv", "/sv/blogg/valja-olympisk-skivstang-gym"],
  ["it", "/it/blog/scegliere-bilanciere-olimpico-palestra"],
  ["nl", "/nl/blog/olympische-halterstang-fitness-inkoop"],
  ["ar", "/ar/blog/ikhtiyar-qadib-athqal-olimbi-sala-riyadia"],
  ["ko", "/ko/blog/commercial-olympic-barbell-buying-guide"],
  ["id", "/id/blog/panduan-memilih-barbel-olimpiade-gym"],
  ["pl", "/pl/blog/jak-wybrac-gryf-olimpijski-silownia"]
];
const expectedHreflang = [...routes.map(([locale]) => locale), "x-default"];
const imageFragment = "/assets/resources/olympic-barbell-buying/";
const artifactDirectory = path.join(process.cwd(), ".artifacts", "commercial-olympic-barbell-guide");
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
fs.mkdirSync(artifactDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];

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
  await page.waitForFunction((fragment) => [...document.querySelectorAll(`img[src*="${fragment}"]`)].every((image) => image.complete), imageFragment, { timeout: 15_000 });
  await page.evaluate(async (fragment) => {
    const images = [...document.querySelectorAll(`img[src*="${fragment}"]`)];
    await Promise.all(images.map((image) => image.decode?.().catch(() => undefined)));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, imageFragment);

  const result = await page.evaluate(({ expectedHreflang, imageFragment, locale, route }) => {
    const images = [...document.querySelectorAll(`img[src*="${imageFragment}"]`)];
    const avifSources = [...document.querySelectorAll(`source[srcset*="${imageFragment}"][type="image/avif"]`)];
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
      h3Count: document.querySelectorAll("main h3").length,
      faqCount: document.querySelectorAll('.localized-faq details, .faq-question, [data-page-family="article"] section[class*="faqSection"] article').length,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      canonicalCount: canonicals.length,
      canonicalPath: canonicals[0] ? new URL(canonicals[0]).pathname : "",
      missingAlternates: expectedHreflang.filter((value) => !alternates.has(value)),
      imageCount: images.length,
      avifSourceCount: avifSources.length,
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
  }, { expectedHreflang, imageFragment, locale, route });

  if (!result.title || result.description.length < 55) failures.push(`${route}: title or description missing`);
  if (result.h1Count !== 1) failures.push(`${route}: ${result.h1Count} H1 elements`);
  if (result.h2Count < 14 || result.h3Count < 3 || result.faqCount !== 8) failures.push(`${route}: article hierarchy or FAQ missing`);
  if (result.canonicalCount !== 1 || result.canonicalPath !== route) failures.push(`${route}: canonical mismatch`);
  if (result.missingAlternates.length) failures.push(`${route}: missing hreflang ${result.missingAlternates.join(", ")}`);
  if (result.imageCount !== 5 || result.avifSourceCount !== 5 || result.unloaded.length || result.intrinsicSizeMissing.length || result.blankAlt.length) failures.push(`${route}: image delivery failed`);
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
  if (result.direction !== result.expectedDirection) failures.push(`${route}: direction ${result.direction || "unset"}`);
  if (result.overflow) failures.push(`${route}: ${viewportLabel} horizontal overflow`);
  const banned = [...new Set(result.visibleText.match(bannedVisibleTerms) ?? [])];
  if (banned.length) failures.push(`${route}: banned visible wording ${banned.join(", ")}`);

  if (checkLinks) {
    for (const href of result.internalLinks) {
      const linkResponse = await page.request.get(`${baseUrl}${href}`);
      if (linkResponse.status() >= 400) failures.push(`${route}: broken internal link ${href} (${linkResponse.status()})`);
    }
  }
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  for (const [locale, route] of routes) await inspectPage(page, locale, route, "desktop", true);
  await inspectPage(page, "en", routes[0][1], "desktop-screenshot");
  await page.screenshot({ path: path.join(artifactDirectory, "english-desktop.png"), fullPage: true });

  await page.setViewportSize({ width: 834, height: 1112 });
  await inspectPage(page, "en", routes[0][1], "tablet");
  await page.screenshot({ path: path.join(artifactDirectory, "english-tablet.png"), fullPage: true });
  await inspectPage(page, "ar", routes.find(([locale]) => locale === "ar")[1], "tablet");

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [locale, route] of routes) {
    await inspectPage(page, locale, route, "mobile");
    if (locale === "en" || locale === "ar") await page.screenshot({ path: path.join(artifactDirectory, `${locale}-mobile.png`), fullPage: true });
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Commercial Olympic barbell rendering verified: ${routes.length}/13 pages, desktop/tablet/mobile, AVIF/WebP images, links, canonical, hreflang, schema and RTL.`);
