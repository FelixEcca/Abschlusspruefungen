// exercise9600.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'personen' | 'geld' | 'punkte' | 'gewicht'

interface DATA {
  kontext: Kontext
  total: number
  percent: number
  onePercent: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'geld') {
    return {
      text: `In der Kasse sind ${pp(data.total)} €. Davon sollen ${pp(
        data.percent,
      )} % verwendet werden.`,
      question: 'Berechnen Sie den Betrag.',
      unit: '€',
    }
  }

  if (data.kontext === 'punkte') {
    return {
      text: `In einem Test gibt es ${pp(data.total)} Punkte. ${pp(
        data.percent,
      )} % der Punkte wurden erreicht.`,
      question: 'Berechnen Sie die erreichten Punkte.',
      unit: 'Punkte',
    }
  }

  if (data.kontext === 'gewicht') {
    return {
      text: `Eine Mischung wiegt ${pp(data.total)} kg. ${pp(
        data.percent,
      )} % davon sind Wasser.`,
      question: 'Berechnen Sie die Wassermenge.',
      unit: 'kg',
    }
  }

  return {
    text: `Es wurden ${pp(data.total)} Personen befragt. ${pp(
      data.percent,
    )} % davon haben zugestimmt.`,
    question: 'Berechnen Sie, wie viele Personen zugestimmt haben.',
    unit: 'Personen',
  }
}

export const exercise9600: Exercise<DATA> = {
  title: 'Prozentwert mit Dreisatz',
  source: 'Prozentrechnung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'personen',
      'geld',
      'punkte',
      'gewicht',
    ])

    const total = rng.randomItemFromArray([40, 50, 60, 80, 100, 120, 150, 200])
    const percent = rng.randomItemFromArray([5, 10, 20, 25, 40, 50, 75])
    const onePercent = total / 100
    const result = round2(onePercent * percent)

    return { kontext, total, percent, onePercent, result }
  },

  originalData: {
    kontext: 'personen',
    total: 80,
    percent: 25,
    onePercent: 0.8,
    result: 20,
  },

  constraint({ data }) {
    return data.result > 0
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
          100 % entsprechen {pp(data.total)} {context.unit}.
        </p>
        <p>
          1 % entspricht {pp(data.total)} : 100 = {pp(data.onePercent)}{' '}
          {context.unit}.
        </p>
        <p>
          {pp(data.percent)} % entsprechen {pp(data.onePercent)} ·{' '}
          {pp(data.percent)} = {pp(data.result)} {context.unit}.
        </p>
        <p>
          Ergebnis: <b>{pp(data.result)} {context.unit}</b>
        </p>
      </>
    )
  },
}