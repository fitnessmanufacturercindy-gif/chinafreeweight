import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Factory,
  Globe2,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Upload
} from "lucide-react";
import { company, sourcingFacts } from "../../site";
import InquiryForm from "../../contact/InquiryForm";
import { getEnglishAlternates } from "../../../lib/seo/english-alternates";

export const metadata: Metadata = {
  title: "Contact Us | Free Weight Manufacturer & OEM Gym Equipment Supplier",
  description:
    "Contact a dumbbells manufacturer, weight plates supplier, and OEM gym equipment China factory for fast quotation, custom logo orders, and global shipping support.",
  alternates: getEnglishAlternates("/contact")
};

const whatsappMessage =
  "Hi, I’m interested in dumbbells and weight plates for my gym project.";
const whatsappHref = `https://wa.me/8618963018533?text=${encodeURIComponent(whatsappMessage)}`;

const faqs = [
  {
    q: "What is your MOQ?",
    a: sourcingFacts.moq
  },
  {
    q: "Can you support OEM customization?",
    a: "Yes. We support custom logos, color options, handle finishes, product details, packaging, and private label programs for dumbbells, plates, racks, and gym accessories."
  },
  {
    q: "What is the lead time?",
    a: sourcingFacts.leadTime
  },
  {
    q: "How are products packed for export?",
    a: sourcingFacts.packaging
  },
  {
    q: "How do you check quality before shipment?",
    a: sourcingFacts.quality
  },
  {
    q: "Can I order samples first?",
    a: "Sample availability depends on current stock and product type. Share the item, target quantity, and destination country, and our sales team will confirm the fastest sample option."
  }
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="hero-copy">
          <span>PowerBaseFit Manufacturing & Export Base</span>
          <h1>Get a Fast Quote for Your Gym Equipment Project</h1>
          <p>
            We respond within 12 hours for dumbbells, weight plates, and OEM
            orders.
          </p>
          <div className="hero-actions">
            <a href="#inquiry" className="primary-btn">
              Get Quote Now <ArrowRight size={20} />
            </a>
            <a href={whatsappHref} className="secondary-btn">
              <MessageCircle size={20} /> WhatsApp Chat Button
            </a>
          </div>
        </div>
        <div className="hero-card">
          <img src="/assets/project-dumbbell-zone.avif" alt="Commercial gym free weight area" width={1200} height={720} loading="eager" fetchPriority="high" decoding="async" />
          <div>
            <strong>12h response</strong>
            <span>For importers, distributors, gym projects and OEM brands</span>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Trust highlights">
        <div>
          <Clock3 size={24} />
          <span>Fast Response Within 12 Hours</span>
        </div>
        <div>
          <Factory size={24} />
          <span>Direct Factory Supply (No Middleman)</span>
        </div>
        <div>
          <PackageCheck size={24} />
          <span>OEM & Global Shipping Support</span>
        </div>
      </section>

      <section className="form-section" id="inquiry">
        <div className="form-intro">
          <span>High-Conversion Inquiry Form</span>
          <h2>Tell us what you need. We will prepare a clear quotation.</h2>
          <p>
            The more details you share, the faster we can estimate product
            options, logo customization, packaging, and shipping direction.
          </p>
          <div className="mini-proof">
            <CheckCircle2 size={18} /> Real factory support
            <CheckCircle2 size={18} /> OEM-ready quotation
            <CheckCircle2 size={18} /> B2B purchase structure
          </div>
          <div className="contact-direct">
            <strong>Kloe Du</strong>
            <a href="mailto:Kloe@powerbasefit.com">Kloe@powerbasefit.com</a>
            <a href="tel:+8618963018533">+86 18963018533</a>
            <a href={whatsappHref}>WhatsApp: +86 18963018533</a>
          </div>
        </div>

        <InquiryForm />
      </section>

      <section className="factory-section">
        <div className="section-heading">
          <span>Factory Information</span>
          <h2>Manufacturing & Export Base</h2>
          <p>
            A focused free weight supplier for B2B buyers who need clear
            communication, stable production, and export-ready product support.
          </p>
        </div>
        <div className="factory-grid">
          <article>
            <ShieldCheck size={26} />
            <h3>Company Overview</h3>
            <p>PowerBaseFit supports overseas gym equipment buyers with quotation, product selection, and OEM project communication.</p>
          </article>
          <article>
            <MapPin size={26} />
            <h3>Manufacturing Base</h3>
            <p>{company.address}</p>
          </article>
          <article>
            <Factory size={26} />
            <h3>Main Products</h3>
            <p>Free Weights: dumbbells, weight plates, bumper plates, racks, benches, and gym accessories.</p>
          </article>
          <article>
            <Globe2 size={26} />
            <h3>OEM Capability</h3>
            <p>Custom logo, handle finish, color, packaging, and full product-line support for dealers and OEM brands.</p>
          </article>
          <article>
            <PackageCheck size={26} />
            <h3>Global Export Markets</h3>
            <p>Supporting buyers in North America, Europe, South America, Australia, and other international markets.</p>
          </article>
        </div>
      </section>

      <section className="map-section">
        <div className="map-copy">
          <span>OpenStreetMap Location</span>
          <h2>Manufacturing & Export Base</h2>
          <p>{company.address}</p>
        </div>
        <div className="map-frame">
          <div className="map-fallback" aria-hidden="true">
            <div>
              <MapPin size={28} />
              <strong>Manufacturing & Export Base</strong>
              <span>{company.address}</span>
            </div>
          </div>
          <iframe
            title="Manufacturing & Export Base on OpenStreetMap"
            src="https://www.openstreetmap.org/export/embed.html?bbox=116.775%2C37.618%2C116.825%2C37.655&layer=mapnik&marker=37.631564%2C116.790819"
            loading="lazy"
          />
          <a
            href="https://www.openstreetmap.org/?mlat=37.631564&mlon=116.790819#map=15/37.631564/116.790819"
            target="_blank"
            rel="noreferrer"
          >
            View larger map on OpenStreetMap
          </a>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <span>FAQ</span>
          <h2>Common questions before requesting a quotation</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="boost-section">
        <div>
          <Upload size={34} />
          <span>Need a Quick Quote?</span>
          <h2>Upload product list or gym project details for fast quotation.</h2>
        </div>
        <a href="#inquiry">
          Send Requirements <ArrowRight size={20} />
        </a>
      </section>

      <style>{`
        .contact-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 8%, rgba(241, 199, 107, 0.16), transparent 28%),
            linear-gradient(180deg, #080808 0%, #111 48%, #070707 100%);
          color: #f7f1e6;
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        .contact-page a {
          color: inherit;
          text-decoration: none;
        }

        .contact-hero,
        .trust-bar,
        .form-section,
        .factory-section,
        .map-section,
        .faq-section,
        .boost-section {
          width: min(1840px, calc(100% - 32px));
          margin: 0 auto;
        }

        .contact-hero {
          min-height: 720px;
          padding: 78px 18px 54px;
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(520px, 1.12fr);
          gap: 56px;
          align-items: center;
        }

        .hero-copy span,
        .form-intro span,
        .section-heading span,
        .map-copy span,
        .boost-section span {
          color: #f1c76b;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 14px;
          font-weight: 900;
        }

        .hero-copy h1 {
          margin: 16px 0 22px;
          max-width: 820px;
          font-size: clamp(52px, 5.4vw, 94px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .hero-copy p {
          max-width: 720px;
          margin: 0;
          color: #c7beaf;
          font-size: 22px;
          line-height: 1.55;
        }

        .hero-actions {
          margin-top: 34px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn,
        .quote-form button,
        .boost-section a {
          min-height: 56px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 28px;
          font-size: 17px;
          font-weight: 900;
        }

        .primary-btn,
        .quote-form button,
        .boost-section a {
          background: linear-gradient(135deg, #f1c76b, #a9792f);
          color: #101010;
          border: 1px solid rgba(241, 199, 107, 0.55);
          box-shadow: 0 18px 44px rgba(201, 161, 93, 0.24);
        }

        .secondary-btn {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: #fff8ec;
        }

        .hero-card {
          position: relative;
          min-height: 540px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.48);
        }

        .hero-card img {
          width: 100%;
          height: 540px;
          object-fit: cover;
          display: block;
        }

        .hero-card div {
          position: absolute;
          right: 24px;
          bottom: 24px;
          width: 330px;
          padding: 22px;
          border-radius: 8px;
          background: rgba(12, 12, 12, 0.78);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .hero-card strong {
          display: block;
          color: #f1c76b;
          font-size: 24px;
          margin-bottom: 8px;
        }

        .hero-card span {
          color: #e5dac9;
          font-size: 16px;
          line-height: 1.45;
        }

        .trust-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          padding: 0 18px 42px;
        }

        .trust-bar div {
          min-height: 96px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
          color: #fff8ec;
          font-size: 19px;
          font-weight: 900;
        }

        .trust-bar svg,
        .factory-grid svg,
        .boost-section svg {
          color: #f1c76b;
          flex: 0 0 auto;
        }

        .form-section {
          padding: 68px 18px;
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(620px, 1.22fr);
          gap: 42px;
          align-items: start;
        }

        .form-intro {
          position: sticky;
          top: 24px;
          padding: 34px;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.22);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025)),
            url("/assets/resource-cnc-machining.avif") center / cover;
          overflow: hidden;
        }

        .form-intro::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.66);
        }

        .form-intro > * {
          position: relative;
          z-index: 1;
        }

        .form-intro h2,
        .section-heading h2,
        .map-copy h2,
        .boost-section h2 {
          margin: 12px 0 18px;
          font-size: clamp(38px, 3vw, 56px);
          line-height: 1.04;
        }

        .form-intro p,
        .section-heading p,
        .map-copy p {
          color: #c7beaf;
          font-size: 18px;
          line-height: 1.62;
        }

        .mini-proof {
          margin-top: 28px;
          display: grid;
          gap: 14px;
          color: #fff8ec;
          font-weight: 800;
        }

        .mini-proof svg {
          color: #f1c76b;
          margin-right: 8px;
          vertical-align: middle;
        }

        .contact-direct {
          position: relative;
          z-index: 1;
          margin-top: 26px;
          display: grid;
          gap: 10px;
          padding: 18px;
          border-radius: 8px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background: rgba(0, 0, 0, 0.42);
        }

        .contact-direct strong {
          color: #fff8ec;
          font-size: 20px;
        }

        .contact-direct a {
          color: #f1c76b;
          font-size: 16px;
          font-weight: 800;
          word-break: break-word;
        }

        .quote-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          padding: 28px;
          border-radius: 10px;
          border: 1px solid rgba(241, 199, 107, 0.34);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.035));
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
        }

        .quote-form label {
          display: grid;
          gap: 9px;
          color: #fff8ec;
          font-size: 15px;
          font-weight: 900;
        }

        .required-mark {
          color: #f1c76b;
          margin-left: 3px;
        }

        .quote-form .full,
        .quote-form button {
          grid-column: 1 / -1;
        }

        .quote-form input,
        .quote-form select,
        .quote-form textarea {
          width: 100%;
          min-height: 54px;
          padding: 0 16px;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.32);
          color: #f7f1e6;
          outline: none;
          font-size: 16px;
        }

        .quote-form input[aria-invalid="true"] {
          border-color: rgba(255, 92, 92, 0.85);
          box-shadow: 0 0 0 3px rgba(255, 92, 92, 0.12);
        }

        .quote-form textarea {
          min-height: 128px;
          padding-top: 14px;
          resize: vertical;
        }

        .field-error {
          color: #ffb1a8;
          font-size: 13px;
          line-height: 1.35;
        }

        .quote-form button:disabled {
          cursor: wait;
          opacity: 0.72;
        }

        .form-status {
          grid-column: 1 / -1;
          min-height: 46px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          border-radius: 7px;
          font-size: 15px;
          font-weight: 900;
        }

        .form-status.success {
          color: #0b1a0f;
          background: #9ef0b2;
        }

        .form-status.error {
          color: #210909;
          background: #ffb1a8;
        }

        .form-status.submitting {
          color: #101010;
          background: #f1c76b;
        }

        .spam-field {
          display: none !important;
        }

        .factory-section,
        .map-section,
        .faq-section,
        .boost-section {
          padding: 68px 18px;
        }

        .section-heading {
          max-width: 920px;
          margin-bottom: 30px;
        }

        .factory-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .factory-grid article,
        .faq-grid article {
          padding: 24px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
        }

        .factory-grid h3,
        .faq-grid h3 {
          margin: 18px 0 10px;
          font-size: 22px;
        }

        .factory-grid p,
        .faq-grid p {
          margin: 0;
          color: #c7beaf;
          font-size: 16px;
          line-height: 1.56;
        }

        .map-section {
          display: grid;
          grid-template-columns: 0.48fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        .map-copy {
          padding: 32px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(241, 199, 107, 0.2);
        }

        .map-frame {
          min-height: 440px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          position: relative;
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.38);
        }

        .map-fallback {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background:
            linear-gradient(rgba(241, 199, 107, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(241, 199, 107, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 48% 42%, rgba(241, 199, 107, 0.22), transparent 16%),
            linear-gradient(135deg, #101010, #191510);
          background-size: 44px 44px, 44px 44px, auto, auto;
        }

        .map-fallback div {
          display: grid;
          justify-items: center;
          gap: 9px;
          padding: 22px 28px;
          border-radius: 8px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background: rgba(0, 0, 0, 0.58);
          text-align: center;
        }

        .map-fallback strong {
          font-size: 19px;
          color: #fff8ec;
        }

        .map-fallback span {
          color: #f1c76b;
          font-size: 15px;
          font-weight: 900;
        }

        .map-frame iframe {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 440px;
          border: 0;
          filter: saturate(0.72) contrast(1.05);
        }

        .map-frame a {
          position: absolute;
          left: 18px;
          bottom: 18px;
          z-index: 2;
          padding: 10px 14px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.72);
          color: #fff8ec;
          font-size: 14px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .boost-section {
          margin-bottom: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          border-radius: 12px;
          border: 1px solid rgba(241, 199, 107, 0.28);
          background:
            linear-gradient(135deg, rgba(241, 199, 107, 0.15), rgba(255, 255, 255, 0.035)),
            #141414;
        }

        .boost-section h2 {
          max-width: 900px;
          margin-bottom: 0;
        }

        @media (max-width: 1100px) {
          .contact-hero,
          .form-section,
          .map-section {
            grid-template-columns: 1fr;
          }

          .hero-card,
          .hero-card img {
            min-height: 420px;
            height: 420px;
          }

          .trust-bar,
          .factory-grid {
            grid-template-columns: 1fr;
          }

          .form-intro {
            position: relative;
            top: auto;
          }
        }

        @media (max-width: 760px) {
          .contact-hero,
          .trust-bar,
          .form-section,
          .factory-section,
          .map-section,
          .faq-section,
          .boost-section {
            width: min(100% - 28px, 100%);
          }

          .contact-hero {
            padding-top: 42px;
          }

          .quote-form,
          .faq-grid {
            grid-template-columns: 1fr;
          }

          .boost-section {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
