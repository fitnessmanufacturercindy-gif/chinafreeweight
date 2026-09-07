import { contentRepository } from "../lib/content/repository";

const pages = contentRepository.listPublished({ locale: "id" });
const englishWords = new Set(
  "the and or for with from into before after during between without should must can will this that these those is are be been being of to in on by as at your our their its when where why how what which who suppliers manufacturer manufacturers products commercial equipment guide projects brands sourcing orders quality control factory shipping packaging weight weights".split(" ")
);
const findings: Array<{
  id: string;
  path: string;
  fields: Array<{ field: string; hits: string[]; text: string }>;
}> = [];

for (const { entity, version } of pages) {
  const fields: Array<[string, string]> = [
    ["title", version.title],
    ["description", version.description],
    ["h1", version.h1],
    ...version.body.flatMap((block, index): Array<[string, string]> => [
      [`body${index}.heading`, block.heading ?? ""],
      [`body${index}.content`, block.content ?? ""],
      [`body${index}.data`, JSON.stringify(block.data ?? {})]
    ]),
    ...version.faq.flatMap((faq, index): Array<[string, string]> => [
      [`faq${index}.question`, faq.question],
      [`faq${index}.answer`, faq.answer]
    ])
  ];
  const flagged = fields.flatMap(([field, text]) => {
    const words = text.toLowerCase().match(/[a-z]+/g) ?? [];
    const hits = [...new Set(words.filter((word) => englishWords.has(word)))];
    return hits.length >= 2 || /\b(the|these|those|which|without|during|between)\b/i.test(text)
      ? [{ field, hits, text: text.slice(0, 300) }]
      : [];
  });
  if (flagged.length) findings.push({ id: entity.id, path: version.publicPath, fields: flagged });
}

console.log(JSON.stringify({ pages: pages.length, flaggedPages: findings.length, findings }, null, 2));

const compactCpu = pages.find(({ version }) => version.publicPath === "/id/produk/dumbbell/dumbbell-cpu-kompak");
if (compactCpu) {
  const { version } = compactCpu;
  const visibleText = [
    version.title,
    version.h1,
    version.description,
    ...version.body.flatMap((block) => [block.heading ?? "", block.content ?? "", JSON.stringify(block.data ?? {})]),
    ...version.faq.flatMap((item) => [item.question, item.answer])
  ].join(" ");
  console.log(JSON.stringify({ compactCpuWords: visibleText.split(/\s+/).filter(Boolean).length }));
}
