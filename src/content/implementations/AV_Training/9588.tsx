// exercise9588.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  numerator: number
  denominator: number
  factor: number
  newNumerator: number
  newDenominator: number
}

export const exercise9588: Exercise<DATA> = {
  title: 'Brüche erweitern',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const denominator = rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    const factor = rng.randomItemFromArray([2, 3, 4, 5, 10])
    return {
      numerator,
      denominator,
      factor,
      newNumerator: numerator * factor,
      newDenominator: denominator * factor,
    }
  },

  originalData: {
    numerator: 2,
    denominator: 5,
    factor: 3,
    newNumerator: 6,
    newDenominator: 15,
  },

  constraint({ data }) {
    return data.factor > 1
  },

  task({ data }) {
    return (
      <>
        <p>Erweitern Sie den Bruch mit {data.factor}.</p>
        <InlineMath math={`\\frac{${data.numerator}}{${data.denominator}}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zähler und Nenner werden mit derselben Zahl multipliziert.</p>
        <InlineMath
          math={`\\frac{${data.numerator}}{${data.denominator}}=\\frac{${data.numerator}\\cdot ${data.factor}}{${data.denominator}\\cdot ${data.factor}}=\\frac{${data.newNumerator}}{${data.newDenominator}}`}
        />
      </>
    )
  },
}