"use client";

import { useEffect, useMemo, useState } from "react";

const tashkentClock = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  hour: "2-digit",
  hourCycle: "h23",
  minute: "2-digit",
  month: "numeric",
  timeZone: "Asia/Tashkent",
  year: "numeric",
});

export function useTeacherLiveClock(initialNow: string) {
  /* HOOKS */
  const [now, setNow] = useState(() => new Date(initialNow));

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const parts = Object.fromEntries(
      tashkentClock.formatToParts(now).map((part) => [part.type, part.value]),
    );
    const year = Number(parts.year);
    const month = Number(parts.month);
    const day = Number(parts.day);
    const tomorrow = new Date(Date.UTC(year, month - 1, day + 1));
    const today = new Date(Date.UTC(year, month - 1, day));
    return {
      day,
      hour: parts.hour ?? "00",
      iso: now.toISOString(),
      minute: parts.minute ?? "00",
      month,
      todayWeekday: today.getUTCDay() || 7,
      tomorrowWeekday: tomorrow.getUTCDay() || 7,
    };
  }, [now]);
}
