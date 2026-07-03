import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  capital: number
  rate: number
  days: number
  interest: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export const exercise9070: Exercise<DATA> = {
  title: 'Teil 2: Zinsen',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const capital = rng.randomItemFromArray([2500, 3200, 4300, 5000])
    const rate = rng.randomItemFromArray([1.8, 2.4, 3])
    const days = rng.randomItemFromArray([90, 120, 150, 180])
    const interest = round2((capital * rate * days) / (100 * 360))
    return { capital, rate, days, interest }
  },

  originalData: {
    capital: 4300,
    rate: 2.4,
    days: 150,
    interest: 43,
  },

  constraint({ data }) {
    return data.interest >= 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie legen {pp(data.capital)} € zu einem Zinssatz von {pp(data.rate)}{' '}
          % bei Ihrer Bank an.
        </p>
        <p>Berechnen Sie, wie viel Zinsen Sie nach {data.days} Tagen bekommen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`Z=\\frac{${data.capital}\\cdot ${pp(data.rate)}\\cdot ${data.days}}{100\\cdot 360}=${pp(data.interest)}\\,€`}
      />
    )
  },
}
