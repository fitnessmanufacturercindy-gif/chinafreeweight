import { blogSeoRoutes } from "../../seo-data";
import { contentRepository } from "../../../lib/content/repository";
import { routeUrlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  const localizedBlogs = contentRepository
    .listPublished({ type: "blog" })
    .filter(({ version }) => version.locale !== "en")
    .map(({ version }) => ({
      path: version.publicPath,
      type: "blog" as const,
      title: version.title,
      image: version.images[0]?.src
    }));
  return xmlResponse(routeUrlsetXml([...blogSeoRoutes(), ...localizedBlogs]));
}
