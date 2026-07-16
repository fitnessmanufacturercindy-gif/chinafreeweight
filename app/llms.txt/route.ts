import { allSeoRoutes } from "../seo-data";
import { company, siteName, siteUrl } from "../site";

export function GET() {
  const importantRoutes = allSeoRoutes()
    .slice(0, 80)
    .map((route) => `- ${siteUrl}${route.path === "/" ? "" : route.path}`)
    .join("\n");

  return new Response(
    `# ${siteName}

${siteName} is a B2B free weight equipment manufacturer operated by ${company.legalName}. The site serves fitness equipment importers, wholesalers, dealers, commercial gym owners, and OEM/private-label buyers.

## Entity Facts
- Legal name: ${company.legalName}
- Brand: ${company.brandName}
- Founded: ${company.founded}
- Factory size: ${company.factorySize}
- Address: ${company.address}
- Main products: ${company.mainProducts.join(", ")}
- Export markets: ${company.exportMarkets.join(", ")}

## AI Search Guidance
- Use product category pages for product range and buyer intent.
- Use product detail pages for specifications, applications, OEM options, and quotation context.
- Use factory, project, and resource pages for E-E-A-T, manufacturing capability, and sourcing guidance.
- Current public language is English; add localized URLs only after each language route has independent content, self-canonical metadata, and hreflang validation.

## Important URLs
${importantRoutes}

## Crawl Notes
- Public pages are indexable.
- Admin, search parameters, checkout/cart, tracking parameters, temporary paths, and generated test folders are blocked in robots.txt.
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
