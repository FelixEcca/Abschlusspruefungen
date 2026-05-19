// exercise9602.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'personen' | 'preis' | 'punkte' | 'gewicht'

interface DATA {
  kontext: Kontext
  percent: number
  part: number
  total: number
}

function getContext(data: DATA) {
  if (data.kontext === 'preis') {
    return {
      text: `${pp(data.percent)} % eines Preises sind ${pp(data.part)} €.`,
      question: 'Berechnen Sie den ursprünglichen Preis.',
      unit: '€',
    }
  }

  if (data.kontext === 'punkte') {
    return {
      text: `${pp(data.percent)} % der Punkte sind ${pp(data.part)} Punkte.`,
      question: 'Berechnen Sie die gesamte Punktzahl.',
      unit: 'Punkte',
    }
  }

  if (data.kontext === 'gewicht') {
    return {
      text: `${pp(data.percent)} % einer Menge sind ${pp(data.part)} kg.`,
      question: 'Berechnen Sie die gesamte Menge.',
      unit: 'kg',
    }
  }

  return {
    text: `${pp(data.percent)} % der Personen sind ${pp(data.part)} Personen.`,
    question: 'Berechnen Sie die Gesamtzahl der Personen.',
    unit: 'Personen',
  }
}

export const exercise9602: Exercise<DATA> = {
  title: 'Grundwert berechnen',
  source: 'Prozentrechnung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'personen',
      'preis',
      'punkte',
      'gewicht',
    ])

    const total = rng.randomItemFromArray([40, 50, 60, 80, 100, 120, 150, 200])
    const percent = rng.randomItemFromArray([5, 10, 20, 25, 40, 50, 75])
    const part = (total * percent) / 100

    return { kontext, percent, part, total }
  },

  originalData: {
    kontext: 'personen',
    percent: 25,
    part: 20,
    total: 80,
  },

  constraint({ data }) {
    return data.part > 0 && data.total > 0
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
        <p>Berechne den Grundwert.</p>
        <p>Zuerst wird berechnet, wie viel 1 % ist.</p>
        <InlineMath
          math={`${pp(data.part)}:${pp(data.percent)}=${pp(
            data.part / data.percent,
          )}`}
        />
        <p>Dann wird mal 100 gerechnet.</p>
        <InlineMath
          math={`${pp(data.part / data.percent)}\\cdot 100=${pp(
            data.total,
          )}\\,\\text{${context.unit}}`}
        />
        <p>
          Ergebnis: <b>{pp(data.total)} {context.unit}</b>
        </p>
      </>
    )
  },
}