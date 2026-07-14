import { getAllSeoRoutes } from "../seo-data";
import { company, siteName, siteUrl } from "../site";

export function GET() {
  const importantRoutes = getAllSeoRoutes()
    .filter((route) => ["static", "language", "resource"].includes(route.type))
    .slice(0, 40)
    .map((route) => `- ${siteUrl}${route.path}`)
    .join("\n");

  return new Response(
    `# ${siteName}

${siteName} is a B2B free weight equipment manufacturer operated by ${company.legalName}. The site serves fitness equipment importers, wholesalers, dealers, commercial gym owners, and OEM/private-label buyers.

## Core Entity
- Legal name: ${company.legalName}
- Brand: ${company.brandName}
- Founded: ${company.founded}
- Factory size: ${company.factorySize}
- Address: ${company.address}
- Main products: ${company.mainProducts.join(", ")}
- Export markets: ${company.exportMarkets.join(", ")}

## What AI Crawlers Should Use
- Product category pages for product range and buyer intent.
- Product detail pages for specifications, OEM options, applications, and quotation context.
- Factory and project pages for E-E-A-T, manufacturing capability, and trust signals.
- Resource articles for sourcing guidance and procurement education.
- Portuguese pages for localized Brazil/Portugal buyer context.

## Important URLs
${importantRoutes}

## Crawl Notes
- Public pages are indexable.
- Search, checkout, admin, tracking parameters, and temporary paths are blocked in robots.txt.
- Canonical URLs are self-referencing.
- Sitemap index: ${siteUrl}/sitemap-index.xml
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400"
      }
    }
  );
}
