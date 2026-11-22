import { pp } from '@/helper/pretty-print'
export type Vec = [number, number, number]
export const add = (a: Vec, b: Vec): Vec => a.map((x, i) => x + b[i]) as Vec
export const sub = (a: Vec, b: Vec): Vec => a.map((x, i) => x - b[i]) as Vec
export const mul = (a: Vec, k: number): Vec => a.map(x => x * k) as Vec
export const dot = (a: Vec, b: Vec) =>
  a.reduce((sum, x, i) => sum + x * b[i], 0)
export const coord = (a: Vec) => a.map(x => pp(x)).join('\\mid')
export const vec = (a: Vec) =>
  `\\begin{pmatrix}${a.map(x => pp(x)).join('\\\\')}\\end{pmatrix}`
export function frac(n: number, d: number) {
  if (!Number.isInteger(n) || !Number.isInteger(d) || !d)
    throw new Error('Invalid fraction')
  let a = Math.abs(n),
    b = Math.abs(d)
  while (b) [a, b] = [b, a % b]
  n = (n / a) * Math.sign(d)
  d = Math.abs(d) / a
  return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`
}
export function binomial(n: number, p: number) {
  let coefficient = 1
  return Array.from({ length: n + 1 }, (_, k) => {
    if (k) coefficient *= (n - k + 1) / k
    return coefficient * p ** k * (1 - p) ** (n - k)
  })
}

export function polynomial(
  terms: [coefficient: number | string, power: number][],
) {
  let result = ''
  for (const [coefficient, power] of terms) {
    const value = String(coefficient)
    if (value === '0') continue
    const negative = value.startsWith('-')
    const magnitude = negative ? value.slice(1) : value
    const factor = power > 0 && magnitude === '1' ? '' : magnitude
    const variable = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`
    result += `${negative ? '-' : result ? '+' : ''}${factor}${variable}`
  }
  return result || '0'
}
export const orthogonalPairs: { u: Vec; v: Vec }[] = [
  { u: [4, -2, -4], v: [-2, 4, -4] },
  { u: [2, 1, -2], v: [6, 4, 8] },
  { u: [1, 2, 2], v: [2, -2, 1] },
  { u: [3, -1, 2], v: [2, 2, -2] },
  { u: [2, 3, -1], v: [1, -1, -1] },
  { u: [1, -2, 3], v: [3, 3, 1] },
]
