import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Private-label GTIN packaging guide",
  copyFiles: [
    "private-label-gtin-packaging-guide-copy-primary.json",
    "private-label-gtin-packaging-guide-copy-eu-west.json",
    "private-label-gtin-packaging-guide-copy-eu-north.json",
    "private-label-gtin-packaging-guide-copy-apac-latin.json",
    "private-label-gtin-packaging-guide-copy-ar.json",
    "private-label-gtin-packaging-guide-copy-ko.json"
  ],
  imageFragment: "/assets/resources/private-label-gtin-packaging/",
  heroSuffix: "private-label-gtin-packaging-guide",
  artifactDirectory: "private-label-gtin-packaging-2026-10-28",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/weight-plates"]
  }
});
