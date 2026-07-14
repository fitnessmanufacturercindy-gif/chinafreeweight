import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Dumbbell, Factory, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../components/MegaMenu";
import { dumbbellProducts } from "./productData";

export const metadata: Metadata = {
  title: "Dumbbells | PBF Free Weight Manufacturer",
  description:
    "Commercial dumbbells from PBF free weight manufacturer. CPU, TPU, PU, hex, neoprene, stainless steel, and adjustable dumbbells for gym projects, distributors, and OEM brands.",
  alternates: {
    canonical: "/products/dumbbells",
    languages: { en: "/products/dumbbells", pt: "/pt/products/dumbbells/", "x-default": "/products/dumbbells" }
  }
};

const capabilities = [
  "Custom logo and private label support",
  "KG and LB range planning",
  "Commercial gym and distributor orders",
  "Carton, pallet, and mixed-container export packing",
  "Sample confirmation before bulk production",
  "Factory inspection before shipment"
];

const faqs = [
  {
    question: "Can PBF customize dumbbells with my logo?",
    answer:
      "Yes. Logo, color details, weight markings, packaging, carton labels, and product finish can be discussed based on the dumbbell material and order quantity."
  },
  {
    question: "Which dumbbell type is best for a commercial gym?",
    answer:
      "Hex dumbbells and CPU/TPU dumbbells are common choices for commercial gym floors. PU and stainless steel dumbbells are often used for premium clubs and display-focused spaces."
  },
  {
    question: "Can I mix KG and LB dumbbells in one shipment?",
    answer:
      "Yes. Buyers can plan KG sets, LB sets, or mixed product lines together with racks, plates, benches, and accessories for container orders."
  },
  {
    question: "What should I send for a fast quotation?",
    answer:
      "Please send the dumbbell type, weight range, quantity, logo needs, destination country, and whether you need retail packaging or commercial gym packaging."
  }
];

export default function DumbbellsPage() {
  return (
    <main className="product-page">
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.png" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Product page navigation">
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

      <section className="dumbbell-hero">
        <div className="dumbbell-hero-copy">
          <span>PBF Dumbbells</span>
          <h1>Commercial Dumbbells for Gyms, Distributors, and OEM Brands</h1>
          <p>
            Browse the dumbbell products from the PBF catalog, including CPU,
            TPU, PU, hex, neoprene, stainless steel, and adjustable dumbbells.
            Send your target range and quantity for a factory quotation.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Dumbbell Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#dumbbell-products">
              View Products
            </a>
          </div>
        </div>
        <div className="dumbbell-hero-gallery" aria-label="Dumbbell product preview">
          <img src="/assets/products/dumbbells/catalog-v2/cpu-dumbbell-full-range.jpg" alt="CPU dumbbell full range" />
          <img src="/assets/products/dumbbells/catalog-v2/cpu-hexagonal-dumbbell-kg.jpg" alt="CPU hexagonal dumbbell" />
          <img src="/assets/products/dumbbells/catalog-v2/tpu-dumbbell-kg.jpg" alt="TPU dumbbell" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Dumbbell factory advantages">
        <article>
          <Factory size={24} />
          <strong>Direct Factory Supply</strong>
          <span>Catalog dumbbell products for global B2B buyers.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>OEM Ready</strong>
          <span>Logo, color details, range planning, and packaging support.</span>
        </article>
        <article>
          <PackageCheck size={24} />
          <strong>Export Packaging</strong>
          <span>Suitable for commercial gyms, dealers, and mixed containers.</span>
        </article>
      </section>

      <section className="products-section" id="dumbbell-products">
        <div className="section-heading-wide">
          <div>
            <span>Catalog range</span>
            <h2>Dumbbell products available from PBF</h2>
          </div>
          <p>
            Review material, weight range, and application notes before sending
            your purchase quantity, logo needs, and destination market.
          </p>
        </div>

        <div className="dumbbell-grid">
          {dumbbellProducts.map((product) => (
            <article className="dumbbell-card" key={product.slug}>
              <a href={`/products/dumbbells/${product.slug}`} aria-label={`View details for ${product.name}`}>
                <img src={product.image} alt={`${product.name} - ${product.range}`} />
              </a>
              <div>
                <span>{product.type}</span>
                <h3>
                  <a href={`/products/dumbbells/${product.slug}`}>{product.name}</a>
                </h3>
                <strong>{product.range}</strong>
                <p>{product.copy}</p>
                <a href={`/products/dumbbells/${product.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="products-section dumbbell-buying">
        <div className="buying-copy">
          <span>Buying support</span>
          <h2>Plan dumbbell orders by material, weight range, and market</h2>
          <p>
            A good dumbbell program is not only about shape. Overseas buyers
            need to confirm coating material, handle style, KG or LB ranges,
            rack matching, packaging method, and logo requirements before bulk
            production.
          </p>
          <a className="primary-button" href="/contact">
            Send Requirements <ArrowRight size={18} />
          </a>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <div key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section product-faq">
        <div className="section-heading-wide">
          <div>
            <span>FAQ</span>
            <h2>Dumbbell sourcing questions</h2>
          </div>
          <p>
            Quick answers for importers, gym project buyers, and OEM fitness
            brands preparing dumbbell orders.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <article key={item.question}>
              <Dumbbell size={20} />
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Factory quotation</span>
        <h2>Need a dumbbell catalog quote?</h2>
        <p>
          Send your preferred dumbbell type, weight range, quantity, logo needs,
          and destination country. PBF will help prepare a practical quotation
          for your gym project or wholesale program.
        </p>
        <a className="primary-button" href="/contact">
          Get My Quotation <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
