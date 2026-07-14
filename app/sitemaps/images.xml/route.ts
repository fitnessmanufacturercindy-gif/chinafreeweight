import { getImageSeoEntries } from "../../seo-data";
import { imageSitemapXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(imageSitemapXml(getImageSeoEntries()));
}
