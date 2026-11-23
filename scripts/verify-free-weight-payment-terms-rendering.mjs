import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight payment-terms guide",
  routes: [
    ["en", "/resources/tt-vs-letter-of-credit-free-weight-order-guide"],
    ["pt-BR", "/pt/blog/tt-carta-credito-pagamento-importacao-halteres"],
    ["es", "/es/blog/tt-carta-credito-pago-importacion-pesas"],
    ["de", "/de/blog/tt-oder-akkreditiv-zahlung-freigewichte-import"],
    ["fr", "/fr/blog/tt-credit-documentaire-paiement-poids-libres"],
    ["vi", "/vi/blog/tt-lc-thanh-toan-nhap-khau-ta"],
    ["sv", "/sv/blogg/tt-eller-remburs-betalning-fria-vikter"],
    ["it", "/it/blog/tt-lettera-credito-pagamento-pesi-import"],
    ["nl", "/nl/blog/tt-of-letter-of-credit-betaling-gewichten"],
    ["ar", "/ar/blog/tt-khitab-etimad-dafaa-awzan"],
    ["ko", "/ko/blog/tt-lc-free-weight-payment-guide"],
    ["id", "/id/blog/tt-letter-of-credit-pembayaran-beban-bebas"],
    ["pl", "/pl/blog/tt-czy-akredytywa-platnosc-wolne-ciezary"],
  ],
  imageFragment: "/assets/resources/free-weight-payment-terms/",
  heroSuffix: "free-weight-payment-terms",
  artifactDirectory: "free-weight-payment-terms-2026-11-22",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: {
    en: [
      "/products/dumbbells",
      "/products/weight-plates",
      "/resources/commercial-free-weight-rfq-checklist",
      "/resources/pre-shipment-inspection-dumbbells-weight-plates",
      "/resources/exw-fob-cif-ddp-free-weight-import-guide",
      "/contact",
    ],
  },
});
