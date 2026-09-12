import "server-only";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { validateCredentialAccessToken } from "@/lib/CredentialSession";

const developmentSecret =
  process.env.NODE_ENV === "development" ? "best-lc-development-session-secret-only" : undefined;

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user?.bestApiAccessToken && user.bestApiExpiresAt && user.bestApiRole) {
        token.bestApiAccessToken = user.bestApiAccessToken;
        token.bestApiExpiresAt = user.bestApiExpiresAt;
        token.bestApiRole = user.bestApiRole;
      }
      return token;
    },
    session({ session, token }) {
      if (
        typeof token.bestApiAccessToken === "string" &&
        typeof token.bestApiExpiresAt === "number" &&
        token.bestApiExpiresAt > Date.now() &&
        (token.bestApiRole === "ADMIN" ||
          token.bestApiRole === "STUDENT" ||
          token.bestApiRole === "TEACHER")
      ) {
        session.bestApi = {
          accessToken: token.bestApiAccessToken,
          expiresAt: token.bestApiExpiresAt,
          role: token.bestApiRole,
        };
      }
      return session;
    },
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        accessToken: { type: "text" },
        expiresInSeconds: { type: "text" },
      },
      async authorize(credentials) {
        const accessToken = credentials.accessToken;
        const expiresInSeconds = Number(credentials.expiresInSeconds);
        if (
          typeof accessToken !== "string" ||
          !Number.isSafeInteger(expiresInSeconds) ||
          expiresInSeconds <= 0
        ) {
          return null;
        }

        const identity = await validateCredentialAccessToken(accessToken);
        if (!identity) return null;

        return {
          bestApiAccessToken: accessToken,
          bestApiExpiresAt: Date.now() + expiresInSeconds * 1_000,
          bestApiRole: identity.role,
          id: identity.id,
          name: identity.displayName,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET ?? developmentSecret,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
