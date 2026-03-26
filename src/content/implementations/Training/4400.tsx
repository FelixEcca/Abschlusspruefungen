import { Exercise } from '@/data/types'
import { pp, ppFrac } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4400 {
  type: 'bruchKürzen' | 'klammer' | 'summe'
  a: number
  b: number
  c: number
}

export const exercise4400: Exercise<D4400> = {
  title: 'Terme vereinfachen',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const type = rng.randomItemFromArray([
      'bruchKürzen',
      'klammer',
      'summe',
    ] as const)
    const a = rng.randomIntBetween(-8, 8)
    const b = rng.randomIntBetween(-8, 8)
    const c = rng.randomIntBetween(-6, 6)
    return { type, a, b, c }
  },
  originalData: { type: 'klammer', a: 2, b: -3, c: 5 },
  constraint({ data }) {
    return data.a != 0 && data.b != 0 && data.c != 0 && data.a != data.b
  },
  task({ data }) {
    const { type, a, b, c } = data
    return (
      <>
        <p>Vereinfache den Term.</p>
        {type === 'bruchKürzen' && (
          <BlockMath
            math={`\\dfrac{${pp(a)}x}{${pp(b)}x} \\cdot ${pp(c, 'embrace_neg')}`}
          />
        )}
        {type === 'klammer' && (
          <BlockMath
            math={`${pp(a)}(x ${pp(b, 'merge_op')}) ${pp(c, 'merge_op')}`}
          />
        )}
        {type === 'summe' && (
          <BlockMath
            math={`${pp(a)}x ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')}`}
          />
        )}
      </>
    )
  },
  solution({ data }) {
    const { type, a, b, c } = data
    if (type === 'bruchKürzen') {
      const val = (a / b) * c
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            `\\frac{${pp(a)}x}{${pp(b)}x}\\cdot ${pp(c, 'embrace_neg')} &= \\frac{${pp(a)}}{${pp(b)}}\\cdot ${pp(c, 'embrace_neg')} = ${pp(val)}`,
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (type === 'klammer') {
      // ax + ab + c
      const ab = a * b
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            `${pp(a)}(x ${pp(b, 'merge_op')}) ${pp(c, 'merge_op')} &= ${pp(a)}x ${pp(ab, 'merge_op')} ${pp(c, 'merge_op')}\\\\`,
            `&= ${pp(a)}x ${ab + c != 0 ? pp(ab + c, 'merge_op') : ''}`,
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    // summe: ax + 1x + c
    const A = a + 1
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          `${pp(a)}x ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')} &= ${pp(a + b)}x ${c != 0 ? pp(c, 'merge_op') : ''}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
