import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Olympic barbell shaft diameter guide",
  copyFiles: ["barbell-shaft-diameter-guide-copy.json"],
  imageFragment: "/assets/resources/barbell-shaft-diameter/",
  heroSuffix: "barbell-shaft-diameter-guide",
  artifactDirectory: "barbell-shaft-diameter-2026-10-04"
});
