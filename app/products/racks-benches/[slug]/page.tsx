import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Factory, Globe2, Home, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../../components/MegaMenu";
import { sourcingFacts } from "../../../site";
import { getRacksBenchesProduct, racksBenchesProducts } from "../productData";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const faqs = [
  {
    question: "Can the color and logo be customized?",
    answer:
      "Yes. PBF supports custom frame colors, logo plates, brand panels, bench pad colors, attachment packages, and private label planning."
  },
  {
    question: "Can you help plan a full home gym room?",
    answer:
      "Yes. Buyers can send room size, target layout, product list, and market requirements. PBF can suggest rack, bench, dumbbell, plate, and accessory combinations."
  },
  {
    question: "Do you ship racks and benches globally?",
    answer:
      "Yes. PBF supports Europe, USA, Middle East, and South America supply with protected packing, mixed container planning, and shipment inspection."
  },
  {
    question: "What is the MOQ for racks and benches?",
    answer: sourcingFacts.moq
  },
  {
    question: "How are multi-functional racks packed?",
    answer: sourcingFacts.packaging
  },
  {
    question: "What is the usual production lead time?",
    answer: sourcingFacts.leadTime
  }
];

export function generateStaticParams() {
  return racksBenchesProducts.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getRacksBenchesProduct(slug);

  if (!product) {
    return {
      title: "Home Gym Functional Trainer Manufacturer | PBF"
    };
  }

  return {
    title: `Home Gym Functional Trainer Manufacturer | ${product.name}`,
    description: `${product.name} from PBF racks and benches manufacturer in China. Custom home gym functional trainer, comprehensive trainer, rack, bench, color, logo, and global supply support.`,
    alternates: {
      canonical: `/products/racks-benches/${product.slug}`
    }
  };
}

export default async function RacksBenchesProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getRacksBenchesProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = racksBenchesProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="product-page racks-benches-page">
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
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
        <div className="product-detail-copy">
          <a className="back-link" href="/products/racks-benches">
            <ArrowLeft size={16} /> Back to Racks & Benches
          </a>
          <span>{product.type}</span>
          <h1>{product.name}</h1>
          <p>{product.copy}</p>
          <div className="detail-badges">
            <strong>{product.range}</strong>
            <strong>OEM & Custom Available</strong>
            <strong>Home Gym Project Supply</strong>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/products/racks-benches">
              View Category Hub
            </a>
          </div>
        </div>
        <div className="product-detail-media">
          <img src={product.image} alt={`${product.name} home gym functional trainer and multi-functional rack manufacturer`} width={1000} height={760} loading="eager" fetchPriority="high" decoding="async" />
        </div>
      </section>

      <section className="products-section product-showcase-section" aria-label={`${product.name} product display`}>
        <div className="product-showcase-heading">
          <span>Product Display</span>
          <h2>{product.name}</h2>
          <p>{product.range}</p>
        </div>
        <div className="product-showcase-frame">
          <img src={product.image} alt={`${product.name} product image for home gym and commercial project buyers`} loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label={`${product.name} supply advantages`}>
        <article>
          <Factory size={24} />
          <strong>Factory Direct Supply</strong>
          <span>Racks, benches, home gym systems, and functional trainer production support.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>Checked Before Shipment</strong>
          <span>Frame finish, cable movement, accessories, packing, and order details are reviewed.</span>
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
          <h2>{product.name} for home gym and project buyers</h2>
          <p>
            {product.name} is designed for home gym projects, private training
            rooms, personal training studios, and commercial gym buyers who
            need a reliable gym equipment supplier for racks, benches, and
            functional trainer systems.
          </p>
          <p>{product.buyerNotes}</p>
        </article>
        <article>
          <span>Material & Construction</span>
          <h2>Frame, cable, bench, and storage details</h2>
          <p>{product.material}</p>
          <p>
            PBF focuses on stable frame construction, practical training
            function, usable attachment design, and packaging that protects
            large rack and bench products during export shipment.
          </p>
        </article>
        <article>
          <span>Manufacturing Process</span>
          <h2>Production workflow for custom rack projects</h2>
          <p>{product.process}</p>
          <p>
            Before shipment, the team checks fit, finish, assembly details,
            cable movement when applicable, accessory matching, and packing
            protection for international delivery.
          </p>
        </article>
        <article>
          <span>Global Shipping & Supply</span>
          <h2>Home gym equipment supply for global markets</h2>
          <p>
            PBF supports export fitness equipment manufacturer projects for
            Europe, USA, Middle East, and South America supply. Buyers can
            combine this product with dumbbells, weight plates, barbells,
            flooring, and gym accessories in one quotation.
          </p>
        </article>
      </section>

      <section className="products-section detail-list-section">
        <div className="section-heading-wide">
          <div>
            <span>Features & Application Scenarios</span>
            <h2>How buyers use this rack and bench product</h2>
          </div>
          <p>
            These details help procurement teams compare home gym functional
            trainer options, confirm OEM requirements, and prepare a project
            list before requesting a quote.
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
            PBF can support custom colors, logo placement, upholstery choices,
            storage planning, attachment packages, and complete private home
            gym equipment bundles. This makes the product suitable for buyers
            sourcing a functional trainer, comprehensive trainer, or full home
            gym line.
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

      <section className="products-section detail-list-section">
        <div className="section-heading-wide">
          <div>
            <span>Buyer FAQ</span>
            <h2>Common questions before sourcing racks and benches</h2>
          </div>
          <p>
            Clear answers help buyers prepare room dimensions, logo needs,
            quantity expectations, and shipment details before the first quote.
          </p>
        </div>
        <div className="detail-list-grid">
          {faqs.map((item) => (
            <div key={item.question}>
              <Home size={20} />
              <span>
                <strong>{item.question}</strong> {item.answer}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading-wide">
          <div>
            <span>Related Racks & Benches</span>
            <h2>Continue exploring home gym equipment</h2>
          </div>
          <p>
            Internal links help buyers compare related products and help search
            engines understand the Multi-functional Racks & Benches category.
          </p>
        </div>
        <div className="dumbbell-grid compact-related-grid">
          {relatedProducts.map((item) => (
            <article className="dumbbell-card" key={item.slug}>
              <a href={`/products/racks-benches/${item.slug}`}>
                <img src={item.image} alt={`${item.name} home gym rack and bench product`} loading="lazy" decoding="async" />
              </a>
              <div>
                <span>{item.type}</span>
                <h3>
                  <a href={`/products/racks-benches/${item.slug}`}>{item.name}</a>
                </h3>
                <p>{item.copy}</p>
                <a href={`/products/racks-benches/${item.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Factory Direct Quotation</span>
        <h2>Need factory pricing for {product.name}?</h2>
        <p>
          Send room size, target quantity, preferred colors, logo needs,
          product list, and destination market. PBF will reply with suitable
          product options and factory quotation.
        </p>
        <a className="primary-button" href="/contact">
          Contact PBF <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
