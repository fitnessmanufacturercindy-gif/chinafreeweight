import { retiredRacksBenchesCategoryPaths } from "./retired-racks-benches-paths.mjs";
import type { ContentEntity } from "./types";

export { retiredRacksBenchesCategoryPaths };

export function isRetiredRacksBenchesId(id: string) {
  return id === "racks-benches-category" || id.startsWith("product:racks:");
}

export function isRetiredRacksBenchesPath(path?: string) {
  return Boolean(path && (
    retiredRacksBenchesCategoryPaths.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)) ||
    /\/(?:cable-crossover-machine|six-column-functional-trainer|smith-squat-frame)\/?$/.test(path)
  ));
}

export function isRetiredRacksBenchesEntity(entity: ContentEntity) {
  if (isRetiredRacksBenchesId(entity.id)) return true;
  return Object.values(entity.versions).some((version) => isRetiredRacksBenchesPath(version?.publicPath));
}
