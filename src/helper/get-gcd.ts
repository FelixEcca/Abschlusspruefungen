/**
 * Calucate greatest common denominator from input numbers
 */
export const getGcd = function (a: number, b: number): number {
  if (b === 0) return a
  return getGcd(b, a % b)
}

export function gcd(a: number, b: number): number {
  return Math.abs(getGcd(a, b))
}
