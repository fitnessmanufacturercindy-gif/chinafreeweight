/* eslint-disable @next/next/no-img-element -- use WordPress-generated responsive sizes */
import type { Metadata } from "next";
import Link from "next/link";
import type { CmsEntry, CmsKind } from "../../lib/content/wordpress";
import { listCmsPilot } from "../../lib/content/wordpress-pilot";
import { getEnglishAlternates } from "../../lib/seo/english-alternates";

export function cmsMetadata(entry: CmsEntry): Metadata {
  const title = entry.seoTitle || entry.title;
  const description = entry.seoDescription || entry.excerpt;
  return {
    title,
    description,
    alternates: getEnglishAlternates(entry.path),
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
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

export function CmsDetail({ entry }: { entry: CmsEntry }) {
  return (
    <main className={entry.category ? "product-page" : "article-page"}>
      <section className={entry.category ? "product-detail-hero" : "article-hero"}>
        <div className={entry.category ? "product-detail-copy" : "article-hero-copy"}>
          <h1>{entry.title}</h1>
          {entry.excerpt && <p>{entry.excerpt}</p>}
          {(entry.weightRange || entry.material) && (
            <dl className="product-detail-specs">
              {entry.weightRange && <div><dt>Weight range</dt><dd>{entry.weightRange}</dd></div>}
              {entry.material && <div><dt>Material</dt><dd>{entry.material}</dd></div>}
            </dl>
          )}
          {entry.category && <Link href="/contact" className="button primary">Get a Quote</Link>}
        </div>
        {entry.media && <figure className={entry.category ? "product-detail-media" : "article-hero-media"}><CmsImage entry={entry} /></figure>}
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
      <div className="product-grid">
        {entries.map((entry) => (
          <article key={entry.path}>
            <Link href={entry.path}>
              <CmsImage entry={entry} compact />
              <h3>{entry.title}</h3>
            </Link>
            <p>{entry.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
