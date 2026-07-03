// exercise9523.tsx
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

export const exercise9523: Exercise<DATA> = {
  title: 'Zinsen berechnen',
  source: 'Prozentrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const capital = rng.randomItemFromArray([
      12000, 18000, 25000, 32000, 45000, 60000,
    ])
    const rate = rng.randomItemFromArray([3, 4, 5, 6, 7, 8])
    const months = rng.randomIntBetween(3, 10)
    const interest = round2((capital * rate * months * 30) / (100 * 360))

    return { capital, rate, months, interest }
  },

  originalData: {
    capital: 45000,
    rate: 6,
    months: 5,
    interest: 1125,
  },

  constraint({ data }) {
    return data.interest > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Es wird ein Kredit über {pp(data.capital)} € aufgenommen. Der Zinssatz
          beträgt {data.rate} %.
        </p>
        <p>Berechnen Sie die Zinsen für {data.months} Monate.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>{data.months} Monate sind {data.months * 30} Tage.</p>
        <InlineMath math={`Z=\\frac{K\\cdot p\\cdot t}{100\\cdot 360}`} />
        <p>
          <InlineMath
            math={`Z=\\frac{${pp(data.capital)}\\cdot ${data.rate}\\cdot ${
              data.months * 30
            }}{100\\cdot 360}=${pp(data.interest)}\\,€`}
          />
        </p>
      </>
    )
  },
}