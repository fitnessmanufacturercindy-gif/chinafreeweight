import { defineRouting } from "next-intl/routing";
import { routeLocales } from "./locale-registry";

export const routing = defineRouting({
  locales: routeLocales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false
});
