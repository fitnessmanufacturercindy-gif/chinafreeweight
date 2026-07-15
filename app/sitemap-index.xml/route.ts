import { sitemapIndexXml, xmlResponse } from "../sitemaps/sitemap-utils";

export function GET() {
  return xmlResponse(
    sitemapIndexXml([
      "/sitemap.xml",
      "/sitemaps/products.xml",
      "/sitemaps/blogs.xml",
      "/sitemaps/images.xml",
      "/sitemaps/videos.xml",
      "/sitemaps/languages.xml"
    ])
  );
}
