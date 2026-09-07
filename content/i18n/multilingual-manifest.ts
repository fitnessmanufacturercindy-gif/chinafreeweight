import type { ContentEntity, ContentManifest } from "../../lib/content/types";
import { ptBrPilotManifest } from "./pt-br-pilot";
import { spanishPublishedVersions } from "./spanish-manifest";
import { getMultilingualBlogEntities } from "../../lib/content/multilingual-blog-files";
import { withGermanLocalization } from "./german-manifest";
import { withFrenchLocalization } from "./french-manifest";
import { withVietnameseLocalization } from "./vietnamese-manifest";
import { withSwedishLocalization } from "./swedish-manifest";
import { withItalianLocalization } from "./italian-manifest";
import { withKoreanLocalization } from "./korean-manifest";
import { withCommercialCompletionA } from "./commercial-completion-a";
import { withCommercialCompletionBC } from "./commercial-completion-bc";
import { withCommercialCompletionC } from "./commercial-completion-c";
import { withIndonesianLocalization } from "./indonesian-manifest";
import { withPolishLocalization } from "./polish-manifest";
import { withDutchLocalization } from "./dutch-manifest";
import { compactChromeDumbbellCase } from "./compact-chrome-dumbbell-case";
import { withCustomLogoFitnessChainCase } from "./custom-logo-fitness-chain-case";
import { withCommercialGrowthBlogs } from "./commercial-growth-blogs";
import { withSteelDumbbellOemBlog } from "./steel-dumbbell-oem-blog";
import { withCableAttachmentCompatibilityGuide } from "./cable-attachment-compatibility-guide";
import { withWeightPlateToleranceGuide } from "./weight-plate-tolerance-guide";
import { withCommercialOlympicBarbellGuide } from "./commercial-olympic-barbell-guide";
import { withDumbbellHeadRetentionGuide } from "./dumbbell-head-retention-guide";
import { withKgLbFreeWeightGuide } from "./kg-lb-free-weight-units-guide";
import { withFixedVsAdjustableDumbbellsGuide } from "./fixed-vs-adjustable-dumbbells-guide";
import { withBarbellFinishGuide } from "./barbell-finish-guide";
import { withPlateBarFitGuide } from "./plate-bar-fit-guide";
import { withBarbellKnurlingGuide } from "./barbell-knurling-guide";

const spanishById = new Map(spanishPublishedVersions.map((item) => [item.id, item.version]));

const entities = ptBrPilotManifest.entities.map((entity) => {
  const spanish = spanishById.get(entity.id);
  if (!spanish) return entity;
  spanishById.delete(entity.id);
  return { ...entity, versions: { ...entity.versions, es: spanish } };
});

if (spanishById.size) {
  throw new Error(`Spanish content references unknown entities: ${[...spanishById.keys()].join(", ")}`);
}

const expansionEntities = getMultilingualBlogEntities();
const existingIds = new Set(entities.map((entity) => entity.id));
for (const entity of expansionEntities) {
  if (existingIds.has(entity.id)) throw new Error(`Multilingual blog expansion duplicates entity: ${entity.id}`);
}

const baseManifest: ContentManifest = {
  schemaVersion: 1,
  entities: [...entities, ...expansionEntities]
};

function isRetiredRacksBenchesId(id: string) {
  return id === "racks-benches-category" || id.startsWith("product:racks:");
}

const retiredRacksBenchesPathFragments = [
  "/products/racks-benches",
  "/pt/produtos/racks-e-bancos",
  "/es/productos/racks-y-bancos",
  "/de/produkte/racks-hantelbaenke",
  "/fr/produits/racks-bancs",
  "/vi/san-pham/khung-ghe-tap",
  "/pl/produkty/stojaki-lawki",
  "/id/produk/rak-bangku",
  "/it/prodotti/rack-panche",
  "/ko/products/racks-benches",
  "/nl/producten/racks-banken",
  "/sv/produkter/rack-bank"
];

function isRetiredRacksBenchesPath(path?: string) {
  return Boolean(path && retiredRacksBenchesPathFragments.some((fragment) => path.includes(fragment)));
}

function isRetiredRacksBenchesEntity(entity: ContentEntity) {
  if (isRetiredRacksBenchesId(entity.id)) return true;
  return Object.values(entity.versions).some((version) => isRetiredRacksBenchesPath(version?.publicPath));
}

function withoutRetiredRacksBenches(manifest: ContentManifest): ContentManifest {
  return {
    ...manifest,
    entities: manifest.entities
      .filter((entity) => !isRetiredRacksBenchesEntity(entity))
      .map((entity) => ({
        ...entity,
        versions: Object.fromEntries(
          Object.entries(entity.versions).map(([locale, version]) => [
            locale,
            version
              ? {
                  ...version,
                  internalLinks: (version.internalLinks ?? []).filter(
                    (link) => !isRetiredRacksBenchesId(link.targetContentId)
                  )
                }
              : version
          ])
        ) as ContentEntity["versions"]
      }))
  };
}

const localizedManifest = withDutchLocalization(
  withPolishLocalization(
    withIndonesianLocalization(
      withCommercialCompletionC(
        withCommercialCompletionBC(
          withCommercialCompletionA(
            withKoreanLocalization(
              withItalianLocalization(
                withSwedishLocalization(
                  withVietnameseLocalization(withFrenchLocalization(withGermanLocalization(baseManifest)))
                )
              )
            )
          )
        )
      )
    )
  )
);

const growthManifest = withCommercialGrowthBlogs(localizedManifest);
const compactCaseManifest: ContentManifest = {
  ...growthManifest,
  entities: [...growthManifest.entities, compactChromeDumbbellCase]
};
const customCaseManifest = withCustomLogoFitnessChainCase(compactCaseManifest);
const steelDumbbellManifest = withSteelDumbbellOemBlog(customCaseManifest);
const cableAttachmentManifest = withCableAttachmentCompatibilityGuide(steelDumbbellManifest);
const weightPlateToleranceManifest = withWeightPlateToleranceGuide(cableAttachmentManifest);
const commercialOlympicBarbellManifest = withCommercialOlympicBarbellGuide(weightPlateToleranceManifest);
const dumbbellHeadRetentionManifest = withDumbbellHeadRetentionGuide(commercialOlympicBarbellManifest);
const kgLbFreeWeightManifest = withKgLbFreeWeightGuide(dumbbellHeadRetentionManifest);
const fixedVsAdjustableDumbbellsManifest = withFixedVsAdjustableDumbbellsGuide(kgLbFreeWeightManifest);
const barbellFinishManifest = withBarbellFinishGuide(fixedVsAdjustableDumbbellsManifest);
const plateBarFitManifest = withPlateBarFitGuide(barbellFinishManifest);
const barbellKnurlingManifest = withBarbellKnurlingGuide(plateBarFitManifest);

export const multilingualManifest: ContentManifest = withoutRetiredRacksBenches(
  barbellKnurlingManifest
);
