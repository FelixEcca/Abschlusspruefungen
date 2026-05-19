// exercise9591.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Mode = 'toMixed' | 'toImproper'

interface DATA {
  mode: Mode
  whole: number
  numerator: number
  denominator: number
  improperNumerator: number
}

export const exercise9591: Exercise<DATA> = {
  title: 'Gemischte Brüche umwandeln',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray(['toMixed', 'toImproper'])
    const whole = rng.randomIntBetween(1, 5)
    const denominator = rng.randomItemFromArray([3, 4, 5, 6, 8])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    const improperNumerator = whole * denominator + numerator

    return { mode, whole, numerator, denominator, improperNumerator }
  },

  originalData: {
    mode: 'toImproper',
    whole: 2,
    numerator: 3,
    denominator: 5,
    improperNumerator: 13,
  },

  constraint({ data }) {
    return data.numerator < data.denominator
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie um.</p>
        {data.mode === 'toImproper' ? (
          <InlineMath
            math={`${data.whole}\\frac{${data.numerator}}{${data.denominator}}`}
          />
        ) : (
          <InlineMath
            math={`\\frac{${data.improperNumerator}}{${data.denominator}}`}
          />
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.mode === 'toImproper' ? (
          <>
            <p>Die ganze Zahl wird mit dem Nenner multipliziert. Dann wird der Zähler addiert.</p>
            <InlineMath
              math={`${data.whole}\\frac{${data.numerator}}{${data.denominator}}=\\frac{${data.whole}\\cdot ${data.denominator}+${data.numerator}}{${data.denominator}}=\\frac{${data.improperNumerator}}{${data.denominator}}`}
            />
          </>
        ) : (
          <>
            <p>Teile den Zähler durch den Nenner.</p>
            <InlineMath
              math={`${data.improperNumerator}:${data.denominator}=${data.whole}\\;\\text{Rest}\\;${data.numerator}`}
            />
            <br />
            <InlineMath
              math={`\\frac{${data.improperNumerator}}{${data.denominator}}=${data.whole}\\frac{${data.numerator}}{${data.denominator}}`}
            />
          </>
        )}
      </>
    )
  },
}