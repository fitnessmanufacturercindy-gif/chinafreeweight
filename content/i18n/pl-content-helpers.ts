import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const polishEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-redakcja-pl",
  name: "Zespół redakcyjny PowerBaseFit",
  kind: "Organization",
  role: "Treści techniczne B2B dla rynku polskiego"
};

export const polishTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-produkcja-jakosc-pl",
  name: "Zespół produkcji i kontroli jakości PowerBaseFit",
  kind: "Organization",
  role: "Weryfikacja produkcji, jakości i eksportu"
};

export const plText = (id: string, heading: string, ...paragraphs: string[]): ContentBlock => ({
  id,
  type: "rich_text",
  heading,
  content: paragraphs.join("\n\n")
});

export const plAnswer = (id: string, heading: string, content: string): ContentBlock => ({
  id,
  type: "custom",
  heading,
  content,
  data: { component: "quick-answer" }
});

export const plDefinition = (id: string, term: string, content: string): ContentBlock => ({
  id,
  type: "custom",
  heading: `Definicja — ${term}`,
  content,
  data: { component: "definition", term }
});

export const plTable = (id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock => ({
  id,
  type: "specifications",
  heading,
  data: { columns, rows, caption }
});

export const plChecklist = (id: string, heading: string, items: string[]): ContentBlock => ({
  id,
  type: "features",
  heading,
  data: { items }
});
