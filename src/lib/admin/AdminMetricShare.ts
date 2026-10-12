// Integer arithmetic preserves whole-UZS precision even above Number.MAX_SAFE_INTEGER.
export function adminMetricShare(
  value: string | undefined,
  total: string | undefined,
): string | null {
  if (!value || !total || !/^\d+$/.test(value) || !/^\d+$/.test(total)) return null;
  const denominator = BigInt(total);
  if (denominator === BigInt(0)) return null;
  const tenths = (BigInt(value) * BigInt(1000) + denominator / BigInt(2)) / denominator;
  return `${tenths / BigInt(10)}${tenths % BigInt(10) ? `.${tenths % BigInt(10)}` : ""}%`;
}
