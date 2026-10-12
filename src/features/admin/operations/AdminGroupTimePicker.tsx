"use client";

import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import { useId, useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";

export function AdminGroupTimePicker({
  label,
  locale,
  value,
  onChange,
  disabled,
}: {
  label: string;
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  /* HOOKS */
  const id = useId();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const hourItem = useRef<HTMLLIElement | null>(null);
  const minuteItem = useRef<HTMLLIElement | null>(null);
  const t = getAdminRegistryText(locale);
  const [hour, minute] = value.split(":");

  /* HANDLERS */
  const focusSelection = () => {
    for (const item of [hourItem.current, minuteItem.current]) {
      if (item?.parentElement) {
        item.parentElement.scrollTop =
          item.offsetTop - (item.parentElement.clientHeight - item.offsetHeight) / 2;
      }
    }
    hourItem.current?.focus({ preventScroll: true });
  };

  return (
    <div className="adminGroupTime">
      <span id={`${id}-label`}>{label}</span>
      <button
        type="button"
        className="adminGroupTime__trigger"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? `${id}-menu` : undefined}
        disabled={disabled}
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        <strong id={`${id}-value`}>{value}</strong>
        <AccessTimeRounded aria-hidden="true" />
      </button>
      <Popover
        open={Boolean(anchor) && !disabled}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        slotProps={{
          paper: { className: "adminGroupTime__menu" },
          transition: { onEntered: focusSelection },
        }}
      >
        <div id={`${id}-menu`} role="dialog" aria-label={label}>
          <div className="adminGroupTime__columns">
            {(["hour", "minute"] as const).map((part) => (
              <div key={part}>
                <span id={`${id}-${part}`}>{t(part)}</span>
                <MenuList className="adminGroupTime__list" aria-labelledby={`${id}-${part}`}>
                  {Array.from({ length: part === "hour" ? 24 : 60 }, (_, index) => {
                    const number = String(index).padStart(2, "0");
                    const selected = number === (part === "hour" ? hour : minute);
                    return (
                      <MenuItem
                        key={number}
                        role="menuitemradio"
                        aria-checked={selected}
                        selected={selected}
                        ref={selected ? (part === "hour" ? hourItem : minuteItem) : undefined}
                        onClick={() => {
                          onChange(part === "hour" ? `${number}:${minute}` : `${hour}:${number}`);
                          if (part === "minute") setAnchor(null);
                        }}
                      >
                        {number}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}
