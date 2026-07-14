import { ptBrPilotManifest } from "../../content/i18n/pt-br-pilot";
import type { InternalLocale } from "../../i18n/locale-registry";
import { normalizePath } from "../i18n/paths";
import {
  isPublishedVersion,
  type ContentEntity,
  type ContentManifest,
  type ContentType,
  type PublishedContent
} from "./types";

export type ContentRepository = {
  getEntity(id: string): ContentEntity | undefined;
  resolvePublishedPath(locale: InternalLocale, publicPath: string): PublishedContent | undefined;
  getPublishedVersion(id: string, locale: InternalLocale): PublishedContent | undefined;
  getPublishedVersions(id: string): PublishedContent[];
  listPublished(filters?: { locale?: InternalLocale; type?: ContentType }): PublishedContent[];
};

export function createContentRepository(manifest: ContentManifest): ContentRepository {
  const entitiesById = new Map(manifest.entities.map((entity) => [entity.id, entity]));
  const publishedByPath = new Map<string, PublishedContent>();
  const allPublished: PublishedContent[] = [];

  for (const entity of manifest.entities) {
    for (const version of Object.values(entity.versions)) {
      if (!isPublishedVersion(version)) continue;
      const published = { entity, version };
      publishedByPath.set(`${version.locale}:${normalizePath(version.publicPath)}`, published);
      allPublished.push(published);
    }
  }

  return {
    getEntity(id) {
      return entitiesById.get(id);
    },
    resolvePublishedPath(locale, publicPath) {
      return publishedByPath.get(`${locale}:${normalizePath(publicPath)}`);
    },
    getPublishedVersion(id, locale) {
      const entity = entitiesById.get(id);
      const version = entity?.versions[locale];
      return entity && isPublishedVersion(version) ? { entity, version } : undefined;
    },
    getPublishedVersions(id) {
      const entity = entitiesById.get(id);
      if (!entity) return [];
      return Object.values(entity.versions)
        .filter(isPublishedVersion)
        .map((version) => ({ entity, version }));
    },
    listPublished(filters) {
      return allPublished.filter(({ entity, version }) => {
        if (filters?.locale && version.locale !== filters.locale) return false;
        if (filters?.type && entity.type !== filters.type) return false;
        return true;
      });
    }
  };
}

export const contentRepository = createContentRepository(ptBrPilotManifest);
