import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, coord, add, mul, Vec } from './math'

interface DATA {
  a: Vec
  u: Vec
  ratio: number
}
export const exercise22066: Exercise<DATA> = {
  title: 'Innere und äußere Teilpunkte zu einem Streckenverhältnis finden',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: [
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
      ],
      u: [1, rng.randomIntBetween(-2, 2), rng.randomIntBetween(1, 2)],
      ratio: rng.randomIntBetween(2, 4),
    }
  },
  originalData: { a: [0, 1, 0], u: [1, -1, 2], ratio: 2 },
  task({ data }) {
    const b = add(data.a, mul(data.u, data.ratio ** 2 - 1))
    return (
      <>
        <p>
          Bestimmen Sie alle Punkte P auf der Geraden AB, für die{' '}
          <InlineMath math={String.raw`|AP|:|BP|=${data.ratio}:1`} /> gilt.
        </p>
        <p>
          <InlineMath
            math={String.raw`A(${coord(data.a)}),\quad B(${coord(b)})`}
          />
        </p>
        <p>Beachten Sie: P muss nicht zwischen A und B liegen.</p>
      </>
    )
  },
  solution({ data }) {
    const r = data.ratio,
      inside = add(data.a, mul(data.u, r * (r - 1))),
      outside = add(data.a, mul(data.u, r * (r + 1)))
    return (
      <>
        <p>
          Mit <InlineMath math={String.raw`P=A+t\overrightarrow{AB}`} /> gilt{' '}
          <InlineMath math={String.raw`|AP|=|t||AB|,\ |BP|=|t-1||AB|`} />. Für
          den inneren Teilpunkt ist{' '}
          <InlineMath math={String.raw`t=${frac(r, r + 1)}`} />, für den äußeren{' '}
          <InlineMath math={String.raw`t=${frac(r, r - 1)}`} />.
        </p>
        <p>
          <InlineMath
            math={String.raw`P_1(${coord(inside)}),\quad P_2(${coord(outside)})`}
          />
          .
        </p>
        <p>
          Der erste Parameter liegt zwischen 0 und 1, der zweite über 1. Die
          Strecke BP ist damit im äußeren Fall nicht der Rest von AB, sondern
          liegt hinter B.
        </p>
      </>
    )
  },
}
