import "server-only";

import Apple from "next-auth/providers/apple";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

import { exchangeSocialIdentity } from "@/lib/AuthExchange";

const developmentSecret =
  process.env.NODE_ENV === "development" ? "best-lc-development-session-secret-only" : undefined;

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ account, profile, token }) {
      if (
        account &&
        (account.provider === "google" ||
          account.provider === "facebook" ||
          account.provider === "apple")
      ) {
        const profileRecord = profile as Record<string, unknown> | undefined;
        const verifiedClaim = profileRecord?.email_verified;
        const bestApi = await exchangeSocialIdentity({
          displayName: token.name ?? token.email ?? "BEST LC Student",
          email: token.email,
          emailVerified: verifiedClaim === true || verifiedClaim === "true",
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });
        if (bestApi) {
          token.bestApiAccessToken = bestApi.accessToken;
          token.bestApiExpiresAt = bestApi.expiresAt;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (
        typeof token.bestApiAccessToken === "string" &&
        typeof token.bestApiExpiresAt === "number" &&
        token.bestApiExpiresAt > Date.now()
      ) {
        session.bestApi = {
          accessToken: token.bestApiAccessToken,
          expiresAt: token.bestApiExpiresAt,
        };
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? developmentSecret,
  providers: [Google, Facebook, Apple],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
