import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Bumper-plate hub-corrosion guide",
  routes: [
    ["en", "/resources/bumper-plate-hub-rust-corrosion-inspection-guide"],
    ["pt-BR", "/pt/blog/inspecao-ferrugem-anel-central-anilha-bumper"],
    ["es", "/es/blog/oxido-aro-central-disco-bumper-inspeccion"],
    ["de", "/de/blog/bumper-plates-innenring-rost-pruefen"],
    ["fr", "/fr/blog/disque-bumper-bague-centrale-rouille-inspection"],
    ["vi", "/vi/blog/kiem-tra-gi-vong-thep-ta-bumper"],
    ["sv", "/sv/blogg/bumpervikter-nav-rost-mottagningskontroll"],
    ["it", "/it/blog/ispezione-ruggine-anello-centrale-bumper-plate"],
    ["nl", "/nl/blog/roest-binnenring-bumper-plate-inspectie"],
    ["ar", "/ar/blog/bumper-plate-center-ring-rust-inspection"],
    ["ko", "/ko/blog/bumper-plate-hub-rust-inspection"],
    ["id", "/id/blog/inspeksi-karat-ring-tengah-bumper-plate"],
    ["pl", "/pl/blog/rdza-pierscien-talerza-bumper-kontrola"]
  ],
  imageFragment: "/assets/resources/bumper-plate-hub-corrosion/",
  heroSuffix: "bumper-plate-hub-inspection",
  artifactDirectory: "bumper-plate-hub-corrosion-2026-11-16",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: { en: ["/products/weight-plates", "/resources/bumper-plate-loose-insert-hub-retention-guide", "/contact"] }
});
