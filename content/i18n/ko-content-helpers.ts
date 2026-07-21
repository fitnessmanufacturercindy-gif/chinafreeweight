import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const koreanEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-korea-b2b-editorial",
  name: "PowerBaseFit 한국어 기술 편집팀",
  kind: "Organization",
  role: "상업용 피트니스 장비 제품 정보 및 B2B 구매 안내",
  url: "/ko/factory"
};

export const koreanTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-production-quality-review",
  name: "PowerBaseFit 생산·품질 검토팀",
  kind: "Organization",
  role: "생산 공정, 품질 검사 및 수출 포장 검토",
  url: "/ko/factory"
};

export function koreanImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/images-ko/${encodedSource}/${slug}-commercial-fitness-${index + 1}.${extension}`;
}

export const koText = (id: string, heading: string, ...paragraphs: string[]): ContentBlock => ({
  id,
  type: "rich_text",
  heading,
  content: paragraphs.join("\n\n")
});

export const koAnswer = (id: string, heading: string, content: string): ContentBlock => ({
  id,
  type: "custom",
  heading,
  content,
  data: { component: "quick-answer" }
});

export const koDefinition = (id: string, term: string, content: string): ContentBlock => ({
  id,
  type: "custom",
  heading: "용어 정의",
  content,
  data: { component: "definition", term }
});

export const koTable = (id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock => ({
  id,
  type: "specifications",
  heading,
  data: { columns, rows, caption }
});

export const koChecklist = (id: string, heading: string, items: string[]): ContentBlock => ({
  id,
  type: "features",
  heading,
  data: { items }
});
