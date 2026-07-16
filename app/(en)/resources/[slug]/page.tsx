import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Box,
  CheckCircle2,
  Factory,
  FileText,
  Mail
} from "lucide-react";
import type { ResourceImage, ResourcePost } from "../../../resources/blogData";
import { getAllPosts, getPostBySlug } from "../../../resources/blogData";
import { getEnglishAlternates } from "../../../../lib/seo/english-alternates";
import { siteName, siteUrl } from "../../../site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Faq = { question: string; answer: string };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    authors: [{ name: "PowerBaseFit Technical Team", url: "/factory" }],
    alternates: getEnglishAlternates(`/resources/${post.slug}`),
    openGraph: {
      type: "article",
      siteName,
      title: post.seoTitle,
      description: post.metaDescription,
      url: `/resources/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.coverImage, alt: post.coverAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.coverImage]
    }
  };
}

function cleanMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/^[-\d.\s]+/, "")
    .trim();
}

function getFaqs(content: string): Faq[] {
  const section = content.split(/^## Frequently Asked Questions[^\n]*$/m)[1];
  if (!section) return [];
  const faqBody = section.split(/^(?:## |\*\*(?:Sources|Evidence))/m)[0];
  return faqBody
    .split(/^### /m)
    .slice(1)
    .map((entry) => {
      const [question, ...answer] = entry.trim().split("\n");
      return {
        question: cleanMarkdown(question),
        answer: cleanMarkdown(answer.join(" ").replace(/\n+/g, " "))
      };
    });
}

function slugify(value: string) {
  return cleanMarkdown(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inlineFormat(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a key={`${index}-${link[2]}`} href={link[2]} rel={external ? "noreferrer" : undefined}>
          {link[1]}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function parseTableRow(line: string) {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderArticleImage(image: ResourceImage, key: string) {
  return (
    <figure className="article-image" key={key}>
      <img src={image.src} alt={image.alt} loading="lazy" />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function renderMarkdown(content: string, images: ResourceImage[]) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let h2Count = 0;
  let imageIndex = 0;
  let faqMode = false;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      h2Count += 1;
      faqMode = line.includes("Frequently Asked Questions");
      if ([4, 7].includes(h2Count) && images[imageIndex]) {
        blocks.push(renderArticleImage(images[imageIndex], `article-image-${imageIndex}`));
        imageIndex += 1;
      }
      const heading = line.slice(3);
      blocks.push(
        <h2 className={heading.startsWith("Quick Answer") ? "quick-answer-heading" : undefined} id={slugify(heading)} key={`h2-${index}`}>
          {heading}
        </h2>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const heading = line.slice(4);
      blocks.push(
        <h3 className={faqMode ? "faq-question" : undefined} id={slugify(heading)} key={`h3-${index}`}>
          {heading}
        </h3>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("| ") && lines[index + 1]?.trim().match(/^\|?\s*:?-+/)) {
      const headers = parseTableRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[index].trim()));
        index += 1;
      }
      blocks.push(
        <div className="article-table-wrap" key={`table-${index}`}>
          <table>
            <thead>
              <tr>{headers.map((header) => <th key={header}>{inlineFormat(header)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{inlineFormat(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul className="article-checklist" key={`ul-${index}`}>
          {items.map((item) => <li key={item}><CheckCircle2 size={18} /> <span>{inlineFormat(item)}</span></li>)}
        </ul>
      );
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\. /, ""));
        index += 1;
      }
      blocks.push(
        <ol className="article-steps" key={`ol-${index}`}>
          {items.map((item) => <li key={item}><span>{inlineFormat(item)}</span></li>)}
        </ol>
      );
      continue;
    }

    if (/^CTA Button:/.test(line)) {
      blocks.push(
        <a className="article-inline-cta" href="/contact" key={`cta-${index}`}>
          {line.replace("CTA Button:", "").trim()} <ArrowRight size={18} />
        </a>
      );
      index += 1;
      continue;
    }

    if (/^\*\*(?:Sources|Evidence)/.test(line)) {
      faqMode = false;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#|\||- |\d+\. |CTA Button:)/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    const paragraph = paragraphLines.join(" ");
    blocks.push(
      <p className={faqMode ? "faq-answer" : undefined} key={`p-${index}`}>
        {inlineFormat(paragraph)}
      </p>
    );
  }

  while (imageIndex < images.length) {
    blocks.push(renderArticleImage(images[imageIndex], `article-image-tail-${imageIndex}`));
    imageIndex += 1;
  }
  return blocks;
}

function articleSchemas(post: ResourcePost, faqs: Faq[]) {
  const url = `${siteUrl}/resources/${post.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.metaDescription,
      image: [`${siteUrl}${post.coverImage}`, ...post.articleImages.map((image) => `${siteUrl}${image.src}`)],
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: "PowerBaseFit Technical Team", url: `${siteUrl}/factory` },
      publisher: {
        "@type": "Organization",
        name: siteName,
        logo: { "@type": "ImageObject", url: `${siteUrl}/assets/logo-readable.webp` }
      },
      about: post.secondaryKeywords,
      inLanguage: "en"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
        { "@type": "ListItem", position: 3, name: post.title, item: url }
      ]
    }
  ];
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const faqs = getFaqs(post.content);
  const relatedPosts = getAllPosts().filter((item) => item.slug !== slug).slice(0, 4);
  const schemas = articleSchemas(post, faqs);

  return (
    <main className="article-page">
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="article-hero">
        <div className="article-hero-copy">
          <a className="back-link" href="/resources"><ArrowLeft size={17} /> Resource library</a>
          <span className="article-eyebrow">PowerBaseFit Technical Guide</span>
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span><Factory size={17} /> Manufacturer perspective</span>
            <span><BookOpen size={17} /> {post.readingTime}</span>
            <span>Updated {post.updatedAt}</span>
          </div>
        </div>
        <figure className="article-hero-media">
          <img src={post.coverImage} alt={post.coverAlt} fetchPriority="high" />
        </figure>
      </section>

      <div className="article-layout">
        <article className="article-content">{renderMarkdown(post.content, post.articleImages)}</article>

        <aside className="article-sidebar" aria-label="Related products and enquiries">
          <div className="sidebar-card sidebar-products">
            <span>Related products</span>
            <h2>Build the right free weight range</h2>
            <a href="/products/dumbbells"><Box size={18} /> Commercial dumbbells <ArrowRight size={16} /></a>
            <a href="/products/weight-plates"><Box size={18} /> Weight & bumper plates <ArrowRight size={16} /></a>
            <a href="/factory"><Factory size={18} /> Factory capabilities <ArrowRight size={16} /></a>
          </div>
          <div className="sidebar-card sidebar-cta">
            <FileText size={26} />
            <span>Buyer resources</span>
            <h2>Request the product catalog</h2>
            <p>Share your target products, weight range, market, and destination for a relevant catalog.</p>
            <a href="/contact">Request catalog <ArrowRight size={17} /></a>
          </div>
          <div className="sidebar-card sidebar-cta sidebar-cta-dark">
            <Mail size={26} />
            <span>OEM / Private label</span>
            <h2>Discuss a custom project</h2>
            <p>Prepare logo files, quantities, packaging needs, and your target delivery window.</p>
            <a href="/contact">Send an OEM inquiry <ArrowRight size={17} /></a>
          </div>
        </aside>
      </div>

      <section className="related-section">
        <div className="related-heading">
          <span>Continue researching</span>
          <h2>More free weight guides</h2>
        </div>
        <div className="related-grid">
          {relatedPosts.map((item) => (
            <a href={`/resources/${item.slug}`} key={item.slug}>
              <img src={item.coverImage} alt="" loading="lazy" />
              <div><strong>{item.title}</strong><small>{item.readingTime}</small></div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
