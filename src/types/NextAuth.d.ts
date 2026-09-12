import type { DefaultSession } from "next-auth";

import type { BackendAuthRole } from "@/types/Auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    bestApi?: { accessToken: string; expiresAt: number; role: BackendAuthRole };
  }

  interface User {
    bestApiAccessToken?: string;
    bestApiExpiresAt?: number;
    bestApiRole?: BackendAuthRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    bestApiAccessToken?: string;
    bestApiExpiresAt?: number;
    bestApiRole?: BackendAuthRole;
  }
}
