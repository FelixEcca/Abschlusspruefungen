import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  income: number
  donation: number
  expenses: number
  profit: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export const exercise9056: Exercise<DATA> = {
  title: 'Teil 1: Gewinn berechnen',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const income = rng.randomItemFromArray([280.5, 350.25, 433.5, 520.8])
    const donation = rng.randomItemFromArray([12.5, 18.7, 25, 40])
    const expenses = rng.randomItemFromArray([65.2, 88.34, 125.6, 170.45])
    const profit = round2(income + donation - expenses)
    return { income, donation, expenses, profit }
  },

  originalData: {
    income: 433.5,
    donation: 18.7,
    expenses: 88.34,
    profit: 363.86,
  },

  constraint({ data }) {
    return data.profit === round2(data.income + data.donation - data.expenses)
  },

  task({ data }) {
    return (
      <>
        <p>
          Ihre Klasse hat {pp(data.income)} € eingenommen. Besucher haben
          zusätzlich {pp(data.donation)} € gespendet. Die Ausgaben waren{' '}
          {pp(data.expenses)} €.
        </p>
        <p>Berechnen Sie den Gewinn.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`${pp(data.income)}+${pp(data.donation)}-${pp(data.expenses)}=${pp(
          data.profit,
        )}\\,€`}
      />
    )
  },
}
