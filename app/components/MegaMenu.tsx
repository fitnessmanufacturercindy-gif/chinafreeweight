import { ArrowRight, ChevronDown } from "lucide-react";

const categories = [
  {
    title: "Dumbbells",
    copy: "Rubber, chrome and hex dumbbells for commercial gyms and private label lines.",
    href: "/products/dumbbells"
  },
  {
    title: "Weight plates",
    copy: "Precision plates, bumper plates and wholesale plate sets for gym projects.",
    href: "/products/weight-plates"
  },
  {
    title: "Multi-functional Racks & Benches",
    copy: "Home gym functional trainers, custom racks, cable systems and benches.",
    href: "/products/racks-benches"
  },
  {
    title: "Gym Accessories",
    copy: "Training accessories and add-on tools for dealers and commercial facilities.",
    href: "/products/gym-accessories"
  }
];

export default function MegaMenu() {
  return (
    <details className="nav-item has-mega">
      <summary className="nav-trigger" aria-controls="products-mega-menu">
        Products <ChevronDown size={14} />
      </summary>
      <div className="mega-menu" id="products-mega-menu" aria-label="Products mega menu">
        <div className="mega-feature">
          <span>PowerBaseFit Product System</span>
          <h3>Build your free weight line from one source factory</h3>
          <p>
            Explore the four core categories buyers need for wholesale,
            private label and commercial gym projects.
          </p>
          <a href="/contact">
            Send RFQ <ArrowRight size={16} />
          </a>
        </div>
        <div className="mega-category-grid">
          {categories.map((category) => (
            <a href={category.href} className="mega-category" key={category.title}>
              <strong>{category.title}</strong>
              <span>{category.copy}</span>
              <em>
                View category <ArrowRight size={14} />
              </em>
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}
