import { languageSitemapEntries } from "../../seo-data";
import { metadataRouteUrlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(metadataRouteUrlsetXml(languageSitemapEntries()));
}
