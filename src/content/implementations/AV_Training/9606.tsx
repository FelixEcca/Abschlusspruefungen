// exercise9606.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kontext = 'temperaturen' | 'punkte' | 'besucher' | 'umsatz'

interface DATA {
  kontext: Kontext
  a: number
  b: number
  difference: number
  bigger: 'a' | 'b'
}

function getContext(data: DATA) {
  if (data.kontext === 'punkte') {
    return {
      text: `Klasse A erreicht ${data.a} Punkte. Klasse B erreicht ${data.b} Punkte.`,
      unit: 'Punkte',
      itemA: 'Klasse A',
      itemB: 'Klasse B',
    }
  }

  if (data.kontext === 'besucher') {
    return {
      text: `Am Montag kamen ${data.a} Besucher. Am Dienstag kamen ${data.b} Besucher.`,
      unit: 'Besucher',
      itemA: 'Montag',
      itemB: 'Dienstag',
    }
  }

  if (data.kontext === 'umsatz') {
    return {
      text: `Stand A nimmt ${data.a} € ein. Stand B nimmt ${data.b} € ein.`,
      unit: '€',
      itemA: 'Stand A',
      itemB: 'Stand B',
    }
  }

  return {
    text: `Ort A hat ${data.a} °C. Ort B hat ${data.b} °C.`,
    unit: '°C',
    itemA: 'Ort A',
    itemB: 'Ort B',
  }
}

export const exercise9606: Exercise<DATA> = {
  title: 'Daten vergleichen',
  source: 'Diagramme und Daten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'temperaturen',
      'punkte',
      'besucher',
      'umsatz',
    ])

    let a = rng.randomIntBetween(10, 120)
    let b = rng.randomIntBetween(10, 120)
    while (a === b) b = rng.randomIntBetween(10, 120)

    if (kontext === 'temperaturen') {
      a = rng.randomIntBetween(-10, 30)
      b = rng.randomIntBetween(-10, 30)
      while (a === b) b = rng.randomIntBetween(-10, 30)
    }

    const difference = Math.abs(a - b)
    const bigger = a > b ? 'a' : 'b'

    return { kontext, a, b, difference, bigger }
  },

  originalData: {
    kontext: 'besucher',
    a: 85,
    b: 112,
    difference: 27,
    bigger: 'b',
  },

  constraint({ data }) {
    return data.a !== data.b
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text}</p>
        <p>Vergleichen Sie die Werte.</p>
        <p>Welcher Wert ist größer? Wie groß ist der Unterschied?</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>
          Größer ist:{' '}
          <b>{data.bigger === 'a' ? context.itemA : context.itemB}</b>.
        </p>
        <p>Der Unterschied wird durch Subtraktion berechnet.</p>
        <InlineMath
          math={`${Math.max(data.a, data.b)}-${Math.min(data.a, data.b)}=${
            data.difference
          }`}
        />
        <p>
          Der Unterschied beträgt <b>{data.difference} {context.unit}</b>.
        </p>
      </>
    )
  },
}