// exercise9511.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'getraenke' | 'flaschen' | 'kisten' | 'dosen'

interface DATA {
  kontext: Kontext
  count: number
  price: number
  extra: number
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'flaschen') {
    return {
      text: `Sie kaufen ${data.count} Flaschen. Eine Flasche kostet ${pp(
        data.price,
      )} €. Pro Flasche kommen ${pp(data.extra)} € Pfand dazu.`,
      item: 'Flaschen',
      extraName: 'Pfand',
    }
  }

  if (data.kontext === 'kisten') {
    return {
      text: `Sie kaufen ${data.count} Kisten. Eine Kiste kostet ${pp(
        data.price,
      )} €. Pro Kiste kommen ${pp(data.extra)} € Pfand dazu.`,
      item: 'Kisten',
      extraName: 'Pfand',
    }
  }

  if (data.kontext === 'dosen') {
    return {
      text: `Sie kaufen ${data.count} Dosen. Eine Dose kostet ${pp(
        data.price,
      )} €. Pro Dose kommen ${pp(data.extra)} € Pfand dazu.`,
      item: 'Dosen',
      extraName: 'Pfand',
    }
  }

  return {
    text: `Sie kaufen ${data.count} Getränke. Ein Getränk kostet ${pp(
      data.price,
    )} €. Pro Getränk kommen ${pp(data.extra)} € Pfand dazu.`,
    item: 'Getränke',
    extraName: 'Pfand',
  }
}

export const exercise9511: Exercise<DATA> = {
  title: 'Preis mit Pfand',
  source: 'Rechnen und Terme',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'getraenke',
      'flaschen',
      'kisten',
      'dosen',
    ])

    const count = rng.randomIntBetween(4, 30)
    const price = rng.randomItemFromArray([0.8, 1.2, 1.5, 2, 3.5, 4.2])
    const extra = rng.randomItemFromArray([0.25, 0.5, 1.5, 3])
    const total = round2(count * (price + extra))

    return { kontext, count, price, extra, total }
  },

  originalData: {
    kontext: 'kisten',
    count: 5,
    price: 9.8,
    extra: 3.6,
    total: 67,
  },

  constraint({ data }) {
    return data.total > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text}</p>
        <p>Berechnen Sie den Gesamtpreis.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Preis und Pfand werden zusammengezählt. Danach wird mal gerechnet.</p>
        <InlineMath
          math={`${data.count}\\cdot (${pp(data.price)}+${pp(
            data.extra,
          )})=${pp(data.total)}`}
        />
        <p>
          Der Gesamtpreis beträgt <b>{pp(data.total)} €</b>.
        </p>
      </>
    )
  },
}