import "server-only";

import type { BackendAuthRole } from "@/types/Auth";

type CredentialIdentity = {
  displayName: string;
  id: string;
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
