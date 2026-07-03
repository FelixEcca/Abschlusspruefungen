import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4403 {
  a: number
  b: number
  m: number
  n: number
  hasDivision: boolean
}

export const exercise4403: Exercise<D4403> = {
  title: 'Potenzen zusammenfassen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 2,
  generator(rng) {
    const m = rng.randomIntBetween(1, 4)
    const n = rng.randomIntBetween(1, 4)
    const a = rng.randomIntBetween(2, 5)
    const b = rng.randomIntBetween(2, 5)
    const hasDivision = rng.randomBoolean()
    return { a, b, m, n, hasDivision }
  },
  originalData: { a: 2, b: 3, m: 2, n: 3, hasDivision: true },
  constraint() {
    return true
  },
  task({ data }) {
    const { a, b, m, n, hasDivision } = data
    return (
      <>
        <p>Vereinfache mit Potenzgesetzen.</p>
        <BlockMath
          math={
            hasDivision
              ? `${pp(a)}^{${m}}\\cdot ${pp(a)}^{${n}} \\;:\\; ${pp(b)}^{${m}}`
              : `${pp(a)}^{${m}}\\cdot ${pp(a)}^{${n}}\\cdot ${pp(b)}^{${m}}`
          }
        />
      </>
    )
  },
  solution({ data }) {
    const { a, b, m, n, hasDivision } = data

    if (hasDivision) {
      // (a^m * a^n) : b^m = a^{m+n} : b^m = (a/b)^m * a^n
      // Reduce as far as possible
      if (a === b) {
        // (a^m * a^n) : a^m = a^{m+n-m} = a^n
        return (
          <BlockMath
            math={[
              '\\begin{aligned}',
              `${a}^{${m}}\\cdot ${a}^{${n}} : ${a}^{${m}} &= ${a}^{${m + n}} : ${a}^{${m}} \\\\`,
              `&= ${a}^{${m + n - m}} \\\\`,
              `&= ${a}^{${n}}`,
              '\\end{aligned}',
            ].join('')}
          />
        )
      } else {
        // (a^m * a^n) : b^m = a^{m+n} : b^m = (a/b)^m * a^n
        return (
          <BlockMath
            math={[
              '\\begin{aligned}',
              `${a}^{${m}}\\cdot ${a}^{${n}} : ${b}^{${m}} &= ${a}^{${m + n}} : ${b}^{${m}} \\\\`,
              `&= \\frac{${a}^{${m + n}}}{${b}^{${m}}} \\\\`,

              '\\end{aligned}',
            ].join('')}
          />
        )
      }
    } else {
      // (a^m * a^n * b^m) = a^{m+n} * b^m
      if (a === b) {
        // (a^m * a^n * a^m) = a^{m+n+m} = a^{2m+n}
        return (
          <BlockMath
            math={[
              '\\begin{aligned}',
              `${a}^{${m}}\\cdot ${a}^{${n}}\\cdot ${a}^{${m}} &= ${a}^{${m + n + m}} \\\\`,
              `&= ${a}^{${2 * m + n}}`,
              '\\end{aligned}',
            ].join('')}
          />
        )
      } else {
        // (a^m * a^n * b^m) = a^{m+n} * b^m
        return (
          <BlockMath
            math={[
              '\\begin{aligned}',
              `${a}^{${m}}\\cdot ${a}^{${n}}\\cdot ${b}^{${m}} &= ${a}^{${m + n}}\\cdot ${b}^{${m}}`,
              '\\end{aligned}',
            ].join('')}
          />
        )
      }
    }
  },
}
