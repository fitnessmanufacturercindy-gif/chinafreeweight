import type { ContentEntity, ContentManifest } from "../../lib/content/types";
import { swedishCorePages, swedishCoreVersion } from "./swedish-core-pages";
import { swedishGuideProfiles, swedishGuideVersion } from "./swedish-guides";
import { englishPathForSwedishProduct, swedishProductProfiles, swedishVersionForProduct } from "./swedish-products";

function addVersion(entity:ContentEntity,version:ContentEntity["versions"]["sv"]):ContentEntity{
  if(!version)return entity;
  if(entity.versions.sv)throw new Error(`Swedish localization duplicates entity ${entity.id}`);
  return {...entity,versions:{...entity.versions,sv:version}};
}

export function withSwedishLocalization(manifest:ContentManifest):ContentManifest{
  const entities=manifest.entities.map((entity)=>({...entity,versions:{...entity.versions}}));
  const byId=new Map(entities.map((entity)=>[entity.id,entity]));
  const byEnglishPath=new Map(entities.flatMap((entity)=>entity.versions.en?.publicPath?[[entity.versions.en.publicPath,entity] as const]:[]));
  for(const page of swedishCorePages){const entity=byId.get(page.id);if(!entity)throw new Error(`Swedish core page references unknown entity ${page.id}`);Object.assign(entity,addVersion(entity,swedishCoreVersion(page)));}
  for(const profile of swedishGuideProfiles){const entity=byId.get(profile.id)??byEnglishPath.get(profile.enPath);if(!entity)throw new Error(`Swedish guide references unknown English path ${profile.enPath}`);Object.assign(entity,addVersion(entity,swedishGuideVersion(profile)));}
  for(const profile of swedishProductProfiles){const englishPath=englishPathForSwedishProduct(profile);const entity=byEnglishPath.get(englishPath);if(!entity)throw new Error(`Swedish product references unknown English path ${englishPath}`);Object.assign(entity,addVersion(entity,swedishVersionForProduct(profile)));}
  return {...manifest,entities};
}
