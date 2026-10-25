import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Barbell maintenance guide",
  copyFiles: [
    "barbell-maintenance-guide-copy-primary.json",
    "barbell-maintenance-guide-copy-eu.json",
    "barbell-maintenance-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/barbell-maintenance/",
  heroSuffix: "barbell-maintenance-guide",
  artifactDirectory: "barbell-maintenance-2026-10-23",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 4,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: {
    en: ["/resources/commercial-olympic-barbell-buying-guide", "/resources/olympic-barbell-coating-finish-guide"]
  }
});
