import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  numerator: number
  denominator: number
  doughKg: number
  milkLiter: number
}

export const exercise9053: Exercise<DATA> = {
  title: 'Teil 1: Bruch mit Einheit',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const numerator = rng.randomItemFromArray([1, 2, 3])
    const denominator = rng.randomItemFromArray([2, 3, 4, 5])
    const doughKg = rng.randomItemFromArray([4, 6, 7, 8, 10])
    const milkLiter = (numerator / denominator) * doughKg
    return { numerator, denominator, doughKg, milkLiter }
  },

  originalData: {
    numerator: 2,
    denominator: 3,
    doughKg: 7,
    milkLiter: 14 / 3,
  },

  constraint({ data }) {
    return data.denominator !== 0 && data.numerator != data.denominator
  },

  task({ data }) {
    return (
      <>
        <p>
          Für 1 kg Waffelteig benötigen Sie{' '}
          <InlineMath math={`\\frac{${data.numerator}}{${data.denominator}}`} />{' '}
          Liter Milch.
        </p>
        <p>
          Berechnen Sie, wie viel Milch Sie für {data.doughKg} kg Waffelteig
          benötigen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`${data.doughKg}\\cdot \\frac{${data.numerator}}{${data.denominator}}=${pp(
          data.milkLiter,
        )}\\,l`}
      />
    )
  },
}
