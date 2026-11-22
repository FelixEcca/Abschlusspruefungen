import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { vec } from './math'

interface DATA {
  a: number
  b: number
  c: number
  variant: number
}
export const exercise22064: Exercise<DATA> = {
  title: 'Mit dem Skalarprodukt auf Orthogonalität prüfen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-3, -2, -1, 1, 2, 3]),
      b: rng.randomIntBetween(1, 4),
      c: rng.randomIntBetween(-3, 3),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: 2, b: 3, c: 1, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie das Skalarprodukt. Sind die beiden Vektoren orthogonal?
        </p>
        <p>
          <InlineMath
            math={String.raw`\vec u=${vec([data.a, data.b, data.c])},\quad\vec v=${vec([-data.b + data.variant, data.a, 0])}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Beim Skalarprodukt werden entsprechende Komponenten multipliziert und
          die drei Produkte addiert.
        </p>
        <p>
          <InlineMath
            math={String.raw`\vec u\cdot\vec v=(${data.a})(${-data.b + data.variant})+(${data.b})(${data.a})+(${data.c})\cdot0=${data.a * data.variant}`}
          />
          .
        </p>
        <p>
          {data.variant === 0
            ? 'Beide Vektoren sind ungleich null und ihr Skalarprodukt ist null. Sie sind orthogonal.'
            : 'Das Skalarprodukt ist nicht null. Die Vektoren sind nicht orthogonal.'}
        </p>
      </>
    )
  },
}
