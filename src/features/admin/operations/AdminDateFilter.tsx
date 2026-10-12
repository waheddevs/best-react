"use client";

import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Popover from "@mui/material/Popover";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminCalendarCopy } from "@/dictionaries/admin/AdminCalendar";
import {
  adminCalendarDate,
  adminCalendarDays,
  shiftAdminCalendarDate,
  shiftAdminCalendarMonth,
} from "@/lib/admin/AdminCalendar";

export function AdminDateFilter({
  label,
  value,
  locale,
  onChange,
  disabled = false,
  variant = "filter",
}: {
  label: string;
  value: string;
  locale: Locale;
  onChange: (value: string) => void;
  disabled?: boolean;
  variant?: "filter" | "field";
}) {
  const copy = getAdminCalendarCopy(locale);
  const id = useId();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [activeDate, setActiveDate] = useState("2000-01-01");
  const [today, setToday] = useState("");
  const [view, setView] = useState<"days" | "months">("days");
  const focusedDay = useRef<HTMLButtonElement | null>(null);
  const monthPicker = useRef<HTMLButtonElement | null>(null);
  const format = (date: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(
      adminCalendarDate(date),
    );
  const days = adminCalendarDays(activeDate);
  const month = activeDate.slice(0, 7);
  const year = activeDate.slice(0, 4);

  useEffect(() => {
    if (anchor) (view === "days" ? focusedDay : monthPicker).current?.focus();
  }, [activeDate, anchor, view]);

  const select = (date: string) => {
    onChange(date);
    setAnchor(null);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, date: string) => {
    const weekday = adminCalendarDate(date).getUTCDay();
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -weekday,
      End: 6 - weekday,
    };
    if (event.key in offsets) {
      event.preventDefault();
      setActiveDate(shiftAdminCalendarDate(date, offsets[event.key]));
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      setActiveDate(
        shiftAdminCalendarMonth(
          date,
          (event.key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1),
        ),
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className={
          variant === "field" ? "adminDateField" : "adminRegistryFilters__card adminDateFilter"
        }
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? id : undefined}
        onClick={(event) => {
          const now = new Date();
          const current =
            variant === "field"
              ? new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(now)
              : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
          setToday(current);
          setActiveDate(value || current);
          setView("days");
          setAnchor(event.currentTarget);
        }}
      >
        <span className={variant === "field" ? "adminWorkspace__srOnly" : undefined}>{label}</span>
        <strong>
          {value
            ? format(value, { day: "2-digit", month: "2-digit", year: "numeric" })
            : copy.placeholder}
        </strong>
        <CalendarMonthOutlined aria-hidden="true" />
      </button>
      <Popover
        open={Boolean(anchor) && !disabled}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          horizontal: variant === "field" ? "left" : "center",
          vertical: variant === "field" ? "bottom" : "center",
        }}
        transformOrigin={{
          horizontal: variant === "field" ? "left" : "center",
          vertical: variant === "field" ? "top" : "center",
        }}
        slotProps={{
          paper: { className: "adminCalendar" },
          transition: { onEntered: () => focusedDay.current?.focus() },
        }}
      >
        <div id={id} role="dialog" aria-label={label}>
          <header className="adminCalendar__header">
            <button
              type="button"
              aria-label={copy.previous}
              onClick={() =>
                setActiveDate(shiftAdminCalendarMonth(activeDate, view === "days" ? -1 : -12))
              }
            >
              <ChevronLeftRounded aria-hidden="true" />
            </button>
            <button
              ref={monthPicker}
              type="button"
              className="adminCalendar__month"
              aria-label={`${copy.chooseMonth}: ${format(activeDate, { month: "long", year: "numeric" })}`}
              aria-expanded={view === "months"}
              onClick={() => setView(view === "days" ? "months" : "days")}
            >
              <span aria-live="polite">
                {view === "days" ? format(activeDate, { month: "long", year: "numeric" }) : year}
              </span>
              <UnfoldMoreRounded aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={copy.next}
              onClick={() =>
                setActiveDate(shiftAdminCalendarMonth(activeDate, view === "days" ? 1 : 12))
              }
            >
              <ChevronRightRounded aria-hidden="true" />
            </button>
          </header>
          {view === "months" ? (
            <div className="adminCalendar__months">
              {Array.from(
                { length: 12 },
                (_, index) => `${year}-${String(index + 1).padStart(2, "0")}-01`,
              ).map((date) => (
                <button
                  key={date}
                  type="button"
                  aria-pressed={date.slice(0, 7) === month}
                  onClick={() => {
                    setActiveDate(date);
                    setView("days");
                  }}
                >
                  {format(date, { month: "short" })}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="adminCalendar__weekdays" aria-hidden="true">
                {days.slice(0, 7).map((date) => (
                  <span key={date}>{format(date, { weekday: "short" })}</span>
                ))}
              </div>
              <div className="adminCalendar__days">
                {days.map((date) => (
                  <button
                    key={date}
                    ref={date === activeDate ? focusedDay : undefined}
                    type="button"
                    tabIndex={date === activeDate ? 0 : -1}
                    aria-label={format(date, { dateStyle: "full" })}
                    aria-pressed={date === value}
                    aria-current={date === today ? "date" : undefined}
                    data-outside={date.slice(0, 7) !== month || undefined}
                    onKeyDown={(event) => navigate(event, date)}
                    onClick={() => select(date)}
                  >
                    {Number(date.slice(-2))}
                  </button>
                ))}
              </div>
            </>
          )}
          <footer className="adminCalendar__footer">
            <button type="button" disabled={!value} onClick={() => select("")}>
              {copy.clear}
            </button>
            <button type="button" onClick={() => select(today)}>
              {copy.today}
            </button>
          </footer>
        </div>
      </Popover>
    </>
  );
}
