import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const dutchEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-redactie-nl",
  name: "PowerBaseFit redactieteam",
  kind: "Organization",
  role: "B2B-fitnessapparatuur en internationale inkoop"
};
export const dutchTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-productie-kwaliteit-nl",
  name: "PowerBaseFit productie- en kwaliteitsteam",
  kind: "Organization",
  role: "Technische controle van productie, QC en exportverpakking"
};

export function nlText(id: string, heading: string, ...paragraphs: string[]): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n") };
}

export function nlAnswer(id: string, heading: string, content: string): ContentBlock {
  return { id, type: "custom", heading, content, data: { component: "quick-answer" } };
}

export function nlDefinition(id: string, term: string, definition: string): ContentBlock {
  return { id, type: "custom", heading: `Definitie — ${term}`, content: definition, data: { component: "definition", term } };
}

export function nlTable(id: string, heading: string, columns: string[], rows: string[][]): ContentBlock {
  return { id, type: "specifications", heading, data: { columns, rows } };
}

export function nlChecklist(id: string, heading: string, items: string[]): ContentBlock {
  return { id, type: "features", heading, data: { items } };
}
