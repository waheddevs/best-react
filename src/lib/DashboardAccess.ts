import "server-only";

import { auth } from "@/Auth";

export type DashboardRole = "ADMIN" | "STUDENT" | "TEACHER";

type ViewerResponse = {
  data?: { viewer?: { role?: unknown } | null };
  errors?: Array<{ extensions?: { code?: string } }>;
};

export type DashboardAccessState = "allowed" | "expired" | "unauthenticated" | "unavailable";

export function isDashboardPreviewEnabled(): boolean {
  return process.env.NODE_ENV === "development" && process.env.BEST_DASHBOARD_PREVIEW === "true";
}

export async function getDashboardAccessState(
  expectedRole: DashboardRole,
): Promise<DashboardAccessState> {
  if (isDashboardPreviewEnabled()) return "allowed";

  const session = await auth();
  const accessToken = session?.bestApi?.accessToken;
  const apiUrl = process.env.BEST_API_INTERNAL_URL;
  if (session?.bestApiError === "REFRESH_TOKEN_ERROR") return "expired";
  if (session?.bestApiError === "SERVICE_UNAVAILABLE" && !accessToken) return "unavailable";
  if (!accessToken || session.bestApi?.role !== expectedRole) return "unauthenticated";
  if (!apiUrl) return "unavailable";

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/graphql`, {
      body: JSON.stringify({ query: "query DashboardAccess { viewer { role } }" }),
      cache: "no-store",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) return response.status >= 500 ? "unavailable" : "unauthenticated";
    const payload = (await response.json()) as ViewerResponse;
    const errorCode = payload.errors?.[0]?.extensions?.code;
    if (errorCode === "SERVICE_UNAVAILABLE" || errorCode === "INTERNAL_SERVER_ERROR") {
      return "unavailable";
    }
    if (errorCode === "UNAUTHENTICATED" || errorCode === "FORBIDDEN") {
      return "unauthenticated";
    }
    return payload.data?.viewer?.role === expectedRole ? "allowed" : "unauthenticated";
  } catch {
    return "unavailable";
  }
}

export async function canAccessDashboard(expectedRole: DashboardRole): Promise<boolean> {
  return (await getDashboardAccessState(expectedRole)) === "allowed";
}
