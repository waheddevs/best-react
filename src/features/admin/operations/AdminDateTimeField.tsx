"use client";

import { useId, useRef, useState } from "react";
import type { Locale } from "@/config/Locales";
import { getAdminCalendarCopy } from "@/dictionaries/admin/AdminCalendar";
import { AdminDateFilter } from "./AdminDateFilter";
import { AdminGroupTimePicker } from "./AdminGroupTimePicker";

export function AdminDateTimeField({
  label,
  locale,
  value,
  onChange,
  required = false,
  disabled = false,
  after,
}: {
  label: string;
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  after?: string;
}) {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const [invalid, setInvalid] = useState(false);
  const copy = getAdminCalendarCopy(locale);
  const [date = "", time = "09:00"] = value.split("T");
  const rangeError = Boolean(value && after && value <= after);
  const message = rangeError ? copy.afterStart : required && !value ? copy.required : "";
  const showError = invalid && Boolean(message);
  const change = (next: string) => {
    setInvalid(false);
    onChange(next);
  };

  return (
    <div className="adminDateTimeField" ref={container}>
      <span id={`${id}-label`}>{label}</span>
      <div
        className="adminDateTimeField__controls"
        role="group"
        aria-labelledby={`${id}-label`}
        aria-describedby={showError ? `${id}-error` : undefined}
        data-invalid={showError || undefined}
      >
        <AdminDateFilter
          variant="field"
          label={`${label}: ${copy.date}`}
          locale={locale}
          value={date}
          disabled={disabled}
          onChange={(next) => change(next ? `${next}T${time}` : "")}
        />
        <AdminGroupTimePicker
          label={`${label}: ${copy.time}`}
          locale={locale}
          value={time}
          disabled={disabled || !date}
          onChange={(next) => change(`${date}T${next}`)}
        />
      </div>
      <input
        className="adminDateTimeField__validation"
        aria-label={label}
        aria-invalid={showError || undefined}
        aria-describedby={showError ? `${id}-error` : undefined}
        tabIndex={-1}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(event) => change(event.target.value)}
        ref={(input) => input?.setCustomValidity(rangeError ? copy.afterStart : "")}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          container.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }}
      />
      {showError && (
        <small id={`${id}-error`} className="adminDateTimeField__error" role="alert">
          {message}
        </small>
      )}
    </div>
  );
}
