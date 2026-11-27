import type { MetadataRoute } from "next";
import { siteUrl } from "../site";
import sitemap from "../sitemap";

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

export function metadataRouteUrlsetXml(entries: MetadataRoute.Sitemap) {
  const urls = entries
    .map((entry) => {
      const alternates = Object.entries(entry.alternates?.languages ?? {})
        .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(String(href))}" />`)
        .join("\n");
      const lastModified = entry.lastModified
        ? `    <lastmod>${escapeXml(new Date(entry.lastModified).toISOString())}</lastmod>\n`
        : "";
      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
${alternates ? `${alternates}\n` : ""}${lastModified}
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function imageSitemapXml(items: Array<{ pageUrl: string; imageUrl: string }>) {
  const imagesByPage = new Map<string, Set<string>>();
  for (const { pageUrl, imageUrl } of items) {
    const images = imagesByPage.get(pageUrl) ?? new Set<string>();
    images.add(imageUrl);
    imagesByPage.set(pageUrl, images);
  }
  const urls = [...imagesByPage].map(([pageUrl, images]) => `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${[...images].map((image) => `    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`).join("\n")}
  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export function videoSitemapXml() {
  const pages = new Set(sitemap().map(({ url }) => url));
  const videos = [
    {
      page: siteUrl,
      thumbnail: "/assets/hero-poster.avif",
      content: "/assets/hero-loop-2.mp4",
      title: "PowerBaseFit free weight equipment manufacturing video",
      description: "Hero manufacturing video showing commercial dumbbells and free weight equipment for B2B gym equipment buyers."
    },
    {
      page: `${siteUrl}/products/dumbbells/textured-rubber-hex-dumbbell`,
      thumbnail: "/assets/products/dumbbells/textured-rubber-hex/textured-rubber-hex-dumbbell-video-poster.webp",
      content: "/assets/products/dumbbells/textured-rubber-hex/textured-rubber-hex-dumbbell-demo.mp4",
      title: "Textured rubber hex dumbbell product demonstration",
      description: "Close-up product video of a 7.5 kg textured rubber hex dumbbell with a knurled metal handle for commercial gym, wholesale and OEM buyers."
    }
  ];
  const urls = videos.filter(({ page }) => pages.has(page)).map((video) => `  <url>
    <loc>${escapeXml(video.page)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(siteUrl + video.thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(siteUrl + video.content)}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;
}
