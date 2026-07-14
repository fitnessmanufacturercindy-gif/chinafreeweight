import { contentRepository } from "../../../lib/content/repository";
import RouteLanguageSwitcherClient, { type PublishedRoutePair } from "./RouteLanguageSwitcherClient";

export default function PublishedLanguageSwitcher() {
  const pairs = contentRepository.listPublished({ locale: "en" }).flatMap(({ entity, version }) => {
    const portuguese = contentRepository.getPublishedVersion(entity.id, "pt-BR");
    return portuguese ? [{ en: version.publicPath, pt: portuguese.version.publicPath } satisfies PublishedRoutePair] : [];
  });
  return <RouteLanguageSwitcherClient pairs={pairs} />;
}
