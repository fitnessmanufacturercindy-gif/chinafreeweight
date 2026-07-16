import { contentRepository } from "../../../lib/content/repository";
import type { PublishedContent } from "../../../lib/content/types";
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

export default function LocalizedPageTemplate({ content }: { content: PublishedContent }) {
  const { entity, version } = content;
  const breadcrumbs = version.schemaData.breadcrumbs ?? [];
  const locale = version.locale === "es" ? "es" : "pt-BR";
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

        {version.images[0] ? <img className="localized-feature-image" src={version.images[0].src} alt={version.images[0].alt} /> : null}

        <div className="localized-content">
          {version.body.map((block) => (
            <section key={block.id} data-content-block={block.type} id={block.id}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              {block.data?.component === "definition" && typeof block.data.term === "string" ? <p className="localized-definition-term">{block.data.term}</p> : null}
              {block.content ? <div className={block.data?.component === "quick-answer" ? "localized-quick-answer" : block.data?.component === "definition" ? "localized-definition" : undefined}>{paragraphs(block.content)}</div> : null}
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
