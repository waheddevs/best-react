import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { Locale } from "@/config/Locales";
import {
  markTeacherNotificationRead,
  refreshTeacherNotifications,
} from "@/features/teacher/notifications/TeacherNotificationActions";
import type { TeacherNotice, TeacherNoticeState } from "@/types/teacher/TeacherNotifications";

export function useTeacherNotifications(
  initial: TeacherNoticeState,
  locale: Locale,
  connected: boolean,
  initialError: boolean,
) {
  /* HOOKS */
  const router = useRouter();
  const [state, setState] = useState(initial);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!connected) return;
    setLoading(true);
    try {
      const next = await refreshTeacherNotifications();
      setState(next);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [connected]);

  useEffect(() => {
    if (!connected) return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 30_000);
    const handleFocus = () => void refresh();
    window.addEventListener("focus", handleFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [connected, refresh]);

  /* HANDLERS */
  const handleNotificationSelect = async (notification: TeacherNotice) => {
    if (connected && notification.readAt === null) {
      try {
        await markTeacherNotificationRead(notification.id);
        setState((current) => ({
          notifications: current.notifications.map((item) =>
            item.id === notification.id ? { ...item, readAt: new Date().toISOString() } : item,
          ),
          unreadCount: Math.max(0, current.unreadCount - 1),
        }));
      } catch {
        setError(true);
      }
    }
    const target = notification.taskId
      ? `/${locale}/teacher/tasks?task=${encodeURIComponent(notification.taskId)}`
      : `/${locale}/teacher/tasks`;
    router.push(target);
  };

  return { state, error, loading, refresh, handleNotificationSelect };
}
