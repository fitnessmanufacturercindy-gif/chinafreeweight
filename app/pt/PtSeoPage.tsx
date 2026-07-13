import { ArrowRight, CheckCircle2, Factory, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import { siteName, siteUrl } from "../site";

export type PtSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PtFaq = { question: string; answer: string };

export type PtPageContent = {
  path: string;
  englishPath: string;
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  cta: string;
  sections: PtSection[];
  faqs: PtFaq[];
  schemaType?: "Product" | "Service" | "Organization";
  productCategory?: string;
};

function JsonLd({ value }: { value: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />;
}

export default function PtSeoPage({ content }: { content: PtPageContent }) {
  const pageUrl = `${siteUrl}${content.path}`;
  const breadcrumbItems = [
    { name: "Início", item: `${siteUrl}/pt/` },
    ...(content.path.includes("/products/") ? [{ name: "Produtos", item: `${siteUrl}/pt/products/` }] : []),
    ...(content.path !== "/pt/" ? [{ name: content.h1, item: pageUrl }] : [])
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
  const primarySchema = {
    "@context": "https://schema.org",
    "@type": content.schemaType || "Service",
    name: content.h1,
    description: content.intro,
    url: pageUrl,
    image: `${siteUrl}${content.image}`,
    ...(content.schemaType === "Product"
      ? {
          category: content.productCategory,
          brand: { "@type": "Brand", name: siteName },
          manufacturer: { "@type": "Organization", name: "Powerbase Fitness Equipment Co.,Ltd", url: siteUrl }
        }
      : {
          provider: { "@type": "Organization", name: "Powerbase Fitness Equipment Co.,Ltd", url: siteUrl },
          areaServed: ["BR", "PT"]
        })
  };

  return (
    <main className="product-page pt-page" lang="pt-BR">
      <JsonLd value={breadcrumbSchema} />
      <JsonLd value={faqSchema} />
      <JsonLd value={primarySchema} />

      <section className="dumbbell-hero pt-hero">
        <div className="dumbbell-hero-copy">
          <span>{content.eyebrow}</span>
          <h1>{content.h1}</h1>
          <p>{content.intro}</p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              {content.cta} <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#conteudo">Ver detalhes</a>
          </div>
        </div>
        <div className="pt-hero-image">
          <img src={content.image} alt={content.imageAlt} fetchPriority="high" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Vantagens da PowerBaseFit">
        <article><Factory size={24} /><strong>Fabricante desde 2008</strong><span>Produção direta para projetos B2B e academias.</span></article>
        <article><ShieldCheck size={24} /><strong>OEM e marca própria</strong><span>Logo, cores, marcações e embalagem personalizáveis.</span></article>
        <article><Globe2 size={24} /><strong>Atendimento internacional</strong><span>Suporte comercial para Brasil, Portugal e outros mercados.</span></article>
      </section>

      <div id="conteudo">
        {content.sections.map((section, index) => (
          <section className={`products-section pt-content-section ${index % 2 ? "pt-section-alt" : ""}`} key={section.title}>
            <div className="section-heading-wide">
              <div><span>{section.eyebrow}</span><h2>{section.title}</h2></div>
            </div>
            <div className="pt-prose">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <div className="detail-list-grid">
                  {section.bullets.map((item) => <div key={item}><CheckCircle2 size={20} /><span>{item}</span></div>)}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <section className="products-section product-faq">
        <div className="section-heading-wide"><div><span>Perguntas frequentes</span><h2>Dúvidas de compradores profissionais</h2></div><p>Respostas objetivas para importadores, distribuidores, redes de academias e marcas fitness.</p></div>
        <div className="faq-list">
          {content.faqs.map((faq) => <article key={faq.question}><PackageCheck size={20} /><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Cotação de fábrica</span><h2>Receba uma proposta para o seu projeto</h2>
        <p>Envie a lista de produtos, quantidades, mercado de destino e necessidades de personalização. A equipe PowerBaseFit responderá com opções técnicas, embalagem e condições para o pedido.</p>
        <a className="primary-button" href="/contact">Solicitar cotação <ArrowRight size={18} /></a>
      </section>
    </main>
  );
}
