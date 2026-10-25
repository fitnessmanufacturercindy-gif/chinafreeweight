import { expect, test } from "@playwright/test";

const casePath = "/projects/custom-pink-cpu-dumbbells-weight-plates";

async function assertCasePage(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(casePath, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", {
    level: 1,
    name: "Custom Pink CPU Dumbbells and Weight Plates: An OEM Manufacturing Case"
  })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Custom Pink CPU Dumbbells for private-label programs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Matching Custom Weight Plates for a unified product series" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Looking for Custom CPU Dumbbells or Weight Plates for Your Brand?" }).first()).toBeVisible();
  const schemaText = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
  expect(schemaText).toContain("BreadcrumbList");
  expect(schemaText).toContain("Article");
  await expect(page.locator('img[alt*="custom pink CPU dumbbells"]')).toBeVisible();
  await expect(page.locator('img[alt*="Custom pink multi-grip weight plate"]')).toBeVisible();

  const visibleCopy = (await page.locator("main").innerText()).toLowerCase();
  for (const phrase of [
    "confidential",
    "not disclosed",
    "unverified",
    "pending confirmation",
    "to be confirmed",
    "not claimed",
    "cannot confirm",
    "unsupported promises"
  ]) {
    expect(visibleCopy, `public page contains internal phrase: ${phrase}`).not.toContain(phrase);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow").toBeLessThanOrEqual(1);
  expect(errors, "browser console errors").toEqual([]);
}

test("custom pink CPU case renders on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await assertCasePage(page);
  await page.screenshot({
    path: "C:/Users/Kloe/.codex/visualizations/2026/09/23/01a0ced5-46e8-7281-a9b9-149ab91e882b/custom-pink-cpu-case-desktop.png",
    fullPage: false
  });
});

test("custom pink CPU case renders on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await assertCasePage(page);
  await page.screenshot({
    path: "C:/Users/Kloe/.codex/visualizations/2026/09/23/01a0ced5-46e8-7281-a9b9-149ab91e882b/custom-pink-cpu-case-mobile.png",
    fullPage: true
  });
});

test("projects index links to the new case", async ({ page }) => {
  await page.goto("/projects", { waitUntil: "networkidle" });
  const link = page.getByRole("link", { name: /View Custom Pink CPU Dumbbells and Weight Plates/i }).first();
  await expect(link).toHaveAttribute("href", casePath);
});
