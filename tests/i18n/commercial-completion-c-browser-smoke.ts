import assert from "node:assert/strict";
import { chromium, type Page } from "playwright-core";
import { commercialCompletionCSelections } from "../../content/i18n/commercial-completion-c";
import { contentRepository } from "../../lib/content/repository";

const baseUrl=(process.env.BASE_URL||"http://127.0.0.1:3000").replace(/\/$/,"");
const executablePath=process.env.CHROME_PATH||"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const locales=["pt-BR","es","ko"] as const;
const pages=commercialCompletionCSelections.flatMap((selection)=>{
  const entity=contentRepository.getEntity(`product:racks:${selection.slug}`);
  assert.ok(entity);
  return locales.map((locale)=>({locale,path:entity.versions[locale]!.publicPath,h1:entity.versions[locale]!.h1}));
});

async function request(page:Page,path:string) {
  const response=await page.goto(`${baseUrl}${path}`,{waitUntil:"domcontentloaded",timeout:90_000});
  assert.ok(response,`${path}: missing browser response`);
  assert.equal(new URL(page.url()).pathname,path,`${path}: unexpected redirect to ${page.url()}`);
  return response;
}

async function main() {
  const browser=await chromium.launch({executablePath,headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  try {
    for(const {locale,path,h1} of pages) {
      const response=await request(page,path);
      assert.equal(response.status(),200,`${path}: HTTP ${response.status()}`);
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

    const mainSitemap=await (await request(page,"/sitemap.xml")).text();
    const languageSitemap=await (await request(page,"/sitemaps/languages.xml")).text();
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
      const response=await request(page,path);
      assert.equal(response.status(),404,`${path}: excluded route`);
    }
    console.log(`Remaining C-level browser smoke passed: ${pages.length} pages at ${baseUrl}`);
  } finally {
    await browser.close();
  }
}

main().catch((error)=>{console.error(error);process.exitCode=1;});
