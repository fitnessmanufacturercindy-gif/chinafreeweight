import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const germanEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-redaktion-de",
  name: "PowerBaseFit Fachredaktion",
  kind: "Organization",
  role: "B2B-Redaktion für Fitnessstudio-Ausstattung",
  url: "/de/fabrik"
};

export const germanTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-qualitaet-de",
  name: "PowerBaseFit Produktions- und Qualitätsteam",
  kind: "Organization",
  role: "Fachprüfung Fertigung und Qualitätssicherung",
  url: "/de/fabrik"
};

export function germanImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/bilder/${encodedSource}/${slug}-produktbild-${index + 1}.${extension}`;
}

export function textBlock(id: string, heading: string, ...paragraphs: string[]): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n") };
}

export function answerBlock(id: string, heading: string, text: string): ContentBlock {
  return { id, type: "custom", heading, content: text, data: { component: "quick-answer" } };
}

export function definitionBlock(id: string, term: string, text: string): ContentBlock {
  return { id, type: "custom", heading: "Definition", content: text, data: { component: "definition", term } };
}

export function specTable(id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock {
  return { id, type: "specifications", heading, data: { columns, rows, caption } };
}

export function checklistBlock(id: string, heading: string, items: string[]): ContentBlock {
  return { id, type: "features", heading, data: { items } };
}
