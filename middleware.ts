import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight edge middleware for admin route protection.
 *
 * Public site routes (/about, /services, /portfolio, /blog, /contact, etc.)
 * are completely untouched — this middleware only activates for /admin paths.
 *
 * Auth check is done by reading the NextAuth v5 JWT session cookie.
 * The full session is verified server-side in app/admin/(protected)/layout.tsx.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Only care about /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 2. Always allow the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 3. Check for an active NextAuth v5 session cookie.
  //    NextAuth v5 uses "authjs.session-token" in development (http)
  //    and "__Secure-authjs.session-token" in production (https).
  const sessionToken =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token");

  if (!sessionToken) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run only on /admin routes; skip static assets and API routes.
  matcher: ["/admin/:path*"],
};
