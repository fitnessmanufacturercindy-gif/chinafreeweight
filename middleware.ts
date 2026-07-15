import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const gonePaths = new Set([
  "/manufacturer/chrome-dumbbell-manufacturer",
  "/manufacturer/urethane-dumbbell-manufacturer",
  "/oem/oem-dumbbells",
  "/oem/private-label-dumbbells",
  "/manufacturer/weight-plate-manufacturer"
]);

export function middleware(request: NextRequest) {
  if (gonePaths.has(request.nextUrl.pathname)) {
    return new NextResponse("410 Gone", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex"
      }
    });
  }

  return NextResponse.next();
}

