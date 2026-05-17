// exercise9510.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'bestellung' | 'sport' | 'werkstatt' | 'schulfest'

interface DATA {
  kontext: Kontext
  itemCount: number
  a1: number
  p1: number
  a2: number
  p2: number
  a3: number
  p3: number
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'sport') {
    return {
      intro: 'Für den Sportunterricht werden Sachen bestellt.',
      items: ['Bälle', 'Springseile', 'Hütchen'],
    }
  }

  if (data.kontext === 'werkstatt') {
    return {
      intro: 'Für den Werkraum werden Sachen bestellt.',
      items: ['Hammer', 'Zangen', 'Schutzbrillen'],
    }
  }

  if (data.kontext === 'schulfest') {
    return {
      intro: 'Für das Schulfest werden Sachen bestellt.',
      items: ['Tischdecken', 'Lichterketten', 'Servierplatten'],
    }
  }

  return {
    intro: 'Es werden mehrere Artikel bestellt.',
    items: ['Hefte', 'Ordner', 'Stifte-Sets'],
  }
}

export const exercise9510: Exercise<DATA> = {
  title: 'Gesamtpreis berechnen',
  source: 'Rechnen und Terme',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'bestellung',
      'sport',
      'werkstatt',
      'schulfest',
    ])

    const itemCount = rng.randomItemFromArray([2, 3])
    const a1 = rng.randomIntBetween(2, 12)
    const a2 = rng.randomIntBetween(2, 12)
    const a3 = rng.randomIntBetween(2, 12)

    const p1 = rng.randomItemFromArray([2.5, 4.95, 8.9, 12.5, 19.9])
    const p2 = rng.randomItemFromArray([3.5, 5.95, 9.9, 14.95, 24.9])
    const p3 = rng.randomItemFromArray([1.5, 6.9, 10.5, 16.9, 29.9])

    const total = round2(a1 * p1 + a2 * p2 + (itemCount === 3 ? a3 * p3 : 0))

    return { kontext, itemCount, a1, p1, a2, p2, a3, p3, total }
  },

  originalData: {
    kontext: 'bestellung',
    itemCount: 3,
    a1: 4,
    p1: 2.5,
    a2: 3,
    p2: 5.95,
    a3: 2,
    p3: 10.5,
    total: 48.85,
  },

  constraint({ data }) {
    return data.total > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.intro}</p>
        <p>
          {data.a1} {context.items[0]} zu je {pp(data.p1)} €
          <br />
          {data.a2} {context.items[1]} zu je {pp(data.p2)} €
          <br />
          {data.itemCount === 3 && (
            <>
              {data.a3} {context.items[2]} zu je {pp(data.p3)} €
            </>
          )}
        </p>
        <p>Berechnen Sie den Gesamtpreis.</p>
      </>
    )
  },

  solution({ data }) {
    const term =
      data.itemCount === 3
        ? `${data.a1}\\cdot ${pp(data.p1)}+${data.a2}\\cdot ${pp(
            data.p2,
          )}+${data.a3}\\cdot ${pp(data.p3)}`
        : `${data.a1}\\cdot ${pp(data.p1)}+${data.a2}\\cdot ${pp(data.p2)}`

    return (
      <>
        <InlineMath math={`${term}=${pp(data.total)}`} />
        <p>
          Der Gesamtpreis beträgt <b>{pp(data.total)} €</b>.
        </p>
      </>
    )
  },
}