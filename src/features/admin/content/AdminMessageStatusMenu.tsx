"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useId, useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminMessagesText } from "@/dictionaries/admin/AdminMessages";
import type { IntakeStatus } from "@/gql/graphql";

export function AdminMessageStatusMenu({
  locale,
  name,
  value,
  options,
  disabled,
  onChange,
}: {
  locale: Locale;
  name: string;
  value: IntakeStatus;
  options: IntakeStatus[];
  disabled: boolean;
  onChange: (status: IntakeStatus) => void;
}) {
  const t = getAdminMessagesText(locale);
  const id = useId();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const pending = useRef<IntakeStatus | null>(null);
  const tone = value === "RESOLVED" ? "success" : value === "REJECTED" ? "danger" : "neutral";

  return (
    <>
      <button
        id={id}
        type="button"
        className={`adminRegistry__status adminRegistry__status_${tone} adminContent__statusTrigger`}
        disabled={disabled}
        aria-label={`${t("changeRequestStatus")}: ${name}, ${t(value)}`}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? `${id}-menu` : undefined}
        title={t("changeRequestStatus")}
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        <span>{t(value)}</span>
        <UnfoldMoreRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
        slotProps={{
          list: { id: `${id}-menu`, "aria-labelledby": id },
          paper: { className: "adminRegistryFilters__menuPaper", style: { minWidth: 174 } },
          transition: {
            // Restore focus to the badge before opening the confirmation alert.
            onExited: () => {
              const next = pending.current;
              pending.current = null;
              if (next) onChange(next);
            },
          },
        }}
      >
        {options.map((status) => (
          <MenuItem
            key={status}
            className="adminRegistryFilters__menuItem"
            selected={status === value}
            onClick={() => {
              pending.current = status === value ? null : status;
              setAnchor(null);
            }}
          >
            <span>{t(status)}</span>
            {status === value ? <CheckRounded aria-hidden="true" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
