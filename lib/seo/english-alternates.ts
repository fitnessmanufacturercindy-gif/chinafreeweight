import { contentRepository } from "../content/repository";

export function getEnglishAlternates(path: string) {
  const content = contentRepository.resolvePublishedPath("en", path);
  const portuguese = content && contentRepository.getPublishedVersion(content.entity.id, "pt-BR");
  const spanish = content && contentRepository.getPublishedVersion(content.entity.id, "es");
  return {
    canonical: path,
    languages: {
      en: path,
      ...(portuguese ? { "pt-BR": portuguese.version.publicPath } : {}),
      ...(spanish ? { es: spanish.version.publicPath } : {}),
      "x-default": path
    }
  };
}
