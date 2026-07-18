import fs from "node:fs";
import path from "node:path";
import type {
  ContentBlock,
  ContentEntity,
  LocalizedAuthor,
  LocalizedContentVersion,
  LocalizedFaq,
  LocalizedImage,
  LocalizedInternalLink
} from "./types";
import type { InternalLocale } from "../../i18n/locale-registry";

type Frontmatter = Record<string, string | string[]>;

export type MultilingualBlogDocument = {
  entityId: string;
  locale: InternalLocale;
  publicPath: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  targetBuyer: string;
  publishedAt: string;
  updatedAt: string;
  images: Array<LocalizedImage & { caption: string }>;
  internalLinks: LocalizedInternalLink[];
  content: string;
  body: ContentBlock[];
  faq: LocalizedFaq[];
};

const blogDirectory = path.join(process.cwd(), "content", "multilingual-blogs");
const localeFolders: InternalLocale[] = ["en", "pt-BR", "es"];

const editorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-technical-team",
  name: "PowerBaseFit Technical Team",
  kind: "Organization",
  role: "Free Weight Equipment Manufacturer",
  url: "/factory"
};

const technicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-quality-team",
  name: "PowerBaseFit Quality Team",
  kind: "Organization",
  role: "Manufacturing and Quality Review",
  url: "/factory"
};

function parseFrontmatter(source: string): { data: Frontmatter; content: string } {
  const normalized = source.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Multilingual blog is missing YAML frontmatter");

  const data: Frontmatter = {};
  let listKey = "";
  for (const rawLine of match[1].split("\n")) {
    const listItem = rawLine.match(/^\s+-\s+(.+)$/);
    if (listItem && listKey) {
      const list = Array.isArray(data[listKey]) ? data[listKey] as string[] : [];
      list.push(listItem[1].trim());
      data[listKey] = list;
      continue;
    }

    const field = rawLine.match(/^([a-z0-9_]+):\s*(.*)$/);
    if (!field) continue;
    listKey = field[1];
    const value = field[2].trim().replace(/^"|"$/g, "");
    data[listKey] = value || [];
  }

  return { data, content: match[2].trim() };
}

function required(data: Frontmatter, key: string, filename: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) throw new Error(`${filename}: missing ${key}`);
  return value.trim();
}

function list(data: Frontmatter, key: string): string[] {
  const value = data[key];
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value) return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function parseImages(items: string[], filename: string): Array<LocalizedImage & { caption: string }> {
  return items.map((item, index) => {
    const [src, alt, caption] = item.split(" || ").map((part) => part.trim());
    if (!src || !alt || !caption) throw new Error(`${filename}: image ${index + 1} must include src, alt, and caption`);
    return { id: `image-${index + 1}`, src, alt, caption };
  });
}

function parseLinks(items: string[], filename: string): LocalizedInternalLink[] {
  return items.map((item, index) => {
    const [targetContentId, label] = item.split(" || ").map((part) => part.trim());
    if (!targetContentId || !label) throw new Error(`${filename}: internal link ${index + 1} is invalid`);
    return { targetContentId, label };
  });
}

function cleanInline(value: string): string {
  return value.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}

function splitFaq(content: string): { article: string; faq: LocalizedFaq[] } {
  const match = content.match(/^## (?:Frequently Asked Questions|Perguntas frequentes|Preguntas frecuentes)\s*$/m);
  if (!match || match.index === undefined) return { article: content, faq: [] };
  const beforeFaq = content.slice(0, match.index).trim();
  const afterFaq = content.slice(match.index + match[0].length).trim();
  const trailingSection = afterFaq.match(/^## (?:Conclusion|Conclusão|Conclusión)\s*$/m);
  const faqSource = trailingSection?.index === undefined ? afterFaq : afterFaq.slice(0, trailingSection.index).trim();
  const trailingArticle = trailingSection?.index === undefined ? "" : afterFaq.slice(trailingSection.index).trim();
  const article = [beforeFaq, trailingArticle].filter(Boolean).join("\n\n");
  const faq = faqSource.split(/^### /m).slice(1).map((entry, index) => {
    const [question, ...answer] = entry.trim().split("\n");
    return {
      id: `faq-${index + 1}`,
      question: cleanInline(question),
      answer: cleanInline(answer.join(" ").replace(/\s+/g, " "))
    };
  });
  return { article, faq };
}

function parseBody(content: string): { body: ContentBlock[]; faq: LocalizedFaq[] } {
  const { article, faq } = splitFaq(content);
  const sections = article.split(/^## /m).slice(1);
  const body = sections.map((section, index) => {
    const [heading, ...lines] = section.trim().split("\n");
    const normalizedHeading = cleanInline(heading);
    const component = /quick answer|resposta rápida|respuesta rápida/i.test(normalizedHeading)
      ? "quick-answer"
      : /definition|definição|definición/i.test(normalizedHeading)
        ? "definition"
        : "markdown-section";
    return {
      id: `section-${index + 1}`,
      type: "custom" as const,
      heading: normalizedHeading,
      data: { component, markdown: lines.join("\n").trim() }
    };
  });
  return { body, faq };
}

function parseDocument(filename: string, locale: InternalLocale): MultilingualBlogDocument {
  const source = fs.readFileSync(filename, "utf8");
  const { data, content } = parseFrontmatter(source);
  const relative = path.relative(process.cwd(), filename);
  const declaredLocale = required(data, "locale", relative) as InternalLocale;
  if (declaredLocale !== locale) throw new Error(`${relative}: locale does not match directory`);
  const { body, faq } = parseBody(content);
  return {
    entityId: required(data, "entity_id", relative),
    locale,
    publicPath: required(data, "public_path", relative),
    title: required(data, "title", relative),
    description: required(data, "description", relative),
    h1: required(data, "h1", relative),
    primaryKeyword: required(data, "primary_keyword", relative),
    secondaryKeywords: list(data, "secondary_keywords"),
    searchIntent: required(data, "search_intent", relative),
    targetBuyer: required(data, "target_buyer", relative),
    publishedAt: required(data, "published_at", relative),
    updatedAt: required(data, "updated_at", relative),
    images: parseImages(list(data, "images"), relative),
    internalLinks: parseLinks(list(data, "internal_links"), relative),
    content,
    body,
    faq
  };
}

export function getMultilingualBlogDocuments(): MultilingualBlogDocument[] {
  if (!fs.existsSync(blogDirectory)) return [];
  return localeFolders.flatMap((locale) => {
    const directory = path.join(blogDirectory, locale);
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory)
      .filter((filename) => filename.endsWith(".md"))
      .sort()
      .map((filename) => parseDocument(path.join(directory, filename), locale));
  });
}

function localizedBreadcrumbs(document: MultilingualBlogDocument) {
  if (document.locale === "en") {
    return [
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources" },
      { name: document.h1, path: document.publicPath }
    ];
  }
  const root = document.locale === "pt-BR" ? "/pt" : "/es";
  const home = document.locale === "pt-BR" ? "Início" : "Inicio";
  return [
    { name: home, path: root },
    { name: "Blog", path: `${root}/blog` },
    { name: document.h1, path: document.publicPath }
  ];
}

function toVersion(document: MultilingualBlogDocument): LocalizedContentVersion {
  return {
    locale: document.locale,
    translationStatus: document.locale === "en" ? "published" : "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: document.publicPath.split("/").filter(Boolean).at(-1) ?? document.entityId,
    publicPath: document.publicPath,
    title: document.title,
    description: document.description,
    h1: document.h1,
    body: document.body,
    faq: document.faq,
    author: editorialAuthor,
    reviewedBy: technicalReviewer,
    schemaData: {
      category: document.searchIntent,
      breadcrumbs: localizedBreadcrumbs(document),
      extra: {
        primaryKeyword: document.primaryKeyword,
        secondaryKeywords: document.secondaryKeywords,
        targetBuyer: document.targetBuyer
      }
    },
    images: document.images,
    internalLinks: document.internalLinks,
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: document.updatedAt,
    publishedAt: document.publishedAt,
    version: 1
  };
}

export function getMultilingualBlogEntities(): ContentEntity[] {
  const grouped = new Map<string, MultilingualBlogDocument[]>();
  for (const document of getMultilingualBlogDocuments()) {
    grouped.set(document.entityId, [...(grouped.get(document.entityId) ?? []), document]);
  }

  return [...grouped.entries()].map(([id, documents]) => {
    const localeSet = new Set(documents.map((document) => document.locale));
    if (localeSet.size !== 3 || !localeFolders.every((locale) => localeSet.has(locale))) {
      throw new Error(`Multilingual blog ${id} must have en, pt-BR, and es versions before publication`);
    }
    return {
      id,
      type: "blog",
      defaultLocale: "en",
      versions: Object.fromEntries(documents.map((document) => [document.locale, toVersion(document)]))
    } as ContentEntity;
  });
}
