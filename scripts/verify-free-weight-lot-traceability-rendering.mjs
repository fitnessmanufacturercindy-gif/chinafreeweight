import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight lot-traceability guide",
  routes: [
    ["en", "/resources/free-weight-lot-batch-traceability-guide"],
    ["pt-BR", "/pt/blog/rastreabilidade-lote-halteres-anilhas-oem"],
    ["es", "/es/blog/trazabilidad-lotes-pesas-libres-oem"],
    ["de", "/de/blog/chargenrueckverfolgbarkeit-freigewichte-oem"],
    ["fr", "/fr/blog/tracabilite-lots-halteres-disques-oem"],
    ["vi", "/vi/blog/truy-xuat-lo-ta-tay-banh-ta-oem"],
    ["sv", "/sv/blogg/sparbarhet-partinummer-fria-vikter-oem"],
    ["it", "/it/blog/tracciabilita-lotti-pesi-liberi-oem"],
    ["nl", "/nl/blog/traceerbaarheid-batches-vrije-gewichten-oem"],
    ["ar", "/ar/blog/tatabue-dafaat-awzan-hurra-oem"],
    ["ko", "/ko/blog/oem-free-weight-lot-traceability"],
    ["id", "/id/blog/ketertelusuran-batch-beban-bebas-oem"],
    ["pl", "/pl/blog/identyfikowalnosc-partii-wolne-ciezary-oem"],
  ],
  imageFragment: "/assets/resources/free-weight-lot-traceability/",
  heroSuffix: "free-weight-lot-traceability",
  artifactDirectory: "free-weight-lot-traceability-2026-11-24",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: {
    en: [
      "/products/dumbbells",
      "/products/weight-plates",
      "/resources/oem-free-weight-sample-approval-process",
      "/resources/free-weight-aql-inspection-defect-classification-guide",
      "/resources/free-weight-reorder-batch-consistency",
      "/contact",
    ],
  },
});
