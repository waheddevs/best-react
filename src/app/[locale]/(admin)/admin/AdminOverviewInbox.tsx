import { useState } from "react";
import Link from "next/link";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import type { Locale } from "@/config/Locales";
import type { AdminOverviewQuery } from "@/gql/graphql";
import { getAdminOverviewCopy } from "@/dictionaries/admin/AdminOverview";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminOverviewPager } from "./AdminOverviewPager";

export function AdminOverviewInbox({
  locale,
  data,
  loading,
  error,
  retry,
  pageSize,
  active,
}: {
  locale: Locale;
  data?: AdminOverviewQuery["adminOverview"];
  loading: boolean;
  error: boolean;
  retry: () => void;
  pageSize: number;
  active: boolean;
}) {
  const copy = getAdminOverviewCopy(locale);
  const t = getAdminContentText(locale);
  const [selectedPage, setPage] = useState(0);
  const rows = data?.requests ?? [];
  const pages = Math.ceil(rows.length / pageSize);
  const page = Math.min(selectedPage, Math.max(0, pages - 1));
  const unread = data?.metrics.find((metric) => metric.key === "UNREAD")?.value ?? "0";
  return (
    <section
      className="adminOverview__panel adminOverview__inbox"
      data-active={active}
      aria-labelledby="overview-inbox-title"
      aria-busy={loading}
    >
      <header>
        <h2 id="overview-inbox-title">{copy.attention}</h2>
        <Link href={`/${locale}/admin/requests`} aria-label={copy.viewAll}>
          <ArrowForwardRounded />
        </Link>
      </header>
      {loading || error ? (
        <div className="adminOverview__empty" role={error ? "alert" : "status"}>
          <p>{error ? copy.error : copy.loading}</p>
          {error && (
            <button type="button" onClick={retry}>
              {copy.retry}
            </button>
          )}
        </div>
      ) : (
        <>
          <Link className="adminOverview__notice" href={`/${locale}/admin/notifications`}>
            <NotificationsNoneRounded />
            <span>{copy.unread}</span>
            <strong>{unread}</strong>
            <ArrowForwardRounded />
          </Link>
          {rows.length ? (
            <div className="adminOverview__requests">
              {rows.slice(page * pageSize, (page + 1) * pageSize).map((row) => (
                <Link key={`${row.subtitle}-${row.id}`} href={`/${locale}${row.href}`}>
                  <span className="adminOverview__initial" aria-hidden="true">
                    {row.title.trim().slice(0, 1).toUpperCase()}
                  </span>
                  <span className="adminOverview__requestInfo">
                    <strong title={row.title}>{row.title}</strong>
                    <small>{t(row.subtitle)}</small>
                  </span>
                  <time dateTime={row.date}>
                    {new Intl.DateTimeFormat(locale, {
                      month: "short",
                      day: "numeric",
                      timeZone: "Asia/Tashkent",
                    }).format(new Date(row.date))}
                  </time>
                  <ArrowForwardRounded />
                </Link>
              ))}
            </div>
          ) : (
            <div className="adminOverview__empty">
              <CheckCircleOutlineRounded />
              <strong>{copy.noRequests}</strong>
              <p>{copy.noRequestsHint}</p>
            </div>
          )}
          <AdminOverviewPager locale={locale} page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </section>
  );
}
