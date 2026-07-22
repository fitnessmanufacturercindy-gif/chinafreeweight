import { contentRepository } from "../../../lib/content/repository";
import { routeUrlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  const cases = contentRepository.listPublished({ type: "case" }).map(({ version }) => ({
    path: version.publicPath,
    type: "static" as const,
    title: version.title,
    image: version.images[0]?.src,
  }));
  return xmlResponse(routeUrlsetXml([{ path: "/projects", type: "static" as const, title: "Projects", image: "/assets/case-showroom.avif" }, ...cases]));
}
