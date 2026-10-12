"use client";

import LogoutRounded from "@mui/icons-material/LogoutRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/config/Locales";
import { useWorkspaceLogout } from "@/hooks/navigation/useWorkspaceLogout";
import type { AdminWorkspaceCopy } from "@/types/admin/AdminWorkspace";
import { AdminRecordAvatar } from "@/features/admin/workspace/AdminRecordAvatar";

type AdminProfileCardProps = {
  adminName: string;
  avatarUrl: string | null;
  locale: Locale;
  logoutCopy: Pick<
    AdminWorkspaceCopy["common"],
    "logoutCancelLabel" | "logoutConfirmLabel" | "logoutLabel" | "logoutMessage" | "logoutTitle"
  >;
  onNavigate?: () => void;
};

function getCompactAdminName(adminName: string) {
  const parts = adminName.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? adminName;
  return `${parts[0]} ${parts.at(-1)?.charAt(0).toUpperCase()}.`;
}

export function AdminProfileCard({
  adminName,
  avatarUrl,
  locale,
  logoutCopy,
  onNavigate,
}: AdminProfileCardProps) {
  const pathname = usePathname();
  const href = `/${locale}/admin/settings`;
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const compactName = getCompactAdminName(adminName);
  const handleLogout = useWorkspaceLogout({
    confirmation: {
      brand: "admin",
      cancelLabel: logoutCopy.logoutCancelLabel,
      confirmLabel: logoutCopy.logoutConfirmLabel,
      icon: "logout",
      message: logoutCopy.logoutMessage,
      title: logoutCopy.logoutTitle,
      tone: "danger",
    },
    locale,
    onConfirmed: onNavigate,
    role: "admin",
  });

  return (
    <div
      className={
        active
          ? "adminShell__profileCard adminShell__profileCard_active"
          : "adminShell__profileCard"
      }
    >
      <Link
        aria-current={active ? "page" : undefined}
        aria-label={`${adminName}, Admin`}
        className="adminShell__profileIdentity"
        href={href}
        onClick={onNavigate}
        title={`${adminName} - Admin`}
      >
        <AdminRecordAvatar
          avatarUrl={avatarUrl}
          displayName={adminName}
          className="adminShell__profileAvatar"
        />
        <span className="adminShell__profileCopy">
          <strong>{compactName}</strong>
          <small>Admin</small>
        </span>
      </Link>
      <button
        aria-label={logoutCopy.logoutLabel}
        className="adminShell__profileLogout"
        onClick={() => void handleLogout()}
        title={logoutCopy.logoutLabel}
        type="button"
      >
        <LogoutRounded />
      </button>
    </div>
  );
}
