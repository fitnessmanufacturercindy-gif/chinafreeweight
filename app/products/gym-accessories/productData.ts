export type GymAccessoryProduct = {
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

const basePath = "/assets/products/gym-accessories";

export const gymAccessoryProducts: GymAccessoryProduct[] = [
  {
    slug: "vinyl-kettlebell",
    name: "Vinyl Kettlebell",
    range: "4 kg to 22 kg planning",
    type: "Kettlebell",
    image: `${basePath}/vinyl-kettlebell.jpg`,
    copy: "A vinyl kettlebell line for studio training, home fitness, retail packs, and colorful gym accessory programs.",
    material: "Cast core with vinyl surface coating, molded handle, and color options for easy weight recognition.",
    process: "Production includes core forming, surface coating, handle inspection, weight checking, and carton packing.",
    features: ["Colorful vinyl surface", "Comfortable molded handle", "Good for retail and studio accessory lines"],
    applications: ["Home fitness kits", "Studio training zones", "Distributor add-on accessory programs"],
    oemOptions: ["Custom color", "Logo mark", "KG or LB weight planning", "Retail carton packaging"],
    buyerNotes: "Best for buyers who need light-to-mid range kettlebells with strong shelf display and simple OEM options."
  },
  {
    slug: "cast-iron-kettlebell",
    name: "Cast Iron Kettlebell",
    range: "4 kg to 32 kg planning",
    type: "Kettlebell",
    image: `${basePath}/cast-iron-kettlebell.jpg`,
    copy: "A cast iron kettlebell for commercial gym accessory zones, functional training areas, and wholesale strength programs.",
    material: "Cast iron body with coated surface, stable base, and integrated handle for daily training use.",
    process: "Manufacturing covers casting, handle smoothing, surface treatment, weight inspection, and export packing.",
    features: ["Durable cast iron body", "Stable base for gym-floor storage", "Suitable for repeated commercial use"],
    applications: ["Commercial gym functional zones", "Home gym strength training", "Fitness distributor programs"],
    oemOptions: ["Custom logo", "Surface color options", "KG or LB markings", "Bulk carton and pallet packing"],
    buyerNotes: "Best for buyers who need a durable gym accessories manufacturer supply item for repeated strength training use."
  },
  {
    slug: "competition-kettlebell",
    name: "Competition Kettlebell",
    range: "4 kg to 24 kg planning",
    type: "Competition kettlebell",
    image: `${basePath}/competition-kettlebell.jpg`,
    copy: "A competition kettlebell series with bright colors for functional training, studio classes, and branded accessory lines.",
    material: "Steel competition-style kettlebell body with smooth handle, color finish, and visible weight identification.",
    process: "Production includes body forming, handle finishing, color coating, weight checking, and protective packing.",
    features: ["Competition-style shape", "Color-coded weight system", "Clean look for studio and showroom display"],
    applications: ["Functional training studios", "Commercial gym kettlebell racks", "Retail and private label programs"],
    oemOptions: ["Custom color set", "Logo placement", "KG/LB marking options", "Export carton labels"],
    buyerNotes: "A good option for buyers who want a more premium kettlebell line for group training and accessory bundles."
  },
  {
    slug: "six-side-cable-handle",
    name: "Six-Side Cable Handle",
    range: "Commercial cable machine attachment",
    type: "Cable attachment",
    image: `${basePath}/six-side-cable-handle.jpg`,
    copy: "A six-side cable handle attachment for gym cable stations, strength machines, and mixed accessory orders.",
    material: "Electroplated steel construction with welded handle sections and machine attachment ends.",
    process: "Production includes steel forming, welding, polishing, electroplating, load inspection, and carton packing.",
    features: ["Multi-grip handle shape", "Electroplated finish", "Suitable for commercial cable stations"],
    applications: ["Commercial gym cable machines", "Strength training accessory sets", "Distributor mixed container orders"],
    oemOptions: ["Handle finish options", "Logo tag or packaging label", "Grip detail planning", "Bulk packing"],
    buyerNotes: "Best for buyers who need cable attachments as add-on products for gym equipment supply programs."
  },
  {
    slug: "tetragonal-cable-handle",
    name: "Tetragonal Cable Handle",
    range: "Commercial cable attachment",
    type: "Cable attachment",
    image: `${basePath}/tetragonal-cable-handle.jpg`,
    copy: "A tetragonal cable handle attachment for lat pulldown, rowing, and commercial strength machine accessory programs.",
    material: "Steel tube and handle construction with electroplated surface and reinforced connection points.",
    process: "Manufacturing includes tube cutting, welding, polishing, electroplating, load inspection, and packing review.",
    features: ["Four-sided handle structure", "Electroplated commercial finish", "Designed for machine attachment use"],
    applications: ["Cable crossover stations", "Lat pulldown and rowing machines", "Commercial gym accessory replacement"],
    oemOptions: ["Custom finish", "Packaging label", "Grip size confirmation", "Mixed accessory carton packing"],
    buyerNotes: "Best for buyers who source commercial gym accessories together with racks, plates, and strength machines."
  },
  {
    slug: "rubber-coated-gym-handle-sets",
    name: "Rubber Coated Gym Handle Sets",
    range: "Multiple grip shapes for cable stations",
    type: "Gym handles",
    image: `${basePath}/handles/rubber-coated-gym-handle-sets.webp`,
    copy: "A rubber coated gym handle set for commercial cable machines, lat stations, rowing stations, and accessory replacement programs.",
    material: "Steel inner structure with black rubber coating, rounded grip edges, hanging eyelets, and multiple handle widths for different cable movements.",
    process: "Production includes steel forming, welding, surface preparation, rubber coating, eyelet inspection, grip finish review, and carton packing.",
    features: ["Rubber coated contact surface", "Multiple handle widths", "Comfortable grip for repeated cable training"],
    applications: ["Commercial cable machine areas", "Personal training studios", "Distributor cable attachment sets"],
    oemOptions: ["Custom set combination", "Logo or label packaging", "Grip color review", "Bulk carton packing"],
    buyerNotes: "Best for buyers who need durable cable attachments with a softer grip feel for high-frequency commercial gym use."
  },
  {
    slug: "aluminum-gym-handles",
    name: "Aluminum Gym Handles",
    range: "Lightweight cable handle attachments",
    type: "Gym handles",
    image: `${basePath}/handles/aluminum-gym-handles.webp`,
    copy: "A lightweight aluminum gym handle range for cable machines, functional trainers, and strength training accessory bundles.",
    material: "Aluminum alloy handle bodies with polished finish, knurled or smooth grip areas, and cable machine connection points.",
    process: "Manufacturing covers material cutting, CNC shaping where required, polishing, grip finishing, connection point inspection, and protective packing.",
    features: ["Lightweight aluminum construction", "Clean polished appearance", "Good for premium accessory display"],
    applications: ["Functional trainer stations", "Boutique gym accessory walls", "Premium home gym cable systems"],
    oemOptions: ["Surface finish planning", "Custom packaging", "Logo tag or carton label", "Mixed handle set supply"],
    buyerNotes: "Best for buyers who want fitness accessories with a lighter hand feel and a premium showroom look."
  },
  {
    slug: "solid-steel-gym-handles",
    name: "Solid Steel Gym Handles",
    range: "Heavy-duty cable handles and bars",
    type: "Cable attachments",
    image: `${basePath}/handles/solid-steel-gym-handles.webp`,
    copy: "A solid steel gym handle and cable bar range for commercial strength equipment, cable crossover stations, and replacement accessory supply.",
    material: "Solid or heavy-wall steel construction with chrome finish, welded brackets, rubber grip sections, and reinforced cable attachment hardware.",
    process: "Production includes steel cutting, bending, welding, polishing, chrome finishing, grip assembly, load inspection, and export packing.",
    features: ["Heavy-duty steel structure", "Chrome finish with rubber grip options", "Designed for commercial cable station use"],
    applications: ["Commercial gym strength zones", "Cable crossover replacement kits", "Distributor mixed accessory containers"],
    oemOptions: ["Chrome or black finish", "Grip style selection", "Custom carton label", "Accessory set planning"],
    buyerNotes: "Best for buyers who prioritize durability, long service life, and strong replacement demand in commercial gym accessories."
  },
  {
    slug: "lat-pulldown-handles",
    name: "Lat Pulldown Handles",
    range: "Wide, medium, and close grip options",
    type: "Lat pulldown attachment",
    image: `${basePath}/handles/lat-pulldown-handles.webp`,
    copy: "Lat pulldown handles for back training, cable machines, and commercial gym accessory sets that need multiple grip widths.",
    material: "Steel handle frames with rubber coating or chrome finish options, center hanging points, and grip shapes for pulldown movements.",
    process: "Production includes handle forming, welding, coating or polishing, center eyelet checking, grip finish review, and packing confirmation.",
    features: ["Multiple widths for pulldown training", "Stable center connection point", "Rubber coated and steel finish options"],
    applications: ["Lat pulldown machines", "Functional trainer stations", "Commercial back training zones"],
    oemOptions: ["Width set planning", "Grip surface options", "Logo or packaging label", "Mixed accessory cartons"],
    buyerNotes: "Best for buyers building a complete cable attachments line for back training and commercial gym replacement sales."
  },
  {
    slug: "v-handle-attachments",
    name: "V Handle Attachments",
    range: "Close grip row and pulldown use",
    type: "V handle attachment",
    image: `${basePath}/handles/cable-machine-attachments.webp`,
    copy: "V handle attachments for close-grip rows, pulldowns, cable machines, and strength training accessory replacement programs.",
    material: "Steel V-shape construction with chrome finish, welded hanging bracket, and grip options for controlled cable movements.",
    process: "Manufacturing includes steel bending, welding, polishing, electroplating, grip checking, connection inspection, and carton packing.",
    features: ["Close-grip cable movement support", "Compact and easy to store", "Commercial chrome finish"],
    applications: ["Seated row machines", "Lat pulldown stations", "Personal training cable workouts"],
    oemOptions: ["Grip finish options", "Logo label packaging", "Set combination planning", "Bulk export cartons"],
    buyerNotes: "Best for buyers who need fast-moving cable attachments with broad use in gyms, studios, and home gym cable systems."
  },
  {
    slug: "straight-bar-cable-attachments",
    name: "Straight Bar Cable Attachments",
    range: "Straight and curl bar cable options",
    type: "Cable bar attachment",
    image: `${basePath}/handles/solid-steel-gym-handles.webp`,
    copy: "Straight bar cable attachments for biceps, triceps, pulldown, and rowing movements in commercial cable machine areas.",
    material: "Chrome finished steel bar construction with cable swivel bracket, knurled or rubber grip sections, and protective end caps.",
    process: "Production includes bar cutting, bending where required, polishing, bracket assembly, surface finish inspection, and packing checks.",
    features: ["Straight and curved cable bar options", "Chrome finish for easy cleaning", "Compatible with standard cable stations"],
    applications: ["Cable biceps curls", "Triceps pressdowns", "Commercial gym accessory replacement"],
    oemOptions: ["Bar length planning", "Grip material options", "Custom label packaging", "Mixed bar set supply"],
    buyerNotes: "Best for buyers who want essential cable attachments that are easy to bundle with racks, functional trainers, and strength machines."
  },
  {
    slug: "triceps-rope-handles",
    name: "Triceps Rope Handles",
    range: "Single and double rope options",
    type: "Triceps rope",
    image: `${basePath}/handles/cable-machine-attachments.webp`,
    copy: "Triceps rope handles for cable pressdowns, face pulls, rowing variations, and functional strength training accessory sets.",
    material: "Braided rope with rubber end stops, steel hanging connector, and grip design suitable for repeated cable training.",
    process: "Production includes rope cutting, end stop assembly, connector fitting, pull inspection, finish review, and carton packing.",
    features: ["Flexible rope movement", "Rubber end stops", "Useful for triceps, shoulders, and upper-back training"],
    applications: ["Cable pressdown stations", "Functional training areas", "Personal training studio accessory walls"],
    oemOptions: ["Rope length planning", "End cap style options", "Private label packaging", "Accessory bundle supply"],
    buyerNotes: "Best for buyers who need a low-cost, high-demand fitness accessory for commercial gyms and distributor add-on sales."
  },
  {
    slug: "cable-machine-attachments",
    name: "Cable Machine Attachments",
    range: "Mixed handle, bar, and rope accessory sets",
    type: "Cable attachment set",
    image: `${basePath}/handles/cable-machine-attachments.webp`,
    copy: "Cable machine attachments supplied as mixed sets for commercial gym projects, functional trainer orders, and distributor accessory programs.",
    material: "A mixed selection of steel, aluminum, rubber coated, chrome finished, and rope handle attachments for cable machine training.",
    process: "Supply planning includes product matching, surface finish checking, grip review, load inspection where applicable, set packing, and export carton labeling.",
    features: ["Complete mixed attachment set", "Covers rows, pulldowns, curls, pressdowns, and functional movements", "Useful for project-based accessory supply"],
    applications: ["Commercial cable machine zones", "Home gym functional trainers", "Distributor accessory starter packs"],
    oemOptions: ["Custom set list", "Private label carton", "Logo or hangtag options", "Mixed container planning"],
    buyerNotes: "Best for buyers who want one supplier to organize a complete cable attachment program with clear packing and quotation support."
  },
  {
    slug: "tpe-yoga-mat",
    name: "TPE Yoga Mat",
    range: "1830 x 610 x 6 mm planning",
    type: "Yoga and floor training",
    image: `${basePath}/tpe-yoga-mat.jpg`,
    copy: "A TPE yoga mat for home fitness kits, studio floors, retail accessory programs, and gym stretching areas.",
    material: "TPE material with rolled mat structure, textured surface, and color options for retail display.",
    process: "Production includes material extrusion, texture forming, cutting, rolling, size inspection, and retail packing.",
    features: ["Lightweight TPE material", "Multiple color options", "Suitable for stretching and yoga areas"],
    applications: ["Yoga studios", "Home fitness retail kits", "Commercial gym stretching zones"],
    oemOptions: ["Custom color", "Logo printing", "Size planning", "Retail strap or carton packaging"],
    buyerNotes: "Best for buyers who need high-volume fitness accessories supplier options for retail and studio channels."
  },
  {
    slug: "vipr-training-tube",
    name: "VIPR Training Tube",
    range: "4 kg, 6 kg, 8 kg, 10 kg, 12 kg planning",
    type: "Functional training tool",
    image: `${basePath}/vipr-training-tube.jpg`,
    copy: "A VIPR-style training tube for functional training, group classes, conditioning programs, and accessory bundles.",
    material: "Durable molded tube body with grip openings and color-coded weight options.",
    process: "Production includes molding, surface finishing, weight confirmation, color review, and carton packing.",
    features: ["Color-coded weight range", "Multiple grip positions", "Useful for full-body functional training"],
    applications: ["Functional training studios", "Commercial gym group classes", "Home fitness accessory kits"],
    oemOptions: ["Custom color", "Logo mark", "Weight range planning", "Retail carton packaging"],
    buyerNotes: "Best for buyers who want functional training accessories that add variety beyond standard free weights."
  },
  {
    slug: "yoga-ball",
    name: "Yoga Ball",
    range: "55 cm, 65 cm, 75 cm planning",
    type: "Balance and mobility",
    image: `${basePath}/yoga-ball.jpg`,
    copy: "A yoga ball for balance training, mobility work, Pilates, physical training, and home fitness accessory sets.",
    material: "PVC ball material with textured surface options and multiple diameter planning.",
    process: "Production includes material forming, inflation test, surface inspection, size checking, and retail packing.",
    features: ["Multiple diameter options", "Good for balance and mobility training", "Color options for retail programs"],
    applications: ["Home fitness kits", "Pilates and yoga studios", "Commercial gym mobility zones"],
    oemOptions: ["Custom color", "Logo printing", "Size range planning", "Pump and carton options"],
    buyerNotes: "Best for buyers who need simple gym accessories for broad home fitness and wellness demand."
  },
  {
    slug: "bosu-ball",
    name: "Bosu Ball",
    range: "58 cm diameter planning",
    type: "Balance trainer",
    image: `${basePath}/bosu-ball.jpg`,
    copy: "A Bosu ball balance trainer for stability training, core workouts, rehabilitation areas, and gym accessory programs.",
    material: "Inflatable dome with rigid base, resistance cord connection points, and anti-slip training surface.",
    process: "Production includes dome molding, base assembly, inflation inspection, accessory matching, and protective packing.",
    features: ["Balance and core training support", "Dome and base structure", "Optional resistance cord accessories"],
    applications: ["Commercial gym core areas", "Studio balance training", "Rehabilitation and mobility spaces"],
    oemOptions: ["Color planning", "Logo placement", "Cord accessory set options", "Export carton packing"],
    buyerNotes: "Best for buyers who need a functional gym accessory that supports balance, core, and group training."
  },
  {
    slug: "aerobic-step",
    name: "Aerobic Step",
    range: "1100 x 430 x 210 mm planning",
    type: "Step platform",
    image: `${basePath}/aerobic-step.jpg`,
    copy: "An aerobic step platform for group training, cardio classes, studio programs, and commercial gym accessory supply.",
    material: "Plastic platform with anti-slip top surface, adjustable support base, and color detail options.",
    process: "Production includes injection molding, surface texture inspection, load testing, assembly review, and carton packing.",
    features: ["Anti-slip top platform", "Stable support base", "Suitable for group cardio classes"],
    applications: ["Commercial gym group studios", "Home cardio training", "Fitness retail accessory programs"],
    oemOptions: ["Custom color", "Logo mark", "Height and size planning", "Retail carton packaging"],
    buyerNotes: "Best for buyers who need gym accessories for cardio classes, studio equipment supply, and retail channels."
  },
  {
    slug: "compact-aerobic-step",
    name: "Compact Aerobic Step",
    range: "1010 x 390 x 210 mm planning",
    type: "Step platform",
    image: `${basePath}/compact-aerobic-step.jpg`,
    copy: "A compact aerobic step platform for home fitness, studio classes, and lightweight commercial accessory programs.",
    material: "Plastic step body with anti-slip top surface and compact support structure.",
    process: "Manufacturing includes injection molding, texture review, load testing, base assembly, and export carton packing.",
    features: ["Compact platform size", "Anti-slip surface", "Easy to store and ship"],
    applications: ["Home fitness cardio programs", "Studio step classes", "Distributor accessory bundles"],
    oemOptions: ["Custom color", "Logo printing", "Retail carton design", "Bulk shipment packing"],
    buyerNotes: "Best for buyers who want a smaller step product with easier storage, retail handling, and mixed container supply."
  }
];

export function getGymAccessoryProduct(slug: string) {
  return gymAccessoryProducts.find((product) => product.slug === slug);
}
