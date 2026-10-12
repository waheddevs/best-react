"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/config/Locales";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import type { ConfirmDialogInput } from "@/types/Notification";

type WorkspaceLogoutOptions = {
  confirmation: ConfirmDialogInput;
  locale: Locale;
  onConfirmed?: () => void;
  role: "admin" | "student" | "teacher";
};

export function useWorkspaceLogout({
  confirmation,
  locale,
  onConfirmed,
  role,
}: WorkspaceLogoutOptions) {
  const confirm = useConfirmDialog();
  const router = useRouter();
  const session = useSession();

  return async () => {
    if (!(await confirm(confirmation))) return;

    onConfirmed?.();
    const redirectTo = `/${locale}/login?role=${role}`;
    if (session.status === "authenticated") {
      await signOut({ redirectTo });
      return;
    }
    router.push(redirectTo);
  };
}
