export function round2(x: number) {
  return Math.round(x * 100) / 100
}

export function pick<T>(rng: any, values: T[]): T {
  return rng.randomItemFromArray(values)
}

export function timeText(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${String(m).padStart(2, '0')} Uhr`
}

export function clock(minutes: number) {
  const dayMinutes = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(dayMinutes / 60)
  const m = dayMinutes % 60
  return `${h}:${String(m).padStart(2, '0')} Uhr`
}

export function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}
