import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight production lead-time guide",
  copyFiles: [
    "free-weight-production-lead-time-copy-en.json",
    "free-weight-production-lead-time-copy-latam.json",
    "free-weight-production-lead-time-copy-eu-west.json",
    "free-weight-production-lead-time-copy-eu-north.json",
    "free-weight-production-lead-time-copy-apac.json"
  ],
  imageFragment: "/assets/resources/free-weight-production-lead-time/",
  heroSuffix: "free-weight-production-lead-time-guide",
  artifactDirectory: "free-weight-production-lead-time-2026-11-01",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/dumbbells", "/products/weight-plates"]
  }
});
