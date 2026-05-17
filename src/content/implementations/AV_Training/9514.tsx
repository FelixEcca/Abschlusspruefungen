// exercise9514.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'geld' | 'laenge' | 'gewicht' | 'preis'

interface DATA {
  kontext: Kontext
  raw: number
  rounded: number
}

function getContext(data: DATA) {
  if (data.kontext === 'laenge') {
    return {
      text: `Eine Länge beträgt ${pp(data.raw)} m.`,
      frage: 'Runden Sie auf zwei Nachkommastellen.',
      unit: 'm',
    }
  }

  if (data.kontext === 'gewicht') {
    return {
      text: `Ein Gewicht beträgt ${pp(data.raw)} kg.`,
      frage: 'Runden Sie auf zwei Nachkommastellen.',
      unit: 'kg',
    }
  }

  if (data.kontext === 'preis') {
    return {
      text: `Ein Preis beträgt ${pp(data.raw)} €.`,
      frage: 'Runden Sie auf zwei Nachkommastellen.',
      unit: '€',
    }
  }

  return {
    text: `Ein Geldbetrag beträgt ${pp(data.raw)} €.`,
    frage: 'Runden Sie auf zwei Nachkommastellen.',
    unit: '€',
  }
}

export const exercise9514: Exercise<DATA> = {
  title: 'Runden',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'geld',
      'laenge',
      'gewicht',
      'preis',
    ])

    const raw =
      rng.randomIntBetween(1000, 9999) / 1000 +
      rng.randomItemFromArray([0, 1, 2, 3, 4, 5])

    const rounded = Math.round(raw * 100) / 100

    return { kontext, raw, rounded }
  },

  originalData: {
    kontext: 'geld',
    raw: 12.345,
    rounded: 12.35,
  },

  constraint({ data }) {
    return data.raw !== data.rounded
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
    const context = getContext(data)

    return (
      <>
        <InlineMath
          math={`${pp(data.raw)}\\approx ${pp(data.rounded)}\\,\\mathrm{${
            context.unit === '€' ? '' : context.unit
          }}`}
        />
        {context.unit === '€' && (
          <p>
            Ergebnis: <b>{pp(data.rounded)} €</b>
          </p>
        )}
        {context.unit !== '€' && (
          <p>
            Ergebnis: <b>{pp(data.rounded)} {context.unit}</b>
          </p>
        )}
      </>
    )
  },
}