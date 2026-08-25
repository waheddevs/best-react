"use client";

import { useMemo, useState, type MouseEvent } from "react";

type UseBrandDatePickerOptions = {
  onChange: (value: string) => void;
  value: string;
};

export type BrandCalendarDay = {
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  month: number;
  value: string;
  year: number;
};

const minimumYear = 1940;

function parseDateValue(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayValue(value: string) {
  const parsed = parseDateValue(value);
  if (!parsed) return "";

  return `${String(parsed.getDate()).padStart(2, "0")}.${String(parsed.getMonth() + 1).padStart(2, "0")}.${parsed.getFullYear()}`;
}

export function useBrandDatePicker({ onChange, value }: UseBrandDatePickerOptions) {
  /* HOOKS */
  const currentYear = new Date().getFullYear();
  const selectedDate = parseDateValue(value);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? new Date(currentYear - 18, 0, 1),
  );

  const calendarDays = useMemo<BrandCalendarDay[]>(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const leadingDays = new Date(year, month, 1).getDay();

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(year, month, index - leadingDays + 1);
      const dateValue = formatDateValue(date);

      return {
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isSelected: dateValue === value,
        month: date.getMonth(),
        value: dateValue,
        year: date.getFullYear(),
      };
    });
  }, [value, visibleMonth]);

  const years = useMemo(
    () => Array.from({ length: currentYear - minimumYear + 1 }, (_, index) => currentYear - index),
    [currentYear],
  );

  /* HANDLERS */
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    const currentSelection = parseDateValue(value);
    if (currentSelection) setVisibleMonth(currentSelection);
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handlePreviousMonth = () => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  };

  const handleMonthChange = (month: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), month, 1));
  };

  const handleYearChange = (year: number) => {
    setVisibleMonth((current) => new Date(year, current.getMonth(), 1));
  };

  const handleDaySelect = (dateValue: string) => {
    onChange(dateValue);
    setAnchorElement(null);
  };

  return {
    anchorElement,
    calendarDays,
    displayValue: formatDisplayValue(value),
    isOpen: Boolean(anchorElement),
    visibleMonth: visibleMonth.getMonth(),
    visibleYear: visibleMonth.getFullYear(),
    years,
    handleClose,
    handleDaySelect,
    handleMonthChange,
    handleNextMonth,
    handleOpen,
    handlePreviousMonth,
    handleYearChange,
  };
}
