import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const indonesianEditorialAuthor: LocalizedAuthor = {
  id: "tim-editorial-powerbasefit-id",
  name: "Tim editorial teknis PowerBaseFit",
  kind: "Organization",
  role: "Pengadaan B2B dan informasi produk peralatan gym",
  url: "/id/pabrik"
};

export const indonesianTechnicalReviewer: LocalizedAuthor = {
  id: "tim-produksi-kualitas-powerbasefit-id",
  name: "Tim produksi dan kualitas PowerBaseFit",
  kind: "Organization",
  role: "Tinjauan teknis produksi dan kontrol kualitas",
  url: "/id/pabrik"
};

export function indonesianImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/gambar-id/${encodedSource}/${slug}-peralatan-gym-${index + 1}.${extension}`;
}

export const idText = (id: string, heading: string, ...paragraphs: string[]): ContentBlock => ({ id, type: "rich_text", heading, content: paragraphs.join("\n\n") });
export const idAnswer = (id: string, heading: string, content: string): ContentBlock => ({ id, type: "custom", heading, content, data: { component: "quick-answer" } });
export const idDefinition = (id: string, term: string, content: string): ContentBlock => ({ id, type: "custom", heading: "Definisi", content, data: { component: "definition", term } });
export const idTable = (id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock => ({ id, type: "specifications", heading, data: { columns, rows, caption } });
export const idChecklist = (id: string, heading: string, items: string[]): ContentBlock => ({ id, type: "features", heading, data: { items } });
