import assert from "node:assert/strict";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

const paths = [
  "/pt/produtos/halteres/halter-ajustavel",
  "/pt/produtos/anilhas/anilha-bumper-competicao",
  "/pt/produtos/racks-e-bancos/power-rack-treinador-funcional",
  "/pt/produtos/racks-e-bancos/smith-machine-profissional",
  "/pt/produtos/racks-e-bancos/banco-regulavel-profissional",
  "/pt/produtos/acessorios-de-academia/kettlebell-ferro-fundido",
  "/es/productos/mancuernas/mancuerna-ajustable",
  "/es/productos/discos-de-peso/disco-bumper-competicion",
  "/es/productos/racks-y-bancos/jaula-potencia-entrenador-funcional",
  "/es/productos/racks-y-bancos/maquina-smith-profesional",
  "/es/productos/racks-y-bancos/banco-ajustable-profesional",
  "/es/productos/accesorios-de-gimnasio/kettlebell-hierro-fundido",
  "/ko/products/dumbbells/adjustable-dumbbell",
  "/ko/projects",
  "/ko/blog/how-bumper-plates-are-made",
  "/ko/blog/how-dumbbells-are-weighed-in-factory",
  "/ko/blog/commercial-free-weight-rfq-checklist-korea",
  "/ko/blog/custom-logo-dumbbells-weight-plates",
  "/ko/blog/free-weight-reorder-batch-consistency-korea",
  "/ko/blog/landed-cost-wholesale-free-weights-korea",
  "/ko/blog/oem-free-weight-sample-approval-korea",
  "/ko/blog/plan-commercial-dumbbell-set-korea",
  "/ko/blog/training-vs-competition-bumper-plates-korea"
];

function expectedLocale(path) {
  if (path.startsWith("/pt/")) return "pt-BR";
  if (path.startsWith("/es/")) return "es";
  return "ko";
}

for (const path of paths) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  const html = await response.text();
  const locale = expectedLocale(path);
  assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`, "i"), `${path}: html lang`);
  assert.match(html, /<title>[^<]{10,}<\/title>/i, `${path}: title`);
  assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,}/i, `${path}: description`);
  assert.ok(html.includes(`rel="canonical" href="https://www.chinafreeweight.com${path}"`), `${path}: canonical`);
  assert.match(html, new RegExp(`hrefLang=["']${locale}["'][^>]+href=["']https://www\\.chinafreeweight\\.com${path.replaceAll("/", "\\/")}["']`, "i"), `${path}: self hreflang`);
  assert.match(html, /hrefLang=["']en["']/i, `${path}: English alternate`);
  assert.match(html, /hrefLang=["']x-default["']/i, `${path}: x-default`);
  assert.ok(html.includes("application/ld+json"), `${path}: JSON-LD`);
  assert.ok(html.includes(`\"inLanguage\":\"${locale}\"`), `${path}: schema language`);
  assert.ok(html.includes("\"@type\":\"FAQPage\""), `${path}: FAQ schema`);
  assert.ok(html.includes("\"@type\":\"BreadcrumbList\""), `${path}: breadcrumb schema`);
  if (path.includes("/products/") || path.includes("/produtos/") || path.includes("/productos/")) {
    assert.ok(html.includes("\"@type\":\"Product\""), `${path}: product schema`);
  }
  if (path.includes("/blog/")) assert.ok(html.includes("\"@type\":\"BlogPosting\""), `${path}: blog schema`);
  assert.match(html, /<img[^>]+alt=["'][^"']{10,}/i, `${path}: localized image alt`);
  assert.doesNotMatch(html, /<meta[^>]+name=["']robots["'][^>]+noindex/i, `${path}: noindex`);
}

const sitemap = await fetch(`${baseUrl}/sitemap.xml`).then((response) => response.text());
const languageSitemap = await fetch(`${baseUrl}/sitemaps/languages.xml`).then((response) => response.text());
for (const path of paths) {
  const url = `https://www.chinafreeweight.com${path}`;
  assert.ok(sitemap.includes(url), `${path}: main sitemap`);
  assert.ok(languageSitemap.includes(url), `${path}: language sitemap`);
}

const missing = await fetch(`${baseUrl}/ko/products/not-published-commercial-page`, { redirect: "manual" });
assert.equal(missing.status, 404, "unpublished Korean route must remain 404");

console.log(`Commercial completion browser smoke passed: ${paths.length} pages at ${baseUrl}`);
