import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Dumbbell rack compatibility guide",
  copyFiles: [
    "dumbbell-rack-guide-copy-primary.json",
    "dumbbell-rack-guide-copy-eu.json",
    "dumbbell-rack-guide-copy-eu2.json",
    "dumbbell-rack-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/dumbbell-rack-compatibility/",
  heroSuffix: "dumbbell-rack-compatibility-guide",
  artifactDirectory: "dumbbell-rack-compatibility-2026-10-02"
});
