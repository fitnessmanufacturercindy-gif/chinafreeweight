import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Cable-attachment finish guide",
  copyFiles: [
    "cable-attachment-finish-guide-copy-primary.json",
    "cable-attachment-finish-guide-copy-eu.json",
    "cable-attachment-finish-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/cable-attachment-finishes/",
  heroSuffix: "cable-attachment-finish-guide",
  artifactDirectory: "cable-attachment-finish-2026-10-20",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/gym-accessories/cable-machine-attachments", "/products/gym-accessories"]
  }
});
