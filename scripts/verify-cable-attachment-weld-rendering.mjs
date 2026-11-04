import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Cable attachment weld inspection guide",
  copyFiles: ["cable-attachment-weld-copy-primary.json", "cable-attachment-weld-copy-eu.json", "cable-attachment-weld-copy-apac.json"],
  imageFragment: "/assets/resources/cable-attachment-welds/",
  heroSuffix: "cable-attachment-weld-inspection",
  artifactDirectory: "cable-attachment-weld-2026-11-04",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/products/gym-accessories/cable-machine-attachments"] }
});
