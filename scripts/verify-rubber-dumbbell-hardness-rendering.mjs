import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Rubber-dumbbell Shore hardness guide",
  copyFiles: [
    "rubber-dumbbell-hardness-guide-copy-primary.json",
    "rubber-dumbbell-hardness-guide-copy-eu.json",
    "rubber-dumbbell-hardness-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/dumbbell-rubber-hardness/",
  heroSuffix: "rubber-dumbbell-shore-hardness-guide",
  artifactDirectory: "dumbbell-hardness-2026-10-17",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/manufacturer/rubber-hex-dumbbells-manufacturer", "/products/dumbbells"]
  }
});
