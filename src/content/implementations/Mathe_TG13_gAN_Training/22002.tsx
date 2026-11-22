import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  a: number
  exponent: number
  variant: number
}

export const exercise22002: Exercise<DATA> = {
  title: 'Potenzen, Wurzeln und Vorzeichen unterscheiden',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 6),
      exponent: rng.randomItemFromArray([2, 3, 4]),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { a: 3, exponent: 2, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          {data.variant === 0
            ? 'Berechnen Sie beide Ausdrücke. Achten Sie auf die Klammern.'
            : data.variant === 1
              ? 'Berechnen Sie die Wurzel.'
              : 'Berechnen Sie mithilfe der Potenzgesetze.'}
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`(-${data.a})^{${data.exponent}},\quad -${data.a}^{${data.exponent}}`
                : data.variant === 1
                  ? String.raw`\sqrt{${data.a ** 2}}`
                  : String.raw`\frac{${data.a}^{${data.exponent + 2}}}{${data.a}^{${data.exponent}}}`
            }
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return data.variant === 0 ? (
      <>
        <p>
          Mit Klammern wird auch das Minuszeichen potenziert. Ohne Klammern wird
          zuerst die Potenz berechnet.
        </p>
        <p>
          <InlineMath
            math={String.raw`(-${data.a})^{${data.exponent}}=${(-data.a) ** data.exponent},\quad -${data.a}^{${data.exponent}}=${-(data.a ** data.exponent)}`}
          />
        </p>
      </>
    ) : data.variant === 1 ? (
      <p>
        Die Quadratwurzel bezeichnet den nicht negativen Wert:{' '}
        <InlineMath math={String.raw`\sqrt{${data.a ** 2}}=${data.a}`} />.
      </p>
    ) : (
      <p>
        Bei gleicher Basis werden beim Dividieren die Exponenten subtrahiert:{' '}
        <InlineMath
          math={String.raw`${data.a}^{${data.exponent + 2}-${data.exponent}}=${data.a}^2=${data.a ** 2}`}
        />
        .
      </p>
    )
  },
}
