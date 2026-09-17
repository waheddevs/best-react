const completeTimePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export function formatTeacherTimeInput(rawValue: string): string {
  const raw = rawValue.replace(/[^\d:]/g, "");
  if (!raw) return "";

  if (raw.includes(":")) {
    const [rawHour = "", rawMinute = ""] = raw.split(":");
    const hour = rawHour.slice(0, 2);
    const minute = rawMinute.slice(0, 2);
    if (!hour) return "";
    return `${hour.padStart(2, "0")}:${minute}`;
  }

  const digits = raw.replace(/\D/g, "");
  if (Number(digits[0]) > 2) {
    return digits.length === 1 ? digits : `0${digits[0]}:${digits.slice(1, 3)}`;
  }
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
}

export function isTeacherTimeValueValid(value: string): boolean {
  return completeTimePattern.test(value);
}

export function hasTeacherTimeRangeError(value: string): boolean {
  const [hour = "", minute = ""] = value.split(":");
  return (hour.length === 2 && Number(hour) > 23) || (minute.length > 0 && Number(minute[0]) > 5);
}
