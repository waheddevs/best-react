"use client";

import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import Popover from "@mui/material/Popover";
import { useId, useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminCalendarCopy } from "@/dictionaries/admin/AdminCalendar";
import { getAdminPaymentsCopy } from "@/dictionaries/admin/AdminPayments";
import { getAdminRegistryText } from "@/dictionaries/admin/AdminRegistry";
import { adminPaymentMonth } from "@/lib/admin/AdminPayments";

export function AdminMonthFilter({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const t = getAdminRegistryText(locale);
  const copy = getAdminCalendarCopy(locale);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [year, setYear] = useState(2000);
  const selected = useRef<HTMLButtonElement>(null);
  const currentMonth = () =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(new Date()).slice(0, 7);
  const select = (next: string) => {
    onChange(next);
    setAnchor(null);
  };
  return (
    <>
      <button
        id={`${id}-trigger`}
        type="button"
        className="adminStudentFilters__card"
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? id : undefined}
        onClick={(event) => {
          setYear(Number((value || currentMonth()).slice(0, 4)));
          setAnchor(event.currentTarget);
        }}
      >
        <span>{t("month")}</span>
        <strong>{value ? adminPaymentMonth(value, locale) : t("all")}</strong>
        <CalendarMonthOutlined aria-hidden="true" />
      </button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: { className: "adminCalendar adminPaymentMonth" },
          transition: { onEntered: () => selected.current?.focus() },
        }}
      >
        <div id={id} role="dialog" aria-label={t("month")}>
          <header className="adminCalendar__header">
            <button
              type="button"
              disabled={year <= 1}
              aria-label={copy.previous}
              onClick={() => setYear(year - 1)}
            >
              <ChevronLeftRounded />
            </button>
            <strong aria-live="polite">{year}</strong>
            <button
              type="button"
              disabled={year >= 9999}
              aria-label={copy.next}
              onClick={() => setYear(year + 1)}
            >
              <ChevronRightRounded />
            </button>
          </header>
          <div className="adminCalendar__months">
            {Array.from(
              { length: 12 },
              (_, index) =>
                `${String(year).padStart(4, "0")}-${String(index + 1).padStart(2, "0")}`,
            ).map((month, index) => (
              <button
                key={month}
                type="button"
                ref={
                  Number((value || currentMonth()).slice(5)) === index + 1 ? selected : undefined
                }
                aria-pressed={value === month}
                onClick={() => select(month)}
              >
                {new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" }).format(
                  new Date(`${month}-01T12:00:00Z`),
                )}
              </button>
            ))}
          </div>
          <footer className="adminCalendar__footer">
            <button type="button" disabled={!value} onClick={() => select("")}>
              {copy.clear}
            </button>
            <button type="button" onClick={() => select(currentMonth())}>
              {getAdminPaymentsCopy(locale).currentMonth}
            </button>
          </footer>
        </div>
      </Popover>
    </>
  );
}
