import {
  defaultLocale,
  getLocaleByInternalLocale,
  getLocaleByRouteLocale,
  isRouteLocale,
  type InternalLocale,
  type RouteLocale
} from "../../i18n/locale-registry";

const MULTIPLE_SLASHES = /\/{2,}/g;

export function normalizePath(path: string): string {
  const withoutQuery = path.split(/[?#]/, 1)[0] || "/";
  const normalized = `/${withoutQuery}`.replace(MULTIPLE_SLASHES, "/");
  if (normalized === "/") return normalized;
  return normalized.replace(/\/$/, "");
}

export function splitPath(path: string): string[] {
  return normalizePath(path).split("/").filter(Boolean);
}

export function getRouteLocaleFromPath(path: string): RouteLocale | undefined {
  const [firstSegment] = splitPath(path);
  return firstSegment && isRouteLocale(firstSegment) ? firstSegment : undefined;
}

export function stripLocalePrefix(path: string): string {
  const normalized = normalizePath(path);
  const segments = splitPath(normalized);
  const first = segments[0];
  if (!first || !isRouteLocale(first)) return normalized;
  const remaining = segments.slice(1);
  return remaining.length ? `/${remaining.join("/")}` : "/";
}

export function buildPublicPath(locale: InternalLocale, unprefixedPath: string): string {
  const definition = getLocaleByInternalLocale(locale);
  if (!definition) throw new Error(`Unsupported locale: ${locale}`);
  const path = normalizePath(unprefixedPath);
  if (definition.default) return path;
  return path === "/" ? definition.prefix || "/" : `${definition.prefix}${path}`;
}

export function toInternalLocale(routeLocale: string): InternalLocale | undefined {
  return getLocaleByRouteLocale(routeLocale)?.internalLocale;
}

export function toRouteLocale(internalLocale: string): RouteLocale | undefined {
  return getLocaleByInternalLocale(internalLocale)?.routeLocale;
}

export function getUnprefixedEnglishPath(path: string): string {
  const locale = getRouteLocaleFromPath(path);
  return locale === defaultLocale.routeLocale ? stripLocalePrefix(path) : normalizePath(path);
}
