"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide, { type SlideProps } from "@mui/material/Slide";

import { NotificationContext } from "@/features/notifications/NotificationContext";
import type {
  CenterAlertInput,
  ConfirmDialogInput,
  NotificationAction,
  NotificationCopy,
  NotificationId,
  NotificationInput,
  NotificationTone,
  ResolvedCenterAlertOptions,
  ResolvedConfirmDialogOptions,
} from "@/types/Notification";

import { LiquidCenterAlert } from "./LiquidCenterAlert";
import { LiquidAlertDialog } from "./LiquidAlertDialog";
import { LiquidToast } from "./LiquidToast";

type NotificationProviderProps = {
  children: ReactNode;
  copy: NotificationCopy;
};

type QueuedNotification = {
  action?: NotificationAction;
  duration: number | null;
  id: NotificationId;
  icon: NonNullable<NotificationInput["icon"]>;
  message: string;
  renderKey: number;
  title: string;
  tone: NotificationTone;
};

const defaultToastDuration = 1800;

const NotificationToastTransition = (props: SlideProps) => <Slide {...props} direction="down" />;

export function NotificationProvider({ children, copy }: NotificationProviderProps) {
  /* HOOKS */
  const centerAlertFrameRef = useRef<number | null>(null);
  const closingToastIdRef = useRef<NotificationId | null>(null);
  const notificationSequenceRef = useRef(0);
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);
  const toastQueueRef = useRef<QueuedNotification[]>([]);
  const [isCenterAlertOpen, setIsCenterAlertOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [centerAlertOptions, setCenterAlertOptions] = useState<ResolvedCenterAlertOptions | null>(
    null,
  );
  const [dialogOptions, setDialogOptions] = useState<ResolvedConfirmDialogOptions | null>(null);
  const [toastQueue, setToastQueue] = useState<QueuedNotification[]>([]);
  const currentToast = toastQueue[0] ?? null;

  const confirm = useCallback(
    (input: ConfirmDialogInput = {}) => {
      resolveRef.current?.(false);

      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve;
        setDialogOptions({
          title: input.title ?? copy.confirm.title,
          message: input.message ?? copy.confirm.message,
          confirmLabel: input.confirmLabel ?? copy.confirm.confirmLabel,
          cancelLabel: input.cancelLabel ?? copy.confirm.cancelLabel,
          icon: input.icon ?? "tone",
          tone: input.tone ?? "default",
        });
      });
    },
    [copy.confirm],
  );

  const showCenterAlert = useCallback((input: CenterAlertInput) => {
    if (centerAlertFrameRef.current !== null) {
      window.cancelAnimationFrame(centerAlertFrameRef.current);
    }

    setIsCenterAlertOpen(false);
    setCenterAlertOptions({
      ...input,
      tone: input.tone ?? "success",
    });

    centerAlertFrameRef.current = window.requestAnimationFrame(() => {
      centerAlertFrameRef.current = null;
      setIsCenterAlertOpen(true);
    });
  }, []);

  const showNotification = useCallback(
    (tone: NotificationTone, input: NotificationInput = {}, id?: NotificationId) => {
      const fallback = copy.defaults[tone];
      const notificationId = id ?? `notification-${++notificationSequenceRef.current}`;
      const nextNotification: QueuedNotification = {
        action: input.action,
        duration: input.duration ?? (tone === "loading" ? null : defaultToastDuration),
        id: notificationId,
        icon: input.icon ?? "tone",
        message: input.message ?? fallback.message,
        renderKey: ++notificationSequenceRef.current,
        title: input.title ?? fallback.title,
        tone,
      };

      const queue = toastQueueRef.current;
      const existingIndex = queue.findIndex((notification) => notification.id === notificationId);
      const nextQueue =
        existingIndex === -1
          ? [...queue, nextNotification]
          : queue.map((notification, index) =>
              index === existingIndex ? nextNotification : notification,
            );

      toastQueueRef.current = nextQueue;
      setToastQueue(nextQueue);

      if (queue.length === 0) {
        setIsToastOpen(true);
      }

      return notificationId;
    },
    [copy.defaults],
  );

  const dismissNotification = useCallback((id?: NotificationId) => {
    if (id === undefined) {
      closingToastIdRef.current = null;
      toastQueueRef.current = [];
      setToastQueue([]);
      setIsToastOpen(false);
      return;
    }

    if (toastQueueRef.current[0]?.id === id) {
      closingToastIdRef.current = id;
      setIsToastOpen(false);
      return;
    }

    const nextQueue = toastQueueRef.current.filter((notification) => notification.id !== id);
    toastQueueRef.current = nextQueue;
    setToastQueue(nextQueue);
  }, []);

  useEffect(() => {
    return () => {
      if (centerAlertFrameRef.current !== null) {
        window.cancelAnimationFrame(centerAlertFrameRef.current);
      }
      resolveRef.current?.(false);
      resolveRef.current = null;
    };
  }, []);

  const contextValue = useMemo(
    () => ({ copy, confirm, dismissNotification, showCenterAlert, showNotification }),
    [confirm, copy, dismissNotification, showCenterAlert, showNotification],
  );

  /* HANDLERS */
  const handleDialogResult = useCallback((confirmed: boolean) => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    setDialogOptions(null);
    resolve?.(confirmed);
  }, []);

  const handleDialogCancel = useCallback(() => {
    handleDialogResult(false);
  }, [handleDialogResult]);

  const handleDialogConfirm = useCallback(() => {
    handleDialogResult(true);
  }, [handleDialogResult]);

  const handleCenterAlertClose = useCallback(() => {
    setIsCenterAlertOpen(false);
  }, []);

  const handleCenterAlertExited = useCallback(() => {
    setCenterAlertOptions(null);
  }, []);

  const handleToastClose = useCallback(
    (_event: Event | SyntheticEvent, reason?: string) => {
      if (reason === "clickaway" || !currentToast) return;
      closingToastIdRef.current = currentToast.id;
      setIsToastOpen(false);
    },
    [currentToast],
  );

  const handleToastExited = useCallback(() => {
    const closedId = closingToastIdRef.current;
    closingToastIdRef.current = null;

    if (closedId !== null) {
      const nextQueue = toastQueueRef.current.filter(
        (notification) => notification.id !== closedId,
      );
      toastQueueRef.current = nextQueue;
      setToastQueue(nextQueue);

      if (nextQueue.length > 0) {
        setIsToastOpen(true);
      }
    }
  }, []);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {currentToast ? (
        <Snackbar
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={currentToast.duration}
          className="publicShared__notificationSnackbar"
          key={currentToast.renderKey}
          onClose={handleToastClose}
          open={isToastOpen}
          slots={{ transition: NotificationToastTransition }}
          slotProps={{
            transition: {
              onExited: handleToastExited,
              timeout: { enter: 220, exit: 180 },
            },
          }}
        >
          <LiquidToast
            action={currentToast.action}
            closeAriaLabel={copy.closeAriaLabel}
            icon={currentToast.icon}
            message={currentToast.message}
            onDismiss={() => dismissNotification(currentToast.id)}
            title={currentToast.title}
            tone={currentToast.tone}
          />
        </Snackbar>
      ) : null}
      <LiquidAlertDialog
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
        options={dialogOptions}
      />
      <LiquidCenterAlert
        onClose={handleCenterAlertClose}
        onExited={handleCenterAlertExited}
        open={isCenterAlertOpen}
        options={centerAlertOptions}
      />
    </NotificationContext.Provider>
  );
}
