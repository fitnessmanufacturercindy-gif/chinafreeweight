import type { MetadataRoute } from "next";
import { siteUrl } from "../site";
import { absoluteUrl, type SeoRoute } from "../seo-data";

export function xmlResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}

export function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function routeUrlsetXml(routes: SeoRoute[]) {
  const today = new Date().toISOString();
  const urls = routes
    .map((route) => `  <url>
    <loc>${escapeXml(absoluteUrl(route.path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.type === "blog" ? "monthly" : "weekly"}</changefreq>
  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function metadataRouteUrlsetXml(entries: MetadataRoute.Sitemap) {
  const urls = entries
    .map((entry) => {
      const alternates = Object.entries(entry.alternates?.languages ?? {})
        .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(String(href))}" />`)
        .join("\n");
      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
${alternates ? `${alternates}\n` : ""}    <lastmod>${escapeXml(new Date(entry.lastModified || new Date()).toISOString())}</lastmod>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function sitemapIndexXml(paths: string[]) {
  const today = new Date().toISOString();
  const sitemaps = paths
    .map((path) => `  <sitemap>
    <loc>${escapeXml(new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString())}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>
`;
}

export function imageSitemapXml(items: Array<{ pageUrl: string; imageUrl: string; title: string }>) {
  const urls = items
    .map((item) => `  <url>
    <loc>${escapeXml(item.pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(item.imageUrl)}</image:loc>
      <image:title>${escapeXml(item.title)}</image:title>
    </image:image>
  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export function videoSitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${escapeXml(siteUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(`${siteUrl}/assets/hero-poster.avif`)}</video:thumbnail_loc>
      <video:title>${escapeXml("PowerBaseFit free weight equipment manufacturing video")}</video:title>
      <video:description>${escapeXml("Hero manufacturing video showing commercial dumbbells and free weight equipment for B2B gym equipment buyers.")}</video:description>
      <video:content_loc>${escapeXml(`${siteUrl}/assets/hero-loop-2.mp4`)}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
</urlset>
`;
}
