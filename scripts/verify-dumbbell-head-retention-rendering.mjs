import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  [
    "en",
    "/resources/dumbbell-head-handle-construction-guide"
  ],
  [
    "pt-BR",
    "/pt/blog/fixacao-cabeca-cabo-halteres-atacado"
  ],
  [
    "es",
    "/es/blog/union-cabeza-mango-mancuernas-mayoristas"
  ],
  [
    "de",
    "/de/blog/kurzhantel-kopf-griff-verbindung-pruefen"
  ],
  [
    "fr",
    "/fr/blog/assemblage-tete-poignee-halteres-achat-gros"
  ],
  [
    "vi",
    "/vi/blog/kiem-tra-lien-ket-dau-tay-cam-ta-don"
  ],
  [
    "sv",
    "/sv/blogg/hantelhuvud-handtag-infastning-inkop"
  ],
  [
    "it",
    "/it/blog/fissaggio-testa-impugnatura-manubri-ingrosso"
  ],
  [
    "nl",
    "/nl/blog/bevestiging-dumbbellkop-handgreep-inkoop"
  ],
  [
    "ar",
    "/ar/blog/rabt-ras-dumbbell-bilmaqbad-liljumla"
  ],
  [
    "ko",
    "/ko/blog/dumbbell-head-handle-joint-inspection"
  ],
  [
    "id",
    "/id/blog/sambungan-kepala-gagang-dumbbell-grosir"
  ],
  [
    "pl",
    "/pl/blog/polaczenie-glowicy-uchwytu-hantli-zakup-hurtowy"
  ]
];
const expectedHreflang = [...routes.map(([locale]) => locale), "x-default"];
const expectedAlternates = Object.fromEntries([...routes.map(([locale, route]) => [locale, `https://www.chinafreeweight.com${route}`]), ["x-default", `https://www.chinafreeweight.com${routes[0][1]}`]]);
const imageFragment = "/assets/resources/dumbbell-head-retention/";
const artifactDirectory = path.join(process.cwd(), ".artifacts", "dumbbell-head-retention");
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

  const result = await page.evaluate(({ expectedHreflang, expectedAlternates, imageFragment, locale, route }) => {
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
      canonicalUrl: canonicals[0],
      schemaFaqCounts: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => { try { const value = JSON.parse(node.textContent || "{}"); return (value["@graph"] || [value]).filter((item) => item["@type"] === "FAQPage").map((item) => item.mainEntity?.length || 0); } catch { return [0]; } }),
      missingAlternates: expectedHreflang.filter((value) => !alternates.has(value)),
      wrongAlternates: Object.entries(expectedAlternates).filter(([lang, url]) => alternates.get(lang) !== url).map(([lang]) => lang),
      imageCount: images.length,
      avifSourceCount: avifSources.length,
      unloaded: images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src")),
      intrinsicSizeMissing: images.filter((image) => !image.getAttribute("width") || !image.getAttribute("height")).map((image) => image.getAttribute("src")),
      blankAlt: images.filter((image) => !image.getAttribute("alt")?.trim()).map((image) => image.getAttribute("src")),
      schemaTypes,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      visibleText: document.body.innerText,
      auditText: [document.body.innerText, document.title, document.querySelector('meta[name="description"]')?.content, ...images.map((image) => image.alt), ...[...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent)].join("\n"),
      internalLinks: [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((node) => node.getAttribute("href")).filter(Boolean))],
      expectedDirection: locale === "ar" ? "rtl" : "ltr",
      expectedRoute: route
    };
  }, { expectedHreflang, expectedAlternates, imageFragment, locale, route });

  if (!result.title || result.description.length < 55) failures.push(`${route}: title or description missing`);
  if (result.h1Count !== 1) failures.push(`${route}: ${result.h1Count} H1 elements`);
  if (result.h2Count < 10 || result.h3Count < 3 || result.faqCount !== 6) failures.push(`${route}: article hierarchy or FAQ missing`);
  if (result.canonicalCount !== 1 || result.canonicalPath !== route) failures.push(`${route}: canonical mismatch`);
  if (result.canonicalUrl !== `https://www.chinafreeweight.com${route}`) failures.push(`${route}: incorrect canonical origin`);
  if (!result.schemaFaqCounts.includes(6)) failures.push(`${route}: six structured FAQ answers required`);
  if (result.missingAlternates.length) failures.push(`${route}: missing hreflang ${result.missingAlternates.join(", ")}`);
  if (result.wrongAlternates.length) failures.push(`${route}: incorrect alternate URLs ${result.wrongAlternates.join(", ")}`);
  if (result.imageCount !== 3 || result.avifSourceCount !== 3 || result.unloaded.length || result.intrinsicSizeMissing.length || result.blankAlt.length) failures.push(`${route}: image delivery failed`);
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
  if (result.direction !== result.expectedDirection) failures.push(`${route}: direction ${result.direction || "unset"}`);
  if (result.overflow) failures.push(`${route}: ${viewportLabel} horizontal overflow`);
  const banned = [...new Set(result.auditText.match(bannedVisibleTerms) ?? [])];
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

console.log(`Dumbbell head retention rendering verified: ${routes.length}/13 pages, desktop/tablet/mobile, AVIF/WebP images, links, canonical, hreflang, schema and RTL.`);
