export function salaryRevenueChange(current: string, previous: string): string | null {
  const before = BigInt(previous);
  if (before === BigInt(0)) return null;
  const change = ((BigInt(current) - before) * BigInt(1000)) / before;
  const absolute = change < BigInt(0) ? -change : change;
  return `${change > BigInt(0) ? "+" : change < BigInt(0) ? "−" : ""}${absolute / BigInt(10)}.${absolute % BigInt(10)}%`;
}
