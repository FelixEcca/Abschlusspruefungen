// exercise9049.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  target: number
  savings: number
  credit: number
  interest: number
  months: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9049: Exercise<DATA> = {
  title: 'Teil 2: Kreditzinsen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target = rng.randomItemFromArray([1000, 1200, 1500])
    const savings = rng.randomItemFromArray([500, 650, 750])
    const interest = rng.randomItemFromArray([8.5, 10, 11.95])

    const credit = target - savings
    const months = 6

    const result = round2((credit * interest * months) / (100 * 12))

    return {
      target,
      savings,
      credit,
      interest,
      months,
      result,
    }
  },

  originalData: {
    target: 1200,
    savings: 750,
    credit: 450,
    interest: 11.95,
    months: 6,
    result: 26.89,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Nach einem halben Jahr wurden {data.savings} € angespart.</p>

        <p>Für den Rest wird ein Kredit aufgenommen.</p>

        <p>Der jährliche Zinssatz beträgt {data.interest} %.</p>

        <p>Berechnen Sie die Zinsen nach {data.months} Monaten.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Kredit berechnen:</p>

        <InlineMath math={`${data.target}-${data.savings}=${data.credit}`} />

        <p>Zinsen berechnen:</p>

        <InlineMath
          math={`Z=\\frac{${data.credit}\\cdot ${data.interest}\\cdot ${data.months}}{100\\cdot12}=${pp(
            data.result,
          )}`}
        />

        <p>
          Die Zinsen betragen <b>{pp(data.result)} €</b>.
        </p>
      </>
    )
  },
}
