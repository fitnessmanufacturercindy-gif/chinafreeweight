import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { NextResponse } from "next/server";

const mime: Record<string, string> = { ".avif": "image/avif", ".gif": "image/gif", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };

export async function GET(_request: Request, { params }: { params: Promise<{ encoded: string; filename: string }> }) {
  const { encoded } = await params;
  let source: string;
  try { source = Buffer.from(encoded, "base64url").toString("utf8"); } catch { return new NextResponse(null, { status: 404 }); }
  if (!source.startsWith("/assets/") || source.includes("..")) return new NextResponse(null, { status: 404 });
  const root = normalize(join(process.cwd(), "public"));
  const absolute = normalize(join(root, source.replace(/^\//, "")));
  if (!absolute.startsWith(root)) return new NextResponse(null, { status: 404 });
  try {
    const body = await readFile(absolute);
    return new NextResponse(body, { headers: { "Content-Type": mime[extname(absolute).toLowerCase()] || "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return new NextResponse(null, { status: 404 }); }
}
