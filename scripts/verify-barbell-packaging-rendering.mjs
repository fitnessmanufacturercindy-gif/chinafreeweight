import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Barbell packaging guide",
  copyFiles: [
    "barbell-packaging-guide-copy-primary.json",
    "barbell-packaging-guide-copy-eu.json",
    "barbell-packaging-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/barbell-export-packaging/",
  heroSuffix: "barbell-export-packaging-guide",
  artifactDirectory: "barbell-packaging-2026-10-22",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: {
    en: ["/resources/commercial-olympic-barbell-buying-guide", "/resources/olympic-barbell-straightness-sleeve-wobble-inspection"]
  }
});
