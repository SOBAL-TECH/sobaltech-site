/**
 * Edge-compatible auth config.
 * Does NOT import bcryptjs, Prisma, or any Node.js-only modules.
 * Used by middleware.ts which runs in the Edge Runtime.
 */
import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@prisma/client";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/admin/login";

      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        (token as Record<string, unknown>).role = (
          user as unknown as Record<string, unknown>
        ).role as UserRole;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as unknown as Record<string, unknown>).role = (
          token as unknown as Record<string, unknown>
        ).role as UserRole;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
