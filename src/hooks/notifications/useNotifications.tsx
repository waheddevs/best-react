"use client";

import { useCallback, useContext, useMemo } from "react";
import { toast } from "sonner";

import { LiquidToast } from "@/features/notifications/LiquidToast";
import { NotificationContext } from "@/features/notifications/NotificationContext";
import type {
  NotificationId,
  NotificationInput,
  NotificationTone,
  PromiseNotificationInput,
} from "@/types/Notification";

const defaultDuration = 4200;

export function useNotifications() {
  /* HOOKS */
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider.");
  }

  const { copy, showCenterAlert } = context;

  const showNotification = useCallback(
    (tone: NotificationTone, input: NotificationInput = {}, id?: NotificationId) => {
      const fallback = copy.defaults[tone];

      return toast.custom(
        (toastId) => (
          <LiquidToast
            action={input.action}
            closeAriaLabel={copy.closeAriaLabel}
            message={input.message ?? fallback.message}
            onDismiss={() => toast.dismiss(toastId)}
            title={input.title ?? fallback.title}
            tone={tone}
          />
        ),
        {
          duration: input.duration ?? (tone === "loading" ? Infinity : defaultDuration),
          id,
          unstyled: true,
        },
      );
    },
    [copy.closeAriaLabel, copy.defaults],
  );

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
  const dismiss = useCallback((id?: NotificationId) => toast.dismiss(id), []);

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
