import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Factory, Globe2, Home, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import MegaMenu from "../../components/MegaMenu";
import { racksBenchesProducts } from "./productData";

export const metadata: Metadata = {
  title: "Multi-functional Racks & Benches | Home Gym Functional Trainer Manufacturer",
  description:
    "PBF supplies home gym functional trainer systems, multi-functional racks, adjustable benches, and custom private gym solutions from China for global distributors and project buyers.",
  alternates: {
    canonical: "/products/racks-benches"
  }
};

const categories = [
  "Home gym functional trainer systems for private fitness rooms and villas",
  "Power racks and cable racks for commercial and personal training spaces",
  "Adjustable benches for dumbbell, barbell, and rack-based training",
  "Storage trainer systems that combine rack, cable, and accessory organization"
];

const capabilities = [
  "Custom frame color and accent color",
  "Logo plate, brand panel, and private label support",
  "Bench pad color and upholstery customization",
  "Rack layout planning for private rooms",
  "Mixed supply with dumbbells, plates, bars, and accessories",
  "Europe, USA, Middle East, and South America supply"
];

const projectProof = [
  "Private home gym layouts with rack, bench, dumbbells, and storage",
  "Custom logo and color planning for premium residential fitness spaces",
  "Commercial gym and studio supply with export packing and shipment inspection",
  "OEM support for buyers building a home gym equipment product line"
];

export default function RacksBenchesPage() {
  return (
    <main className="product-page racks-benches-page">
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Racks and benches navigation">
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
          <span>Racks & Benches Hub</span>
          <h1>Multi-functional Racks & Benches for Home Gym Projects</h1>
          <p>
            PBF supplies home gym functional trainer systems, all-in-one racks,
            cable crossover trainers, adjustable benches, and custom private
            gym solutions for global distributors, dealers, and project buyers.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Home Gym Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#racks-benches-products">
              View Products
            </a>
          </div>
        </div>
        <div className="dumbbell-hero-gallery" aria-label="Racks and benches product preview">
          <img src="/assets/products/racks-benches/private-home-gym-rack-system.avif" alt="Private home gym rack system with rack bench dumbbells and storage" width={1000} height={760} loading="lazy" decoding="async" />
          <img src="/assets/products/racks-benches/home-gym-functional-trainer.jpg" alt="Home gym functional trainer customized for a private fitness room" width={1000} height={760} loading="lazy" decoding="async" />
          <img src="/assets/products/racks-benches/adjustable-weight-bench.jpg" alt="Adjustable weight bench for racks and benches supply" width={1000} height={760} loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Racks and benches supply advantages">
        <article>
          <Factory size={24} />
          <strong>Source Factory Supply</strong>
          <span>Multi-functional rack and bench manufacturing support for B2B buyers.</span>
        </article>
        <article>
          <Wrench size={24} />
          <strong>Custom Private Space</strong>
          <span>Color, logo, layout, storage, and accessory planning for home gym projects.</span>
        </article>
        <article>
          <Globe2 size={24} />
          <strong>Global Project Support</strong>
          <span>Europe, USA, Middle East, and South America supply coordination.</span>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>What are Multi-functional Racks & Benches</span>
          <h2>Home gym functional trainer systems for complete training spaces</h2>
          <p>
            Multi-functional racks and benches combine barbell training, cable
            movement, pull-up work, bench training, plate storage, and accessory
            organization. In China sourcing, this category is often searched as
            a home gym functional trainer or comprehensive training system.
          </p>
          <p>
            For buyers, the value is not only the frame. The real decision is
            whether the supplier can plan the complete room: rack size, bench
            match, colors, logo panels, free weight storage, and export packing.
          </p>
        </article>
        <article>
          <span>Product Categories Overview</span>
          <h2>Racks, benches, and all-in-one trainer systems by use case</h2>
          <div className="detail-list-grid compact-link-grid">
            {categories.map((item) => (
              <div key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="products-section dumbbell-buying">
        <div className="buying-copy">
          <span>OEM & Private Home Gym Customization</span>
          <h2>Turn a rack into a branded private training space</h2>
          <p>
            PBF supports frame colors, logo plates, upholstery colors, storage
            layouts, attachment sets, and complete home gym equipment bundles.
            Buyers can combine racks and benches with dumbbells, weight plates,
            barbells, flooring, and accessories in one project quotation.
          </p>
          <a className="primary-button" href="/contact">
            Send Room Requirement <ArrowRight size={18} />
          </a>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
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
            <span>Buyer Project Reference</span>
            <h2>Real project-style cases for private space planning</h2>
          </div>
          <p>
            These systems are suitable for buyers who want a custom home gym,
            personal training room, or premium club training zone with clear
            visual identity and reliable supply support.
          </p>
        </div>
        <div className="detail-list-grid">
          {projectProof.map((item) => (
            <div key={item}>
              <Home size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section" id="racks-benches-products">
        <div className="section-heading-wide">
          <div>
            <span>Internal Links</span>
            <h2>All Multi-functional Racks & Benches products</h2>
          </div>
          <p>
            Each product page includes product overview, material, production
            process, customization options, application scenarios, global
            shipping, and inquiry paths for SEO, GEO, and buyer conversion.
          </p>
        </div>

        <div className="dumbbell-grid">
          {racksBenchesProducts.map((product) => (
            <article className="dumbbell-card" key={product.slug}>
              <a href={`/products/racks-benches/${product.slug}`} aria-label={`View details for ${product.name}`}>
                <img src={product.image} alt={`${product.name} home gym functional trainer from PBF`} loading="lazy" decoding="async" />
              </a>
              <div>
                <span>{product.type}</span>
                <h3>
                  <a href={`/products/racks-benches/${product.slug}`}>{product.name}</a>
                </h3>
                <strong>{product.range}</strong>
                <p>{product.copy}</p>
                <a href={`/products/racks-benches/${product.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Factory Direct Home Gym Supply</span>
        <h2>Need a custom rack, bench, or home gym functional trainer?</h2>
        <p>
          Send your room size, target market, logo needs, preferred colors,
          product list, and quantity. PBF will reply with product suggestions,
          layout direction, and factory quotation.
        </p>
        <a className="primary-button" href="/contact">
          Get Racks & Benches Quote <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
