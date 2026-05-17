// exercise9515.tsx
import { Exercise } from '@/data/types'
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

  if (data.kontext === 'material') {
    return {
      text1: `Für ein Projekt werden ${data.anzahl1} Pakete bestellt.`,
      text2: `Diese kosten insgesamt ${pp(data.kosten1)} €.`,
      frage: `Berechnen Sie, wie viel ${data.anzahl2} Pakete kosten würden.`,
      einheit: 'Pakete',
    }
  }

  return {
    text1: `Für den Service werden ${data.anzahl1} Personen gebucht.`,
    text2: `Diese kosten insgesamt ${pp(data.kosten1)} €.`,
    frage: `Berechnen Sie, wie viel ${data.anzahl2} Personen kosten würden.`,
    einheit: 'Personen',
  }
}

export const exercise9515: Exercise<DATA> = {
  title: 'Dreisatz',
  source: 'Dreisatz und Anteile',
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

    const kostenProEinheit = rng.randomItemFromArray([
      18, 21, 24, 27, 30, 36, 42, 48, 54, 63,
    ])
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
        <p>
          {data.anzahl1} {context.einheit} kosten {pp(data.kosten1)} €.
        </p>
        <p>
          1 {context.einheit} kostet {pp(data.kosten1)} € : {data.anzahl1} ={' '}
          {pp(data.kostenProEinheit)} €.
        </p>
        <p>
          {data.anzahl2} {context.einheit} kosten {pp(data.kostenProEinheit)} € ·{' '}
          {data.anzahl2} = {pp(data.kosten2)} €.
        </p>
        <p>
          Ergebnis: <b>{pp(data.kosten2)} €</b>
        </p>
      </>
    )
  },
}