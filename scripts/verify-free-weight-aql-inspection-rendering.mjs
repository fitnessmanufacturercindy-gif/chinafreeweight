import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight AQL inspection guide",
  copyFiles: ["free-weight-aql-inspection-guide-copy.json"],
  imageFragment: "/assets/resources/free-weight-aql-inspection/",
  heroSuffix: "free-weight-aql-inspection-guide",
  artifactDirectory: "free-weight-aql-inspection-2026-10-30",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/weight-plates"]
  }
});
