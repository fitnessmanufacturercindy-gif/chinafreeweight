import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Low-odor rubber free-weight guide",
  copyFiles: ["rubber-odor-guide-copy.json"],
  imageFragment: "/assets/resources/rubber-odor/",
  heroSuffix: "low-odor-rubber-free-weights-guide",
  artifactDirectory: "rubber-odor-2026-10-05"
});
