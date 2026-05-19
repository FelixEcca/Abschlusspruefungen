// exercise9592.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  whole: number
  numerator: number
  denominator: number
  resultNumerator: number
  resultDenominator: number
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function frac(n: number, d: number) {
  if (d === 1) return `${n}`
  return `\\frac{${n}}{${d}}`
}

export const exercise9592: Exercise<DATA> = {
  title: 'Bruch mit ganzer Zahl multiplizieren',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const whole = rng.randomIntBetween(2, 12)
    const denominator = rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    const rawN = whole * numerator
    const rawD = denominator
    const g = gcd(rawN, rawD)

    return {
      whole,
      numerator,
      denominator,
      resultNumerator: rawN / g,
      resultDenominator: rawD / g,
    }
  },

  originalData: {
    whole: 6,
    numerator: 3,
    denominator: 4,
    resultNumerator: 9,
    resultDenominator: 2,
  },

  constraint({ data }) {
    return data.numerator > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath
          math={`${data.whole}\\cdot \\frac{${data.numerator}}{${data.denominator}}`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die ganze Zahl wird mit dem Zähler multipliziert.</p>
        <InlineMath
          math={`${data.whole}\\cdot \\frac{${data.numerator}}{${data.denominator}}=\\frac{${data.whole}\\cdot ${data.numerator}}{${data.denominator}}=\\frac{${data.whole * data.numerator}}{${data.denominator}}`}
        />
        <br />
        <InlineMath
          math={`=${frac(data.resultNumerator, data.resultDenominator)}`}
        />
      </>
    )
  },
}