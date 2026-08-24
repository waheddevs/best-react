"use client";

import { useContext } from "react";

import { NotificationContext } from "@/features/notifications/NotificationContext";

export function useConfirmDialog() {
  /* HOOKS */
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useConfirmDialog must be used within NotificationProvider.");
  }

  return context.confirm;
}
