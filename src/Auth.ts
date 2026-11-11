import "server-only";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {
  refreshCredentialSession,
  revokeCredentialSession,
  validateCredentialAccessToken,
  type RefreshedCredentialSession,
} from "@/lib/CredentialSession";
import { PublicApiError } from "@/lib/PublicApi";

const developmentSecret =
  process.env.NODE_ENV === "development" ? "best-lc-development-session-secret-only" : undefined;
const accessTokenRefreshWindowMilliseconds = 5 * 60 * 1_000;
const refreshRetryDelayMilliseconds = 30 * 1_000;
const pendingRefreshes = new Map<string, Promise<RefreshedCredentialSession>>();
const secureCookies = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: secureCookies,
};

function refreshSessionOnce(refreshToken: string): Promise<RefreshedCredentialSession> {
  const key = refreshToken.slice(0, refreshToken.indexOf("."));
  const pending = pendingRefreshes.get(key);
  if (pending) return pending;

  const request = refreshCredentialSession(refreshToken);
  pendingRefreshes.set(key, request);
  void request
    .finally(() => {
      if (pendingRefreshes.get(key) === request) pendingRefreshes.delete(key);
    })
    .catch(() => undefined);
  return request;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Cookies are shared across ports on one host. Keep BEST separate from other apps.
  cookies: {
    sessionToken: {
      name: `${secureCookies ? "__Secure-" : ""}best-lc.session-token`,
      options: cookieOptions,
    },
    csrfToken: {
      name: `${secureCookies ? "__Host-" : ""}best-lc.csrf-token`,
      options: cookieOptions,
    },
    callbackUrl: {
      name: `${secureCookies ? "__Secure-" : ""}best-lc.callback-url`,
      options: cookieOptions,
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (
        user?.bestApiAccessToken &&
        user.bestApiExpiresAt &&
        user.bestApiRefreshExpiresAt &&
        user.bestApiRefreshToken &&
        user.bestApiRole
      ) {
        token.bestApiAccessToken = user.bestApiAccessToken;
        token.bestApiExpiresAt = user.bestApiExpiresAt;
        token.bestApiRefreshExpiresAt = user.bestApiRefreshExpiresAt;
        token.bestApiRefreshToken = user.bestApiRefreshToken;
        token.bestApiRole = user.bestApiRole;
        token.bestApiError = undefined;
        token.bestApiRefreshRetryAt = undefined;
        return token;
      }

      const now = Date.now();
      if (
        typeof token.bestApiAccessToken !== "string" ||
        typeof token.bestApiExpiresAt !== "number" ||
        typeof token.bestApiRefreshExpiresAt !== "number" ||
        typeof token.bestApiRefreshToken !== "string" ||
        (token.bestApiRole !== "ADMIN" &&
          token.bestApiRole !== "STUDENT" &&
          token.bestApiRole !== "TEACHER")
      ) {
        return token;
      }
      if (token.bestApiExpiresAt - accessTokenRefreshWindowMilliseconds > now) return token;
      if (
        token.bestApiError === "SERVICE_UNAVAILABLE" &&
        typeof token.bestApiRefreshRetryAt === "number" &&
        token.bestApiRefreshRetryAt > now &&
        token.bestApiExpiresAt > now
      ) {
        return token;
      }
      if (token.bestApiRefreshExpiresAt <= now) {
        token.bestApiAccessToken = undefined;
        token.bestApiRefreshToken = undefined;
        token.bestApiError = "REFRESH_TOKEN_ERROR";
        return token;
      }

      try {
        const refreshed = await refreshSessionOnce(token.bestApiRefreshToken);
        token.bestApiAccessToken = refreshed.accessToken;
        token.bestApiExpiresAt = Date.now() + refreshed.expiresInSeconds * 1_000;
        token.bestApiRefreshExpiresAt = Date.parse(refreshed.refreshExpiresAt);
        token.bestApiRefreshToken = refreshed.refreshToken;
        token.bestApiRole = refreshed.role;
        token.bestApiError = undefined;
        token.bestApiRefreshRetryAt = undefined;
      } catch (error) {
        if (error instanceof PublicApiError && error.code === "SERVICE_UNAVAILABLE") {
          token.bestApiError = "SERVICE_UNAVAILABLE";
          token.bestApiRefreshRetryAt = now + refreshRetryDelayMilliseconds;
        } else {
          token.bestApiAccessToken = undefined;
          token.bestApiRefreshToken = undefined;
          token.bestApiError = "REFRESH_TOKEN_ERROR";
        }
      }
      return token;
    },
    session({ session, token }) {
      if (
        token.bestApiError === "REFRESH_TOKEN_ERROR" ||
        token.bestApiError === "SERVICE_UNAVAILABLE"
      ) {
        session.bestApiError = token.bestApiError;
      }
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
          userId: token.sub,
        };
      }
      return session;
    },
  },
  events: {
    async signOut(message) {
      if ("token" in message && typeof message.token?.bestApiRefreshToken === "string") {
        await revokeCredentialSession(message.token.bestApiRefreshToken).catch(() => undefined);
      }
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
        refreshExpiresAt: { type: "text" },
        refreshToken: { type: "text" },
      },
      async authorize(credentials) {
        const accessToken = credentials.accessToken;
        const expiresInSeconds = Number(credentials.expiresInSeconds);
        const refreshExpiresAt = Date.parse(String(credentials.refreshExpiresAt));
        const refreshToken = credentials.refreshToken;
        if (
          typeof accessToken !== "string" ||
          typeof refreshToken !== "string" ||
          !Number.isSafeInteger(expiresInSeconds) ||
          expiresInSeconds <= 0 ||
          !Number.isFinite(refreshExpiresAt) ||
          refreshExpiresAt <= Date.now()
        ) {
          return null;
        }

        const identity = await validateCredentialAccessToken(accessToken);
        if (!identity) return null;

        return {
          bestApiAccessToken: accessToken,
          bestApiExpiresAt: Date.now() + expiresInSeconds * 1_000,
          bestApiRefreshExpiresAt: refreshExpiresAt,
          bestApiRefreshToken: refreshToken,
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
