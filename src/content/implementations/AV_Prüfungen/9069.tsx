import { Exercise } from '@/data/types'

interface DATA {
  startAmount: number
  monthlySaving: number
  withdrawalMonth: string
  withdrawal: number
  monthsShown: string[]
  balancesShown: number[]
  target: number
  targetMonth: string
}

export const exercise9069: Exercise<DATA> = {
  title: 'Teil 2: Sparplan',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const startAmount = rng.randomItemFromArray([200, 300, 500])
    const monthlySaving = rng.randomItemFromArray([150, 200, 250, 300])
    const withdrawal = rng.randomItemFromArray([500, 800, 1000])
    const monthsShown = ['September', 'Oktober', 'November', 'Dezember', 'Januar', 'Februar', 'März']
    const balancesShown = monthsShown.map((_, i) => startAmount + (i + 1) * monthlySaving - (i >= 5 ? withdrawal : 0))
    const target = rng.randomItemFromArray([2000, 2600, 3000])
    let balance = balancesShown[balancesShown.length - 1]
    const future = ['April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober']
    let targetMonth = future[future.length - 1]
    for (const month of future) {
      balance += monthlySaving
      if (balance >= target) {
        targetMonth = month
        break
      }
    }
    return { startAmount, monthlySaving, withdrawalMonth: 'Februar', withdrawal, monthsShown, balancesShown, target, targetMonth }
  },

  originalData: {
    startAmount: 300,
    monthlySaving: 250,
    withdrawalMonth: 'Februar',
    withdrawal: 800,
    monthsShown: ['September', 'Oktober', 'November', 'Dezember', 'Januar', 'Februar', 'März'],
    balancesShown: [550, 800, 1050, 1300, 1550, 1000, 1250],
    target: 2600,
    targetMonth: 'September 2024',
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Zum Beginn der Ausbildung haben Sie {data.startAmount} € auf dem
          Sparkonto. Sie sparen jeden Monat {data.monthlySaving} €. Im{' '}
          {data.withdrawalMonth} nehmen Sie {data.withdrawal} € weg.
        </p>
        <p>
          Erstellen Sie eine Tabelle bis Ende März und ermitteln Sie, am Ende
          welchen Monats Sie mindestens {data.target} € gespart haben.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          Kontostände: {data.monthsShown.map((m, i) => `${m}: ${data.balancesShown[i]} €`).join(', ')}.
        </p>
        <p>Mindestens {data.target} € sind am Ende von {data.targetMonth} erreicht.</p>
      </>
    )
  },
}
