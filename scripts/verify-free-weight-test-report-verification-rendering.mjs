import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight test-report verification guide",
  copyFiles: ["free-weight-test-report-copy-primary.json", "free-weight-test-report-copy-eu.json", "free-weight-test-report-copy-apac.json"],
  imageFragment: "/assets/resources/free-weight-test-report-verification/",
  heroSuffix: "free-weight-test-report-verification",
  artifactDirectory: "free-weight-test-report-verification-2026-11-07",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/factory", "/resources/oem-free-weight-sample-approval-process"] }
});
