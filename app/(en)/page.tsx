import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  Factory,
  FileCheck2,
  Globe2,
  Handshake,
  PackageCheck,
  Palette,
  RefreshCw,
  Ruler,
  SearchCheck,
  Ship,
  Tags,
  Truck
} from "lucide-react";
import FreeSampleCTA from "../components/FreeSampleCTA";
import { siteName, siteUrl } from "../site";
import { getEnglishAlternates } from "../../lib/seo/english-alternates";

export const metadata: Metadata = {
  title: "Custom Dumbbells & Weight Plates Manufacturer | PowerBaseFit",
  description:
    "Source custom dumbbells and weight plates from PowerBaseFit, with OEM branding, export packaging and production support for importers and distributors.",
  alternates: getEnglishAlternates("/"),
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: "Custom Dumbbells & Weight Plates Manufacturer | PowerBaseFit",
    description:
      "OEM free weights, export packaging and repeat-order support for importers, distributors and private label fitness brands.",
    images: [{
      url: "/assets/projects/project-hero-desktop.avif",
      width: 1600,
      height: 900,
      alt: "PowerBaseFit commercial free weight equipment project"
    }]
  }
};

const products = [
  {
    name: "Custom Dumbbells",
    description: "Rubber, hex, chrome, steel, CPU and TPU dumbbells for wholesale ranges, commercial gyms and private label programs.",
    image: "/assets/hex-dumbbells.avif",
    alt: "Commercial rubber hex dumbbells for wholesale and OEM orders",
    href: "/products/dumbbells",
    details: ["KG and LB ranges", "Logo and end-cap options", "Handle and finish selection"]
  },
  {
    name: "Weight & Bumper Plates",
    description: "Cast iron, rubber-coated, urethane, steel and bumper plates planned around material, use, markings and target market.",
    image: "/assets/weight-plate.avif",
    alt: "Weight plates and bumper plates supplied for commercial buyers",
    href: "/products/weight-plates",
    details: ["Material and finish options", "KG, LB or dual marking", "Custom colors and logos"]
  },
  {
    name: "Gym Accessories",
    description: "Cable attachments, bars, collars, kettlebells and supporting accessories for complete product lists and add-on sales.",
    image: "/assets/gym-accessories.avif",
    alt: "Cable attachments and gym accessories for distributors",
    href: "/products/gym-accessories",
    details: ["Mixed accessory lists", "Retail and project supply", "Custom labels and packaging"]
  }
];

const buyerOutcomes = [
  { icon: FileCheck2, title: "Comparable specifications", description: "Material, finish, weight range, markings and packing details are defined before order confirmation." },
  { icon: RefreshCw, title: "Repeat-order control", description: "Approved product details, artwork and packing instructions create a clear reference for future batches." },
  { icon: PackageCheck, title: "Export-ready packing", description: "Product protection, carton labels, pallet preparation and loading requirements are reviewed for the order." },
  { icon: SearchCheck, title: "Documented checks", description: "Weight, appearance, assembly, markings and packaging are checked against the confirmed order details." }
];

const oemOptions = [
  { icon: Tags, title: "Logo & Marking", description: "Molded, printed, laser or end-cap branding by product construction." },
  { icon: Palette, title: "Color & Finish", description: "Product colors, surface treatments and visual references confirmed before production." },
  { icon: Ruler, title: "Weight System", description: "KG, LB and dual-mark ranges prepared for the destination market." },
  { icon: Boxes, title: "Packaging", description: "Cartons, labels, inserts and retail presentation aligned with the approved order." }
];

const steps = [
  { number: "01", title: "Send requirements", copy: "Share product, weight range, quantity, market and destination." },
  { number: "02", title: "Review specification", copy: "Confirm material, finish, logo, markings and packaging." },
  { number: "03", title: "Approve sample", copy: "Review the requested product version before bulk production." },
  { number: "04", title: "Confirm order", copy: "Lock the product list, artwork, packing details and schedule." },
  { number: "05", title: "Production & checks", copy: "Manufacture and inspect against the confirmed order details." },
  { number: "06", title: "Pack & ship", copy: "Prepare cartons, pallets, loading information and shipment records." }
];

const evidence = [
  { title: "Material processing", copy: "Equipment and material preparation for dumbbell components.", image: "/assets/factory-process/dumbbell-cutting.webp", alt: "Dumbbell component processing equipment at PowerBaseFit" },
  { title: "Surface finishing", copy: "Finishing work for appearance, edges and product surfaces.", image: "/assets/factory-process/detail-polishing-video.webp", alt: "Free weight component surface finishing process" },
  { title: "Packing preparation", copy: "Products organized and protected before export dispatch.", image: "/assets/factory-cases/packaging-area-pbf.webp", alt: "PowerBaseFit free weight products prepared in the packing area" }
];

const exhibitions = [
  {
    title: "Product discussions",
    copy: "Review construction, finish, weight ranges and branding directly with our team.",
    image: "/assets/exhibitions/pbf-exhibition-01.webp",
    alt: "PowerBaseFit team discussing chrome dumbbells with international buyers at a fitness equipment exhibition"
  },
  {
    title: "Hands-on product review",
    copy: "Compare product details and commercial applications at the booth.",
    image: "/assets/exhibitions/pbf-exhibition-05.webp",
    alt: "PowerBaseFit representative demonstrating free weight equipment to an exhibition visitor"
  },
  {
    title: "Export sales team",
    copy: "Meet the people who support product selection, OEM details and order communication.",
    image: "/assets/exhibitions/pbf-exhibition-team.webp",
    alt: "PowerBaseFit export sales team at an international fitness equipment exhibition"
  }
];

const exportMarkets = ["Europe", "North America", "South America", "Middle East"];

const projects = [
  {
    title: "Commercial Dumbbell Zone",
    need: "A coordinated fixed-dumbbell range with organized storage and consistent presentation.",
    supplied: "Dumbbell selection, weight progression, rack matching and finish coordination.",
    image: "/assets/projects/commercial-dumbbell-rack-zone.avif",
    alt: "Commercial gym dumbbell zone supplied with organized storage"
  },
  {
    title: "Compact Chrome Dumbbell Set",
    need: "A compact free weight option for a limited training area.",
    supplied: "Chrome dumbbell progression with space-conscious vertical storage.",
    image: "/assets/projects/compact-chrome-dumbbell-set.webp",
    alt: "Compact chrome dumbbell set with vertical storage rack"
  }
];

const resources = [
  { title: "Commercial Free Weight RFQ Checklist", copy: "Prepare specifications that make factory quotations easier to compare.", href: "/resources/commercial-free-weight-rfq-checklist" },
  { title: "OEM Sample Approval Process", copy: "Create a clear product reference before a branded bulk order.", href: "/resources/oem-free-weight-sample-approval-process" },
  { title: "Free Weight Batch Consistency", copy: "Record the details that matter when a product range is reordered.", href: "/resources/free-weight-reorder-batch-consistency" },
  { title: "Export Packaging Guide", copy: "Review protection, carton information, pallets and receiving risks.", href: "/resources/export-packaging-dumbbells-weight-plates" }
];

const faqs = [
  { question: "What information is required for a factory quotation?", answer: "Send the product type, weight range, quantity, KG or LB marking, logo requirement, packaging requirement and destination country." },
  { question: "How is the minimum order quantity confirmed?", answer: "MOQ is confirmed for the selected product construction, customization and packing plan after the product list is reviewed." },
  { question: "Which OEM details are available?", answer: "The order specification covers the available logo method, color, finish, weight marking, carton label and packaging for the selected product." },
  { question: "How is production lead time quoted?", answer: "Lead time is quoted after quantity, customization, sample approval and the production schedule are confirmed." },
  { question: "What is checked before shipment?", answer: "The inspection plan records the required checks for product identity, weight, appearance, assembly, marking, quantity and packaging." },
  { question: "How are repeat orders kept consistent?", answer: "Approved specifications, artwork versions, product references and packing instructions are retained for comparison with the next order." }
];

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Custom Dumbbells & Weight Plates Manufacturer",
      description: "PowerBaseFit manufactures OEM dumbbells, weight plates, bumper plates and gym accessories for importers and distributors.",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/assets/projects/project-hero-desktop.avif` }
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    }
  ]
};

export default function Home() {
  return (
    <main className="home-v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      <section className="home-v3-hero" aria-labelledby="home-v3-title">
        <div className="home-v3-hero-copy">
          <h1 id="home-v3-title">Custom Dumbbells & Weight Plates Manufacturer for Importers & Distributors</h1>
          <p>Build a focused free weight range with OEM branding, defined specifications, export packaging and clear repeat-order records from PowerBaseFit in Dezhou, China.</p>
          <div className="home-v3-hero-actions">
            <FreeSampleCTA compact section="hero" />
            <a className="home-v3-button home-v3-button-secondary" href="/contact">Get a Factory Quote <ArrowRight size={18} /></a>
          </div>
          <a className="home-v3-text-link" href="#products">Explore product families <ArrowRight size={16} /></a>
        </div>
        <div className="home-v3-hero-media">
          <Image src="/assets/projects/project-hero-desktop.avif" alt="Commercial free weight training area with dumbbells and weight plates" fill priority fetchPriority="high" quality={40} sizes="(max-width: 900px) 100vw, 56vw" />
        </div>
      </section>

      <section className="home-v3-proof" aria-label="PowerBaseFit company facts">
        <div><Factory size={21} /><span><strong>Since 2008</strong>Manufacturing experience</span></div>
        <div><BadgeCheck size={21} /><span><strong>15,000 m² Factory</strong>Dezhou, Shandong, China</span></div>
        <div><Tags size={21} /><span><strong>OEM / Private Label</strong>Product and packaging details</span></div>
        <div><Ship size={21} /><span><strong>Export Order Support</strong>Packing and shipment preparation</span></div>
      </section>

      <section className="home-v3-section home-v3-products" id="products" aria-labelledby="home-products-title">
        <div className="home-v3-section-heading">
          <div><span>Core product families</span><h2 id="home-products-title">Build a free weight range around your market</h2></div>
          <p>Start with the product category, then define material, weight progression, branding, packaging and order quantity.</p>
        </div>
        <div className="home-v3-product-grid">
          {products.map((product) => (
            <a className="home-v3-product" href={product.href} key={product.name}>
              <div className="home-v3-product-image"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
              <div className="home-v3-product-copy">
                <h3>{product.name}</h3><p>{product.description}</p>
                <ul>{product.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
                <strong>View product range <ArrowRight size={16} /></strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-v3-section home-v3-outcomes" aria-labelledby="home-outcomes-title">
        <div className="home-v3-outcomes-media"><Image src="/assets/factory-cases/packaging-area-pbf.webp" alt="PowerBaseFit team preparing dumbbells and weight plates for packing" fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
        <div className="home-v3-outcomes-copy">
          <span>Built for repeat purchasing</span><h2 id="home-outcomes-title">Protect the details behind every order</h2>
          <p>A reliable free weight program begins with written product decisions. PowerBaseFit organizes the specification, sample reference, artwork and packing information used through production and reorder review.</p>
          <div className="home-v3-outcome-list">
            {buyerOutcomes.map((item) => <article key={item.title}><item.icon size={22} /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="home-v3-section home-v3-oem" id="oem" aria-labelledby="home-oem-title">
        <div className="home-v3-oem-heading">
          <span>OEM & private label</span><h2 id="home-oem-title">Turn product decisions into an approved production reference</h2>
          <p>Branding is reviewed together with the product construction, weight system, finish and packaging so every confirmed detail belongs to one order version.</p>
        </div>
        <div className="home-v3-oem-layout">
          <div className="home-v3-oem-image"><Image src="/assets/chrome-dumbbell.webp" alt="Chrome dumbbell product finish and custom end marking" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
          <div className="home-v3-oem-options">
            {oemOptions.map((item) => <article key={item.title}><item.icon size={22} /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}
            <div className="home-v3-oem-actions"><FreeSampleCTA compact section="oem" /><a className="home-v3-text-link" href="/oem">Explore OEM & Private Label <ArrowRight size={16} /></a></div>
          </div>
        </div>
      </section>

      <section className="home-v3-section home-v3-process" aria-labelledby="home-process-title">
        <div className="home-v3-section-heading">
          <div><span>From requirement to shipment</span><h2 id="home-process-title">A clear six-step purchasing process</h2></div>
          <p>Each stage produces information used by the next stage, from the first product request to packing and dispatch.</p>
        </div>
        <ol className="home-v3-process-list">{steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
      </section>

      <section className="home-v3-section home-v3-factory" aria-labelledby="home-factory-title">
        <div className="home-v3-factory-intro">
          <span>Factory evidence</span><h2 id="home-factory-title">See the work behind the finished product</h2>
          <p>Review production, finishing and packing through real images from PowerBaseFit operations.</p>
          <a className="home-v3-button home-v3-button-secondary" href="/factory">Visit the Factory <ArrowRight size={18} /></a>
        </div>
        <div className="home-v3-evidence-grid">
          {evidence.map((item, index) => (
            <article className={index === 0 ? "home-v3-evidence-featured" : ""} key={item.title}>
              <Image src={item.image} alt={item.alt} fill sizes={index === 0 ? "(max-width: 900px) 100vw, 48vw" : "(max-width: 900px) 100vw, 24vw"} />
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-v3-exhibitions" aria-labelledby="home-exhibitions-title">
        <div className="home-v3-exhibitions-copy">
          <span>International buyer connection</span>
          <h2 id="home-exhibitions-title">Meet PowerBaseFit at industry exhibitions</h2>
          <p>Our team presents free weight products, reviews specifications and discusses OEM, packaging and order plans with international buyers face to face.</p>
          <div className="home-v3-exhibition-points">
            <div><Handshake size={22} /><span><strong>Buyer meetings</strong>Discuss products and purchasing requirements with our export team.</span></div>
            <div><Globe2 size={22} /><span><strong>Export market coverage</strong>Europe, North America, South America and the Middle East.</span></div>
          </div>
          <a className="home-v3-button home-v3-button-secondary" href="/factory">View Exhibitions & Factory <ArrowRight size={18} /></a>
        </div>
        <div className="home-v3-exhibition-gallery">
          {exhibitions.map((item, index) => (
            <article className={index === 0 ? "home-v3-exhibition-featured" : ""} key={item.title}>
              <Image src={item.image} alt={item.alt} fill sizes={index === 0 ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 29vw"} />
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>
          ))}
        </div>
        <div className="home-v3-market-strip" aria-label="PowerBaseFit export markets">
          <span>Export markets</span>
          {exportMarkets.map((market) => <strong key={market}>{market}</strong>)}
        </div>
      </section>

      <section className="home-v3-section home-v3-projects" aria-labelledby="home-projects-title">
        <div className="home-v3-section-heading">
          <div><span>Product applications</span><h2 id="home-projects-title">Free weight ranges planned for real spaces</h2></div>
          <a className="home-v3-text-link" href="/projects">View project cases <ArrowRight size={16} /></a>
        </div>
        <div className="home-v3-project-grid">
          {projects.map((project) => (
            <article key={project.title}>
              <div className="home-v3-project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
              <div className="home-v3-project-copy"><h3>{project.title}</h3><p><strong>Requirement</strong>{project.need}</p><p><strong>Product direction</strong>{project.supplied}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-v3-section home-v3-resources" aria-labelledby="home-resources-title">
        <div className="home-v3-resource-intro">
          <span>Buyer resources</span><h2 id="home-resources-title">Prepare the details that make an order easier to evaluate</h2>
          <p>Use practical guides for specifications, sample approval, packaging, inspection and repeat purchasing.</p>
          <a className="home-v3-text-link" href="/resources">Browse all buying guides <ArrowRight size={16} /></a>
        </div>
        <div className="home-v3-resource-list">
          {resources.map((resource, index) => <a href={resource.href} key={resource.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{resource.title}</h3><p>{resource.copy}</p></div><ArrowRight size={18} /></a>)}
        </div>
      </section>

      <section className="home-v3-section home-v3-faq" aria-labelledby="home-faq-title">
        <div className="home-v3-faq-intro"><span>Before you request a quote</span><h2 id="home-faq-title">Common purchasing questions</h2><p>Send the product list and destination first. The quotation then records the confirmed order details.</p></div>
        <div className="home-v3-faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="home-v3-sample" aria-labelledby="home-sample-title">
        <div><span>Start with the product</span><h2 id="home-sample-title">Get a Free Sample</h2><p>Tell us the product, quantity, destination and branding requirements. Continue the conversation through WhatsApp or email.</p></div>
        <FreeSampleCTA section="final-sample" />
      </section>

      <section className="home-v3-final" aria-label="Factory quotation">
        <div><Truck size={25} /><span>Ready to prepare a product list?</span></div>
        <a className="home-v3-button home-v3-button-secondary" href="/contact">Get a Factory Quote <ArrowRight size={18} /></a>
      </section>
    </main>
  );
}
