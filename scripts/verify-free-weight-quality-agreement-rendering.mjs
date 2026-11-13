import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight quality-agreement guide",
  routes: [
    ["en", "/resources/oem-free-weight-supplier-quality-agreement-guide"],
    ["pt-BR", "/pt/blog/acordo-qualidade-fornecedor-pesos-livres"],
    ["es", "/es/blog/acuerdo-calidad-proveedor-pesas-oem"],
    ["de", "/de/blog/qualitaetssicherungsvereinbarung-hanteln-gewichte"],
    ["fr", "/fr/blog/accord-qualite-fournisseur-poids-libres"],
    ["sv", "/sv/blogg/kvalitetsavtal-leverantor-fria-vikter"],
    ["it", "/it/blog/accordo-qualita-fornitore-pesi-oem"],
    ["nl", "/nl/blog/kwaliteitsovereenkomst-leverancier-vrije-gewichten"],
    ["pl", "/pl/blog/umowa-jakosciowa-dostawca-wolne-ciezary"],
    ["vi", "/vi/blog/thoa-thuan-chat-luong-nha-cung-cap-ta"],
    ["ar", "/ar/blog/ittifaqiyat-jawdat-muwarrid-awzan-hurra"],
    ["ko", "/ko/blog/oem-free-weight-supplier-quality-agreement"],
    ["id", "/id/blog/perjanjian-kualitas-pemasok-free-weight"]
  ],
  imageFragment: "/assets/resources/free-weight-quality-agreement/",
  heroSuffix: "free-weight-quality-agreement",
  artifactDirectory: "free-weight-quality-agreement-2026-11-12",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/factory", "/resources/commercial-free-weight-rfq-checklist", "/resources/oem-free-weight-sample-approval-process", "/contact"] }
});
