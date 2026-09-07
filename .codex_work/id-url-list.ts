import { contentRepository } from "../lib/content/repository";
const pages=contentRepository.listPublished({locale:"id"}).sort((a,b)=>a.version.publicPath.localeCompare(b.version.publicPath));
for(const {entity,version} of pages){const en=contentRepository.getPublishedVersion(entity.id,"en");console.log(`- [${version.publicPath}](https://www.chinafreeweight.com${version.publicPath}) | ${entity.type}${en?` | EN: ${en.version.publicPath}`:" | halaman lokal tanpa padanan EN"}`);}
