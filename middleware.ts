import { NextRequest, NextResponse } from "next/server";
import { decideLocaleRequest } from "./lib/i18n/request-policy";

export function middleware(request: NextRequest) {
  const decision = decideLocaleRequest(request.nextUrl.pathname);

  if (decision.action === "redirect") {
    const destination = request.nextUrl.clone();
    destination.pathname = decision.destination;
    return NextResponse.redirect(destination, 308);
  }

  if (decision.action === "not_found") {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, nofollow"
      }
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
