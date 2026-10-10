export function formatPreviewCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function isValidPreviewCardNumber(value: string): boolean {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{16,19}$/.test(digits) || /^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  let doubleDigit = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return sum % 10 === 0;
}

export function formatPreviewExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export function formatPreviewSecurityCode(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function isValidPreviewExpiry(value: string, now = new Date()): boolean {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;

  const month = Number(value.slice(0, 2));
  const year = 2000 + Number(value.slice(3));
  if (month < 1 || month > 12) return false;

  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}
