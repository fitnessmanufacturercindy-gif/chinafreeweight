import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Change plates and fractional plates guide",
  copyFiles: [
    "change-plates-guide-copy-primary.json",
    "change-plates-guide-copy-eu.json",
    "change-plates-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/change-plates/",
  heroSuffix: "change-plates-fractional-plates-guide",
  artifactDirectory: "change-plates-2026-10-01"
});
