import type { ContentEntity, ContentManifest } from "../../lib/content/types";
import { germanCorePages, germanCoreVersion } from "./german-core-pages";
import { germanGuideProfiles, germanGuideVersion } from "./german-guides";
import { englishPathForGermanProduct, germanProductProfiles, germanVersionForProfile, shadowEnglishVersion } from "./german-products";

function addVersion(entity: ContentEntity, version: ContentEntity["versions"]["de"]): ContentEntity {
  if (!version) return entity;
  if (entity.versions.de) throw new Error(`German localization duplicates entity ${entity.id}`);
  return { ...entity, versions: { ...entity.versions, de: version } };
}

export function withGermanLocalization(manifest: ContentManifest): ContentManifest {
  const entities = manifest.entities.map((entity) => ({ ...entity, versions: { ...entity.versions } }));
  const byId = new Map(entities.map((entity) => [entity.id, entity]));
  const byEnglishPath = new Map(entities.flatMap((entity) => {
    const path = entity.versions.en?.publicPath;
    return path ? [[path, entity] as const] : [];
  }));

  for (const page of germanCorePages) {
    const entity = byId.get(page.id);
    if (!entity) throw new Error(`German core page references unknown entity ${page.id}`);
    const updated = addVersion(entity, germanCoreVersion(page));
    Object.assign(entity, updated);
  }

  for (const profile of germanGuideProfiles) {
    const entity = byId.get(profile.id) ?? byEnglishPath.get(profile.enPath);
    if (!entity) throw new Error(`German guide references unknown English path ${profile.enPath}`);
    const updated = addVersion(entity, germanGuideVersion(profile));
    Object.assign(entity, updated);
  }

  for (const profile of germanProductProfiles) {
    const englishPath = englishPathForGermanProduct(profile);
    const existing = byEnglishPath.get(englishPath);
    if (existing) {
      const updated = addVersion(existing, germanVersionForProfile(profile));
      Object.assign(existing, updated);
      continue;
    }

    const id = `product:${profile.category}:${profile.source.slug}`;
    if (byId.has(id)) throw new Error(`German product entity duplicates ${id}`);
    const entity: ContentEntity = {
      id,
      type: "product",
      defaultLocale: "en",
      versions: { en: shadowEnglishVersion(profile), de: germanVersionForProfile(profile) }
    };
    entities.push(entity);
    byId.set(id, entity);
    byEnglishPath.set(englishPath, entity);
  }

  return { ...manifest, entities };
}

