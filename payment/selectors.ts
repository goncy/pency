export function getExpirationDate(expiresIn: number): number {
  // Current date + (expiration date - 1 month) converted to milisecs
  return +new Date() + (expiresIn - 2629800) * 1000;
}
