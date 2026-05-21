// exercise9050.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  phone: number
  rateA: number
  rateB: number
  months: number
  totalA: number
  totalB: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9050: Exercise<DATA> = {
  title: 'Teil 2: Angebote vergleichen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const phone = rng.randomItemFromArray([800, 1000, 1200])
    const rateA = rng.randomItemFromArray([59.99, 69.99, 74.99])
    const rateB = rng.randomItemFromArray([12.99, 14.99, 19.99])

    const months = 24

    const totalA = round2(rateA * months)
    const totalB = round2(rateB * months + phone)

    return {
      phone,
      rateA,
      rateB,
      months,
      totalA,
      totalB,
    }
  },

  originalData: {
    phone: 1200,
    rateA: 74.99,
    rateB: 14.99,
    months: 24,
    totalA: 1799.76,
    totalB: 1559.76,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Sie möchten ein Smartphone mit Vertrag kaufen.</p>

        <p>
          Angebot A:
          <br />
          Smartphone und Vertrag kosten zusammen {pp(data.rateA)} € im Monat.
        </p>

        <p>
          Angebot B:
          <br />
          Der Vertrag kostet {pp(data.rateB)} € im Monat und das Smartphone{' '}
          {data.phone} € extra.
        </p>

        <p>Berechnen Sie, welches Angebot günstiger ist.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Angebot A:</p>

        <InlineMath
          math={`${pp(data.rateA)}\\cdot ${data.months}=${pp(data.totalA)}`}
        />

        <p>Angebot B:</p>

        <InlineMath
          math={`${pp(data.rateB)}\\cdot ${data.months}+${data.phone}=${pp(
            data.totalB,
          )}`}
        />

        <p>
          Günstiger ist{' '}
          <b>{data.totalA < data.totalB ? 'Angebot A' : 'Angebot B'}</b>.
        </p>
      </>
    )
  },
}
