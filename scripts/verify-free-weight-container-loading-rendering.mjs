import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Free-weight container-loading guide",
  routes: [
    ["en", "/resources/how-many-dumbbells-fit-container-loading-guide"],
    ["pt-BR", "/pt/blog/plano-carga-container-halteres-anilhas"],
    ["es", "/es/blog/plan-carga-contenedor-mancuernas-discos"],
    ["de", "/de/blog/container-beladeplan-hanteln-hantelscheiben"],
    ["fr", "/fr/blog/plan-chargement-conteneur-halteres-disques"],
    ["sv", "/sv/blogg/container-lastplan-hantlar-viktskivor"],
    ["it", "/it/blog/piano-carico-container-manubri-dischi"],
    ["nl", "/nl/blog/container-laadplan-dumbbells-halterschijven"],
    ["pl", "/pl/blog/plan-zaladunku-kontenera-hantle-obciazenia"],
    ["vi", "/vi/blog/ke-hoach-xep-container-ta-dia-tap"],
    ["ar", "/ar/blog/khottat-tahmil-hawia-dumbbell-plates"],
    ["ko", "/ko/blog/free-weight-container-loading-plan"],
    ["id", "/id/blog/rencana-muat-kontainer-dumbbell-plate"]
  ],
  imageFragment: "/assets/resources/free-weight-container-loading/",
  heroSuffix: "free-weight-container-loading",
  artifactDirectory: "free-weight-container-loading-2026-11-11",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  requiredProductLinks: { en: ["/factory", "/resources/export-packaging-dumbbells-weight-plates", "/products/dumbbells", "/products/weight-plates"] }
});
