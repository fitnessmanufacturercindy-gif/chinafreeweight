import {
  Box,
  ClipboardCheck,
  Container,
  FileCheck2,
  PackageCheck,
  Scale,
  ShieldCheck
} from "lucide-react";
import { sourcingFacts } from "../site";
import ProductRFQForm from "./ProductRFQForm";

type Specification = {
  label: string;
  value: string;
};

type ProductConversionTemplateProps = {
  productName: string;
  productCategory: "Dumbbells" | "Weight Plates";
  specifications: Specification[];
  manufacturingSummary: string;
  customizationOptions: string[];
};

export default function ProductConversionTemplate({
  productName,
  productCategory,
  specifications,
  manufacturingSummary,
  customizationOptions
}: ProductConversionTemplateProps) {
  const buyingControls = [
    {
      icon: Scale,
      title: "Tolerance approval",
      copy: sourcingFacts.tolerance
    },
    {
      icon: ClipboardCheck,
      title: "QC checkpoints",
      copy: `${sourcingFacts.quality} For ${productName}, the inspection plan is tied to the approved model, weight range, finish, markings, and packing specification.`
    },
    {
      icon: PackageCheck,
      title: "Export packing",
      copy: sourcingFacts.freeWeightPackaging
    },
    {
      icon: Container,
      title: "Container loading plan",
      copy: sourcingFacts.containerPlanning
    },
    {
      icon: ShieldCheck,
      title: "Written warranty scope",
      copy: sourcingFacts.warranty
    },
    {
      icon: FileCheck2,
      title: "Sample approval",
      copy: sourcingFacts.samples
    }
  ];

  return (
    <>
      <section className="products-section commercial-template" aria-labelledby="commercial-template-heading">
        <div className="section-heading-wide">
          <div>
            <span>Commercial buying file</span>
            <h2 id="commercial-template-heading">Specification-to-shipment plan for {productName}</h2>
          </div>
          <p>
            This buyer file separates published product facts from values that
            must be confirmed for the selected weight mix, branding, market,
            and order quantity.
          </p>
        </div>

        <div className="commercial-spec-grid">
          <article className="commercial-spec-card">
            <div className="commercial-card-heading">
              <Box size={24} />
              <div>
                <span>Published specification</span>
                <h3>Current model facts</h3>
              </div>
            </div>
            <dl>
              {specifications.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="commercial-spec-card">
            <div className="commercial-card-heading">
              <ClipboardCheck size={24} />
              <div>
                <span>Production reference</span>
                <h3>Process and customization</h3>
              </div>
            </div>
            <p>{manufacturingSummary}</p>
            <ul>
              {customizationOptions.map((option) => <li key={option}>{option}</li>)}
            </ul>
          </article>
        </div>

        <div className="buying-control-grid">
          {buyingControls.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon size={23} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-section product-rfq-section" aria-labelledby="product-rfq-heading">
        <div className="product-rfq-copy">
          <span>RFQ for {productCategory}</span>
          <h2 id="product-rfq-heading">Get a model-specific quote for {productName}</h2>
          <p>
            Send the target quantity first. The reply can then confirm the
            applicable specification, tolerance plan, sample route, packing,
            loading calculation, and written commercial terms.
          </p>
          <ul>
            <li>Product and category are attached automatically.</li>
            <li>No generic container quantity is shown before the mix is checked.</li>
            <li>Logo, markings, sample and inspection requirements can be added now.</li>
          </ul>
        </div>
        <ProductRFQForm productName={productName} productCategory={productCategory} />
      </section>
    </>
  );
}
