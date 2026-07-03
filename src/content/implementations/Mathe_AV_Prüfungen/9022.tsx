// exercise9022.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'wald' | 'sport' | 'werkstatt' | 'schulfest'
type ItemKey = 'item1' | 'item2' | 'item3' | 'item4'

interface OrderItem {
  key: ItemKey
  name: string
  amount: number
  price: number
  sum: number
}

interface DATA {
  kontext: Kontext
  itemCount: number

  amount1: number
  price1: number
  amount2: number
  price2: number
  amount3: number
  price3: number
  amount4: number
  price4: number

  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'sport') {
    return {
      intro: 'Für ein Sportfest kaufen Sie noch weiteres Material.',
      orderText: 'Sie entscheiden sich, folgende Sportartikel zu bestellen:',
      items: ['Fußbälle', 'Springseile', 'Basketbälle', 'Trikots'],
    }
  }

  if (data.kontext === 'werkstatt') {
    return {
      intro: 'Für den Werkraum kaufen Sie noch weiteres Material.',
      orderText: 'Sie entscheiden sich, folgende Werkzeuge zu bestellen:',
      items: ['Hammer', 'Schraubendreher', 'Zangen', 'Schutzbrillen'],
    }
  }

  if (data.kontext === 'schulfest') {
    return {
      intro: 'Für ein Schulfest kaufen Sie noch weiteres Material.',
      orderText: 'Sie entscheiden sich, folgende Artikel zu bestellen:',
      items: ['Lichterketten', 'Tischdecken', 'Servietten', 'Kerzen'],
    }
  }

  return {
    intro: 'Zum Arbeiten im Wald kaufen Sie noch weiteres Material.',
    orderText: 'Sie entscheiden sich, folgende Schutzausrüstung zu bestellen:',
    items: [
      'Helme',
      'Paar Arbeitshandschuhe',
      'Arbeitshosen',
      'Paar Arbeitsschuhe',
    ],
  }
}

function getItems(data: DATA): OrderItem[] {
  const context = getContext(data)

  const allItems: OrderItem[] = [
    {
      key: 'item1',
      name: context.items[0],
      amount: data.amount1,
      price: data.price1,
      sum: round2(data.amount1 * data.price1),
    },
    {
      key: 'item2',
      name: context.items[1],
      amount: data.amount2,
      price: data.price2,
      sum: round2(data.amount2 * data.price2),
    },
    {
      key: 'item3',
      name: context.items[2],
      amount: data.amount3,
      price: data.price3,
      sum: round2(data.amount3 * data.price3),
    },
    {
      key: 'item4',
      name: context.items[3],
      amount: data.amount4,
      price: data.price4,
      sum: round2(data.amount4 * data.price4),
    },
  ]

  return allItems.slice(0, data.itemCount)
}

function pricePoolForContext(kontext: Kontext) {
  if (kontext === 'sport') {
    return [
      [19.9, 24.9, 29.9, 34.9],
      [4.95, 6.95, 8.95, 12.95],
      [15.5, 22.5, 25.5, 30.5],
      [89.9, 119.9, 149.9, 179.9],
    ]
  }

  if (kontext === 'werkstatt') {
    return [
      [12.9, 15.9, 18.9, 22.9],
      [9.95, 14.95, 19.95, 24.95],
      [8.9, 12.5, 16.8, 21.9],
      [3.5, 4.95, 6.5, 7.95],
    ]
  }

  if (kontext === 'schulfest') {
    return [
      [9.9, 12.9, 16.9, 19.9],
      [4.5, 5.95, 7.5, 8.95],
      [6.9, 9.9, 12.9, 14.9],
      [79.9, 99.9, 129.9, 149.9],
    ]
  }

  return [
    [29.9, 34.9, 39.9, 44.9],
    [14.95, 19.95, 24.95],
    [69.8, 82.8, 89.9],
    [79.97, 91.97, 99.95],
  ]
}

export const exercise9022: Exercise<DATA> = {
  title: 'Teil 2: Gesamtpreis',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'wald',
      'sport',
      'werkstatt',
      'schulfest',
    ])

    const itemCount = rng.randomItemFromArray([2, 3, 4])
    const prices = pricePoolForContext(kontext)

    const amount1 = rng.randomIntBetween(2, 8)
    const amount2 = rng.randomIntBetween(2, 10)
    const amount3 = rng.randomIntBetween(2, 8)
    const amount4 = rng.randomIntBetween(1, 5)

    const price1 = rng.randomItemFromArray(prices[0])
    const price2 = rng.randomItemFromArray(prices[1])
    const price3 = rng.randomItemFromArray(prices[2])
    const price4 = rng.randomItemFromArray(prices[3])

    const sums = [
      amount1 * price1,
      amount2 * price2,
      amount3 * price3,
      amount4 * price4,
    ]

    const total = round2(sums.slice(0, itemCount).reduce((a, b) => a + b, 0))

    return {
      kontext,
      itemCount,
      amount1,
      price1,
      amount2,
      price2,
      amount3,
      price3,
      amount4,
      price4,
      total,
    }
  },

  originalData: {
    kontext: 'wald',
    itemCount: 4,
    amount1: 3,
    price1: 39.9,
    amount2: 5,
    price2: 19.95,
    amount3: 4,
    price3: 82.8,
    amount4: 2,
    price4: 91.97,
    total: 734.93,
  },

  constraint({ data }) {
    return data.total > 0 && data.itemCount >= 2 && data.itemCount <= 4
  },

  task({ data }) {
    const context = getContext(data)
    const items = getItems(data)

    return (
      <>
        <p>{context.intro}</p>
        <p>{context.orderText}</p>
        <p>
          {items.map(item => (
            <span key={item.key}>
              {item.amount} {item.name} zu je {pp(item.price)} €
              <br />
            </span>
          ))}
        </p>
        <p>Berechnen Sie den Gesamtpreis für Ihre Bestellung.</p>
      </>
    )
  },

  solution({ data }) {
    const items = getItems(data)

    const term = items
      .map(item => `${item.amount}\\cdot ${pp(item.price)}`)
      .join('+')

    const firstLine = items.map(item => `${pp(item.sum)}`).join('+')

    return (
      <>
        <p>Berechnen Sie zuerst die Einzelpreise und addieren Sie diese.</p>

        <InlineMath math={`${term}=${firstLine}=${pp(data.total)}`} />
        <br />

        <p>
          Der Gesamtpreis beträgt <b>{pp(data.total)} €</b>.
        </p>
      </>
    )
  },
}
