import { productSeoRoutes } from "../../seo-data";
import { routeUrlsetXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(routeUrlsetXml(productSeoRoutes()));
}
