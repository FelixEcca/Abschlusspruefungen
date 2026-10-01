export function roundToDigits(n: number, digits: number) {
  const factor = Math.pow(10, digits)
  return Math.round(n * factor) / factor
}

export function round2(n: number) {
  return roundToDigits(n, 2)
}
