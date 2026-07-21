import assert from "node:assert/strict";
import { commercialCompletionBCSelections } from "../../content/i18n/commercial-completion-bc";
import { contentRepository } from "../../lib/content/repository";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const locales = ["pt-BR", "es", "ko"] as const;
async function fetchWithRetry(url: string, init?: RequestInit) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await fetch(url, init);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  throw lastError;
}
const pages = commercialCompletionBCSelections.flatMap((selection) => {
  const entity = contentRepository.getEntity(`product:${selection.family}:${selection.slug}`);
  assert.ok(entity, `Missing entity ${selection.slug}`);
  return locales.map((locale) => {
    const version = entity.versions[locale];
    assert.ok(version, `Missing ${locale} version for ${selection.slug}`);
    return { locale, path: version.publicPath, h1: version.h1 };
  });
});

async function main() {
for (const { locale, path, h1 } of pages) {
  const response = await fetchWithRetry(`${baseUrl}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  const html = await response.text();
  assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`, "i"), `${path}: html lang`);
  assert.match(html, /<title>[^<]{10,}<\/title>/i, `${path}: title`);
  assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,}/i, `${path}: description`);
  assert.ok(html.includes(`<h1`), `${path}: H1 element`);
  assert.ok(html.includes(h1.replaceAll("&", "&amp;")) || html.includes(h1), `${path}: localized H1`);
  assert.ok(html.includes(`rel="canonical" href="https://www.chinafreeweight.com${path}"`), `${path}: canonical`);
  assert.match(html, new RegExp(`hrefLang=["']${locale}["'][^>]+href=["']https://www\\.chinafreeweight\\.com${path.replaceAll("/", "\\/")}["']`, "i"), `${path}: self hreflang`);
  assert.match(html, /hrefLang=["']en["']/i, `${path}: English alternate`);
  assert.match(html, /hrefLang=["']x-default["']/i, `${path}: x-default`);
  assert.ok(html.includes("application/ld+json"), `${path}: JSON-LD`);
  assert.ok(html.includes(`\"inLanguage\":\"${locale}\"`), `${path}: schema language`);
  assert.ok(html.includes("\"@type\":\"Product\""), `${path}: product schema`);
  assert.ok(html.includes("\"@type\":\"FAQPage\""), `${path}: FAQ schema`);
  assert.ok(html.includes("\"@type\":\"BreadcrumbList\""), `${path}: breadcrumb schema`);
  assert.match(html, /<img[^>]+alt=["'][^"']{10,}/i, `${path}: localized image alt`);
  assert.doesNotMatch(html, /<meta[^>]+name=["']robots["'][^>]+noindex/i, `${path}: noindex`);
}

const [mainSitemap, languageSitemap] = await Promise.all([
  fetchWithRetry(`${baseUrl}/sitemap.xml`).then((response) => response.text()),
  fetchWithRetry(`${baseUrl}/sitemaps/languages.xml`).then((response) => response.text())
]);
for (const { path } of pages) {
  const url = `https://www.chinafreeweight.com${path}`;
  assert.ok(mainSitemap.includes(url), `${path}: main sitemap`);
  assert.ok(languageSitemap.includes(url), `${path}: language sitemap`);
}

for (const path of [
  "/pt/produtos/halteres/produto-nao-publicado",
  "/es/productos/mancuernas/producto-no-publicado",
  "/ko/products/dumbbells/unpublished-product"
]) {
  const response = await fetchWithRetry(`${baseUrl}${path}`, { redirect: "manual" });
  assert.equal(response.status, 404, `${path}: unpublished page`);
}

console.log(`Commercial B/C browser smoke passed: ${pages.length} localized pages at ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
