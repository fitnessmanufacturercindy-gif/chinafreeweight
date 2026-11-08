import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight tooling agreement guide",
  copyFiles: ["free-weight-tooling-agreement-copy-primary.json", "free-weight-tooling-agreement-copy-eu.json", "free-weight-tooling-agreement-copy-apac.json"],
  imageFragment: "/assets/resources/free-weight-tooling-agreement/",
  heroSuffix: "free-weight-tooling-agreement",
  artifactDirectory: "free-weight-tooling-2026-11-08",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/factory", "/products"] }
});
