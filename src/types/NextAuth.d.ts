import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    bestApi?: { accessToken: string; expiresAt: number };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    bestApiAccessToken?: string;
    bestApiExpiresAt?: number;
  }
}
