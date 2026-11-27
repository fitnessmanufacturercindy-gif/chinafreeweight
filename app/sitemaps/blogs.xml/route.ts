import { blogSeoRoutes } from "../../seo-data";
import { contentRepository } from "../../../lib/content/repository";
import { routeUrlsetXml, xmlResponse } from "../sitemap-utils";
import { listCmsPilot } from "../../../lib/content/wordpress-pilot";
import { cmsEnabled } from "../../../lib/content/wordpress";

export async function GET() {
  const localizedBlogs = contentRepository
    .listPublished({ type: "blog" })
    .filter(({ version }) => version.locale !== "en")
    .map(({ version }) => ({
      path: version.publicPath,
      type: "blog" as const,
      title: version.title,
      image: version.images[0]?.src,
      lastModified: version.updatedAt
    }));
  const pilot = (await listCmsPilot("articles")).map((entry) => ({
    path: entry.path, title: entry.title, type: "blog" as const, lastModified: entry.lastModified,
  }));
  return xmlResponse(routeUrlsetXml([...blogSeoRoutes(), ...localizedBlogs, ...pilot]), cmsEnabled());
}
