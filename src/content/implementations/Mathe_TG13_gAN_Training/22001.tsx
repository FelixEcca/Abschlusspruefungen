import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  operation: number
}

export const exercise22001: Exercise<DATA> = {
  title: 'Brüche mit einer Rechenart verrechnen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 7),
      b: rng.randomIntBetween(2, 8),
      c: rng.randomIntBetween(1, 7),
      d: rng.randomIntBetween(2, 8),
      operation: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { a: 2, b: 3, c: 1, d: 4, operation: 0 },
  task({ data }) {
    const sign = ['+', '-', '\\cdot', ':'][data.operation]
    return (
      <>
        <p>Berechnen Sie und kürzen Sie das Ergebnis vollständig.</p>
        <p>
          <InlineMath
            math={String.raw`\frac{${data.a}}{${data.b}}${sign}\frac{${data.c}}{${data.d}}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const { a, b, c, d, operation } = data
    const numerator =
      operation === 0
        ? a * d + c * b
        : operation === 1
          ? a * d - c * b
          : operation === 2
            ? a * c
            : a * d
    const denominator = operation < 2 ? b * d : operation === 2 ? b * d : b * c
    return (
      <>
        <p>
          {operation < 2
            ? 'Zum Addieren oder Subtrahieren benötigen beide Brüche einen gemeinsamen Nenner.'
            : operation === 2
              ? 'Multiplizieren Sie Zähler mit Zähler und Nenner mit Nenner.'
              : 'Beim Dividieren multiplizieren Sie mit dem Kehrbruch des zweiten Bruchs.'}
        </p>
        <p>
          <InlineMath
            math={String.raw`\frac{${numerator}}{${denominator}}=${frac(numerator, denominator)}`}
          />
        </p>
      </>
    )
  },
}
