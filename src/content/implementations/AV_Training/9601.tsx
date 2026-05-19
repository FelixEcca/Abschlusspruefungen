// exercise9601.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'personen' | 'punkte' | 'geld' | 'waren'

interface DATA {
  kontext: Kontext
  total: number
  part: number
  percent: number
}

function getContext(data: DATA) {
  if (data.kontext === 'punkte') {
    return {
      text: `In einem Test gibt es ${data.total} Punkte. Es wurden ${data.part} Punkte erreicht.`,
      question: 'Berechnen Sie, wie viel Prozent erreicht wurden.',
      unit: 'Punkte',
    }
  }

  if (data.kontext === 'geld') {
    return {
      text: `Insgesamt wurden ${pp(data.total)} € gesammelt. Davon wurden ${pp(
        data.part,
      )} € ausgegeben.`,
      question: 'Berechnen Sie, wie viel Prozent ausgegeben wurden.',
      unit: '€',
    }
  }

  if (data.kontext === 'waren') {
    return {
      text: `Insgesamt gibt es ${data.total} Waren. Davon sind ${data.part} verkauft.`,
      question: 'Berechnen Sie, wie viel Prozent verkauft wurden.',
      unit: 'Waren',
    }
  }

  return {
    text: `Es wurden ${data.total} Personen befragt. ${data.part} Personen haben zugestimmt.`,
    question: 'Berechnen Sie, wie viel Prozent zugestimmt haben.',
    unit: 'Personen',
  }
}

export const exercise9601: Exercise<DATA> = {
  title: 'Prozentsatz mit Dreisatz',
  source: 'Prozentrechnung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'personen',
      'punkte',
      'geld',
      'waren',
    ])

    const total = rng.randomItemFromArray([40, 50, 60, 80, 100, 120, 200])
    const percent = rng.randomItemFromArray([5, 10, 20, 25, 40, 50, 75])
    const part = (total * percent) / 100

    return { kontext, total, part, percent }
  },

  originalData: {
    kontext: 'personen',
    total: 80,
    part: 20,
    percent: 25,
  },

  constraint({ data }) {
    return data.part > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text}</p>
        <p>{context.question}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>Berechne mit dem Dreisatz:</p>
        <p>
          {pp(data.total)} {context.unit} entsprechen 100 %.
        </p>
        <p>
          1 {context.unit} entspricht 100 % : {pp(data.total)}.
        </p>
        <p>
          {pp(data.part)} {context.unit} entsprechen:
        </p>
        <InlineMath
          math={`${pp(data.part)}\\cdot \\frac{100}{${pp(
            data.total,
          )}}=${pp(data.percent)}\\%`}
        />
        <p>
          Ergebnis: <b>{pp(data.percent)} %</b>
        </p>
      </>
    )
  },
}