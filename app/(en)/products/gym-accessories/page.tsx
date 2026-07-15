import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Factory, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import MegaMenu from "../../../components/MegaMenu";
import { gymAccessoryProducts } from "../../../products/gym-accessories/productData";

export const metadata: Metadata = {
  title: "Gym Accessories Manufacturer | Fitness Accessories Supplier China",
  description:
    "PBF supplies gym accessories including kettlebells, cable handles, yoga mats, balance trainers, aerobic steps, and OEM fitness accessories for global distributors and gym projects.",
  alternates: {
    canonical: "/products/gym-accessories"
  }
};

const categories = [
  "Kettlebells for functional training, studio classes, and retail programs",
  "Cable attachments for commercial strength machines and gym accessory replacement",
  "Yoga and mobility accessories for home fitness, wellness, and studio channels",
  "Balance and step platforms for group training and add-on equipment sales"
];

const capabilities = [
  "Custom logo and private label packaging",
  "Color, size, and weight range planning",
  "Retail carton and mixed container support",
  "Sample confirmation before bulk production",
  "Accessory bundle planning for distributors",
  "Europe, USA, Middle East, and South America supply"
];

export default function GymAccessoriesPage() {
  return (
    <main className="product-page">
      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Gym accessories navigation">
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
          <span>Gym Accessories Hub</span>
          <h1>Gym Accessories Manufacturer for Global Fitness Projects</h1>
          <p>
            PBF supplies kettlebells, cable attachments, yoga mats, balance
            trainers, step platforms, and OEM fitness accessories for
            commercial gyms, distributors, and private label brands.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Request Accessories Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#gym-accessory-products">
              View Accessories
            </a>
          </div>
        </div>
        <div className="dumbbell-hero-gallery" aria-label="Gym accessories product preview">
          <img src="/assets/products/gym-accessories/cast-iron-kettlebell.webp" alt="Cast iron kettlebell from gym accessories manufacturer" loading="eager" fetchPriority="high" decoding="async" />
          <img src="/assets/products/gym-accessories/bosu-ball.webp" alt="Bosu ball balance trainer for fitness accessories supply" loading="lazy" decoding="async" />
          <img src="/assets/products/gym-accessories/tpe-yoga-mat.webp" alt="TPE yoga mat for gym accessory programs" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Gym accessories supply advantages">
        <article>
          <Factory size={24} />
          <strong>Factory Accessory Supply</strong>
          <span>Gym accessories manufacturer support for B2B mixed orders.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>OEM & Private Label</strong>
          <span>Logo, color, packaging, retail sets, and accessory bundles.</span>
        </article>
        <article>
          <Globe2 size={24} />
          <strong>Global Distribution</strong>
          <span>Europe, USA, Middle East, and South America supply planning.</span>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>What are Gym Accessories</span>
          <h2>Fitness accessories that complete a commercial gym product line</h2>
          <p>
            Gym accessories include kettlebells, cable machine attachments,
            yoga mats, balance tools, step platforms, and small training
            equipment that help distributors increase order value beyond main
            free weight products.
          </p>
          <p>
            For B2B buyers, a reliable fitness accessories supplier should
            support product consistency, OEM packaging, mixed container
            planning, carton labeling, and shipment inspection.
          </p>
        </article>
        <article>
          <span>Product Categories Overview</span>
          <h2>Accessory products organized by buyer use case</h2>
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
          <span>OEM & Add-on Sales</span>
          <h2>Build accessory bundles for distributors and gym projects</h2>
          <p>
            Buyers can combine kettlebells, cable handles, mats, balance
            trainers, and step platforms with dumbbells, plates, racks, and
            benches. PBF supports gym accessories supplier programs for mixed
            containers, private label packaging, and commercial gym projects.
          </p>
          <a className="primary-button" href="/contact">
            Send Accessories List <ArrowRight size={18} />
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

      <section className="products-section" id="gym-accessory-products">
        <div className="section-heading-wide">
          <div>
            <span>Internal Links</span>
            <h2>All Gym Accessories products</h2>
          </div>
          <p>
            Each accessory product has its own SEO page with material,
            applications, OEM options, global supply details, and inquiry CTA
            for distributors, gym projects, and private label buyers.
          </p>
        </div>

        <div className="dumbbell-grid">
          {gymAccessoryProducts.map((product) => (
            <article className="dumbbell-card" key={product.slug}>
              <a href={`/products/gym-accessories/${product.slug}`} aria-label={`View details for ${product.name}`}>
                <img src={product.image} alt={`${product.name} from PBF gym accessories manufacturer`} loading="lazy" decoding="async" />
              </a>
              <div>
                <span>{product.type}</span>
                <h3>
                  <a href={`/products/gym-accessories/${product.slug}`}>{product.name}</a>
                </h3>
                <strong>{product.range}</strong>
                <p>{product.copy}</p>
                <a href={`/products/gym-accessories/${product.slug}`}>
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-final-cta">
        <span>Mixed Container Support</span>
        <h2>Need factory pricing for gym accessories?</h2>
        <p>
          Send your accessory list, target market, logo needs, packaging
          requirements, and estimated quantity. PBF can support global
          fitness accessories supply for commercial gyms, dealers, and OEM
          brands.
        </p>
        <a className="primary-button" href="/contact">
          Get Accessories Quote <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
