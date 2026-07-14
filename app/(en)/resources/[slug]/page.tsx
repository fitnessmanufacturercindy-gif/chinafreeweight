import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ResourceImage } from "../../../resources/blogData";
import { getAllPosts, getPostBySlug } from "../../../resources/blogData";
import { getEnglishAlternates } from "../../../../lib/seo/english-alternates";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: getEnglishAlternates(`/resources/${post.slug}`)
  };
}

function inlineFormat(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function renderArticleImage(image: ResourceImage, key: string) {
  return (
    <figure className="article-image" key={key}>
      <img src={image.src} alt={image.alt} />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function renderMarkdown(content: string, images: ResourceImage[]) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let h2Count = 0;
  let insertedImageCount = 0;

  function flushList(key: string) {
    if (listItems.length === 0) {
      return;
    }

    blocks.push(
      <ul key={key}>
        {listItems.map((item) => (
          <li key={item}>{inlineFormat(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    const key = `${index}-${line.slice(0, 24)}`;

    if (!line) {
      flushList(`list-${index}`);
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList(`list-${index}`);

    if (line.startsWith("# ")) {
      blocks.push(<h1 key={key}>{line.slice(2)}</h1>);
      return;
    }

    if (line.startsWith("## ")) {
      h2Count += 1;
      if ([2, 5, 9].includes(h2Count) && images[insertedImageCount]) {
        blocks.push(renderArticleImage(images[insertedImageCount], `article-image-${insertedImageCount}`));
        insertedImageCount += 1;
      }
      blocks.push(<h2 key={key}>{line.slice(3)}</h2>);
      return;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key}>{line.slice(4)}</h3>);
      return;
    }

    if (/^CTA Button:/.test(line)) {
      blocks.push(
        <a className="article-inline-cta" href="/contact" key={key}>
          {line.replace("CTA Button:", "").trim()} <ArrowRight size={18} />
        </a>
      );
      return;
    }

    blocks.push(<p key={key}>{inlineFormat(line)}</p>);
  });

  flushList("list-final");
  while (insertedImageCount < Math.min(images.length, 3)) {
    blocks.push(renderArticleImage(images[insertedImageCount], `article-image-tail-${insertedImageCount}`));
    insertedImageCount += 1;
  }
  return blocks;
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getAllPosts().filter((item) => item.slug !== slug);

  return (
    <main className="article-page">
      <header className="article-header">
        <a className="article-brand" href="/">
          <img src="/assets/logo-readable.png" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Article navigation">
          <a href="/resources">Resources</a>
          <a href="/factory">Factory</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <article className="article-shell">
        <a className="back-link" href="/resources">
          <ArrowLeft size={18} /> Back to resources
        </a>
        <div className="article-kicker">{post.primaryKeyword}</div>
        <a className="article-hero-image" href="/contact" aria-label="Send requirements for this product topic">
          <img src={post.coverImage} alt={post.coverAlt} />
          <span>Click to discuss this sourcing topic</span>
        </a>
        <div className="article-product-link">
          <strong>Related product category</strong>
          <a href="/products/weight-plates">
            View Weight Plates products <ArrowRight size={18} />
          </a>
        </div>
        <div className="article-content">{renderMarkdown(post.content, post.articleImages)}</div>
      </article>

      <aside className="related-section">
        <div>
          <span>Next guides</span>
          <h2>Continue planning your free weight sourcing project</h2>
        </div>
        <div className="related-grid">
          {relatedPosts.map((item) => (
            <a href={`/resources/${item.slug}`} key={item.slug}>
              <strong>{item.title}</strong>
              <small>{item.readingTime}</small>
            </a>
          ))}
        </div>
      </aside>

      <style>{`
        .article-page {
          min-height: 100vh;
          color: #f7f1e6;
          background:
            radial-gradient(circle at 78% 4%, rgba(241, 199, 107, 0.14), transparent 28%),
            linear-gradient(180deg, #070707 0%, #111 46%, #070707 100%);
          font-family: Arial, Helvetica, sans-serif;
        }

        .article-page a {
          color: inherit;
          text-decoration: none;
        }

        .article-header,
        .article-shell,
        .related-section {
          width: min(1320px, calc(100% - 32px));
          margin: 0 auto;
        }

        .article-header {
          min-height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: 12px 0;
        }

        .article-brand {
          width: 240px;
          height: 62px;
          display: flex;
          align-items: center;
        }

        .article-brand img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .article-header nav {
          display: flex;
          gap: 28px;
          color: #ddd5c7;
          font-size: 18px;
          font-weight: 700;
        }

        .article-shell {
          padding: 62px 0 72px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f1c76b;
          font-weight: 900;
          margin-bottom: 32px;
        }

        .article-kicker {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .article-hero-image {
          position: relative;
          width: 100%;
          max-width: 1120px;
          height: 520px;
          display: block;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background: #151515;
          margin-bottom: 44px;
        }

        .article-hero-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 280ms ease, filter 280ms ease;
        }

        .article-hero-image:hover img {
          filter: brightness(1.08);
          transform: scale(1.025);
        }

        .article-hero-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.58));
        }

        .article-hero-image span {
          position: absolute;
          left: 24px;
          bottom: 22px;
          z-index: 1;
          padding: 10px 14px;
          border-radius: 999px;
          color: #101010;
          background: #f1c76b;
          font-size: 14px;
          font-weight: 900;
        }

        .article-content {
          max-width: 980px;
        }

        .article-product-link {
          max-width: 980px;
          margin: 0 0 38px;
          padding: 20px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background: rgba(255, 255, 255, 0.045);
        }

        .article-product-link strong {
          color: #fff8ec;
          font-size: 18px;
        }

        .article-product-link a {
          min-height: 44px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 8px;
          color: #101010;
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          font-size: 15px;
          font-weight: 900;
        }

        .article-content h1 {
          margin: 0 0 28px;
          color: #fff8ec;
          font-size: clamp(46px, 5vw, 78px);
          line-height: 0.98;
          letter-spacing: 0;
        }

        .article-content h2 {
          margin: 54px 0 18px;
          color: #fff8ec;
          font-size: clamp(31px, 3vw, 46px);
          line-height: 1.06;
          letter-spacing: 0;
        }

        .article-content h3 {
          margin: 34px 0 12px;
          color: #f7f1e6;
          font-size: 25px;
          line-height: 1.18;
        }

        .article-content p,
        .article-content li {
          color: #d5ccb9;
          font-size: 19px;
          line-height: 1.72;
        }

        .article-content ul {
          margin: 18px 0 28px;
          padding-left: 24px;
        }

        .article-content li {
          margin-bottom: 8px;
        }

        .article-content strong {
          color: #fff8ec;
        }

        .article-image {
          margin: 46px 0 34px;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
        }

        .article-image img {
          width: 100%;
          height: 460px;
          display: block;
          object-fit: cover;
        }

        .article-image figcaption {
          padding: 15px 18px 17px;
          color: #d5ccb9;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 15px;
          line-height: 1.45;
        }

        .article-inline-cta {
          min-height: 54px;
          width: fit-content;
          margin: 18px 0 14px;
          padding: 0 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 8px;
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          color: #101010 !important;
          font-size: 17px;
          font-weight: 900;
        }

        .related-section {
          margin-bottom: 72px;
          padding: 36px;
          border-radius: 12px;
          border: 1px solid rgba(241, 199, 107, 0.25);
          background: rgba(255, 255, 255, 0.045);
        }

        .related-section span {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 13px;
          font-weight: 900;
        }

        .related-section h2 {
          max-width: 900px;
          margin: 12px 0 24px;
          font-size: clamp(30px, 3vw, 46px);
          line-height: 1.06;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .related-grid a {
          min-height: 130px;
          padding: 22px;
          display: grid;
          align-content: space-between;
          gap: 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.24);
        }

        .related-grid strong {
          font-size: 22px;
          line-height: 1.2;
        }

        .related-grid small {
          color: #f1c76b;
          font-weight: 900;
        }

        @media (max-width: 760px) {
          .article-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .article-header nav {
            flex-wrap: wrap;
          }

          .article-shell {
            padding-top: 38px;
          }

          .article-hero-image {
            height: 300px;
          }

          .article-image img {
            height: 270px;
          }

          .article-product-link {
            align-items: flex-start;
            flex-direction: column;
          }

          .article-content p,
          .article-content li {
            font-size: 17px;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
