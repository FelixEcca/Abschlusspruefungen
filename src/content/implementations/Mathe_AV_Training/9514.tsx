// exercise9514.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'geld' | 'laenge' | 'gewicht' | 'preis'
type Rundungsstelle =
  | 'tausender'
  | 'hunderter'
  | 'zehner'
  | 'einer'
  | 'zehntel'
  | 'hundertstel'
  | 'tausendstel'

interface DATA {
  kontext: Kontext
  raw: number
  rounded: number
  rundungsstelle: Rundungsstelle
}

function getRundungsInfo(rundungsstelle: Rundungsstelle) {
  if (rundungsstelle === 'tausender') {
    return { frage: 'Runden Sie auf Tausender.', step: 1000 }
  }
  if (rundungsstelle === 'hunderter') {
    return { frage: 'Runden Sie auf Hunderter.', step: 100 }
  }
  if (rundungsstelle === 'zehner') {
    return { frage: 'Runden Sie auf Zehner.', step: 10 }
  }
  if (rundungsstelle === 'einer') {
    return { frage: 'Runden Sie auf Einer.', step: 1 }
  }
  if (rundungsstelle === 'zehntel') {
    return { frage: 'Runden Sie auf Zehntel.', step: 0.1 }
  }
  if (rundungsstelle === 'hundertstel') {
    return { frage: 'Runden Sie auf Hundertstel.', step: 0.01 }
  }
  return { frage: 'Runden Sie auf Tausendstel.', step: 0.001 }
}

function roundToStep(value: number, step: number) {
  const rounded = Math.round(value / step) * step
  return Number(rounded.toFixed(3))
}

function getContext(data: DATA) {
  const { frage } = getRundungsInfo(data.rundungsstelle)

  if (data.kontext === 'laenge') {
    return {
      text: `Eine Länge beträgt ${pp(data.raw)} m.`,
      frage,
      unit: 'm',
    }
  }

  if (data.kontext === 'gewicht') {
    return {
      text: `Ein Gewicht beträgt ${pp(data.raw)} kg.`,
      frage,
      unit: 'kg',
    }
  }

  if (data.kontext === 'preis') {
    return {
      text: `Ein Preis beträgt ${pp(data.raw)} €.`,
      frage,
      unit: '€',
    }
  }

  return {
    text: `Ein Geldbetrag beträgt ${pp(data.raw)} €.`,
    frage,
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

    const rundungsstelle: Rundungsstelle = rng.randomItemFromArray([
      'tausender',
      'hunderter',
      'zehner',
      'einer',
      'zehntel',
      'hundertstel',
      'tausendstel',
    ])

    const { step } = getRundungsInfo(rundungsstelle)
    const raw =
      step >= 1
        ? rng.randomIntBetween(1000, 99999)
        : rng.randomIntBetween(10000, 99999) / 10000 +
          rng.randomItemFromArray([0, 1, 2, 3, 4, 5])
    const rounded = roundToStep(raw, step)

    return { kontext, raw, rounded, rundungsstelle }
  },

  originalData: {
    kontext: 'geld',
    raw: 12.345,
    rounded: 12.35,
    rundungsstelle: 'hundertstel',
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
