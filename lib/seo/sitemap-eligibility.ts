import { isRetiredRacksBenchesEntity, isRetiredRacksBenchesPath } from "../content/retired-racks-benches";
import type { ContentRepository } from "../content/repository";
import type { PublishedContent } from "../content/types";
import { normalizePath } from "../i18n/paths";
import { decideLocaleRequest } from "../i18n/request-policy";

export function sitemapPageUrl(path: string, siteUrl: string): string {
  const url = new URL(path, siteUrl);
  // Next's canonical metadata serializes the homepage as the bare origin.
  return url.pathname === "/" ? url.origin : url.href;
}

export function isSitemapPagePath(path: string): boolean {
  return path.startsWith("/") &&
    !/[.?#%\\]/.test(path) &&
    path === normalizePath(path) &&
    !/^\/(?:assets|api|_next)(?:\/|$)/.test(path) &&
    !/\/(?:thank-you|inquiry-sent)(?:\/|$)/.test(path) &&
    !isRetiredRacksBenchesPath(path);
}

export function isSitemapContentEligible(content: PublishedContent, repository: ContentRepository): boolean {
  const { entity, version } = content;
  const path = version.publicPath;
  if (!isSitemapPagePath(path) || isRetiredRacksBenchesEntity(entity) ||
      version.canonicalData.mode !== "self" || version.canonicalData.noindex) return false;

  const request = decideLocaleRequest(path);
  return request.action === "pass" && request.internalLocale === version.locale &&
    repository.resolvePublishedPath(version.locale, path)?.version === version;
}
