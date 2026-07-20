import { contentRepository } from "../../../lib/content/repository";
import type { PublishedContent } from "../../../lib/content/types";
import { Fragment, type ReactNode } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import LocalizedInquiryForm from "./LocalizedInquiryForm";

const pageCopy = {
  "pt-BR": {
    breadcrumb: "Navegação estrutural", eyebrow: "PowerBaseFit · Fabricante B2B",
    quote: "Solicitar cotação", by: "Por", reviewed: "Revisado por", updated: "Atualizado em",
    related: "Continue sua pesquisa", faq: "Perguntas frequentes",
    finalTitle: "Pronto para avaliar seu projeto?",
    finalText: "Envie sua lista de produtos, quantidades, personalização e destino para receber uma cotação B2B.",
    finalLink: "Falar com a PowerBaseFit", contactPath: "/pt/contato"
  },
  es: {
    breadcrumb: "Ruta de navegación", eyebrow: "PowerBaseFit · Fabricante B2B",
    quote: "Solicitar cotización", by: "Por", reviewed: "Revisado por", updated: "Actualizado el",
    related: "Continúe su investigación", faq: "Preguntas frecuentes",
    finalTitle: "¿Listo para evaluar su proyecto?",
    finalText: "Envíe la lista de productos, cantidades, personalización y destino para recibir una cotización B2B.",
    finalLink: "Hablar con PowerBaseFit", contactPath: "/es/contacto"
  },
  de: {
    breadcrumb: "Brotkrümelnavigation", eyebrow: "PowerBaseFit · B2B-Hersteller",
    quote: "Angebot anfordern", by: "Autor", reviewed: "Fachlich geprüft von", updated: "Aktualisiert am",
    related: "Passende Informationen", faq: "Häufig gestellte Fragen",
    finalTitle: "Möchten Sie Ihr Beschaffungsprojekt prüfen lassen?",
    finalText: "Senden Sie uns Produktliste, Mengen, gewünschte Individualisierung und Zielort. Sie erhalten eine projektbezogene B2B-Rückmeldung.",
    finalLink: "PowerBaseFit kontaktieren", contactPath: "/de/kontakt"
  },
  fr: {
    breadcrumb: "Fil d’Ariane", eyebrow: "PowerBaseFit · Fabricant B2B",
    quote: "Demander un devis", by: "Auteur", reviewed: "Relu par", updated: "Mis à jour le",
    related: "Informations complémentaires", faq: "Questions fréquentes",
    finalTitle: "Vous souhaitez évaluer votre projet d’achat ?",
    finalText: "Envoyez votre liste de produits, quantités, options de personnalisation et destination pour recevoir une réponse B2B adaptée.",
    finalLink: "Contacter PowerBaseFit", contactPath: "/fr/contact"
  }
} as const;

function paragraphs(content: string) {
  return content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function tableRows(value: unknown): string[][] {
  return Array.isArray(value) && value.every((row) => Array.isArray(row) && row.every((cell) => typeof cell === "string"))
    ? value
    : [];
}

function inlineFormat(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={`${index}-${link[2]}`} href={link[2]}>{link[1]}</a>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

function parseTableRow(line: string) {
  return line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function renderLocalizedMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split("\n");
  const output: ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }
    if (line.startsWith("### ")) {
      output.push(<h3 key={`h3-${index}`}>{inlineFormat(line.slice(4))}</h3>);
      index += 1;
      continue;
    }
    if (line.startsWith("| ") && /^\|?\s*:?-+/.test(lines[index + 1]?.trim() ?? "")) {
      const headers = parseTableRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[index].trim()));
        index += 1;
      }
      output.push(
        <div className="localized-table-wrap" key={`table-${index}`}>
          <table><thead><tr>{headers.map((header) => <th scope="col" key={header}>{inlineFormat(header)}</th>)}</tr></thead>
            <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inlineFormat(cell)}</td>)}</tr>)}</tbody>
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
      output.push(<ul className="localized-checklist" key={`ul-${index}`}>{items.map((item) => <li key={item}>{inlineFormat(item)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\. /, ""));
        index += 1;
      }
      output.push(<ol key={`ol-${index}`}>{items.map((item) => <li key={item}>{inlineFormat(item)}</li>)}</ol>);
      continue;
    }
    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(### |\| |- |\d+\. )/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    output.push(<p key={`p-${index}`}>{inlineFormat(paragraph.join(" "))}</p>);
  }
  return output;
}

function articleImage(image: PublishedContent["version"]["images"][number], className: string) {
  return (
    <figure className={className}>
      <img src={image.src} alt={image.alt} loading="lazy" />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

export default function LocalizedPageTemplate({ content }: { content: PublishedContent }) {
  const { entity, version } = content;
  const breadcrumbs = version.schemaData.breadcrumbs ?? [];
  const locale = version.locale === "fr" ? "fr" : version.locale === "de" ? "de" : version.locale === "es" ? "es" : "pt-BR";
  const text = pageCopy[locale];

  return (
    <main className="localized-page">
      <article>
        {breadcrumbs.length > 1 ? (
          <nav className="localized-breadcrumbs" aria-label={text.breadcrumb}>
            {breadcrumbs.map((item, index) => <span key={item.path}>{index ? " / " : ""}<a href={item.path}>{item.name}</a></span>)}
          </nav>
        ) : null}
        <header className="localized-hero">
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{version.h1}</h1>
          <p>{version.description}</p>
          <div className="localized-hero-actions">
            <a className="primary-cta" href={text.contactPath}>{text.quote}</a>
            <LanguageSwitcher contentId={entity.id} currentLocale={version.locale} />
          </div>
          <div className="localized-editorial-meta">
            {version.author ? <span>{text.by} {version.author.name}{version.author.role ? ` · ${version.author.role}` : ""}</span> : null}
            {version.reviewedBy ? <span>{text.reviewed} {version.reviewedBy.name}{version.reviewedBy.role ? ` · ${version.reviewedBy.role}` : ""}</span> : null}
            <time dateTime={version.updatedAt}>{text.updated} {new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(version.updatedAt))}</time>
          </div>
        </header>

        {version.images[0] ? articleImage(version.images[0], "localized-feature-image") : null}

        <div className="localized-content">
          {version.body.map((block, blockIndex) => (
            <Fragment key={block.id}>
            <section data-content-block={block.type} id={block.id}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              {block.data?.component === "definition" && typeof block.data.term === "string" ? <p className="localized-definition-term">{block.data.term}</p> : null}
              {block.content ? <div className={block.data?.component === "quick-answer" ? "localized-quick-answer" : block.data?.component === "definition" ? "localized-definition" : undefined}>{paragraphs(block.content)}</div> : null}
              {typeof block.data?.markdown === "string" ? <div className={block.data?.component === "quick-answer" ? "localized-quick-answer" : block.data?.component === "definition" ? "localized-definition" : undefined}>{renderLocalizedMarkdown(block.data.markdown)}</div> : null}
              {block.type === "specifications" && stringArray(block.data?.columns).length && tableRows(block.data?.rows).length ? (
                <div className="localized-table-wrap">
                  <table>
                    {typeof block.data?.caption === "string" ? <caption>{block.data.caption}</caption> : null}
                    <thead><tr>{stringArray(block.data?.columns).map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
                    <tbody>{tableRows(block.data?.rows).map((row, rowIndex) => <tr key={`${block.id}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${block.id}-${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              ) : null}
              {block.type === "features" && stringArray(block.data?.items).length ? <ul className="localized-checklist">{stringArray(block.data?.items).map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {block.data?.component === "inquiry-form" ? <LocalizedInquiryForm locale={locale} /> : null}
            </section>
            {blockIndex === 3 && version.images[1] ? articleImage(version.images[1], "localized-inline-image") : null}
            {blockIndex === 7 && version.images[2] ? articleImage(version.images[2], "localized-inline-image") : null}
            </Fragment>
          ))}

          {version.internalLinks.length ? (
            <section className="localized-related" aria-labelledby={`${entity.id}-related`}>
              <h2 id={`${entity.id}-related`}>{text.related}</h2>
              <div>
                {version.internalLinks.flatMap((link) => {
                  const target = contentRepository.getPublishedVersion(link.targetContentId, version.locale);
                  return target ? [<a key={link.targetContentId} href={target.version.publicPath}>{link.label}</a>] : [];
                })}
              </div>
            </section>
          ) : null}

          {version.faq.length ? (
            <section className="localized-faq" aria-labelledby={`${entity.id}-faq`}>
              <h2 id={`${entity.id}-faq`}>{text.faq}</h2>
              {version.faq.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
            </section>
          ) : null}

          <section className="localized-final-cta">
            <h2>{text.finalTitle}</h2>
            <p>{text.finalText}</p>
            <a className="primary-cta" href={text.contactPath}>{text.finalLink}</a>
          </section>
        </div>
      </article>
    </main>
  );
}
