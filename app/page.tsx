import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Factory,
  Globe2,
  Mail,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Wrench
} from "lucide-react";
import LazyHeroVideo from "./components/LazyHeroVideo";
import { siteName } from "./site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: "PowerBaseFit | Free Weight Equipment Manufacturer",
    description:
      "OEM dumbbells, weight plates, barbells, benches, racks and gym accessories for global fitness equipment importers and commercial gyms."
  }
};

const products = [
  {
    name: "Dumbbells",
    copy: "Rubber, chrome and hex dumbbells with OEM logo, handle color and full gym set options.",
    image: "/assets/hex-dumbbells.avif",
    href: "/products/dumbbells"
  },
  {
    name: "Weight plates",
    copy: "Bumper plates, rubber plates and cast iron plates for wholesale and commercial gym projects.",
    image: "/assets/weight-plate.avif",
    href: "/products/weight-plates"
  },
  {
    name: "Multi-functional Racks & Benches",
    copy: "Power racks, storage racks and adjustable benches for complete free weight training areas.",
    image: "/assets/racks-benches.avif",
    href: "/products/racks-benches"
  },
  {
    name: "Gym Accessories",
    copy: "Handles, bars, kettlebells, collars, ropes and training accessories for add-on sales.",
    image: "/assets/gym-accessories.avif",
    href: "/products/gym-accessories"
  }
];

const strengths = [
  {
    icon: ShieldCheck,
    title: "Strict Quality Control",
    copy: "From raw material selection to final inspection, every batch is checked for weight accuracy, durability, and finish."
  },
  {
    icon: Wrench,
    title: "OEM Customization",
    copy: "Custom logos, colors, packaging, and product details help dealers and fitness brands build stronger product lines."
  },
  {
    icon: PackageCheck,
    title: "Stable Supply",
    copy: "Established production flow and fast communication help buyers reduce waiting time and protect delivery plans."
  }
];

const specs = [
  "KG and LB systems",
  "Custom logo molding",
  "Commercial gym sets",
  "Private label packaging",
  "Mixed container orders",
  "Fast quotation response"
];

const logoSamples = [
  "IRONVALE",
  "NOVA GYM",
  "APEXFIT",
  "STRONGWAY",
  "URBAN LIFT",
  "PRIME BAR",
  "VOLTAGE",
  "HARDLINE",
  "COREMAX",
  "ATLAS CLUB",
  "LIFTEDGE",
  "FORGE FIT",
  "BLACK IRON",
  "GYMOVA",
  "RACKROOM"
];

const projects = [
  {
    title: "Commercial Dumbbell Zone",
    copy: "Rows of black hex dumbbells for a high-traffic commercial gym free weight area.",
    image: "/assets/project-dumbbell-zone.avif"
  },
  {
    title: "Weight Plate & Barbell Area",
    copy: "Organized plate storage, Olympic bars and lifting platforms for strength facilities.",
    image: "/assets/project-plate-zone.avif"
  },
  {
    title: "Premium Home Gym Project",
    copy: "Multi-functional rack, bench and chrome dumbbells for a high-end private training room.",
    image: "/assets/racks-benches.avif"
  },
  {
    title: "Dealer Product Display",
    copy: "Free weight display solutions for showrooms, dealers and branded retail spaces.",
    image: "/assets/case-gym.avif"
  },
  {
    title: "Private Label Dumbbell Sets",
    copy: "Custom logo dumbbells and racks prepared for gyms, distributors and franchise buyers.",
    image: "/assets/case-showroom.avif"
  },
  {
    title: "Accessory Add-on Program",
    copy: "Handles, ropes, kettlebells and attachments to increase full-container order value.",
    image: "/assets/gym-accessories.avif"
  }
];

const faqs = [
  {
    question: "Can you make custom logo dumbbells and weight plates?",
    answer:
      "Yes. PowerBaseFit supports custom logos, colors, handle finishes, product details and packaging for private label buyers."
  },
  {
    question: "What buyers are a good fit for your factory?",
    answer:
      "We mainly serve fitness equipment importers, wholesalers, dealers, commercial gym owners and gym equipment stores."
  },
  {
    question: "Can I mix dumbbells, plates, racks and accessories in one order?",
    answer:
      "Yes. Mixed container orders are suitable for buyers building a complete free weight product line."
  },
  {
    question: "How fast can I get quotation information?",
    answer:
      "Share your country, product requirement, quantity and logo needs. Our sales team will reply with quotation details and solutions."
  }
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero">
        <LazyHeroVideo />
        <div className="hero-copy">
          <div className="brandline">PowerBaseFit</div>
          <h1>Free Weight Equipment Manufacturer</h1>
          <p>
            OEM dumbbells, weight plates, barbells and gym accessories for global
            fitness equipment importers, wholesalers, dealers and commercial gym
            projects.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Get a Quote <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#products">
              View Products
            </a>
          </div>
          <div className="hero-proof" aria-label="Company proof points">
            <span>Since 2008</span>
            <span>8000 m2 factory</span>
            <span>OEM/ODM source manufacturer</span>
          </div>
        </div>
        <div className="hero-overlay-card">
          <span>Built for</span>
          <strong>commercial gym supply chains</strong>
          <p>OEM free weights, private label programs, container orders, and fast factory quotation.</p>
        </div>
      </section>

      <section className="intro-strip">
        <div>
          <Factory size={24} />
          <span>Source factory in Shandong, China</span>
        </div>
        <div>
          <Globe2 size={24} />
          <span>Serving US, UK, Brazil, Canada, Spain, Australia and Mexico</span>
        </div>
        <div>
          <Boxes size={24} />
          <span>Container orders, wholesale programs and private label projects</span>
        </div>
      </section>

      <section id="products" className="section products-section">
        <div className="section-heading">
          <span>Product Range</span>
          <h2>Core free weight categories for importers and gym suppliers</h2>
          <p>
            Start with the highest-demand products, then expand into complete
            free weight areas and gym accessories.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <a href={product.href} aria-label={`View ${product.name}`}>
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              </a>
              <div>
                <h3>{product.name}</h3>
                <p>{product.copy}</p>
                <a href={product.href}>
                  Request details <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-section" aria-label="Private label logo examples">
        <div className="partner-heading">
          <span>OEM Customization</span>
          <h2>Private label logo styles for global fitness partners</h2>
        </div>
        <div className="logo-marquee">
          <div className="logo-track">
            {[...logoSamples, ...logoSamples].map((logo, index) => (
              <div className="partner-logo" key={`${logo}-${index}`}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section split-section" id="factory">
        <div className="split-copy">
          <span>Factory Capability</span>
          <h2>From raw material to finished free weight sets</h2>
          <p>
            PowerBaseFit supports overseas buyers with reliable manufacturing,
            flexible customization and responsive export communication.
          </p>
        </div>
        <div className="factory-showcase">
          <div className="factory-image">
            <img src="/assets/factory.avif" alt="PowerBaseFit factory exterior" loading="lazy" decoding="async" />
          </div>
          <div className="capability-list">
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon size={24} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section quality-section" id="resources">
        <div className="quality-copy">
          <span>Buying Resources</span>
          <h2>Free weight buying guides for importers and gym buyers</h2>
          <p>
            Build organic traffic with practical content buyers and AI search
            engines can cite: material comparisons, OEM guides, gym set planning,
            weight accuracy, packaging and landed-cost questions.
          </p>
          <div className="spec-list">
            {specs.map((spec) => (
              <div key={spec}>
                <CheckCircle2 size={18} />
                {spec}
              </div>
            ))}
          </div>
        </div>
        <div className="resource-gallery">
          <img src="/assets/dumbbell-production.avif" alt="Finished dumbbell production area" loading="lazy" decoding="async" />
          <img src="/assets/resource-plate-finishing.avif" alt="Weight plate finishing and inspection" loading="lazy" decoding="async" />
          <img src="/assets/resource-cnc-machining.avif" alt="Precision machining for free weight parts" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="section case-section" id="cases">
        <div className="case-copy">
          <span>Project Reference</span>
          <h2>Free weight project references that help buyers imagine the result</h2>
          <p>
            Strong project visuals help overseas buyers understand product
            quality, layout possibilities and private label presentation before
            they request a quote.
          </p>
          <a className="case-more-link" href="/projects">
            View all project cases <ArrowRight size={18} />
          </a>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
              <div>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <span>FAQ</span>
          <h2>Questions buyers ask before placing a free weight order</h2>
          <p>
            These answers help procurement visitors, search engines and AI
            answer systems understand your factory capabilities.
          </p>
        </div>
        <div className="faq-grid">
          {faqs.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section rfq-section" id="contact">
        <div className="rfq-copy">
          <span>Send RFQ</span>
          <h2>Get factory quotation for your free weight order</h2>
          <p>
            Share your country, product requirement and target quantity. Kloe
            Du and the sales team will reply within 24 hours with product
            information, quotations and solutions.
          </p>
          <div className="contact-lines">
            <a href="mailto:Kloe@powerbasefit.com">
              <Mail size={18} /> Kloe@powerbasefit.com
            </a>
            <a href="https://wa.me/8618963018533">
              <MessageCircle size={18} /> +86 18963018533
            </a>
          </div>
        </div>
        <form className="rfq-form">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="name@company.com" />
          </label>
          <label>
            Country
            <input type="text" placeholder="United States" />
          </label>
          <label>
            Product Requirement
            <select defaultValue="">
              <option value="" disabled>
                Select product
              </option>
              <option>Rubber Dumbbells</option>
              <option>Chrome Dumbbells</option>
              <option>Weight Plates</option>
              <option>Barbells / Benches / Racks</option>
            </select>
          </label>
          <label className="full">
            Message
            <textarea placeholder="Tell us product, quantity, logo requirement and target market." />
          </label>
          <button type="button">
            Submit Inquiry <ArrowRight size={18} />
          </button>
        </form>
      </section>

      <footer className="footer">
        <img className="footer-logo" src="/assets/logo-readable.png" alt="PowerBaseFit" />
        <div>
          <strong>Powerbase Fitness Equipment Co.,Ltd</strong>
          <span>Zhengyang Road, Ningjin County, Dezhou, Shandong Province, China</span>
          <span>Since 2008 · 8,000 m2 factory · Europe and USA export markets</span>
        </div>
        <div className="footer-links">
          <a href="#products">Products</a>
          <a href="/factory">Factory</a>
          <a href="/resources">Resources</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}


