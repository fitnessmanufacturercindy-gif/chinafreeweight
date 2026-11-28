/* eslint-disable @next/next/no-img-element -- use WordPress-generated responsive sizes */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CmsEntry, CmsKind } from "../../lib/content/wordpress";
import { listCmsPilot } from "../../lib/content/wordpress-pilot";
import { getEnglishPageMetadata } from "../../lib/seo/english-alternates";

export function cmsMetadata(entry: CmsEntry): Metadata {
  const title = entry.seoTitle || entry.title;
  const description = entry.seoDescription || entry.excerpt;
  return {
    title,
    description,
    ...getEnglishPageMetadata(entry.path),
    openGraph: {
      title,
      description,
      url: entry.path,
      type: entry.category ? "website" : "article",
      images: entry.media ? [{ url: entry.media.source_url, alt: entry.media.alt_text || entry.title }] : [],
    },
  };
}

function CmsImage({ entry, compact = false }: { entry: CmsEntry; compact?: boolean }) {
  const media = entry.media;
  if (!media) return null;
  const byWidth = new Map<number, string>();
  for (const image of Object.values(media.media_details?.sizes ?? {})) {
    if (image.width > 150) byWidth.set(image.width, image.source_url);
  }
  const variants = [...byWidth].sort(([left], [right]) => left - right);
  return (
    <img
      src={compact && variants.length ? variants[0][1] : media.source_url}
      srcSet={variants.length ? variants.map(([width, src]) => `${src} ${width}w`).join(", ") : undefined}
      sizes={compact ? "(max-width: 700px) 90vw, 360px" : "(max-width: 700px) 90vw, 640px"}
      width={media.media_details?.width}
      height={media.media_details?.height}
      alt={media.alt_text || entry.title}
      loading={compact ? "lazy" : undefined}
      fetchPriority={compact ? undefined : "high"}
      decoding="async"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

export function CmsDetail({ entry }: { entry: CmsEntry }) {
  return (
    <main className={entry.category ? "product-page" : "article-page"}>
      <section className={entry.category ? "product-detail-hero" : "article-hero"}>
        {entry.category && entry.media && <div className="product-detail-media"><CmsImage entry={entry} /></div>}
        <div className={entry.category ? "product-detail-copy" : "article-hero-copy"}>
          <Link className="breadcrumb-link" href={entry.category ? `/products/${entry.category}` : "/resources"}>
            {entry.category ? "Product catalogue" : "Buyer resources"}
          </Link>
          <h1>{entry.title}</h1>
          {entry.excerpt && <p>{entry.excerpt}</p>}
          {(entry.weightRange || entry.material) && (
            <div className="product-detail-specs">
              {entry.weightRange && <div><span>Weight range</span><strong>{entry.weightRange}</strong></div>}
              {entry.material && <div><span>Material</span><strong>{entry.material}</strong></div>}
            </div>
          )}
          {entry.category && (
            <div className="hero-actions">
              <Link href="/contact" className="primary-button">Request Product Quote <ArrowRight size={18} /></Link>
            </div>
          )}
        </div>
        {!entry.category && entry.media && <figure className="article-hero-media"><CmsImage entry={entry} /></figure>}
      </section>
      <div className={entry.category ? "products-section" : "article-layout"}>
        <article className="article-content" dangerouslySetInnerHTML={{ __html: entry.html }} />
        {entry.gallery.length > 0 && (
          <div className="detail-photo-grid">
            {entry.gallery.map((image) => (
              <img key={image.url} src={image.url} width={image.width} height={image.height}
                alt={image.alt || entry.title} loading="lazy" style={{ maxWidth: "100%", height: "auto" }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export async function CmsPilotList({ kind, category }: { kind: CmsKind; category?: CmsEntry["category"] }) {
  const all = await listCmsPilot(kind);
  const entries = category ? all.filter((entry) => entry.category === category) : all;
  if (!entries.length) return null;
  return (
    <section className="products-section" aria-label={kind === "articles" ? "Latest articles" : "Latest products"}>
      <h2>{kind === "articles" ? "Latest Articles" : "Latest Products"}</h2>
      <div className={kind === "articles" ? "post-grid" : "dumbbell-grid"}>
        {entries.map((entry) => (
          <article key={entry.path} className={kind === "articles" ? "post-card" : "dumbbell-card"}>
            {entry.media && (
              <Link href={entry.path} className={kind === "articles" ? "post-image-link" : undefined} aria-label={entry.title}>
                <CmsImage entry={entry} compact />
              </Link>
            )}
            <div className={kind === "articles" ? "post-body" : undefined}>
              <h3><Link href={entry.path}>{entry.title}</Link></h3>
              <p>{entry.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
