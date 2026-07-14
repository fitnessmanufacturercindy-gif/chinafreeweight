import { defaultLocale, getLocaleByRouteLocale } from "../../i18n/locale-registry";
import { getRouteLocaleFromPath, normalizePath, stripLocalePrefix } from "./paths";

export type LocaleRequestDecision =
  | { action: "pass"; internalLocale: string }
  | { action: "redirect"; destination: string }
  | { action: "not_found"; reason: "locale_not_public" };

export function decideLocaleRequest(pathname: string): LocaleRequestDecision {
  const normalized = normalizePath(pathname);
  const routeLocale = getRouteLocaleFromPath(normalized);

  if (!routeLocale) {
    return { action: "pass", internalLocale: defaultLocale.internalLocale };
  }

  if (routeLocale === defaultLocale.routeLocale) {
    return { action: "redirect", destination: stripLocalePrefix(normalized) };
  }

  const definition = getLocaleByRouteLocale(routeLocale);
  if (!definition?.enabled || !definition.public) {
    return { action: "not_found", reason: "locale_not_public" };
  }

  return { action: "pass", internalLocale: definition.internalLocale };
}
