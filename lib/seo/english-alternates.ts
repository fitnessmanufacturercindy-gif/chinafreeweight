import { contentRepository } from "../content/repository";

export function getEnglishAlternates(path: string) {
  const content = contentRepository.resolvePublishedPath("en", path);
  const portuguese = content && contentRepository.getPublishedVersion(content.entity.id, "pt-BR");
  return {
    canonical: path,
    languages: portuguese ? { en: path, "pt-BR": portuguese.version.publicPath, "x-default": path } : { en: path, "x-default": path }
  };
}
