// exercise9501.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'tickets' | 'kuchen' | 'getraenke' | 'hefte'

interface DATA {
  kontext: Kontext
  count: number
  price: number
  total: number
}

function getContext(data: DATA) {
  if (data.kontext === 'kuchen') {
    return {
      text: `Es werden ${data.count} Kuchenstücke verkauft. Ein Stück kostet ${pp(
        data.price,
      )} €.`,
      frage: 'Berechnen Sie die Einnahmen.',
      item: 'Kuchenstücke',
    }
  }

  if (data.kontext === 'getraenke') {
    return {
      text: `Es werden ${data.count} Getränke verkauft. Ein Getränk kostet ${pp(
        data.price,
      )} €.`,
      frage: 'Berechnen Sie die Einnahmen.',
      item: 'Getränke',
    }
  }

  if (data.kontext === 'hefte') {
    return {
      text: `Es werden ${data.count} Hefte gekauft. Ein Heft kostet ${pp(
        data.price,
      )} €.`,
      frage: 'Berechnen Sie den Gesamtpreis.',
      item: 'Hefte',
    }
  }

  return {
    text: `Es werden ${data.count} Eintrittskarten verkauft. Eine Karte kostet ${pp(
      data.price,
    )} €.`,
    frage: 'Berechnen Sie die Einnahmen.',
    item: 'Eintrittskarten',
  }
}

export const exercise9501: Exercise<DATA> = {
  title: 'Stückzahl mal Preis',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'tickets',
      'kuchen',
      'getraenke',
      'hefte',
    ])
    const count = rng.randomIntBetween(6, 80)
    const price = rng.randomItemFromArray([0.5, 1, 1.5, 2, 2.5, 3, 4])
    const total = count * price

    return { kontext, count, price, total }
  },

  originalData: {
    kontext: 'kuchen',
    count: 24,
    price: 1.5,
    total: 36,
  },

  constraint({ data }) {
    return data.total > 0
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
    return (
      <>
        <InlineMath
          math={`${data.count}\\cdot ${pp(data.price)}=${pp(data.total)}`}
        />
        <p>
          Das Ergebnis ist <b>{pp(data.total)} €</b>.
        </p>
      </>
    )
  },
}