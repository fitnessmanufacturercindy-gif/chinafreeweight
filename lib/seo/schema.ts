import { getLocaleByInternalLocale } from "../../i18n/locale-registry";
import type { PublishedContent } from "../content/types";

type JsonLd = Record<string, unknown>;

function absoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function buildOrganizationSchema(input: {
  siteUrl: string;
  name: string;
  legalName: string;
  logo: string;
}): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${input.siteUrl.replace(/\/$/, "")}#organization`,
    name: input.name,
    legalName: input.legalName,
    url: input.siteUrl,
    logo: absoluteUrl(input.siteUrl, input.logo)
  };
}

export function buildWebSiteSchema(siteUrl: string, name: string, inLanguage: string): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl.replace(/\/$/, "")}#website-${inLanguage}`,
    url: siteUrl,
    name,
    inLanguage
  };
}

export function buildLocalizedSchemaGraph(content: PublishedContent, siteUrl: string): JsonLd[] {
  const { entity, version } = content;
  const definition = getLocaleByInternalLocale(version.locale);
  if (!definition) throw new Error(`Unsupported locale: ${version.locale}`);
  const inLanguage = definition.internalLocale;
  const url = absoluteUrl(siteUrl, version.publicPath);
  const graph: JsonLd[] = [];

  const webPageType = entity.type === "product_category" || entity.type === "blog_index" || entity.type === "case_index"
    ? "CollectionPage"
    : "WebPage";

  graph.push({
    "@type": webPageType,
    "@id": `${url}#webpage`,
    url,
    name: version.title,
    description: version.description,
    inLanguage
  });

  if (entity.type === "product") {
    graph.push({
      "@type": "Product",
      "@id": `${url}#product`,
      url,
      name: version.h1,
      description: version.description,
      sku: version.schemaData.sku,
      brand: version.schemaData.brand ? { "@type": "Brand", name: version.schemaData.brand } : undefined,
      image: version.images.map((image) => absoluteUrl(siteUrl, image.src)),
      inLanguage,
      offers: version.schemaData.price
        ? {
            "@type": "Offer",
            price: version.schemaData.price,
            priceCurrency: version.schemaData.priceCurrency,
            availability: version.schemaData.availability,
            url
          }
        : undefined
    });
  }

  if (entity.type === "blog") {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      url,
      headline: version.h1,
      description: version.description,
      datePublished: version.publishedAt,
      dateModified: version.updatedAt,
      inLanguage,
      author: version.author ? { "@type": "Person", name: version.author.name, url: version.author.url } : undefined
    });
  }

  if (entity.type === "case") {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      url,
      headline: version.h1,
      description: version.description,
      datePublished: version.publishedAt,
      dateModified: version.updatedAt,
      inLanguage,
      author: version.author ? { "@type": "Person", name: version.author.name, url: version.author.url } : undefined
    });
  }

  if (version.schemaData.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: version.schemaData.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(siteUrl, item.path)
      }))
    });
  }

  if (version.faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage,
      mainEntity: version.faq.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    });
  }

  for (const image of version.images) {
    graph.push({
      "@type": "ImageObject",
      "@id": `${url}#image-${image.id}`,
      contentUrl: absoluteUrl(siteUrl, image.src),
      caption: image.alt,
      inLanguage
    });
  }

  for (const [index, video] of (version.schemaData.videos ?? []).entries()) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${url}#video-${index + 1}`,
      name: video.name,
      description: video.description,
      thumbnailUrl: absoluteUrl(siteUrl, video.thumbnailUrl),
      contentUrl: video.contentUrl ? absoluteUrl(siteUrl, video.contentUrl) : undefined,
      uploadDate: video.uploadDate,
      inLanguage
    });
  }

  return graph.map((node) => Object.fromEntries(Object.entries(node).filter(([, value]) => value !== undefined)));
}

export function asJsonLdDocument(graph: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": graph };
}
