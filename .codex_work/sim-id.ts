import { contentRepository } from "../lib/content/repository";

const pages = contentRepository.listPublished({ locale: "id" });
const grams = (body: { content?: string }[]) => {
  const tokens = body.map((block) => block.content ?? "").join(" ").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  return new Set(tokens.slice(0, -4).map((_, index) => tokens.slice(index, index + 5).join(" ")));
};
for (const type of ["product", "blog"] as const) {
  const scoped = pages.filter(({ entity }) => entity.type === type);
  let best = { score: 0, left: "", right: "" };
  for (let first = 0; first < scoped.length; first += 1) for (let second = first + 1; second < scoped.length; second += 1) {
    const left = grams(scoped[first].version.body);
    const right = grams(scoped[second].version.body);
    const intersection = [...left].filter((value) => right.has(value)).length;
    const score = intersection / new Set([...left, ...right]).size;
    if (score > best.score) best = { score, left: scoped[first].version.publicPath, right: scoped[second].version.publicPath };
  }
  console.log(type, best);
}
const words = (page: (typeof pages)[number]) => [page.version.h1, page.version.description, ...page.version.body.map((block) => `${block.heading ?? ""} ${block.content ?? ""} ${JSON.stringify(block.data ?? {})}`), ...page.version.faq.flatMap((item) => [item.question, item.answer])].join(" ").split(/\s+/).filter(Boolean).length;
for (const type of ["product", "blog"] as const) {
  const values = pages.filter(({ entity }) => entity.type === type).map(words);
  console.log(type, { count: values.length, minWords: Math.min(...values), maxWords: Math.max(...values), averageWords: Math.round(values.reduce((a,b)=>a+b,0)/values.length) });
}
console.log({ titleMin: Math.min(...pages.map(({version})=>version.title.length)), titleMax: Math.max(...pages.map(({version})=>version.title.length)), descriptionMin: Math.min(...pages.map(({version})=>version.description.length)), descriptionMax: Math.max(...pages.map(({version})=>version.description.length)) });
console.log(pages.filter(({version})=>version.title.length>65).map(({version})=>[version.publicPath,version.title.length,version.title]));
