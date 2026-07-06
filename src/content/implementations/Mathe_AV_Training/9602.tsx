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
    const onePercent = data.part / data.percent

    return (
      <>
        <p>Berechne mit dem Dreisatz:</p>
        <svg viewBox="0 0 328 185">
          <image
            href="/content/Mathe_AV/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            {context.unit}
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {pp(data.percent)}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.part)} {context.unit}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(onePercent)} {context.unit}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.total)} {context.unit}
          </text>

          <text x="24" y="72" fontSize="14">
            : {pp(data.percent)}
          </text>
          <text x="22" y="123" fontSize="14">
            · 100
          </text>

          <text x="286" y="72" fontSize="14">
            : {pp(data.percent)}
          </text>
          <text x="284" y="123" fontSize="14">
            · 100
          </text>
        </svg>
        <p>
          Ergebnis:{' '}
          <b>
            {pp(data.total)} {context.unit}
          </b>
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/-I-h_ewk7G8"
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
