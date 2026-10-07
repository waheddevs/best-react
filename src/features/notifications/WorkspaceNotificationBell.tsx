"use client";

import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

import type { Locale } from "@/config/Locales";
import {
  getWorkspaceNotificationText,
  getWorkspaceNotificationsCopy,
} from "@/dictionaries/WorkspaceNotifications";
import {
  loadWorkspaceNotifications,
  markAllWorkspaceNotificationsRead,
  markWorkspaceNotificationRead,
} from "@/features/notifications/WorkspaceNotificationActions";
import {
  announceWorkspaceNotificationChange,
  onWorkspaceNotificationChange,
} from "@/features/notifications/WorkspaceNotificationEvents";
import { workspaceNotificationTarget } from "@/lib/notifications/WorkspaceNotificationTarget";
import { recentWorkspaceNotices } from "@/lib/notifications/WorkspaceNotificationPreview";
import type { WorkspaceNotice, WorkspaceRole } from "@/types/WorkspaceNotification";

type WorkspaceNotificationBellProps = {
  connected: boolean;
  getNoticeText?: (
    locale: Locale,
    notice: WorkspaceNotice,
  ) => { title: string; body: string | null };
  initial?: { notifications: WorkspaceNotice[]; unreadCount: number };
  initialError?: boolean;
  locale: Locale;
  role: WorkspaceRole;
};

export function WorkspaceNotificationBell({
  connected,
  getNoticeText,
  initial,
  initialError = false,
  locale,
  role,
}: WorkspaceNotificationBellProps) {
  const router = useRouter();
  const mobile = useMediaQuery("(max-width: 640px)");
  const copy = getWorkspaceNotificationsCopy(locale);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [notices, setNotices] = useState<WorkspaceNotice[]>(initial?.notifications ?? []);
  const [unreadCount, setUnreadCount] = useState(initial?.unreadCount ?? 0);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(connected && !initial);
  const open = Boolean(anchor);
  const allHref = `/${locale}/${role.toLowerCase()}/notifications`;
  const previewLimit = role === "STUDENT" ? 3 : 8;
  const recentNotices = recentWorkspaceNotices(notices, previewLimit);

  const refresh = useCallback(async () => {
    if (!connected) return;
    setLoading(true);
    try {
      const page = await loadWorkspaceNotifications(role, previewLimit);
      setNotices(page.edges.map(({ node }) => node));
      setUnreadCount(page.unreadCount);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [connected, previewLimit, role]);

  useEffect(() => {
    if (!connected) return;
    const initialRefresh = initial ? null : window.setTimeout(() => void refresh(), 0);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 30_000);
    const focus = () => void refresh();
    window.addEventListener("focus", focus);
    return () => {
      if (initialRefresh !== null) window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
      window.removeEventListener("focus", focus);
    };
  }, [connected, initial, refresh]);

  useEffect(() => {
    if (!connected) return;
    return onWorkspaceNotificationChange(role, "bell", () => void refresh());
  }, [connected, refresh, role]);

  const select = async (notice: WorkspaceNotice) => {
    setAnchor(null);
    if (connected && !notice.readAt) {
      try {
        const updated = await markWorkspaceNotificationRead(role, notice.id);
        setNotices((current) =>
          current.map((item) =>
            item.id === notice.id ? { ...item, readAt: updated.readAt } : item,
          ),
        );
        setUnreadCount((current) => Math.max(0, current - 1));
        announceWorkspaceNotificationChange(role, "bell");
      } catch {
        setError(true);
      }
    }
    const target = workspaceNotificationTarget(locale, role, notice);
    if (target) router.push(target);
  };

  const markAll = async () => {
    if (!connected || unreadCount === 0) return;
    setLoading(true);
    try {
      await markAllWorkspaceNotificationsRead(role);
      await refresh();
      announceWorkspaceNotificationChange(role, "bell");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="workspaceNoticePanel" data-role={role.toLowerCase()}>
      <div className="workspaceNoticePanel__header">
        <strong>{copy.title}</strong>
        {connected && unreadCount > 0 ? <span>{unreadCount}</span> : null}
      </div>
      {!connected ? <p className="workspaceNoticePanel__message">{copy.preview}</p> : null}
      {connected && error ? (
        <p className="workspaceNoticePanel__message">
          {copy.error}{" "}
          <button onClick={() => void refresh()} type="button">
            {copy.retry}
          </button>
        </p>
      ) : null}
      {connected && !error && loading && notices.length === 0 ? (
        <p className="workspaceNoticePanel__message">{copy.loading}</p>
      ) : null}
      {connected && !error && !loading && notices.length === 0 ? (
        <p className="workspaceNoticePanel__message">{copy.empty}</p>
      ) : null}
      {connected &&
        recentNotices.map((notice) => {
          const noticeText =
            getNoticeText?.(locale, notice) ?? getWorkspaceNotificationText(locale, notice);
          return (
            <button
              className="workspaceNoticePanel__item"
              data-unread={!notice.readAt}
              key={notice.id}
              onClick={() => void select(notice)}
              type="button"
            >
              <span className="workspaceNoticePanel__itemDot" aria-hidden="true" />
              <span>
                <strong>{noticeText.title}</strong>
                {noticeText.body ? <small>{noticeText.body}</small> : null}
                <time dateTime={notice.createdAt}>
                  {new Intl.DateTimeFormat(locale, {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Tashkent",
                  }).format(new Date(notice.createdAt))}
                </time>
              </span>
            </button>
          );
        })}
      <div className="workspaceNoticePanel__footer">
        {connected && unreadCount > 0 ? (
          <button disabled={loading} onClick={() => void markAll()} type="button">
            {copy.markAll}
          </button>
        ) : null}
        <Link href={allHref} onClick={() => setAnchor(null)}>
          {copy.viewAll}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <span className="workspaceBell" data-role={role.toLowerCase()}>
        <button
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={`${copy.title}${unreadCount > 0 ? `: ${unreadCount}` : ""}`}
          className="workspaceBell__trigger"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            setAnchor(event.currentTarget);
            void refresh();
          }}
          type="button"
        >
          <NotificationsNoneRounded />
        </button>
        {unreadCount > 0 ? <span className="workspaceBell__dot" aria-hidden="true" /> : null}
      </span>
      {mobile ? (
        <Drawer
          anchor="bottom"
          onClose={() => setAnchor(null)}
          open={open}
          slotProps={{ paper: { className: "workspaceNoticePanel__drawerPaper" } }}
        >
          {content}
        </Drawer>
      ) : (
        <Popover
          anchorEl={anchor}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setAnchor(null)}
          open={open}
          slotProps={{
            paper: {
              className:
                role === "STUDENT"
                  ? "workspaceNoticePanel__paper workspaceNoticePanel__paper_student"
                  : "workspaceNoticePanel__paper",
            },
          }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {content}
        </Popover>
      )}
    </>
  );
}
