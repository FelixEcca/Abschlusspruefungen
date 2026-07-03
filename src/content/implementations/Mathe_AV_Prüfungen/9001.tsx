import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'kuchen' | 'getraenke' | 'waffeln' | 'tickets'

interface DATA {
  kontext: Kontext
  anzahl: number
  preis: number
  einnahmen: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'kuchen') {
    return {
      satz1: (
        <>
          Sie verkaufen Kuchen. Insgesamt wurden {data.anzahl} Stück Kuchen zu je{' '}
          {pp(data.preis)} € verkauft.
        </>
      ),
      frage: 'Berechnen Sie die gesamten Einnahmen.',
      einheit: 'Kuchenstücke',
    }
  }

  if (data.kontext === 'getraenke') {
    return {
      satz1: (
        <>
          Sie verkaufen Getränke. Insgesamt wurden {data.anzahl} Getränke zu je{' '}
          {pp(data.preis)} € verkauft.
        </>
      ),
      frage: 'Berechnen Sie die gesamten Einnahmen.',
      einheit: 'Getränke',
    }
  }

  if (data.kontext === 'waffeln') {
    return {
      satz1: (
        <>
          Sie verkaufen Waffeln. Insgesamt wurden {data.anzahl} Waffeln zu je{' '}
          {pp(data.preis)} € verkauft.
        </>
      ),
      frage: 'Berechnen Sie die gesamten Einnahmen.',
      einheit: 'Waffeln',
    }
  }

  return {
    satz1: (
      <>
        Sie verkaufen Eintrittskarten. Insgesamt wurden {data.anzahl}{' '}
        Eintrittskarten zu je {pp(data.preis)} € verkauft.
      </>
    ),
    frage: 'Berechnen Sie die gesamten Einnahmen.',
    einheit: 'Eintrittskarten',
  }
}

export const exercise9001: Exercise<DATA> = {
  title: 'Teil 1: Einnahmen berechnen',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'kuchen',
      'getraenke',
      'waffeln',
      'tickets',
    ])

    const anzahl = rng.randomIntBetween(40, 180)
    const preis = rng.randomItemFromArray([0.5, 1.5, 2, 2.5, 3])
    const einnahmen = round2(anzahl * preis)

    return { kontext, anzahl, preis, einnahmen }
  },

  originalData: {
    kontext: 'kuchen',
    anzahl: 127,
    preis: 1.5,
    einnahmen: 190.5,
  },

  constraint({ data }) {
    return data.anzahl > 0 && data.preis > 0 && data.einnahmen > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.satz1}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>Die Anzahl wird mit dem Preis pro Stück multipliziert.</p>
        <InlineMath
          math={`${pp(data.anzahl)}\\cdot ${pp(data.preis)}\\,€=${pp(
            data.einnahmen,
          )}\\,€`}
        />
        <p>
          Die gesamten Einnahmen betragen <b>{pp(data.einnahmen)} €</b>.
        </p>
        
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Multiplizieren mit Kommazahlen:</p>
         <div className="my-4">
        <iframe
          width="100%"
          height="220"
          src="https://www.youtube.com/embed/3rjD1HkbZKg"
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