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
import { customPinkCpuCase } from "./custom-pink-cpu-case";
import { chromeDumbbellDistributorFulfillmentCase } from "./chrome-dumbbell-distributor-fulfillment-case";
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
import { withBumperPlateLoadingGuide } from "./bumper-plate-loading-guide";
import { withBarbellStraightnessGuide } from "./barbell-straightness-guide";
import { withBumperPlateBounceGuide } from "./bumper-plate-bounce-guide";
import { withCableAttachmentLoadGuide } from "./cable-attachment-load-guide";
import { withDumbbellHandleGuide } from "./dumbbell-handle-guide";
import { withPlateDiameterGuide } from "./plate-diameter-guide";
import { withRubberCoatingAdhesionGuide } from "./rubber-coating-adhesion-guide";
import { withBarbellShaftStrengthGuide } from "./barbell-shaft-strength-guide";
import { withCableAttachmentGripGuide } from "./cable-attachment-grip-guide";
import { withBumperPlateHubGuide } from "./bumper-plate-hub-guide";
import { withBarbellSleeveRetentionGuide } from "./barbell-sleeve-retention-guide";
import { withBarbellCollarGuide } from "./barbell-collar-guide";
import { withBarbellSleeveRotationGuide } from "./barbell-sleeve-rotation-guide";
import { withPlateGripOpeningsGuide } from "./plate-grip-openings-guide";
import { withTricepsRopeGuide } from "./triceps-rope-guide";
import { withLatPulldownBarGuide } from "./lat-pulldown-bar-guide";
import { withBarbellWhipGuide } from "./barbell-whip-guide";
import { withCastIronPlateFinishGuide } from "./cast-iron-plate-finish-guide";
import { withBarbellSleeveSurfaceGuide } from "./barbell-sleeve-surface-guide";
import { withCustomColorFreeWeightsGuide } from "./custom-color-free-weights-guide";
import { withBarbellMassGuide } from "./barbell-mass-guide";
import { withWeightPlateFlatnessGuide } from "./weight-plate-flatness-guide";
import { withChangePlatesGuide } from "./change-plates-guide";
import { withDumbbellRackGuide } from "./dumbbell-rack-guide";
import { withBarbellShaftDiameterGuide } from "./barbell-shaft-diameter-guide";
import { withRubberOdorGuide } from "./rubber-odor-guide";
import { withWeightPlateMarkingsGuide } from "./weight-plate-markings-guide";
import { withHexDumbbellAlignmentGuide } from "./hex-dumbbell-alignment-guide";
import { withCableAttachmentSwivelGuide } from "./cable-attachment-swivel-guide";
import { withCastIronPlateManufacturingGuide } from "./cast-iron-plate-manufacturing-guide";
import { withWeightPlateEdgeHandlingGuide } from "./weight-plate-edge-handling-guide";
import { withRubberDumbbellHardnessGuide } from "./rubber-dumbbell-hardness-guide";
import { withRubberDumbbellSurfaceGuide } from "./rubber-dumbbell-surface-bloom-guide";
import { withCableAttachmentFinishGuide } from "./cable-attachment-finish-guide";
import { withDumbbellEndCapGuide } from "./dumbbell-end-cap-guide";
import { withBarbellPackagingGuide } from "./barbell-packaging-guide";
import { withBarbellMaintenanceGuide } from "./barbell-maintenance-guide";
import { withUrethaneDumbbellSurfaceGuide } from "./urethane-dumbbell-surface-guide";
import { withNeopreneVinylDumbbellGuide } from "./neoprene-vinyl-dumbbell-guide";
import { withWeightPlateStorageGuide } from "./weight-plate-storage-guide";
import { withPrivateLabelGtinPackagingGuide } from "./private-label-gtin-packaging-guide";

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
const pinkCpuCaseManifest: ContentManifest = {
  ...customCaseManifest,
  entities: [...customCaseManifest.entities, customPinkCpuCase]
};
const chromeDistributorCaseManifest: ContentManifest = {
  ...pinkCpuCaseManifest,
  entities: [...pinkCpuCaseManifest.entities, chromeDumbbellDistributorFulfillmentCase]
};
const steelDumbbellManifest = withSteelDumbbellOemBlog(chromeDistributorCaseManifest);
const cableAttachmentManifest = withCableAttachmentCompatibilityGuide(steelDumbbellManifest);
const weightPlateToleranceManifest = withWeightPlateToleranceGuide(cableAttachmentManifest);
const commercialOlympicBarbellManifest = withCommercialOlympicBarbellGuide(weightPlateToleranceManifest);
const dumbbellHeadRetentionManifest = withDumbbellHeadRetentionGuide(commercialOlympicBarbellManifest);
const kgLbFreeWeightManifest = withKgLbFreeWeightGuide(dumbbellHeadRetentionManifest);
const fixedVsAdjustableDumbbellsManifest = withFixedVsAdjustableDumbbellsGuide(kgLbFreeWeightManifest);
const barbellFinishManifest = withBarbellFinishGuide(fixedVsAdjustableDumbbellsManifest);
const plateBarFitManifest = withPlateBarFitGuide(barbellFinishManifest);
const barbellKnurlingManifest = withBarbellKnurlingGuide(plateBarFitManifest);
const bumperPlateLoadingManifest = withBumperPlateLoadingGuide(barbellKnurlingManifest);
const barbellStraightnessManifest = withBarbellStraightnessGuide(bumperPlateLoadingManifest);
const bumperPlateBounceManifest = withBumperPlateBounceGuide(barbellStraightnessManifest);
const cableAttachmentLoadManifest = withCableAttachmentLoadGuide(bumperPlateBounceManifest);
const dumbbellHandleManifest = withDumbbellHandleGuide(cableAttachmentLoadManifest);
const plateDiameterManifest = withPlateDiameterGuide(dumbbellHandleManifest);
const rubberCoatingAdhesionManifest = withRubberCoatingAdhesionGuide(plateDiameterManifest);
const barbellShaftStrengthManifest = withBarbellShaftStrengthGuide(rubberCoatingAdhesionManifest);
const cableAttachmentGripManifest = withCableAttachmentGripGuide(barbellShaftStrengthManifest);
const bumperPlateHubManifest = withBumperPlateHubGuide(cableAttachmentGripManifest);
const barbellSleeveRetentionManifest = withBarbellSleeveRetentionGuide(bumperPlateHubManifest);
const barbellCollarManifest = withBarbellCollarGuide(barbellSleeveRetentionManifest);
const barbellSleeveRotationManifest = withBarbellSleeveRotationGuide(barbellCollarManifest);
const plateGripOpeningsManifest = withPlateGripOpeningsGuide(barbellSleeveRotationManifest);
const tricepsRopeManifest = withTricepsRopeGuide(plateGripOpeningsManifest);
const latPulldownBarManifest = withLatPulldownBarGuide(tricepsRopeManifest);
const barbellWhipManifest = withBarbellWhipGuide(latPulldownBarManifest);
const castIronPlateFinishManifest = withCastIronPlateFinishGuide(barbellWhipManifest);
const barbellSleeveSurfaceManifest = withBarbellSleeveSurfaceGuide(castIronPlateFinishManifest);
const customColorFreeWeightsManifest = withCustomColorFreeWeightsGuide(barbellSleeveSurfaceManifest);
const barbellMassManifest = withBarbellMassGuide(customColorFreeWeightsManifest);
const weightPlateFlatnessManifest = withWeightPlateFlatnessGuide(barbellMassManifest);
const changePlatesManifest = withChangePlatesGuide(weightPlateFlatnessManifest);
const dumbbellRackManifest = withDumbbellRackGuide(changePlatesManifest);
const barbellShaftDiameterManifest = withBarbellShaftDiameterGuide(dumbbellRackManifest);
const rubberOdorManifest = withRubberOdorGuide(barbellShaftDiameterManifest);
const weightPlateMarkingsManifest = withWeightPlateMarkingsGuide(rubberOdorManifest);
const hexDumbbellAlignmentManifest = withHexDumbbellAlignmentGuide(weightPlateMarkingsManifest);
const cableAttachmentSwivelManifest = withCableAttachmentSwivelGuide(hexDumbbellAlignmentManifest);
const castIronPlateManufacturingManifest = withCastIronPlateManufacturingGuide(cableAttachmentSwivelManifest);
const weightPlateEdgeHandlingManifest = withWeightPlateEdgeHandlingGuide(castIronPlateManufacturingManifest);
const rubberDumbbellHardnessManifest = withRubberDumbbellHardnessGuide(weightPlateEdgeHandlingManifest);
const rubberDumbbellSurfaceManifest = withRubberDumbbellSurfaceGuide(rubberDumbbellHardnessManifest);
const cableAttachmentFinishManifest = withCableAttachmentFinishGuide(rubberDumbbellSurfaceManifest);
const dumbbellEndCapManifest = withDumbbellEndCapGuide(cableAttachmentFinishManifest);
const barbellPackagingManifest = withBarbellPackagingGuide(dumbbellEndCapManifest);
const barbellMaintenanceManifest = withBarbellMaintenanceGuide(barbellPackagingManifest);
const urethaneDumbbellSurfaceManifest = withUrethaneDumbbellSurfaceGuide(barbellMaintenanceManifest);
const neopreneVinylDumbbellManifest = withNeopreneVinylDumbbellGuide(urethaneDumbbellSurfaceManifest);
const weightPlateStorageManifest = withWeightPlateStorageGuide(neopreneVinylDumbbellManifest);
const privateLabelGtinPackagingManifest = withPrivateLabelGtinPackagingGuide(weightPlateStorageManifest);

export const multilingualManifest: ContentManifest = withoutRetiredRacksBenches(
  privateLabelGtinPackagingManifest
);
