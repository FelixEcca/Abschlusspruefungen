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

        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
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
            100
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.total)} {context.unit}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.onePercent)} {context.unit}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.percent)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result)} {context.unit}
          </text>

          <text x="24" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.percent)}
          </text>

          <text x="286" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.percent)}
          </text>
        </svg>

        <p>
          Ergebnis:{' '}
          <b>
            {pp(data.result)} {context.unit}
          </b>
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/w4c6fNktgx0"
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
