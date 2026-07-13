import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteUrl } from "../../site";

type PageProps = { params: Promise<{ slug: string }> };
const contentDir = path.join(process.cwd(), "content", "manufacturer");

function readLanding(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const data: Record<string, string> = {};
  if (match) {
    for (const line of match[1].split("\n")) {
      const index = line.indexOf(":");
      if (index > -1) data[line.slice(0, index).trim()] = line.slice(index + 1).trim().replace(/^"|"$/g, "");
    }
    return { data, body: match[2].trim() };
  }
  return { data, body: raw.trim() };
}

function slugs() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((file) => file.endsWith(".md")).map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

function renderMarkdown(body: string) {
  return body.split("\n").map((line, index) => {
    const text = line.trim();
    if (!text) return null;
    if (text.startsWith("# ")) return <h1 key={index}>{text.slice(2)}</h1>;
    if (text.startsWith("## ")) return <h2 key={index}>{text.slice(3)}</h2>;
    if (text.startsWith("### ")) return <h3 key={index}>{text.slice(4)}</h3>;
    if (text.startsWith("- ")) return <li key={index}>{text.slice(2)}</li>;
    return <p key={index}>{text}</p>;
  });
}

export function generateStaticParams() { return slugs(); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = readLanding(slug);
  if (!page) return {};
  return {
    title: page.data.title || "Manufacturer Landing Page",
    description: page.data.meta_description || "PowerBaseFit sourcing page for global free weight buyers.",
    alternates: { canonical: `/manufacturer/${slug}` }
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = readLanding(slug);
  if (!page) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.data.title || "Manufacturer Landing Page",
    provider: { "@type": "Organization", name: "PowerBaseFit", url: siteUrl },
    areaServed: "Global"
  };
  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article-shell">
        <a className="back-link" href="/factory">Back to factory</a>
        <div className="article-kicker">{page.data.primary_keyword || "manufacturer"}</div>
        <div className="article-content">{renderMarkdown(page.body)}</div>
        <a className="article-inline-cta" href="/contact">Request factory quotation</a>
      </article>
    </main>
  );
}
