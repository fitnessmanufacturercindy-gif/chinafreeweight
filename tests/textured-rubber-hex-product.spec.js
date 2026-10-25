const { test, expect } = require("@playwright/test");

const productPath = "/products/dumbbells/textured-rubber-hex-dumbbell";

async function assertProductPage(page) {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(productPath, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Textured Rubber Hex Dumbbell" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What is a textured rubber hex dumbbell?" }).first()).toBeVisible();
  await expect(page.locator("video")).toBeVisible();
  await expect(page.locator("video source")).toHaveAttribute("src", /textured-rubber-hex-dumbbell-demo\.mp4$/);
  await expect(page.getByText("Can I order custom logo rubber hex dumbbells?")).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow").toBeLessThanOrEqual(1);
  expect(consoleErrors, "browser console errors").toEqual([]);
}

test("textured rubber hex dumbbell page works on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await assertProductPage(page);
  await page.screenshot({
    path: "C:/Users/Kloe/.codex/visualizations/2026/09/23/01a0ced5-46e8-7281-a9b9-149ab91e882b/textured-rubber-hex-desktop.png",
    fullPage: true
  });
  await page.getByRole("link", { name: "Request Product Quote" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("textured rubber hex dumbbell page works on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await assertProductPage(page);
  await page.screenshot({
    path: "C:/Users/Kloe/.codex/visualizations/2026/09/23/01a0ced5-46e8-7281-a9b9-149ab91e882b/textured-rubber-hex-mobile.png",
    fullPage: true
  });
});
