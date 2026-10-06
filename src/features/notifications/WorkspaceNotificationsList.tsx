"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
import { workspaceNotificationTarget } from "@/lib/notifications/WorkspaceNotificationTarget";
import type { WorkspaceNoticePage, WorkspaceRole } from "@/types/WorkspaceNotification";

type Props = {
  connected: boolean;
  initial: WorkspaceNoticePage | null;
  locale: Locale;
  onUnreadCountChange?: (count: number | null) => void;
  role: WorkspaceRole;
};

export function WorkspaceNotificationsList({
  connected,
  initial,
  locale,
  onUnreadCountChange,
  role,
}: Props) {
  /* HOOKS */
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const copy = getWorkspaceNotificationsCopy(locale);
  const [page, setPage] = useState(initial);
  const [selectedUnreadOnly, setSelectedUnreadOnly] = useState(false);
  const [displayedUnreadOnly, setDisplayedUnreadOnly] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(connected && !initial);

  useEffect(() => {
    onUnreadCountChange?.(page?.unreadCount ?? null);
  }, [onUnreadCountChange, page?.unreadCount]);

  /* HANDLERS */
  const handleReload = async (filter = selectedUnreadOnly) => {
    if (!connected) return;
    setPending(true);
    try {
      setPage(await loadWorkspaceNotifications(role, 20, null, filter));
      setDisplayedUnreadOnly(filter);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };

  const handleLoadMore = async () => {
    if (!page?.pageInfo.hasNextPage || !page.pageInfo.endCursor) return;
    setPending(true);
    try {
      const next = await loadWorkspaceNotifications(
        role,
        20,
        page.pageInfo.endCursor,
        selectedUnreadOnly,
      );
      setPage({ ...next, edges: [...page.edges, ...next.edges] });
      setError(false);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };

  const handleSelect = async (notice: WorkspaceNoticePage["edges"][number]["node"]) => {
    if (!notice.readAt) {
      try {
        await markWorkspaceNotificationRead(role, notice.id);
        setPage(
          (current) =>
            current && {
              ...current,
              edges: selectedUnreadOnly
                ? current.edges.filter(({ node }) => node.id !== notice.id)
                : current.edges.map((edge) =>
                    edge.node.id === notice.id
                      ? { ...edge, node: { ...edge.node, readAt: new Date().toISOString() } }
                      : edge,
                  ),
              unreadCount: Math.max(0, current.unreadCount - 1),
            },
        );
      } catch {
        setError(true);
      }
    }
    router.push(workspaceNotificationTarget(locale, role, notice));
  };

  const handleMarkAll = async () => {
    setPending(true);
    try {
      await markAllWorkspaceNotificationsRead(role);
      await handleReload();
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  };

  const handleFilterChange = (filter: boolean) => {
    if (filter === selectedUnreadOnly || pending) return;
    setSelectedUnreadOnly(filter);
    void handleReload(filter);
  };

  return (
    <section className="workspaceNotifications" data-role={role.toLowerCase()}>
      <div className="workspaceNotifications__toolbar">
        <div className="workspaceNotifications__filters">
          <button
            aria-pressed={!selectedUnreadOnly}
            disabled={pending}
            onClick={() => handleFilterChange(false)}
            type="button"
          >
            {copy.all}
          </button>
          <button
            aria-pressed={selectedUnreadOnly}
            disabled={pending}
            onClick={() => handleFilterChange(true)}
            type="button"
          >
            {copy.unread}
            {page?.unreadCount ? ` (${page.unreadCount})` : ""}
          </button>
        </div>
        {connected && Boolean(page?.unreadCount) ? (
          <button disabled={pending} onClick={() => void handleMarkAll()} type="button">
            {copy.markAll}
          </button>
        ) : null}
      </div>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1 }}
          aria-busy={pending}
          className="workspaceNotifications__content"
          exit={{ opacity: reduceMotion ? 1 : 0 }}
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          key={displayedUnreadOnly ? "unread" : "all"}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        >
          {!connected ? <p className="workspaceNotifications__message">{copy.preview}</p> : null}
          {error ? (
            <p className="workspaceNotifications__message">
              {copy.error}{" "}
              <button onClick={() => void handleReload()} type="button">
                {copy.retry}
              </button>
            </p>
          ) : null}
          {connected && !error && page?.edges.length === 0 ? (
            <p className="workspaceNotifications__message">{copy.empty}</p>
          ) : null}
          {connected &&
            page?.edges.map(({ node }) => (
              <button
                className="workspaceNotifications__item"
                data-unread={!node.readAt}
                key={node.id}
                onClick={() => void handleSelect(node)}
                type="button"
              >
                <span aria-hidden="true" />
                <span>
                  <strong>{getWorkspaceNotificationText(locale, node).title}</strong>
                  {getWorkspaceNotificationText(locale, node).body ? (
                    <small>{getWorkspaceNotificationText(locale, node).body}</small>
                  ) : null}
                  <time dateTime={node.createdAt}>
                    {new Intl.DateTimeFormat(locale, {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Tashkent",
                    }).format(new Date(node.createdAt))}
                  </time>
                </span>
              </button>
            ))}
          {connected && page?.pageInfo.hasNextPage ? (
            <button
              className="workspaceNotifications__more"
              disabled={pending}
              onClick={() => void handleLoadMore()}
              type="button"
            >
              {copy.more}
            </button>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
