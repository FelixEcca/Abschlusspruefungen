import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  expenses: number
  surchargePercent: number
  surchargeAmount: number
  sum: number
  glasses: number
  pricePerGlass: number
  roundedPrice: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export const exercise9067: Exercise<DATA> = {
  title: 'Teil 2: Verkaufspreis',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const expenses = rng.randomItemFromArray([75.2, 91.5, 120.4])
    const surchargePercent = rng.randomItemFromArray([150, 200, 250])
    const glasses = rng.randomItemFromArray([120, 180, 210, 240])
    const surchargeAmount = round2((expenses * surchargePercent) / 100)
    const sum = round2(expenses + surchargeAmount)
    const pricePerGlass = round2(sum / glasses)
    const roundedPrice = Math.ceil(pricePerGlass)
    return {
      expenses,
      surchargePercent,
      surchargeAmount,
      sum,
      glasses,
      pricePerGlass,
      roundedPrice,
    }
  },

  originalData: {
    expenses: 91.5,
    surchargePercent: 250,
    surchargeAmount: 228.8,
    sum: 320.3,
    glasses: 210,
    pricePerGlass: 320.3 / 210,
    roundedPrice: 2,
  },

  constraint({ data }) {
    return data.roundedPrice >= data.pricePerGlass
  },

  task({ data }) {
    return (
      <>
        <p>
          Der Preis für das Mischgetränk wurde mit Ausgaben von{' '}
          {pp(data.expenses)} € und einem Gewinnzuschlag von{' '}
          {data.surchargePercent} % berechnet. Es werden {data.glasses} Gläser
          verkauft.
        </p>
        <p>
          Berechnen Sie den Preis pro Getränk. Runden Sie für den Verkaufspreis
          auf den nächsten vollen € auf.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${pp(data.expenses)}+${pp(data.surchargeAmount)}=${pp(data.sum)}\\,€`}
        />
        <br />
        <InlineMath
          math={`${pp(data.sum)}:${data.glasses}=${pp(data.pricePerGlass)}\\,€`}
        />
        <p>Gerundeter Verkaufspreis: {pp(data.roundedPrice)} €.</p>
      </>
    )
  },
}
