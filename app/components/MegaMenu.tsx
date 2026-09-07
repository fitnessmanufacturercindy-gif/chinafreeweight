import { ArrowRight, ChevronDown } from "lucide-react";

const categories = [
  {
    title: "Dumbbells",
    copy: "Rubber, chrome, steel and hex dumbbells for wholesale and private label programs.",
    href: "/products/dumbbells",
    image: "/assets/hex-dumbbells.avif"
  },
  {
    title: "Weight Plates",
    copy: "Bumper, rubber, cast iron and precision plates for commercial training spaces.",
    href: "/products/weight-plates",
    image: "/assets/weight-plate.avif"
  },
  {
    title: "Gym Accessories",
    copy: "Kettlebells, mats and training accessories for complete gym equipment orders.",
    href: "/products/gym-accessories",
    image: "/assets/gym-accessories.avif"
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
          <span>Product Catalog</span>
          <h3>Source your complete free weight range</h3>
          <p>
            Compare core categories for distribution, private label and commercial gym projects.
          </p>
          <a href="/products">
            View all products <ArrowRight size={16} />
          </a>
        </div>
        <div className="mega-category-grid">
          {categories.map((category) => (
            <a href={category.href} className="mega-category" key={category.title}>
              <span className="mega-category-media" aria-hidden="true">
                <img src={category.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="mega-category-content">
                <strong>{category.title}</strong>
                <span className="mega-category-copy">{category.copy}</span>
                <em>
                  Explore range <ArrowRight size={15} />
                </em>
              </span>
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}
