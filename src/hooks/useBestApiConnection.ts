"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type BestApiConnectionState = "connected" | "preview" | "checking";
type WorkspaceRole = "ADMIN" | "STUDENT" | "TEACHER";

function hasExpectedViewerRole(value: unknown, expectedRole: WorkspaceRole): boolean {
  if (typeof value !== "object" || value === null) return false;
  const data = (value as Record<string, unknown>).data;
  if (typeof data !== "object" || data === null) return false;
  const viewer = (data as Record<string, unknown>).viewer;
  return (
    typeof viewer === "object" &&
    viewer !== null &&
    (viewer as Record<string, unknown>).role === expectedRole
  );
}

export function useBestApiConnection(expectedRole: WorkspaceRole): BestApiConnectionState {
  /* HOOKS */
  const session = useSession();
  const [verification, setVerification] = useState<{
    state: "connected" | "preview";
    token: string;
  }>();

  useEffect(() => {
    const accessToken = session.data?.bestApi?.accessToken;
    if (!accessToken) {
      return;
    }

    const controller = new AbortController();
    void fetch("/best-api/graphql", {
      body: JSON.stringify({ query: "query WorkspaceViewer { viewer { id role displayName } }" }),
      headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
      method: "POST",
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload: unknown = response.ok ? await response.json() : undefined;
        setVerification({
          state:
            response.ok && hasExpectedViewerRole(payload, expectedRole) ? "connected" : "preview",
          token: accessToken,
        });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setVerification({ state: "preview", token: accessToken });
        }
      });

    return () => controller.abort();
  }, [expectedRole, session.data?.bestApi?.accessToken, session.status]);

  const accessToken = session.data?.bestApi?.accessToken;
  if (!accessToken) return session.status === "loading" ? "checking" : "preview";
  return verification?.token === accessToken ? verification.state : "checking";
}
