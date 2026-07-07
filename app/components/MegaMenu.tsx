"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`nav-item has-mega ${open ? "is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="nav-trigger"
        aria-expanded={open}
        aria-controls="products-mega-menu"
        onClick={() => setOpen((current) => !current)}
      >
        Products <ChevronDown size={14} />
      </button>
      <div className="mega-menu" id="products-mega-menu" aria-label="Products mega menu">
        <div className="mega-feature">
          <span>PowerBaseFit Product System</span>
          <h3>Build your free weight line from one source factory</h3>
          <p>
            Explore the four core categories buyers need for wholesale,
            private label and commercial gym projects.
          </p>
          <a href="/contact" onClick={() => setOpen(false)}>
            Send RFQ <ArrowRight size={16} />
          </a>
        </div>
        <div className="mega-category-grid">
          {categories.map((category) => (
            <a href={category.href} className="mega-category" key={category.title} onClick={() => setOpen(false)}>
              <strong>{category.title}</strong>
              <span>{category.copy}</span>
              <em>
                View category <ArrowRight size={14} />
              </em>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
