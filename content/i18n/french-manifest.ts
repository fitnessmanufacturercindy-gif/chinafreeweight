import type { ContentEntity, ContentManifest } from "../../lib/content/types";
import { frenchCorePages, frenchCoreVersion } from "./french-core-pages";
import { frenchGuideProfiles, frenchGuideVersion } from "./french-guides";
import { englishPathForFrenchProduct, frenchProductProfiles, frenchVersionForProfile, shadowEnglishVersionForFrench } from "./french-products";

function addVersion(entity: ContentEntity, version: ContentEntity["versions"]["fr"]): ContentEntity {
  if (!version) return entity;
  if (entity.versions.fr) throw new Error(`French localization duplicates entity ${entity.id}`);
  return { ...entity, versions: { ...entity.versions, fr: version } };
}

export function withFrenchLocalization(manifest: ContentManifest): ContentManifest {
  const entities = manifest.entities.map((entity) => ({ ...entity, versions: { ...entity.versions } }));
  const byId = new Map(entities.map((entity) => [entity.id, entity]));
  const byEnglishPath = new Map(entities.flatMap((entity) => entity.versions.en?.publicPath ? [[entity.versions.en.publicPath, entity] as const] : []));

  for (const page of frenchCorePages) {
    const entity = byId.get(page.id);
    if (!entity) throw new Error(`French core page references unknown entity ${page.id}`);
    Object.assign(entity, addVersion(entity, frenchCoreVersion(page)));
  }

  for (const profile of frenchGuideProfiles) {
    const entity = byId.get(profile.id) ?? byEnglishPath.get(profile.enPath);
    if (!entity) throw new Error(`French guide references unknown English path ${profile.enPath}`);
    Object.assign(entity, addVersion(entity, frenchGuideVersion(profile)));
  }

  for (const profile of frenchProductProfiles) {
    const englishPath = englishPathForFrenchProduct(profile);
    const entity = byEnglishPath.get(englishPath);
    if (entity) {
      Object.assign(entity, addVersion(entity, frenchVersionForProfile(profile)));
      continue;
    }
    const id = `product:${profile.category}:${profile.source.slug}`;
    if (byId.has(id)) throw new Error(`French product entity duplicates ${id}`);
    const created: ContentEntity = { id, type: "product", defaultLocale: "en", versions: { en: shadowEnglishVersionForFrench(profile), fr: frenchVersionForProfile(profile) } };
    entities.push(created); byId.set(id, created); byEnglishPath.set(englishPath, created);
  }
  return { ...manifest, entities };
}
