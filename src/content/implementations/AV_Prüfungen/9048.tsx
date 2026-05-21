// exercise9048.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  income: number
  rent: number
  food: number
  ticket: number
  leisure: number
  savings: number
  phone: number
  months: number
}

export const exercise9048: Exercise<DATA> = {
  title: 'Teil 2: Sparen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const income = rng.randomItemFromArray([1000, 1150, 1300])
    const rent = rng.randomItemFromArray([350, 420, 485])
    const food = rng.randomItemFromArray([180, 240, 280])
    const ticket = rng.randomItemFromArray([39, 49, 59])
    const leisure = rng.randomItemFromArray([120, 150, 185])

    const savings = income - rent - food - ticket - leisure

    const phone = rng.randomItemFromArray([900, 1000, 1200])

    const months = Math.ceil(phone / savings)

    return {
      income,
      rent,
      food,
      ticket,
      leisure,
      savings,
      phone,
      months,
    }
  },

  originalData: {
    income: 1150,
    rent: 485,
    food: 280,
    ticket: 49,
    leisure: 185,
    savings: 151,
    phone: 1200,
    months: 8,
  },

  constraint({ data }) {
    return data.savings > 0
  },

  task({ data }) {
    return (
      <>
        <p>Monatlich stehen insgesamt {data.income} € zur Verfügung.</p>

        <p>
          Miete: {data.rent} €
          <br />
          Lebensmittel: {data.food} €
          <br />
          Monatskarte: {data.ticket} €
          <br />
          Freizeit: {data.leisure} €
        </p>

        <p>
          Berechnen Sie, wie viele Monate gespart werden müssen, um ein
          Smartphone für {data.phone} € zu kaufen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Monatliche Ersparnis:</p>

        <InlineMath
          math={`${data.income}-${data.rent}-${data.food}-${data.ticket}-${data.leisure}=${data.savings}`}
        />

        <p>Benötigte Monate:</p>

        <InlineMath
          math={`${data.phone}:${data.savings}\\approx ${data.months}`}
        />

        <p>
          Es müssen <b>{data.months} Monate</b> gespart werden.
        </p>
      </>
    )
  },
}
