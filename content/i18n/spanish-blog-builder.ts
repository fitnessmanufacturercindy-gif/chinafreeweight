import type { SpanishPage } from "./es-types";
import {
  checklist,
  definition,
  quick,
  rich,
  spanishEditorialAuthor,
  spanishTechnicalReviewer,
  table
} from "./es-content-helpers";
import { spanishBlogIntentSections } from "./spanish-blog-intent-sections";

export type SpanishBlogInput = {
  id: string;
  esPath: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  definitionTerm: string;
  definitionText: string;
  quickAnswer: string;
  image: [string, string];
  comparisonTitle: string;
  comparisonColumns: string[];
  comparisonRows: string[][];
  sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
  checklistTitle: string;
  checklistItems: string[];
  faq: Array<[string, string]>;
  links: Array<[string, string]>;
};

export function spanishBlog(input: SpanishBlogInput): SpanishPage {
  return {
    id: input.id,
    type: "blog",
    esPath: input.esPath,
    title: input.title,
    description: input.description,
    h1: input.h1,
    image: input.image,
    blocks: [
      quick("respuesta-rapida", input.quickAnswer),
      definition("definicion", input.definitionTerm, input.definitionText),
      table("comparacion", input.comparisonTitle, input.comparisonColumns, input.comparisonRows),
      ...input.sections.map((section) => rich(section.id, section.heading, ...section.paragraphs)),
      ...spanishBlogIntentSections(input.id),
      checklist("checklist", input.checklistTitle, input.checklistItems),
    ],
    faq: input.faq,
    links: input.links,
    author: spanishEditorialAuthor,
    reviewedBy: spanishTechnicalReviewer
  };
}
