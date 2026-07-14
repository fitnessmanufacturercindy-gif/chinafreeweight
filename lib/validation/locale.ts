import { defaultLocale, getLocaleByInternalLocale } from "../../i18n/locale-registry";
import { normalizePath } from "../i18n/paths";
import type { ContentManifest, LocalizedContentVersion } from "../content/types";

export type ValidationIssue = {
  code: string;
  message: string;
  contentId?: string;
  locale?: string;
};

function validateVersion(contentId: string, version: LocalizedContentVersion): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const definition = getLocaleByInternalLocale(version.locale);
  const path = normalizePath(version.publicPath);

  if (!definition) {
    issues.push({ code: "unsupported_locale", message: `Unsupported locale ${version.locale}`, contentId, locale: version.locale });
    return issues;
  }

  if (!version.slug.trim()) {
    issues.push({ code: "missing_slug", message: "Slug mapping is required", contentId, locale: version.locale });
  }

  if (definition.default && path.startsWith(`/${defaultLocale.routeLocale}/`)) {
    issues.push({ code: "english_prefixed", message: "English URLs must not use /en", contentId, locale: version.locale });
  }

  if (!definition.default && !path.startsWith(`${definition.prefix}/`) && path !== definition.prefix) {
    issues.push({ code: "locale_path_mismatch", message: `Path must start with ${definition.prefix}`, contentId, locale: version.locale });
  }

  if (version.publishStatus === "published" && !version.publishedAt) {
    issues.push({ code: "missing_published_at", message: "Published content requires publishedAt", contentId, locale: version.locale });
  }

  if (version.canonicalData.mode !== "self") {
    issues.push({ code: "invalid_canonical_mode", message: "Localized pages must be self-canonical", contentId, locale: version.locale });
  }

  return issues;
}

export function validateContentManifest(manifest: ContentManifest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  const publishedPaths = new Map<string, string>();

  for (const entity of manifest.entities) {
    if (ids.has(entity.id)) {
      issues.push({ code: "duplicate_content_id", message: `Duplicate content ID ${entity.id}`, contentId: entity.id });
    }
    ids.add(entity.id);

    for (const [localeKey, version] of Object.entries(entity.versions)) {
      if (!version) continue;
      if (localeKey !== version.locale) {
        issues.push({ code: "locale_key_mismatch", message: `${localeKey} contains ${version.locale}`, contentId: entity.id, locale: version.locale });
      }
      issues.push(...validateVersion(entity.id, version));
      if (version.publishStatus !== "published") continue;
      const key = `${version.locale}:${normalizePath(version.publicPath)}`;
      const owner = publishedPaths.get(key);
      if (owner) {
        issues.push({ code: "duplicate_locale_url", message: `${key} is shared by ${owner} and ${entity.id}`, contentId: entity.id, locale: version.locale });
      } else {
        publishedPaths.set(key, entity.id);
      }
    }
  }

  return issues;
}
