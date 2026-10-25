import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Weight plate markings guide",
  copyFiles: [
    "weight-plate-markings-guide-copy-primary.json",
    "weight-plate-markings-guide-copy-eu.json",
    "weight-plate-markings-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/weight-plate-markings/",
  heroSuffix: "weight-plate-markings-guide",
  artifactDirectory: "weight-plate-markings-2026-10-06"
});
