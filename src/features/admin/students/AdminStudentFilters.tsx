"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";

import type {
  AdminStudentFilterState,
  AdminStudentsCopy,
  AdminStudentStatusFilter,
} from "@/types/admin/AdminStudents";
import type { AdminWorkspaceRecord } from "@/types/admin/AdminWorkspace";

type AdminStudentFiltersProps = {
  copy: AdminStudentsCopy;
  onChange: (filters: AdminStudentFilterState) => void;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
  records: AdminWorkspaceRecord[];
  searchLabel: string;
  searchPlaceholder: string;
  statusLabel: string;
  value: AdminStudentFilterState;
};

type FilterChip = {
  key: string;
  label: string;
  reset: Partial<AdminStudentFilterState>;
};

type FilterOption<T extends string> = {
  label: string;
  value: T;
};

type FilterMenuProps<T extends string> = {
  label: string;
  onChange: (value: T) => void;
  options: FilterOption<T>[];
  value: T;
  wideMenu?: boolean;
};

const defaultFilters: AdminStudentFilterState = {
  groupId: "ALL",
  joinedWithinDays: "ALL",
  status: "ALL",
  teacherId: "ALL",
};

function directoryOptions(
  records: AdminWorkspaceRecord[],
  idKey: "activeGroupId" | "activeTeacherId",
  labelKey: "activeGroupName" | "activeTeacherName",
) {
  const options = new Map<string, string>();
  records.forEach((record) => {
    const id = record.studentDirectory?.[idKey];
    const label = record.studentDirectory?.[labelKey];
    if (id && label) options.set(id, label);
  });
  return [...options].sort((first, second) => first[1].localeCompare(second[1]));
}

function FilterMenu<T extends string>({
  label,
  onChange,
  options,
  value,
  wideMenu = false,
}: FilterMenuProps<T>) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const selectedLabel = options.find((option) => option.value === value)?.label ?? label;
  const open = Boolean(anchorElement);
  const triggerWidth = anchorElement?.getBoundingClientRect().width ?? 148;
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorElement(event.currentTarget);
  const handleClose = () => setAnchorElement(null);

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="adminStudentFilters__card"
        onClick={handleOpen}
        type="button"
      >
        <span>{label}</span>
        <strong>{selectedLabel}</strong>
        <UnfoldMoreRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        disablePortal
        onClose={handleClose}
        open={open}
        slotProps={{
          list: { "aria-label": label, dense: true },
          paper: {
            className: "adminStudentFilters__menuPaper",
            style: wideMenu
              ? { minWidth: Math.max(triggerWidth, 174) }
              : { maxWidth: triggerWidth, minWidth: triggerWidth, width: triggerWidth },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
      >
        {options.map((option) => (
          <MenuItem
            className="adminStudentFilters__menuItem"
            key={option.value}
            onClick={() => {
              onChange(option.value);
              handleClose();
            }}
            selected={option.value === value}
          >
            <span>{option.label}</span>
            {option.value === value ? <CheckRounded aria-hidden="true" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export function AdminStudentFilters({
  copy,
  onChange,
  onQueryChange,
  query,
  records,
  searchLabel,
  searchPlaceholder,
  statusLabel,
  value,
}: AdminStudentFiltersProps) {
  const groups = directoryOptions(records, "activeGroupId", "activeGroupName");
  const teachers = directoryOptions(records, "activeTeacherId", "activeTeacherName");
  const update = (next: Partial<AdminStudentFilterState>) => onChange({ ...value, ...next });
  const chips: FilterChip[] = [];
  if (value.status !== "ALL")
    chips.push({
      key: "status",
      label: copy.statusLabels[value.status],
      reset: { status: "ALL" },
    });
  if (value.groupId !== "ALL")
    chips.push({
      key: "group",
      label: groups.find(([id]) => id === value.groupId)?.[1] ?? copy.groupLabel,
      reset: { groupId: "ALL" },
    });
  if (value.teacherId !== "ALL")
    chips.push({
      key: "teacher",
      label: teachers.find(([id]) => id === value.teacherId)?.[1] ?? copy.teacherLabel,
      reset: { teacherId: "ALL" },
    });
  if (value.joinedWithinDays !== "ALL")
    chips.push({
      key: "joined",
      label: copy.joinedOptions[value.joinedWithinDays],
      reset: { joinedWithinDays: "ALL" },
    });

  return (
    <section className="adminStudentFilters">
      <div className="adminStudentFilters__row">
        <label className="adminStudentFilters__search">
          <SearchRounded aria-hidden="true" />
          <span className="adminWorkspace__srOnly">{searchLabel}</span>
          <input
            onChange={onQueryChange}
            placeholder={searchPlaceholder}
            type="search"
            value={query}
          />
        </label>
        <div className="adminStudentFilters__cards">
          <FilterMenu
            label={statusLabel}
            onChange={(status) => update({ status })}
            options={Object.entries(copy.statusLabels).map(([status, label]) => ({
              label,
              value: status as AdminStudentStatusFilter,
            }))}
            value={value.status}
          />
          <FilterMenu
            label={copy.groupLabel}
            onChange={(groupId) => update({ groupId })}
            options={[
              { label: copy.allGroupsLabel, value: "ALL" },
              ...groups.map(([groupId, label]) => ({ label, value: groupId })),
            ]}
            value={value.groupId}
          />
          <FilterMenu
            label={copy.teacherLabel}
            onChange={(teacherId) => update({ teacherId })}
            options={[
              { label: copy.allTeachersLabel, value: "ALL" },
              ...teachers.map(([teacherId, label]) => ({ label, value: teacherId })),
            ]}
            value={value.teacherId}
            wideMenu
          />
          <FilterMenu
            label={copy.joinedLabel}
            onChange={(joinedWithinDays) => update({ joinedWithinDays })}
            options={Object.entries(copy.joinedOptions).map(([period, label]) => ({
              label,
              value: period as AdminStudentFilterState["joinedWithinDays"],
            }))}
            value={value.joinedWithinDays}
          />
        </div>
      </div>
      {chips.length ? (
        <div aria-label={copy.summaryLabel} className="adminStudentFilters__chips">
          {chips.map((chip) => (
            <button key={chip.key} onClick={() => update(chip.reset)} type="button">
              <span>{chip.label}</span>
              <CloseRounded aria-hidden="true" />
            </button>
          ))}
          <button
            className="adminStudentFilters__clear"
            onClick={() => onChange(defaultFilters)}
            type="button"
          >
            {copy.clearFiltersLabel}
          </button>
        </div>
      ) : null}
    </section>
  );
}
