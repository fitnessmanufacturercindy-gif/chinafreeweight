import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Factory, PackageCheck, ShieldCheck } from "lucide-react";
import { siteName, siteUrl } from "../../../site";

const pagePath = "/manufacturer/weight-plate-manufacturer";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  title: "Weight Plate Manufacturer | PowerBaseFit",
  description:
    "PowerBaseFit manufactures and supplies weight plates for importers, distributors, gyms, and OEM brands with QC, packaging, and export support.",
  alternates: {
    canonical: pagePath
  }
};

const evaluationRows = [
  {
    factor: "Weight tolerance",
    why: "Helps gyms, retailers, and distributors deliver predictable plate sets.",
    check: "Ask how tolerance is checked across different weights in the order."
  },
  {
    factor: "Material and coating",
    why: "Influences durability, appearance, odor control, and customer acceptance.",
    check: "Review material choice, coating expectations, surface finish, and sample appearance."
  },
  {
    factor: "Center hole fit",
    why: "Affects compatibility, handling, and user experience.",
    check: "Confirm center hole sizing expectations and fit checks before bulk production."
  },
  {
    factor: "OEM ability",
    why: "Determines whether logo, color, label, and packaging details can be confirmed clearly.",
    check: "Prepare logo files, color notes, carton label requirements, and packaging references."
  },
  {
    factor: "Packaging method",
    why: "Protects heavy products during handling, storage, and international transport.",
    check: "Check carton strength, inner protection, pallet plan, and label accuracy."
  },
  {
    factor: "Communication",
    why: "Reduces mistakes before production and supports faster issue handling.",
    check: "Confirm who checks specifications, artwork, packaging, inspection photos, and shipment updates."
  }
];

const checklist = [
  "Confirm target plate type and weight range.",
  "Check material, coating, center hole fit, and surface finish expectations.",
  "Ask how weight tolerance and appearance are inspected.",
  "Confirm logo, color, packaging, and carton label requirements.",
  "Request product detail, QC, and packaging photos before shipment when needed.",
  "Clarify order quantity, lead time, destination, and shipping preparation.",
  "Confirm after-sales communication process for quality or packaging issues."
];

const faqs = [
  {
    question: "How should buyers evaluate a weight plate supplier?",
    answer:
      "Buyers should review plate material, weight tolerance, center hole fit, surface finish, odor control for rubber-coated options, packaging strength, inspection process, and the supplier's ability to discuss OEM or private label requirements clearly before ordering."
  },
  {
    question: "What MOQ information should buyers prepare before asking for a quote?",
    answer:
      "Buyers should prepare the target plate type, weight range, estimated quantity, logo or packaging needs, destination market, and expected delivery schedule. MOQ discussion is more useful when the supplier can see the full weight mix and customization level."
  },
  {
    question: "What should importers check before bulk ordering weight plates?",
    answer:
      "Importers should confirm weight tolerance, surface finish, center hole sizing, carton strength, labeling requirements, inspection process, shipment preparation, and whether pre-shipment photos or inspection records are needed for internal approval."
  },
  {
    question: "Can PowerBaseFit support OEM or private label weight plate orders?",
    answer:
      "PowerBaseFit can discuss OEM and private label requirements such as logo marking, color preferences, packaging style, carton labeling, and market-specific product details. Final options should be confirmed during quotation based on the order specification."
  },
  {
    question: "How are weight plates usually checked before shipment?",
    answer:
      "Common checks include weight tolerance, center hole fit, surface appearance, coating finish, odor observation for rubber options, carton condition, labeling, and packing stability. Buyers can also confirm what inspection records or photos are needed before shipment."
  },
  {
    question: "What information helps prepare an accurate quotation?",
    answer:
      "A clear quote request should include plate type, target weights, order quantity, logo needs, packaging requirements, destination market, expected delivery schedule, and any inspection or documentation requirements."
  },
  {
    question: "How should buyers discuss lead time with a manufacturer?",
    answer:
      "Buyers should ask how lead time is affected by quantity, plate type, product mix, logo work, packaging confirmation, inspection timing, and shipment preparation. A clear timeline should separate sample confirmation, production, packing, and dispatch preparation."
  },
  {
    question: "Why does packaging matter for weight plate buyers?",
    answer:
      "Packaging affects coating protection, carton durability, loading efficiency, and the buyer's receiving experience. For wholesale orders, packaging should protect heavy plates during handling, storage, and international transportation."
  }
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Manufacturer", item: `${siteUrl}/manufacturer` },
    { "@type": "ListItem", position: 3, name: "Weight Plate Manufacturer", item: pageUrl }
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Weight Plate Manufacturer",
  url: pageUrl,
  description: metadata.description,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl
  },
  about: ["Weight plates", "Bumper plates", "Olympic plates", "OEM weight plates"],
  publisher: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl
  }
};

export default function WeightPlateManufacturerPage() {
  return (
    <main className="product-page manufacturer-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <section className="dumbbell-hero">
        <div className="dumbbell-hero-copy">
          <span>Free Weight Manufacturer</span>
          <h1>Weight Plate Manufacturer</h1>
          <p>
            PowerBaseFit is a free weight manufacturer serving importers, distributors, gym equipment brands,
            commercial gym buyers, and OEM partners that need reliable weight plates supply.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Send Plate Requirements <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/products/weight-plates">
              View Weight Plates
            </a>
          </div>
        </div>
        <div className="dumbbell-hero-gallery" aria-label="Weight plate manufacturer product preview">
          <img src="/assets/products/weight-plates/catalog/rubber-weight-plate.webp" alt="Rubber coated weight plate detail for B2B sourcing" />
          <img src="/assets/products/weight-plates/catalog/spray-weight-plate.webp" alt="Weight plate surface finish and weight marking" />
          <img src="/assets/weight-plate.avif" alt="Olympic weight plates for commercial gym supply" />
        </div>
      </section>

      <section className="product-trust-strip" aria-label="Weight plate manufacturer capabilities">
        <article>
          <Factory size={24} />
          <strong>Manufacturer Support</strong>
          <span>Weight plates, bumper plates, Olympic plates, cast iron plates, and rubber coated plate sourcing.</span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <strong>Quality Control Focus</strong>
          <span>Weight tolerance, center hole fit, coating finish, label accuracy, and packing checks.</span>
        </article>
        <article>
          <PackageCheck size={24} />
          <strong>OEM & Export Packing</strong>
          <span>Logo, color, carton label, packaging method, pallet protection, and shipment preparation.</span>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Weight Plates Overview</span>
          <h2>Commercial weight plates for distributors, gyms, and OEM brands</h2>
          <p>
            Weight plates are core strength training products used by commercial gyms, distributors, training
            facilities, retail fitness channels, and OEM brands. For B2B buyers, the main value is not only the
            plate shape or coating, but also stable weight tolerance, consistent finish, accurate center hole fit,
            durable packaging, and clear communication through sampling, production, inspection, and shipment
            preparation.
          </p>
        </article>
        <article>
          <span>Industry Experience</span>
          <h2>Bulk sourcing risks should be handled before production</h2>
          <p>
            In bulk free weight sourcing, many problems appear after production if product specification and
            packaging are not confirmed early enough. Common risks include inconsistent coating finish, unclear
            tolerance expectations, weak cartons for heavy plates, mixed weight labels, poor pallet preparation,
            or slow response when buyers request inspection details.
          </p>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Manufacturing Capability</span>
          <h2>Weight plate manufacturing discussions need clear specifications</h2>
          <p>
            PowerBaseFit supports free weight sourcing with a focus on weight plates, bumper plates, Olympic
            plates, cast iron plates, rubber coated plates, and related plate products. For weight plate projects,
            the manufacturing discussion usually covers plate type, weight range, material and coating
            requirements, plate diameter, center hole expectations, logo requirements, packaging method, and
            inspection points.
          </p>
        </article>
        <article>
          <span>Product Technical Depth</span>
          <h2>Plate quality depends on more than appearance</h2>
          <p>
            Cast iron plates, rubber coated plates, bumper plates, and Olympic plates have different material,
            impact, and finish expectations. Weight accuracy matters because gyms and distributors need
            predictable sets across different plate sizes. Plate diameter and center hole fit affect compatibility
            and user experience. Coating or surface treatment affects durability, odor control for rubber options,
            corrosion resistance for iron options, and first impression when products are unpacked.
          </p>
        </article>
      </section>

      <section className="products-section manufacturer-table-section">
        <div className="section-heading-wide">
          <div>
            <span>Buyer Evaluation Table</span>
            <h2>How B2B buyers can compare weight plate suppliers</h2>
          </div>
          <p>
            Use these factors before confirming bulk orders, OEM details, and export packaging requirements.
          </p>
        </div>
        <div className="manufacturer-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Factor</th>
                <th>Why It Matters</th>
                <th>What Buyers Should Check</th>
              </tr>
            </thead>
            <tbody>
              {evaluationRows.map((row) => (
                <tr key={row.factor}>
                  <td>{row.factor}</td>
                  <td>{row.why}</td>
                  <td>{row.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Production Process</span>
          <h2>From material preparation to export packing</h2>
          <p>
            A practical weight plates production workflow begins with material preparation, where the supplier
            confirms plate type, target weight range, coating or finish requirements, plate diameter, center hole
            expectations, and packaging plan for the order. Component processing then focuses on preparing the
            plate body and any insert, hub, raised lettering, or surface detail required by the specification.
            During forming, machining, or molding, the plate shape and fit are controlled according to the chosen
            product type.
          </p>
          <p>
            Finishing work focuses on edge condition, surface appearance, coating consistency, weight markings,
            and label or logo preparation. Inspection follows with weight accuracy checks, center hole review,
            surface inspection, coating observation, carton check, and packing confirmation before shipment
            preparation.
          </p>
        </article>
        <article>
          <span>Quality Control</span>
          <h2>Inspection should match the buyer's real receiving risks</h2>
          <p>
            Importers and distributors should pay close attention to weight tolerance, center hole fit, surface
            appearance, coating consistency, odor control for rubber options, carton strength, and labeling
            accuracy. Quality control can include product sampling, appearance inspection, weight verification,
            packaging checks, and pre-shipment photo confirmation.
          </p>
        </article>
      </section>

      <section className="products-section detail-seo-grid">
        <article>
          <span>Supplier Selection Guidance</span>
          <h2>Choose a supplier by consistency, packaging, and communication</h2>
          <p>
            A weight plates supplier should be evaluated on quality consistency, material and coating control,
            center hole fit, OEM ability, packaging control, export preparation, and communication. Buyers should
            look for a supplier that can discuss product details before production, confirm packaging and label
            requirements clearly, and provide practical inspection information before shipment.
          </p>
        </article>
        <article>
          <span>Manufacturer Trust</span>
          <h2>Trust should come from practical manufacturing communication</h2>
          <p>
            PowerBaseFit's trust value comes from clear manufacturing communication, practical free weight product
            knowledge, OEM discussion ability, quality control awareness, packaging planning, and export preparation
            support. This page does not rely on unsupported customer names, certification claims, production
            capacity numbers, or ranking statements.
          </p>
        </article>
      </section>

      <section className="products-section dumbbell-buying">
        <div className="buying-copy">
          <span>OEM / Private Label</span>
          <h2>OEM weight plate programs need clear logo and packaging details</h2>
          <p>
            PowerBaseFit can discuss OEM and private label needs for weight plates, including logo marking, color
            preferences, packaging style, carton labels, and market-specific presentation. Buyers can prepare logo
            files, target weight range, quantity, packaging expectations, and destination market requirements
            before requesting a quote.
          </p>
          <a className="primary-button" href="/contact">
            Request OEM Discussion <ArrowRight size={18} />
          </a>
        </div>
        <div className="capability-list">
          {checklist.map((item) => (
            <div key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section detail-faq">
        <div className="section-heading-wide">
          <div>
            <span>FAQ</span>
            <h2>Questions importers and distributors ask before ordering</h2>
          </div>
          <p>
            These answers focus on supplier selection, MOQ preparation, quality inspection, OEM details, packaging,
            and lead time planning for B2B weight plate orders.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-section detail-list-section">
        <div className="section-heading-wide">
          <div>
            <span>Internal Links</span>
            <h2>Continue reviewing PowerBaseFit weight plate sourcing pages</h2>
          </div>
          <p>
            Review product categories, factory capability, buyer resources, and contact options before sending a
            detailed request.
          </p>
        </div>
        <div className="detail-list-grid compact-link-grid">
          <a href="/products/weight-plates">Weight Plate Products</a>
          <a href="/resources/weight-plates-vs-bumper-plates-b2b-guide">Weight Plates vs Bumper Plates Guide</a>
          <a href="/factory">Factory Capability</a>
          <a href="/contact">Contact PowerBaseFit</a>
        </div>
      </section>

      <section className="product-final-cta">
        <span>Start a Weight Plate Sourcing Discussion</span>
        <h2>Send your plate type, weight range, quantity, and packaging needs</h2>
        <p>
          Share your target market, quantity, custom requirements, packaging requirements, and destination country.
          PowerBaseFit can review your weight plates sourcing plan and prepare the next quotation discussion based
          on your project requirements.
        </p>
        <a className="primary-button" href="/contact">
          Contact for Weight Plates Quote <ArrowRight size={18} />
        </a>
      </section>

      <style>{`
        .manufacturer-page .manufacturer-table-wrap {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid rgba(241, 199, 107, 0.2);
          background: rgba(255, 255, 255, 0.04);
        }

        .manufacturer-page table {
          width: 100%;
          min-width: 780px;
          border-collapse: collapse;
        }

        .manufacturer-page th,
        .manufacturer-page td {
          padding: 18px;
          text-align: left;
          vertical-align: top;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          color: #d5cbbb;
          font-size: 16px;
          line-height: 1.55;
        }

        .manufacturer-page th {
          color: #fff8ec;
          background: rgba(241, 199, 107, 0.12);
          font-weight: 900;
        }

        .manufacturer-page tr:last-child td {
          border-bottom: 0;
        }

        .manufacturer-page .compact-link-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .manufacturer-page .compact-link-grid a {
          min-height: 96px;
          padding: 22px;
          display: flex;
          align-items: center;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(255, 255, 255, 0.04);
          color: #f1c76b;
          font-weight: 900;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .manufacturer-page .compact-link-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
// The (en) route group preserves the existing public URL while allowing locale-specific root documents.
