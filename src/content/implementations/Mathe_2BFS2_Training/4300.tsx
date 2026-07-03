import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4300 {
  a: number
  b: number
  c: number
}

export const exercise4300: Exercise<D4300> = {
  title: 'abc-Formel',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    // Build from integer roots so the abc formula usually gives integer solutions.
    const x1 = rng.randomIntBetween(-6, 6)
    const x2 = rng.randomIntBetween(-6, 6)
    const a = rng.randomIntBetween(1, 4) * (rng.randomBoolean() ? 1 : -1)
    const b = -a * (x1 + x2)
    const c = a * x1 * x2
    return { a, b, c }
  },
  originalData: { a: 2, b: -2, c: -12 },

  constraint({ data }) {
    const { a, b, c } = data
    const D = b * b - 4 * a * c
    const sqrt = Math.sqrt(D)
    const x1 = (-b + sqrt) / (2 * a)
    const x2 = (-b - sqrt) / (2 * a)
    return (
      data.a != 0 &&
      data.b != 0 &&
      data.c != 0 &&
      D >= 0 &&
      sqrt % 1 == 0 &&
      x1 % 1 == 0 &&
      x2 % 1 == 0 &&
      x1 != x2
    )
  },
  task({ data }) {
    const { a, b, c } = data
    const aTerm = a === 1 ? 'x^2' : a === -1 ? '-x^2' : `${pp(a)}x^2`
    const bTerm = b === 1 ? '+x' : b === -1 ? '-x' : `${pp(b, 'merge_op')}x`
    return (
      <>
        <p>Berechne die Lösungen mit der abc-Formel.</p>
        <BlockMath math={`0 = ${aTerm} ${bTerm} ${pp(c, 'merge_op')}`} />
      </>
    )
  },
  solution({ data }) {
    const { a, b, c } = data
    const D = b * b - 4 * a * c
    const sqrt = Math.sqrt(D)
    const denominator = 2 * a
    const x1 = (-b + sqrt) / denominator
    const x2 = (-b - sqrt) / denominator
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'x_{1,2} &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\\\',
          `&= \\frac{-${pp(b,'embrace_neg')} \\pm \\sqrt{${pp(b,'embrace_neg')}^2 - 4 \\cdot ${pp(a,'embrace_neg')} \\cdot ${pp(c,'embrace_neg')}}}{2 \\cdot ${pp(a,'embrace_neg')}}\\\\`,
          `&= \\frac{${pp(-b)} \\pm \\sqrt{${pp(D)}}}{${pp(denominator)}}\\\\`,

          `x_1 &= \\frac{${pp(-b)} + \\sqrt{${pp(D)}}}{${pp(denominator)}} = ${pp(x1)}\\\\`,
          `x_2 &= \\frac{${pp(-b)} - \\sqrt{${pp(D)}}}{${pp(denominator)}} = ${pp(x2)}\\\\`,
          `\\Rightarrow\\; x_1 &= ${pp(x1)},\\; x_2 = ${pp(x2)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
