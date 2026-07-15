import { videoSitemapXml, xmlResponse } from "../sitemap-utils";

export function GET() {
  return xmlResponse(videoSitemapXml());
}
