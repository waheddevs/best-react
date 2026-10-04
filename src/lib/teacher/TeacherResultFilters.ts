type SearchParams = Record<string, string | string[] | undefined>;

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function readTeacherResultFilterValue(query: SearchParams, key: string): string | undefined {
  const item = query[key];
  return typeof item === "string" ? item.trim() || undefined : undefined;
}

export function readTeacherResultIdFilter(query: SearchParams, key: string): string | undefined {
  const item = readTeacherResultFilterValue(query, key);
  return item && uuidPattern.test(item) ? item : undefined;
}
