// exercise9514.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'geld' | 'laenge' | 'gewicht' | 'preis'

interface DATA {
  kontext: Kontext
  raw: number
  rounded: number
  nachkommastellen: 1 | 2 | 3
}

function getFrageText(nachkommastellen: 1 | 2 | 3) {
  if (nachkommastellen === 1) {
    return 'Runden Sie auf eine Nachkommastelle.'
  }

  if (nachkommastellen === 2) {
    return 'Runden Sie auf zwei Nachkommastellen.'
  }

  return 'Runden Sie auf drei Nachkommastellen.'
}

function getContext(data: DATA) {
  if (data.kontext === 'laenge') {
    return {
      text: `Eine Länge beträgt ${pp(data.raw)} m.`,
      frage: getFrageText(data.nachkommastellen),
      unit: 'm',
    }
  }

  if (data.kontext === 'gewicht') {
    return {
      text: `Ein Gewicht beträgt ${pp(data.raw)} kg.`,
      frage: getFrageText(data.nachkommastellen),
      unit: 'kg',
    }
  }

  if (data.kontext === 'preis') {
    return {
      text: `Ein Preis beträgt ${pp(data.raw)} €.`,
      frage: getFrageText(data.nachkommastellen),
      unit: '€',
    }
  }

  return {
    text: `Ein Geldbetrag beträgt ${pp(data.raw)} €.`,
    frage: getFrageText(data.nachkommastellen),
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

    const nachkommastellen: 1 | 2 | 3 = rng.randomItemFromArray([1, 2, 3])

    const raw =
      rng.randomIntBetween(10000, 99999) / 10000 +
      rng.randomItemFromArray([0, 1, 2, 3, 4, 5])

    const factor = 10 ** nachkommastellen
    const rounded = Math.round(raw * factor) / factor

    return { kontext, raw, rounded, nachkommastellen }
  },

  originalData: {
    kontext: 'geld',
    raw: 12.345,
    rounded: 12.35,
    nachkommastellen: 2,
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
            Ergebnis:{' '}
            <b>
              {pp(data.rounded)} {context.unit}
            </b>
          </p>
        )}
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Runden:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/QTQdAer2YnY"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
