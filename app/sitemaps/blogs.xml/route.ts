import type { MetadataRoute } from "next";
import { cmsEnabled } from "../../../lib/content/wordpress";
import { listCmsPilot } from "../../../lib/content/wordpress-pilot";
import { absoluteUrl, sitemapEntriesFor } from "../../seo-data";
import { metadataRouteUrlsetXml, xmlResponse } from "../sitemap-utils";

export async function GET() {
  const whitelist = sitemapEntriesFor("blog");
  const urls = new Set(whitelist.map((entry) => entry.url));
  const pilot: MetadataRoute.Sitemap = [];

  for (const entry of await listCmsPilot("articles")) {
    const url = absoluteUrl(entry.path);
    if (urls.has(url)) continue;

    urls.add(url);
    pilot.push({ url, lastModified: entry.lastModified });
  }

  return xmlResponse(metadataRouteUrlsetXml([...whitelist, ...pilot]), cmsEnabled());
}
