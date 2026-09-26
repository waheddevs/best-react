const MAX_VISIBLE_EMAIL_CHARACTERS = 30;

export function formatTeacherRosterEmail(email: string | null): string {
  if (!email) return "—";
  const characters = Array.from(email);
  return characters.length > MAX_VISIBLE_EMAIL_CHARACTERS
    ? `${characters.slice(0, MAX_VISIBLE_EMAIL_CHARACTERS).join("")}...`
    : email;
}
