import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4202 {
  a: number
  b: number
  c: number
  d: number // a/(x+b) = c/(x+d)
}

export const exercise4202: Exercise<D4202> = {
  title: 'Bruchgleichungen (mit Definitionsmenge)',
  source: 'Training',
  useCalculator: false,
  duration: 9,
  points: 4,
  generator(rng) {
    const a = rng.randomIntBetween(-8, 8)
    const c = rng.randomIntBetween(-8, 8)
    let b = rng.randomIntBetween(-6, 6)
    let d = rng.randomIntBetween(-6, 6)
    // b != d, damit nicht trivial wird
    while (d === b) d = rng.randomIntBetween(-6, 6)
    return { a, b, c, d }
  },
  originalData: { a: 4, b: -2, c: -2, d: 3 },
  constraint({ data }) {
    const { a, b, c, d } = data
    const DN = [`x\\ne ${pp(-b)}`, `x\\ne ${pp(-d)}`]
    // Hauptnenner: (x+b)(x+d)
    // a(x+d) = c(x+b) -> (a-c)x = cb - ad
    const A = a - c
    const B = c * b - a * d
    const x = B / A
    return (
      data.a != 0 &&
      data.c != 0 &&
      data.b != 0 &&
      data.d != 0 &&
      data.b != data.d &&
      (x * 2) % 1 == 0
    )
  },
  task({ data }) {
    const { a, b, c, d } = data
    return (
      <>
        <p>Bestimme die Definitionsmenge und löse die Gleichung.</p>
        <BlockMath
          math={`\\dfrac{${pp(a)}}{x ${pp(b, 'merge_op')}} = \\dfrac{${pp(c)}}{x ${pp(d, 'merge_op')}}`}
        />
      </>
    )
  },
  solution({ data }) {
    const { a, b, c, d } = data
    const DN = [`x\\ne ${pp(-b)}`, `x\\ne ${pp(-d)}`]
    // Hauptnenner: (x+b)(x+d)
    // a(x+d) = c(x+b) -> (a-c)x = cb - ad
    const A = a - c
    const B = c * b - a * d
    const x = B / A
    return (
      <>
        <BlockMath
          math={[
            '\\text{Definitionsmenge: }\\; D = \\mathbb{R} \\setminus\\{',
            `${pp(-b)},\\; ${pp(-d)}`,
            '\\}',
          ].join('')}
        />
        <BlockMath
          math={[
            '\\begin{aligned}',
            `\\frac{${pp(a)}}{x ${pp(b, 'merge_op')}} &= \\frac{${pp(c)}}{x ${pp(d, 'merge_op')}}\\\\[4pt]`,
            '\\text{Hauptnenner: }(x' +
              pp(b, 'merge_op') +
              ')(x' +
              pp(d, 'merge_op') +
              ') &\\\\',
            `${pp(a)}(x ${pp(d, 'merge_op')}) &= ${pp(c)}(x ${pp(b, 'merge_op')})\\\\`,
            `${pp(a)}x ${pp(a * d, 'merge_op')} &= ${pp(c)}x ${pp(c * b, 'merge_op')}\\\\`,
            `${pp(a - c)}x &= ${pp(c * b - a * d)}\\\\`,
            `x &= ${pp(x)}`,
            '\\end{aligned}',
          ].join('')}
        />
      </>
    )
  },
}
