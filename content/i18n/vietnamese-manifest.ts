import type { ContentEntity, ContentManifest } from "../../lib/content/types";
import { vietnameseCorePages, vietnameseCoreVersion } from "./vietnamese-core-pages";
import { vietnameseGuideProfiles, vietnameseGuideVersion } from "./vietnamese-guides";
import { englishPathForVietnameseProduct, shadowEnglishVersionForVietnamese, vietnameseProductProfiles, vietnameseVersionForProfile } from "./vietnamese-products";

function addVersion(entity: ContentEntity, version: ContentEntity["versions"]["vi"]): ContentEntity {
  if (!version) return entity;
  if (entity.versions.vi) throw new Error(`Vietnamese localization duplicates entity ${entity.id}`);
  return { ...entity, versions: { ...entity.versions, vi: version } };
}

export function withVietnameseLocalization(manifest: ContentManifest): ContentManifest {
  const entities=manifest.entities.map((entity)=>({...entity,versions:{...entity.versions}}));
  const byId=new Map(entities.map((entity)=>[entity.id,entity]));
  const byEnglishPath=new Map(entities.flatMap((entity)=>entity.versions.en?.publicPath?[[entity.versions.en.publicPath,entity] as const]:[]));
  for(const page of vietnameseCorePages){const entity=byId.get(page.id);if(!entity)throw new Error(`Vietnamese core page references unknown entity ${page.id}`);Object.assign(entity,addVersion(entity,vietnameseCoreVersion(page)));}
  for(const profile of vietnameseGuideProfiles){const entity=byId.get(profile.id)??byEnglishPath.get(profile.enPath);if(!entity)throw new Error(`Vietnamese guide references unknown English path ${profile.enPath}`);Object.assign(entity,addVersion(entity,vietnameseGuideVersion(profile)));}
  for(const profile of vietnameseProductProfiles){const englishPath=englishPathForVietnameseProduct(profile);const entity=byEnglishPath.get(englishPath);if(entity){Object.assign(entity,addVersion(entity,vietnameseVersionForProfile(profile)));continue;}const id=`product:${profile.category}:${profile.source.slug}`;if(byId.has(id))throw new Error(`Vietnamese product entity duplicates ${id}`);const created:ContentEntity={id,type:"product",defaultLocale:"en",versions:{en:shadowEnglishVersionForVietnamese(profile),vi:vietnameseVersionForProfile(profile)}};entities.push(created);byId.set(id,created);byEnglishPath.set(englishPath,created);}
  return {...manifest,entities};
}
