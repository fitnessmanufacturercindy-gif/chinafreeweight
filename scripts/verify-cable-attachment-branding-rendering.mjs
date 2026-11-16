import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Cable-attachment branding guide",
  routes: [
    ["en", "/resources/custom-logo-cable-attachments-private-label-guide"],
    ["pt-BR", "/pt/blog/logo-personalizado-puxadores-polia-marca-propria"],
    ["es", "/es/blog/logo-personalizado-agarres-polea-marca-propia"],
    ["de", "/de/blog/kabelzuggriffe-logo-private-label-markierung"],
    ["fr", "/fr/blog/logo-personnalise-poignees-poulie-marque-propre"],
    ["sv", "/sv/blogg/kabelhandtag-egen-logotyp-private-label"],
    ["it", "/it/blog/logo-personalizzato-maniglie-cavi-private-label"],
    ["nl", "/nl/blog/kabelgrepen-eigen-logo-private-label"],
    ["pl", "/pl/blog/uchwyty-wyciagu-logo-marka-wlasna"],
    ["vi", "/vi/blog/logo-rieng-tay-cam-keo-cap-nhan-hang-rieng"],
    ["ar", "/ar/blog/custom-logo-cable-handles-private-label"],
    ["ko", "/ko/blog/custom-logo-cable-machine-handles-private-label"],
    ["id", "/id/blog/handle-kabel-logo-kustom-private-label"]
  ],
  imageFragment: "/assets/resources/cable-attachment-branding/",
  heroSuffix: "cable-attachment-branding",
  artifactDirectory: "cable-attachment-branding-2026-11-14",
  expectedFaqCount: 5,
  expectedImageCount: 1,
  expectedH3Count: 0,
  allowMarkdownFaqLocales: ["en"],
  requiredProductLinks: { en: ["/products/gym-accessories", "/resources/are-cable-machine-attachments-universal", "/resources/cable-attachment-weld-quality-inspection-guide", "/contact"] }
});
