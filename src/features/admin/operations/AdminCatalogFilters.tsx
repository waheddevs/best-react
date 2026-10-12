"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useId, useState } from "react";
import type { Locale } from "@/config/Locales";
import type { AdminDirectoryInput } from "@/gql/graphql";
import { getAdminContentText } from "@/dictionaries/admin/AdminContent";
import { AdminDateFilter } from "./AdminDateFilter";
import { AdminMonthFilter } from "./AdminMonthFilter";
import { adminPaymentMonth } from "@/lib/admin/AdminPayments";

type CatalogFilter = {
  key: "status" | "category" | "teacherId" | "groupId" | "room" | "studentId";
  label: string;
  options: Array<{ id: string; label: string }>;
  wide?: boolean;
};

// Copy of the approved Students menu, retaining its styling and positioning.
function FilterMenu({
  filter,
  value,
  allLabel,
  onChange,
}: {
  filter: CatalogFilter;
  value: string;
  allLabel: string;
  onChange: (value: string) => void;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const id = useId();
  const width = anchor?.getBoundingClientRect().width ?? 148;
  const options = [{ id: "", label: allLabel }, ...filter.options];
  return (
    <>
      <button
        id={id}
        className="adminStudentFilters__card"
        type="button"
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? `${id}-menu` : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        <span>{filter.label}</span>
        <strong>{options.find((option) => option.id === value)?.label ?? filter.label}</strong>
        <UnfoldMoreRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        disablePortal
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
        slotProps={{
          list: { "aria-labelledby": id, id: `${id}-menu`, dense: true },
          paper: {
            className: "adminStudentFilters__menuPaper",
            style: filter.wide
              ? { minWidth: Math.max(width, 174) }
              : { width, minWidth: width, maxWidth: width },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            className="adminStudentFilters__menuItem"
            selected={option.id === value}
            onClick={() => {
              onChange(option.id);
              setAnchor(null);
            }}
          >
            <span>{option.label}</span>
            {option.id === value && <CheckRounded aria-hidden="true" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export function AdminCatalogFilters({
  locale,
  input,
  filters,
  dates = false,
  month = false,
  onChange,
}: {
  locale: Locale;
  input: AdminDirectoryInput;
  filters: CatalogFilter[];
  dates?: boolean;
  month?: boolean;
  onChange: (value: Partial<AdminDirectoryInput>) => void;
}) {
  const t = getAdminContentText(locale);
  const selected = filters
    .filter((filter) => Boolean(input[filter.key]))
    .map((filter) => ({
      key: filter.key,
      label:
        filter.options.find((option) => option.id === input[filter.key])?.label ?? filter.label,
    }));
  const selectedDates = dates
    ? (["from", "to"] as const)
        .filter((key) => input[key])
        .map((key) => ({ key, label: `${t(key)}: ${input[key]!.slice(0, 10)}` }))
    : [];
  const chips = [
    ...selected,
    ...selectedDates,
    ...(month && input.month
      ? [{ key: "month", label: adminPaymentMonth(input.month, locale) }]
      : []),
  ];
  return (
    <section
      className="adminStudentFilters adminCatalogFilters"
      data-filter-count={filters.length + (dates ? 2 : 0) + (month ? 1 : 0)}
      aria-label={t("search")}
    >
      <div className="adminStudentFilters__row">
        <label className="adminStudentFilters__search">
          <SearchRounded aria-hidden="true" />
          <span className="adminWorkspace__srOnly">{t("search")}</span>
          <input
            type="search"
            placeholder={t("search")}
            value={input.search ?? ""}
            onChange={(event) => onChange({ search: event.target.value })}
          />
        </label>
        <div className="adminStudentFilters__cards">
          {filters.map((filter) => (
            <FilterMenu
              key={filter.key}
              filter={filter}
              value={input[filter.key] ?? ""}
              allLabel={t("all")}
              onChange={(value) => onChange({ [filter.key]: value || undefined })}
            />
          ))}
          {month && (
            <AdminMonthFilter
              locale={locale}
              value={input.month ?? ""}
              onChange={(value) => onChange({ month: value || undefined })}
            />
          )}
          {dates &&
            (["from", "to"] as const).map((key) => (
              <AdminDateFilter
                key={key}
                locale={locale}
                label={t(key)}
                value={input[key]?.slice(0, 10) ?? ""}
                onChange={(value) => onChange({ [key]: value || undefined })}
              />
            ))}
        </div>
      </div>
      {chips.length > 0 && (
        <div className="adminStudentFilters__chips" role="group" aria-label={t("filterSummary")}>
          {chips.map((filter) => {
            const label = filter.label;
            return (
              <button
                type="button"
                key={filter.key}
                aria-label={`${t("removeFilter")}: ${label}`}
                onClick={() => onChange({ [filter.key]: undefined })}
              >
                <span>{label}</span>
                <CloseRounded aria-hidden="true" />
              </button>
            );
          })}
          <button
            type="button"
            className="adminStudentFilters__clear"
            onClick={() =>
              onChange({
                ...Object.fromEntries(filters.map((filter) => [filter.key, undefined])),
                ...(dates ? { from: undefined, to: undefined } : {}),
                ...(month ? { month: undefined } : {}),
              })
            }
          >
            {t("reset")}
          </button>
        </div>
      )}
    </section>
  );
}
