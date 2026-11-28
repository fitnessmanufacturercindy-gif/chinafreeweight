import { NextRequest, NextResponse } from "next/server";
import { decideLocaleRequest } from "./lib/i18n/request-policy";

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

  const decision = decideLocaleRequest(request.nextUrl.pathname);

  if (decision.action === "redirect") {
    const destination = request.nextUrl.clone();
    destination.pathname = decision.destination;
    return NextResponse.redirect(destination, 308);
  }

  if (decision.action === "not_found") {
    // Private locales have no generated routes and the locale layout rejects them.
    // Let Next render the shared 404 at the requested URL.
    return NextResponse.next({
      headers: { "x-robots-tag": "noindex" }
    });
  }

  if (decision.internalLocale === "en") {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", decision.internalLocale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
