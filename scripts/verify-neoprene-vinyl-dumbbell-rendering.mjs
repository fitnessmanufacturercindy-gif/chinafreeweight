import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Neoprene versus vinyl dumbbell guide",
  copyFiles: [
    "neoprene-vinyl-dumbbell-guide-copy-primary.json",
    "neoprene-vinyl-dumbbell-guide-copy-eu-west.json",
    "neoprene-vinyl-dumbbell-guide-copy-eu-north.json",
    "neoprene-vinyl-dumbbell-guide-copy-apac-latin.json",
    "neoprene-vinyl-dumbbell-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/neoprene-vinyl-dumbbells/",
  heroSuffix: "neoprene-vinyl-dumbbells-guide",
  artifactDirectory: "neoprene-vinyl-dumbbells-2026-10-26",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/dumbbells/neoprene-dumbbell-kg"]
  }
});
