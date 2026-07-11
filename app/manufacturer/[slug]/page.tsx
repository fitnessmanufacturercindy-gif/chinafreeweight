import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteUrl } from "../../site";

type PageProps = { params: Promise<{ slug: string }> };

type LandingPage = {
  data: Record<string, string>;
  body: string;
};

const contentDir = path.join(process.cwd(), "content", "manufacturer");

function readLanding(slug: string): LandingPage | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const data: Record<string, string> = {};
  if (!match) return { data, body: raw.trim() };
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index > -1) data[line.slice(0, index).trim()] = line.slice(index + 1).trim().replace(/^"|"$/g, "");
  }
  return { data, body: match[2].trim() };
}

function getSlugs() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((file) => file.endsWith(".md")).map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

function inlineText(text: string) {
  const link = text.match(/^(.+):\s+(\/.*)$/);
  if (link) return <><span>{link[1]}: </span><a href={link[2]}>{link[2]}</a></>;
  return text;
}

function renderMarkdown(body: string) {
  return body.split("\n").map((raw, index) => {
    const line = raw.trim();
    if (!line) return null;
    if (line.startsWith("# ")) return <h1 key={index}>{line.slice(2)}</h1>;
    if (line.startsWith("## ")) return <h2 key={index}>{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 key={index}>{line.slice(4)}</h3>;
    if (line.startsWith("- ")) return <li key={index}>{inlineText(line.slice(2))}</li>;
    return <p key={index}>{line}</p>;
  });
}

export function generateStaticParams() {
  return getSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = readLanding(slug);
  if (!page) return {};
  return {
    title: page.data.title || "Manufacturer Landing Page",
    description: page.data.meta_description || "PowerBaseFit manufacturer sourcing page for global free weight buyers.",
    alternates: { canonical: `/manufacturer/${slug}` }
  };
}

export default async function ManufacturerLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = readLanding(slug);
  if (!page) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.data.title || "PowerBaseFit Manufacturer Landing Page",
    description: page.data.meta_description,
    provider: { "@type": "Organization", name: "PowerBaseFit", url: siteUrl },
    areaServed: "Global",
    serviceType: "Free weight equipment manufacturing and OEM sourcing"
  };
  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article-shell">
        <a className="back-link" href="/factory">Back to factory</a>
        <div className="article-kicker">{page.data.primary_keyword || "manufacturer sourcing"}</div>
        <div className="article-content">{renderMarkdown(page.body)}</div>
        <a className="article-inline-cta" href="/contact">Request factory quotation</a>
      </article>
    </main>
  );
}