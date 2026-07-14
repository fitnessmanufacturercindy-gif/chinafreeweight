import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const executablePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const consoleErrors = [];
const failedResponses = [];
const pageErrors = [];
page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
page.on("response", (response) => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`); });
page.on("pageerror", (error) => pageErrors.push(error.message));

await page.goto(`${baseUrl}/pt/produtos/halteres/halter-sextavado-borracha`, { waitUntil: "networkidle" });
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

await page.locator('.route-language-switcher a[lang="en"]').click();
await page.waitForURL("**/products/dumbbells/hex-dumbbell-kg");
assert.equal(await page.locator("html").getAttribute("lang"), "en");

await page.goto(`${baseUrl}/products/dumbbells`, { waitUntil: "networkidle" });
await page.locator('.route-language-switcher a[lang="pt-BR"]').click();
await page.waitForURL("**/pt/produtos/halteres");
assert.match(await page.locator("h1").innerText(), /Halteres profissionais/);

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${baseUrl}/pt/contato`, { waitUntil: "networkidle" });
assert.ok(await page.locator(".mobile-nav-menu summary").isVisible());
assert.ok(await page.locator(".route-language-switcher").isVisible());
assert.equal(await page.locator("form.quote-form").getAttribute("action"), "https://formsubmit.co/kloe@powerbasefit.com");
assert.equal(await page.locator("form.quote-form").getAttribute("method"), "POST");
assert.match(await page.locator(".whatsapp-button").getAttribute("href"), /^https:\/\/wa\.me\/8618963018533/);
assert.deepEqual({ failedResponses, pageErrors }, { failedResponses: [], pageErrors: [] });

const response = await page.goto(`${baseUrl}/pt/oem-private-label`, { waitUntil: "domcontentloaded" });
assert.equal(response?.status(), 404);

await browser.close();
console.log("Browser smoke test passed: desktop/mobile locale switcher, SEO DOM, schema, form, WhatsApp and 404.");
