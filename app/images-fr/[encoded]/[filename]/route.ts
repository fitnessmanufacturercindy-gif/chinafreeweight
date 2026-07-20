import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif", ".gif": "image/gif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp"
};

export async function GET(_request: Request, context: { params: Promise<{ encoded: string; filename: string }> }) {
  const { encoded } = await context.params;
  let source: string;
  try { source = Buffer.from(encoded, "base64url").toString("utf8"); }
  catch { return new NextResponse("Not found", { status: 404 }); }

  if (!source.startsWith("/assets/") || source.includes("..") || source.includes("\\")) {
    return new NextResponse("Not found", { status: 404 });
  }
  const publicRoot = resolve(process.cwd(), "public");
  const sourcePath = resolve(publicRoot, source.replace(/^\//, ""));
  if (!sourcePath.startsWith(`${publicRoot}${sep}`)) return new NextResponse("Not found", { status: 404 });

  try {
    const bytes = await readFile(sourcePath);
    return new NextResponse(bytes, { headers: { "Cache-Control": "public, max-age=31536000, immutable", "Content-Type": contentTypes[extname(sourcePath).toLowerCase()] || "application/octet-stream" } });
  } catch { return new NextResponse("Not found", { status: 404 }); }
}
