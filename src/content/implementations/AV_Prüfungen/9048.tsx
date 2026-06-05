// exercise9048.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'smartphone' | 'laptop' | 'fahrrad' | 'reise' | 'fuehrerschein'

interface DATA {
  kontext: Kontext
  income: number
  cost1: number
  cost2: number
  cost3: number
  cost4: number
  savings: number
  goal: number
  months: number
}

function getContext(kontext: Kontext) {
  if (kontext === 'laptop') {
    return {
      item: 'einen Laptop',
      costs: ['Miete', 'Lebensmittel', 'Monatskarte', 'Freizeit'],
    }
  }

  if (kontext === 'fahrrad') {
    return {
      item: 'ein E-Bike',
      costs: ['Miete', 'Lebensmittel', 'Handyvertrag', 'Freizeit'],
    }
  }

  if (kontext === 'reise') {
    return {
      item: 'eine Reise',
      costs: ['Miete', 'Lebensmittel', 'Monatskarte', 'Kleidung'],
    }
  }

  if (kontext === 'fuehrerschein') {
    return {
      item: 'einen Führerschein',
      costs: ['Miete', 'Lebensmittel', 'Handyvertrag', 'Freizeit'],
    }
  }

  return {
    item: 'ein Smartphone',
    costs: ['Miete', 'Lebensmittel', 'Monatskarte', 'Freizeit'],
  }
}

export const exercise9048: Exercise<DATA> = {
  title: 'Teil 2: Sparen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'smartphone',
      'laptop',
      'fahrrad',
      'reise',
      'fuehrerschein',
    ])

    const income = rng.randomItemFromArray([1000, 1150, 1300, 1450, 1600])
    const cost1 = rng.randomItemFromArray([350, 420, 485, 520])
    const cost2 = rng.randomItemFromArray([180, 240, 280, 320])
    const cost3 = rng.randomItemFromArray([39, 49, 59, 69])
    const cost4 = rng.randomItemFromArray([120, 150, 185, 220])

    const savings = income - cost1 - cost2 - cost3 - cost4

    const goal =
      kontext === 'smartphone'
        ? rng.randomItemFromArray([900, 1000, 1200])
        : kontext === 'laptop'
          ? rng.randomItemFromArray([800, 1000, 1400])
          : kontext === 'fahrrad'
            ? rng.randomItemFromArray([1200, 1500, 1800])
            : kontext === 'reise'
              ? rng.randomItemFromArray([750, 1000, 1250])
              : rng.randomItemFromArray([1800, 2200, 2500])

    const months = Math.ceil(goal / savings)

    return {
      kontext,
      income,
      cost1,
      cost2,
      cost3,
      cost4,
      savings,
      goal,
      months,
    }
  },

  originalData: {
    kontext: 'smartphone',
    income: 1150,
    cost1: 485,
    cost2: 280,
    cost3: 49,
    cost4: 185,
    savings: 151,
    goal: 1200,
    months: 8,
  },

  constraint({ data }) {
    return data.savings > 0
  },

  task({ data }) {
    const context = getContext(data.kontext)

    return (
      <>
        <p>Sie haben monatlich insgesamt {pp(data.income)} €.</p>
        <p>Sie haben monatlich folgende Kosten:</p>

        <p>
          {context.costs[0]}: {pp(data.cost1)} €
          <br />
          {context.costs[1]}: {pp(data.cost2)} €
          <br />
          {context.costs[2]}: {pp(data.cost3)} €
          <br />
          {context.costs[3]}: {pp(data.cost4)} €
        </p>

        <p>Ihr restliches Geld sparen Sie.</p>

        <p>
          Berechnen Sie, wie viele Monate gespart werden müssen, um{' '}
          {context.item} für {pp(data.goal)} € zu kaufen.
        </p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data.kontext)
    const exactMonths = data.goal / data.savings

    return (
      <>
        <p>Monatliche Ersparnis:</p>

        <InlineMath
          math={`${pp(data.income)}-${pp(data.cost1)}-${pp(data.cost2)}-${pp(
            data.cost3,
          )}-${pp(data.cost4)}=${pp(data.savings)}\\,€`}
        />

        <p>Benötigte Monate:</p>

        <InlineMath
          math={`${pp(data.goal)}:${pp(data.savings)}\\approx ${pp(
            exactMonths,
          )}`}
        />

        <p>
          Da man nicht einen Teil eines Monats sparen kann, wird aufgerundet.
        </p>

        <p>
          Für {context.item} müssen <b>{data.months} Monate</b> gespart werden.
        </p>
      </>
    )
  },
}
