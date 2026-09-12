import { AsYouType, isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

const defaultCountry = "UZ";

export function formatPhoneNumber(value: string) {
  return new AsYouType(defaultCountry).input(value);
}

export function validatePhoneNumber(value: string) {
  return isValidPhoneNumber(value, defaultCountry);
}

export function normalizePhoneNumber(value: string) {
  return parsePhoneNumberFromString(value, defaultCountry)?.number ?? value.replace(/[^+\d]/g, "");
}
