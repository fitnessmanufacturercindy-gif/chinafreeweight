import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Urethane dumbbell surface guide",
  copyFiles: [
    "urethane-dumbbell-surface-guide-copy-primary.json",
    "urethane-dumbbell-surface-guide-copy-eu.json",
    "urethane-dumbbell-surface-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/urethane-dumbbell-surface/",
  heroSuffix: "urethane-dumbbell-surface-guide",
  artifactDirectory: "urethane-dumbbell-surface-2026-10-25",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/dumbbells/pu-dumbbell-kg"]
  }
});
