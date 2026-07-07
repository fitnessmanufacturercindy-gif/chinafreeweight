import { chromium } from "playwright-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const url = "http://127.0.0.1:3000";
const out = "outputs/homepage/powerbasefit-homepage-fullpage.png";

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 2400 },
  deviceScaleFactor: 1
});

await page.goto(url, { waitUntil: "networkidle" });
await page.screenshot({ path: out, fullPage: true });
await browser.close();

console.log(out);
