import type { ContentManifest } from "../../lib/content/types";
import { ptBrPilotManifest } from "./pt-br-pilot";
import { spanishPublishedVersions } from "./spanish-manifest";
import { getMultilingualBlogEntities } from "../../lib/content/multilingual-blog-files";
import { withGermanLocalization } from "./german-manifest";
import { withFrenchLocalization } from "./french-manifest";
import { withVietnameseLocalization } from "./vietnamese-manifest";
import { withSwedishLocalization } from "./swedish-manifest";

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

export const multilingualManifest: ContentManifest = withSwedishLocalization(withVietnameseLocalization(withFrenchLocalization(withGermanLocalization(baseManifest))));
