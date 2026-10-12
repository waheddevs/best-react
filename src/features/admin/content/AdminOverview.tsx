"use client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import type { Locale } from "@/config/Locales";
import { AdminOverviewDocument } from "@/gql/graphql";
import { onWorkspaceNotificationChange } from "@/features/notifications/WorkspaceNotificationEvents";
import { AdminOverviewDashboard } from "@/app/[locale]/(admin)/admin/AdminOverviewDashboard";
export function AdminOverview({ locale, initialNow }: { locale: Locale; initialNow: number }) {
  const query = useQuery(AdminOverviewDocument, {
    variables: { language: locale === "uz" ? "UZ" : locale === "ru" ? "RU" : "EN" },
    context: { authenticated: true },
    fetchPolicy: "network-only",
  });
  const data = query.data?.adminOverview,
    refetch = query.refetch;
  useEffect(
    () =>
      onWorkspaceNotificationChange("ADMIN", "list", () => {
        void refetch().catch(() => {});
      }),
    [refetch],
  );
  return (
    <AdminOverviewDashboard
      locale={locale}
      initialNow={initialNow}
      data={data}
      loading={query.loading}
      error={Boolean(query.error)}
      retry={() => {
        void refetch().catch(() => {});
      }}
    />
  );
}
