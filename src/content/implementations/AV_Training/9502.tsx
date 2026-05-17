// exercise9502.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kontext = 'tische' | 'gruppen' | 'pakete' | 'autos'

interface DATA {
  kontext: Kontext
  total: number
  perGroup: number
  groups: number
}

function getContext(data: DATA) {
  if (data.kontext === 'gruppen') {
    return {
      text: `${data.total} Personen werden in Gruppen eingeteilt. In jede Gruppe kommen ${data.perGroup} Personen.`,
      frage: 'Berechnen Sie, wie viele Gruppen entstehen.',
      result: 'Gruppen',
    }
  }

  if (data.kontext === 'pakete') {
    return {
      text: `${data.total} Hefte werden in Pakete gepackt. In jedes Paket kommen ${data.perGroup} Hefte.`,
      frage: 'Berechnen Sie, wie viele Pakete entstehen.',
      result: 'Pakete',
    }
  }

  if (data.kontext === 'autos') {
    return {
      text: `${data.total} Personen fahren mit Autos. In jedes Auto passen ${data.perGroup} Personen.`,
      frage: 'Berechnen Sie, wie viele Autos gebraucht werden.',
      result: 'Autos',
    }
  }

  return {
    text: `${data.total} Personen sollen an Tischen sitzen. An jeden Tisch passen ${data.perGroup} Personen.`,
    frage: 'Berechnen Sie, wie viele Tische gebraucht werden.',
    result: 'Tische',
  }
}

export const exercise9502: Exercise<DATA> = {
  title: 'Aufteilen',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'tische',
      'gruppen',
      'pakete',
      'autos',
    ])
    const perGroup = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])
    const groups = rng.randomIntBetween(3, 20)
    const total = perGroup * groups

    return { kontext, total, perGroup, groups }
  },

  originalData: {
    kontext: 'tische',
    total: 48,
    perGroup: 8,
    groups: 6,
  },

  constraint({ data }) {
    return data.total % data.perGroup === 0
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

    return (
      <>
        <InlineMath math={`${data.total}:${data.perGroup}=${data.groups}`} />
        <p>
          Es sind <b>{data.groups}</b> {context.result}.
        </p>
      </>
    )
  },
}