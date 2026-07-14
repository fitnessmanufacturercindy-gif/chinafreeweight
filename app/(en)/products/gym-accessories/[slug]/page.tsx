import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Factory, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../../../components/MegaMenu";
import { sourcingFacts } from "../../../../site";
import { getGymAccessoryProduct, gymAccessoryProducts } from "../../../../products/gym-accessories/productData";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return gymAccessoryProducts.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getGymAccessoryProduct(slug);

  if (!product) {
    return {
      title: "Gym Accessories Manufacturer | PBF"
    };
  }

  return {
    title: `Gym Accessories Manufacturer | ${product.name}`,
    description: `${product.name} from PBF fitness accessories supplier in China. OEM gym accessories for distributors, commercial gym projects, and global fitness brands.`,
    alternates: {
      canonical: `/products/gym-accessories/${product.slug}`
    }
  };
}

export default async function GymAccessoryProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getGymAccessoryProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = gymAccessoryProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="product-page">
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.png" alt="PowerBaseFit" />
        </a>
        <nav aria-label={`${product.name} navigation`}>
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
        <div className="detail-hero-copy">
          <a className="back-link" href="/products/gym-accessories">
            <ArrowLeft size={16} /> Back to Gym Accessories
          </a>
          <span>{product.type}</span>
          <h1>{product.name}</h1>
          <p>{product.copy}</p>
          <div className="detail-badges">
            <strong>{product.range}</strong>
            <strong>OEM & Custom Available</strong>
            <strong>Global B2B Supply</strong>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/products/gym-accessories">
              View Accessories Hub
            </a>
          </div>
        </div>
        <div className="detail-hero-image">
          <img src={product.image} alt={`${product.name} for gym accessories supplier and OEM fitness equipment supply`} />
        </div>
      </section>

      <section className="product-trust-strip" aria-label={`${product.name} supply advantages`}>
        <article>
          <Factory size={24} />
          <strong>Factory Supply</strong>
          <span>Gym accessories manufacturer support for distributors and gym projects.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>Checked Before Shipment</strong>
          <span>Material, finish, size, and packing checks before export delivery.</span>
        </article>
        <article>
          <Globe2 size={24} />
          <strong>Global Markets</strong>
          <span>Europe, USA, Middle East, and South America supply support.</span>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Product Overview</span>
          <h2>{product.name} for B2B gym accessory programs</h2>
          <p>
            {product.name} is supplied for commercial gym projects, distributor
            accessory lines, retail fitness programs, and OEM brand buyers who
            need reliable gym equipment supplier support from China.
          </p>
          <p>{product.buyerNotes}</p>
        </article>
        <article>
          <span>Material & Construction</span>
          <h2>Built for practical training use and export supply</h2>
          <p>{product.material}</p>
          <p>
            As a fitness accessories supplier, PBF focuses on consistent
            product appearance, usable training design, packing protection, and
            clear communication for repeat B2B orders.
          </p>
        </article>
        <article>
          <span>Manufacturing Process</span>
          <h2>Production, inspection, and packing workflow</h2>
          <p>{product.process}</p>
          <p>
            Product details are checked before shipment so buyers can plan
            mixed container orders with dumbbells, weight plates, racks, and
            other commercial gym accessories.
          </p>
        </article>
        <article>
          <span>Global Shipping & Supply</span>
          <h2>Accessory supply for Europe, USA, Middle East, and South America</h2>
          <p>
            PBF supports export fitness equipment manufacturer projects for
            Europe, USA, Middle East, and South America supply. Buyers can
            combine this product with other gym accessories, free weights, and
            private label packaging in one quotation.
          </p>
        </article>
      </section>

      <section className="products-section detail-list-section">
        <div className="section-heading-wide">
          <div>
            <span>Features & Applications</span>
            <h2>Why buyers choose this accessory</h2>
          </div>
          <p>
            These details help procurement teams compare accessory items,
            confirm OEM needs, and prepare product lists before requesting a
            quotation.
          </p>
        </div>
        <div className="detail-list-grid">
          {[...product.features, ...product.applications].map((item) => (
            <div key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section dumbbell-buying">
        <div className="buying-copy">
          <span>OEM Customization Options</span>
          <h2>Customize {product.name} for your market</h2>
          <p>
            PBF can support OEM gym accessories for distributors, commercial
            gym chains, retail fitness brands, and project buyers who need
            stable product quality and export-ready packaging.
          </p>
          <a className="primary-button" href="/contact">
            Send Requirements <ArrowRight size={18} />
          </a>
        </div>
        <div className="capability-list">
          {product.oemOptions.map((item) => (
            <div key={item}>
              <PackageCheck size={20} />
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
            Accessory buyers usually need clear answers about MOQ, quality,
            packing, and mixed-container planning before confirming a quote.
          </p>
        </div>
        <div className="faq-list">
          <article>
            <h3>What is the MOQ for gym accessories?</h3>
            <p>{sourcingFacts.moq}</p>
          </article>
          <article>
            <h3>Can accessories be customized?</h3>
            <p>
              Yes. Custom color, logo, label, carton design, and product bundle
              planning can be reviewed according to the accessory type and
              order quantity.
            </p>
          </article>
          <article>
            <h3>How are accessories packed?</h3>
            <p>{sourcingFacts.packaging}</p>
          </article>
          <article>
            <h3>What is the lead time?</h3>
            <p>{sourcingFacts.leadTime}</p>
          </article>
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading-wide">
          <div>
            <span>Related Accessories</span>
            <h2>Continue building your accessory line</h2>
          </div>
          <p>
            Internal links help buyers move between related products and help
            search engines understand the Gym Accessories category structure.
          </p>
        </div>
        <div className="dumbbell-grid compact-related-grid">
          {relatedProducts.map((item) => (
            <article className="dumbbell-card" key={item.slug}>
              <a href={`/products/gym-accessories/${item.slug}`}>
                <img src={item.image} alt={`${item.name} gym accessory product`} />
              </a>
              <div>
                <span>{item.type}</span>
                <h3>
                  <a href={`/products/gym-accessories/${item.slug}`}>{item.name}</a>
                </h3>
                <p>{item.copy}</p>
                <a href={`/products/gym-accessories/${item.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Factory Direct Quotation</span>
        <h2>Need pricing for {product.name}?</h2>
        <p>
          Send target quantity, logo needs, packaging requirements, and
          destination market. Our team will reply with factory pricing and OEM
          options.
        </p>
        <a className="primary-button" href="/contact">
          Contact PBF <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
