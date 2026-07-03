// exercise9596.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  numerator: number
  denominator: number
  whole: number
  result: number
}

export const exercise9596: Exercise<DATA> = {
  title: 'Anteil berechnen',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const denominator = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    const base = rng.randomIntBetween(2, 12)
    const whole = denominator * base
    const result = numerator * base
    return { numerator, denominator, whole, result }
  },

  originalData: {
    numerator: 3,
    denominator: 4,
    whole: 20,
    result: 15,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie{' '}
          <InlineMath math={`\\frac{${data.numerator}}{${data.denominator}}`} />{' '}
          von {data.whole}.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird durch den Nenner geteilt. Dann wird mit dem Zähler multipliziert.</p>
        <InlineMath
          math={`${data.whole}:${data.denominator}=${pp(
            data.whole / data.denominator,
          )}`}
        />
        <br />
        <InlineMath
          math={`${pp(data.whole / data.denominator)}\\cdot ${
            data.numerator
          }=${data.result}`}
        />
        <p>
          Ergebnis: <b>{data.result}</b>
        </p>
      </>
    )
  },
}