import type { Metadata } from "next";
import { ArrowRight, Boxes, Dumbbell, Factory, Globe2, ShieldCheck } from "lucide-react";
import MegaMenu from "../../components/MegaMenu";
import { getEnglishAlternates } from "../../../lib/seo/english-alternates";
import { company, siteName, siteUrl } from "../../site";

export const metadata: Metadata = {
  title: "Products | Free Weight Equipment Manufacturer & OEM Supplier",
  description:
    "Browse PowerBaseFit free weight products including dumbbells, weight plates, multi-functional racks, benches, and gym accessories for global B2B gym equipment buyers.",
  alternates: getEnglishAlternates("/products"),
  openGraph: {
    type: "website",
    title: "Products | Free Weight Equipment Manufacturer & OEM Supplier",
    description:
      "Free weight equipment product categories for importers, distributors, commercial gyms, and OEM fitness brands.",
    url: `${siteUrl}/products`,
    images: [
      {
        url: "/assets/hero-poster.avif",
        width: 1600,
        height: 900,
        alt: "PowerBaseFit free weight equipment product range"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Free Weight Equipment Manufacturer & OEM Supplier",
    description:
      "Browse dumbbells, weight plates, racks, benches, and accessories from PowerBaseFit.",
    images: ["/assets/hero-poster.avif"]
  }
};

const categories = [
  {
    name: "Dumbbells",
    href: "/products/dumbbells",
    description:
      "CPU, TPU, PU, rubber, chrome, hex, neoprene, stainless steel, and adjustable dumbbells for commercial gym floors, distributors, and private label programs.",
    keywords: "dumbbell manufacturer, commercial dumbbells, OEM dumbbells",
    icon: Dumbbell
  },
  {
    name: "Weight Plates",
    href: "/products/weight-plates",
    description:
      "Rubber plates, bumper plates, cast iron plates, steel plates, competition plates, and customized plate designs for wholesale and gym projects.",
    keywords: "weight plates manufacturer, bumper plates factory China, gym weight plates supplier",
    icon: ShieldCheck
  },
  {
    name: "Multi-functional Racks & Benches",
    href: "/products/racks-benches",
    description:
      "Home gym functional trainers, Smith rack systems, cable training frames, adjustable benches, and private space gym solutions.",
    keywords: "home gym functional trainer, multi functional rack, gym bench supplier",
    icon: Factory
  },
  {
    name: "Gym Accessories",
    href: "/products/gym-accessories",
    description:
      "Kettlebells, yoga mats, bars, cable attachments, steps, balance trainers, and accessories for complete gym equipment supply programs.",
    keywords: "gym accessories supplier, fitness accessories manufacturer, training accessories",
    icon: Boxes
  }
];

const faqs = [
  {
    question: "Can PowerBaseFit supply mixed product categories in one order?",
    answer:
      "Yes. Buyers can combine dumbbells, weight plates, racks, benches, and gym accessories in one sourcing plan. The final loading method depends on quantity, product size, packaging, and destination market."
  },
  {
    question: "Do you support OEM logo and private label products?",
    answer:
      "Yes. OEM options may include logo placement, weight markings, color details, product finish, carton labels, and packaging design. The available options depend on product material and order requirements."
  },
  {
    question: "What information helps you quote faster?",
    answer:
      "Please send the target product category, quantity, KG or LB range, logo requirements, destination country, and whether the order is for a commercial gym, distributor, retail program, or OEM brand."
  },
  {
    question: "Which markets do you support?",
    answer:
      "PowerBaseFit supports export buyers in Europe, the USA, the Middle East, South America, and other international markets with product selection, packaging, and shipment preparation."
  }
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/products#collection`,
    name: "PowerBaseFit Products",
    url: `${siteUrl}/products`,
    inLanguage: "en",
    description:
      "Free weight equipment product categories for B2B buyers, including dumbbells, weight plates, racks, benches, and gym accessories.",
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      alternateName: siteName,
      url: siteUrl
    },
    hasPart: categories.map((category) => ({
      "@type": "CollectionPage",
      name: category.name,
      url: `${siteUrl}${category.href}`,
      description: category.description
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}/products`
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
];

export default function ProductsPage() {
  return (
    <main className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="products-header">
        <a className="products-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
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
          <span>Product System</span>
          <h1>Free Weight Equipment Products for Global B2B Buyers</h1>
          <p>
            Explore PowerBaseFit product categories for dumbbells, weight plates,
            multi-functional racks, benches, and gym accessories. This page helps
            importers, distributors, commercial gyms, and OEM fitness brands find
            the right product line before requesting a factory quotation.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Send Product Requirements <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#product-categories">
              View Categories
            </a>
          </div>
        </div>
        <div className="detail-seo-grid products-hub-summary" aria-label="PowerBaseFit product supply overview">
          <article>
            <Factory size={28} />
            <span>Direct Factory</span>
            <h2>One supplier for core free weight lines</h2>
            <p>
              PowerBaseFit manufactures free weight equipment in Dezhou, China,
              helping buyers prepare practical product ranges, OEM details,
              packaging, and shipment plans.
            </p>
          </article>
          <article>
            <Globe2 size={28} />
            <span>Global Supply</span>
            <h2>Built for export orders</h2>
            <p>
              Product programs can be planned for Europe, the USA, Middle East,
              South America, and other markets where commercial gym equipment
              buyers need consistent supply and clear communication.
            </p>
          </article>
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Product sourcing advantages">
        <article>
          <Factory size={24} />
          <strong>Factory Supply</strong>
          <span>Direct support for product selection, sample review, and bulk order planning.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>OEM Capability</strong>
          <span>Logo, color, finish, weight marking, and packaging options by product type.</span>
        </article>
        <article>
          <Globe2 size={24} />
          <strong>Export Support</strong>
          <span>Carton, pallet, wooden crate, and mixed-container preparation based on order needs.</span>
        </article>
      </section>

      <section className="products-section" id="product-categories">
        <div className="section-heading-wide">
          <div>
            <span>Product Categories</span>
            <h2>Browse PowerBaseFit product lines</h2>
          </div>
          <p>
            Each category page includes product options, application scenarios,
            OEM notes, and links to individual SEO product pages.
          </p>
        </div>

        <div className="dumbbell-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <article className="dumbbell-card products-hub-card" key={category.href}>
                <div className="products-hub-card-icon">
                  <Icon size={34} />
                </div>
                <div>
                  <span>{category.keywords}</span>
                  <h3>
                    <a href={category.href}>{category.name}</a>
                  </h3>
                  <p>{category.description}</p>
                  <a href={category.href}>
                    View category <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>OEM & Custom</span>
          <h2>Private label support for product programs</h2>
          <p>
            Buyers can discuss custom logo placement, color details, KG or LB
            markings, packaging requirements, and product combinations. For
            distributors and gym chains, a consistent product line helps improve
            display, sales communication, and repeat sourcing.
          </p>
        </article>
        <article>
          <span>Applications</span>
          <h2>Commercial gym, home gym, and project supply</h2>
          <p>
            Products can be selected for commercial strength zones, boutique
            studios, private home gym rooms, hotel gyms, school fitness rooms,
            and distributor wholesale programs.
          </p>
        </article>
        <article>
          <span>Buying Info</span>
          <h2>What to prepare before quotation</h2>
          <p>
            A clear product list, target quantity, destination country, logo
            requirement, packaging preference, and project type help the factory
            confirm MOQ, lead time, and suitable shipping preparation faster.
          </p>
        </article>
      </section>

      <section className="products-section product-faq">
        <div className="section-heading-wide">
          <div>
            <span>FAQ</span>
            <h2>Product sourcing questions</h2>
          </div>
          <p>
            Practical answers for overseas buyers comparing free weight
            equipment suppliers and preparing product inquiries.
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
        <h2>Need help choosing the right product line?</h2>
        <p>
          Send your product list, target quantity, logo needs, and destination
          market. PowerBaseFit will help prepare a practical product quotation
          for your gym project or wholesale program.
        </p>
        <a className="primary-button" href="/contact">
          Get My Quotation <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
