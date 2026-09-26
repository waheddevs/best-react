const fixtureDomain = "example.com";

export function nextTeacherFixtureEmail(displayName: string, usedEmails: Set<string>): string {
  const name = displayName
    .normalize("NFKD")
    .toLowerCase()
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]/g, "");
  if (!name) throw new Error("A fictional student needs a name before assigning an email.");

  let suffix = 1;
  let email = `${name}@${fixtureDomain}`;
  while (usedEmails.has(email)) {
    suffix++;
    email = `${name}${suffix}@${fixtureDomain}`;
  }
  usedEmails.add(email);
  return email;
}
