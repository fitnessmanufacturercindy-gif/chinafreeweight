import type { ContentBlock, LocalizedAuthor } from "../../lib/content/types";

export const vietnameseEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-noi-dung-vi",
  name: "Ban nội dung kỹ thuật PowerBaseFit",
  kind: "Organization",
  role: "Nội dung mua hàng B2B về thiết bị phòng gym",
  url: "/vi/nha-may"
};

export const vietnameseTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-kiem-soat-chat-luong-vi",
  name: "Đội sản xuất và kiểm soát chất lượng PowerBaseFit",
  kind: "Organization",
  role: "Thẩm định thông tin sản xuất và QC",
  url: "/vi/nha-may"
};

export function vietnameseImagePath(source: string, slug: string, index: number) {
  const extension = source.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1]?.toLowerCase() || "webp";
  const encodedSource = Buffer.from(source, "utf8").toString("base64url");
  return `/hinh-anh-vi/${encodedSource}/${slug}-thiet-bi-phong-gym-${index + 1}.${extension}`;
}

export const viText = (id: string, heading: string, ...paragraphs: string[]): ContentBlock => ({ id, type: "rich_text", heading, content: paragraphs.join("\n\n") });
export const viAnswer = (id: string, heading: string, content: string): ContentBlock => ({ id, type: "custom", heading, content, data: { component: "quick-answer" } });
export const viDefinition = (id: string, term: string, content: string): ContentBlock => ({ id, type: "custom", heading: "Định nghĩa", content, data: { component: "definition", term } });
export const viTable = (id: string, heading: string, columns: string[], rows: string[][], caption?: string): ContentBlock => ({ id, type: "specifications", heading, data: { columns, rows, caption } });
export const viChecklist = (id: string, heading: string, items: string[]): ContentBlock => ({ id, type: "features", heading, data: { items } });
