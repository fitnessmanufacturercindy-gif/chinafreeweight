import type { ContentManifest } from "../../lib/content/types";

type RetiredCommercialCompletionCSelection = {
  slug: string;
  tier: "A" | "B";
};

/**
 * The former rack/bench completion batch is deliberately empty. Keeping the
 * typed export lets retirement checks prove that no route can be republished
 * accidentally while older smoke-test entry points remain usable.
 */
export const commercialCompletionCSelections: RetiredCommercialCompletionCSelection[] = [];

export function withCommercialCompletionC(manifest: ContentManifest): ContentManifest {
  return manifest;
}
