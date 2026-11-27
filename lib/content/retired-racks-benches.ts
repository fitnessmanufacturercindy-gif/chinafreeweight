import type { ContentEntity } from "./types";

export function isRetiredRacksBenchesId(id: string) {
  return id === "racks-benches-category" || id.startsWith("product:racks:");
}

const retiredRacksBenchesPathFragments = [
  "/products/racks-benches",
  "/pt/produtos/racks-e-bancos",
  "/es/productos/racks-y-bancos",
  "/de/produkte/racks-hantelbaenke",
  "/fr/produits/racks-bancs",
  "/vi/san-pham/khung-ghe-tap",
  "/pl/produkty/stojaki-lawki",
  "/id/produk/rak-bangku",
  "/it/prodotti/rack-panche",
  "/ko/products/racks-benches",
  "/nl/producten/racks-banken",
  "/sv/produkter/rack-bank"
];

export function isRetiredRacksBenchesPath(path?: string) {
  return Boolean(path && (
    retiredRacksBenchesPathFragments.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)) ||
    /\/(?:cable-crossover-machine|six-column-functional-trainer|smith-squat-frame)\/?$/.test(path)
  ));
}

export function isRetiredRacksBenchesEntity(entity: ContentEntity) {
  if (isRetiredRacksBenchesId(entity.id)) return true;
  return Object.values(entity.versions).some((version) => isRetiredRacksBenchesPath(version?.publicPath));
}
