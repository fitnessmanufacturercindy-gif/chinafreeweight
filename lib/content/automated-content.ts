import catalog from "../../content-ops/published/catalog.json";
import type { ContentEntity, ContentManifest } from "./types";

export function getAutomatedContentEntities(): ContentEntity[] {
  const manifest = catalog as ContentManifest;
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.entities)) throw new Error("Invalid automated content catalog.");
  return manifest.entities;
}
