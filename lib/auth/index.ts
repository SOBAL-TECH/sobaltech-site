import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { LoginSchema } from "@/lib/validations/auth";
import type { UserRole } from "@prisma/client";

/**
 * Edge-compatible base config — contains only callbacks and pages.
 * No DB adapter or Credentials provider (those need Node.js runtime).
 *
 * NOTE: If you need true Edge middleware compatibility, extract this to a
 * separate `lib/auth/config.ts` file that doesn't import from `lib/db`.
 */
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

      // Allow the login page for unauthenticated users; redirect logged-in users away
      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      // All other /admin/* routes require authentication
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as UserRole;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

/**
 * Full NextAuth config with adapter and all providers.
 * Server-side only — do NOT import in middleware.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  events: {
    async signIn({ user, account }) {
      // For OAuth sign-ins, ensure the user has a role set
      if (account?.type === "oauth" && user.id) {
        await prisma.user.updateMany({
          where: { id: user.id, role: undefined },
          data: { role: "ADMIN" },
        });
      }
    },
  },
});
