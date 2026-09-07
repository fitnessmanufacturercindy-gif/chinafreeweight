import { contentRepository } from "../lib/content/repository";

const host = "www.chinafreeweight.com";
const key = "d787e9478e6f40c6f5b2e42327a8f7ab";
const urlList = contentRepository.listPublished({ locale: "id" }).map(({ version }) => `https://${host}${version.publicPath}`);
if (urlList.length !== 122 || new Set(urlList).size !== 122) throw new Error(`Expected 122 unique Indonesian URLs, received ${urlList.length}`);
async function main(){
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList })
  });
  console.log(JSON.stringify({ status: response.status, ok: response.ok, submittedUrls: urlList.length, response: await response.text() }));
  if (!response.ok) process.exitCode = 1;
}
main().catch((error)=>{console.error(error);process.exit(1);});
