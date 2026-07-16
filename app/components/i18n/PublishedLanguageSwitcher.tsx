import { contentRepository } from "../../../lib/content/repository";
import RouteLanguageSwitcherClient, { type PublishedRouteGroup } from "./RouteLanguageSwitcherClient";

export default function PublishedLanguageSwitcher() {
  const groups = [...new Set(contentRepository.listPublished().map(({ entity }) => entity.id))].flatMap((contentId) => {
    const routes = Object.fromEntries(
      contentRepository.getPublishedVersions(contentId).map(({ version }) => [version.locale, version.publicPath])
    ) as PublishedRouteGroup["routes"];
    return Object.keys(routes).length > 1 ? [{ routes } satisfies PublishedRouteGroup] : [];
  });
  return <RouteLanguageSwitcherClient groups={groups} />;
}
