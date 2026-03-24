import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'twoFractions' | 'fractionEqualsConst'
type Side = 'normal' | 'swapped'

interface DATA {
  mode: Mode
  side: Side

  a: number
  b: number
  c: number
  d: number

  solution: number
}

export const exercise4913: Exercise<DATA> = {
  title: 'Mittlere Bruchgleichungen',
  source: 'Gleichungen',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray([
      'twoFractions',
      'fractionEqualsConst',
    ])

    const side: Side = rng.randomBoolean() ? 'normal' : 'swapped'

    let a = rng.randomIntBetween(2, 6)
    let b = rng.randomIntBetween(-10, 10)
    let c = rng.randomIntBetween(2, 6)
    let d = rng.randomIntBetween(-10, 10)

    let solution = 0

    if (mode === 'twoFractions') {
      // (ax + b)/(cx + d) = 4
      const numerator = 4 * d - b
      const denominator = a - 4 * c

      if (denominator === 0) return this.generator(rng)

      solution = numerator / denominator
    }

    if (mode === 'fractionEqualsConst') {
      // (ax + b)/(cx + d) = 2
      const numerator = 2 * d - b
      const denominator = a - 2 * c

      if (denominator === 0) return this.generator(rng)

      solution = numerator / denominator
    }

    return { mode, side, a, b, c, d, solution }
  },

  originalData: {
    mode: 'twoFractions',
    side: 'normal',
    a: 3,
    b: -16,
    c: 6,
    d: -4,
    solution: 4,
  },

  constraint({ data }) {
    return isFinite(data.solution) && data.b != 0 && data.d != 0
  },

  task({ data }) {
    const { mode, side, a, b, c, d } = data

    const frac = `\\frac{${pp(a)}x ${pp(b, 'merge_op')}}{${pp(
      c,
    )}x ${pp(d, 'merge_op')}}`

    const equation = mode === 'twoFractions' ? `${frac} = 4` : `${frac} = 2`

    const [left, right] = equation.split('=')

    return (
      <>
        <p>Lösen Sie die Gleichung:</p>

        {side === 'normal' && <InlineMath math={`${left} = ${right}`} />}

        {side === 'swapped' && <InlineMath math={`${right} = ${left}`} />}
      </>
    )
  },

  solution({ data }) {
    const { mode, side, a, b, c, d, solution } = data

    const k = mode === 'twoFractions' ? 4 : 2

    const left =
      side === 'normal'
        ? `\\frac{${pp(a)}x ${pp(b, 'merge_op')}}{${pp(
            c,
          )}x ${pp(d, 'merge_op')}}`
        : `${pp(k)}`

    const right =
      side === 'normal'
        ? `${pp(k)}`
        : `\\frac{${pp(a)}x ${pp(b, 'merge_op')}}{${pp(
            c,
          )}x ${pp(d, 'merge_op')}}`

    return (
      <>
        <InlineMath math={`${left} = ${right}`} />
        <br />

        <InlineMath
          math={`${pp(a)}x ${pp(b, 'merge_op')} = ${pp(k)}(${pp(
            c,
          )}x ${pp(d, 'merge_op')})`}
        />
        <br />

        <InlineMath
          math={`${pp(a)}x ${pp(b, 'merge_op')} = ${pp(
            k * c,
          )}x ${pp(k * d, 'merge_op')}`}
        />
        <br />

        <InlineMath math={`${pp(a - k * c)}x = ${pp(k * d - b)}`} />
        <br />

        <InlineMath
          math={`x = ${pp(Number.isInteger(solution) ? solution : Math.round(solution * 100) / 100)}`}
        />
      </>
    )
  },
}
