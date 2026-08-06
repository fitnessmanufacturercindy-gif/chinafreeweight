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

## Public Product and Company Pages
${importantRoutes}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400"
      }
    }
  );
}
