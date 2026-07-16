export type DumbbellProduct = {
  slug: string;
  name: string;
  range: string;
  type: string;
  image: string;
  copy: string;
  seoKeyword: string;
  applications: string[];
  details: string[];
  buyerNotes: string;
  gallery?: string[];
};

export const dumbbellProducts: DumbbellProduct[] = [
  {
    slug: "twelve-sided-steel-dumbbell",
    name: "12-sided Steel Dumbbell",
    range: "LB and KG available, custom weight options",
    type: "Solid steel",
    image: "/assets/products/dumbbells/steel-12-sided/twelve-sided-steel-dumbbell-main.jpg",
    gallery: [
      "/assets/products/dumbbells/steel-12-sided/twelve-sided-steel-dumbbell-main.jpg",
      "/assets/products/dumbbells/steel-12-sided/twelve-sided-steel-dumbbell-side.jpg",
      "/assets/products/dumbbells/steel-12-sided/twelve-sided-steel-dumbbell-handle.jpg",
      "/assets/products/dumbbells/steel-12-sided/twelve-sided-steel-dumbbell-detail.jpg"
    ],
    copy: "A polished 12-sided pure steel dumbbell for premium gym projects, with LB and KG systems, custom weight planning, and logo customization support.",
    seoKeyword: "12 sided steel dumbbell manufacturer",
    applications: ["Premium gym projects", "Hotel and private fitness rooms", "Custom logo dumbbell programs"],
    details: ["12-sided steel head design for a premium appearance", "LB and KG systems can be planned for different markets", "Custom weight and logo options available for OEM orders"],
    buyerNotes: "Best for buyers who need a high-end steel dumbbell with flexible weight, market system, and logo customization options."
  },
  {
    slug: "cast-iron-dumbbell",
    name: "Cast Iron Dumbbell",
    range: "2.5-100 kg, 2.5 kg increments",
    type: "Cast iron",
    image: "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-main.jpg",
    gallery: [
      "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-main.jpg",
      "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-close.jpg",
      "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-rack.jpg",
      "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-packed.jpg",
      "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-gym.jpg"
    ],
    copy: "A commercial cast iron dumbbell range from 2.5 kg to 100 kg, increasing by 2.5 kg, suitable for gym projects, distributors, and full free weight zones.",
    seoKeyword: "cast iron dumbbell manufacturer",
    applications: ["Commercial gym dumbbell zones", "Distributor stock programs", "Full free weight area projects"],
    details: ["2.5-100 kg range with 2.5 kg increments", "Cast iron construction for heavy commercial use", "Suitable for rack display, bulk packing, and gym project supply"],
    buyerNotes: "Best for buyers who need a wide, practical commercial dumbbell range with clear weight planning and strong gym-floor application."
  },
  {
    slug: "chrome-dumbbell",
    name: "Chrome Dumbbell",
    range: "Custom KG/LB weight options",
    type: "Chrome finish",
    image: "/assets/products/dumbbells/chrome/chrome-dumbbell-main.avif",
    gallery: [
      "/assets/products/dumbbells/chrome/chrome-dumbbell-main.avif",
      "/assets/products/dumbbells/chrome/chrome-dumbbell-silver.jpg",
      "/assets/products/dumbbells/chrome/chrome-dumbbell-black-handle.jpg",
      "/assets/products/dumbbells/chrome/chrome-dumbbell-custom-logo.jpg",
      "/assets/products/dumbbells/chrome/chrome-dumbbell-gym-set.jpg"
    ],
    copy: "A premium chrome dumbbell line with custom color, handle color, logo, and weight options for high-end gyms, distributors, and OEM brands.",
    seoKeyword: "chrome dumbbell manufacturer",
    applications: ["Premium commercial gym projects", "Private label chrome dumbbell programs", "High-end showroom and distributor displays"],
    details: ["Chrome finish for a bright premium appearance", "Custom colors, handle colors, logo plates, and weight markings available", "Suitable for high-end gym projects, showroom display, and OEM brand lines"],
    buyerNotes: "Best for buyers who need a high-end dumbbell with strong visual impact, flexible customization, and premium product positioning."
  },
  {
    slug: "classic-rubber-round-dumbbell",
    name: "Classic Rubber Round Dumbbell",
    range: "2.5-100 kg, 2.5 kg increments / LB available",
    type: "Rubber coated round head",
    image: "/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.avif",
    gallery: [
      "/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.avif",
      "/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-detail.jpg"
    ],
    copy: "A classic rubber coated round dumbbell for commercial gym projects, available in KG and LB systems with a 2.5-100 kg range and 2.5 kg increments.",
    seoKeyword: "rubber round dumbbell manufacturer",
    applications: ["Commercial gym dumbbell zones", "Distributor KG and LB product programs", "Full free weight area projects"],
    details: ["Classic round-head rubber coated design for daily gym use", "2.5-100 kg range with 2.5 kg increments for complete commercial planning", "KG and LB systems can be prepared for different export markets"],
    buyerNotes: "Best for buyers who need a familiar commercial dumbbell style with flexible KG/LB planning, practical durability, and full-range gym supply."
  },
  {
    slug: "cpu-dumbbell-kg",
    name: "CPU Dumbbell",
    range: "2.5-50 kg, 2.5 kg increments",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-kg.jpg",
    copy: "A durable commercial dumbbell option for gym floors, dealer programs, and private label free weight lines.",
    seoKeyword: "CPU dumbbell manufacturer",
    applications: ["Commercial gym dumbbell zones", "Fitness equipment distributors", "Private label dumbbell sets"],
    details: ["CPU-coated head for daily commercial training use", "KG range suitable for full gym procurement", "Can be planned with matching racks and packaging"],
    buyerNotes: "Best for importers and gyms that need a balanced KG dumbbell range with durable surface protection."
  },
  {
    slug: "cpu-square-dumbbell-kg",
    name: "CPU Square Dumbbell",
    range: "2.5-35 kg, 2.5 kg increments",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-square-dumbbell-kg.jpg",
    copy: "Compact square-head design for stable storage, clean display, and frequent commercial use.",
    seoKeyword: "square CPU dumbbell supplier",
    applications: ["Commercial clubs", "Dealer stock programs", "Space-saving dumbbell storage"],
    details: ["Square head helps reduce rolling", "Suitable for tidy rack display", "Flexible for logo and carton planning"],
    buyerNotes: "A practical choice when the buyer wants a compact shape and stable presentation for a commercial free weight area."
  },
  {
    slug: "adjustable-dumbbell-kg",
    name: "Adjustable Dumbbell",
    range: "24 kg / 40 kg options",
    type: "Adjustable",
    image: "/assets/products/dumbbells/catalog-v2/adjustable-dumbbell-kg.jpg",
    copy: "Space-saving adjustable dumbbell for home gym programs, retail sets, and compact training areas.",
    seoKeyword: "adjustable dumbbell supplier",
    applications: ["Home gym product lines", "Retail fitness channels", "Small training rooms"],
    details: ["Multiple weight settings in one unit", "Suitable for compact spaces", "Can support carton and user-label planning"],
    buyerNotes: "Useful for retailers and home fitness brands that want a compact SKU instead of a full fixed dumbbell set."
  },
  {
    slug: "cpu-heavy-dumbbell-kg",
    name: "CPU Heavy Dumbbell",
    range: "2.5-100 kg, 2.5 kg increments",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-heavy-kg.jpg",
    copy: "Heavy-range dumbbell line for strength gyms, commercial clubs, and professional training spaces.",
    seoKeyword: "heavy dumbbell manufacturer",
    applications: ["Strength gyms", "Professional training centers", "Heavy free weight zones"],
    details: ["Extended KG range for advanced training", "Designed for high-use gym environments", "Can be supplied with matching storage solutions"],
    buyerNotes: "Recommended for projects that need heavier dumbbells beyond standard commercial ranges."
  },
  {
    slug: "hex-dumbbell-kg",
    name: "Hex Dumbbell",
    range: "2.5-50 kg, 2.5 kg increments",
    type: "Hex head",
    image: "/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.jpg",
    copy: "Classic hex shape for stable floor placement, easy storage, and high-demand gym procurement.",
    seoKeyword: "hex dumbbell manufacturer",
    applications: ["Commercial gym openings", "Functional training zones", "Wholesale dumbbell programs"],
    details: ["Hex head helps keep dumbbells from rolling", "Common range for gym projects", "Suitable for high-volume procurement"],
    buyerNotes: "One of the most common choices for gyms and distributors because it is easy to sell, store, and replace."
  },
  {
    slug: "neoprene-dumbbell-kg",
    name: "Neoprene Dumbbell",
    range: "1-10 kg",
    type: "Neoprene",
    image: "/assets/products/dumbbells/catalog-v2/neoprene-dumbbell-kg.jpg",
    copy: "Colorful light dumbbell series for studios, group training, home fitness, and retail packs.",
    seoKeyword: "neoprene dumbbell supplier",
    applications: ["Studio classes", "Home fitness retail", "Light training programs"],
    details: ["Lightweight range for daily group training", "Color options help size recognition", "Suitable for carton pack and retail programs"],
    buyerNotes: "Good for light fitness categories and retail buyers who need approachable, color-coded dumbbells."
  },
  {
    slug: "pu-dumbbell-kg",
    name: "PU Dumbbell",
    range: "2.5-50 kg, 2.5 kg increments",
    type: "PU coating",
    image: "/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.jpg",
    copy: "Premium PU dumbbells for buyers who need a clean finish, long service life, and professional display.",
    seoKeyword: "PU dumbbell manufacturer",
    applications: ["Premium fitness clubs", "Hotel gyms", "Professional product displays"],
    details: ["PU surface supports a clean commercial look", "Suitable for premium gym positioning", "Works well with custom logo and packaging planning"],
    buyerNotes: "A stronger fit for buyers who care about finish quality, brand image, and long-term presentation."
  },
  {
    slug: "sus304-dumbbell-kg",
    name: "SUS304 Dumbbell",
    range: "2.5-50 kg, 2.5 kg increments",
    type: "Stainless steel",
    image: "/assets/products/dumbbells/catalog-v2/sus304-dumbbell-kg.jpg",
    copy: "Stainless steel dumbbell option for premium clubs, showrooms, hotel gyms, and high-end projects.",
    seoKeyword: "stainless steel dumbbell supplier",
    applications: ["Luxury gym projects", "Showroom displays", "Hotel and apartment gyms"],
    details: ["Metal finish creates a premium visual effect", "Suitable for projects where appearance matters", "Can be quoted with matching racks and packaging"],
    buyerNotes: "Best for high-end spaces where visual quality and product presentation influence the purchase decision."
  },
  {
    slug: "tpu-dumbbell-kg",
    name: "TPU Dumbbell",
    range: "2.5-70 kg, 2.5 kg increments",
    type: "TPU coating",
    image: "/assets/products/dumbbells/catalog-v2/tpu-dumbbell-kg.jpg",
    copy: "TPU-coated dumbbells for commercial use, stronger surface protection, and custom logo programs.",
    seoKeyword: "TPU dumbbell manufacturer",
    applications: ["Commercial gyms", "Gym chain procurement", "OEM dumbbell programs"],
    details: ["TPU coating supports durability and surface protection", "Wide KG range for commercial planning", "Suitable for private label dumbbell lines"],
    buyerNotes: "A useful option when buyers need a durable commercial line with stronger brand customization potential."
  },
  {
    slug: "tpu-round-dumbbell-kg",
    name: "TPU Round Dumbbell",
    range: "2.5-70 kg, 2.5 kg increments",
    type: "TPU coating",
    image: "/assets/products/dumbbells/catalog-v2/tpu-round-dumbbell-kg.jpg",
    copy: "Round TPU style for branded gym projects that need a distinctive visual product line.",
    seoKeyword: "round TPU dumbbell factory",
    applications: ["Branded gym projects", "Dealer showroom lines", "Premium free weight zones"],
    details: ["Round profile for a different visual style", "TPU coating for commercial use", "Suitable for custom logo and color planning"],
    buyerNotes: "A good fit for brands that want a more recognizable dumbbell look than standard hex designs."
  },
  {
    slug: "tpu-small-dumbbell-kg",
    name: "TPU Small Dumbbell",
    range: "1-10 kg",
    type: "TPU coating",
    image: "/assets/products/dumbbells/catalog-v2/tpu-small-dumbbell-kg.jpg",
    copy: "Lightweight TPU dumbbell range suitable for personal training rooms, studios, and home fitness sets.",
    seoKeyword: "small TPU dumbbell supplier",
    applications: ["Personal training studios", "Light fitness programs", "Home fitness retail"],
    details: ["Light KG range for daily training", "TPU finish supports a cleaner product feel", "Can be combined with other free weight products"],
    buyerNotes: "Suitable for light dumbbell packages and small-size retail or studio orders."
  },
  {
    slug: "selectorized-adjustable-dumbbell-kg",
    name: "Selectorized Adjustable Dumbbell",
    range: "20 kg / 24 kg / 32 kg / 36 kg / 40 kg",
    type: "Adjustable",
    image: "/assets/products/dumbbells/catalog-v2/selectorized-adjustable-dumbbell-kg.jpg",
    copy: "Selectorized design for compact training zones, retail channels, and space-saving gym packages.",
    seoKeyword: "selectorized adjustable dumbbell supplier",
    applications: ["Home fitness brands", "Compact gym spaces", "Retail fitness packages"],
    details: ["Several capacity options for different markets", "Space-saving design compared with full fixed sets", "Suitable for carton and instruction label planning"],
    buyerNotes: "Often selected by buyers who want a compact product with a higher perceived retail value."
  },
  {
    slug: "cpu-hexagonal-dumbbell-kg",
    name: "CPU Hexagonal Dumbbell",
    range: "1-10 kg and 2.5-50 kg options",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-hexagonal-dumbbell-kg.jpg",
    copy: "Hexagonal CPU dumbbell with stable shape and flexible range planning for commercial gym buyers.",
    seoKeyword: "CPU hexagonal dumbbell manufacturer",
    applications: ["Commercial dumbbell zones", "Functional training areas", "Distributor inventory"],
    details: ["Hexagonal shape supports stable placement", "Flexible small and full-range planning", "Can be quoted as a set or mixed order"],
    buyerNotes: "A flexible option when buyers need both lighter sizes and commercial gym ranges."
  },
  {
    slug: "cpu-dumbbell-lb",
    name: "CPU Dumbbell",
    range: "5-120 lb, 5 lb increments",
    type: "LB series",
    image: "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-lb.jpg",
    copy: "LB-system dumbbell series for North American gyms, dealers, and distributor stock programs.",
    seoKeyword: "LB CPU dumbbell supplier",
    applications: ["USA gym equipment projects", "North American distributors", "LB dumbbell replacement programs"],
    details: ["LB range for markets using imperial weights", "Suitable for commercial gym procurement", "Can be planned with export packaging"],
    buyerNotes: "Recommended for buyers targeting USA, Canada, and other LB-system fitness markets."
  },
  {
    slug: "cpu-square-dumbbell-lb",
    name: "CPU Square Dumbbell",
    range: "5-70 lb, 5 lb increments",
    type: "LB series",
    image: "/assets/products/dumbbells/catalog-v2/cpu-square-dumbbell-lb.jpg",
    copy: "Square CPU dumbbell in LB range for buyers who need stable storage and export-ready packaging.",
    seoKeyword: "LB square dumbbell manufacturer",
    applications: ["Distributor programs", "Commercial free weight zones", "LB market gym projects"],
    details: ["Square profile supports stable storage", "LB sizing for overseas markets", "Suitable for gym chain and dealer programs"],
    buyerNotes: "A practical LB option for buyers who want the square-head look and reliable storage."
  },
  {
    slug: "neoprene-dumbbell-lb",
    name: "Neoprene Dumbbell",
    range: "2-12 lb",
    type: "LB series",
    image: "/assets/products/dumbbells/catalog-v2/neoprene-dumbbell-lb.jpg",
    copy: "Light LB neoprene dumbbells for studio, retail, rehabilitation, and home fitness product lines.",
    seoKeyword: "LB neoprene dumbbell supplier",
    applications: ["Retail fitness packs", "Studio class equipment", "Rehabilitation and light training"],
    details: ["LB size system for retail and light fitness buyers", "Colorful design for quick size recognition", "Can support mixed carton planning"],
    buyerNotes: "Useful for buyers building light dumbbell programs for retail and home training markets."
  },
  {
    slug: "hex-dumbbell-lb",
    name: "Hex Dumbbell",
    range: "2.5-50 kg, 2.5 kg increments",
    type: "Hex head",
    image: "/assets/products/dumbbells/catalog-v2/hex-dumbbell-lb.jpg",
    copy: "Commercial hex dumbbell style for free weight zones, strength training areas, and bulk orders.",
    seoKeyword: "commercial hex dumbbell supplier",
    applications: ["Commercial gym procurement", "Strength areas", "Wholesale free weight orders"],
    details: ["Hex shape helps with safety and storage", "Common choice for gyms and dealers", "Can be planned with racks and mixed free weight orders"],
    buyerNotes: "Best for buyers who want a familiar commercial dumbbell product with broad market acceptance."
  },
  {
    slug: "pu-dumbbell-lb",
    name: "PU Dumbbell",
    range: "5 / 10 / 15 / 25 / 35 / 45 lb",
    type: "PU coating",
    image: "/assets/products/dumbbells/catalog-v2/pu-dumbbell-lb.jpg",
    copy: "PU dumbbell option for LB-market buyers who need premium finish and long-term gym use.",
    seoKeyword: "LB PU dumbbell manufacturer",
    applications: ["Premium club procurement", "Hotel gym projects", "Dealer showroom display"],
    details: ["PU coating for a premium commercial appearance", "LB sizing for target markets", "Suitable for logo and packaging support"],
    buyerNotes: "Good for buyers who need a premium LB product line for high-end commercial spaces."
  },
  {
    slug: "tpu-dumbbell-lb",
    name: "TPU Dumbbell",
    range: "5-130 lb, 5 lb increments",
    type: "LB series",
    image: "/assets/products/dumbbells/catalog-v2/tpu-dumbbell-lb.jpg",
    copy: "TPU LB series for distributors and commercial gyms needing a complete, durable dumbbell line.",
    seoKeyword: "LB TPU dumbbell supplier",
    applications: ["USA gym projects", "Distributor stock programs", "Commercial gym chains"],
    details: ["Wide LB range for serious gym procurement", "TPU finish supports commercial usage", "Can be paired with OEM logo planning"],
    buyerNotes: "A strong fit for LB markets where buyers need both durability and a broad product range."
  },
  {
    slug: "sus304-dumbbell-lb",
    name: "SUS304 Dumbbell",
    range: "2-200 lb, 5 lb increments",
    type: "Stainless steel",
    image: "/assets/products/dumbbells/catalog-v2/sus304-dumbbell-lb.jpg",
    copy: "Wide-range stainless steel dumbbell for premium projects, display zones, and high-end facilities.",
    seoKeyword: "LB stainless steel dumbbell supplier",
    applications: ["High-end club projects", "Premium residential gyms", "Showroom product lines"],
    details: ["Stainless steel finish for premium visual value", "Wide LB range for professional buyers", "Suitable for display-focused projects"],
    buyerNotes: "A premium option when the buyer needs strong visual impact and an extended LB range."
  },
  {
    slug: "adjustable-dumbbell-lb",
    name: "Adjustable Dumbbell",
    range: "2-20 lb",
    type: "Adjustable",
    image: "/assets/products/dumbbells/catalog-v2/adjustable-dumbbell-lb.jpg",
    copy: "Compact adjustable LB dumbbell for starter fitness programs, retail channels, and home training.",
    seoKeyword: "light adjustable dumbbell supplier",
    applications: ["Home fitness retail", "Starter training kits", "Compact exercise products"],
    details: ["Light LB range for entry-level users", "Space-saving adjustable structure", "Suitable for retail packaging and mixed orders"],
    buyerNotes: "A good option for retail buyers targeting beginners and compact home training."
  },
  {
    slug: "tpu-adjustable-dumbbell-lb",
    name: "TPU Adjustable Dumbbell",
    range: "50 lb / 80 lb",
    type: "TPU coating",
    image: "/assets/products/dumbbells/catalog-v2/tpu-adjustable-dumbbell-lb.jpg",
    copy: "TPU adjustable style for buyers planning heavier compact free weight solutions.",
    seoKeyword: "TPU adjustable dumbbell supplier",
    applications: ["Compact strength training", "Retail strength products", "Home gym upgrade kits"],
    details: ["Heavier adjustable options for strength training", "TPU surface for a commercial look", "Suitable for private label product planning"],
    buyerNotes: "Useful when buyers want adjustable dumbbells with heavier capacity and a more durable exterior."
  },
  {
    slug: "cpu-compact-dumbbell",
    name: "CPU Compact Dumbbell",
    range: "2.5-60 kg / 5-130 lb",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-compact.jpg",
    copy: "Compact CPU dumbbell range for mixed KG and LB programs, gym chains, and OEM buyers.",
    seoKeyword: "compact CPU dumbbell manufacturer",
    applications: ["Gym chain procurement", "Mixed KG and LB programs", "OEM dumbbell ranges"],
    details: ["Supports both KG and LB market planning", "Compact design for gym floor use", "Can be quoted with logo and packaging details"],
    buyerNotes: "Good for buyers who need one product direction that can serve different regional markets."
  },
  {
    slug: "cpu-twelve-sided-dumbbell",
    name: "CPU Twelve-sided Dumbbell",
    range: "2.5-60 kg / 5-130 lb",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-twelve-sided-dumbbell.jpg",
    copy: "Twelve-sided dumbbell shape that helps reduce rolling and supports a distinctive gym display.",
    seoKeyword: "twelve sided dumbbell manufacturer",
    applications: ["Commercial gyms", "Brand-focused free weight areas", "Distributor product differentiation"],
    details: ["Twelve-sided head for better stability than round styles", "Supports KG and LB planning", "Suitable for branded dumbbell programs"],
    buyerNotes: "A useful choice when buyers want a distinctive product shape without losing commercial practicality."
  },
  {
    slug: "cpu-hexagonal-dumbbell-wide",
    name: "CPU Hexagonal Dumbbell",
    range: "1-10 kg, 2.5-50 kg or 5-110 lb",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-hexagonal-dumbbell-wide.jpg",
    copy: "Flexible CPU hexagonal line for buyers combining small sizes, full commercial ranges, or LB sets.",
    seoKeyword: "CPU hex dumbbell supplier",
    applications: ["Full gym solutions", "Distributor SKU planning", "Commercial free weight zones"],
    details: ["Supports light and commercial-size planning", "Available for KG or LB market direction", "Suitable for mixed container orders"],
    buyerNotes: "A flexible catalog choice when a buyer needs several size systems under one product style."
  },
  {
    slug: "cpu-dumbbell-full-range",
    name: "CPU Dumbbell Full Range",
    range: "5-200 lb / 2.5-100 kg",
    type: "CPU coating",
    image: "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-full-range.jpg",
    copy: "Full-range CPU dumbbell solution for professional gyms, heavy-use strength rooms, and distributors.",
    seoKeyword: "full range CPU dumbbell manufacturer",
    applications: ["Professional strength gyms", "Distributor full-line programs", "Heavy dumbbell procurement"],
    details: ["Full KG and LB range for serious commercial buyers", "Suitable for heavy training spaces", "Can be combined with racks, plates, and packaging services"],
    buyerNotes: "Best for buyers who want a complete dumbbell range from light sizes to heavy strength training sizes."
  }
];

export function getDumbbellProduct(slug: string) {
  return dumbbellProducts.find((product) => product.slug === slug);
}
