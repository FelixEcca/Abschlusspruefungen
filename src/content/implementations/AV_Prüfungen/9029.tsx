// exercise9029.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'popcorn' | 'pizza' | 'saft' | 'snacks'

interface DATA {
  kontext: Kontext
  count: number
  total: number
  unitPrice: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'pizza') {
    return `Sie kaufen ${data.count} Pizzen für insgesamt ${pp(data.total)} €.`
  }

  if (data.kontext === 'saft') {
    return `Sie kaufen ${data.count} Flaschen Saft für insgesamt ${pp(data.total)} €.`
  }

  if (data.kontext === 'snacks') {
    return `Sie kaufen ${data.count} Packungen Snacks für insgesamt ${pp(
      data.total,
    )} €.`
  }

  return `Sie kaufen ${data.count} Packungen Popcorn für insgesamt ${pp(
    data.total,
  )} €.`
}

export const exercise9029: Exercise<DATA> = {
  title: 'Teil 1: Einzelpreis berechnen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'popcorn',
      'pizza',
      'saft',
      'snacks',
    ])

    const count = rng.randomItemFromArray([8, 9, 11, 12, 15])
    const unitPrice = rng.randomItemFromArray([1.5, 2.5, 3.5, 4.5, 5.5])
    const total = round2(count * unitPrice)

    return { kontext, count, total, unitPrice }
  },

  originalData: {
    kontext: 'popcorn',
    count: 8,
    total: 12,
    unitPrice: 1.5,
  },

  constraint({ data }) {
    return data.count > 0 && data.total > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data)}</p>
        <p>Berechnen Sie, wie viel eine Packung kostet.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Der Gesamtpreis wird durch die Anzahl geteilt:</p>
        <InlineMath
          math={`${pp(data.total)}:${data.count}=${pp(data.unitPrice)}\\,€`}
        />
        <p>
          Eine Packung kostet <b>{pp(data.unitPrice)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/2A-9_-GCXrA"
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
