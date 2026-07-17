import type { Metadata } from "next";
import { ArrowRight, BookOpen, Factory, SearchCheck } from "lucide-react";
import { getAllPosts } from "../../resources/blogData";
import { getEnglishAlternates } from "../../../lib/seo/english-alternates";

export const metadata: Metadata = {
  title: "Resources | Free Weight Buying Guides for Importers & Gym Buyers",
  description:
    "Practical buying guides for commercial dumbbells, weight plates, bumper plates, and OEM gym equipment sourcing from China.",
  alternates: getEnglishAlternates("/resources"),
  openGraph: {
    type: "website",
    title: "PowerBaseFit Free Weight Knowledge Center",
    description:
      "Training science, manufacturing knowledge, and practical free weight buying guides for professional equipment buyers.",
    url: "/resources",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PowerBaseFit Free Weight Knowledge Center" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerBaseFit Free Weight Knowledge Center",
    description: "Training science, manufacturing knowledge, and practical free weight buying guides.",
    images: ["/og.png"]
  }
};

export default function ResourcesPage() {
  const posts = getAllPosts();

  return (
    <main className="resources-page">
      <header className="resources-header">
        <a className="resources-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Resources navigation">
          <a href="/">Home</a>
          <a href="/factory">Factory</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="resources-hero">
        <div>
          <span>Free Weight Knowledge Center</span>
          <h1>Training science, manufacturing knowledge, and practical buyer guides</h1>
          <p>
            Authoritative resources on dumbbells, bumper plates, free weight
            production, equipment quality, and commercial sourcing—written from
            the perspective of a professional fitness equipment manufacturer.
          </p>
        </div>
        <div className="hero-proof">
          <article>
            <Factory size={26} />
            <strong>Factory View</strong>
            <p>Manufacturing, packaging, shipment inspection, and OEM details.</p>
          </article>
          <article>
            <SearchCheck size={26} />
            <strong>Evidence-Led Answers</strong>
            <p>Clear training and equipment answers designed for people and AI search.</p>
          </article>
          <article>
            <BookOpen size={26} />
            <strong>Buyer Ready</strong>
            <p>Technical details and checklists that support a clearer RFQ.</p>
          </article>
        </div>
      </section>

      <section className="post-grid" aria-label="Resource articles">
        {posts.map((post, index) => (
          <article className="post-card" key={post.slug}>
            <a className="post-image-link" href={`/resources/${post.slug}`} aria-label={post.title}>
              <img src={post.coverImage} alt={post.coverAlt} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />
              <div className="post-number">0{index + 1}</div>
            </a>
            <div className="post-body">
              <span>{post.primaryKeyword}</span>
              <h2>
                <a href={`/resources/${post.slug}`}>{post.title}</a>
              </h2>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <strong>{post.readingTime}</strong>
                <small>{post.searchIntent}</small>
              </div>
              <a className="post-read-link" href={`/resources/${post.slug}`}>
                Read guide <ArrowRight size={18} />
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="resources-cta">
        <div>
          <span>Need a factory quote?</span>
          <h2>Send your product list, logo needs, and destination country.</h2>
          <p>
            PowerBaseFit can help compare suitable free weight products and
            prepare a practical OEM quotation.
          </p>
        </div>
        <a href="/contact">
          Send Requirements <ArrowRight size={20} />
        </a>
      </section>

      <style>{`
        .resources-page {
          min-height: 100vh;
          color: #f7f1e6;
          background:
            radial-gradient(circle at 80% 4%, rgba(241, 199, 107, 0.16), transparent 30%),
            linear-gradient(180deg, #070707 0%, #12100d 48%, #070707 100%);
          font-family: Arial, Helvetica, sans-serif;
        }

        .resources-page a {
          color: inherit;
          text-decoration: none;
        }

        .resources-header,
        .resources-hero,
        .post-grid,
        .resources-cta {
          width: min(1840px, calc(100% - 32px));
          margin: 0 auto;
        }

        .resources-header {
          min-height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: 12px 18px;
        }

        .resources-brand {
          width: 240px;
          height: 62px;
          display: flex;
          align-items: center;
        }

        .resources-brand img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .resources-header nav {
          display: flex;
          gap: 28px;
          color: #ddd5c7;
          font-size: 18px;
          font-weight: 700;
        }

        .resources-hero {
          min-height: 620px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(520px, 0.78fr);
          gap: 46px;
          align-items: center;
          padding: 64px 18px;
        }

        .resources-hero span,
        .post-card span,
        .resources-cta span {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 13px;
          font-weight: 900;
        }

        .resources-hero h1 {
          max-width: 1040px;
          margin: 16px 0 22px;
          font-size: clamp(50px, 5vw, 88px);
          line-height: 0.98;
          letter-spacing: 0;
        }

        .resources-hero p,
        .resources-cta p {
          color: #c9c0b1;
          font-size: 20px;
          line-height: 1.62;
        }

        .hero-proof {
          display: grid;
          gap: 16px;
        }

        .hero-proof article,
        .post-card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background:
            linear-gradient(135deg, rgba(241, 199, 107, 0.08), rgba(255, 255, 255, 0.035)),
            rgba(255, 255, 255, 0.045);
          border-radius: 10px;
          padding: 26px;
        }

        .hero-proof svg,
        .post-card a svg,
        .resources-cta a svg {
          color: #f1c76b;
        }

        .hero-proof strong {
          display: block;
          margin: 16px 0 8px;
          font-size: 24px;
        }

        .hero-proof p,
        .post-card p,
        .post-card small {
          color: #c9c0b1;
          font-size: 16px;
          line-height: 1.56;
        }

        .post-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          padding: 38px 18px 72px;
        }

        .post-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
        }

        .post-image-link {
          position: relative;
          min-height: 300px;
          display: block;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .post-image-link img {
          width: 100%;
          height: 320px;
          display: block;
          object-fit: cover;
          transition: transform 260ms ease, filter 260ms ease;
        }

        .post-image-link:hover img {
          filter: brightness(1.08);
          transform: scale(1.035);
        }

        .post-image-link::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.62));
        }

        .post-number {
          position: absolute;
          left: 26px;
          bottom: 20px;
          z-index: 1;
          color: rgba(241, 199, 107, 0.32);
          font-size: 64px;
          line-height: 1;
          font-weight: 900;
        }

        .post-body {
          min-height: 420px;
          padding: 26px;
          display: flex;
          flex-direction: column;
        }

        .post-card h2 {
          margin: 14px 0 16px;
          color: #fff8ec;
          font-size: 34px;
          line-height: 1.05;
        }

        .post-card h2 a:hover {
          color: #f1c76b;
        }

        .post-meta {
          display: grid;
          gap: 8px;
          margin-top: auto;
          padding-top: 22px;
        }

        .post-meta strong {
          color: #f1c76b;
        }

        .post-read-link,
        .resources-cta a {
          margin-top: 24px;
          min-height: 52px;
          width: fit-content;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 8px;
          border: 1px solid rgba(241, 199, 107, 0.48);
          color: #101010;
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          font-size: 16px;
          font-weight: 900;
        }

        .resources-cta {
          margin-bottom: 72px;
          padding: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          border-radius: 12px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background: #151515;
        }

        .resources-cta h2 {
          max-width: 980px;
          margin: 12px 0 14px;
          font-size: clamp(34px, 3vw, 52px);
          line-height: 1.06;
        }

        @media (max-width: 980px) {
          .resources-hero,
          .post-grid {
            grid-template-columns: 1fr;
          }

          .resources-cta {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 700px) {
          .resources-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .resources-header nav {
            flex-wrap: wrap;
          }

          .resources-hero {
            min-height: auto;
            padding-top: 38px;
          }

          .resources-hero h1 {
            font-size: 44px;
          }

          .post-image-link {
            min-height: 230px;
          }

          .post-image-link img {
            height: 240px;
          }

          .post-body {
            min-height: auto;
          }
        }
      `}</style>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
