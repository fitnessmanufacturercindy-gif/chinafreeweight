import type { MetadataRoute } from "next";
import { getLocaleByInternalLocale, type InternalLocale } from "../../i18n/locale-registry";
import type { ContentRepository } from "../content/repository";
import type { ContentType } from "../content/types";

export type SitemapGroup = "pages" | "products" | "blogs" | "cases" | "landings";

export type MediaSitemapRecord = {
  loc: string;
  lastmod: string;
  locale: InternalLocale;
  images: Array<{ loc: string; caption: string }>;
  videos: Array<{ thumbnailLoc: string; title: string; description: string; contentLoc?: string }>;
};

export function groupForType(type: ContentType): SitemapGroup {
  if (type === "product" || type === "product_category") return "products";
  if (type === "blog" || type === "blog_index") return "blogs";
  if (type === "case" || type === "case_index" || type === "projects") return "cases";
  if (type === "landing") return "landings";
  return "pages";
}

export function buildPublishedSitemap(
  repository: ContentRepository,
  siteUrl: string,
  filters?: { locale?: InternalLocale; group?: SitemapGroup }
): MetadataRoute.Sitemap {
  return repository.listPublished({ locale: filters?.locale }).flatMap(({ entity, version }) => {
    const locale = getLocaleByInternalLocale(version.locale);
    if (!locale?.public || version.canonicalData.noindex || (filters?.group && groupForType(entity.type) !== filters.group)) {
      return [];
    }
    const alternatePairs = repository.getPublishedVersions(entity.id).flatMap(({ version: alternateVersion }) => {
      const alternateLocale = getLocaleByInternalLocale(alternateVersion.locale);
      return alternateLocale?.public && alternateVersion.hreflangData.include
        ? [[alternateLocale.hreflang, new URL(alternateVersion.publicPath, `${siteUrl.replace(/\/$/, "")}/`).toString()]]
        : [];
    });
    const english = repository.getPublishedVersion(entity.id, "en");
    if (english) {
      alternatePairs.push(["x-default", new URL(english.version.publicPath, `${siteUrl.replace(/\/$/, "")}/`).toString()]);
    }
    const alternates = Object.fromEntries(
      alternatePairs
    );
    return [{
      url: new URL(version.publicPath, `${siteUrl.replace(/\/$/, "")}/`).toString(),
      lastModified: new Date(version.updatedAt),
      changeFrequency: entity.type === "blog" ? "monthly" as const : "weekly" as const,
      images: version.images.map((image) => new URL(image.src, `${siteUrl.replace(/\/$/, "")}/`).toString()),
      alternates: Object.keys(alternates).length ? { languages: alternates } : undefined
    }];
  });
}

export function buildPublishedMediaSitemap(
  repository: ContentRepository,
  siteUrl: string,
  filters?: { locale?: InternalLocale; group?: SitemapGroup }
): MediaSitemapRecord[] {
  const baseUrl = `${siteUrl.replace(/\/$/, "")}/`;
  return repository.listPublished({ locale: filters?.locale }).flatMap(({ entity, version }) => {
    const locale = getLocaleByInternalLocale(version.locale);
    if (!locale?.public || version.canonicalData.noindex || (filters?.group && groupForType(entity.type) !== filters.group)) return [];
    return [{
      loc: new URL(version.publicPath, baseUrl).toString(),
      lastmod: version.updatedAt,
      locale: version.locale,
      images: version.images.map((image) => ({ loc: new URL(image.src, baseUrl).toString(), caption: image.alt })),
      videos: (version.schemaData.videos ?? []).map((video) => ({
        thumbnailLoc: new URL(video.thumbnailUrl, baseUrl).toString(),
        title: video.name,
        description: video.description,
        contentLoc: video.contentUrl ? new URL(video.contentUrl, baseUrl).toString() : undefined
      }))
    }];
  });
}
