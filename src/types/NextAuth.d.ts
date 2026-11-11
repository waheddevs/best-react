import type { DefaultSession } from "next-auth";

import type { BackendAuthRole } from "@/types/Auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    bestApi?: { accessToken: string; expiresAt: number; role: BackendAuthRole; userId?: string };
    bestApiError?: "REFRESH_TOKEN_ERROR" | "SERVICE_UNAVAILABLE";
  }

  interface User {
    bestApiAccessToken?: string;
    bestApiExpiresAt?: number;
    bestApiRefreshExpiresAt?: number;
    bestApiRefreshToken?: string;
    bestApiRole?: BackendAuthRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    bestApiAccessToken?: string;
    bestApiError?: "REFRESH_TOKEN_ERROR" | "SERVICE_UNAVAILABLE";
    bestApiExpiresAt?: number;
    bestApiRefreshExpiresAt?: number;
    bestApiRefreshRetryAt?: number;
    bestApiRefreshToken?: string;
    bestApiRole?: BackendAuthRole;
  }
}
