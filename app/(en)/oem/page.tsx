import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Box, Check, CircleDot, ClipboardCheck, Factory, Layers3, PackageCheck, Palette, PenTool, Scale, Ship, Stamp, Tags } from "lucide-react";
import FreeSampleCTA from "../../components/FreeSampleCTA";
import { getEnglishAlternates } from "../../../lib/seo/english-alternates";
import { siteUrl } from "../../site";
import OemInquiryForm from "./OemInquiryForm";
import styles from "./OemPage.module.css";

export const metadata: Metadata = {
  title: "OEM & Private Label Free Weight Equipment Manufacturer | PowerBaseFit",
  description: "Develop custom dumbbells, weight plates and gym accessories with product marking, colors, weight systems, packaging, samples and documented production control.",
  alternates: getEnglishAlternates("/oem"),
  openGraph: {
    title: "OEM & Private Label Free Weight Equipment",
    description: "A clear OEM process for custom dumbbells, weight plates, gym accessories and private label packaging.",
    url: `${siteUrl}/oem`,
    images: [{ url: `${siteUrl}/assets/oem/oem-hero-product-family.webp`, width: 1920, height: 1080 }]
  }
};

const capabilities = [
  { icon: Stamp, title: "Logo & Marking", buyer: "Send your logo file, marking position and preferred finish.", factory: "We confirm the suitable marking method, size, location and sample reference." },
  { icon: Palette, title: "Color & Finish", buyer: "Share the target color, material preference or physical reference.", factory: "We review available materials, finish consistency and approval method." },
  { icon: Scale, title: "KG / LB Marking", buyer: "Define the market, unit system and required weight progression.", factory: "We confirm the marking layout, product range and identification method." },
  { icon: Box, title: "Private Label Packaging", buyer: "Provide label, carton, shipping mark and retail presentation requirements.", factory: "We align protection, carton structure, artwork files and packing instructions." },
  { icon: Layers3, title: "Product Range Planning", buyer: "Share target users, price level, range width and buying channel.", factory: "We help organize compatible products, weight increments and packaging formats." },
  { icon: PenTool, title: "ODM Development", buyer: "Send a sketch, sample, target function or construction requirement.", factory: "Feasibility, tooling, MOQ, sample route and lead time are confirmed after project review." }
];

const categorySpecs = [
  { title: "Dumbbells", href: "/products/dumbbells", image: "/assets/products/dumbbells/chrome/chrome-dumbbell-custom-logo.webp", alt: "Chrome dumbbell with custom end marking", items: ["Head shape and material", "Handle diameter and knurl", "Logo position and method", "KG or LB weight system", "Color and surface finish", "Individual or set packaging"] },
  { title: "Weight Plates", href: "/products/weight-plates", image: "/assets/oem/custom-color-finish-lineup.webp", alt: "Custom color options for commercial weight plates", items: ["Plate type and material", "Bore and insert construction", "Color coding or brand color", "Raised, recessed or printed marking", "Weight progression", "Carton and pallet plan"] },
  { title: "Gym Accessories", href: "/products/gym-accessories", image: "/assets/products/gym-accessories/handles/cable-machine-attachments-large.webp", alt: "Commercial gym cable attachment product range", items: ["Product selection and set composition", "Grip material and finish", "Brand mark position", "Color matching", "Retail-ready set packaging", "Mixed order planning"] }
];

const process = [
  ["01", "Project Brief", "Share the market, product list, estimated quantity and branding needs."],
  ["02", "Feasibility Review", "We review construction, materials, marking, packaging and development requirements."],
  ["03", "Design Confirmation", "Product specifications, artwork placement and packing details are recorded for approval."],
  ["04", "Sample Approval", "The physical sample is checked against the confirmed project details before production."],
  ["05", "Production & QC", "Production follows the approved reference with in-process and final inspection records."],
  ["06", "Shipment Support", "Packing, shipment preparation and order documents are coordinated for dispatch."]
];

const brandingRows = [
  ["Raised Logo", "Strong molded visibility", "Integrated 3D surface", "Logo size, height and position"],
  ["Recessed Logo", "Clean molded branding", "Indented surface", "Depth, font and placement"],
  ["Laser Marking", "Steel handles and end caps", "Permanent etched mark", "Marking area and contrast"],
  ["Printed Marking", "Color and detailed graphics", "Printed surface system", "Color, placement and durability"],
  ["Custom End Cap", "Distinct dumbbell identity", "Fitted branded component", "Cap design, fit and fixing method"]
];

const factoryProof = [
  ["/assets/factory-process/dumbbell-material.webp", "Material Preparation", "Dumbbell material prepared for the next production stage."],
  ["/assets/factory-process/dumbbell-cutting.webp", "Machining", "Free-weight components processed to the confirmed product specification."],
  ["/assets/factory-process/detail-polishing-video.webp", "Surface Finishing", "Product details inspected during finishing and polishing."],
  ["/assets/factory-cases/packaging-area-pbf.webp", "Export Packaging", "Finished products organized for packing and shipment preparation."]
];

const examples = [
  ["Distributor Dumbbell Range", "A coordinated dumbbell range with selected weight progression, brand marking, rack planning and repeat-order references."],
  ["Commercial Gym Plate Set", "A plate family organized by material, color, bore construction, weight identification and pallet plan."],
  ["Private Label Accessory Line", "A selected accessory range with matched color, packaging, labeling and carton presentation."]
];

const faqs = [
  ["What information do you need to review my OEM project?", "Please share the product category, target market, estimated quantity, logo or artwork, customization needs, destination country and preferred timing. Reference photos or samples are helpful when available."],
  ["Can you develop a new product from a sample or drawing?", "Yes. We can review a physical sample, drawing or product brief. Feasibility, tooling, development cost, sample route, MOQ and lead time are confirmed after the project is evaluated."],
  ["Can I approve a sample before mass production?", "Yes. The sample can be checked for product construction, dimensions, weight, marking, color, finish and packaging before the production reference is confirmed."],
  ["Which private label options can be included?", "Options can include molded or recessed logos, laser marking, printed marks, custom end caps, brand colors, KG or LB markings, labels, cartons and shipping marks, subject to product review."],
  ["How do you maintain consistency for repeat orders?", "Approved specifications, artwork versions, sample references and packing instructions are retained so the next order can be checked against the confirmed product version."],
  ["How are final MOQ and lead time confirmed?", "They depend on the selected product, customization scope, material availability, tooling and order plan. We confirm practical project conditions after reviewing your requirements."]
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${siteUrl}/oem#service`, name: "OEM and Private Label Free Weight Equipment", serviceType: "Custom free weight equipment manufacturing", provider: { "@id": `${siteUrl}#organization` }, areaServed: "Worldwide", url: `${siteUrl}/oem`, description: metadata.description },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "OEM & Private Label", item: `${siteUrl}/oem` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ]
};

export default function OemPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero} aria-labelledby="oem-title">
        <div className={styles.heroCopy}>
          <h1 id="oem-title">OEM & Private Label Free Weight Equipment for Global Brands</h1>
          <p>Customize dumbbells, weight plates and gym accessories with your logo, colors, weight markings and retail-ready packaging.</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#oem-rfq" data-lead-type="oem-rfq" data-analytics-section="oem-hero">Start Your OEM Project <ArrowRight size={18} /></a>
            <FreeSampleCTA compact section="oem-page-hero" />
          </div>
          <p className={styles.reviewNote}>Product feasibility, tooling, MOQ, sample route and lead time are confirmed for each project before production.</p>
        </div>
        <div className={styles.heroMedia}><Image src="/assets/oem/oem-hero-product-family.webp" alt="Unbranded dumbbell, weight plate and cable attachment prepared for OEM customization" fill priority sizes="(max-width: 900px) 100vw, 58vw" /></div>
      </section>

      <section className={styles.proofRail} aria-label="OEM product categories">
        <span><CircleDot size={20} />Dumbbells</span><span><CircleDot size={20} />Weight Plates</span><span><CircleDot size={20} />Gym Accessories</span><span><PackageCheck size={20} />Private Label Packaging</span>
      </section>

      <section className={`${styles.section} ${styles.capabilitySection}`} aria-labelledby="capability-title">
        <div className={styles.sectionLead}><h2 id="capability-title">What You Can Customize</h2><p>Every project begins with the buyer&apos;s commercial requirements and ends with a confirmed production reference.</p></div>
        <div className={styles.capabilityList}>{capabilities.map((item) => <article key={item.title}><item.icon size={25} /><h3>{item.title}</h3><div><p><strong>You provide</strong>{item.buyer}</p><p><strong>We confirm</strong>{item.factory}</p></div></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.marketSection}`} aria-labelledby="market-title">
        <div className={styles.sectionLead}><h2 id="market-title">Build the Right Product for Your Market</h2><p>Define the product details that affect positioning, purchasing, approval and repeat orders.</p></div>
        <div className={styles.categoryStack}>{categorySpecs.map((category, index) => <article key={category.title} className={styles.categoryRow}><div className={styles.categoryMedia}><Image src={category.image} alt={category.alt} fill sizes="(max-width: 760px) 100vw, 43vw" /></div><div className={styles.categoryCopy}><span>0{index + 1}</span><h3>{category.title}</h3><ul>{category.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><a href={category.href}>View {category.title} <ArrowRight size={16} /></a></div></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.odmSection}`} aria-labelledby="odm-title">
        <div className={styles.odmMedia}><Image src="/assets/oem/odm-development-workbench.webp" alt="Product development workbench measuring a free weight component" fill sizes="(max-width: 900px) 100vw, 52vw" /></div>
        <div className={styles.odmCopy}><h2 id="odm-title">From Product Idea to Approved Production</h2><p>For projects that go beyond standard logo changes, we review the product concept, construction and development route before confirming commercial conditions.</p><ul><li><Check size={17} />Physical sample, drawing or product brief review</li><li><Check size={17} />Material and construction feasibility</li><li><Check size={17} />Tooling and sample route confirmation</li><li><Check size={17} />Approved specification before production</li></ul><a className={styles.textLink} href="#oem-rfq">Discuss Your Product Idea <ArrowRight size={17} /></a></div>
      </section>

      <section className={`${styles.section} ${styles.processSection}`} aria-labelledby="process-title">
        <div className={styles.sectionLead}><h2 id="process-title">A Clear Six-Step OEM Process</h2><p>Each stage produces the information needed for the next purchasing decision.</p></div>
        <ol className={styles.process}>{process.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
      </section>

      <section className={`${styles.section} ${styles.brandingSection}`} aria-labelledby="branding-title">
        <div className={styles.brandingMedia}><Image src="/assets/oem/branding-methods-macro.webp" alt="Blank recessed and brushed steel dumbbell surfaces for custom branding" fill sizes="(max-width: 900px) 100vw, 43vw" /></div>
        <div className={styles.brandingCopy}><h2 id="branding-title">Choose the Right Branding Method</h2><div className={styles.tableWrap}><table><thead><tr><th>Method</th><th>Best For</th><th>Finish</th><th>Project Review</th></tr></thead><tbody>{brandingRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div>
      </section>

      <section className={`${styles.section} ${styles.sampleSection}`} aria-labelledby="sample-title">
        <div><h2 id="sample-title">Approve the Sample Before Production</h2><p>A physical sample gives your team a clear reference for the product details that matter to your market.</p><ul><li><Scale size={22} /><span><strong>Dimensions & Weight</strong>Check the physical product against the confirmed specification.</span></li><li><Stamp size={22} /><span><strong>Logo & Marking</strong>Approve content, position, size and finish.</span></li><li><Palette size={22} /><span><strong>Color & Finish</strong>Review material appearance and surface treatment.</span></li><li><Box size={22} /><span><strong>Packaging & Labels</strong>Confirm protection, artwork and packing presentation.</span></li></ul><FreeSampleCTA section="oem-sample-approval" /></div>
        <div className={styles.sampleMedia}><Image src="/assets/products/dumbbells/chrome/chrome-dumbbell-custom-logo.webp" alt="Custom chrome dumbbell sample for logo and finish approval" fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
      </section>

      <section className={`${styles.section} ${styles.factorySection}`} aria-labelledby="factory-title">
        <div className={styles.sectionLead}><h2 id="factory-title">Production Control You Can Verify</h2><p>These real PowerBaseFit production images show the stages used to prepare, process, finish and pack free weight products.</p></div>
        <div className={styles.factoryGrid}>{factoryProof.map(([image, title, copy]) => <figure key={title}><div><Image src={image} alt={`${title} at the PowerBaseFit factory`} fill sizes="(max-width: 760px) 50vw, 25vw" /></div><figcaption><strong>{title}</strong><span>{copy}</span></figcaption></figure>)}</div>
        <a className={styles.textLink} href="/factory">See the Factory <ArrowRight size={17} /></a>
      </section>

      <section className={`${styles.section} ${styles.packagingSection}`} aria-labelledby="packaging-title">
        <div className={styles.packagingCopy}><h2 id="packaging-title">Private Label Packaging Built Around the Product</h2><p>Packaging is reviewed with the product dimensions, surface protection, artwork and shipping method so the confirmed packing plan can be used for order preparation.</p><ul><li><PackageCheck size={21} /><span><strong>Inner Protection</strong>Product-specific separation and surface protection.</span></li><li><Box size={21} /><span><strong>Custom Carton</strong>Carton structure and artwork prepared for review.</span></li><li><Tags size={21} /><span><strong>Labels & Shipping Marks</strong>Buyer-provided content placed on the confirmed packaging.</span></li><li><Ship size={21} /><span><strong>Palletizing</strong>Export packing organized for the product and shipment plan.</span></li></ul></div>
        <div className={styles.packagingMedia}><Image src="/assets/oem/private-label-packaging.webp" alt="Dumbbell protected in a blank private label carton with export pallet" fill sizes="(max-width: 900px) 100vw, 55vw" /></div>
      </section>

      <section className={`${styles.section} ${styles.examplesSection}`} aria-labelledby="examples-title">
        <div className={styles.sectionLead}><h2 id="examples-title">Example Product Configurations</h2><p>These examples show how buyer requirements can be organized. Final project conditions are confirmed after review.</p></div>
        <div className={styles.examples}>{examples.map(([title, copy], index) => <article key={title}><span>Example 0{index + 1}</span><h3>{title}</h3><p>{copy}</p><a href="#oem-rfq">Build This Type of Range <ArrowRight size={15} /></a></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.formSection}`} id="oem-rfq" aria-labelledby="rfq-title">
        <div className={styles.formIntro}><h2 id="rfq-title">Start Your OEM Project</h2><p>Send the core purchasing information first. Our team will review the product, customization and order plan before discussing the next step.</p><div className={styles.formAssurance}><span><ClipboardCheck size={22} />Project requirements reviewed before quotation</span><span><Factory size={22} />Product and packaging details handled together</span><span><PackageCheck size={22} />Sample route confirmed before production</span></div></div>
        <OemInquiryForm />
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title"><div className={styles.sectionLead}><h2 id="faq-title">OEM & Private Label FAQ</h2><p>Answers to the purchasing questions buyers ask before starting a custom free weight project.</p></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
  );
}
