// exercise9513.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kontext = 'tische' | 'autos' | 'pakete' | 'gruppen'

interface DATA {
  kontext: Kontext
  total: number
  per: number
  needed: number
}

function getContext(data: DATA) {
  if (data.kontext === 'autos') {
    return {
      text: `${data.total} Personen fahren mit Autos. In jedes Auto passen ${data.per} Personen.`,
      frage: 'Berechnen Sie, wie viele Autos gebraucht werden.',
      item: 'Autos',
    }
  }

  if (data.kontext === 'pakete') {
    return {
      text: `${data.total} Hefte werden in Pakete gepackt. In jedes Paket passen ${data.per} Hefte.`,
      frage: 'Berechnen Sie, wie viele Pakete gebraucht werden.',
      item: 'Pakete',
    }
  }

  if (data.kontext === 'gruppen') {
    return {
      text: `${data.total} Personen werden in Gruppen eingeteilt. In jede Gruppe kommen höchstens ${data.per} Personen.`,
      frage: 'Berechnen Sie, wie viele Gruppen gebraucht werden.',
      item: 'Gruppen',
    }
  }

  return {
    text: `${data.total} Personen sollen an Tischen sitzen. An jeden Tisch passen ${data.per} Personen.`,
    frage: 'Berechnen Sie, wie viele Tische gebraucht werden.',
    item: 'Tische',
  }
}

export const exercise9513: Exercise<DATA> = {
  title: 'Anzahl aufrunden',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'tische',
      'autos',
      'pakete',
      'gruppen',
    ])

    const per = rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
    const total = rng.randomIntBetween(20, 160)
    const needed = Math.ceil(total / per)

    return { kontext, total, per, needed }
  },

  originalData: {
    kontext: 'tische',
    total: 50,
    per: 8,
    needed: 7,
  },

  constraint({ data }) {
    return data.total % data.per !== 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)
    const quotient = data.total / data.per

    return (
      <>
        <InlineMath math={`${data.total}:${data.per}=${quotient}`} />
        <p>Das Ergebnis muss aufgerundet werden.</p>
        <p>
          Man braucht <b>{data.needed}</b> {context.item}.
        </p>
      </>
    )
  },
}