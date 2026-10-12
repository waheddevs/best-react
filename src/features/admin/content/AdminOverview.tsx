"use client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import Link from "next/link";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminOverviewDocument } from "@/gql/graphql";
import { onWorkspaceNotificationChange } from "@/features/notifications/WorkspaceNotificationEvents";
import { AdminContentMetrics } from "./AdminContentMetrics";
export function AdminOverview({ locale }: { locale: Locale }) {
  const t = getAdminContentText(locale);
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
    <article className="adminWorkspace adminRegistry adminContent">
      <header className="adminWorkspace__header">
        <div>
          <h1>{t("overview")}</h1>
          <p>{t("overviewHelp")}</p>
        </div>
      </header>
      <AdminContentMetrics locale={locale} metrics={data?.metrics ?? []} />
      {query.error ? (
        <p className="adminRegistry__error" role="alert">
          {t("error")} <button onClick={() => void refetch()}>{t("retry")}</button>
        </p>
      ) : null}
      <div className="adminContent__overview">
        {[
          { key: "todayLessons", rows: data?.lessons, href: "schedule" },
          { key: "recentRequests", rows: data?.requests, href: "requests" },
          { key: "upcoming", rows: data?.upcoming, href: "events" },
        ].map((panel) => (
          <section className="adminRegistry__tablePanel" key={panel.key} aria-busy={query.loading}>
            <header>
              <h2>{t(panel.key)}</h2>
              <Link href={`/${locale}/admin/${panel.href}`} aria-label={t("details")}>
                <ArrowOutwardRounded />
              </Link>
            </header>
            {panel.rows?.map((row) => (
              <Link
                className="adminContent__overviewRow"
                href={`/${locale}${row.href}`}
                key={row.id}
              >
                <span>
                  <strong>{row.title}</strong>
                  <small>
                    {["COURSE", "EVENT", "EXAM"].includes(row.subtitle)
                      ? t(row.subtitle)
                      : row.subtitle}
                  </small>
                </span>
                <time dateTime={row.date}>
                  {new Intl.DateTimeFormat(locale, {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "Asia/Tashkent",
                  }).format(new Date(row.date))}
                </time>
              </Link>
            ))}
            {!panel.rows?.length ? (
              <p className="adminRegistry__empty" role="status">
                {t(query.loading ? "loading" : "empty")}
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
