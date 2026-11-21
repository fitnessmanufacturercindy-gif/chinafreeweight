import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight Incoterms guide",
  routes: [
    ["en", "/resources/exw-fob-cif-ddp-free-weight-import-guide"],
    ["pt-BR", "/pt/blog/exw-fob-cif-ddp-importacao-halteres-anilhas"],
    ["es", "/es/blog/exw-fob-cif-ddp-importar-mancuernas-discos"],
    ["de", "/de/blog/exw-fob-cif-ddp-hanteln-hantelscheiben-import"],
    ["fr", "/fr/blog/exw-fob-cif-ddp-import-halteres-disques"],
    ["vi", "/vi/blog/exw-fob-cif-ddp-nhap-khau-ta-tay-banh-ta"],
    ["sv", "/sv/blogg/exw-fob-cif-ddp-import-hantlar-viktskivor"],
    ["it", "/it/blog/exw-fob-cif-ddp-importare-manubri-dischi"],
    ["nl", "/nl/blog/exw-fob-cif-ddp-dumbbells-halterschijven-importeren"],
    ["ar", "/ar/blog/exw-fob-cif-ddp-import-free-weights-china"],
    ["ko", "/ko/blog/exw-fob-cif-ddp-free-weight-import-guide"],
    ["id", "/id/blog/exw-fob-cif-ddp-impor-dumbbell-weight-plate"],
    ["pl", "/pl/blog/exw-fob-cif-ddp-import-hantli-obciazen"]
  ],
  imageFragment: "/assets/resources/free-weight-incoterms/",
  heroSuffix: "free-weight-incoterms",
  artifactDirectory: "free-weight-incoterms-2026-11-20",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: { en: ["/products/dumbbells", "/products/weight-plates", "/resources/landed-cost-wholesale-free-weights", "/contact"] }
});
