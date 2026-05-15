// exercise9016.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  n1: number
  p1: number
  n2: number
  p2: number
  n3: number
  p3: number
  pfand: number
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9016: Exercise<DATA> = {
  title: 'Teil 2: Getränke mit Pfand',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const n1 = rng.randomIntBetween(8, 20)
    const n2 = rng.randomIntBetween(3, 10)
    const n3 = rng.randomIntBetween(2, 8)
    const p1 = rng.randomItemFromArray([3.8, 4.2, 4.5, 5.2])
    const p2 = rng.randomItemFromArray([8.5, 9.8, 10.2, 11.4])
    const p3 = rng.randomItemFromArray([7.8, 8.9, 10.2, 12.5])
    const pfand = rng.randomItemFromArray([2.4, 3, 3.6, 4])
    const total = round2(
      n1 * (p1 + pfand) + n2 * (p2 + pfand) + n3 * (p3 + pfand),
    )
    return { n1, p1, n2, p2, n3, p3, pfand, total }
  },

  originalData: {
    n1: 15,
    p1: 4.2,
    n2: 5,
    p2: 9.8,
    n3: 4,
    p3: 10.2,
    pfand: 3.6,
    total: 210.2,
  },

  constraint({ data }) {
    return data.total > 0
  },

  task({ data }) {
    return (
      <>
        <p>Sie kaufen für einen Ausflug folgende Getränke:</p>
        <p>
          {data.n1} Kisten Mineralwasser zu je {pp(data.p1)} €
          <br />
          {data.n2} Kisten Apfelsaft zu je {pp(data.p2)} €
          <br />
          {data.n3} Kisten Orangensaft zu je {pp(data.p3)} €
          <br />
          Pro Kiste zahlen Sie {pp(data.pfand)} € Pfand.
        </p>
        <p>Berechnen Sie, wie viel Euro Sie mit Pfand bezahlen müssen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.n1}\\cdot(${pp(data.p1)}+${pp(
            data.pfand,
          )})+${data.n2}\\cdot(${pp(data.p2)}+${pp(
            data.pfand,
          )})+${data.n3}\\cdot(${pp(data.p3)}+${pp(data.pfand)})=${pp(
            data.total,
          )}`}
        />
        <p>
          Sie müssen insgesamt <b>{pp(data.total)} €</b> bezahlen.
        </p>
      </>
    )
  },
}
