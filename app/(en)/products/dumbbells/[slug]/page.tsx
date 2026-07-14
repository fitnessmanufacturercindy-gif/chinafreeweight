import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Factory, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../../../components/MegaMenu";
import { sourcingFacts } from "../../../../site";
import { dumbbellProducts, getDumbbellProduct } from "../../../../products/dumbbells/productData";
import { getEnglishAlternates } from "../../../../../lib/seo/english-alternates";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dumbbellProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getDumbbellProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | ${product.range} | PBF Dumbbell Supplier`,
    description: `${product.name} from PBF. ${product.copy} Weight range: ${product.range}. OEM dumbbell customization and export support for global gym equipment buyers.`,
    alternates: getEnglishAlternates(`/products/dumbbells/${product.slug}`)
  };
}

export default async function DumbbellDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getDumbbellProduct(slug);

  if (!product) {
    notFound();
  }

  const related = dumbbellProducts.filter((item) => item.slug !== product.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: `${product.copy} Weight range: ${product.range}.`,
    brand: {
      "@type": "Brand",
      name: "PowerBaseFit"
    },
    manufacturer: {
      "@type": "Organization",
      name: "PowerBaseFit"
    },
    category: "Commercial Dumbbells",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Weight range",
        value: product.range
      },
      {
        "@type": "PropertyValue",
        name: "Product type",
        value: product.type
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
        <nav aria-label="Product detail navigation">
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
          <img src={product.image} alt={`${product.name} for commercial gym equipment buyers`} />
        </div>
        <div className="product-detail-copy">
          <a className="breadcrumb-link" href="/products/dumbbells">
            Dumbbells / {product.type}
          </a>
          <h1>{product.name}</h1>
          <p>{product.copy}</p>
          <div className="product-detail-specs">
            <div>
              <span>Weight range</span>
              <strong>{product.range}</strong>
            </div>
            <div>
              <span>Product type</span>
              <strong>{product.type}</strong>
            </div>
            <div>
              <span>Buyer focus</span>
              <strong>Gym projects, distributors, OEM brands</strong>
            </div>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Product Quote <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="/products/dumbbells">
              Back to Dumbbells
            </a>
          </div>
        </div>
      </section>

      {product.gallery ? (
        <section className="products-section product-gallery-strip">
          <div className="section-heading-wide">
            <div>
              <span>Product photos</span>
              <h2>Real product details for quotation review</h2>
            </div>
            <p>
              Review the dumbbell head, handle knurling, surface finish, and
              weight marking details before confirming custom logo or weight
              requirements.
            </p>
          </div>
          <div className="detail-photo-grid">
            {product.gallery.map((image, index) => (
              <img src={image} alt={`${product.name} product detail ${index + 1}`} key={image} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="products-section detail-seo-grid">
        <article>
          <span>Product overview</span>
          <h2>{product.name} for B2B gym equipment sourcing</h2>
          <p>
            This {product.name.toLowerCase()} is positioned for buyers who need
            reliable free weight products for commercial gym projects,
            wholesale programs, or private label fitness equipment lines. The
            key sourcing point is to confirm the weight range, finish, logo
            requirement, packaging method, and shipment plan before bulk
            production.
          </p>
          <p>{product.buyerNotes}</p>
        </article>
        <article>
          <span>Buyer decision guide</span>
          <h2>What buyers usually compare</h2>
          <p>
            Buyers evaluating this product usually compare durability, finish,
            weight range, order quantity, OEM options, and export packing. Clear
            answers to these points help the purchasing team prepare a faster
            and more accurate quotation request.
          </p>
        </article>
      </section>

      <section className="products-section detail-info-section">
        <div className="section-heading-wide">
          <div>
            <span>Product details</span>
            <h2>What buyers should confirm before ordering</h2>
          </div>
          <p>
            Clear product information helps importers, gym owners, and OEM
            buyers prepare accurate quotations and reduce back-and-forth
            communication.
          </p>
        </div>
        <div className="detail-list-grid">
          {product.details.map((item) => (
            <div key={item}>
              <CheckCircle2 size={21} />
              <span>{item}</span>
            </div>
          ))}
          <div>
            <ShieldCheck size={21} />
            <span>QC can include appearance review, weight range confirmation, packing check, and shipment inspection.</span>
          </div>
          <div>
            <PackageCheck size={21} />
            <span>Export packing can be planned for carton, pallet, mixed container, or gym project delivery.</span>
          </div>
          <div>
            <Factory size={21} />
            <span>OEM options depend on product material, logo position, quantity, and sample confirmation.</span>
          </div>
        </div>
      </section>

      <section className="products-section detail-applications">
        <div>
          <span>Applications</span>
          <h2>Where this dumbbell is commonly used</h2>
        </div>
        <div className="application-card-grid">
          {product.applications.map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>
                Suitable for buyers preparing product lists, gym layouts, dealer
                stock, or private label catalog planning.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-section detail-faq">
        <div className="section-heading-wide">
          <div>
            <span>FAQ</span>
            <h2>{product.name} sourcing questions</h2>
          </div>
        </div>
        <div className="faq-list">
          <article>
            <h3>Can this product support OEM customization?</h3>
            <p>
              Yes. Logo, color details, packaging, and carton marks can be
              discussed based on the selected material, target quantity, and
              buyer market.
            </p>
          </article>
          <article>
            <h3>What information is needed for quotation?</h3>
            <p>
              Send the product name, weight range, quantity, destination
              country, packaging requirements, and any logo or sample request.
            </p>
          </article>
          <article>
            <h3>What is the MOQ for this dumbbell?</h3>
            <p>{sourcingFacts.moq}</p>
          </article>
          <article>
            <h3>How are dumbbells packed for export?</h3>
            <p>{sourcingFacts.packaging}</p>
          </article>
          <article>
            <h3>What is the usual lead time?</h3>
            <p>{sourcingFacts.leadTime}</p>
          </article>
          <article>
            <h3>Can this be ordered with other free weight products?</h3>
            <p>
              Yes. Dumbbells can be planned together with weight plates, racks,
              benches, bars, and gym accessories for mixed container orders.
            </p>
          </article>
          <article>
            <h3>Is this suitable for commercial gym use?</h3>
            <p>
              This depends on the selected material and use scenario. PBF can
              help match the dumbbell type with commercial gym, retail, or OEM
              requirements.
            </p>
          </article>
        </div>
      </section>

      <section className="products-section related-products">
        <div className="section-heading-wide">
          <div>
            <span>Related products</span>
            <h2>Other dumbbell options</h2>
          </div>
        </div>
        <div className="dumbbell-grid compact-related-grid">
          {related.map((item) => (
            <article className="dumbbell-card" key={item.slug}>
              <a href={`/products/dumbbells/${item.slug}`}>
                <img src={item.image} alt={`${item.name} - ${item.range}`} />
              </a>
              <div>
                <span>{item.type}</span>
                <h3>
                  <a href={`/products/dumbbells/${item.slug}`}>{item.name}</a>
                </h3>
                <strong>{item.range}</strong>
                <a href={`/products/dumbbells/${item.slug}`}>
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
          Share your target range, quantity, destination country, logo needs,
          and packing requirements. PBF will prepare a practical quotation for
          your gym project, distributor order, or OEM product line.
        </p>
        <a className="primary-button" href="/contact">
          Get Product Quote <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
