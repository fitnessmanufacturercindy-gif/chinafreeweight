import { productSeoRoutes } from "../../seo-data";
import { contentRepository } from "../../../lib/content/repository";
import { routeUrlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  const localizedProducts = contentRepository
    .listPublished({ type: "product" })
    .filter(({ version }) => version.locale !== "en")
    .map(({ version }) => ({
      path: version.publicPath,
      type: "product" as const,
      title: version.title,
      image: version.images[0]?.src
    }));
  return xmlResponse(routeUrlsetXml([...productSeoRoutes(), ...localizedProducts]));
}
