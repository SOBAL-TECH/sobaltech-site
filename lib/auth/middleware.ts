import NextAuth from "next-auth";
import { authConfig } from "./config";

/**
 * NextAuth v5 middleware — uses the edge-compatible authConfig.
 * The `authorized` callback in authConfig handles:
 *   - /admin/login  → always allowed (redirect to dashboard if already logged in)
 *   - /admin/*      → require authenticated session
 */
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
