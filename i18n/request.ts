import { getRequestConfig } from "next-intl/server";
import { defaultLocale, getLocaleByRouteLocale } from "./locale-registry";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const definition = requested ? getLocaleByRouteLocale(requested) : undefined;

  return {
    locale: definition?.internalLocale ?? defaultLocale.internalLocale,
    messages: {}
  };
});
