import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Factory, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../../../components/MegaMenu";
import { sourcingFacts } from "../../../../site";
import { getWeightPlateProduct, weightPlateProducts } from "../../../../products/weight-plates/productData";
import { getEnglishAlternates } from "../../../../../lib/seo/english-alternates";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return weightPlateProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getWeightPlateProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `Weight Plates Manufacturer | ${product.name}`,
    description: `${product.name} from PBF weight plates manufacturer. ${product.copy} OEM customization, commercial gym plates, and global supply for Europe, USA, Middle East, and South America.`,
    alternates: getEnglishAlternates(`/products/weight-plates/${product.slug}`)
  };
}

export default async function WeightPlateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getWeightPlateProduct(slug);

  if (!product) {
    notFound();
  }

  const related = weightPlateProducts.filter((item) => item.slug !== product.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.copy,
    brand: {
      "@type": "Brand",
      name: "PowerBaseFit"
    },
    manufacturer: {
      "@type": "Organization",
      name: "PowerBaseFit"
    },
    category: "Weight Plates",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Product type",
        value: product.type
      },
      {
        "@type": "PropertyValue",
        name: "Weight range",
        value: product.range
      }
    ]
  };

  return (
    <main className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.png" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Weight plate detail navigation">
          <MegaMenu />
          <a href="/factory">Factory</a>
          <a href="/resources">Resources</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>
        <a className="products-top-cta" href="/contact">
          Get a Quote <ArrowRight size={18} />
        </a>
      </header>

      <section className="product-detail-hero">
        <div className="product-detail-media">
          <img src={product.image} alt={`${product.name} for commercial gym plates`} />
        </div>
        <div className="product-detail-copy">
          <a className="breadcrumb-link" href="/products/weight-plates">
            Weight Plates / {product.type}
          </a>
          <h1>{product.name}</h1>
          <p>{product.copy}</p>
          <div className="product-detail-specs">
            <div>
              <span>Plate range</span>
              <strong>{product.range}</strong>
            </div>
            <div>
              <span>Product style</span>
              <strong>{product.type}</strong>
            </div>
            <div>
              <span>Buyer focus</span>
              <strong>Commercial gyms, dealers, OEM brands</strong>
            </div>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Plate Quote <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="/products/weight-plates">
              Back to Weight Plates
            </a>
          </div>
        </div>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Product Overview</span>
          <h2>{product.name} for B2B gym equipment sourcing</h2>
          <p>
            This {product.name.toLowerCase()} is supplied by PBF as a weight
            plates manufacturer for importers, commercial gym buyers,
            distributors, and private label fitness brands. It is positioned
            for buyers who need clear plate style, material, weight range,
            packing method, and shipment planning before placing a bulk order.
          </p>
          <p>{product.buyerNotes}</p>
        </article>
        <article>
          <span>Material & Construction</span>
          <h2>Built for commercial gym plates and export supply</h2>
          <p>{product.material}</p>
          <p>
            As a gym equipment supplier, PBF helps buyers compare material
            choice, finish, center hole accuracy, plate handling, and OEM
            customization before confirming production.
          </p>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Manufacturing Process</span>
          <h2>Factory process and quality control</h2>
          <p>{product.process}</p>
          <p>
            QC can include surface finish review, center insert inspection,
            durability testing, weight tolerance checking, packaging inspection,
            and final export documentation before shipment.
          </p>
        </article>
        <article>
          <span>Global Shipping & Supply</span>
          <h2>Europe, USA, Middle East, and South America supply</h2>
          <p>
            PBF supports Europe / USA / Middle East / South America supply for
            commercial gym projects, dealer stock programs, and OEM fitness
            brands. Plate orders can be planned with dumbbells, racks, benches,
            barbells, and gym accessories in mixed containers.
          </p>
        </article>
      </section>

      <section className="products-section detail-info-section">
        <div className="section-heading-wide">
          <div>
            <span>Features & Advantages</span>
            <h2>Why buyers choose this plate style</h2>
          </div>
          <p>
            Each weight plate style should be evaluated by material, handling,
            finish quality, weight marking, packaging, and target application.
          </p>
        </div>
        <div className="detail-list-grid">
          {product.features.map((item) => (
            <div key={item}>
              <CheckCircle2 size={21} />
              <span>{item}</span>
            </div>
          ))}
          <div>
            <ShieldCheck size={21} />
            <span>Suitable for commercial gym plates, dealer programs, and private label product lines.</span>
          </div>
          <div>
            <Factory size={21} />
            <span>Produced by a weight plates manufacturer with OEM and export packing support.</span>
          </div>
          <div>
            <Globe2 size={21} />
            <span>Global shipment planning available for Europe, USA, Middle East, and South America.</span>
          </div>
        </div>
      </section>

      <section className="products-section detail-applications">
        <div>
          <span>Application Scenarios</span>
          <h2>Commercial gym and home gym use</h2>
        </div>
        <div className="application-card-grid">
          {product.applications.map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>
                Suitable for buyers preparing gym layouts, product lists,
                dealer inventory, or private label plate programs.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-section detail-info-section">
        <div className="section-heading-wide">
          <div>
            <span>OEM Customization Options</span>
            <h2>Custom plate details for your brand</h2>
          </div>
          <p>
            OEM options depend on material, target quantity, plate style, logo
            position, packaging requirements, and destination market.
          </p>
        </div>
        <div className="detail-list-grid">
          {product.oemOptions.map((item) => (
            <div key={item}>
              <PackageCheck size={21} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section detail-faq">
        <div className="section-heading-wide">
          <div>
            <span>Buyer FAQ</span>
            <h2>{product.name} sourcing questions</h2>
          </div>
          <p>
            These answers help buyers compare quality, MOQ, packing, and lead
            time before requesting a weight plate quotation.
          </p>
        </div>
        <div className="faq-list">
          <article>
            <h3>What is the MOQ for this weight plate?</h3>
            <p>{sourcingFacts.moq}</p>
          </article>
          <article>
            <h3>How do you control plate quality?</h3>
            <p>{sourcingFacts.quality}</p>
          </article>
          <article>
            <h3>How are weight plates packed?</h3>
            <p>{sourcingFacts.packaging}</p>
          </article>
          <article>
            <h3>What is the production lead time?</h3>
            <p>{sourcingFacts.leadTime}</p>
          </article>
        </div>
      </section>

      <section className="products-section related-products">
        <div className="section-heading-wide">
          <div>
            <span>Internal links</span>
            <h2>More Weight Plates products</h2>
          </div>
          <p>
            Continue comparing plate styles before sending your final product
            list for quotation.
          </p>
        </div>
        <div className="dumbbell-grid compact-related-grid">
          {related.map((item) => (
            <article className="dumbbell-card" key={item.slug}>
              <a href={`/products/weight-plates/${item.slug}`}>
                <img src={item.image} alt={`${item.name} from PBF`} />
              </a>
              <div>
                <span>{item.type}</span>
                <h3>
                  <a href={`/products/weight-plates/${item.slug}`}>{item.name}</a>
                </h3>
                <strong>{item.range}</strong>
                <a href={`/products/weight-plates/${item.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Product quotation</span>
        <h2>Send requirements for {product.name}</h2>
        <p>
          Share plate style, target quantity, KG/LB range, logo needs,
          packaging requirements, and destination country. PBF will prepare a
          practical quotation for your gym project or wholesale plate program.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="/contact">
            Contact Us <ArrowRight size={18} />
          </a>
          <a className="secondary-button" href="/products/weight-plates">
            Back to Weight Plates
          </a>
        </div>
      </section>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
