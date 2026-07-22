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
import { getAutomatedContentEntities } from "../../lib/content/automated-content";

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

const localizedManifest = withIndonesianLocalization(withCommercialCompletionC(withCommercialCompletionBC(withCommercialCompletionA(withKoreanLocalization(withItalianLocalization(withSwedishLocalization(withVietnameseLocalization(withFrenchLocalization(withGermanLocalization(baseManifest))))))))));
const automatedEntities = getAutomatedContentEntities();
const localizedIds = new Set(localizedManifest.entities.map((entity) => entity.id));
const localizedPaths = new Set(localizedManifest.entities.flatMap((entity) => Object.values(entity.versions).filter(Boolean).map((version) => `${version!.locale}:${version!.publicPath}`)));

for (const entity of automatedEntities) {
  if (localizedIds.has(entity.id)) throw new Error(`Automated content duplicates entity: ${entity.id}`);
  for (const version of Object.values(entity.versions).filter(Boolean)) {
    const key = `${version!.locale}:${version!.publicPath}`;
    if (localizedPaths.has(key)) throw new Error(`Automated content duplicates public path: ${key}`);
    localizedPaths.add(key);
  }
  localizedIds.add(entity.id);
}

export const multilingualManifest: ContentManifest = {
  schemaVersion: 1,
  entities: [...localizedManifest.entities, ...automatedEntities],
};
