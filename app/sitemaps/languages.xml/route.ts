import { portugueseSeoRoutes } from "../../seo-data";
import { languageSitemapXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(languageSitemapXml(portugueseSeoRoutes));
}
