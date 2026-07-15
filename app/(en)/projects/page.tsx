import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Dumbbell,
  Globe2,
  ShieldCheck
} from "lucide-react";
import { getEnglishAlternates } from "../../../lib/seo/english-alternates";

export const metadata: Metadata = {
  title: "Gym Equipment Projects | Free Weight Project References",
  description:
    "Free weight gym project references for commercial gyms, distributors, OEM brands, and full gym solutions. Explore dumbbells, weight plates, racks, benches, packaging, and mixed container projects.",
  alternates: getEnglishAlternates("/projects")
};

const projectTypes = [
  "All Projects",
  "Commercial Gyms",
  "Dumbbell Zones",
  "Weight Plate Areas",
  "OEM Brand",
  "Distributor Display",
  "Full Gym Solution",
  "Packing & Shipping"
];

const projects = [
  {
    title: "Premium Round Dumbbell Zone",
    category: "Commercial Gyms",
    image: "/assets/projects/round-dumbbell-gym-zone.webp",
    copy: "Round dumbbell sets arranged on white racks for a clean, premium free weight area.",
    scope: "Round dumbbells, racks, premium display",
    cta: "Request similar setup"
  },
  {
    title: "Commercial Dumbbell Rack Zone",
    category: "Dumbbell Zones",
    image: "/assets/projects/commercial-dumbbell-rack-zone.webp",
    copy: "Long dumbbell rack layout for high-traffic gyms, fitness clubs, and strength training zones.",
    scope: "Hex dumbbells, racks, gym layout",
    cta: "Plan my dumbbell area"
  },
  {
    title: "Black Hex Dumbbell Project",
    category: "Commercial Gyms",
    image: "/assets/project-dumbbell-zone.webp",
    copy: "High-density black dumbbell zone for commercial gym users and daily strength training.",
    scope: "Hex dumbbells, racks, KG/LB sets",
    cta: "Get gym quote"
  },
  {
    title: "Weight Plate & Barbell Area",
    category: "Weight Plate Areas",
    image: "/assets/project-plate-zone.webp",
    copy: "Plate-loaded strength area with Olympic bars, storage, platforms, and bumper plate options.",
    scope: "Weight plates, bars, storage",
    cta: "Request plate program"
  },
  {
    title: "Home Gym Free Weight Room",
    category: "Full Gym Solution",
    image: "/assets/racks-benches.webp",
    copy: "Compact full gym solution combining racks, benches, dumbbells, and storage for premium spaces.",
    scope: "Rack, bench, chrome dumbbells",
    cta: "Ask for layout"
  },
  {
    title: "Dealer Product Display",
    category: "Distributor Display",
    image: "/assets/case-showroom.webp",
    copy: "Free weight product display for distributors, showrooms, and local retail fitness equipment stores.",
    scope: "Dumbbells, plates, display",
    cta: "Request display plan"
  },
  {
    title: "Premium Product Showroom",
    category: "Distributor Display",
    image: "/assets/case-gym.webp",
    copy: "Chrome dumbbells and weight plates presented for buyers building high-end product lines.",
    scope: "Chrome dumbbells, plates",
    cta: "View product options"
  },
  {
    title: "Gym Accessories Add-on Program",
    category: "OEM Brand",
    image: "/assets/gym-accessories.webp",
    copy: "Handles, bars, collars, kettlebells, ropes, and attachments for container add-on sales.",
    scope: "Accessories, kettlebells, handles",
    cta: "Send accessory list"
  },
  {
    title: "Private Label Dumbbell Program",
    category: "OEM Brand",
    image: "/assets/hex-dumbbells.webp",
    copy: "Logo, weight markings, packaging, and product range planning for private label dumbbell buyers.",
    scope: "Custom logo, color, packaging",
    cta: "Start OEM project"
  },
  {
    title: "Weight Plate Product Program",
    category: "Weight Plate Areas",
    image: "/assets/weight-plate.webp",
    copy: "Rubber plates, bumper plates, and mixed plate sets for gyms, dealers, and wholesale orders.",
    scope: "Weight plates, bumper plates",
    cta: "Ask plate catalog"
  },
  {
    title: "OEM Packaging Project",
    category: "Packing & Shipping",
    image: "/assets/factory-cases/packaging-area-pbf.webp",
    copy: "Carton, pallet, logo packaging, and shipment inspection support for export fitness products.",
    scope: "Packaging, pallet, inspection",
    cta: "Request packaging plan"
  },
  {
    title: "Mixed Container Export Order",
    category: "Packing & Shipping",
    image: "/assets/factory-cases/container-shipping-pbf.webp",
    copy: "Mixed container planning for dumbbells, plates, racks, benches, accessories, and export delivery.",
    scope: "Mixed container, shipping",
    cta: "Plan my container"
  }
];

const buyerRows = [
  {
    buyer: "Gym opening",
    needs: "Dumbbell sets, plates, racks, benches, bars, and starter accessories.",
    action: "Get layout quote"
  },
  {
    buyer: "Distributor",
    needs: "Fast-moving SKUs, showroom display, private label packaging, and mixed container support.",
    action: "Ask catalog"
  },
  {
    buyer: "OEM brand",
    needs: "Custom logo, color, finish, carton design, sample confirmation, and QC plan.",
    action: "Start OEM"
  },
  {
    buyer: "Hotel / club",
    needs: "Premium chrome dumbbells, compact racks, benches, and clean visual presentation.",
    action: "Send project"
  }
];

const faqs = [
  {
    question: "Can you help build a full free weight zone?",
    answer:
      "Yes. Send room size, product list, target quantity, or reference photos. We can recommend dumbbell sets, plates, racks, benches, and accessories."
  },
  {
    question: "Can I use my own logo for project products?",
    answer:
      "Yes. OEM customization can include product logo, color details, packaging, carton marks, and product display details."
  },
  {
    question: "Can I mix multiple products in one order?",
    answer:
      "Yes. Mixed container orders are suitable for distributors and gym projects combining dumbbells, weight plates, racks, benches, and accessories."
  },
  {
    question: "What should I send for a fast project quote?",
    answer:
      "Please send product category, quantity, country, logo needs, project type, and any reference images or layout requirements."
  }
];

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <header className="projects-header">
        <a className="projects-brand" href="/">
          <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
        </a>
        <nav aria-label="Projects navigation">
          <a href="/">Home</a>
          <a href="/factory">Factory</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Contact</a>
        </nav>
        <a className="projects-top-cta" href="/contact">
          Get a Quote <ArrowRight size={18} />
        </a>
      </header>

      <section className="projects-hero">
        <picture className="projects-hero-media">
          <source media="(max-width: 900px)" srcSet="/assets/projects/project-hero-mobile.avif" type="image/avif" />
          <source srcSet="/assets/projects/project-hero-desktop.avif" type="image/avif" />
          <img
            src="/assets/projects/project-hero-desktop.avif"
            alt=""
            width="1536"
            height="1024"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="projects-hero-copy">
          <span>Project references</span>
          <h1>Free Weight Gym Projects Built for Global Buyers</h1>
          <p>
            Explore commercial gym dumbbell zones, weight plate areas, private
            label displays, full gym solutions, and mixed container export
            projects for distributors, gym owners, and OEM fitness brands.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Start a Project Quote <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#project-gallery">
              View Project Cases
            </a>
          </div>
          <div className="hero-tags">
            <span>Commercial gym projects</span>
            <span>OEM logo support</span>
            <span>Mixed container planning</span>
          </div>
        </div>
      </section>

      <section className="project-stats" aria-label="Project page value points">
        <article>
          <Building2 size={24} />
          <strong>Scenario-based cases</strong>
          <span>Help buyers find a similar gym, dealer, or OEM project quickly.</span>
        </article>
        <article>
          <Dumbbell size={24} />
          <strong>Free weight focused</strong>
          <span>Dumbbells, plates, racks, benches, bars, and accessories.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>OEM details included</strong>
          <span>Logo, packaging, finish, product range, and inspection notes.</span>
        </article>
        <article>
          <Globe2 size={24} />
          <strong>Export-ready thinking</strong>
          <span>Mixed containers, packing plans, and global buyer communication.</span>
        </article>
      </section>

      <section className="projects-section" id="project-gallery">
        <div className="section-heading-wide">
          <div>
            <span>Project gallery</span>
            <h2>More case entrances for every buyer scenario</h2>
          </div>
          <p>
            This gallery is designed to grow over time. New customer photos can
            be added as additional project cards while keeping the same
            conversion path.
          </p>
        </div>

        <div className="project-type-list" aria-label="Project filters preview">
          {projectTypes.map((type) => (
            <span key={type}>{type}</span>
          ))}
        </div>

        <div className="featured-project">
          <a className="featured-image" href="/contact" aria-label="Request a similar commercial free weight project">
            <img
              src="/assets/projects/commercial-dumbbell-rack-zone.webp"
              alt="Commercial dumbbell rack zone project"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div className="featured-copy">
            <span>Featured project</span>
            <h2>Commercial Free Weight Zone for Gym Opening</h2>
            <p>
              A high-traffic strength area built around dumbbell sets, racks,
              benches, and accessories. This type of visual case helps buyers
              describe their desired gym layout and product scope before
              requesting a quote.
            </p>
            <div className="featured-specs">
              <div>
                <strong>Product scope</strong>
                <small>Dumbbells, racks, benches, plates</small>
              </div>
              <div>
                <strong>Buyer type</strong>
                <small>Gym opening / importer / distributor</small>
              </div>
              <div>
                <strong>Customization</strong>
                <small>Logo, handle finish, color, packaging</small>
              </div>
              <div>
                <strong>Export support</strong>
                <small>Packing list, container plan, inspection</small>
              </div>
            </div>
            <a className="primary-button" href="/contact">
              Request Similar Project Quote <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="case-grid" aria-label="Project case cards">
          {projects.map((project) => (
            <article className="case-card" key={project.title}>
              <a href="/contact" aria-label={`Request quote for ${project.title}`}>
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
              </a>
              <div>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
                <small>{project.scope}</small>
                <a href="/contact">
                  {project.cta} <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section buyer-section">
        <div className="buyer-copy">
          <span>Buyer matching</span>
          <h2>Turn project browsing into a clear RFQ path</h2>
          <p>
            Overseas buyers often know the type of gym area they want, but not
            the exact product list. This section helps them match their scenario
            with the right product package and send clearer requirements.
          </p>
          <a className="secondary-button" href="/contact">
            Send My Project Details
          </a>
        </div>
        <div className="buyer-table">
          {buyerRows.map((row) => (
            <div className="buyer-row" key={row.buyer}>
              <strong>{row.buyer}</strong>
              <p>{row.needs}</p>
              <a href="/contact">{row.action}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-section conversion-section">
        <div className="faq-list">
          {faqs.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
        <div className="project-form-preview">
          <span>Project quotation</span>
          <h2>Send your gym project details</h2>
          <p>
            Share your product list, quantity, logo needs, destination country,
            and reference photos. We will help prepare a practical free weight
            project quotation.
          </p>
          <div className="preview-fields">
            <div>Name *</div>
            <div>Email *</div>
            <div>Country / Region</div>
            <div>Project Type</div>
            <div className="full">Product list, quantity, logo needs, destination market...</div>
          </div>
          <a className="primary-button" href="/contact">
            Get Project Quote <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className="projects-footer">
        <img src="/assets/logo-readable.webp" alt="PowerBaseFit" loading="lazy" decoding="async" />
        <div>
          <strong>Powerbase Fitness Equipment Co.,Ltd</strong>
          <span>Ningjin City, Shandong Province, China</span>
        </div>
        <div>
          <a href="/">Home</a>
          <a href="/factory">Factory</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>

      <style>{`
        .projects-page {
          min-height: 100vh;
          color: #f7f1e6;
          background:
            radial-gradient(circle at 74% 3%, rgba(241, 199, 107, 0.16), transparent 28%),
            linear-gradient(180deg, #070707 0%, #12100d 48%, #070707 100%);
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        .projects-page a {
          color: inherit;
          text-decoration: none;
        }

        .projects-header,
        .projects-hero,
        .project-stats,
        .projects-section,
        .projects-footer {
          width: min(1840px, calc(100% - 24px));
          margin: 0 auto;
        }

        .projects-header {
          min-height: 88px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .projects-brand {
          width: 242px;
          height: 64px;
          display: flex;
          align-items: center;
        }

        .projects-brand img,
        .projects-footer img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .projects-header nav {
          display: flex;
          align-items: center;
          gap: 34px;
          color: #ddd5c7;
          font-size: 19px;
          font-weight: 700;
        }

        .projects-top-cta,
        .primary-button,
        .secondary-button {
          min-height: 50px;
          padding: 0 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 7px;
          font-size: 17px;
          font-weight: 900;
        }

        .projects-top-cta,
        .primary-button {
          color: #111;
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          border: 1px solid rgba(241, 199, 107, 0.55);
          box-shadow: 0 12px 32px rgba(201, 161, 93, 0.22);
        }

        .secondary-button {
          color: #f7f1e6;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
        }

        .projects-hero {
          min-height: 690px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.22);
          background: #111;
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.42);
        }

        .projects-hero-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
        }

        .projects-hero-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .projects-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.7) 38%, rgba(0, 0, 0, 0.18) 100%);
          pointer-events: none;
        }

        .projects-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 16% 26%, rgba(241, 199, 107, 0.2), transparent 24%),
            linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.74));
          pointer-events: none;
        }

        .projects-hero-copy {
          position: relative;
          z-index: 1;
          max-width: 920px;
          padding: 76px clamp(28px, 5vw, 86px);
        }

        .projects-hero-copy span,
        .section-heading-wide span,
        .featured-copy > span,
        .buyer-copy > span,
        .project-form-preview > span {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 13px;
          font-weight: 900;
        }

        .projects-hero h1 {
          max-width: 860px;
          margin: 16px 0 22px;
          color: #fff8ec;
          font-size: clamp(62px, 6vw, 108px);
          line-height: 0.96;
          letter-spacing: 0;
          text-shadow: 0 18px 48px rgba(0, 0, 0, 0.72);
        }

        .projects-hero p {
          max-width: 760px;
          margin: 0;
          color: rgba(247, 241, 230, 0.84);
          font-size: 22px;
          line-height: 1.56;
        }

        .hero-actions,
        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .hero-tags {
          margin-top: 22px;
        }

        .hero-tags span {
          min-height: 38px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(0, 0, 0, 0.36);
          color: #eadfce;
          font-size: 14px;
          font-weight: 800;
          text-transform: none;
          letter-spacing: 0;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          padding: 0 18px;
        }

        .project-stats article {
          min-height: 126px;
          padding: 24px;
          display: grid;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
        }

        .project-stats svg {
          color: #f1c76b;
        }

        .project-stats strong {
          color: #fff8ec;
          font-size: 20px;
        }

        .project-stats span {
          color: #c7bdac;
          font-size: 15px;
          line-height: 1.45;
        }

        .projects-section {
          padding: 72px 18px 0;
        }

        .section-heading-wide {
          margin-bottom: 26px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 42px;
        }

        .section-heading-wide h2,
        .buyer-copy h2,
        .project-form-preview h2 {
          margin: 14px 0 0;
          color: #fff8ec;
          font-size: clamp(38px, 3.6vw, 58px);
          line-height: 1.04;
          letter-spacing: 0;
        }

        .section-heading-wide p,
        .buyer-copy p,
        .project-form-preview p {
          max-width: 570px;
          margin: 0;
          color: #c7bdac;
          font-size: 18px;
          line-height: 1.62;
        }

        .project-type-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .project-type-list span {
          min-height: 44px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          color: #eadfce;
          font-size: 15px;
          font-weight: 900;
        }

        .project-type-list span:first-child {
          color: #111;
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          border-color: rgba(241, 199, 107, 0.55);
        }

        .featured-project {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 22px;
          margin-bottom: 24px;
        }

        .featured-image,
        .case-card {
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #151515;
        }

        .featured-image {
          display: block;
          min-height: 640px;
        }

        .featured-image img {
          width: 100%;
          height: 640px;
          display: block;
          object-fit: cover;
          transition: transform 280ms ease, filter 280ms ease;
        }

        .featured-image:hover img,
        .case-card > a:hover img {
          filter: brightness(1.08);
          transform: scale(1.03);
        }

        .featured-copy {
          padding: 36px;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.24);
          background:
            linear-gradient(135deg, rgba(241, 199, 107, 0.12), transparent 42%),
            rgba(255, 255, 255, 0.045);
        }

        .featured-copy h2 {
          margin: 14px 0 18px;
          font-size: clamp(38px, 3vw, 52px);
          line-height: 1.04;
        }

        .featured-copy p {
          margin: 0;
          color: #c7bdac;
          font-size: 18px;
          line-height: 1.62;
        }

        .featured-specs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 24px 0 28px;
        }

        .featured-specs div {
          min-height: 88px;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.26);
        }

        .featured-specs strong {
          display: block;
          color: #fff8ec;
          font-size: 15px;
        }

        .featured-specs small {
          display: block;
          margin-top: 8px;
          color: #c7bdac;
          font-size: 14px;
          line-height: 1.45;
        }

        .case-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .case-card {
          display: flex;
          flex-direction: column;
        }

        .case-card > a {
          display: block;
          overflow: hidden;
          background: #111;
        }

        .case-card img {
          width: 100%;
          height: 250px;
          display: block;
          object-fit: cover;
          transition: transform 280ms ease, filter 280ms ease;
        }

        .case-card div {
          min-height: 278px;
          padding: 22px;
          display: flex;
          flex-direction: column;
        }

        .case-card span {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 11px;
          font-weight: 900;
        }

        .case-card h3 {
          margin: 12px 0 10px;
          color: #fff8ec;
          font-size: 24px;
          line-height: 1.12;
        }

        .case-card p {
          margin: 0;
          color: #c7bdac;
          font-size: 16px;
          line-height: 1.54;
        }

        .case-card small {
          display: block;
          margin-top: 16px;
          color: #e9dfd0;
          font-size: 13px;
          font-weight: 800;
        }

        .case-card div > a {
          margin-top: auto;
          padding-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #f1c76b;
          font-size: 15px;
          font-weight: 900;
        }

        .buyer-section {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 22px;
          align-items: stretch;
        }

        .buyer-copy,
        .buyer-table,
        .project-form-preview,
        .faq-list article {
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
        }

        .buyer-copy {
          padding: 34px;
        }

        .buyer-copy p,
        .project-form-preview p {
          margin-top: 18px;
        }

        .buyer-copy .secondary-button {
          margin-top: 26px;
        }

        .buyer-table {
          overflow: hidden;
        }

        .buyer-row {
          display: grid;
          grid-template-columns: 0.64fr 1fr 0.42fr;
          min-height: 106px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .buyer-row:last-child {
          border-bottom: 0;
        }

        .buyer-row strong,
        .buyer-row p,
        .buyer-row a {
          padding: 22px;
          display: flex;
          align-items: center;
          border-right: 1px solid rgba(255, 255, 255, 0.12);
        }

        .buyer-row a {
          border-right: 0;
        }

        .buyer-row strong {
          color: #f1c76b;
          font-size: 18px;
        }

        .buyer-row p {
          margin: 0;
          color: #c7bdac;
          font-size: 16px;
          line-height: 1.48;
        }

        .buyer-row a {
          color: #fff8ec;
          font-size: 15px;
          font-weight: 900;
        }

        .conversion-section {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 22px;
          padding-bottom: 54px;
        }

        .faq-list {
          display: grid;
          gap: 12px;
        }

        .faq-list article {
          padding: 24px;
        }

        .faq-list h3 {
          margin: 0;
          color: #fff8ec;
          font-size: 22px;
        }

        .faq-list p {
          margin: 10px 0 0;
          color: #c7bdac;
          font-size: 16px;
          line-height: 1.55;
        }

        .project-form-preview {
          padding: 42px;
          background:
            linear-gradient(135deg, rgba(241, 199, 107, 0.14), transparent 45%),
            #161616;
        }

        .preview-fields {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 24px;
        }

        .preview-fields div {
          min-height: 52px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.26);
          color: rgba(247, 241, 230, 0.62);
          font-size: 15px;
        }

        .preview-fields .full {
          grid-column: 1 / -1;
          min-height: 92px;
          align-items: flex-start;
          padding-top: 16px;
        }

        .project-form-preview .primary-button {
          width: 100%;
          margin-top: 18px;
        }

        .projects-footer {
          padding: 22px 18px 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: grid;
          grid-template-columns: 220px 1fr auto;
          align-items: center;
          gap: 28px;
        }

        .projects-footer img {
          width: 214px;
          height: 76px;
        }

        .projects-footer div {
          display: grid;
          gap: 6px;
        }

        .projects-footer strong {
          font-size: 16px;
        }

        .projects-footer span,
        .projects-footer a {
          color: #b8b0a2;
          font-size: 14px;
        }

        .projects-footer div:last-child {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }

        @media (max-width: 1180px) {
          .case-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .featured-project,
          .buyer-section,
          .conversion-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .projects-header,
          .projects-hero,
          .project-stats,
          .projects-section,
          .projects-footer {
            width: min(100% - 32px, 100%);
          }

          .projects-header nav,
          .projects-top-cta {
            display: none;
          }

          .projects-hero {
            min-height: 620px;
          }

          .projects-hero-copy {
            padding: 48px 24px;
          }

          .projects-hero h1 {
            font-size: 48px;
          }

          .projects-hero p {
            font-size: 18px;
          }

          .project-stats,
          .case-grid,
          .featured-specs,
          .preview-fields,
          .projects-footer {
            grid-template-columns: 1fr;
          }

          .section-heading-wide {
            align-items: flex-start;
            flex-direction: column;
          }

          .featured-image,
          .featured-image img {
            min-height: 360px;
            height: 360px;
          }

          .case-card img {
            height: 280px;
          }

          .buyer-row {
            grid-template-columns: 1fr;
          }

          .buyer-row strong,
          .buyer-row p,
          .buyer-row a {
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }

          .buyer-row a {
            border-bottom: 0;
          }
        }
      `}</style>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
