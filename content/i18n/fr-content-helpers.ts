import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const frenchEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-redaction-fr",
  name: "Rédaction technique PowerBaseFit",
  kind: "Organization",
  role: "Contenus B2B sur les équipements de musculation",
  url: "/fr/usine"
};

export const frenchTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-qualite-fr",
  name: "Équipe production et qualité PowerBaseFit",
  kind: "Organization",
  role: "Relecture fabrication et contrôle qualité",
  url: "/fr/usine"
};

export function frenchImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/images-fr/${encodedSource}/${slug}-equipement-${index + 1}.${extension}`;
}

export function frText(id: string, heading: string, ...paragraphs: string[]): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n") };
}

export function frAnswer(id: string, heading: string, text: string): ContentBlock {
  return { id, type: "custom", heading, content: text, data: { component: "quick-answer" } };
}

export function frDefinition(id: string, term: string, text: string): ContentBlock {
  return { id, type: "custom", heading: "Définition", content: text, data: { component: "definition", term } };
}

export function frTable(id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock {
  return { id, type: "specifications", heading, data: { columns, rows, caption } };
}

export function frChecklist(id: string, heading: string, items: string[]): ContentBlock {
  return { id, type: "features", heading, data: { items } };
}
