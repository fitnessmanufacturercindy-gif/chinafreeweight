import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const browserPath = process.env.QA_BROWSER_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.join(process.cwd(), "output", "pt-visual-qa");
fs.mkdirSync(outputDir, { recursive: true });

const routes = ["/pt/", "/pt/products/dumbbells/", "/pt/products/weight-plates/", "/pt/products/bumper-plates/", "/pt/oem-private-label/", "/pt/factory/"];
const viewports = [{ name: "desktop", width: 1440, height: 1000 }, { name: "mobile", width: 390, height: 844 }];
const browser = await chromium.launch({ executablePath: browserPath, headless: true });
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    const failedResources = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(`${message.text()} @ ${message.location().url || "unknown"}`); });
    page.on("response", (res) => { if (res.status() >= 400) failedResources.push(`${res.status()} ${res.url()}`); });
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim(),
      lang: document.querySelector("main")?.getAttribute("lang"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      hreflangs: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((el) => el.getAttribute("hreflang")),
      schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => el.textContent || ""),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      offenders: [...document.querySelectorAll("body *")].filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.right > document.documentElement.clientWidth + 1 || rect.left < -1;
      }).slice(0, 10).map((el) => `${el.tagName.toLowerCase()}.${el.className || ""} left=${Math.round(el.getBoundingClientRect().left)} right=${Math.round(el.getBoundingClientRect().right)}`)
    }));
    const slug = route === "/pt/" ? "home" : route.split("/").filter(Boolean).slice(-1)[0];
    await page.screenshot({ path: path.join(outputDir, `${slug}-${viewport.name}.png`), fullPage: false });
    if (response?.status() !== 200) failures.push(`${route} returned ${response?.status()}`);
    if (!result.h1 || result.lang !== "pt-BR") failures.push(`${route} missing Portuguese H1/lang`);
    if (!result.canonical?.includes(route)) failures.push(`${route} canonical mismatch: ${result.canonical}`);
    if (!result.hreflangs.includes("en") || !result.hreflangs.includes("pt")) failures.push(`${route} missing en/pt hreflang`);
    if (!result.schemas.some((schema) => schema.includes("FAQPage")) || !result.schemas.some((schema) => schema.includes("BreadcrumbList"))) failures.push(`${route} missing FAQ/Breadcrumb schema`);
    if (result.overflow) failures.push(`${route} has horizontal overflow at ${viewport.name}: ${result.offenders.join(" | ")}`);
    if (consoleErrors.length || failedResources.length) failures.push(`${route} resource errors at ${viewport.name}: ${[...consoleErrors, ...failedResources].join(" | ")}`);
    console.log(`${viewport.name} ${route}: ${response?.status()} | ${result.title} | overflow=${result.overflow}`);
    await page.close();
  }
  await context.close();
}

await browser.close();
if (failures.length) {
  console.error("\nVisual QA failures:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log(`\nVisual QA passed. Screenshots: ${outputDir}`);
