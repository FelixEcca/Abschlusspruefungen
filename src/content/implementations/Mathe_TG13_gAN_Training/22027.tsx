import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, polynomial } from './math'

interface DATA {
  a: number
  b: number
  left: number
  right: number
}

export const exercise22027: Exercise<DATA> = {
  title: 'Bestimmte Integrale mit einfachen Grenzen berechnen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    const left = rng.randomIntBetween(-2, 1)
    return {
      a: rng.randomIntBetween(1, 4),
      b: rng.randomIntBetween(-3, 4),
      left,
      right: left + rng.randomIntBetween(1, 4),
    }
  },
  originalData: { a: 2, b: 1, left: 0, right: 3 },
  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das bestimmte Integral exakt.</p>
        <p>
          <InlineMath
            math={String.raw`\int_{${data.left}}^{${data.right}}(${polynomial([
              [data.a, 1],
              [data.b, 0],
            ])})\,dx`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const upper = data.a * data.right ** 2 + 2 * data.b * data.right,
      lower = data.a * data.left ** 2 + 2 * data.b * data.left
    return (
      <>
        <p>
          Eine Stammfunktion ist{' '}
          <InlineMath
            math={String.raw`F(x)=${frac(data.a, 2)}x^2+(${data.b})x`}
          />
          . Setzen Sie zuerst die obere und dann die untere Grenze ein:
        </p>
        <p>
          <InlineMath
            math={String.raw`F(${data.right})-F(${data.left})=${frac(upper, 2)}-(${frac(lower, 2)})=${frac(upper - lower, 2)}`}
          />
          .
        </p>
      </>
    )
  },
}
