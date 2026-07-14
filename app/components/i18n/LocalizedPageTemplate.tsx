import { contentRepository } from "../../../lib/content/repository";
import type { PublishedContent } from "../../../lib/content/types";
import LanguageSwitcher from "./LanguageSwitcher";
import PortugueseInquiryForm from "./PortugueseInquiryForm";

function paragraphs(content: string) {
  return content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

export default function LocalizedPageTemplate({ content }: { content: PublishedContent }) {
  const { entity, version } = content;
  const breadcrumbs = version.schemaData.breadcrumbs ?? [];

  return (
    <main className="localized-page">
      <article>
        {breadcrumbs.length > 1 ? (
          <nav className="localized-breadcrumbs" aria-label="Navegação estrutural">
            {breadcrumbs.map((item, index) => <span key={item.path}>{index ? " / " : ""}<a href={item.path}>{item.name}</a></span>)}
          </nav>
        ) : null}
        <header className="localized-hero">
          <p className="eyebrow">PowerBaseFit · Fabricante B2B</p>
          <h1>{version.h1}</h1>
          <p>{version.description}</p>
          <div className="localized-hero-actions">
            <a className="primary-cta" href="/pt/contato">Solicitar cotação</a>
            <LanguageSwitcher contentId={entity.id} currentLocale={version.locale} />
          </div>
        </header>

        {version.images[0] ? <img className="localized-feature-image" src={version.images[0].src} alt={version.images[0].alt} /> : null}

        <div className="localized-content">
          {version.body.map((block) => (
            <section key={block.id} data-content-block={block.type} id={block.id}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              {block.content ? paragraphs(block.content) : null}
              {block.data?.component === "inquiry-form" ? <PortugueseInquiryForm /> : null}
            </section>
          ))}

          {version.internalLinks.length ? (
            <section className="localized-related" aria-labelledby={`${entity.id}-related`}>
              <h2 id={`${entity.id}-related`}>Continue sua pesquisa</h2>
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
              <h2 id={`${entity.id}-faq`}>Perguntas frequentes</h2>
              {version.faq.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
            </section>
          ) : null}

          <section className="localized-final-cta">
            <h2>Pronto para avaliar seu projeto?</h2>
            <p>Envie sua lista de produtos, quantidades, personalização e destino para receber uma cotação B2B.</p>
            <a className="primary-cta" href="/pt/contato">Falar com a PowerBaseFit</a>
          </section>
        </div>
      </article>
    </main>
  );
}
