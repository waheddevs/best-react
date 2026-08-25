"use client";

import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useId, type MouseEvent } from "react";

import { IconButton } from "@/components/ui/IconButton";
import styles from "@/css/public/exams.module.css";
import { useBrandDatePicker } from "@/hooks/public/exams/useBrandDatePicker";
import type { ExamPreviewCopy } from "@/types/ExamPreview";

type BrandDatePickerProps = {
  copy: ExamPreviewCopy["calendar"];
  describedBy?: string;
  invalid: boolean;
  labelId: string;
  onChange: (value: string) => void;
  value: string;
};

export function BrandDatePicker({
  copy,
  describedBy,
  invalid,
  labelId,
  onChange,
  value,
}: BrandDatePickerProps) {
  /* HOOKS */
  const calendarId = useId();
  const picker = useBrandDatePicker({ onChange, value });
  const { anchorElement, calendarDays, displayValue, isOpen, visibleMonth, visibleYear, years } =
    picker;

  /* HANDLERS */
  const {
    handleClose,
    handleDaySelect,
    handleMonthChange,
    handleNextMonth,
    handleOpen,
    handlePreviousMonth,
    handleYearChange,
  } = picker;

  const handleMonthSelect = (event: SelectChangeEvent<number>) => {
    handleMonthChange(Number(event.target.value));
  };

  const handleYearSelect = (event: SelectChangeEvent<number>) => {
    handleYearChange(Number(event.target.value));
  };

  const handleCalendarDayClick = (event: MouseEvent<HTMLButtonElement>) => {
    handleDaySelect(event.currentTarget.value);
  };

  return (
    <>
      <button
        aria-controls={isOpen ? calendarId : undefined}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-labelledby={labelId}
        className={styles.exams__calendarTrigger}
        data-invalid={invalid ? "true" : undefined}
        onClick={handleOpen}
        type="button"
      >
        <CalendarMonthRounded aria-hidden="true" />
        <span data-placeholder={displayValue ? undefined : "true"}>
          {displayValue || copy.placeholder}
        </span>
      </button>

      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={handleClose}
        open={isOpen}
        slotProps={{ paper: { className: styles.exams__calendarPopover } }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <div
          aria-label={copy.dialogLabel}
          className={styles.exams__calendar}
          id={calendarId}
          role="dialog"
        >
          <div className={styles.exams__calendarHeader}>
            <IconButton
              controlSize="small"
              label={copy.previousMonth}
              onClick={handlePreviousMonth}
              variant="soft"
            >
              <ChevronLeftRounded aria-hidden="true" />
            </IconButton>

            <div className={styles.exams__calendarSelectors}>
              <Select<number>
                className={styles.exams__calendarSelect}
                IconComponent={KeyboardArrowDownRounded}
                inputProps={{ "aria-label": copy.monthLabel }}
                MenuProps={{ className: styles.exams__calendarSelectMenu }}
                onChange={handleMonthSelect}
                value={visibleMonth}
              >
                {copy.months.map((month, index) => (
                  <MenuItem
                    className={styles.exams__calendarSelectOption}
                    key={month}
                    value={index}
                  >
                    {month}
                  </MenuItem>
                ))}
              </Select>
              <Select<number>
                className={styles.exams__calendarSelect}
                IconComponent={KeyboardArrowDownRounded}
                inputProps={{ "aria-label": copy.yearLabel }}
                MenuProps={{ className: styles.exams__calendarSelectMenu }}
                onChange={handleYearSelect}
                value={visibleYear}
              >
                {years.map((year) => (
                  <MenuItem className={styles.exams__calendarSelectOption} key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <IconButton
              controlSize="small"
              label={copy.nextMonth}
              onClick={handleNextMonth}
              variant="soft"
            >
              <ChevronRightRounded aria-hidden="true" />
            </IconButton>
          </div>

          <div aria-hidden="true" className={styles.exams__calendarWeekdays}>
            {copy.weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div className={styles.exams__calendarDays}>
            {calendarDays.map((calendarDay) => (
              <button
                aria-label={`${calendarDay.day} ${copy.months[calendarDay.month]} ${calendarDay.year}`}
                aria-pressed={calendarDay.isSelected}
                className={styles.exams__calendarDay}
                data-current-month={calendarDay.isCurrentMonth ? "true" : undefined}
                data-selected={calendarDay.isSelected ? "true" : undefined}
                key={calendarDay.value}
                onClick={handleCalendarDayClick}
                type="button"
                value={calendarDay.value}
              >
                {calendarDay.day}
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </>
  );
}
