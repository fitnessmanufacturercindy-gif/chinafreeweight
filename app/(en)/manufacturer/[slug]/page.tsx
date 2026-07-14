import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { siteUrl } from "../../../site";

type PageProps = { params: Promise<{ slug: string }> };
const contentDir = path.join(process.cwd(), "content", "manufacturer");
const removeSectionHeadings = [
  "Image Plan",
  "Missing Evidence",
  "Internal Notes",
  "Content Strategy",
  "Generation Notes",
  "Content Score",
  "SEO Goal",
  "AI Citation Goal",
  "Search Intent",
  "Buyer Intent",
  "Source Opportunity",
  "Draft Review"
];
const hiddenHeadingLabels = new Set(["Hero", "Expert Insight"]);
const customerVisibleForbidden = [
  "Describe",
  "Explain",
  "Answer this",
  "Missing Evidence",
  "Image Plan",
  "Internal Notes",
  "Draft Review",
  "Content Excellence Score",
  "Status: Missing",
  "Generation Notes"
];

function readLanding(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
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

function stripBackendSections(body: string) {
  const lines = body.split("\n");
  const visible: string[] = [];
  let skipping = false;
  for (const line of lines) {
    const heading = line.trim().match(/^##\s+(.+)$/)?.[1]?.trim();
    if (heading && removeSectionHeadings.includes(heading)) {
      skipping = true;
      continue;
    }
    if (heading) skipping = false;
    if (!skipping) visible.push(line);
  }
  return visible.join("\n").trim();
}

function splitRelatedPages(body: string) {
  const match = body.match(/^##\s+Related Pages\s*$\n([\s\S]*?)$/im);
  const links = match?.[1]
    ?.split(/\r?\n/)
    .map((line) => line.trim().replace(/^-\s+/, ""))
    .filter((line) => line.startsWith("/")) || [];
  return {
    body: body.replace(/^##\s+Related Pages\s*$[\s\S]*$/im, "").trim(),
    links
  };
}

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function customerVisibleText(body: string) {
  return splitRelatedPages(stripBackendSections(body)).body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !hiddenHeadingLabels.has(line.replace(/^##\s+/, "")))
    .join("\n");
}

function assertCustomerVisibleContent(body: string, slug: string) {
  const visible = customerVisibleText(body);
  const forbidden = customerVisibleForbidden.filter((term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(visible));
  if (forbidden.length) {
    throw new Error(`Customer Visible Content Check failed for ${slug}: ${forbidden.join(", ")}`);
  }
  const hasDefinition = /rubber hex dumbbells are/i.test(visible);
  const hasProfessionalExplanation = /manufacturing|quality control|production process/i.test(visible);
  const hasBuyerQuestions = /buyers should|importers should|supplier should/i.test(visible);
  const hasFaq = /^##\s+FAQ\s*$/im.test(visible);
  const hasTable = /\|\s*Factor\s*\|\s*Why It Matters\s*\|\s*What Buyers Should Check\s*\|/i.test(visible);
  const hasInternalLinks = splitRelatedPages(stripBackendSections(body)).links.length > 0;
  const missing = [
    !hasDefinition ? "definition paragraph" : "",
    !hasProfessionalExplanation ? "professional explanation" : "",
    !hasBuyerQuestions ? "buyer questions" : "",
    !hasFaq ? "FAQ" : "",
    !hasTable ? "buyer table" : "",
    !hasInternalLinks ? "internal links" : ""
  ].filter(Boolean);
  if (missing.length) {
    throw new Error(`SEO/GEO/AI content check failed for ${slug}: missing ${missing.join(", ")}`);
  }
}

function parseTable(lines: string[], start: number) {
  const rows: string[][] = [];
  let index = start;
  while (index < lines.length && lines[index].trim().startsWith("|")) {
    const cells = lines[index].trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
    rows.push(cells);
    index += 1;
  }
  const separator = rows[1]?.every((cell) => /^:?-{3,}:?$/.test(cell));
  if (rows.length < 2 || !separator) return null;
  return {
    headers: rows[0],
    bodyRows: rows.slice(2),
    nextIndex: index
  };
}

function renderMarkdown(body: string) {
  const { body: contentBody, links } = splitRelatedPages(stripBackendSections(body));
  const lines = contentBody.split("\n");
  const elements: ReactNode[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const table = parseTable(lines, index);
    if (table) {
      elements.push(
        <div className="article-table-wrap" key={`table-${index}`}>
          <table>
            <thead>
              <tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
            </thead>
            <tbody>
              {table.bodyRows.map((row, rowIndex) => (
                <tr key={`${index}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => <td key={`${index}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      index = table.nextIndex - 1;
      continue;
    }
    const line = lines[index];
    const text = line.trim();
    if (!text) continue;
    if (text.startsWith("## ") && hiddenHeadingLabels.has(text.slice(3))) continue;
    if (text.startsWith("# ")) elements.push(<h1 key={index}>{text.slice(2)}</h1>);
    else if (text.startsWith("## ")) elements.push(<h2 key={index}>{text.slice(3)}</h2>);
    else if (text.startsWith("### ")) elements.push(<h3 key={index}>{text.slice(4)}</h3>);
    else if (text.startsWith("- ")) elements.push(<li key={index}>{text.slice(2)}</li>);
    else elements.push(<p key={index}>{text}</p>);
  }
  if (links.length) {
    elements.push(
      <section className="article-related-links" key="related-pages">
        <h2>Related Pages</h2>
        <ul>
          {links.map((link) => (
            <li key={link}><a href={link}>{link}</a></li>
          ))}
        </ul>
      </section>
    );
  }
  return elements;
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

function faqItems(body: string) {
  const items: Array<{ question: string; answer: string }> = [];
  let inFaq = false;
  let currentQuestion = "";
  let currentAnswer: string[] = [];
  const flush = () => {
    const answer = currentAnswer.join(" ").replace(/\s+/g, " ").trim();
    if (currentQuestion && answer) items.push({ question: currentQuestion, answer });
    currentQuestion = "";
    currentAnswer = [];
  };
  for (const line of stripBackendSections(body).split("\n")) {
    const text = line.trim();
    const h2 = text.match(/^##\s+(.+)$/)?.[1]?.trim();
    if (h2) {
      if (inFaq) flush();
      inFaq = h2 === "FAQ";
      continue;
    }
    if (!inFaq || !text) continue;
    const h3 = text.match(/^###\s+(.+)$/)?.[1]?.trim();
    if (h3) {
      flush();
      currentQuestion = h3;
      continue;
    }
    if (currentQuestion) currentAnswer.push(text);
  }
  if (inFaq) flush();
  return items;
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = readLanding(slug);
  if (!page) notFound();
  assertCustomerVisibleContent(page.body, slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.data.title || "Manufacturer Landing Page",
    provider: { "@type": "Organization", name: "PowerBaseFit", url: siteUrl },
    areaServed: "Global"
  };
  const pageUrl = absoluteUrl(`/manufacturer/${slug}`);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Manufacturer", item: absoluteUrl("/manufacturer") },
      { "@type": "ListItem", position: 3, name: page.data.title || "Rubber Hex Dumbbell Manufacturer", item: pageUrl }
    ]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems(page.body).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <article className="article-shell">
        <a className="back-link" href="/factory">Back to factory</a>
        <div className="article-kicker">{page.data.primary_keyword || "manufacturer"}</div>
        <div className="article-content">{renderMarkdown(page.body)}</div>
        <a className="article-inline-cta" href="/contact">Request factory quotation</a>
      </article>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
