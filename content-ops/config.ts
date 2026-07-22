import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";

export const contentAutomationConfig = {
  siteUrl: "https://www.chinafreeweight.com",
  timeZone: "Asia/Shanghai",
  runHour: 22,
  dailyThemeLimits: { blog: 5, case: 5, total: 10 },
  minimumQualityScore: 92,
  semanticSimilarityLimit: 0.86,
  apiBudgetUsd: { daily: 2, monthly: 30 },
  cacheDays: { keywords: 30, serp: 7 },
  requireManualApproval: true,
  pullRequestMode: "draft" as const,
};

export function getAutomationLocales() {
  return getPublishedLocaleDefinitions().map((locale) => ({
    routeLocale: locale.routeLocale,
    internalLocale: locale.internalLocale,
    hreflang: locale.hreflang,
    prefix: locale.prefix,
  }));
}

export function getDailyCandidateUrlLimit() {
  return contentAutomationConfig.dailyThemeLimits.total * getAutomationLocales().length;
}
