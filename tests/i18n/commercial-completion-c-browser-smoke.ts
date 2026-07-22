import assert from "node:assert/strict";
import { commercialCompletionCSelections } from "../../content/i18n/commercial-completion-c";
import { contentRepository } from "../../lib/content/repository";

const baseUrl=(process.env.BASE_URL||"http://127.0.0.1:3000").replace(/\/$/,"");
const locales=["pt-BR","es","ko"] as const;
const pages=commercialCompletionCSelections.flatMap((selection)=>{
  const entity=contentRepository.getEntity(`product:racks:${selection.slug}`);
  assert.ok(entity);
  return locales.map((locale)=>({locale,path:entity.versions[locale]!.publicPath,h1:entity.versions[locale]!.h1}));
});

async function request(url:string,init?:RequestInit) {
  let last:unknown;
  for(let attempt=1;attempt<=3;attempt+=1) {
    try { return await fetch(url,init); }
    catch(error) { last=error; if(attempt<3) await new Promise((resolve)=>setTimeout(resolve,attempt*500)); }
  }
  throw last;
}

async function main() {
  for(const {locale,path,h1} of pages) {
    const response=await request(`${baseUrl}${path}`,{redirect:"manual"});
    assert.equal(response.status,200,`${path}: HTTP ${response.status}`);
    const html=await response.text();
    assert.match(html,new RegExp(`<html[^>]+lang=["']${locale}["']`,"i"),`${path}: lang`);
    assert.match(html,/<title>[^<]{10,}<\/title>/i,`${path}: title`);
    assert.match(html,/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,}/i,`${path}: description`);
    assert.ok(html.includes(h1.replaceAll("&","&amp;"))||html.includes(h1),`${path}: H1`);
    assert.ok(html.includes(`rel="canonical" href="https://www.chinafreeweight.com${path}"`),`${path}: canonical`);
    assert.match(html,new RegExp(`hrefLang=["']${locale}["'][^>]+href=["']https://www\\.chinafreeweight\\.com${path.replaceAll("/","\\/")}["']`,"i"),`${path}: self hreflang`);
    for(const hreflang of ["en","pt-BR","es","de","fr","vi","sv","it","ko","x-default"]) assert.match(html,new RegExp(`hrefLang=["']${hreflang}["']`,"i"),`${path}: ${hreflang}`);
    assert.ok(html.includes(`\"inLanguage\":\"${locale}\"`),`${path}: schema language`);
    for(const type of ["Product","FAQPage","BreadcrumbList"]) assert.ok(html.includes(`\"@type\":\"${type}\"`),`${path}: ${type}`);
    assert.match(html,/<img[^>]+alt=["'][^"']{20,}/i,`${path}: image alt`);
    assert.doesNotMatch(html,/<meta[^>]+name=["']robots["'][^>]+noindex/i,`${path}: noindex`);
    assert.doesNotMatch(html,/\b(?:SEO|GEO|AIO|AI Search|keyword optimization|ranking optimization)\b/i,`${path}: internal terms`);
  }

  const [mainSitemap,languageSitemap]=await Promise.all([
    request(`${baseUrl}/sitemap.xml`).then((response)=>response.text()),
    request(`${baseUrl}/sitemaps/languages.xml`).then((response)=>response.text())
  ]);
  for(const {path} of pages) {
    const url=`https://www.chinafreeweight.com${path}`;
    assert.ok(mainSitemap.includes(url),`${path}: main sitemap`);
    assert.ok(languageSitemap.includes(url),`${path}: language sitemap`);
  }

  for(const path of [
    "/pt/produtos/racks-e-bancos/multi-jungle-training-system",
    "/es/productos/accesorios-de-gimnasio/esterilla-tpe",
    "/ko/products/gym-accessories/bosu-ball"
  ]) {
    const response=await request(`${baseUrl}${path}`,{redirect:"manual"});
    assert.equal(response.status,404,`${path}: excluded route`);
  }
  console.log(`Remaining C-level browser smoke passed: ${pages.length} pages at ${baseUrl}`);
}

main().catch((error)=>{console.error(error);process.exitCode=1;});
