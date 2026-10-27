import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Commercial weight-plate storage guide",
  copyFiles: [
    "weight-plate-storage-guide-copy-primary.json",
    "weight-plate-storage-guide-copy-eu-west.json",
    "weight-plate-storage-guide-copy-eu-north.json",
    "weight-plate-storage-guide-copy-apac-latin.json",
    "weight-plate-storage-guide-copy-ar.json",
    "weight-plate-storage-guide-copy-ko.json"
  ],
  imageFragment: "/assets/resources/weight-plate-storage/",
  heroSuffix: "weight-plate-storage-guide",
  artifactDirectory: "weight-plate-storage-2026-10-27",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/weight-plates"]
  }
});
