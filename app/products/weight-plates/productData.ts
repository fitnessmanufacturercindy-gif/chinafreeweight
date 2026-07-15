export type WeightPlateProduct = {
  slug: string;
  name: string;
  range: string;
  type: string;
  image: string;
  copy: string;
  material: string;
  process: string;
  features: string[];
  applications: string[];
  oemOptions: string[];
  buyerNotes: string;
};

const basePath = "/assets/products/weight-plates/catalog";

export const weightPlateProducts: WeightPlateProduct[] = [
  {
    slug: "cpu-bumper-plate",
    name: "CPU Bumper Plate",
    range: "KG and LB planning available",
    type: "CPU bumper plate",
    image: `${basePath}/cpu-bumper-plate.webp`,
    copy: "A clean CPU bumper plate option for gym projects that need color recognition, impact resistance, and consistent plate display.",
    material: "CPU surface material with a steel center insert for barbell loading and repeated training use.",
    process: "Produced through material preparation, plate molding, insert fitting, surface finishing, weight marking, and shipment inspection.",
    features: ["Color-coded training appearance", "Suitable for Olympic bar loading", "Good option for full gym plate sets"],
    applications: ["Commercial gym free weight zones", "Home gym strength training", "Distributor starter plate programs"],
    oemOptions: ["Custom logo", "Custom colors", "KG or LB markings", "Carton and pallet packaging"],
    buyerNotes: "Best for buyers who need a balanced bumper plate line for both commercial gym plates and private label fitness projects."
  },
  {
    slug: "cpu-color-bumper-plate",
    name: "CPU Color Bumper Plate",
    range: "KG/LB sets for gym projects",
    type: "Color bumper plate",
    image: `${basePath}/cpu-color-bumper-plate.webp`,
    copy: "A bright color bumper plate style for buyers building easy-to-identify training zones and branded free weight areas.",
    material: "CPU plate body with molded color design and fitted center ring for Olympic bar use.",
    process: "The manufacturing process focuses on color consistency, center insert alignment, molded plate profile, and final visual inspection.",
    features: ["High-visibility colors", "Easy plate identification", "Suitable for branded gym layouts"],
    applications: ["Commercial gym Olympic lifting areas", "Home gym packages", "Fitness studio strength zones"],
    oemOptions: ["Custom color system", "Private label logo", "KG/LB display options", "Export carton labels"],
    buyerNotes: "A useful style when dealers or gym chains want plates that look more active and easier to recognize on the floor."
  },
  {
    slug: "rubber-weight-plate",
    name: "Rubber Weight Plate",
    range: "Standard KG/LB plate programs",
    type: "Rubber plate",
    image: `${basePath}/rubber-weight-plate.webp`,
    copy: "A classic rubber weight plate for strength zones, wholesale plate sets, and mixed commercial gym equipment orders.",
    material: "Rubber covered plate structure with a metal center insert for daily barbell loading.",
    process: "Built through plate forming, rubber surface finishing, center hole checking, weight tolerance review, and packing confirmation.",
    features: ["Classic black appearance", "Practical for strength training", "Suitable for high-volume plate orders"],
    applications: ["Commercial gym strength areas", "Home gym barbell training", "Distributor stock programs"],
    oemOptions: ["Embossed logo", "Weight marking options", "Packaging labels", "Mixed container planning"],
    buyerNotes: "Best for importers who need practical gym weight plates supplier options with broad market acceptance."
  },
  {
    slug: "rubber-barbell-plate",
    name: "Rubber Barbell Plate",
    range: "KG/LB Olympic barbell plate sets",
    type: "Rubber barbell plate",
    image: "/assets/products/weight-plates/rubber-barbell/rubber-barbell-plate-main.webp",
    copy: "A black rubber barbell plate with grip openings and a metal center sleeve for commercial gyms, home gyms, and wholesale plate programs.",
    material: "Rubber covered plate body with textured grip areas and a fitted metal center sleeve for Olympic barbell loading.",
    process: "Production focuses on rubber surface finishing, grip area shaping, center sleeve fitting, edge inspection, and packing checks before shipment.",
    features: ["Grip openings for easier loading and handling", "Metal center sleeve for Olympic barbell use", "Black rubber finish for practical gym-floor application"],
    applications: ["Commercial gym barbell stations", "Home gym strength training", "Distributor and wholesale plate programs"],
    oemOptions: ["Custom logo", "KG or LB weight markings", "Surface texture and grip detail confirmation", "Carton, pallet, and mixed container packaging"],
    buyerNotes: "Best for buyers who need practical rubber commercial gym plates with easier handling, durable daily-use positioning, and flexible OEM supply."
  },
  {
    slug: "full-rubber-barbell-plate",
    name: "Full Rubber Barbell Plate",
    range: "Color KG/LB barbell plate sets",
    type: "Full rubber plate",
    image: "/assets/products/weight-plates/full-rubber/full-rubber-barbell-plate-main.webp",
    copy: "A full rubber barbell plate series with color-coded weight recognition for gyms, distributors, and complete strength training areas.",
    material: "Full rubber plate body with a fitted metal center sleeve, smooth colored surface, and clear KG or LB weight markings.",
    process: "Manufacturing includes rubber material preparation, color matching, plate forming, center sleeve fitting, surface inspection, and export packing.",
    features: ["Color-coded plate system for quick weight recognition", "Full rubber body for a cleaner gym-floor appearance", "Metal center sleeve for Olympic barbell loading"],
    applications: ["Commercial gym free weight zones", "Home gym barbell training rooms", "Distributor color plate programs"],
    oemOptions: ["Custom logo", "Custom color planning", "KG or LB markings", "Retail carton or pallet packing"],
    buyerNotes: "Best for buyers who want a bright, easy-to-merchandise plate line with practical commercial gym plates and flexible OEM presentation."
  },
  {
    slug: "black-competition-plate",
    name: "Black Competition Plate",
    range: "LB competition plate sets",
    type: "Competition weight plate",
    image: "/assets/products/weight-plates/black-competition/black-competition-plate-main.webp",
    copy: "A black competition plate series with colored LB markings for strength training areas, dealer programs, and commercial gym plate supply.",
    material: "Dense plate body with a black surface finish, center sleeve insert, and clear color-coded weight markings for quick identification.",
    process: "Production focuses on plate body consistency, center sleeve fitting, surface finish inspection, marking clarity, weight checking, and export packing.",
    features: ["Black competition-style appearance", "Color-coded LB markings", "Center sleeve for Olympic barbell loading"],
    applications: ["Commercial gym strength zones", "Performance training facilities", "Distributor competition plate product lines"],
    oemOptions: ["Custom logo", "LB or KG marking system", "Color marking adjustment", "Wholesale carton and pallet packing"],
    buyerNotes: "Best for buyers who need a clean black competition plate option for professional gym layouts, showroom display, and repeat wholesale supply."
  },
  {
    slug: "solid-steel-barbell-plate",
    name: "Solid Steel Barbell Plate",
    range: "Custom KG/LB steel plate sets",
    type: "Solid steel plate",
    image: "/assets/products/weight-plates/solid-steel/solid-steel-barbell-plate-main.webp",
    copy: "A machined solid steel barbell plate with a polished metal finish for premium strength rooms, private clubs, and high-end free weight displays.",
    material: "Solid steel construction with a precision-machined profile, polished surface, grip openings, and Olympic center hole.",
    process: "Manufacturing includes steel material selection, CNC machining, edge finishing, surface polishing, weight checking, and protective packing before shipment.",
    features: ["Premium polished steel appearance", "Grip openings for easier handling", "Precision-machined center hole for Olympic barbell loading"],
    applications: ["High-end commercial gym strength zones", "Private training clubs", "Premium showroom and distributor product lines"],
    oemOptions: ["Custom logo engraving", "KG or LB markings", "Polished or brushed finish planning", "Protective carton and pallet packing"],
    buyerNotes: "Best for buyers who need premium commercial gym plates with a strong visual finish, durable steel construction, and OEM brand presentation."
  },
  {
    slug: "custom-solid-steel-barbell-plate",
    name: "Custom Solid Steel Barbell Plate",
    range: "Custom logo steel plate sets",
    type: "Custom solid steel plate",
    image: "/assets/products/weight-plates/custom-solid-steel/custom-solid-steel-barbell-plate-main.webp",
    copy: "A custom solid steel barbell plate series with polished and dark finish options for premium gyms, private labels, and branded strength rooms.",
    material: "Solid steel plate construction with a machined face, grip openings, engraved logo or weight markings, and an Olympic center hole.",
    process: "Production includes steel machining, face polishing, finish treatment, logo or marking confirmation, center hole checking, and protective packing.",
    features: ["Custom logo and weight marking support", "Polished or dark finish options", "Grip openings for easier plate handling"],
    applications: ["Premium commercial gym projects", "Private label strength equipment lines", "Showroom and club free weight areas"],
    oemOptions: ["Custom logo engraving", "KG or LB weight markings", "Silver, dark, or custom finish planning", "Protective export carton and pallet packing"],
    buyerNotes: "Best for buyers who want a distinctive solid steel plate line with brand customization, premium presentation, and flexible B2B supply."
  },
  {
    slug: "heavy-solid-steel-plate",
    name: "Heavy Solid Steel Plate",
    range: "Heavy KG/LB steel plate sets",
    type: "Heavy solid steel plate",
    image: "/assets/products/weight-plates/heavy-solid-steel/heavy-solid-steel-plate-main.webp",
    copy: "A heavy solid steel plate with a clean full-face design for strength training zones, premium gym projects, and branded plate programs.",
    material: "Solid steel plate body with a machined center hole, polished edge detail, printed KG or LB markings, and optional side color accent.",
    process: "Production includes steel blank preparation, machining, surface finishing, center hole inspection, weight marking, and protective packing for export shipment.",
    features: ["Full-face heavy steel design", "Clear KG or LB weight markings", "Polished edge and durable plate body"],
    applications: ["Commercial gym heavy lifting areas", "Private club strength rooms", "Premium distributor plate programs"],
    oemOptions: ["Custom logo or weight mark layout", "KG or LB marking options", "Side color line customization", "Protective carton and pallet packing"],
    buyerNotes: "Best for buyers who need a heavier premium steel plate style with clean branding space and reliable commercial gym supply."
  },
  {
    slug: "gold-steel-barbell-plate",
    name: "Gold Steel Barbell Plate",
    range: "Gold finish KG/LB plate sets",
    type: "Gold steel plate",
    image: "/assets/products/weight-plates/gold-steel/gold-steel-barbell-plate-main.webp",
    copy: "A gold finish steel barbell plate series for premium gyms, private training rooms, showrooms, and custom branded free weight areas.",
    material: "Steel plate body with gold finish surface, machined center hole, engraved or printed weight markings, and polished edge detail.",
    process: "Production includes steel machining, gold surface finishing, logo and weight mark confirmation, center hole checking, and protective export packing.",
    features: ["Gold finish for premium visual presentation", "KG or LB weight marking options", "Suitable for branded plate and showroom projects"],
    applications: ["Premium commercial gym strength zones", "Private club and villa gym rooms", "Distributor high-end product displays"],
    oemOptions: ["Custom logo", "Gold tone and surface finish planning", "KG or LB markings", "Protective carton and pallet packing"],
    buyerNotes: "Best for buyers who want a high-end gold plate line with strong visual impact, private label options, and commercial gym supply support."
  },
  {
    slug: "rubber-competition-bumper-plate",
    name: "Rubber Competition Bumper Plate",
    range: "Color KG competition plate sets",
    type: "Rubber competition bumper plate",
    image: "/assets/products/weight-plates/rubber-competition-bumper/rubber-competition-bumper-plate-main.webp",
    copy: "A color rubber competition bumper plate set for Olympic lifting zones, commercial gym projects, and branded strength training areas.",
    material: "Rubber bumper plate body with color-coded weight recognition, metal center insert, and molded surface details for barbell training.",
    process: "Production includes rubber material preparation, color control, plate molding, center insert fitting, weight marking inspection, and export packing.",
    features: ["Color-coded KG weight system", "Rubber bumper construction for training areas", "Metal center insert for Olympic barbell loading"],
    applications: ["Commercial gym Olympic lifting zones", "Functional training studios", "Distributor color bumper plate lines"],
    oemOptions: ["Custom logo", "Custom color matching", "KG or LB marking options", "Retail carton and pallet packing"],
    buyerNotes: "Best for buyers who need a visible color bumper plate line for gym floor organization, private label programs, and commercial gym supply."
  },
  {
    slug: "cast-iron-weight-plate",
    name: "Cast Iron Weight Plate",
    range: "KG/LB cast iron plate sets",
    type: "Cast iron plate",
    image: "/assets/products/weight-plates/cast-iron/cast-iron-weight-plate-main.webp",
    copy: "A classic cast iron weight plate with raised weight markings and grip openings for commercial gyms, home gyms, and wholesale strength equipment programs.",
    material: "Cast iron plate body with textured black surface, raised KG/LB markings, grip openings, and a standard center hole for barbell loading.",
    process: "Manufacturing includes iron casting, edge cleaning, surface treatment, marking inspection, center hole checking, and protective export packing.",
    features: ["Raised KG/LB weight markings", "Grip openings for easier handling", "Classic black cast iron appearance"],
    applications: ["Commercial gym plate racks", "Home gym barbell stations", "Distributor basic strength equipment lines"],
    oemOptions: ["Custom molded logo", "KG or LB marking plans", "Surface finish options", "Bulk carton and pallet packing"],
    buyerNotes: "Best for buyers who need durable commercial gym plates with a traditional cast iron look, practical handling, and cost-effective wholesale supply."
  },
  {
    slug: "seven-hole-cast-iron-plate",
    name: "Seven-Hole Cast Iron Plate",
    range: "KG/LB seven-hole plate sets",
    type: "Seven-hole cast iron plate",
    image: "/assets/products/weight-plates/seven-hole-cast-iron/seven-hole-cast-iron-plate-main.webp",
    copy: "A seven-hole cast iron plate with multiple grip openings for easier handling, gym plate storage, and commercial barbell training areas.",
    material: "Cast iron plate body with textured black surface, seven grip openings, raised molded markings, and a standard center hole for barbell loading.",
    process: "Manufacturing includes iron casting, grip opening finishing, edge cleaning, surface coating, weight marking review, and export packing.",
    features: ["Seven-hole grip design for easier handling", "Textured black cast iron surface", "Raised molded weight and brand markings"],
    applications: ["Commercial gym plate racks", "Home gym barbell stations", "Wholesale strength equipment programs"],
    oemOptions: ["Custom molded logo", "KG or LB markings", "Surface finish planning", "Bulk carton and pallet packing"],
    buyerNotes: "Best for buyers who need practical commercial gym plates with better handling, traditional cast iron durability, and flexible OEM supply."
  },
  {
    slug: "spray-weight-plate",
    name: "Spray Weight Plate",
    range: "Custom gym plate sets",
    type: "Spray finish plate",
    image: `${basePath}/spray-weight-plate.webp`,
    copy: "A spray finish plate style for buyers who prefer a traditional iron-plate appearance with visible molded details.",
    material: "Cast plate body with spray surface treatment and machined center opening.",
    process: "Manufacturing includes casting, edge cleaning, spray surface treatment, center hole review, and final appearance inspection.",
    features: ["Traditional iron plate look", "Visible molded plate design", "Good for basic gym supply"],
    applications: ["Commercial gym plate racks", "Home gym starter sets", "Regional wholesale channels"],
    oemOptions: ["Custom molded logo", "Surface color planning", "KG/LB markings", "Bulk export packing"],
    buyerNotes: "A direct choice for buyers comparing simple commercial gym plates with cost-conscious project requirements."
  },
  {
    slug: "tpu-olympic-plate",
    name: "TPU Olympic Plate",
    range: "KG plate sets",
    type: "TPU Olympic plate",
    image: `${basePath}/tpu-olympic-plate.webp`,
    copy: "A TPU Olympic plate with a structured profile for commercial buyers who need a durable and clean plate line.",
    material: "TPU coated plate body with steel insert and molded grip-style profile.",
    process: "Production covers material selection, plate molding, TPU surface finishing, durability testing, and shipment inspection.",
    features: ["TPU surface protection", "Structured grip profile", "Premium commercial appearance"],
    applications: ["Commercial gym strength zones", "Hotel and apartment gyms", "Premium dealer product lines"],
    oemOptions: ["Custom logo", "Color detail options", "Weight mark customization", "Pallet packing"],
    buyerNotes: "A stronger option for buyers who want a cleaner finish than basic rubber and a more premium gym equipment supplier offer."
  },
  {
    slug: "star-tpu-plate",
    name: "Star TPU Plate",
    range: "Custom color plate sets",
    type: "Decorative TPU plate",
    image: `${basePath}/star-tpu-plate.webp`,
    copy: "A distinctive TPU plate style for brand-focused gym spaces that need a strong visual identity in the free weight area.",
    material: "TPU coated plate with colored graphic details and Olympic center opening.",
    process: "Manufacturing includes surface color control, graphic detail review, plate flatness check, and packaging protection.",
    features: ["Distinctive star visual design", "Color-based size recognition", "Good for showroom and retail display"],
    applications: ["Commercial gym themed zones", "Home gym product sets", "Fitness retail and dealer displays"],
    oemOptions: ["Brand color matching", "Custom graphic direction", "Private label marks", "Retail-friendly packaging"],
    buyerNotes: "A good fit for distributors who want a plate product that stands out visually instead of looking like a standard black plate."
  },
  {
    slug: "cpu-grip-plate",
    name: "CPU Grip Plate",
    range: "KG/LB grip plate programs",
    type: "CPU grip plate",
    image: `${basePath}/cpu-grip-plate.webp`,
    copy: "A CPU grip plate designed for easier handling, plate loading, and commercial gym floor organization.",
    material: "CPU coated plate with molded hand-grip openings and reinforced center insert.",
    process: "The manufacturing process includes molded grip shaping, insert positioning, surface finishing, and grip-edge inspection.",
    features: ["Multiple grip openings", "Easy handling on racks", "Suitable for frequent commercial use"],
    applications: ["Commercial gym plate stations", "Home gym barbell training", "Gym chain procurement"],
    oemOptions: ["Logo placement", "Color accents", "KG/LB marking system", "Container order packing"],
    buyerNotes: "Best for buyers who prioritize handling comfort and safer plate movement in commercial gym plates."
  },
  {
    slug: "pu-grip-plate",
    name: "PU Grip Plate",
    range: "Commercial plate sets",
    type: "PU grip plate",
    image: `${basePath}/pu-grip-plate.webp`,
    copy: "A PU grip plate for buyers who need a higher-end surface finish and practical handling for strength training areas.",
    material: "PU coated plate body with grip openings and a fitted steel center insert.",
    process: "Produced with PU surface control, grip-area finishing, center insert alignment, durability testing, and export inspection.",
    features: ["Premium PU finish", "Grip openings for easy movement", "Strong showroom appearance"],
    applications: ["Premium commercial gyms", "Home gym upgrade packages", "Dealer showroom plate lines"],
    oemOptions: ["Custom logo", "Color detail planning", "Private label packaging", "Market-specific markings"],
    buyerNotes: "A better match for buyers comparing premium plates and long-term brand presentation."
  },
  {
    slug: "pu-color-plate",
    name: "PU Color Plate",
    range: "Color plate sets",
    type: "PU color plate",
    image: `${basePath}/pu-color-plate.webp`,
    copy: "A color PU plate option for buyers who want a premium appearance and simple weight identification in gym layouts.",
    material: "PU coated plate with colored body design and Olympic center insert.",
    process: "Manufacturing includes PU material preparation, color matching, molding, weight inspection, and surface review.",
    features: ["Clean PU surface", "Color identification", "Suitable for premium project supply"],
    applications: ["Commercial gym training zones", "Home gym premium sets", "Distributor private label programs"],
    oemOptions: ["Custom color palette", "Logo and weight mark planning", "KG/LB options", "Export carton design"],
    buyerNotes: "A strong choice when the buyer wants weight plates that feel more premium and easier to organize by color."
  },
  {
    slug: "cpu-mini-bumper-plate",
    name: "CPU Mini Bumper Plate",
    range: "Light LB/KG plate sets",
    type: "Mini bumper plate",
    image: `${basePath}/cpu-mini-bumper-plate.webp`,
    copy: "A compact mini bumper plate style for lighter training, starter sets, and retail-friendly strength equipment programs.",
    material: "CPU plate body with compact diameter and reinforced center ring.",
    process: "Production focuses on compact plate molding, center hole accuracy, finish consistency, and small-plate packaging.",
    features: ["Compact size", "Useful for lighter loading", "Easy to combine with starter equipment kits"],
    applications: ["Home gym starter sets", "Studio training areas", "Retail fitness packages"],
    oemOptions: ["Custom logo", "Lightweight range planning", "Retail carton labels", "Mixed product sets"],
    buyerNotes: "Best for buyers building lighter plate programs rather than full heavy commercial plate ranges."
  },
  {
    slug: "rubber-olympic-plate",
    name: "Rubber Olympic Plate",
    range: "Olympic barbell plate sets",
    type: "Rubber Olympic plate",
    image: `${basePath}/rubber-olympic-plate.webp`,
    copy: "A simple rubber Olympic plate for everyday barbell training and basic commercial gym supply.",
    material: "Rubber covered Olympic plate with central metal insert for stable bar loading.",
    process: "Manufacturing includes rubber covering, center hole finishing, weight check, surface cleaning, and carton packing.",
    features: ["Standard Olympic center", "Black rubber finish", "Suitable for repeat gym use"],
    applications: ["Commercial gym barbell areas", "Home gym strength rooms", "Wholesale mixed plate orders"],
    oemOptions: ["Embossed logo", "Weight marking options", "KG/LB sets", "Pallet shipment planning"],
    buyerNotes: "A practical base product for buyers who need reliable plate supply without complex decoration."
  },
  {
    slug: "pu-plate-set",
    name: "PU Plate Set",
    range: "LB/KG set planning",
    type: "PU plate set",
    image: `${basePath}/pu-plate-set.webp`,
    copy: "A PU plate set for buyers planning a coordinated plate range with a cleaner and more premium product feel.",
    material: "PU coated plates with fitted inserts and visible weight identification.",
    process: "The process includes PU coating control, insert inspection, plate matching, finish review, and set packing.",
    features: ["Coordinated plate set appearance", "Premium finish feel", "Good for branded plate lines"],
    applications: ["Commercial gym full plate zones", "Home gym complete sets", "Distributor showroom programs"],
    oemOptions: ["Set packaging", "Logo placement", "Custom color details", "Destination-market markings"],
    buyerNotes: "Good for buyers sourcing complete plate sets rather than single replacement plates."
  },
  {
    slug: "rubber-bumper-plate",
    name: "Rubber Bumper Plate",
    range: "Training bumper plate sets",
    type: "Rubber bumper plate",
    image: `${basePath}/rubber-bumper-plate.webp`,
    copy: "A rubber bumper plate style for functional training, Olympic lifting areas, and durable gym project supply.",
    material: "Rubber bumper plate material with steel center insert and color speckle design options.",
    process: "Production includes rubber material preparation, plate pressing, insert fitting, durability testing, and shipment packing.",
    features: ["Bumper plate structure", "Color speckle visual options", "Suitable for training floor impact use"],
    applications: ["Commercial gym lifting zones", "Home gym barbell areas", "Functional training studios"],
    oemOptions: ["Logo customization", "Color speckle options", "KG/LB markings", "Export pallet packing"],
    buyerNotes: "A strong option for buyers looking for a bumper plates factory China partner with flexible custom details."
  },
  {
    slug: "four-grip-cpu-plate",
    name: "Four-Grip CPU Plate",
    range: "KG/LB grip plate planning",
    type: "Four-grip CPU plate",
    image: `${basePath}/four-grip-cpu-plate.webp`,
    copy: "A four-grip CPU plate designed for easy loading, comfortable handling, and organized commercial gym plate storage.",
    material: "CPU coated plate with four grip openings and reinforced Olympic center.",
    process: "Manufacturing covers grip profile molding, surface finish control, center insert fitting, and final packing review.",
    features: ["Four handling openings", "Easy movement between bar and rack", "Modern gym-floor appearance"],
    applications: ["Commercial gym free weight areas", "Home gym barbell setups", "Gym chain plate replacement programs"],
    oemOptions: ["Private logo", "Custom weight mark style", "Color accent planning", "Mixed container supply"],
    buyerNotes: "A useful choice for projects where plate handling and user experience are important purchase factors."
  }
];

export function getWeightPlateProduct(slug: string) {
  return weightPlateProducts.find((product) => product.slug === slug);
}
