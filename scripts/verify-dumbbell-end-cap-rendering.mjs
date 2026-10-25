import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Dumbbell end-cap guide",
  copyFiles: [
    "dumbbell-end-cap-guide-copy-primary.json",
    "dumbbell-end-cap-guide-copy-eu.json",
    "dumbbell-end-cap-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/dumbbell-end-caps/",
  heroSuffix: "dumbbell-end-cap-guide",
  artifactDirectory: "dumbbell-end-cap-2026-10-21",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/dumbbells/pu-dumbbell-kg"]
  }
});
