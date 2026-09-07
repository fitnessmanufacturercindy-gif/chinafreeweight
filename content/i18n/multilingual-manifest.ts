import { withKgLbFreeWeightGuide } from "./kg-lb-free-weight-units-guide";
import { withFixedVsAdjustableDumbbellsGuide } from "./fixed-vs-adjustable-dumbbells-guide";
import { withBarbellFinishGuide } from "./barbell-finish-guide";
import { withPlateBarFitGuide } from "./plate-bar-fit-guide";
import { withBarbellKnurlingGuide } from "./barbell-knurling-guide";
import type { ContentManifest } from "../../lib/content/types";
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

const localizedManifest = withDutchLocalization(withPolishLocalization(withIndonesianLocalization(withCommercialCompletionC(withCommercialCompletionBC(withCommercialCompletionA(withKoreanLocalization(withItalianLocalization(withSwedishLocalization(withVietnameseLocalization(withFrenchLocalization(withGermanLocalization(baseManifest))))))))))));
const growthManifest = withCommercialGrowthBlogs(localizedManifest);
const caseManifest: ContentManifest = {
  ...growthManifest,
  entities: [...growthManifest.entities, compactChromeDumbbellCase]
};
const customCaseManifest = withCustomLogoFitnessChainCase(caseManifest);
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

const retiredContentIds = new Set([
  "racks-benches-category",
  "product:racks:power-rack-functional-trainer",
  "product:racks:smith-machine",
  "product:racks:commercial-adjustable-bench",
  "product:racks:multi-jungle-training-system"
]);
const retiredPathFragments = [
  "/products/racks-benches",
  "/produtos/racks-e-bancos",
  "/productos/racks-y-bancos",
  "/produkte/racks-hantelbaenke",
  "/produits/racks-bancs",
  "/san-pham/khung-ghe-tap",
  "/produkty/stojaki-lawki",
  "/id/produk/rak-bangku",
  "/it/prodotti/rack-panche",
  "/ko/products/racks-benches",
  "/nl/producten/racks-banken",
  "/sv/produkter/rack-bank"
];

function isRetiredPath(path = "") {
  return retiredPathFragments.some((fragment) => path.includes(fragment));
}

function removeRetiredRacksBenches(manifest: ContentManifest): ContentManifest {
  return {
    ...manifest,
    entities: manifest.entities
      .filter((entity) => !retiredContentIds.has(entity.id))
      .map((entity) => {
        const versions = Object.fromEntries(
          Object.entries(entity.versions)
            .filter(([, version]) => !version || !isRetiredPath(version.publicPath))
            .map(([locale, version]) => [
              locale,
              version
                ? {
                    ...version,
                    internalLinks: version.internalLinks.filter((link) => !retiredContentIds.has(link.targetContentId))
                  }
                : version
            ])
        ) as typeof entity.versions;

        return { ...entity, versions };
      })
      .filter((entity) => Object.keys(entity.versions).length > 0)
  };
}

export const multilingualManifest: ContentManifest = removeRetiredRacksBenches({
  ...barbellKnurlingManifest,
  entities: barbellKnurlingManifest.entities
});
