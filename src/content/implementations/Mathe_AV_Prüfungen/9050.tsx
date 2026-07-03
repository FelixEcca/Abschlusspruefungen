// exercise9050.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'smartphone' | 'tablet' | 'laptop' | 'konsole'

interface DATA {
  kontext: Kontext
  itemName: string
  contractName: string
  months: number
  rateA: number
  rateB: number
  itemPrice: number
  totalA: number
  totalB: number
  difference: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(kontext: Kontext) {
  if (kontext === 'tablet') {
    return {
      itemName: 'Tablet',
      contractName: 'Datentarif',
    }
  }

  if (kontext === 'laptop') {
    return {
      itemName: 'Laptop',
      contractName: 'Internettarif',
    }
  }

  if (kontext === 'konsole') {
    return {
      itemName: 'Konsole',
      contractName: 'Online-Abo',
    }
  }

  return {
    itemName: 'Smartphone',
    contractName: 'Flatrate',
  }
}

export const exercise9050: Exercise<DATA> = {
  title: 'Teil 2: Angebote vergleichen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'smartphone',
      'tablet',
      'laptop',
      'konsole',
    ])

    const context = getContext(kontext)

    const months = rng.randomItemFromArray([12, 24, 36])
    const rateA = rng.randomItemFromArray([49.99, 59.99, 69.99, 74.99])
    const rateB = rng.randomItemFromArray([9.99, 12.99, 14.99, 19.99])
    const itemPrice = rng.randomItemFromArray([600, 800, 1000, 1200, 1500])

    const totalA = round2(rateA * months)
    const totalB = round2(rateB * months + itemPrice)
    const difference = round2(Math.abs(totalA - totalB))

    return {
      kontext,
      itemName: context.itemName,
      contractName: context.contractName,
      months,
      rateA,
      rateB,
      itemPrice,
      totalA,
      totalB,
      difference,
    }
  },

  originalData: {
    kontext: 'smartphone',
    itemName: 'Smartphone',
    contractName: 'eine Flatrate',
    months: 24,
    rateA: 74.99,
    rateB: 14.99,
    itemPrice: 1200,
    totalA: 1799.76,
    totalB: 1559.76,
    difference: 240,
  },

  constraint({ data }) {
    return data.totalA > 0 && data.totalB > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie möchten zum {data.itemName} auch{' '}
          {data.kontext === 'tablet'
            ? `einen ${data.contractName}`
            : data.kontext === 'laptop'
              ? `einen ${data.contractName}`
              : data.kontext === 'konsole'
                ? `ein ${data.contractName}`
                : `eine ${data.contractName}`}{' '}
          für {data.months === 24 ? '2 Jahre' : `${data.months} Monate`}.
          <br />
          Im Internet finden Sie folgende Angebote:
        </p>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="border-2 border-black p-3 text-center">
            <p>
              <b>Angebot A:</b>
            </p>
            <p>
              {data.itemName} und {data.contractName} kosten zusammen{' '}
              {pp(data.rateA)} € im Monat.
            </p>
          </div>

          <div className="border-2 border-black p-3 text-center">
            <p>
              <b>Angebot B:</b>
            </p>
            <p>
              {data.contractName} alleine kostet {pp(data.rateB)} € im Monat und{' '}
              {data.kontext === 'tablet'
                ? `ein ${data.itemName}`
                : data.kontext === 'laptop'
                  ? `einen ${data.itemName}`
                  : data.kontext === 'konsole'
                    ? `eine ${data.itemName}`
                    : `ein ${data.itemName}`}{' '}
              muss für {pp(data.itemPrice)} € dazu gekauft werden.
            </p>
          </div>
        </div>

        <p>Berechnen Sie, welches Angebot für Sie günstiger ist.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird berechnet, wie viele Monate bezahlt werden müssen.</p>

        <p>
          {data.months === 24
            ? '2 Jahre sind 24 Monate.'
            : `${data.months} Monate werden bezahlt.`}
        </p>

        <p>Angebot A:</p>

        <InlineMath
          math={`${pp(data.rateA)}\\cdot ${data.months}=${pp(data.totalA)}\\,€`}
        />

        <p>Angebot B:</p>

        <InlineMath
          math={`${pp(data.rateB)}\\cdot ${data.months}+${pp(
            data.itemPrice,
          )}=${pp(data.totalB)}\\,€`}
        />

        <p>Vergleich:</p>

        <p>
          <b>{data.totalA < data.totalB ? 'Angebot A' : 'Angebot B'}</b> ist
          günstiger.
        </p>
      </>
    )
  },
}
