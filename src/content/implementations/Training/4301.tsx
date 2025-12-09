import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4301 {
  a: number
  b: number
  c: number
} // y = ax^2 + b  ;   y = c

export const exercise4301: Exercise<D4301> = {
  title: 'x-Wert zu gegebenem y-Wert berechnen',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const a = rng.randomIntBetween(-3, 3)
    const b = rng.randomIntBetween(-9, 9)
    const c = rng.randomIntBetween(-6, 6)
    return { a, b, c }
  },
  originalData: { a: 1, b: -4, c: 1 },
  constraint({ data }) {
    const { a, b, c } = data
    // ax^2 + b = c  -> ax^2 = c - b -> x^2 = (c-b)/a
    const rhs = (c - b) / a
    if (rhs < 0) {
      return false
    }
    const s = Math.sqrt(rhs)
    const x1 = s,
      x2 = -s
    const y = c
    return (
      (x1 * 2) % 1 == 0 &&
      (x2 * 2) % 1 == 0 &&
      data.b != data.c &&
      data.a != 0 &&
      data.b != 0 &&
      data.c != 0
    )
  },
  task({ data }) {
    const { a, b, c } = data
    return (
      <>
        <p>
          Gegeben sind die Parabel und die Gerade:{' '}
          <InlineMath math={`y = ${pp(a)}x^2 ${pp(b, 'merge_op')}`} /> und{' '}
          <InlineMath math={`y = ${pp(c)}`} />. <br />
          Bestimme die Werte für x.
        </p>
      </>
    )
  },
  solution({ data }) {
    const { a, b, c } = data
    // ax^2 + b = c  -> ax^2 = c - b -> x^2 = (c-b)/a
    const rhs = (c - b) / a
    if (rhs < 0) {
      return <BlockMath math={'\\text{Keine Schnittpunkte.}'} />
    }
    const s = Math.sqrt(rhs)
    const x1 = s,
      x2 = -s
    const y = c
    return (
      <>
        <p>
          Setze den Wert für <InlineMath math={`y = ${pp(c)}`} /> ein.
        </p>
        <BlockMath
          math={[
            '\\begin{aligned}',
            `${pp(c)} &= ${pp(a)}x^2 ${pp(b, 'merge_op')}\\\\`,
            ` ${pp(c - b)}&= ${pp(a)}x^2\\\\`,
            `x^2 &= ${pp(rhs)}\\\\`,
            `x_{1,2} &= \\pm\\sqrt{${pp(rhs)}} \\\\`,
            `\\Rightarrow\\; S_1(${pp(x1)}&\\mid ${pp(y)}),\\; S_2(${pp(x2)}\\mid ${pp(y)})`,
            '\\end{aligned}',
          ].join('')}
        />
      </>
    )
  },
}
