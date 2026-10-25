import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Cast-iron plate manufacturing guide",
  copyFiles: [
    "cast-iron-plate-manufacturing-guide-copy-primary.json",
    "cast-iron-plate-manufacturing-guide-copy-eu.json",
    "cast-iron-plate-manufacturing-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/cast-iron-plate-manufacturing/",
  heroSuffix: "cast-iron-plate-manufacturing-guide",
  artifactDirectory: "cast-iron-weight-plate-manufacturing-2026-10-11",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/weight-plates/cast-iron-weight-plate", "/products/weight-plates"]
  }
});
