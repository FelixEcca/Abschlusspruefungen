// exercise9590.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  n: number
  d: number
  divisor: number
  rn: number
  rd: number
}

export const exercise9590: Exercise<DATA> = {
  title: 'Brüche kürzen',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const rn = rng.randomItemFromArray([1, 2, 3, 4, 5])
    const rd = rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
    const divisor = rng.randomItemFromArray([2, 3, 4, 5])
    return { n: rn * divisor, d: rd * divisor, divisor, rn, rd }
  },

  originalData: {
    n: 6,
    d: 15,
    divisor: 3,
    rn: 2,
    rd: 5,
  },

  constraint({ data }) {
    return data.rn < data.rd
  },

  task({ data }) {
    return (
      <>
        <p>Kürzen Sie den Bruch.</p>
        <InlineMath math={`\\frac{${data.n}}{${data.d}}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zähler und Nenner werden durch dieselbe Zahl geteilt.</p>
        <InlineMath
          math={`\\frac{${data.n}}{${data.d}}=\\frac{${data.n}:${data.divisor}}{${data.d}:${data.divisor}}=\\frac{${data.rn}}{${data.rd}}`}
        />
      </>
    )
  },
}