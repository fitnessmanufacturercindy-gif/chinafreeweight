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
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  extraHTTPHeaders: bypassSecret ? { "x-vercel-protection-bypass": bypassSecret } : undefined
});
const page = await context.newPage();
const consoleErrors = [];
const failedResponses = [];
const pageErrors = [];
page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
page.on("response", (response) => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`); });
page.on("pageerror", (error) => pageErrors.push(error.message));

async function schemaNodes() {
  const documents = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((value) => JSON.parse(value));
  return documents.flatMap((document) => {
    if (Array.isArray(document)) return document.flatMap((item) => item?.["@graph"] ?? [item]);
    return document?.["@graph"] ?? [document];
  });
}

async function switchDesktop(locale) {
  const switcher = page.locator(".route-language-switcher--desktop");
  assert.ok(await switcher.locator("summary").isVisible());
  if (!(await switcher.getAttribute("open"))) await switcher.locator("summary").click();
  await switcher.locator(`a[lang="${locale}"]`).click();
}

function assertSchemaLanguage(nodes, expectedLanguage, route) {
  const languageTypes = new Set(["WebSite", "Organization", "LocalBusiness", "SportingGoodsStore", "Product", "FAQPage", "BreadcrumbList", "Article", "BlogPosting"]);
  for (const node of nodes) {
    const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
    if (types.some((type) => languageTypes.has(type))) {
      assert.equal(node.inLanguage, expectedLanguage, `${route}: ${types.join("/")}`);
    }
  }
}

const portugueseRoutes = [
  "/pt",
  "/pt/produtos/halteres",
  "/pt/produtos/anilhas",
  "/pt/produtos/halteres/halter-sextavado-borracha",
  "/pt/produtos/halteres/halter-cromado",
  "/pt/produtos/anilhas/anilha-bumper-borracha",
  "/pt/fabrica",
  "/pt/contato",
  "/pt/blog",
  "/pt/blog/como-avaliar-fabrica-equipamentos-academia-china",
  "/pt/blog/como-escolher-halteres-academia-profissional",
  "/pt/blog/anilhas-de-peso-vs-anilhas-bumper",
  "/pt/projetos",
  "/pt/produtos",
  "/pt/oem-marca-propria",
  "/pt/produtos/halteres/halter-redondo-borracha",
  "/pt/produtos/halteres/halter-pu",
  "/pt/produtos/anilhas/anilha-olimpica-emborrachada",
  "/pt/blog/como-importar-equipamentos-academia-china",
  "/pt/blog/custo-importacao-equipamentos-academia",
  "/pt/blog/moq-equipamentos-fitness",
  "/pt/blog/oem-vs-odm-equipamentos-fitness",
  "/pt/blog/como-criar-marca-propria-equipamentos-academia",
  "/pt/blog/halter-sextavado-ou-redondo",
  "/pt/blog/halter-borracha-pu-tpu",
  "/pt/blog/anilha-olimpica-vs-padrao",
  "/pt/blog/lista-equipamentos-academia-profissional",
  "/pt/blog/planejamento-area-pesos-livres"
  ,"/pt/produtos/racks-e-bancos"
  ,"/pt/produtos/acessorios-de-academia"
  ,"/pt/fabricante/halteres-sextavados-de-borracha"
  ,"/pt/produtos/halteres/halter-ferro-fundido"
  ,"/pt/produtos/halteres/halter-cpu"
  ,"/pt/produtos/halteres/halter-tpu"
  ,"/pt/produtos/anilhas/anilha-bumper-cpu"
  ,"/pt/produtos/anilhas/anilha-ferro-fundido"
  ,"/pt/produtos/anilhas/anilha-cpu-com-pegada"
  ,"/pt/blog/como-sao-fabricadas-anilhas-bumper"
  ,"/pt/blog/como-verificar-peso-de-halteres-na-fabrica"
];

const portugueseOnlyRoutes = new Set([
  "/pt/oem-marca-propria",
  "/pt/blog/como-importar-equipamentos-academia-china",
  "/pt/blog/custo-importacao-equipamentos-academia",
  "/pt/blog/moq-equipamentos-fitness",
  "/pt/blog/oem-vs-odm-equipamentos-fitness",
  "/pt/blog/como-criar-marca-propria-equipamentos-academia",
  "/pt/blog/halter-sextavado-ou-redondo",
  "/pt/blog/halter-borracha-pu-tpu",
  "/pt/blog/anilha-olimpica-vs-padrao",
  "/pt/blog/lista-equipamentos-academia-profissional",
  "/pt/blog/planejamento-area-pesos-livres"
]);

const portugueseRoutesWithSpanish = new Set([
  "/pt",
  "/pt/produtos",
  "/pt/produtos/halteres",
  "/pt/produtos/anilhas",
  "/pt/produtos/halteres/halter-sextavado-borracha",
  "/pt/produtos/halteres/halter-cromado",
  "/pt/produtos/halteres/halter-redondo-borracha",
  "/pt/produtos/halteres/halter-pu",
  "/pt/produtos/anilhas/anilha-bumper-borracha",
  "/pt/produtos/anilhas/anilha-olimpica-emborrachada",
  "/pt/fabrica",
  "/pt/contato",
  "/pt/oem-marca-propria",
  "/pt/blog",
  "/pt/blog/como-avaliar-fabrica-equipamentos-academia-china",
  "/pt/blog/como-importar-equipamentos-academia-china",
  "/pt/blog/custo-importacao-equipamentos-academia",
  "/pt/blog/moq-equipamentos-fitness",
  "/pt/blog/oem-vs-odm-equipamentos-fitness",
  "/pt/blog/como-criar-marca-propria-equipamentos-academia",
  "/pt/blog/halter-sextavado-ou-redondo",
  "/pt/blog/halter-borracha-pu-tpu",
  "/pt/blog/como-escolher-halteres-academia-profissional",
  "/pt/blog/anilhas-de-peso-vs-anilhas-bumper",
  "/pt/blog/lista-equipamentos-academia-profissional",
  "/pt/blog/planejamento-area-pesos-livres",
  "/pt/projetos",
  "/pt/produtos/racks-e-bancos",
  "/pt/produtos/acessorios-de-academia",
  "/pt/fabricante/halteres-sextavados-de-borracha",
  "/pt/produtos/halteres/halter-ferro-fundido",
  "/pt/produtos/halteres/halter-cpu",
  "/pt/produtos/halteres/halter-tpu",
  "/pt/produtos/anilhas/anilha-bumper-cpu",
  "/pt/produtos/anilhas/anilha-ferro-fundido",
  "/pt/produtos/anilhas/anilha-cpu-com-pegada",
  "/pt/blog/como-sao-fabricadas-anilhas-bumper",
  "/pt/blog/como-verificar-peso-de-halteres-na-fabrica"
]);

const spanishRoutes = [
  "/es",
  "/es/productos",
  "/es/productos/mancuernas",
  "/es/productos/discos-de-peso",
  "/es/productos/mancuernas/mancuerna-hexagonal-goma",
  "/es/productos/mancuernas/mancuerna-cromada",
  "/es/productos/discos/disco-bumper-goma",
  "/es/productos/discos/disco-olimpico-goma",
  "/es/fabrica",
  "/es/contacto",
  "/es/oem-marca-propia",
  "/es/blog",
  "/es/blog/importar-equipos-gimnasio-desde-china",
  "/es/blog/costo-importacion-equipos-gimnasio",
  "/es/blog/moq-equipos-fitness",
  "/es/blog/oem-vs-odm-equipos-fitness",
  "/es/blog/crear-marca-propia-equipos-gimnasio",
  "/es/blog/como-elegir-fabricante-equipos-fitness",
  "/es/blog/mancuerna-hexagonal-vs-redonda",
  "/es/blog/mancuernas-goma-vs-pu-vs-tpu",
  "/es/blog/lista-equipos-gimnasio-profesional",
  "/es/blog/planificar-zona-peso-libre",
  "/es/proyectos",
  "/es/productos/racks-y-bancos",
  "/es/productos/accesorios-de-gimnasio",
  "/es/fabricante/mancuernas-hexagonales-de-goma",
  "/es/blog/como-elegir-mancuernas-para-gimnasio-profesional",
  "/es/blog/discos-de-peso-vs-discos-bumper",
  "/es/productos/mancuernas/mancuerna-redonda-de-goma",
  "/es/productos/mancuernas/mancuerna-pu",
  "/es/productos/mancuernas/mancuerna-hierro-fundido",
  "/es/productos/mancuernas/mancuerna-cpu",
  "/es/productos/mancuernas/mancuerna-tpu",
  "/es/productos/discos/disco-bumper-cpu",
  "/es/productos/discos/disco-hierro-fundido",
  "/es/productos/discos/disco-cpu-con-agarres",
  "/es/blog/como-se-fabrican-discos-bumper",
  "/es/blog/como-verificar-peso-mancuernas-fabrica"
];

const spanishRoutesWithEnglish = new Set([
  "/es",
  "/es/productos",
  "/es/productos/mancuernas",
  "/es/productos/discos-de-peso",
  "/es/productos/mancuernas/mancuerna-hexagonal-goma",
  "/es/productos/mancuernas/mancuerna-cromada",
  "/es/productos/discos/disco-bumper-goma",
  "/es/productos/discos/disco-olimpico-goma",
  "/es/fabrica",
  "/es/contacto",
  "/es/blog",
  "/es/blog/como-elegir-fabricante-equipos-fitness",
  "/es/proyectos",
  "/es/productos/racks-y-bancos",
  "/es/productos/accesorios-de-gimnasio",
  "/es/fabricante/mancuernas-hexagonales-de-goma",
  "/es/blog/como-elegir-mancuernas-para-gimnasio-profesional",
  "/es/blog/discos-de-peso-vs-discos-bumper",
  "/es/productos/mancuernas/mancuerna-redonda-de-goma",
  "/es/productos/mancuernas/mancuerna-pu",
  "/es/productos/mancuernas/mancuerna-hierro-fundido",
  "/es/productos/mancuernas/mancuerna-cpu",
  "/es/productos/mancuernas/mancuerna-tpu",
  "/es/productos/discos/disco-bumper-cpu",
  "/es/productos/discos/disco-hierro-fundido",
  "/es/productos/discos/disco-cpu-con-agarres",
  "/es/blog/como-se-fabrican-discos-bumper",
  "/es/blog/como-verificar-peso-mancuernas-fabrica"
]);

assert.ok(portugueseOnlyRoutes.size > 0);
assert.ok(portugueseRoutesWithSpanish.size > 0);
assert.ok(spanishRoutesWithEnglish.size > 0);

for (const route of portugueseRoutes) {
  const response = await page.goto(testUrl(route), { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, route);
  assert.equal(await page.locator("html").getAttribute("lang"), "pt-BR", route);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://www.chinafreeweight.com${route}`, route);
  assert.equal(await page.locator('link[hreflang="pt-BR"]').count(), 1, route);
  assert.equal(await page.locator('link[hreflang="x-default"]').count(), 1, route);
  assert.ok((await page.locator("main").innerText()).length > 500, route);
  assert.ok((await page.locator('script[type="application/ld+json"]').allTextContents()).some((value) => value.includes('"FAQPage"')), route);
  assertSchemaLanguage(await schemaNodes(), "pt-BR", route);
}

for (const route of spanishRoutes) {
  const response = await page.goto(testUrl(route), { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, route);
  assert.equal(await page.locator("html").getAttribute("lang"), "es", route);
  assert.equal(await page.locator("html").getAttribute("dir"), "ltr", route);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://www.chinafreeweight.com${route}`, route);
  assert.equal(await page.locator('link[hreflang="pt-BR"]').count(), 1, route);
  assert.equal(await page.locator('link[hreflang="es"]').count(), 1, route);
  assert.equal(await page.locator('link[hreflang="x-default"]').count(), 1, route);
  assert.ok((await page.locator("main").innerText()).length > 500, route);
  assert.ok((await page.locator('script[type="application/ld+json"]').allTextContents()).some((value) => value.includes('"FAQPage"')), route);
  assertSchemaLanguage(await schemaNodes(), "es", route);
}

const englishRoutes = ["/", "/products", "/products/dumbbells", "/products/dumbbells/hex-dumbbell-kg", "/resources", "/projects", "/factory", "/contact"];
for (const route of englishRoutes) {
  const response = await page.goto(testUrl(route), { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, route);
  assert.equal(await page.locator("html").getAttribute("lang"), "en", route);
  assert.equal(await page.locator('link[hreflang="pt-BR"]').count(), 1, route);
  assert.equal(await page.locator('link[hreflang="es"]').count(), 1, route);
  assertSchemaLanguage(await schemaNodes(), "en", route);
}

const sourceResponse = await page.goto(testUrl("/pt/produtos/halteres/halter-sextavado-borracha"), { waitUntil: "domcontentloaded" });
assert.ok(sourceResponse);
const sourceHtml = await sourceResponse.text();
assert.equal(sourceResponse.status(), 200);
assert.match(sourceHtml, /<html lang="pt-BR" dir="ltr">/);
assert.match(sourceHtml, /Halter sextavado de borracha profissional/);

const spanishSourceResponse = await page.goto(testUrl("/es/productos/mancuernas/mancuerna-hexagonal-goma"), { waitUntil: "domcontentloaded" });
assert.ok(spanishSourceResponse);
const spanishSourceHtml = await spanishSourceResponse.text();
assert.equal(spanishSourceResponse.status(), 200);
assert.match(spanishSourceHtml, /<html lang="es" dir="ltr">/);
assert.match(spanishSourceHtml, /Mancuerna hexagonal de goma para uso profesional/);
assert.match(spanishSourceHtml, /Proceso de fabricación/);
assert.doesNotMatch(spanishSourceHtml, /PowerBaseFit manufactures OEM dumbbells/);

const sitemapResponse = await page.goto(testUrl("/sitemap.xml"), { waitUntil: "domcontentloaded" });
assert.ok(sitemapResponse);
const sitemapXml = await sitemapResponse.text();
assert.equal(sitemapResponse.status(), 200);
assert.equal((sitemapXml.match(/<loc>/g) ?? []).length, 481);
assert.equal((sitemapXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/pt(?:<|\/)/g) ?? []).length, 49);
assert.equal((sitemapXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/es(?:<|\/)/g) ?? []).length, 49);
assert.equal((sitemapXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/de(?:<|\/)/g) ?? []).length, 124);
assert.equal((sitemapXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/fr(?:<|\/)/g) ?? []).length, 124);
assert.match(sitemapXml, /hreflang="de"/);
assert.match(sitemapXml, /hreflang="fr"/);
assert.doesNotMatch(sitemapXml, /https:\/\/www\.chinafreeweight\.com\/(?:it|nl|ru|ar|ja|ko)(?:<|\/)/);

const robotsResponse = await page.goto(testUrl("/robots.txt"), { waitUntil: "domcontentloaded" });
assert.ok(robotsResponse);
assert.equal(robotsResponse.status(), 200);
assert.match(await robotsResponse.text(), /Allow: \/[\r\n]/);

const languageSitemapResponse = await page.goto(testUrl("/sitemaps/languages.xml"), { waitUntil: "domcontentloaded" });
assert.ok(languageSitemapResponse);
const languageSitemapXml = await languageSitemapResponse.text();
assert.equal(languageSitemapResponse.status(), 200);
assert.equal((languageSitemapXml.match(/<loc>/g) ?? []).length, 481);
const languageSitemapLocs = [...languageSitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const languageSitemapPortuguese = languageSitemapLocs.filter((url) => /^\/pt(?:\/|$)/.test(new URL(url).pathname));
const languageSitemapSpanish = languageSitemapLocs.filter((url) => /^\/es(?:\/|$)/.test(new URL(url).pathname));
const languageSitemapGerman = languageSitemapLocs.filter((url) => /^\/de(?:\/|$)/.test(new URL(url).pathname));
const languageSitemapFrench = languageSitemapLocs.filter((url) => /^\/fr(?:\/|$)/.test(new URL(url).pathname));
assert.equal(languageSitemapLocs.length - languageSitemapPortuguese.length - languageSitemapSpanish.length - languageSitemapGerman.length - languageSitemapFrench.length, 135);
assert.equal(languageSitemapPortuguese.length, 49);
assert.equal(languageSitemapSpanish.length, 49);
assert.equal(languageSitemapGerman.length, 124);
assert.equal(languageSitemapFrench.length, 124);

await page.goto(testUrl("/pt/produtos/halteres/halter-sextavado-borracha"), { waitUntil: "networkidle" });
assert.equal(await page.locator("html").getAttribute("lang"), "pt-BR");
assert.equal(await page.locator("html").getAttribute("dir"), "ltr");
assert.match(await page.locator("h1").innerText(), /Halter sextavado de borracha/);
assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://www.chinafreeweight.com/pt/produtos/halteres/halter-sextavado-borracha");
assert.equal(await page.locator('link[hreflang="en"]').count(), 1);
assert.equal(await page.locator('link[hreflang="pt-BR"]').count(), 1);
assert.equal(await page.locator('link[hreflang="x-default"]').count(), 1);
const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
assert.ok(schemas.some((value) => value.includes('"Product"')));
assert.ok(schemas.some((value) => value.includes('"FAQPage"')));
assert.ok(schemas.some((value) => value.includes('"BreadcrumbList"')));

await switchDesktop("en");
await page.waitForURL("**/products/dumbbells/hex-dumbbell-kg");
assert.equal(await page.locator("html").getAttribute("lang"), "en");

await page.goto(testUrl("/products/dumbbells"), { waitUntil: "networkidle" });
await switchDesktop("es");
await page.waitForURL("**/es/productos/mancuernas");
assert.match(await page.locator("h1").innerText(), /Mancuernas profesionales/);

await page.goto(testUrl("/products"), { waitUntil: "networkidle" });
assert.equal(await page.locator('.route-language-switcher--desktop a[lang="en"]').count(), 1);
assert.equal(await page.locator('.route-language-switcher--desktop a[lang="pt-BR"]').count(), 1);
assert.equal(await page.locator('.route-language-switcher--desktop a[lang="es"]').count(), 1);
assert.equal(await page.locator('.route-language-switcher--desktop a[lang="de"]').count(), 1);
assert.equal(await page.locator('.route-language-switcher--desktop a[lang="fr"]').count(), 1);
await switchDesktop("pt-BR");
await page.waitForURL("**/pt/produtos");
await switchDesktop("es");
await page.waitForURL("**/es/productos");
await switchDesktop("en");
await page.waitForURL("**/products");

await page.goto(testUrl("/pt/produtos/halteres"), { waitUntil: "networkidle" });
await switchDesktop("es");
await page.waitForURL("**/es/productos/mancuernas");
assert.equal(await page.locator("html").getAttribute("lang"), "es");

await page.goto(testUrl("/products/dumbbells/cast-iron-dumbbell"), { waitUntil: "networkidle" });
await switchDesktop("pt-BR");
await page.waitForURL("**/pt/produtos/halteres/halter-ferro-fundido");
await switchDesktop("es");
await page.waitForURL("**/es/productos/mancuernas/mancuerna-hierro-fundido");
await switchDesktop("en");
await page.waitForURL("**/products/dumbbells/cast-iron-dumbbell");

await page.goto(testUrl("/resources/how-are-bumper-plates-made"), { waitUntil: "networkidle" });
await switchDesktop("pt-BR");
await page.waitForURL("**/pt/blog/como-sao-fabricadas-anilhas-bumper");
await switchDesktop("es");
await page.waitForURL("**/es/blog/como-se-fabrican-discos-bumper");
await switchDesktop("en");
await page.waitForURL("**/resources/how-are-bumper-plates-made");

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(testUrl("/pt/contato"), { waitUntil: "networkidle" });
assert.ok(await page.locator(".mobile-nav-menu summary").isVisible());
await page.locator(".mobile-nav-menu summary").click();
assert.ok(await page.locator(".route-language-switcher--mobile").isVisible());
assert.equal(await page.locator("form.quote-form").getAttribute("action"), "https://formsubmit.co/kloe@powerbasefit.com");
assert.equal(await page.locator("form.quote-form").getAttribute("method"), "POST");
assert.match(await page.locator(".whatsapp-button").getAttribute("href"), /^https:\/\/wa\.me\/8618963018533/);

await page.goto(testUrl("/es/contacto"), { waitUntil: "networkidle" });
assert.ok(await page.locator(".mobile-nav-menu summary").isVisible());
await page.locator(".mobile-nav-menu summary").click();
assert.ok(await page.locator(".route-language-switcher--mobile").isVisible());
assert.equal(await page.locator("form.quote-form").getAttribute("action"), "https://formsubmit.co/kloe@powerbasefit.com");
assert.equal(await page.locator('form.quote-form input[name="_subject"]').getAttribute("value"), "Nueva solicitud en español — ChinaFreeWeight");
assert.match(await page.locator(".whatsapp-button").getAttribute("href"), /^https:\/\/wa\.me\/8618963018533/);
assert.deepEqual({ failedResponses, pageErrors }, { failedResponses: [], pageErrors: [] });

for (const route of ["/pt/products", "/pt/oem-private-label", "/pt/case/nao-publicado", "/es-es", "/es/productos/no-publicado", "/fr/produits/non-publie"]) {
  const response = await page.goto(testUrl(route), { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 404, route);
}

await browser.close();
console.log("Browser smoke test passed: desktop/mobile locale switcher, SEO DOM, schema, form, WhatsApp and 404.");
