// exercise9002.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'service' | 'helfer' | 'bus' | 'material'

interface DATA {
  kontext: Kontext
  anzahl1: number
  kosten1: number
  anzahl2: number
  kostenProEinheit: number
  kosten2: number
}

function getContext(data: DATA) {
  if (data.kontext === 'service') {
    return {
      text1: `Für den Service werden ${data.anzahl1} Personen gebucht.`,
      text2: `Diese kosten insgesamt ${pp(data.kosten1)} €.`,
      frage: `Berechnen Sie, wie viel ${data.anzahl2} Personen kosten würden.`,
      einheit: 'Personen',
    }
  }

  if (data.kontext === 'helfer') {
    return {
      text1: `Für eine Veranstaltung werden ${data.anzahl1} Helfer bezahlt.`,
      text2: `Diese kosten insgesamt ${pp(data.kosten1)} €.`,
      frage: `Berechnen Sie, wie viel ${data.anzahl2} Helfer kosten würden.`,
      einheit: 'Helfer',
    }
  }

  if (data.kontext === 'bus') {
    return {
      text1: `Für einen Ausflug werden ${data.anzahl1} Kleinbusse gemietet.`,
      text2: `Diese kosten insgesamt ${pp(data.kosten1)} €.`,
      frage: `Berechnen Sie, wie viel ${data.anzahl2} Kleinbusse kosten würden.`,
      einheit: 'Kleinbusse',
    }
  }

  return {
    text1: `Für ein Projekt werden ${data.anzahl1} Pakete bestellt.`,
    text2: `Diese kosten insgesamt ${pp(data.kosten1)} €.`,
    frage: `Berechnen Sie, wie viel ${data.anzahl2} Pakete kosten würden.`,
    einheit: 'Pakete',
  }
}

export const exercise9002: Exercise<DATA> = {
  title: 'Teil 1: Kosten hochrechnen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'service',
      'helfer',
      'bus',
      'material',
    ])

    const anzahl1 = rng.randomIntBetween(3, 8)
    let anzahl2 = rng.randomIntBetween(4, 12)
    while (anzahl2 === anzahl1) anzahl2 = rng.randomIntBetween(4, 12)

    const kostenProEinheit = rng.randomItemFromArray([18, 21, 24, 27, 30, 36, 42, 48, 54, 63])
    const kosten1 = anzahl1 * kostenProEinheit
    const kosten2 = anzahl2 * kostenProEinheit

    return { kontext, anzahl1, kosten1, anzahl2, kostenProEinheit, kosten2 }
  },

  originalData: {
    kontext: 'service',
    anzahl1: 4,
    kosten1: 252,
    anzahl2: 5,
    kostenProEinheit: 63,
    kosten2: 315,
  },

  constraint({ data }) {
    return (
      data.anzahl1 > 0 &&
      data.anzahl2 > 0 &&
      data.kosten1 > 0 &&
      data.kosten2 === data.kostenProEinheit * data.anzahl2
    )
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text1}</p>
        <p>{context.text2}</p>
        <p>{context.frage}</p>
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
            {context.einheit}
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            €
          </text>
          {/* obere Zeile */}
          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {data.anzahl1} 
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.kosten1)} €
          </text>

          {/* mittlere Zeile */}
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.kostenProEinheit)} €
          </text>

          {/* untere Zeile */}
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.anzahl2}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.kosten2)} €
          </text>

          {/* Rechenpfeile links */}
          <text x="24" y="72" fontSize="14">
            : {data.anzahl1}
          </text>
          <text x="22" y="123" fontSize="14">
            · {data.anzahl2}
          </text>

          {/* Rechenpfeile rechts */}
          <text x="286" y="72" fontSize="14">
            : {data.anzahl1}
          </text>
          <text x="284" y="123" fontSize="14">
            · {data.anzahl2}
          </text>
        </svg>

        <p>
          {data.anzahl2} {context.einheit} kosten <b>{pp(data.kosten2)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Dreisatz:</p>
        <div className="my-4">
        <iframe
          width="100%"
          height="220"
          src="https://www.youtube.com/embed/IXCWLXdv6YQ"
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