import type {
  ContentBlock,
  ContentType,
  LocalizedAuthor
} from "../../lib/content/types";

export type PilotPage = {
  id: string;
  type: ContentType;
  enPath?: string;
  ptPath: string;
  enTitle?: string;
  title: string;
  description: string;
  h1: string;
  sections?: Array<[string, string]>;
  blocks?: ContentBlock[];
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
