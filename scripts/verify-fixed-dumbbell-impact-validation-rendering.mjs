import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Fixed dumbbell impact validation guide",
  copyFiles: ["fixed-dumbbell-impact-copy-primary.json", "fixed-dumbbell-impact-copy-eu.json", "fixed-dumbbell-impact-copy-apac.json"],
  imageFragment: "/assets/resources/fixed-dumbbell-impact-validation/",
  heroSuffix: "fixed-dumbbell-impact-validation",
  artifactDirectory: "fixed-dumbbell-impact-validation-2026-11-06",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/products/dumbbells/hex-dumbbell-kg", "/products/dumbbells"] }
});
