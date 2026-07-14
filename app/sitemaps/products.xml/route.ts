import { getProductSeoRoutes } from "../../seo-data";
import { urlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(urlsetXml(getProductSeoRoutes()));
}
