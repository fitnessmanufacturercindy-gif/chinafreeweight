import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Rubber-dumbbell surface-condition guide",
  copyFiles: [
    "rubber-dumbbell-surface-bloom-guide-copy-primary.json",
    "rubber-dumbbell-surface-bloom-guide-copy-eu.json",
    "rubber-dumbbell-surface-bloom-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/dumbbell-surface-bloom/",
  heroSuffix: "rubber-dumbbell-surface-bloom-guide",
  artifactDirectory: "rubber-surface-bloom-2026-10-19",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/manufacturer/rubber-hex-dumbbells-manufacturer", "/products/dumbbells"]
  }
});
