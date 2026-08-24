"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Toaster } from "sonner";

import { NotificationContext } from "@/features/notifications/NotificationContext";
import type {
  CenterAlertInput,
  ConfirmDialogInput,
  NotificationCopy,
  ResolvedCenterAlertOptions,
  ResolvedConfirmDialogOptions,
} from "@/types/Notification";

import { LiquidCenterAlert } from "./LiquidCenterAlert";
import { LiquidAlertDialog } from "./LiquidAlertDialog";

type NotificationProviderProps = {
  children: ReactNode;
  copy: NotificationCopy;
};

export function NotificationProvider({ children, copy }: NotificationProviderProps) {
  /* HOOKS */
  const centerAlertFrameRef = useRef<number | null>(null);
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);
  const [isCenterAlertOpen, setIsCenterAlertOpen] = useState(false);
  const [centerAlertOptions, setCenterAlertOptions] = useState<ResolvedCenterAlertOptions | null>(
    null,
  );
  const [dialogOptions, setDialogOptions] = useState<ResolvedConfirmDialogOptions | null>(null);

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
    () => ({ copy, confirm, showCenterAlert }),
    [confirm, copy, showCenterAlert],
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

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Toaster
        closeButton={false}
        containerAriaLabel={copy.containerAriaLabel}
        duration={4200}
        gap={12}
        mobileOffset={16}
        offset={24}
        position="top-right"
        swipeDirections={["right", "top"]}
        theme="light"
        toastOptions={{ unstyled: true }}
        visibleToasts={4}
      />
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
