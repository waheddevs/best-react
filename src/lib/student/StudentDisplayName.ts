export function studentShortName(displayName: string, locale: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? "";

  const firstName = parts.slice(0, -1).join(" ");
  const surnameInitial = Array.from(parts.at(-1) ?? "")[0]?.toLocaleUpperCase(locale);
  return surnameInitial ? `${firstName} ${surnameInitial}.` : firstName;
}
