"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";

import type { AdminTeachersCopy, AdminTeacherStatusFilter } from "@/types/admin/AdminTeachers";

type AdminTeacherFiltersProps = {
  copy: AdminTeachersCopy;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (status: AdminTeacherStatusFilter) => void;
  query: string;
  searchLabel: string;
  searchPlaceholder: string;
  statusLabel: string;
  status: AdminTeacherStatusFilter;
};

export function AdminTeacherFilters({
  copy,
  onQueryChange,
  onStatusChange,
  query,
  searchLabel,
  searchPlaceholder,
  statusLabel,
  status,
}: AdminTeacherFiltersProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);
  const triggerWidth = anchorElement?.getBoundingClientRect().width ?? 148;
  const options = Object.entries(copy.statusLabels) as Array<[AdminTeacherStatusFilter, string]>;
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorElement(event.currentTarget);
  const handleClose = () => setAnchorElement(null);

  return (
    <section className="adminTeacherFilters">
      <label className="adminTeacherFilters__search">
        <SearchRounded aria-hidden="true" />
        <span className="adminWorkspace__srOnly">{searchLabel}</span>
        <input
          onChange={onQueryChange}
          placeholder={searchPlaceholder}
          type="search"
          value={query}
        />
      </label>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="adminTeacherFilters__card"
        onClick={handleOpen}
        type="button"
      >
        <span>{statusLabel}</span>
        <strong>{copy.statusLabels[status]}</strong>
        <UnfoldMoreRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        disablePortal
        onClose={handleClose}
        open={open}
        slotProps={{
          list: { "aria-label": statusLabel, dense: true },
          paper: {
            className: "adminTeacherFilters__menuPaper",
            style: { maxWidth: triggerWidth, minWidth: triggerWidth, width: triggerWidth },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
      >
        {options.map(([value, label]) => (
          <MenuItem
            className="adminTeacherFilters__menuItem"
            key={value}
            onClick={() => {
              onStatusChange(value);
              handleClose();
            }}
            selected={value === status}
          >
            <span>{label}</span>
            {value === status ? <CheckRounded aria-hidden="true" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </section>
  );
}
