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
