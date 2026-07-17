import type { ContentBlock } from "../../lib/content/types";

export function rich(id: string, heading: string, ...paragraphs: string[]): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n") };
}

export function quick(id: string, answer: string): ContentBlock {
  return { id, type: "custom", heading: "Resposta rápida", content: answer, data: { component: "quick-answer" } };
}

export function definition(id: string, term: string, text: string): ContentBlock {
  return { id, type: "custom", heading: "Definição", content: text, data: { component: "definition", term } };
}

export function table(
  id: string,
  heading: string,
  columns: string[],
  rows: string[][],
  caption?: string
): ContentBlock {
  return { id, type: "specifications", heading, data: { columns, rows, caption } };
}

export function checklist(id: string, heading: string, items: string[]): ContentBlock {
  return { id, type: "features", heading, data: { items } };
}
