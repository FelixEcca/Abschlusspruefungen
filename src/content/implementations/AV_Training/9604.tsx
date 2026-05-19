// exercise9604.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  capital: number
  rate: number
  years: number
  finalCapital: number
  interest: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9604: Exercise<DATA> = {
  title: 'Zinseszins',
  source: 'Prozentrechnung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const capital = rng.randomItemFromArray([500, 1000, 1500, 2000, 5000])
    const rate = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const years = rng.randomItemFromArray([2, 3, 4, 5])
    const finalCapital = round2(capital * Math.pow(1 + rate / 100, years))
    const interest = round2(finalCapital - capital)

    return { capital, rate, years, finalCapital, interest }
  },

  originalData: {
    capital: 1000,
    rate: 5,
    years: 3,
    finalCapital: 1157.63,
    interest: 157.63,
  },

  constraint({ data }) {
    return data.finalCapital > data.capital
  },

  task({ data }) {
    return (
      <>
        <p>
          Auf einem Konto liegen {pp(data.capital)} €. Der Zinssatz beträgt{' '}
          {pp(data.rate)} % pro Jahr.
        </p>
        <p>
          Berechnen Sie, wie viel Geld nach {data.years} Jahren auf dem Konto
          liegt.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Zinseszins wird jedes Jahr der neue Betrag weiter verzinst.</p>
        <InlineMath math={`K_n=K_0\\cdot \\left(1+\\frac{p}{100}\\right)^n`} />

        <p>Einsetzen:</p>
        <InlineMath
          math={`K_n=${pp(data.capital)}\\cdot \\left(1+\\frac{${pp(
            data.rate,
          )}}{100}\\right)^{${data.years}}`}
        />
        <br />
        <InlineMath math={`K_n\\approx ${pp(data.finalCapital)}\\,€`} />

        <p>
          Nach {data.years} Jahren liegen ungefähr{' '}
          <b>{pp(data.finalCapital)} €</b> auf dem Konto.
        </p>
        <p>
          Die Zinsen betragen insgesamt <b>{pp(data.interest)} €</b>.
        </p>
      </>
    )
  },
}