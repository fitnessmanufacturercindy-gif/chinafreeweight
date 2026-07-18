import type { InternalLocale } from "../../i18n/locale-registry";

export const publicationStatuses = [
  "draft",
  "generated",
  "localized",
  "review_required",
  "approved",
  "published",
  "rejected",
  "archived"
] as const;

export type PublicationStatus = (typeof publicationStatuses)[number];

export type ContentType =
  | "home"
  | "product"
  | "product_category"
  | "blog"
  | "blog_index"
  | "case"
  | "case_index"
  | "landing"
  | "factory"
  | "oem"
  | "projects"
  | "contact"
  | "about"
  | "faq"
  | "generic";

export type ContentBlock = {
  id: string;
  type: "rich_text" | "hero" | "features" | "specifications" | "gallery" | "cta" | "custom";
  heading?: string;
  content?: string;
  data?: Record<string, unknown>;
};

export type LocalizedFaq = {
  id: string;
  question: string;
  answer: string;
};

export type LocalizedImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type LocalizedInternalLink = {
  targetContentId: string;
  label: string;
};

export type LocalizedAuthor = {
  id: string;
  name: string;
  kind?: "Person" | "Organization";
  role?: string;
  url?: string;
  image?: string;
};

export type SchemaData = {
  sku?: string;
  brand?: string;
  manufacturer?: string;
  material?: string;
  category?: string;
  specifications?: Array<{ name: string; value: string }>;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  images?: LocalizedImage[];
  videos?: Array<{ name: string; description: string; thumbnailUrl: string; contentUrl?: string; uploadDate?: string }>;
  breadcrumbs?: Array<{ name: string; path: string }>;
  extra?: Record<string, unknown>;
};

export type LocalizedContentVersion = {
  locale: InternalLocale;
  translationStatus: PublicationStatus;
  reviewStatus: PublicationStatus;
  publishStatus: PublicationStatus;
  slug: string;
  publicPath: string;
  title: string;
  description: string;
  h1: string;
  body: ContentBlock[];
  faq: LocalizedFaq[];
  author?: LocalizedAuthor;
  reviewedBy?: LocalizedAuthor;
  schemaData: SchemaData;
  images: LocalizedImage[];
  internalLinks: LocalizedInternalLink[];
  canonicalData: { mode: "self"; noindex?: boolean };
  hreflangData: { include: boolean };
  updatedAt: string;
  publishedAt?: string;
  version: number;
};

export type ContentEntity = {
  id: string;
  type: ContentType;
  defaultLocale: InternalLocale;
  versions: Partial<Record<InternalLocale, LocalizedContentVersion>>;
};

export type ContentManifest = {
  schemaVersion: 1;
  entities: ContentEntity[];
};

export type PublishedContent = {
  entity: ContentEntity;
  version: LocalizedContentVersion;
};

export function isPublishedVersion(version: LocalizedContentVersion | undefined): version is LocalizedContentVersion {
  return Boolean(version && version.publishStatus === "published" && version.publishedAt);
}
