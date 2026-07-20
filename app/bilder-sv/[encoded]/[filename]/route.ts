import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { NextResponse } from "next/server";

const types: Record<string, string> = { ".avif":"image/avif", ".gif":"image/gif", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".svg":"image/svg+xml", ".webp":"image/webp" };

export async function GET(_request: Request, { params }: { params: Promise<{ encoded: string; filename: string }> }) {
  const { encoded } = await params;
  let source: string;
  try { source = Buffer.from(encoded, "base64url").toString("utf8"); } catch { return new NextResponse("Not found", { status: 404 }); }
  if (!source.startsWith("/assets/") || source.includes("..")) return new NextResponse("Not found", { status: 404 });
  const publicRoot = join(process.cwd(), "public");
  const absolute = normalize(join(publicRoot, source));
  if (!absolute.startsWith(normalize(join(publicRoot, "assets"))) || !existsSync(absolute)) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(await readFile(absolute), { headers: { "Content-Type": types[extname(absolute).toLowerCase()] || "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" } });
}
