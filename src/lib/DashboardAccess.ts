import "server-only";

import { auth } from "@/Auth";

export type DashboardRole = "ADMIN" | "STUDENT";

type ViewerResponse = {
  data?: { viewer?: { role?: unknown } | null };
};

export function isDashboardPreviewEnabled(): boolean {
  return process.env.NODE_ENV === "development" && process.env.BEST_DASHBOARD_PREVIEW === "true";
}

export async function canAccessDashboard(expectedRole: DashboardRole): Promise<boolean> {
  if (isDashboardPreviewEnabled()) return true;

  const session = await auth();
  const accessToken = session?.bestApi?.accessToken;
  const apiUrl = process.env.BEST_API_INTERNAL_URL;
  if (!accessToken || !apiUrl) return false;

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
    if (!response.ok) return false;
    const payload = (await response.json()) as ViewerResponse;
    return payload.data?.viewer?.role === expectedRole;
  } catch {
    return false;
  }
}
