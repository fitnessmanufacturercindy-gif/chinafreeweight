import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const swedishEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-redaktion-sv",
  name: "PowerBaseFits tekniska redaktion",
  kind: "Organization",
  role: "B2B-inköp och produktdata för gymutrustning",
  url: "/sv/fabrik"
};

export const swedishTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-kvalitet-sv",
  name: "PowerBaseFits produktions- och kvalitetsteam",
  kind: "Organization",
  role: "Faktagranskning av tillverkning och kvalitetskontroll",
  url: "/sv/fabrik"
};

export function swedishImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/bilder-sv/${encodedSource}/${slug}-gymutrustning-${index + 1}.${extension}`;
}

export const svText = (id: string, heading: string, ...paragraphs: string[]): ContentBlock => ({ id, type: "rich_text", heading, content: paragraphs.join("\n\n") });
export const svAnswer = (id: string, heading: string, content: string): ContentBlock => ({ id, type: "custom", heading, content, data: { component: "quick-answer" } });
export const svDefinition = (id: string, term: string, content: string): ContentBlock => ({ id, type: "custom", heading: "Definition", content, data: { component: "definition", term } });
export const svTable = (id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock => ({ id, type: "specifications", heading, data: { columns, rows, caption } });
export const svChecklist = (id: string, heading: string, items: string[]): ContentBlock => ({ id, type: "features", heading, data: { items } });
