import { productSeoRoutes } from "../../seo-data";
import { contentRepository } from "../../../lib/content/repository";
import { routeUrlsetXml, xmlResponse } from "../sitemap-utils";
import { listCmsPilot } from "../../../lib/content/wordpress-pilot";
import { cmsEnabled } from "../../../lib/content/wordpress";

export async function GET() {
  const localizedProducts = contentRepository
    .listPublished({ type: "product" })
    .filter(({ version }) => version.locale !== "en")
    .map(({ version }) => ({
      path: version.publicPath,
      type: "product" as const,
      title: version.title,
      image: version.images[0]?.src,
      lastModified: version.updatedAt
    }));
  const pilot = (await listCmsPilot("products")).map((entry) => ({
    path: entry.path, title: entry.title, type: "product" as const, lastModified: entry.lastModified,
  }));
  return xmlResponse(routeUrlsetXml([...productSeoRoutes(), ...localizedProducts, ...pilot]), cmsEnabled());
}
