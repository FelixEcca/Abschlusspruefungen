import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, choose } from './math'

interface DATA {
  n: number
  k: number
  denominator: number
}
export const exercise22046: Exercise<DATA> = {
  title: 'Genau k Treffer mit der Binomialformel berechnen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    const n = rng.randomIntBetween(3, 6)
    return {
      n,
      k: rng.randomIntBetween(1, n - 1),
      denominator: rng.randomItemFromArray([2, 3]),
    }
  },
  originalData: { n: 4, k: 2, denominator: 2 },
  task({ data }) {
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`X\sim B(${data.n};${frac(1, data.denominator)})`}
          />
          . Berechnen Sie die Wahrscheinlichkeit für genau {data.k} Treffer als
          gekürzten Bruch.
        </p>
      </>
    )
  },
  solution({ data }) {
    const coefficient = choose(data.n, data.k),
      numerator = coefficient * (data.denominator - 1) ** (data.n - data.k),
      denominator = data.denominator ** data.n
    return (
      <>
        <p>Die Binomialformel zählt alle möglichen Anordnungen der Treffer.</p>
        <p>
          <InlineMath
            math={String.raw`P(X=${data.k})=\binom{${data.n}}{${data.k}}\left(\frac1{${data.denominator}}\right)^{${data.k}}\left(\frac{${data.denominator - 1}}{${data.denominator}}\right)^{${data.n - data.k}}=${frac(numerator, denominator)}`}
          />
          .
        </p>
        <p>
          Dabei ist{' '}
          <InlineMath
            math={String.raw`\binom{${data.n}}{${data.k}}=${coefficient}`}
          />
          . Der Binomialkoeffizient darf nicht weggelassen werden.
        </p>
      </>
    )
  },
}
