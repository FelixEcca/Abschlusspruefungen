// exercise9594.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  numerator: number
  denominator: number
  decimal: number
}

export const exercise9594: Exercise<DATA> = {
  title: 'Bruch in Dezimalzahl',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const denominator = rng.randomItemFromArray([2, 4, 5, 8, 10, 20])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    const decimal = numerator / denominator
    return { numerator, denominator, decimal }
  },

  originalData: {
    numerator: 3,
    denominator: 4,
    decimal: 0.75,
  },

  constraint({ data }) {
    return data.decimal > 0
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie den Bruch in eine Dezimalzahl um.</p>
        <InlineMath math={`\\frac{${data.numerator}}{${data.denominator}}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Ein Bruch bedeutet: Zähler geteilt durch Nenner.</p>
        <InlineMath
          math={`\\frac{${data.numerator}}{${data.denominator}}=${data.numerator}:${data.denominator}=${pp(data.decimal)}`}
        />
      </>
    )
  },
}