import { expect, test } from "@playwright/test";

const casePath = "/projects/chrome-dumbbell-distributor-stock-direct-shipping";

async function assertCasePage(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(casePath, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", {
    level: 1,
    name: "Wholesale Chrome Dumbbells for Distributor Stock and Direct Customer Delivery"
  })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Warehouse stock for faster local order fulfillment" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Direct customer delivery from the factory" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How chrome dumbbells are packed for wholesale shipping" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Build Your Wholesale Chrome Dumbbell Supply Program" })).toBeVisible();

  const schemaText = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
  expect(schemaText).toContain("BreadcrumbList");
  expect(schemaText).toContain("Article");
  expect(schemaText).toContain("Wholesale Chrome Dumbbells");

  await expect(page.locator("main img")).toHaveCount(5);
  await expect(page.locator('img[alt*="Palletized wholesale chrome dumbbell shipment"]')).toBeVisible();
  await expect(page.locator('img[alt*="Quality inspection of chrome dumbbell"]')).toBeVisible();

  const visibleCopy = (await page.locator("main").innerText()).toLowerCase();
  for (const phrase of [
    "confidential",
    "not disclosed",
    "unverified",
    "pending confirmation",
    "to be confirmed",
    "not claimed",
    "cannot confirm",
    "internal analysis",
    "for internal use",
    "placeholder",
    "tbc",
    "tbd"
  ]) {
    expect(visibleCopy, `public page contains internal phrase: ${phrase}`).not.toContain(phrase);
  }

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).toContain(casePath);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow").toBeLessThanOrEqual(1);
  expect(errors, "browser console errors").toEqual([]);
}

test("chrome dumbbell distributor case renders on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await assertCasePage(page);
  await page.screenshot({
    path: "C:/Users/Kloe/.codex/visualizations/2026/09/23/01a0ced5-46e8-7281-a9b9-149ab91e882b/chrome-dumbbell-distributor-case-desktop.png",
    fullPage: false
  });
});

test("chrome dumbbell distributor case renders on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await assertCasePage(page);
  await page.screenshot({
    path: "C:/Users/Kloe/.codex/visualizations/2026/09/23/01a0ced5-46e8-7281-a9b9-149ab91e882b/chrome-dumbbell-distributor-case-mobile.png",
    fullPage: true
  });
});

test("projects index links to the chrome dumbbell distributor case", async ({ page }) => {
  await page.goto("/projects", { waitUntil: "networkidle" });
  const link = page.getByRole("link", { name: /View the distributor case/i }).first();
  await expect(link).toHaveAttribute("href", casePath);
});
