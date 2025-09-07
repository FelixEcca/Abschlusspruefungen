import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4200 {
  a: number
  b: number
  c: number
  d: number // a x + b = c x + d
}

export const exercise4200: Exercise<D4200> = {
  title: 'Lineare Gleichungen lösen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 2,
  generator(rng) {
    // a x + b = c x + d  (a ≠ c)
    const a = rng.randomIntBetween(-8, 8)
    const c = rng.randomIntBetween(-8, 8)
    const b = rng.randomIntBetween(-12, 12)
    const d = rng.randomIntBetween(-12, 12)
    return { a, b, c, d }
  },
  originalData: { a: 2, b: 5, c: -3, d: 1 },
  constraint({ data }) {
    const x = (data.d - data.b) / (data.a - data.c)
    return (
      data.a !== data.c &&
      data.a != 0 &&
      data.c != 0 &&
      data.b != data.d &&
      data.b != 0 &&
      data.d != 0 &&
      (x * 2) % 1 == 0
    )
  },
  task({ data }) {
    const { a, b, c, d } = data
    return (
      <>
        <p>Löse die Gleichung.</p>
        <BlockMath
          math={`${data.a === 1 ? ' ' : data.a === -1 ? '-' : pp(a)}x ${pp(b, 'merge_op')} = ${data.c === 1 ? ' ' : data.c === -1 ? '-' : pp(c)}x ${pp(d, 'merge_op')}`}
        />
      </>
    )
  },
  solution({ data }) {
    const { a, b, c, d } = data
    // (a-c) x = d - b
    const A = a - c
    const B = d - b
    const x = B / A
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          `${data.a === 1 ? ' ' : data.a === -1 ? '-' : pp(a)}x  ${pp(b, 'merge_op')} &= ${data.c === 1 ? ' ' : data.c === -1 ? '-' : pp(c)}x ${pp(d, 'merge_op')}\\\\`,
          `${data.a - data.c === 1 ? ' ' : data.a - data.c === -1 ? '-' : pp(a - data.c)}x  &= ${pp(d - b)}\\\\`,
          `x &= ${pp(x)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
