export type RacksBenchesProduct = {
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

const basePath = "/assets/products/racks-benches";

function product(
  slug: string,
  name: string,
  type: string,
  range: string,
  copy: string,
  features: string[],
  applications: string[],
  oemOptions: string[] = [
    "Custom frame color",
    "Logo plate or brand panel",
    "Attachment package selection",
    "Export packing support"
  ]
): RacksBenchesProduct {
  return {
    slug,
    name,
    type,
    range,
    image: `${basePath}/${slug}.webp`,
    copy,
    material:
      "Heavy-duty steel frame, precision-drilled uprights, reinforced welding points, durable powder coating, chrome sleeves or guide rods where required, and commercial-grade hardware.",
    process:
      "Production includes steel cutting, hole positioning, welding, surface polishing, powder coating, assembly checks, cable or guide-rail testing when applicable, and packing inspection before shipment.",
    features,
    applications,
    oemOptions,
    buyerNotes:
      "Suitable for distributors, gym project buyers, and home gym equipment brands that need stable supply, custom appearance, and complete home gym or commercial strength-zone planning."
  };
}

export const racksBenchesProducts: RacksBenchesProduct[] = [
  product(
    "private-home-gym-rack-system",
    "Private Home Gym Rack System",
    "Project Solution",
    "Complete rack, bench, cable, dumbbell, and storage setup",
    "A complete private home gym solution for premium residential fitness spaces, combining rack training, cable work, bench use, dumbbell storage, and custom visual identity.",
    ["Complete private room layout", "Rack, cable, bench, and free weight planning", "High-end home gym presentation"],
    ["Luxury home gym", "Private training room", "Premium villa fitness space"],
    ["Room-based layout planning", "Logo and brand panel", "Frame and pad color customization", "Matched dumbbells, plates, bars, and accessories"]
  ),
  product(
    "power-rack-functional-trainer",
    "Power Rack Functional Trainer",
    "Functional Trainer",
    "Rack, cable system, pull-up, and plate storage",
    "An all-in-one rack system for home gym and commercial strength spaces that need cable training, barbell work, pull-up training, and storage in one station.",
    ["Integrated cable training", "Barbell rack support", "Plate and attachment storage"],
    ["Home gym", "Personal training studio", "Commercial gym strength room"],
    ["Custom logo plate", "Frame color matching", "Attachment bundle planning", "Private room layout support"]
  ),
  product(
    "home-gym-functional-trainer",
    "Home Gym Functional Trainer",
    "Home Gym System",
    "Compact trainer for private fitness rooms",
    "A compact home gym functional trainer for private fitness rooms, apartment gyms, and home training spaces that need a clean custom equipment layout.",
    ["Compact footprint", "Cable and bench training", "Designed for private spaces"],
    ["Apartment home gym", "Villa training room", "Premium private fitness space"],
    ["White, black, chrome, or custom color", "Logo panel", "Bench color customization", "Room-matching accessory set"]
  ),
  product(
    "compact-cable-power-rack",
    "Compact Cable Power Rack",
    "Power Rack",
    "Space-saving rack with cable trainer",
    "A compact cable power rack for buyers who want barbell training and functional cable movement without using too much floor space.",
    ["Space-saving design", "Cable training and barbell support", "Good for private rooms"],
    ["Home gym corner layout", "Personal training studio", "Hotel fitness room"]
  ),
  product(
    "dual-pulley-smith-rack",
    "Dual Pulley Smith Rack",
    "All-in-One Rack",
    "Cable pulleys, guided bar training, and rack storage",
    "A dual pulley rack with guided training support for buyers who need cable exercise, rack training, and organized attachments in one product.",
    ["Dual cable pulley use", "Guided bar training support", "Attachment storage on the frame"],
    ["Home gym functional trainer", "Private club strength room", "Compact commercial gym"]
  ),
  product(
    "custom-home-gym-rack",
    "Custom Home Gym Rack",
    "Home Gym Rack",
    "Custom rack for private training rooms",
    "A custom home gym rack for branded private fitness spaces where the buyer needs matching color, logo, storage, and training function.",
    ["Custom private room setup", "Rack and cable training", "Plate and accessory storage"],
    ["Private home gym", "Garage gym", "Boutique personal training room"]
  ),
  product(
    "storage-functional-trainer",
    "Storage Functional Trainer",
    "Custom Trainer",
    "Functional trainer with integrated storage",
    "A storage-focused functional trainer for buyers who want cable training, rack functions, and tidy accessory organization in a premium home gym.",
    ["Integrated storage", "Cable and rack training", "Strong visual customization"],
    ["Branded home gym", "Private training studio", "Premium showroom fitness space"]
  ),
  product(
    "cable-crossover-functional-trainer",
    "Cable Crossover Functional Trainer",
    "Cable Crossover",
    "Dual cable trainer for strength and functional workouts",
    "A cable crossover functional trainer for smooth dual cable movement, rack-style strength training, and custom home gym presentation.",
    ["Dual cable crossover training", "Attachment and plate storage", "Custom color presentation"],
    ["Home gym functional trainer", "Personal training studio", "Commercial cable training zone"]
  ),
  product(
    "adjustable-weight-bench",
    "Adjustable Weight Bench",
    "Bench",
    "Flat, incline, and decline positions",
    "A commercial adjustable bench for dumbbell zones, rack-based training, and home gym equipment packages.",
    ["Multiple backrest angles", "Stable steel frame", "Easy movement with transport wheels"],
    ["Home gym bench station", "Commercial dumbbell area", "Rack and free weight training zone"],
    ["Custom frame color", "Logo plate or upholstery mark", "Pad color selection", "Carton and pallet packing"]
  ),
  product(
    "smith-squat-frame",
    "Smith Squat Frame",
    "Functional Rack",
    "Smith-style rack for barbell strength training",
    "A Smith squat frame for buyers who need a stable barbell station in home gym and commercial strength projects.",
    ["Guided barbell training", "Strong upright structure", "Compact rack footprint"],
    ["Home gym strength room", "Commercial squat area", "Distributor rack line"]
  ),
  product(
    "half-frame-squat-rack",
    "Half Frame Squat Rack",
    "Functional Rack",
    "Open rack for barbell training",
    "A half frame squat rack for buyers who need an open training station with practical safety and storage options.",
    ["Open frame layout", "Barbell support", "Efficient floor use"],
    ["Home gym", "Garage gym", "Commercial free weight zone"]
  ),
  product(
    "cable-cross-functional-trainer",
    "Cable Cross Functional Trainer",
    "Functional Rack",
    "Cable training and rack integration",
    "A cable cross functional trainer for buyers building a complete home gym line with cable exercise and rack training in one system.",
    ["Cable movement", "Rack-style frame", "Attachment support"],
    ["Home gym functional trainer", "Studio strength training", "Commercial cable area"]
  ),
  product(
    "six-column-functional-trainer",
    "Six-Column Functional Trainer",
    "Functional Rack",
    "Large cable and rack training frame",
    "A six-column functional trainer for strength rooms that need more training positions and a stronger commercial visual presence.",
    ["Six-column structure", "Multi-user training potential", "Large project presentation"],
    ["Commercial gym", "Premium training studio", "Distributor showroom"]
  ),
  product(
    "cable-crossover-machine",
    "Cable Crossover Machine",
    "Functional Rack",
    "Dual cable station for functional training",
    "A cable crossover machine for chest, shoulder, back, and functional movement training in home gym or commercial projects.",
    ["Dual cable training", "Smooth handle movement", "Practical attachment setup"],
    ["Commercial gym cable zone", "Home gym cable station", "Personal training studio"]
  ),
  product(
    "full-frame-squat-rack",
    "Full Frame Squat Rack",
    "Functional Rack",
    "Enclosed rack frame for strength training",
    "A full frame squat rack for buyers who need stronger stability, barbell support, and a complete rack footprint.",
    ["Enclosed rack stability", "Pull-up and barbell support", "Storage-ready structure"],
    ["Home gym", "Commercial strength room", "Club free weight area"]
  ),
  product(
    "eight-column-training-rack",
    "Eight-Column Training Rack",
    "Functional Rack",
    "Large comprehensive training rack",
    "An eight-column training rack for buyers planning a larger training zone with rack, cable, storage, and multi-function use.",
    ["Large training structure", "Multiple station planning", "Strong project value"],
    ["Commercial gym", "Training center", "Importer product line"]
  ),
  product(
    "wall-mounted-functional-trainer",
    "Wall Mounted Functional Trainer",
    "Functional Rack",
    "Wall-side cable trainer for compact spaces",
    "A wall mounted functional trainer for compact rooms that need cable training while keeping the floor plan clean.",
    ["Wall-side placement", "Compact cable training", "Space-saving layout"],
    ["Apartment gym", "Hotel fitness room", "Small studio"]
  ),
  product(
    "smith-cable-crossover-machine",
    "Smith Cable Crossover Machine",
    "Functional Rack",
    "Smith rack and cable crossover combination",
    "A Smith cable crossover machine for buyers who want guided bar work and dual cable training in one home gym system.",
    ["Smith and cable combination", "Multi-function training", "Strong home gym value"],
    ["Private home gym", "Personal training studio", "Commercial strength zone"]
  ),
  product(
    "floor-plate-cable-crossover",
    "Floor Plate Cable Crossover",
    "Functional Rack",
    "Cable crossover with stable floor plates",
    "A floor plate cable crossover for buyers who want a stable cable station with a clean professional base design.",
    ["Stable base plate design", "Dual cable movement", "Commercial appearance"],
    ["Commercial gym", "Studio cable area", "Home gym equipment line"]
  ),
  product(
    "smith-machine",
    "Smith Machine",
    "Functional Rack",
    "Guided barbell training station",
    "A Smith machine for guided barbell training, useful for home gym setups, commercial gym projects, and distributor product ranges.",
    ["Guided bar path", "Compact strength station", "Rack-compatible training"],
    ["Home gym", "Commercial gym", "Strength training studio"]
  ),
  product(
    "wall-folding-functional-trainer",
    "Wall Folding Functional Trainer",
    "Functional Rack",
    "Foldable wall trainer for space-saving rooms",
    "A wall folding functional trainer for buyers who need compact storage, cable training, and a space-saving home gym solution.",
    ["Foldable frame", "Wall-side storage", "Compact cable exercise"],
    ["Garage gym", "Apartment gym", "Small private training room"]
  ),
  product(
    "incline-flat-decline-bench",
    "Incline Flat Decline Bench",
    "Adjustable Bench",
    "Incline, flat, and decline training angles",
    "An adjustable bench designed for dumbbell training, rack workouts, and full home gym packages.",
    ["Incline, flat, and decline use", "Stable bench support", "Commercial padding"],
    ["Home gym bench", "Commercial dumbbell area", "Rack package supply"]
  ),
  product(
    "commercial-adjustable-bench",
    "Commercial Adjustable Bench",
    "Adjustable Bench",
    "Multi-angle commercial bench",
    "A multi-angle commercial bench for buyers who need durable bench options for gym projects and rack combinations.",
    ["Multi-angle adjustment", "Heavy-duty frame", "Easy project matching"],
    ["Commercial gym", "Private training room", "Distributor bench line"]
  ),
  product(
    "heavy-duty-adjustable-bench",
    "Heavy Duty Adjustable Bench",
    "Adjustable Bench",
    "Strong adjustable bench for rack training",
    "A heavy-duty adjustable bench for rack-based strength work, free weight training, and higher-use gym environments.",
    ["Strong frame support", "Adjustable backrest", "Rack training compatibility"],
    ["Commercial gym", "Power rack station", "Home gym package"]
  ),
  product(
    "compact-adjustable-bench",
    "Compact Adjustable Bench",
    "Adjustable Bench",
    "Space-efficient adjustable bench",
    "A compact adjustable bench for home gym buyers and studio projects where equipment footprint matters.",
    ["Compact frame", "Adjustable angle use", "Easy matching with racks"],
    ["Home gym", "Small studio", "Hotel fitness room"]
  ),
  product(
    "three-in-one-smith-functional-trainer",
    "Three-in-One Smith Functional Trainer",
    "Smith Functional Trainer",
    "Smith, rack, and cable training in one system",
    "A three-in-one Smith functional trainer for buyers who want guided barbell training, cable movement, and squat rack use in one product.",
    ["Smith training", "Functional cable station", "Squat rack support"],
    ["Home gym functional trainer", "Commercial training room", "Importer strength line"]
  ),
  product(
    "smith-dual-pulley-trainer",
    "Smith Dual Pulley Trainer",
    "Smith Functional Trainer",
    "Smith machine and dual adjustable pulleys",
    "A Smith dual pulley trainer for buyers who need guided bar work and two-sided cable training in a compact rack footprint.",
    ["Dual pulley function", "Guided Smith movement", "Compact all-in-one layout"],
    ["Home gym", "Personal training studio", "Commercial gym project"]
  ),
  product(
    "olympic-bench-plate-storage",
    "Olympic Bench with Plate Storage",
    "Bench & Storage",
    "Olympic bench with integrated plate storage",
    "An Olympic bench with plate storage for buyers building free weight areas with bench press function and organized storage.",
    ["Bench press station", "Integrated plate storage", "Commercial strength layout"],
    ["Commercial gym", "School gym", "Distributor bench package"]
  ),
  product(
    "multi-jungle-functional-trainer",
    "Multi Jungle Functional Trainer",
    "Multi Station Trainer",
    "Multi-station cable training system",
    "A multi jungle functional trainer for larger facilities that need several users training at the same time.",
    ["Multi-station cable training", "Large facility layout", "Commercial gym appearance"],
    ["Commercial gym", "Training center", "Fitness club"]
  ),
  product(
    "single-station-functional-trainer",
    "Single Station Functional Trainer",
    "Single Station Trainer",
    "Compact single-user cable trainer",
    "A single station functional trainer for compact home gym or studio spaces that need cable exercise in a smaller footprint.",
    ["Single-user cable training", "Compact layout", "Easy project placement"],
    ["Home gym", "Personal training studio", "Hotel fitness room"]
  ),
  product(
    "three-station-functional-trainer",
    "Three Station Functional Trainer",
    "Multi Station Trainer",
    "Three-user functional training station",
    "A three station functional trainer for buyers who need more exercise positions while keeping a controlled footprint.",
    ["Three training positions", "Cable and strength functions", "Project-ready structure"],
    ["Commercial gym", "Club training room", "Distributor project supply"]
  ),
  product(
    "five-station-functional-trainer",
    "Five Station Functional Trainer",
    "Multi Station Trainer",
    "Five-station integrated training machine",
    "A five station functional trainer for commercial spaces that need multiple strength movements and stronger member capacity.",
    ["Five-station training", "Commercial user capacity", "Integrated strength functions"],
    ["Commercial gym", "Fitness club", "Training center"]
  ),
  product(
    "multi-jungle-training-system",
    "Multi Jungle Training System",
    "Multi Station Trainer",
    "Large multi-jungle training system",
    "A large multi jungle training system for buyers planning a complete cable training zone for commercial gym projects.",
    ["Large cable training system", "Multi-user layout", "High-value project equipment"],
    ["Commercial gym", "Fitness club", "Distributor showroom"]
  )
];

export function getRacksBenchesProduct(slug: string) {
  return racksBenchesProducts.find((product) => product.slug === slug);
}

