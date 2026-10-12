"use client";

import Dialog from "@mui/material/Dialog";
import type { ReactNode } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { AdminDetailsHeader } from "./AdminDetailsHeader";

export function AdminDirectoryDetails({
  locale,
  title,
  icon,
  status,
  tone,
  fields,
  children,
  onClose,
}: {
  locale: Locale;
  title: string;
  icon: ReactNode;
  status: string;
  tone: string;
  fields: Array<{ label: string; value: string }>;
  children?: ReactNode;
  onClose: () => void;
}) {
  const t = getAdminRegistryText(locale);
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth={false}
      aria-labelledby="admin-directory-detail-title"
      slotProps={{
        paper: { className: "adminRegistry__dialog adminDirectoryDetails" },
        backdrop: { className: "publicShared__notificationDialogBackdrop" },
      }}
    >
      <AdminDetailsHeader
        titleId="admin-directory-detail-title"
        title={title}
        eyebrow={t("details")}
        icon={icon}
        closeLabel={t("close")}
        onClose={onClose}
      />
      <div className="adminDirectoryDetails__body">
        <span className={`adminWorkspace__status adminWorkspace__status_${tone}`}>{status}</span>
        <dl className="adminDirectoryDetails__facts">
          {fields.map((field, index) => (
            <div key={`${field.label}-${index}`}>
              <dt>{field.label}</dt>
              <dd>{field.value || "—"}</dd>
            </div>
          ))}
        </dl>
        {children}
      </div>
    </Dialog>
  );
}
