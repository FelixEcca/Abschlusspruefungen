// exercise9512.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'kasse' | 'fest' | 'projekt' | 'aktion'

interface DATA {
  kontext: Kontext
  income1: number
  income2: number
  income3: number
  cost: number
  profit: number
}

function getContext(data: DATA) {
  if (data.kontext === 'fest') {
    return {
      text: `Bei einem Fest werden ${pp(data.income1)} €, ${pp(
        data.income2,
      )} € und ${pp(data.income3)} € eingenommen. Es entstehen Kosten von ${pp(
        data.cost,
      )} €.`,
      frage: 'Berechnen Sie den Gewinn.',
    }
  }

  if (data.kontext === 'projekt') {
    return {
      text: `Für ein Projekt werden ${pp(data.income1)} €, ${pp(
        data.income2,
      )} € und ${pp(data.income3)} € gesammelt. Für Material werden ${pp(
        data.cost,
      )} € ausgegeben.`,
      frage: 'Berechnen Sie, wie viel Geld übrig bleibt.',
    }
  }

  if (data.kontext === 'aktion') {
    return {
      text: `Bei einer Aktion werden ${pp(data.income1)} €, ${pp(
        data.income2,
      )} € und ${pp(data.income3)} € eingenommen. Die Ausgaben betragen ${pp(
        data.cost,
      )} €.`,
      frage: 'Berechnen Sie den Gewinn.',
    }
  }

  return {
    text: `In die Kasse kommen ${pp(data.income1)} €, ${pp(
      data.income2,
    )} € und ${pp(data.income3)} €. Danach werden ${pp(data.cost)} € bezahlt.`,
    frage: 'Berechnen Sie, wie viel Geld übrig bleibt.',
  }
}

export const exercise9512: Exercise<DATA> = {
  title: 'Gewinn berechnen',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'kasse',
      'fest',
      'projekt',
      'aktion',
    ])

    const income1 = rng.randomIntBetween(50, 250)
    const income2 = rng.randomIntBetween(40, 200)
    const income3 = rng.randomIntBetween(30, 180)
    const cost = rng.randomIntBetween(20, 200)
    const profit = income1 + income2 + income3 - cost

    return { kontext, income1, income2, income3, cost, profit }
  },

  originalData: {
    kontext: 'fest',
    income1: 127,
    income2: 62,
    income3: 205,
    cost: 85,
    profit: 309,
  },

  constraint({ data }) {
    return data.profit > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.income1}+${data.income2}+${data.income3}-${data.cost}=${data.profit}`}
        />
        <p>
          Das Ergebnis ist <b>{data.profit} €</b>.
        </p>
      </>
    )
  },
}