export function splitTeacherDisplayName(displayName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts.length > 1 ? parts.slice(0, -1).join(" ") : (parts[0] ?? ""),
    lastName: parts.length > 1 ? (parts.at(-1) ?? "") : "",
  };
}

export function joinTeacherDisplayName(firstName: string, lastName: string): string {
  return [firstName, lastName]
    .map((part) => part.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .join(" ");
}

export function teacherShortName(displayName: string): string {
  const { firstName, lastName } = splitTeacherDisplayName(displayName);
  const surnameInitial = Array.from(lastName)[0]?.toLocaleUpperCase() ?? "";
  return surnameInitial ? `${firstName} ${surnameInitial}.` : firstName;
}

export function teacherInitials(displayName: string): string {
  const { firstName, lastName } = splitTeacherDisplayName(displayName);
  return [firstName, lastName]
    .filter(Boolean)
    .map((part) => Array.from(part)[0]?.toLocaleUpperCase() ?? "")
    .join("");
}
