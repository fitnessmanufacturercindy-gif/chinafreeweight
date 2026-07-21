import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const italianEditorialAuthor: LocalizedAuthor = {
  id: "redazione-tecnica-powerbasefit-it",
  name: "Redazione tecnica PowerBaseFit",
  kind: "Organization",
  role: "Approvvigionamento B2B e dati di prodotto per attrezzature fitness",
  url: "/it/fabbrica"
};

export const italianTechnicalReviewer: LocalizedAuthor = {
  id: "qualita-produzione-powerbasefit-it",
  name: "Team produzione e qualità PowerBaseFit",
  kind: "Organization",
  role: "Revisione tecnica di produzione e controllo qualità",
  url: "/it/fabbrica"
};

export function italianImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/immagini-it/${encodedSource}/${slug}-attrezzatura-palestra-${index + 1}.${extension}`;
}

export const itText = (id: string, heading: string, ...paragraphs: string[]): ContentBlock => ({ id, type: "rich_text", heading, content: paragraphs.join("\n\n") });
export const itAnswer = (id: string, heading: string, content: string): ContentBlock => ({ id, type: "custom", heading, content, data: { component: "quick-answer" } });
export const itDefinition = (id: string, term: string, content: string): ContentBlock => ({ id, type: "custom", heading: "Definizione", content, data: { component: "definition", term } });
export const itTable = (id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock => ({ id, type: "specifications", heading, data: { columns, rows, caption } });
export const itChecklist = (id: string, heading: string, items: string[]): ContentBlock => ({ id, type: "features", heading, data: { items } });
