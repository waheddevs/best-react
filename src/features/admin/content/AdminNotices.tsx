"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import MarkEmailReadOutlined from "@mui/icons-material/MarkEmailReadOutlined";
import MarkEmailUnreadOutlined from "@mui/icons-material/MarkEmailUnreadOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import type { Locale } from "@/config/Locales";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { getWorkspaceNotificationText } from "@/dictionaries/WorkspaceNotifications";
import {
  AdminNoticeDirectoryDocument,
  WorkspaceMarkNotificationReadDocument,
  type AdminDirectoryInput,
  type AdminNoticeDirectoryQuery,
} from "@/gql/graphql";
import {
  announceWorkspaceNotificationChange,
  onWorkspaceNotificationChange,
} from "@/features/notifications/WorkspaceNotificationEvents";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { AdminContentPagination } from "./AdminContentPagination";
type Notice = AdminNoticeDirectoryQuery["adminNoticeDirectory"]["nodes"][number];
export function AdminNotices({ locale }: { locale: Locale }) {
  const t = getAdminContentText(locale),
    notifications = useNotifications();
  const [input, setInput] = useState<AdminDirectoryInput>({
      page: 1,
      pageSize: 15,
      status: "UNREAD",
    }),
    [detail, setDetail] = useState<Notice | null>(null);
  const query = useQuery(AdminNoticeDirectoryDocument, {
    variables: { input },
    context: { authenticated: true },
    fetchPolicy: "network-only",
  });
  const [mark, { loading: marking }] = useMutation(WorkspaceMarkNotificationReadDocument, {
    context: { authenticated: true },
  });
  const page = query.data?.adminNoticeDirectory;
  const refetch = query.refetch;
  useEffect(
    () =>
      onWorkspaceNotificationChange("ADMIN", "list", () => {
        void refetch().catch(() => {});
      }),
    [refetch],
  );
  const read = async (notice: Notice) => {
    if (marking || notice.readAt) return;
    try {
      const result = await mark({ variables: { input: { notificationId: notice.id } } });
      if (!result.data?.markNotificationRead.notification.readAt)
        throw new Error("Mark read failed");
      announceWorkspaceNotificationChange("ADMIN", "list");
      const refreshed = await refetch();
      const directory = refreshed.data?.adminNoticeDirectory;
      if (directory) {
        const currentPage = Math.min(directory.page, directory.pageCount);
        setInput((current) => ({ ...current, page: currentPage }));
      }
    } catch {
      notifications.error({ message: t("error") });
    }
  };
  const date = (v: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(new Date(v));
  const target = (n: Notice) =>
    n.studentId
      ? `/${locale}/admin/students/${n.studentId}`
      : n.groupId
        ? `/${locale}/admin/groups`
        : null;
  return (
    <article className="adminWorkspace adminRegistry adminContent">
      <header className="adminWorkspace__header">
        <div>
          <h1>{t("notifications")}</h1>
          <p>{t("notificationsHelp")}</p>
        </div>
      </header>
      <div className="adminNotices__viewSwitcher" role="group" aria-label={t("status")}>
        {(["UNREAD", "READ"] as const).map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={input.status === status}
            aria-controls="admin-notice-list"
            disabled={marking}
            onClick={() => setInput({ page: 1, pageSize: 15, status })}
          >
            {status === "UNREAD" ? (
              <MarkEmailUnreadOutlined aria-hidden="true" />
            ) : (
              <MarkEmailReadOutlined aria-hidden="true" />
            )}
            {t(status)}
          </button>
        ))}
      </div>
      {query.error ? (
        <p className="adminRegistry__error" role="alert">
          {t("error")} <button onClick={() => void refetch()}>{t("retry")}</button>
        </p>
      ) : null}
      <section
        id="admin-notice-list"
        className="adminContent__notices adminRegistry__tablePanel"
        aria-busy={query.loading}
      >
        <header>
          <h2>{t("notifications")}</h2>
        </header>
        {(page?.nodes ?? []).map((n) => {
          const text = getWorkspaceNotificationText(locale, n);
          return (
            <button
              type="button"
              className="adminContent__notice"
              key={n.id}
              data-unread={!n.readAt}
              disabled={marking}
              onClick={() => {
                setDetail(n);
                if (!n.readAt) void read(n);
              }}
            >
              <span className="adminRegistry__creationIcon">
                <NotificationsOutlined />
              </span>
              <span>
                <strong>{text.title}</strong>
                <span>{text.body}</span>
                <time dateTime={n.createdAt}>{date(n.createdAt)}</time>
              </span>
              {!n.readAt ? <i aria-label={t("UNREAD")} /> : null}
            </button>
          );
        })}
        {!page?.nodes.length ? (
          <p className="adminRegistry__empty" role="status">
            {t(query.loading ? "loading" : "empty")}
          </p>
        ) : null}
      </section>
      <AdminContentPagination
        section="notifications"
        locale={locale}
        page={page?.page ?? 1}
        pageCount={page?.pageCount ?? 1}
        totalCount={page?.totalCount ?? 0}
        busy={query.loading}
        onChange={(page) => setInput((i) => ({ ...i, page }))}
      />
      <Dialog
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        aria-labelledby="admin-notice-title"
        slotProps={{ paper: { className: "adminRegistry__dialog" } }}
      >
        {detail ? (
          <>
            <header>
              <h2 id="admin-notice-title">{getWorkspaceNotificationText(locale, detail).title}</h2>
              <button onClick={() => setDetail(null)} aria-label={t("close")}>
                <CloseRounded />
              </button>
            </header>
            <p>{getWorkspaceNotificationText(locale, detail).body}</p>
            <time>{date(detail.createdAt)}</time>
            {target(detail) ? (
              <div className="adminRegistry__formActions">
                <Link href={target(detail)!}>{t("details")}</Link>
              </div>
            ) : null}
          </>
        ) : null}
      </Dialog>
    </article>
  );
}
