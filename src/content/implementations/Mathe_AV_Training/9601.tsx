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
    const oneUnitPercent = 100 / data.total

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
            {context.unit}
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            %
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {pp(data.total)}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            100 %
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(oneUnitPercent)} %
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.part)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.percent)} %
          </text>

          <text x="24" y="72" fontSize="14">
            : {pp(data.total)}
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.part)}
          </text>

          <text x="286" y="72" fontSize="14">
            : {pp(data.total)}
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.part)}
          </text>
        </svg>
        <p>
          Ergebnis: <b>{pp(data.percent)} %</b>
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/xooEyNT3OQc"
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
