// exercise9599.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  percent: number
  numerator: number
  denominator: number
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

export const exercise9599: Exercise<DATA> = {
  title: 'Prozent in Bruch',
  source: 'Prozentrechnung',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const percent = rng.randomItemFromArray([
      5, 10, 20, 25, 40, 50, 60, 75, 80, 90, 100,
    ])

    const g = gcd(percent, 100)
    const numerator = percent / g
    const denominator = 100 / g

    return { percent, numerator, denominator }
  },

  originalData: {
    percent: 25,
    numerator: 1,
    denominator: 4,
  },

  constraint({ data }) {
    return data.percent > 0
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in einen gekürzten Bruch um.</p>
        <InlineMath math={`${pp(data.percent)}\\%`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Prozent bedeutet „von 100“.</p>
        <InlineMath math={`${pp(data.percent)}\\%=\\frac{${data.percent}}{100}`} />
        <p>Dann wird der Bruch gekürzt.</p>
        <InlineMath math={`\\frac{${data.percent}}{100}=\\frac{${data.numerator}}{${data.denominator}}`} />
      </>
    )
  },
}