import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Weight-plate edge handling guide",
  copyFiles: [
    "weight-plate-edge-handling-guide-copy-primary.json",
    "weight-plate-edge-handling-guide-copy-eu.json",
    "weight-plate-edge-handling-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/weight-plate-edges/",
  heroSuffix: "weight-plate-edge-rim-handling-guide",
  artifactDirectory: "weight-plate-edge-2026-10-14",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 5,
  requiredProductLinks: {
    en: ["/products/weight-plates/cast-iron-weight-plate", "/products/weight-plates"]
  }
});
