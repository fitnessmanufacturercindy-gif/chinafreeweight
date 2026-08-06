export const coreDumbbellSlugs = [
  "twelve-sided-steel-dumbbell",
  "cast-iron-dumbbell",
  "chrome-dumbbell",
  "classic-rubber-round-dumbbell",
  "cpu-dumbbell-kg",
  "cpu-square-dumbbell-kg",
  "adjustable-dumbbell-kg",
  "hex-dumbbell-kg",
  "pu-dumbbell-kg",
  "tpu-dumbbell-kg"
] as const;

export const coreWeightPlateSlugs = [
  "cpu-bumper-plate",
  "cpu-color-bumper-plate",
  "rubber-weight-plate",
  "rubber-barbell-plate",
  "full-rubber-barbell-plate",
  "black-competition-plate",
  "solid-steel-barbell-plate",
  "rubber-competition-bumper-plate",
  "cast-iron-weight-plate",
  "rubber-bumper-plate"
] as const;

export const coreProductConversionSelection = [
  ...coreDumbbellSlugs.map((slug) => ({ category: "Dumbbells" as const, slug })),
  ...coreWeightPlateSlugs.map((slug) => ({ category: "Weight Plates" as const, slug }))
];

const coreDumbbellSet = new Set<string>(coreDumbbellSlugs);
const coreWeightPlateSet = new Set<string>(coreWeightPlateSlugs);

export function isCoreConversionProduct(category: "Dumbbells" | "Weight Plates", slug: string) {
  return category === "Dumbbells"
    ? coreDumbbellSet.has(slug)
    : coreWeightPlateSet.has(slug);
}
