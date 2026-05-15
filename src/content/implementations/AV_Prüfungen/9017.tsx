// exercise9017.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  capital: number
  rate: number
  months: number
  interest: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9017: Exercise<DATA> = {
  title: 'Teil 2: Zinsen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const capital = rng.randomItemFromArray([
      12000, 18000, 25000, 32000, 45000, 60000,
    ])
    const rate = rng.randomItemFromArray([3, 4, 5, 6, 7, 8])
    const months = rng.randomIntBetween(3, 10)
    const interest = round2((capital * rate * months) / (100 * 12))
    return { capital, rate, months, interest }
  },

  originalData: { capital: 45000, rate: 6, months: 5, interest: 1125 },

  constraint({ data }) {
    return data.interest > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Das Dach einer Hütte soll für {pp(data.capital)} € erneuert werden.
          Die Schule nimmt dafür einen Kredit mit einem Zinssatz von{' '}
          {pp(data.rate)} % auf.
        </p>
        <p>
          Berechnen Sie, wie viel Zinsen für {data.months} Monate bezahlt werden
          müssen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`Z=\\frac{${pp(data.capital)}\\cdot ${pp(
            data.rate,
          )}\\cdot ${data.months}}{100\\cdot 12}`}
        />
        <br />
        <InlineMath math={`Z=${pp(data.interest)}\\,€`} />
      </>
    )
  },
}
