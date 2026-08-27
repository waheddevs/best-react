"use client";

import { useCallback, useContext, useMemo } from "react";

import { NotificationContext } from "@/features/notifications/NotificationContext";
import type {
  NotificationId,
  NotificationInput,
  PromiseNotificationInput,
} from "@/types/Notification";

export function useNotifications() {
  /* HOOKS */
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider.");
  }

  const { dismissNotification, showCenterAlert, showNotification } = context;

  const success = useCallback(
    (input?: NotificationInput) => showNotification("success", input),
    [showNotification],
  );
  const error = useCallback(
    (input?: NotificationInput) => showNotification("error", input),
    [showNotification],
  );
  const warning = useCallback(
    (input?: NotificationInput) => showNotification("warning", input),
    [showNotification],
  );
  const info = useCallback(
    (input?: NotificationInput) => showNotification("info", input),
    [showNotification],
  );
  const loading = useCallback(
    (input?: NotificationInput) => showNotification("loading", input),
    [showNotification],
  );
  const dismiss = useCallback(
    (id?: NotificationId) => dismissNotification(id),
    [dismissNotification],
  );

  const promise = useCallback(
    async <Data,>(operation: Promise<Data>, messages: PromiseNotificationInput<Data> = {}) => {
      const notificationId = showNotification("loading", messages.loading);

      try {
        const data = await operation;
        const successMessage =
          typeof messages.success === "function" ? messages.success(data) : messages.success;
        showNotification("success", successMessage, notificationId);
        return data;
      } catch (caughtError: unknown) {
        const errorMessage =
          typeof messages.error === "function" ? messages.error(caughtError) : messages.error;
        showNotification("error", errorMessage, notificationId);
        throw caughtError;
      }
    },
    [showNotification],
  );

  return useMemo(
    () => ({ success, error, warning, info, loading, promise, dismiss, showCenterAlert }),
    [dismiss, error, info, loading, promise, showCenterAlert, success, warning],
  );
}
