import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const baseUrl=process.env.TEST_BASE_URL||"http://127.0.0.1:3117";
const executablePath=process.env.CHROME_PATH||"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser=await chromium.launch({executablePath,headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900}});
const page=await context.newPage();
const goto=(path,waitUntil="domcontentloaded")=>page.goto(new URL(path,`${baseUrl}/`).toString(),{waitUntil});
const schemas=async()=>{const docs=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse);return docs.flatMap((doc)=>doc?.["@graph"]??[doc]).flat();};

let response=await goto("/sitemaps/languages.xml");
assert.equal(response?.status(),200);
const languageXml=await response.text();
const paths=[...languageXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match)=>new URL(match[1]).pathname).filter((path)=>path==="/it"||path.startsWith("/it/"));
assert.equal(paths.length,124);
assert.equal(new Set(paths).size,124);

for(const path of paths){
  response=await goto(path);
  assert.equal(response?.status(),200,path);
  assert.equal(new URL(response.url()).pathname,path,`${path}: redirect`);
  assert.equal(await page.locator("html").getAttribute("lang"),"it",`${path}: lang`);
  assert.equal(await page.locator("html").getAttribute("dir"),"ltr",`${path}: dir`);
  assert.ok((await page.title()).length>20,`${path}: title`);
  assert.ok(((await page.locator('meta[name="description"]').getAttribute("content"))||"").length>80,`${path}: description`);
  assert.ok((await page.locator("h1").innerText()).length>10,`${path}: h1`);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),`https://www.chinafreeweight.com${path}`,`${path}: canonical`);
  assert.equal(await page.locator('link[hreflang="it"]').getAttribute("href"),`https://www.chinafreeweight.com${path}`,`${path}: hreflang`);
  assert.equal(await page.locator('meta[name="robots"][content*="noindex"]').count(),0,`${path}: noindex`);
  assert.ok((await page.locator("main").innerText()).length>900,`${path}: server HTML`);
  const graph=await schemas();
  assert.ok(graph.some((node)=>node?.["@type"]==="FAQPage"&&node.inLanguage==="it"),`${path}: FAQ schema`);
  assert.ok(graph.some((node)=>node?.["@type"]==="BreadcrumbList"&&node.inLanguage==="it"),`${path}: breadcrumb schema`);
  if(/^\/it\/prodotti\/(?:manubri|dischi-pesi|rack-panche|accessori-palestra)\//.test(path))assert.ok(graph.some((node)=>node?.["@type"]==="Product"&&node.inLanguage==="it"),`${path}: Product schema`);
  if(/^\/it\/blog\//.test(path))assert.ok(graph.some((node)=>node?.["@type"]==="BlogPosting"&&node.inLanguage==="it"),`${path}: BlogPosting schema`);
  for(const node of graph){const types=Array.isArray(node?.["@type"])?node["@type"]:[node?.["@type"]];if(types.some((type)=>["WebSite","Organization","LocalBusiness","Product","FAQPage","BreadcrumbList","BlogPosting"].includes(type)))assert.equal(node.inLanguage,"it",`${path}: ${types.join("/")}`);}
  const images=await page.locator("main img").all();assert.ok(images.length>=3,`${path}: images`);
  for(const image of images)assert.ok((await image.getAttribute("alt"))?.trim(),`${path}: alt`);
}

response=await goto("/sitemap.xml");assert.equal(response?.status(),200);const mainXml=await response.text();assert.equal((mainXml.match(/<loc>/g)??[]).length,853);assert.equal((mainXml.match(/<loc>https:\/\/www\.chinafreeweight\.com\/it(?:<|\/)/g)??[]).length,124);
response=await goto("/robots.txt");assert.equal(response?.status(),200);assert.match(await response.text(),/Allow: \/[\r\n]/);

await goto("/products/dumbbells/hex-dumbbell-kg","networkidle");
let switcher=page.locator(".route-language-switcher--desktop");await switcher.locator("summary").click();await switcher.locator('a[lang="it"]').click();await page.waitForURL("**/it/prodotti/manubri/manubrio-esagonale-in-gomma");
switcher=page.locator(".route-language-switcher--desktop");await switcher.locator("summary").click();await switcher.locator('a[lang="en"]').click();await page.waitForURL("**/products/dumbbells/hex-dumbbell-kg");

await page.setViewportSize({width:390,height:844});await goto("/it/contatti","networkidle");await page.locator(".mobile-nav-menu summary").click();assert.ok(await page.locator(".route-language-switcher--mobile").isVisible());assert.equal(await page.locator("form.quote-form").getAttribute("action"),"https://formsubmit.co/kloe@powerbasefit.com");assert.equal(await page.locator('form.quote-form input[name="_subject"]').getAttribute("value"),"Nuova richiesta B2B in italiano — ChinaFreeWeight");assert.match(await page.locator(".whatsapp-button").getAttribute("href"),/^https:\/\/wa\.me\/8618963018533/);

for(const path of ["/it/prodotti/non-pubblicato","/it/blog/non-pubblicato","/nl"]){response=await goto(path);assert.equal(response?.status(),404,path);}
await browser.close();
console.log("Italian browser smoke passed: 124 pages, server HTML, schema, sitemap, switcher, form and 404.");
