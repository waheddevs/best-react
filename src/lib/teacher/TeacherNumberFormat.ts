export function formatTeacherNumber(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${sign}${digits}`;
}

export function formatTeacherCurrency(value: number): string {
  return `UZS ${formatTeacherNumber(value)}`;
}

export function formatTeacherCompactCurrency(value: number): string {
  return `UZS ${(Math.round(value / 100_000) / 10).toFixed(1)}M`;
}

export function formatTeacherOneDecimal(value: number): string {
  return String(Math.round(value * 10) / 10);
}
