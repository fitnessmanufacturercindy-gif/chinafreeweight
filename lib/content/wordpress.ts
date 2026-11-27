import { unstable_cache } from "next/cache";
import sanitizeHtml from "sanitize-html";

export const cmsCategories = ["dumbbells", "weight-plates", "gym-accessories"] as const;
type Category = (typeof cmsCategories)[number];
export type CmsKind = "articles" | "products";

type Media = {
  source_url: string;
  alt_text?: string;
  media_details?: { sizes?: Record<string, { source_url: string; width: number }>; width?: number; height?: number };
};

type RestEntry = {
  slug: string;
  modified_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string; protected?: boolean };
  cfw_gallery_images?: Array<{ url: string; width: number; height: number; alt: string }>;
  meta?: Record<string, string | boolean | number[]>;
  _embedded?: {
    "wp:featuredmedia"?: Media[];
    "wp:term"?: Array<Array<{ slug: string; taxonomy: string }>>;
  };
};

export const cmsTag = (kind: CmsKind) => `cfw-wordpress-${kind}`;
export const cmsEnabled = () => Boolean(process.env.CMS_WORDPRESS_URL);

function asText(html: string) {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(
    /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi,
    (match, entity: string) => {
      if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match;
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
  ).trim();
}

function mapEntry(entry: RestEntry, kind: CmsKind) {
  if (!entry.meta?.cfw_next_pilot || entry.content.protected || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
    return null;
  }
  const categories = new Set(entry._embedded?.["wp:term"]?.flat()
    .filter((term) => term.taxonomy === "cfw_product_category")
    .map((term) => term.slug));
  const category = cmsCategories.find((item) => categories.has(item));
  if (kind === "products" && !category) return null;

  const media = entry._embedded?.["wp:featuredmedia"]?.[0];
  const modified = new Date(`${entry.modified_gmt}Z`);
  const meta = (name: string) => typeof entry.meta?.[name] === "string" ? String(entry.meta[name]) : "";
  return {
    slug: entry.slug,
    category,
    path: kind === "articles" ? `/resources/${entry.slug}` : `/products/${category}/${entry.slug}`,
    title: asText(entry.title.rendered),
    excerpt: asText(entry.excerpt.rendered),
    html: sanitizeHtml(entry.content.rendered, {
      allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption"],
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "width", "height"],
      },
      allowedSchemes: ["https", "mailto"],
      allowProtocolRelative: false,
      transformTags: { img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }) },
    }),
    media,
    gallery: (entry.cfw_gallery_images ?? []).filter((image) => image.url.startsWith("https://") && image.url !== media?.source_url),
    lastModified: Number.isFinite(modified.getTime()) ? modified.toISOString() : undefined,
    weightRange: meta("cfw_weight_range"),
    material: meta("cfw_material"),
    seoTitle: meta("cfw_seo_title"),
    seoDescription: meta("cfw_seo_description"),
  };
}

export type CmsEntry = NonNullable<ReturnType<typeof mapEntry>>;

async function fetchEntries(base: string, kind: CmsKind) {
  const resource = kind === "articles" ? "posts" : "cfw-products";
  const url = new URL(`wp-json/wp/v2/${resource}`, `${base.replace(/\/+$/, "")}/`);
  url.search = new URLSearchParams({
    status: "publish",
    cfw_pilot: "true",
    per_page: "100",
    _embed: "wp:featuredmedia,wp:term",
  }).toString();
  const entries: CmsEntry[] = [];
  let pages = 1;
  for (let page = 1; page <= pages; page += 1) {
    url.searchParams.set("page", String(page));
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (!response.ok) throw new Error(`WordPress ${kind} returned ${response.status}`);
    const body: RestEntry[] = await response.json();
    pages = Number(response.headers.get("x-wp-totalpages")) || 1;
    entries.push(...body.map((entry) => mapEntry(entry, kind)).filter((entry): entry is CmsEntry => entry !== null));
  }
  return entries;
}

export function getCmsEntries(kind: CmsKind): Promise<CmsEntry[]> {
  const url = process.env.CMS_WORDPRESS_URL;
  if (!url) return Promise.resolve([]);
  return unstable_cache(fetchEntries, ["cfw-wordpress-v1"], { revalidate: 300, tags: [cmsTag(kind)] })(url, kind);
}

export async function findCmsEntry(kind: CmsKind, slug: string, category?: Category) {
  const entries = await getCmsEntries(kind);
  return entries.find((entry) => entry.slug === slug && entry.category === category);
}
