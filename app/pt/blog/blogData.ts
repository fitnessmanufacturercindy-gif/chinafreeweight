export type PtBlogPost = {
  title: string;
  metaDescription: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
  faq: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
};

export const ptBlogPosts: PtBlogPost[] = [];
