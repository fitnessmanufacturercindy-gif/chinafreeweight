import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const mime:Record<string,string>={".avif":"image/avif",".gif":"image/gif",".jpeg":"image/jpeg",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp"};
export const dynamic="force-static";
export async function GET(_request:Request,{params}:{params:Promise<{encoded:string;filename:string}>}){
  const {encoded}=await params;let source:string;
  try{source=Buffer.from(encoded,"base64url").toString("utf8");}catch{return new NextResponse("Not found",{status:404});}
  if(!source.startsWith("/assets/")||source.includes(".."))return new NextResponse("Not found",{status:404});
  try{const file=await readFile(path.join(process.cwd(),"public",source));return new NextResponse(file,{headers:{"Content-Type":mime[path.extname(source).toLowerCase()]??"application/octet-stream","Cache-Control":"public, max-age=31536000, immutable"}});}catch{return new NextResponse("Not found",{status:404});}
}
