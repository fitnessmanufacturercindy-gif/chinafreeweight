import type { ContentBlock, ContentType, LocalizedAuthor } from "../../lib/content/types";

export type SpanishPage = {
  id: string;
  type: ContentType;
  esPath: string;
  title: string;
  description: string;
  h1: string;
  blocks: ContentBlock[];
  faq: Array<[string, string]>;
  image?: [string, string];
  links: Array<[string, string]>;
  sku?: string;
  material?: string;
  category?: string;
  specifications?: Array<{ name: string; value: string }>;
  author?: LocalizedAuthor;
  reviewedBy?: LocalizedAuthor;
  updatedAt?: string;
  publishedAt?: string;
};
