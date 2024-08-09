// src/utils/formatPhoneNumber.ts

/**
 * Formats a phone number by adding spaces after the country code and the following digits.
 * If the phone number is undefined, it returns "N/A".
 *
 * @param phoneNumber - The phone number to format (string or undefined).
 * @returns The formatted phone number or "N/A" if the input is undefined.
 */
export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "N/A";
  return phoneNumber.replace(/^(\+381)(\d{2})(\d+)/, "$1 $2 $3");
};
