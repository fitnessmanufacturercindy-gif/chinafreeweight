import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Cable attachment swivel guide",
  copyFiles: ["cable-attachment-swivel-guide-copy.json"],
  imageFragment: "/assets/resources/cable-attachment-swivels/",
  heroSuffix: "cable-attachment-swivel-guide",
  artifactDirectory: "cable-attachment-swivels-2026-10-10",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  requiredProductLinks: {
    en: ["/products/gym-accessories/cable-machine-attachments", "/products/gym-accessories"]
  }
});
