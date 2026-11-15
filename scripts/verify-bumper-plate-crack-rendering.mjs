import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Bumper-plate crack inspection guide",
  routes: [
    ["en", "/resources/bumper-plate-cracks-edge-splits-inspection-guide"],
    ["pt-BR", "/pt/blog/trincas-rachaduras-anilha-bumper-inspecao"],
    ["es", "/es/blog/grietas-roturas-disco-bumper-inspeccion"],
    ["de", "/de/blog/bumper-plate-risse-kantenbruch-pruefen"],
    ["fr", "/fr/blog/fissures-dechirures-disques-bumper-controle"],
    ["sv", "/sv/blogg/sprickor-kantskador-bumpervikter-kontroll"],
    ["it", "/it/blog/crepe-spaccature-bumper-plate-ispezione"],
    ["nl", "/nl/blog/scheuren-randschade-bumper-plates-inspectie"],
    ["pl", "/pl/blog/pekniecia-odpryski-talerze-bumper-kontrola"],
    ["vi", "/vi/blog/kiem-tra-nut-tach-mep-bumper-plate"],
    ["ar", "/ar/blog/fuhus-shuqooq-tashaqquq-hawaf-bumper-plate"],
    ["ko", "/ko/blog/bumper-plate-crack-edge-split-inspection"],
    ["id", "/id/blog/inspeksi-retak-pecah-tepi-bumper-plate"]
  ],
  imageFragment: "/assets/resources/bumper-plate-crack-inspection/",
  heroSuffix: "bumper-plate-crack-inspection",
  artifactDirectory: "bumper-plate-crack-inspection-2026-11-13",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: { en: ["/products/weight-plates", "/resources/how-are-bumper-plates-made", "/resources/bumper-plate-loose-insert-hub-retention-guide", "/contact"] }
});
