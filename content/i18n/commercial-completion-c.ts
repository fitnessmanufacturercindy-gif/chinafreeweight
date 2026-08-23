import type { ContentManifest } from "../../lib/content/types";

export const commercialCompletionCSelections: Array<{ slug: string }> = [];

export function withCommercialCompletionC(manifest: ContentManifest): ContentManifest {
  return manifest;
}
