import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Factory,
  Globe2,
  PackageCheck,
  Truck,
  Wrench
} from "lucide-react";
import { sourcingFacts } from "../../site";
import { getEnglishAlternates } from "../../../lib/seo/english-alternates";

export const metadata: Metadata = {
  title:
    "Free Weight Manufacturer China | Dumbbell & Weight Plates Factory OEM Supplier",
  description:
    "Dumbbell manufacturer, weight plates supplier, OEM gym equipment factory in China. Custom gym equipment for global distributors and fitness brands.",
  alternates: getEnglishAlternates("/factory")
};

const trustStats = [
  {
    label: "Manufacturing Experience",
    value: "Since 2008",
    copy: "Long-term manufacturing experience for dumbbells, weight plates, bumper plates, and free weight training products."
  },
  {
    label: "Factory Overview",
    value: "8,000 m2",
    copy: "A practical production base with workshop teams, production line coordination, packaging support, and export communication."
  },
  {
    label: "Main Categories",
    value: "Free Weights",
    copy: "Dumbbells, hex dumbbells, rubber dumbbells, weight plates, bumper plates, racks, benches, and gym accessories."
  },
  {
    label: "Quality System",
    value: "Batch QC",
    copy: "Weight accuracy checks, finish inspection, durability testing, packaging checks, and shipment preparation."
  }
];

const heroSlides = [
  {
    image: "/assets/factory.avif",
    label: "Factory Base",
    alt: "PowerBaseFit factory exterior in China"
  },
  {
    image: "/assets/factory-process/dumbbell-cutting.webp",
    label: "Workshop Production",
    alt: "Free weight workshop production and machining"
  },
  {
    image: "/assets/factory-cases/container-shipping-pbf.avif",
    label: "Container Shipping",
    alt: "Container shipping for gym equipment export orders"
  }
];

const exhibitionSlides = [
  "/assets/exhibitions/pbf-exhibition-01.avif",
  "/assets/exhibitions/pbf-exhibition-02.avif",
  "/assets/exhibitions/pbf-exhibition-03.avif",
  "/assets/exhibitions/pbf-exhibition-04.avif",
  "/assets/exhibitions/pbf-exhibition-05.avif",
  "/assets/exhibitions/pbf-exhibition-06.avif",
  "/assets/exhibitions/pbf-exhibition-07.avif",
  "/assets/exhibitions/pbf-exhibition-08.avif",
  "/assets/exhibitions/pbf-exhibition-team.avif"
];

const markets = [
  {
    title: "Europe Market Supply",
    copy: "A global gym equipment supplier for distributors that need stable free weight supply, OEM support, and product documentation."
  },
  {
    title: "USA Gym Equipment Projects",
    copy: "Supporting USA gym equipment projects with dumbbells, weight plates, bumper plates, and private label free weight sets."
  },
  {
    title: "Middle East Fitness Distributors",
    copy: "Export fitness equipment manufacturer support for fitness distributors building commercial gyms, showrooms, and branded product lines."
  },
  {
    title: "South America Gym Installations",
    copy: "Free weight supply for South America gym installations, dealer programs, and mixed container purchasing plans."
  }
];

const oemItems = [
  "OEM dumbbell manufacturer support for logo, color, finish, and packaging",
  "Private label weight plates for distributors and fitness brands",
  "Custom logo gym equipment for commercial projects and retail programs",
  "Brand building support for distributors with product selection and catalog planning"
];

const faqs = [
  {
    q: "What is your MOQ?",
    a: sourcingFacts.moq
  },
  {
    q: "Do you support OEM customization?",
    a: "Yes. We support OEM customization for dumbbells, weight plates, bumper plates, packaging, colors, logo placement, and private label product programs."
  },
  {
    q: "What is your production lead time?",
    a: sourcingFacts.leadTime
  },
  {
    q: "How do you pack products for export?",
    a: sourcingFacts.packaging
  },
  {
    q: "How do you control product quality?",
    a: sourcingFacts.quality
  },
  {
    q: "Can I request samples?",
    a: "Sample availability depends on stock and product type. Share your product category, destination country, and customization needs so the team can confirm sample options."
  },
  {
    q: "Do you ship globally?",
    a: "Yes. We support global shipment planning for distributors, gym equipment importers, commercial gym projects, and OEM fitness brands."
  }
];

const workshopImages = [
  {
    title: "Raw Material Area",
    image: "/assets/factory-process/dumbbell-material.webp",
    copy: "Real factory footage frame showing dumbbell material preparation before machining and production."
  },
  {
    title: "Precision Cutting Line",
    image: "/assets/factory-process/dumbbell-cutting.webp",
    copy: "Workshop process image from dumbbell cutting and precision manufacturing equipment."
  },
  {
    title: "Surface Treatment",
    image: "/assets/factory-process/plate-surface-treatment.webp",
    copy: "Weight plate surface treatment and finishing workflow before quality inspection."
  },
  {
    title: "Detail Polishing",
    image: "/assets/factory-process/detail-polishing-video.webp",
    copy: "Close-up detail polishing for weight plates, edges, and product finish consistency."
  },
  {
    title: "Export Packaging",
    image: "/assets/factory-cases/packaging-area-pbf.avif",
    copy: "Protected packing, cartons, pallets, and export preparation for free weight orders."
  },
  {
    title: "Container Shipping",
    image: "/assets/factory-cases/container-shipping-pbf.avif",
    copy: "Container loading and shipment preparation for global gym equipment buyers."
  }
];

export default function FactoryPage() {
  return (
    <main className="factory-page">
      <section className="factory-hero">
        <div className="hero-carousel" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              className={`hero-slide hero-slide-${index + 1}`}
              src={slide.image}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          ))}
        </div>
        <div className="hero-mask" aria-hidden="true" />
        <div className="factory-hero-copy">
          <span>Free Weight Manufacturer</span>
          <h1>Professional Free Weight Manufacturer in China</h1>
          <p>
            Dumbbells, Weight Plates & Bumper Plates Factory with OEM & Private
            Label Solutions. PowerBaseFit is a dumbbell manufacturer, weight
            plates factory, and gym equipment supplier China for distributors,
            gym projects, and fitness brands.
          </p>
          <div className="factory-actions">
            <a href="/contact">
              Get Factory Price <ArrowRight size={20} />
            </a>
            <a href="/contact" className="secondary">
              Request OEM Catalog
            </a>
          </div>
          <div className="hero-slide-labels">
            {heroSlides.map((slide) => (
              <div key={slide.label}>
                <Factory size={18} />
                <span>{slide.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="semantic-section trust-section">
        <div className="section-heading">
          <span>Factory Trust</span>
          <h2>Factory capability for global free weight buyers</h2>
          <p>
            PowerBaseFit operates as a gym equipment manufacturer, commercial
            fitness equipment factory, and free weight supplier for importers,
            wholesalers, fitness distributors, and commercial gym projects.
          </p>
        </div>
        <div className="trust-grid">
          {trustStats.map((item) => (
            <article key={item.label}>
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="semantic-section exhibition-section">
        <div className="section-heading">
          <span>Trade Show Presence</span>
          <h2>Meet PowerBaseFit at major fitness equipment exhibitions</h2>
          <p>
            We meet buyers at industry exhibitions to show product details,
            compare finishes, explain OEM options, and discuss real gym project
            requirements face to face.
          </p>
        </div>
        <div className="exhibition-carousel" aria-label="PowerBaseFit exhibition photos">
          <div className="exhibition-track">
            {[...exhibitionSlides, ...exhibitionSlides].map((image, index) => (
              <figure key={`${image}-${index}`}>
                <img src={image} alt="PowerBaseFit exhibition booth and overseas buyers reviewing free weight products" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="semantic-section market-section">
        <div className="section-heading">
          <span>Global Markets</span>
          <h2>Global gym equipment supplier for regional growth markets</h2>
          <p>
            As an export fitness equipment manufacturer, PowerBaseFit supports
            market-specific product planning, mixed container orders, OEM
            branding, and commercial gym free weight supply.
          </p>
        </div>
        <div className="market-grid">
          {markets.map((market) => (
            <article key={market.title}>
              <Globe2 size={26} />
              <h3>{market.title}</h3>
              <p>{market.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="semantic-section oem-section">
        <div className="oem-copy">
          <span>OEM & Private Label</span>
          <h2>OEM dumbbell manufacturer and private label weight plates partner</h2>
          <p>
            We help distributors build recognizable product lines through custom
            logo gym equipment, packaging support, product range planning, and
            practical brand building support for distributors.
          </p>
          <div className="oem-list">
            {oemItems.map((item) => (
              <div key={item}>
                <BadgeCheck size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="oem-image">
          <div className="image-shell">
            <img src="/assets/factory-cases/pbf-squat-rack-chrome-plates.avif" alt="Commercial gym squat racks with PBF chrome electroplated weight plates" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="semantic-section image-map-section">
        <div className="section-heading">
          <span>Factory Images & Location</span>
          <h2>Workshop, production line, packaging area, and China factory location</h2>
          <p>
            Visual factory information helps buyers evaluate manufacturing
            capability before requesting factory price, samples, or OEM catalog.
          </p>
        </div>
        <div className="image-grid">
          {workshopImages.map((item) => (
            <article key={item.title}>
              <div className="image-shell">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="semantic-section faq-section">
        <div className="section-heading">
          <span>FAQ</span>
          <h2>Questions buyers ask before choosing a free weight factory</h2>
          <p>
            Clear answers for importers, distributors, gym project owners, and
            private label brands before starting a factory quotation.
          </p>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <article key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="factory-cta">
        <div className="cta-copy">
          <span>Factory Direct Quotation</span>
          <h2>Ready to source dumbbells, weight plates, or bumper plates?</h2>
          <p>
            Send your product list, target quantity, logo requirements, and
            destination market. Our team will reply with factory price and OEM
            options.
          </p>
        </div>
        <div className="cta-buttons">
          <a href="/contact" className="cta-card primary">
            <Truck size={28} />
            <strong>Get Factory Price</strong>
            <span>Fast quote for bulk orders</span>
            <ArrowRight size={20} />
          </a>
          <a href="/contact" className="cta-card">
            <Wrench size={28} />
            <strong>Contact Our Engineer</strong>
            <span>Confirm specs and production details</span>
            <ArrowRight size={20} />
          </a>
          <a href="/contact" className="cta-card">
            <PackageCheck size={28} />
            <strong>Request OEM Catalog</strong>
            <span>Logo, packaging and product options</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <style>{`
        .factory-page {
          min-height: 100vh;
          overflow: hidden;
          color: #f7f1e6;
          background:
            radial-gradient(circle at 80% 8%, rgba(241, 199, 107, 0.18), transparent 28%),
            linear-gradient(180deg, #070707 0%, #12100d 42%, #070707 100%);
          font-family: Arial, Helvetica, sans-serif;
        }

        .factory-page a {
          color: inherit;
          text-decoration: none;
        }

        .factory-hero,
        .semantic-section,
        .factory-cta {
          width: min(1840px, calc(100% - 32px));
          margin: 0 auto;
          padding-left: 18px;
          padding-right: 18px;
        }

        .factory-hero {
          position: relative;
          width: 100%;
          min-height: 820px;
          padding-left: max(34px, calc((100vw - 1840px) / 2 + 34px));
          padding-right: max(34px, calc((100vw - 1840px) / 2 + 34px));
          padding-top: 72px;
          padding-bottom: 56px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-carousel,
        .hero-mask {
          position: absolute;
          inset: 0;
        }

        .hero-carousel {
          z-index: 0;
          background: #090909;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.04);
          animation: heroFade 18s infinite;
        }

        .hero-slide-1 {
          animation-delay: 0s;
        }

        .hero-slide-2 {
          animation-delay: 6s;
        }

        .hero-slide-3 {
          animation-delay: 12s;
        }

        .hero-mask {
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.84) 0%, rgba(0, 0, 0, 0.68) 36%, rgba(0, 0, 0, 0.28) 72%, rgba(0, 0, 0, 0.48) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.1) 48%, #070707 100%);
        }

        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: scale(1.04);
          }

          8%,
          30% {
            opacity: 1;
            transform: scale(1);
          }

          38%,
          100% {
            opacity: 0;
            transform: scale(1.025);
          }
        }

        .factory-hero-copy > span,
        .section-heading span,
        .oem-copy > span,
        .factory-cta span {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 14px;
          font-weight: 900;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        .factory-hero h1 {
          max-width: 980px;
          margin: 16px 0 22px;
          font-size: clamp(54px, 5.6vw, 98px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .factory-hero p,
        .section-heading p,
        .oem-copy p,
        .factory-cta p {
          color: #c9c0b1;
          font-size: 20px;
          line-height: 1.62;
        }

        .factory-hero-copy {
          position: relative;
          z-index: 2;
          max-width: 1040px;
          padding: 34px 0;
        }

        .factory-actions,
        .cta-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .factory-actions a,
        .factory-cta a {
          min-height: 58px;
          padding: 0 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 8px;
          border: 1px solid rgba(241, 199, 107, 0.58);
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          color: #101010;
          font-size: 17px;
          font-weight: 900;
          box-shadow: 0 16px 42px rgba(201, 161, 93, 0.24);
        }

        .factory-actions a.secondary,
        .factory-cta a.secondary {
          color: #fff8ec;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow: none;
        }

        .hero-slide-labels {
          margin-top: 32px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 220px));
          gap: 12px;
        }

        .hero-slide-labels div {
          min-height: 48px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 8px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background: rgba(0, 0, 0, 0.42);
          color: #fff8ec;
          font-size: 15px;
          font-weight: 900;
          backdrop-filter: blur(12px);
        }

        .hero-slide-labels svg,
        .market-grid svg,
        .oem-list svg,
        .factory-cta svg {
          color: #f1c76b;
        }

        .semantic-section {
          padding-top: 72px;
          padding-bottom: 72px;
        }

        .section-heading {
          max-width: 980px;
          margin-bottom: 32px;
        }

        .section-heading h2,
        .oem-copy h2,
        .factory-cta h2 {
          margin: 12px 0 18px;
          font-size: clamp(38px, 3.2vw, 58px);
          line-height: 1.04;
          letter-spacing: 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .trust-grid article,
        .market-grid article,
        .faq-grid article {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          border-radius: 10px;
          padding: 26px;
        }

        .trust-grid strong {
          color: #f1c76b;
          font-size: 34px;
          line-height: 1;
        }

        .trust-grid h3,
        .market-grid h3,
        .faq-grid h3,
        .image-grid h3 {
          margin: 18px 0 10px;
          color: #fff8ec;
          font-size: 24px;
          line-height: 1.16;
        }

        .trust-grid p,
        .market-grid p,
        .faq-grid p,
        .image-grid p,
        .image-grid p {
          color: #c9c0b1;
          font-size: 17px;
          line-height: 1.56;
        }

        .exhibition-carousel {
          position: relative;
          overflow: hidden;
          min-height: 620px;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.2);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
        }

        .exhibition-carousel::before,
        .exhibition-carousel::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 110px;
          z-index: 2;
          pointer-events: none;
        }

        .exhibition-carousel::before {
          left: 0;
          background: linear-gradient(90deg, #12100d, transparent);
        }

        .exhibition-carousel::after {
          right: 0;
          background: linear-gradient(270deg, #12100d, transparent);
        }

        .exhibition-track {
          width: max-content;
          height: 100%;
          display: flex;
          gap: 22px;
          padding: 24px;
          animation: exhibition-scroll 58s linear infinite;
        }

        .exhibition-carousel:hover .exhibition-track {
          animation-play-state: paused;
        }

        .exhibition-track figure {
          width: min(980px, 72vw);
          height: 572px;
          margin: 0;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #101010;
          flex: 0 0 auto;
        }

        .exhibition-track img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        @keyframes exhibition-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .image-grid article {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          border-radius: 10px;
        }

        .image-grid article {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          border-radius: 10px;
        }

        .image-shell {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #111;
        }

        .image-shell::before {
          content: "PowerBaseFit";
          position: absolute;
          left: 14px;
          top: 14px;
          z-index: 2;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(241, 199, 107, 0.32);
          background: rgba(0, 0, 0, 0.58);
          color: #f1c76b;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .image-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.16));
        }

        .image-grid div {
          padding: 20px;
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .oem-section {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(520px, 1.08fr);
          gap: 36px;
          align-items: center;
        }

        .oem-copy {
          padding: 34px;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background:
            linear-gradient(135deg, rgba(241, 199, 107, 0.12), rgba(255, 255, 255, 0.035)),
            rgba(255, 255, 255, 0.045);
        }

        .oem-list {
          display: grid;
          gap: 13px;
          margin-top: 26px;
        }

        .oem-list div {
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.24);
          color: #fff8ec;
          font-weight: 800;
        }

        .oem-image {
          min-height: 520px;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 26px 80px rgba(0, 0, 0, 0.44);
        }

        .oem-image .image-shell {
          height: 520px;
        }

        .oem-image img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          display: block;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 24px;
        }

        .image-grid .image-shell {
          height: 300px;
          padding: 0;
        }

        .image-grid img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .factory-cta {
          margin-bottom: 72px;
          padding: 46px;
          display: grid;
          grid-template-columns: minmax(420px, 0.92fr) minmax(640px, 1.08fr);
          gap: 32px;
          align-items: center;
          border-radius: 12px;
          border: 1px solid rgba(241, 199, 107, 0.3);
          background:
            radial-gradient(circle at 86% 12%, rgba(241, 199, 107, 0.2), transparent 28%),
            linear-gradient(135deg, rgba(241, 199, 107, 0.16), rgba(255, 255, 255, 0.035)),
            #151515;
          box-shadow: 0 26px 80px rgba(0, 0, 0, 0.34);
        }

        .cta-copy {
          max-width: 720px;
        }

        .factory-cta p {
          margin-bottom: 0;
        }

        .cta-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          justify-content: stretch;
          margin-top: 0;
        }

        .factory-cta a.cta-card {
          min-height: 184px;
          padding: 24px;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: column;
          text-align: left;
          background: rgba(0, 0, 0, 0.26);
          color: #fff8ec;
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow: none;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .factory-cta a.cta-card:hover {
          transform: translateY(-3px);
          border-color: rgba(241, 199, 107, 0.46);
          background: rgba(255, 255, 255, 0.07);
        }

        .factory-cta a.cta-card.primary {
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          color: #101010;
          border-color: rgba(241, 199, 107, 0.62);
          box-shadow: 0 18px 46px rgba(201, 161, 93, 0.22);
        }

        .cta-card strong {
          display: block;
          font-size: 20px;
          line-height: 1.15;
        }

        .cta-card span {
          color: inherit;
          opacity: 0.72;
          font-size: 15px;
          line-height: 1.4;
          letter-spacing: 0;
          text-transform: none;
        }

        .cta-card > svg:last-child {
          align-self: flex-end;
        }

        @media (max-width: 1180px) {
          .factory-hero,
          .oem-section,
          .factory-cta {
            grid-template-columns: 1fr;
          }

          .trust-grid,
          .market-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-buttons {
            justify-content: flex-start;
          }

          .factory-cta {
            padding: 34px;
          }

          .cta-buttons {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .factory-hero,
          .semantic-section,
          .factory-cta {
            width: min(100% - 28px, 100%);
            padding-left: 0;
            padding-right: 0;
          }

          .factory-hero {
            min-height: auto;
            padding: 42px 18px 40px;
          }

          .hero-slide {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .hero-slide:not(:first-child) {
            display: none;
          }

          .hero-mask {
            background:
              linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.74) 62%, rgba(0, 0, 0, 0.52) 100%),
              linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.08) 45%, #070707 100%);
          }

          .factory-hero-copy {
            padding: 0;
          }

          .factory-hero h1 {
            margin-top: 12px;
            margin-bottom: 18px;
            font-size: clamp(28px, 7.9vw, 32px);
            line-height: 1.08;
            overflow-wrap: anywhere;
          }

          .factory-hero p,
          .section-heading p,
          .oem-copy p,
          .factory-cta p {
            font-size: 15px;
            line-height: 1.5;
          }

          .oem-image,
          .oem-image img {
            min-height: 360px;
            height: 360px;
          }

          .hero-slide-labels {
            grid-template-columns: 1fr;
            margin-top: 22px;
          }

          .trust-grid,
          .market-grid,
          .image-grid,
          .faq-grid {
            grid-template-columns: 1fr;
          }

          .exhibition-carousel {
            min-height: 300px;
          }

          .exhibition-track figure {
            width: 330px;
            height: 238px;
          }

          .image-grid img {
            height: 300px;
            min-height: 300px;
          }

          .factory-actions a,
          .factory-cta a {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
