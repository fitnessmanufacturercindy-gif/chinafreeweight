import { contentRepository } from "../content/repository";
import { getLocaleByInternalLocale } from "../../i18n/locale-registry";

export function getEnglishAlternates(path: string) {
  const content = contentRepository.resolvePublishedPath("en", path);
  const publishedLanguages = content
    ? Object.fromEntries(contentRepository.getPublishedVersions(content.entity.id).flatMap(({ version }) => {
        const locale = getLocaleByInternalLocale(version.locale);
        return locale?.public && version.hreflangData.include
          ? [[locale.hreflang, version.publicPath]]
          : [];
      }))
    : {};
  return {
    canonical: path,
    languages: {
      ...publishedLanguages,
      en: path,
      "x-default": path
    }
  };
}
