import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Factory, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../../components/MegaMenu";
import { weightPlateProducts } from "../../../products/weight-plates/productData";
import { getEnglishAlternates } from "../../../../lib/seo/english-alternates";

export const metadata: Metadata = {
  title: "Weight Plates Manufacturer | Gym Weight Plates Supplier & Bumper Plates Factory China",
  description:
    "PBF is a weight plates manufacturer and gym weight plates supplier for commercial gyms, distributors, and OEM brands. Browse bumper plates, rubber plates, PU plates, TPU plates, and custom weight plate programs from China.",
  alternates: getEnglishAlternates("/products/weight-plates")
};

const categories = [
  "Bumper plates for Olympic lifting and functional training zones",
  "Rubber weight plates for commercial gym strength areas",
  "PU and TPU plates for premium gym projects and private label lines",
  "Grip plates and Olympic plates for easy loading, storage, and daily use"
];

const capabilities = [
  "Custom logo, color, and weight markings",
  "KG and LB market planning",
  "Rubber, PU, TPU, CPU, and spray finish options",
  "Carton, pallet, and mixed container export packing",
  "Sample confirmation before bulk production",
  "Shipment inspection for global B2B orders"
];

export default function WeightPlatesPage() {
  return (
    <main className="product-page">
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Weight plates navigation">
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
          <span>Weight Plates Hub</span>
          <h1>Weight Plates Manufacturer for Global Gym Projects</h1>
          <p>
            PBF supplies bumper plates, rubber plates, PU plates, TPU plates,
            Olympic grip plates, and OEM plate sets for commercial gyms,
            distributors, and private label fitness brands.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Plate Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#weight-plate-products">
              View Plate Products
            </a>
          </div>
        </div>
        <div className="dumbbell-hero-gallery" aria-label="Weight plate product preview">
          <img src="/assets/products/weight-plates/catalog/cpu-bumper-plate.webp" alt="CPU bumper weight plates for gym projects" loading="eager" fetchPriority="high" decoding="async" />
          <img src="/assets/products/weight-plates/catalog/tpu-olympic-plate.webp" alt="TPU Olympic weight plates" loading="lazy" decoding="async" />
          <img src="/assets/products/weight-plates/catalog/rubber-bumper-plate.webp" alt="Rubber bumper plates for commercial gyms" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Weight plate factory advantages">
        <article>
          <Factory size={24} />
          <strong>Direct Factory Supply</strong>
          <span>Weight plates manufacturer support for B2B orders and OEM programs.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>OEM & Custom Capability</strong>
          <span>Logo, color, material, KG/LB markings, and packaging planning.</span>
        </article>
        <article>
          <Globe2 size={24} />
          <strong>Global Supply Coverage</strong>
          <span>Europe, USA, Middle East, and South America supply support.</span>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>What are Weight Plates</span>
          <h2>Weight plates for barbell strength training and gym equipment supply</h2>
          <p>
            Weight plates are loaded on Olympic bars, plate-loaded machines,
            storage racks, and training stations. For B2B buyers, a reliable
            gym weight plates supplier must control material, center hole
            accuracy, finish quality, weight marking, packaging, and shipment
            inspection.
          </p>
          <p>
            PBF positions this category for importers, commercial gym projects,
            distributors, and OEM brands that need stable plate production from
            a bumper plates factory China source.
          </p>
        </article>
        <article>
          <span>Product Categories Overview</span>
          <h2>Plate styles organized by material and application</h2>
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
          <span>OEM & Custom Capability</span>
          <h2>Build private label weight plate programs from one factory</h2>
          <p>
            Buyers can prepare custom logo weight plates, private label bumper
            plates, color-coded gym plates, KG or LB ranges, and export-ready
            packaging. PBF supports commercial gym plates for mixed container
            projects and distributor programs.
          </p>
          <a className="primary-button" href="/contact">
            Send Plate Requirements <ArrowRight size={18} />
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

      <section className="products-section" id="weight-plate-products">
        <div className="section-heading-wide">
          <div>
            <span>Internal Links</span>
            <h2>All Weight Plates products</h2>
          </div>
          <p>
            Each product style has its own SEO page. Review material,
            construction, manufacturing process, OEM options, application
            scenarios, and global shipping support before sending your inquiry.
          </p>
        </div>

        <div className="dumbbell-grid">
          {weightPlateProducts.map((product) => (
            <article className="dumbbell-card" key={product.slug}>
              <a href={`/products/weight-plates/${product.slug}`} aria-label={`View details for ${product.name}`}>
                <img src={product.image} alt={`${product.name} from PBF weight plates manufacturer`} loading="lazy" decoding="async" />
              </a>
              <div>
                <span>{product.type}</span>
                <h3>
                  <a href={`/products/weight-plates/${product.slug}`}>{product.name}</a>
                </h3>
                <strong>{product.range}</strong>
                <p>{product.copy}</p>
                <a href={`/products/weight-plates/${product.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Global Supply Coverage</span>
        <h2>Need factory pricing for weight plates?</h2>
        <p>
          Send plate style, material, target quantity, logo needs, and
          destination market. PBF supports Europe, USA, Middle East, and South
          America supply for commercial gyms, dealers, and OEM fitness brands.
        </p>
        <a className="primary-button" href="/contact">
          Get Weight Plate Quote <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
