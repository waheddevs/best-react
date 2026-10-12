"use client";
import CheckRounded from "@mui/icons-material/CheckRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useId, useState } from "react";

export function AdminRegistrySelect({
  label,
  value,
  options,
  onChange,
  disabled = false,
  wide = false,
  externalLabel = false,
}: {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (value: string) => void;
  disabled?: boolean;
  wide?: boolean;
  externalLabel?: boolean;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const id = useId();
  const width = anchor?.getBoundingClientRect().width ?? 148;
  const trigger = (
    <button
      id={id}
      aria-labelledby={externalLabel ? `${id}-label ${id}-value` : undefined}
      aria-haspopup="menu"
      aria-controls={anchor ? `${id}-menu` : undefined}
      aria-expanded={Boolean(anchor)}
      className="adminRegistryFilters__card"
      disabled={disabled}
      onClick={(e) => setAnchor(e.currentTarget)}
      type="button"
    >
      {externalLabel ? null : <span>{label}</span>}
      <strong id={`${id}-value`}>{options.find((o) => o.id === value)?.label ?? label}</strong>
      <UnfoldMoreRounded aria-hidden="true" />
    </button>
  );
  return (
    <>
      {externalLabel ? (
        <div className="adminRegistry__selectField">
          <span id={`${id}-label`}>{label}</span>
          {trigger}
        </div>
      ) : (
        trigger
      )}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
        slotProps={{
          list: { "aria-labelledby": id, id: `${id}-menu` },
          paper: {
            className: "adminRegistryFilters__menuPaper",
            style: { width: wide ? Math.max(width, 220) : width, maxHeight: 360 },
          },
        }}
      >
        {options.map((o) => (
          <MenuItem
            key={o.id}
            className="adminRegistryFilters__menuItem"
            selected={value === o.id}
            onClick={() => {
              onChange(o.id);
              setAnchor(null);
            }}
          >
            <span>{o.label}</span>
            {value === o.id ? <CheckRounded aria-hidden="true" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
