import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1
});

await page.goto(`http://127.0.0.1:3000?rich=${Date.now()}`, {
  waitUntil: "networkidle"
});
await page.locator("#products").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: "outputs/homepage/rich-products-partners.png" });

await page.locator("#cases").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: "outputs/homepage/rich-projects-faq.png" });

await browser.close();
