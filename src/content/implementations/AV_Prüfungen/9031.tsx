// exercise9031.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext = 'lohn' | 'eintritt' | 'kopien' | 'material' | 'miete'

interface DATA {
  kontext: Kontext
  menge1: number
  preis1: number
  menge2: number
  preisProEinheit: number
  result: number
}

function getContext(data: DATA) {
  if (data.kontext === 'eintritt') {
    return {
      text1: `Für ${data.menge1} Eintrittskarten bezahlen Sie ${pp(
        data.preis1,
      )} €.`,
      frage: `Berechnen Sie, wie viel ${data.menge2} Eintrittskarten kosten würden.`,
      einheit: 'Karten',
      resultText: `${data.menge2} Eintrittskarten kosten`,
    }
  }

  if (data.kontext === 'kopien') {
    return {
      text1: `Für ${data.menge1} Kopien bezahlen Sie ${pp(data.preis1)} €.`,
      frage: `Berechnen Sie, wie viel ${data.menge2} Kopien kosten würden.`,
      einheit: 'Kopien',
      resultText: `${data.menge2} Kopien kosten`,
    }
  }

  if (data.kontext === 'material') {
    return {
      text1: `Für ${data.menge1} Pakete Material bezahlen Sie ${pp(
        data.preis1,
      )} €.`,
      frage: `Berechnen Sie, wie viel ${data.menge2} Pakete Material kosten würden.`,
      einheit: 'Pakete',
      resultText: `${data.menge2} Pakete kosten`,
    }
  }

  if (data.kontext === 'miete') {
    return {
      text1: `Für ${data.menge1} Tage Miete bezahlen Sie ${pp(data.preis1)} €.`,
      frage: `Berechnen Sie, wie viel ${data.menge2} Tage Miete kosten würden.`,
      einheit: 'Tage',
      resultText: `${data.menge2} Tage Miete kosten`,
    }
  }

  return {
    text1: `Für ${data.menge1} Arbeitsstunden bekommen Sie ${pp(
      data.preis1,
    )} €.`,
    frage: `Berechnen Sie, wie viel Sie für ${data.menge2} Arbeitsstunden bekommen würden.`,
    einheit: 'Stunden',
    resultText: `Für ${data.menge2} Arbeitsstunden erhalten Sie`,
  }
}

export const exercise9031: Exercise<DATA> = {
  title: 'Teil 1: Dreisatz',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'lohn',
      'eintritt',
      'kopien',
      'material',
      'miete',
    ])

    const preisProEinheit = rng.randomItemFromArray([
      0.1, 0.2, 0.5, 2, 3, 5, 8, 12, 15, 20,
    ])

    const menge1 = rng.randomItemFromArray([10, 20, 30, 40, 50])
    let menge2 = rng.randomItemFromArray([15, 25, 45, 50, 60, 70])

    while (menge2 === menge1) {
      menge2 = rng.randomItemFromArray([15, 25, 45, 50, 60, 70])
    }

    const preis1 = menge1 * preisProEinheit
    const result = menge2 * preisProEinheit

    return { kontext, menge1, preis1, menge2, preisProEinheit, result }
  },

  originalData: {
    kontext: 'lohn',
    menge1: 40,
    preis1: 480,
    menge2: 60,
    preisProEinheit: 12,
    result: 720,
  },

  constraint({ data }) {
    return data.menge1 > 0 && data.menge2 > 0 && data.result > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text1}</p>
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

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {data.menge1}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.preis1)} €
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.preisProEinheit)} €
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.menge2}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result)} €
          </text>

          <text x="24" y="72" fontSize="14">
            : {data.menge1}
          </text>
          <text x="22" y="123" fontSize="14">
            · {data.menge2}
          </text>

          <text x="286" y="72" fontSize="14">
            : {data.menge1}
          </text>
          <text x="284" y="123" fontSize="14">
            · {data.menge2}
          </text>
        </svg>

        <p>
          {context.resultText} <b>{pp(data.result)} €</b>.
        </p>

        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
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
