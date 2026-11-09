import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight corrective-action guide",
  copyFiles: ["free-weight-corrective-action-copy-primary.json", "free-weight-corrective-action-copy-eu.json", "free-weight-corrective-action-copy-apac.json"],
  imageFragment: "/assets/resources/free-weight-corrective-action/",
  heroSuffix: "free-weight-corrective-action",
  artifactDirectory: "free-weight-corrective-action-2026-11-09",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/factory", "/products/dumbbells", "/products/weight-plates"] }
});
