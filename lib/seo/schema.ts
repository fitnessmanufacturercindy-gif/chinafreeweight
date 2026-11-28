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

/**
 * Google only accepts a `Product` item when it carries `offers`, `review` or `aggregateRating`
 * (Product snippets) and, for merchant listings, an `Offer` with a real price. This site is a
 * B2B OEM factory: there are no public retail prices, reviews or ratings, and we must never
 * invent them. A bare `Product` is reported by Search Console as an invalid Product snippet item.
 *
 * Rule: emit `Product` only when a real price + currency exists; otherwise describe the page's
 * subject as a plain `Thing`, which is valid schema.org and not a Product-snippet candidate.
 */
export type ProductEntityInput = {
  id?: string;
  url: string;
  name: string;
  description?: string;
  sku?: string;
  brand?: string;
  manufacturer?: string;
  material?: string;
  category?: string;
  specifications?: Array<{ name: string; value: string }>;
  images?: string[];
  inLanguage?: string;
  offer?: { price: string | number; priceCurrency: string; availability?: string };
};

export function buildProductEntityNode(input: ProductEntityInput): JsonLd {
  const images = input.images?.length ? input.images : undefined;
  if (input.offer) {
    return {
      "@type": "Product",
      "@id": input.id,
      url: input.url,
      name: input.name,
      description: input.description,
      sku: input.sku,
      brand: input.brand ? { "@type": "Brand", name: input.brand } : undefined,
      manufacturer: input.manufacturer ? { "@type": "Organization", name: input.manufacturer } : undefined,
      material: input.material,
      category: input.category,
      additionalProperty: input.specifications?.map((specification) => ({
        "@type": "PropertyValue",
        name: specification.name,
        value: specification.value
      })),
      image: images,
      inLanguage: input.inLanguage,
      offers: { "@type": "Offer", ...input.offer, url: input.url }
    };
  }
  return {
    "@type": "Thing",
    "@id": input.id,
    url: input.url,
    name: input.name,
    description: input.description,
    identifier: input.sku,
    image: images
  };
}

/** Standalone JSON-LD document for hand-written (English) product templates. */
export function buildProductPageJsonLd(input: ProductEntityInput & { inLanguage: string }): JsonLd {
  const entity = buildProductEntityNode({ ...input, id: undefined, inLanguage: undefined });
  const { url, name, description, inLanguage } = input;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage,
    mainEntity: entity
  };
}

export function buildLocalizedSchemaGraph(content: PublishedContent, siteUrl: string): JsonLd[] {
  const { entity, version } = content;
  const definition = getLocaleByInternalLocale(version.locale);
  if (!definition) throw new Error(`Unsupported locale: ${version.locale}`);
  const inLanguage = definition.hreflang;
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
    inLanguage,
    datePublished: version.publishedAt,
    dateModified: version.updatedAt,
    author: version.author ? { "@type": version.author.kind ?? "Person", name: version.author.name, url: version.author.url } : undefined,
    reviewedBy: version.reviewedBy ? { "@type": version.reviewedBy.kind ?? "Person", name: version.reviewedBy.name, url: version.reviewedBy.url } : undefined
  });

  if (entity.type === "product") {
    graph.push(
      buildProductEntityNode({
        id: `${url}#product`,
        url,
        name: version.h1,
        description: version.description,
        sku: version.schemaData.sku,
        brand: version.schemaData.brand,
        manufacturer: version.schemaData.manufacturer,
        material: version.schemaData.material,
        category: version.schemaData.category,
        specifications: version.schemaData.specifications,
        images: version.images.map((image) => absoluteUrl(siteUrl, image.src)),
        inLanguage,
        offer:
          version.schemaData.price && version.schemaData.priceCurrency
            ? {
                price: version.schemaData.price,
                priceCurrency: version.schemaData.priceCurrency,
                availability: version.schemaData.availability
              }
            : undefined
      })
    );
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
      mainEntityOfPage: { "@id": `${url}#webpage` },
      image: version.images.length ? version.images.map((image) => absoluteUrl(siteUrl, image.src)) : undefined,
      author: version.author ? { "@type": version.author.kind ?? "Person", name: version.author.name, url: version.author.url } : undefined,
      reviewedBy: version.reviewedBy ? { "@type": version.reviewedBy.kind ?? "Person", name: version.reviewedBy.name, url: version.reviewedBy.url } : undefined,
      publisher: { "@type": "Organization", "@id": `${siteUrl.replace(/\/$/, "")}#organization`, name: "PowerBaseFit" }
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
      mainEntityOfPage: { "@id": `${url}#webpage` },
      image: version.images.length ? version.images.map((image) => absoluteUrl(siteUrl, image.src)) : undefined,
      author: version.author ? { "@type": version.author.kind ?? "Person", name: version.author.name, url: version.author.url ? absoluteUrl(siteUrl, version.author.url) : undefined } : undefined,
      reviewedBy: version.reviewedBy ? { "@type": version.reviewedBy.kind ?? "Person", name: version.reviewedBy.name, url: version.reviewedBy.url } : undefined,
      publisher: { "@type": "Organization", "@id": `${siteUrl.replace(/\/$/, "")}#organization`, name: "PowerBaseFit" }
    });
  }

  if (version.schemaData.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      inLanguage,
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
      caption: image.caption ?? image.alt,
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
