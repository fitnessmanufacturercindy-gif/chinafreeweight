export const routeLocales = [
  "en",
  "pt",
  "es",
  "de",
  "fr",
  "vi",
  "it",
  "nl",
  "ru",
  "ar",
  "ja",
  "ko"
] as const;

export type RouteLocale = (typeof routeLocales)[number];
export type InternalLocale =
  | "en"
  | "pt-BR"
  | "es"
  | "de"
  | "fr"
  | "vi"
  | "it"
  | "nl"
  | "ru"
  | "ar"
  | "ja"
  | "ko";

export type LocaleDirection = "ltr" | "rtl";

export type LocaleDefinition = {
  routeLocale: RouteLocale;
  internalLocale: InternalLocale;
  hreflang: string;
  englishName: string;
  nativeName: string;
  direction: LocaleDirection;
  prefix: "" | `/${string}`;
  enabled: boolean;
  public: boolean;
  default: boolean;
  fallbackLocale: InternalLocale | null;
};

const definitions: readonly LocaleDefinition[] = [
  { routeLocale: "en", internalLocale: "en", hreflang: "en", englishName: "English", nativeName: "English", direction: "ltr", prefix: "", enabled: true, public: true, default: true, fallbackLocale: null },
  { routeLocale: "pt", internalLocale: "pt-BR", hreflang: "pt-BR", englishName: "Portuguese (Brazil)", nativeName: "Português (Brasil)", direction: "ltr", prefix: "/pt", enabled: true, public: true, default: false, fallbackLocale: "en" },
  { routeLocale: "es", internalLocale: "es", hreflang: "es", englishName: "Spanish", nativeName: "Español", direction: "ltr", prefix: "/es", enabled: true, public: true, default: false, fallbackLocale: "en" },
  { routeLocale: "de", internalLocale: "de", hreflang: "de", englishName: "German", nativeName: "Deutsch", direction: "ltr", prefix: "/de", enabled: true, public: true, default: false, fallbackLocale: "en" },
  { routeLocale: "fr", internalLocale: "fr", hreflang: "fr", englishName: "French", nativeName: "Français", direction: "ltr", prefix: "/fr", enabled: true, public: true, default: false, fallbackLocale: "en" },
  { routeLocale: "vi", internalLocale: "vi", hreflang: "vi", englishName: "Vietnamese", nativeName: "Tiếng Việt", direction: "ltr", prefix: "/vi", enabled: true, public: true, default: false, fallbackLocale: "en" },
  { routeLocale: "it", internalLocale: "it", hreflang: "it", englishName: "Italian", nativeName: "Italiano", direction: "ltr", prefix: "/it", enabled: true, public: false, default: false, fallbackLocale: "en" },
  { routeLocale: "nl", internalLocale: "nl", hreflang: "nl", englishName: "Dutch", nativeName: "Nederlands", direction: "ltr", prefix: "/nl", enabled: true, public: false, default: false, fallbackLocale: "en" },
  { routeLocale: "ru", internalLocale: "ru", hreflang: "ru", englishName: "Russian", nativeName: "Русский", direction: "ltr", prefix: "/ru", enabled: true, public: false, default: false, fallbackLocale: "en" },
  { routeLocale: "ar", internalLocale: "ar", hreflang: "ar", englishName: "Arabic", nativeName: "العربية", direction: "rtl", prefix: "/ar", enabled: true, public: false, default: false, fallbackLocale: "en" },
  { routeLocale: "ja", internalLocale: "ja", hreflang: "ja", englishName: "Japanese", nativeName: "日本語", direction: "ltr", prefix: "/ja", enabled: true, public: false, default: false, fallbackLocale: "en" },
  { routeLocale: "ko", internalLocale: "ko", hreflang: "ko", englishName: "Korean", nativeName: "한국어", direction: "ltr", prefix: "/ko", enabled: true, public: false, default: false, fallbackLocale: "en" }
] as const;

const byRouteLocale = new Map(definitions.map((definition) => [definition.routeLocale, definition]));
const byInternalLocale = new Map(definitions.map((definition) => [definition.internalLocale, definition]));

export const localeRegistry = definitions;
export const defaultLocale = definitions[0];

export function isRouteLocale(value: string): value is RouteLocale {
  return byRouteLocale.has(value as RouteLocale);
}

export function isInternalLocale(value: string): value is InternalLocale {
  return byInternalLocale.has(value as InternalLocale);
}

export function getLocaleByRouteLocale(locale: string): LocaleDefinition | undefined {
  return byRouteLocale.get(locale as RouteLocale);
}

export function getLocaleByInternalLocale(locale: string): LocaleDefinition | undefined {
  return byInternalLocale.get(locale as InternalLocale);
}

export function getPublishedLocaleDefinitions(): LocaleDefinition[] {
  return definitions.filter((definition) => definition.enabled && definition.public);
}

