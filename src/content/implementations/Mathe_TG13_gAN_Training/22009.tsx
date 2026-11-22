import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  b: number
  c: number
  x: number
}

export const exercise22009: Exercise<DATA> = {
  title: 'Funktionswerte mit Vorzeichen berechnen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-3, 3),
      b: rng.randomIntBetween(-4, 4),
      c: rng.randomIntBetween(-5, 5),
      x: rng.randomIntBetween(-3, 3),
    }
  },
  originalData: { a: 2, b: -3, c: 1, x: -2 },
  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie <InlineMath math={String.raw`f(${data.x})`} /> für
        </p>
        <p>
          <InlineMath
            math={String.raw`f(x)=${polynomial([
              [data.a, 2],
              [data.b, 1],
              [data.c, 0],
            ])}`}
          />
          .
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Ersetzen Sie jedes x durch die eingesetzte Zahl. Bei negativen Zahlen
          helfen Klammern.
        </p>
        <p>
          <InlineMath
            math={String.raw`f(${data.x})=(${data.a})(${data.x})^2+(${data.b})(${data.x})+(${data.c})=${data.a * data.x ** 2 + data.b * data.x + data.c}`}
          />
        </p>
      </>
    )
  },
}
