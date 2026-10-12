import type { Locale } from "@/config/Locales";

export function adminPaymentAmount(value: string, locale: Locale): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(BigInt(value));
}

export function adminPaymentMonth(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T12:00:00Z`));
}

export function adminPaymentDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "Asia/Tashkent" }).format(
    new Date(value),
  );
}
