import { AsYouType, isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

const defaultCountry = "UZ";

export function formatPhoneNumber(value: string) {
  const compact = value.replace(/[\s()-]/g, "");
  const reservedUzbekNumber = /^\+99800(\d{3})(\d{2})(\d{2})$/.exec(compact);
  if (reservedUzbekNumber) {
    return `+998 00 ${reservedUzbekNumber[1]} ${reservedUzbekNumber[2]} ${reservedUzbekNumber[3]}`;
  }
  return new AsYouType(defaultCountry).input(value);
}

export function validatePhoneNumber(value: string) {
  return isValidPhoneNumber(value, defaultCountry);
}

export function normalizePhoneNumber(value: string) {
  return parsePhoneNumberFromString(value, defaultCountry)?.number ?? value.replace(/[^+\d]/g, "");
}
