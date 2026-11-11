import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight warranty-claims guide",
  routes: [
    ["en", "/resources/wholesale-free-weight-warranty-claims-guide"],
    ["pt-BR", "/pt/blog/garantia-pesos-livres-atacado-reclamacoes-pecas"],
    ["es", "/es/blog/garantia-pesas-mayorista-reclamaciones-repuestos"],
    ["de", "/de/blog/garantie-kraftgeraete-reklamation-ersatzteile"],
    ["fr", "/fr/blog/garantie-poids-libres-reclamation-pieces"],
    ["sv", "/sv/blog/garanti-fria-vikter-reklamation-reservdelar"],
    ["it", "/it/blog/garanzia-pesi-liberi-reclami-ricambi"],
    ["nl", "/nl/blog/garantie-vrije-gewichten-claims-onderdelen"],
    ["pl", "/pl/blog/gwarancja-wolne-ciezary-reklamacje-czesci"],
    ["vi", "/vi/blog/bao-hanh-ta-tu-do-ho-so-khieu-nai-linh-kien"],
    ["ar", "/ar/blog/warranty-free-weights-claims-spare-parts"],
    ["ko", "/ko/blog/free-weight-warranty-claims-spare-parts"],
    ["id", "/id/blog/garansi-free-weight-klaim-suku-cadang"]
  ],
  imageFragment: "/assets/resources/free-weight-warranty-claims/",
  heroSuffix: "free-weight-warranty-claims",
  artifactDirectory: "free-weight-warranty-claims-2026-11-10",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/factory", "/resources/olympic-barbell-maintenance-cleaning-guide", "/resources/are-cable-machine-attachments-universal"] }
});
