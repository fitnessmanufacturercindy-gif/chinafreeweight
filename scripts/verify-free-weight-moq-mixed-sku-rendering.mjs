import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight MOQ mixed-SKU guide",
  copyFiles: [
    "free-weight-moq-mixed-sku-guide-copy-primary.json",
    "free-weight-moq-mixed-sku-guide-copy-eu-west.json",
    "free-weight-moq-mixed-sku-guide-copy-eu-north.json",
    "free-weight-moq-mixed-sku-guide-copy-apac.json",
    "free-weight-moq-mixed-sku-guide-copy-ar.json",
    "free-weight-moq-mixed-sku-guide-copy-ko.json"
  ],
  imageFragment: "/assets/resources/free-weight-moq-mixed-sku/",
  heroSuffix: "free-weight-moq-mixed-sku-guide",
  artifactDirectory: "free-weight-moq-mixed-sku-2026-10-31",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/weight-plates"]
  }
});
