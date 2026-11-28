import { sitemapEntriesFor } from "../../seo-data";
import { metadataRouteUrlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(metadataRouteUrlsetXml(sitemapEntriesFor("product")));
}
