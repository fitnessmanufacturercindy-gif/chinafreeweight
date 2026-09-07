import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ["en", "/resources/bulk-oem-steel-dumbbells"],
  ["pt-BR", "/pt/blog/halteres-aco-macico-oem-atacado"],
  ["es", "/es/blog/mancuernas-acero-macizo-oem-mayoreo"],
  ["de", "/de/blog/vollstahl-kurzhanteln-oem-grosshandel"],
  ["fr", "/fr/blog/halteres-acier-massif-oem-gros"],
  ["vi", "/vi/blog/ta-tay-thep-dac-oem-so-luong-lon"],
  ["sv", "/sv/blog/massiva-stalhantlar-oem-grossist"],
  ["it", "/it/blog/manubri-acciaio-massiccio-oem-ingrosso"],
  ["nl", "/nl/blog/massief-stalen-dumbbells-oem-groothandel"],
  ["ar", "/ar/blog/damabil-fawlad-masmat-oem-jumla"],
  ["ko", "/ko/blog/oem-solid-steel-dumbbell-bulk"],
  ["id", "/id/blog/dumbbell-baja-padat-oem-grosir"],
  ["pl", "/pl/blog/hantle-z-pelnej-stali-oem-hurt"]
];
const expectedHreflang = new Set([...routes.map(([locale]) => locale), "x-default"]);
const artifactDirectory = path.join(process.cwd(), ".artifacts", "steel-dumbbell-blog");
fs.mkdirSync(artifactDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  for (const [locale, route] of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status()}`);
    await page.evaluate(async () => {
      for (let position = 0; position < document.documentElement.scrollHeight; position += 700) {
        window.scrollTo(0, position);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForFunction(() => [...document.querySelectorAll('img[src*="/assets/resources/steel-dumbbells/"]')].every((image) => image.complete), undefined, { timeout: 5000 });

    const result = await page.evaluate(({ route, locale, expected }) => {
      const canonicals = [...document.querySelectorAll('link[rel="canonical"]')].map((node) => node.href);
      const alternates = new Map([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((node) => [node.getAttribute("hreflang"), node.href]));
      const contentImages = [...document.querySelectorAll('img[src*="/assets/resources/steel-dumbbells/"]')];
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => {
        try {
          const parsed = JSON.parse(node.textContent || "{}");
          return Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
        } catch {
          return [];
        }
      });
      const schemaTypes = schemas.map((schema) => schema["@type"]);
      const unloaded = contentImages.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src"));
      return {
        lang: document.documentElement.lang,
        direction: document.documentElement.dir,
        h1Count: document.querySelectorAll("h1").length,
        canonicalCount: canonicals.length,
        canonicalPath: canonicals[0] ? new URL(canonicals[0]).pathname : "",
        alternateKeys: [...alternates.keys()],
        missingAlternates: expected.filter((code) => !alternates.has(code)),
        imageCount: contentImages.length,
        unloaded,
        schemaTypes,
        imageSchemaCount: schemaTypes.filter((type) => type === "ImageObject").length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        expectedRoute: route,
        expectedDirection: locale === "ar" ? "rtl" : "ltr"
      };
    }, { route, locale, expected: [...expectedHreflang] });

    if (result.h1Count !== 1) failures.push(`${route}: ${result.h1Count} H1 elements`);
    if (result.canonicalCount !== 1 || result.canonicalPath !== route) failures.push(`${route}: canonical mismatch`);
    if (result.missingAlternates.length) failures.push(`${route}: missing hreflang ${result.missingAlternates.join(", ")}`);
    if (result.imageCount !== 5 || result.unloaded.length) failures.push(`${route}: image result ${result.imageCount}, unloaded ${result.unloaded.join(", ")}`);
    for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList"]) if (!result.schemaTypes.includes(type)) failures.push(`${route}: missing ${type}`);
    if (result.imageSchemaCount !== 5) failures.push(`${route}: ${result.imageSchemaCount} ImageObject nodes`);
    if (result.direction !== result.expectedDirection) failures.push(`${route}: direction is ${result.direction || "unset"}`);
    if (result.overflow) failures.push(`${route}: desktop horizontal overflow`);
  }

  for (const [name, route] of [["english-mobile", routes[0][1]], ["arabic-mobile", routes[9][1]]]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) failures.push(`${route}: mobile horizontal overflow`);
    await page.screenshot({ path: path.join(artifactDirectory, `${name}.png`), fullPage: true });
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}${routes[0][1]}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(artifactDirectory, "english-desktop.png"), fullPage: true });
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Steel dumbbell rendering verified: ${routes.length}/13 pages, 5 images, schema, canonical, hreflang, desktop/mobile and RTL.`);
