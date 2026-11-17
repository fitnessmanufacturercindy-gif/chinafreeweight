import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Rubber-dumbbell mold-defect guide",
  routes: [
    ["en", "/resources/rubber-dumbbell-mold-line-flash-inspection-guide"],
    ["pt-BR", "/pt/blog/linha-molde-rebarba-halter-emborrachado-inspecao"],
    ["es", "/es/blog/linea-molde-rebaba-mancuerna-caucho-inspeccion"],
    ["de", "/de/blog/formtrennnaht-grat-gummihantel-pruefen"],
    ["fr", "/fr/blog/ligne-moulage-bavure-haltere-caoutchouc-controle"],
    ["vi", "/vi/blog/duong-khuon-via-thua-ta-tay-cao-su-kiem-tra"],
    ["sv", "/sv/blogg/gjutskarv-grad-gummihantlar-kontroll"],
    ["it", "/it/blog/linea-stampo-bava-manubri-gomma-controllo"],
    ["nl", "/nl/blog/gietnaad-braam-rubber-dumbbells-inspectie"],
    ["ar", "/ar/blog/rubber-dumbbell-mold-line-flash-inspection"],
    ["ko", "/ko/blog/rubber-dumbbell-mold-line-flash-inspection"],
    ["id", "/id/blog/garis-cetakan-flash-dumbbell-karet-inspeksi"],
    ["pl", "/pl/blog/linia-podzialu-nadlew-hantle-gumowe-kontrola"]
  ],
  imageFragment: "/assets/resources/rubber-dumbbell-mold-inspection/",
  heroSuffix: "rubber-dumbbell-mold-inspection",
  artifactDirectory: "rubber-dumbbell-mold-inspection-2026-11-15",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: { en: ["/products/dumbbells", "/resources/rubber-coating-peeling-cracking-inspection", "/resources/free-weight-aql-inspection-defect-classification-guide", "/contact"] }
});
