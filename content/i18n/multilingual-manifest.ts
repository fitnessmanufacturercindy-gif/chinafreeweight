import type { ContentManifest } from "../../lib/content/types";
import { ptBrPilotManifest } from "./pt-br-pilot";
import { spanishPublishedVersions } from "./spanish-manifest";

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

export const multilingualManifest: ContentManifest = { schemaVersion: 1, entities };
