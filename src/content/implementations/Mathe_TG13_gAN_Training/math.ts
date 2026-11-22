export {
  frac,
  polynomial,
  coord,
  vec,
  add,
  sub,
  mul,
  dot,
} from '../Mathe_TG13_gAN_Pruefungen/math'
export type { Vec } from '../Mathe_TG13_gAN_Pruefungen/math'
export {
  FunctionGraph,
  ReflectionSketch,
  BinomialChart,
} from '../Mathe_TG13_gAN_Pruefungen/diagrams'
export { ProbabilityTree } from './diagrams'

export const number = (value: number) =>
  value.toLocaleString('de-DE', { maximumFractionDigits: 6 })

export function choose(n: number, k: number) {
  let value = 1
  for (let i = 1; i <= k; i++) value = (value * (n - i + 1)) / i
  return Math.round(value)
}

export function matrix(rows: number[][]) {
  return String.raw`\begin{pmatrix}${rows.map(row => row.join('&')).join('\\\\')}\end{pmatrix}`
}
