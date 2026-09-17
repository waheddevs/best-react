import "server-only";

import type { BackendAuthRole } from "@/types/Auth";
import {
  RefreshCredentialSessionDocument,
  type RefreshCredentialSessionMutation,
  type RefreshCredentialSessionMutationVariables,
  RevokeCredentialSessionDocument,
  type RevokeCredentialSessionMutation,
  type RevokeCredentialSessionMutationVariables,
} from "@/gql/graphql";
import { executePublicApi } from "@/lib/PublicApi";

type CredentialIdentity = {
  displayName: string;
  id: string;
  role: BackendAuthRole;
};

export type RefreshedCredentialSession = {
  accessToken: string;
  expiresInSeconds: number;
  refreshExpiresAt: string;
  refreshToken: string;
  role: BackendAuthRole;
};

type ViewerResponse = {
  data?: {
    viewer?: {
      displayName?: unknown;
      id?: unknown;
      role?: unknown;
    } | null;
  };
};

function isBackendAuthRole(value: unknown): value is BackendAuthRole {
  return value === "ADMIN" || value === "STUDENT" || value === "TEACHER";
}

export async function validateCredentialAccessToken(
  accessToken: string,
): Promise<CredentialIdentity | null> {
  const baseUrl = process.env.BEST_API_INTERNAL_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/graphql`, {
      body: JSON.stringify({
        query: "query CredentialSessionViewer { viewer { id displayName role } }",
      }),
      cache: "no-store",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) return null;

    const viewer = ((await response.json()) as ViewerResponse).data?.viewer;
    if (
      typeof viewer?.id !== "string" ||
      typeof viewer.displayName !== "string" ||
      !isBackendAuthRole(viewer.role)
    ) {
      return null;
    }

    return { displayName: viewer.displayName, id: viewer.id, role: viewer.role };
  } catch {
    return null;
  }
}

export async function refreshCredentialSession(
  refreshToken: string,
): Promise<RefreshedCredentialSession> {
  const data = await executePublicApi<
    RefreshCredentialSessionMutation,
    RefreshCredentialSessionMutationVariables
  >(RefreshCredentialSessionDocument, { input: { refreshToken } }, { cache: "no-store" });
  const refreshed = data.refreshCredentialSession;
  return {
    accessToken: refreshed.accessToken,
    expiresInSeconds: refreshed.expiresInSeconds,
    refreshExpiresAt: refreshed.refreshExpiresAt,
    refreshToken: refreshed.refreshToken,
    role: refreshed.user.role,
  };
}

export async function revokeCredentialSession(refreshToken: string): Promise<void> {
  await executePublicApi<RevokeCredentialSessionMutation, RevokeCredentialSessionMutationVariables>(
    RevokeCredentialSessionDocument,
    { input: { refreshToken } },
    { cache: "no-store" },
  );
}
