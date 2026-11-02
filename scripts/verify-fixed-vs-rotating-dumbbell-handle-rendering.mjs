import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Fixed-vs-rotating dumbbell handle guide",
  copyFiles: ["dumbbell-handle-choice-copy-en.json", "dumbbell-handle-choice-copy-latam.json", "dumbbell-handle-choice-copy-eu-west.json", "dumbbell-handle-choice-copy-eu-north.json", "dumbbell-handle-choice-copy-apac.json"],
  imageFragment: "/assets/resources/dumbbell-handle-choice/",
  heroSuffix: "fixed-vs-rotating-dumbbell-handles",
  artifactDirectory: "dumbbell-handle-choice-2026-11-02",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: { en: ["/products/dumbbells"] }
});
