import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  length: number
  height: number
  paintLiter: number
  area: number
  literPerM2: number
}

export const exercise9074: Exercise<DATA> = {
  title: 'Teil 2: Farbverbrauch',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const length = rng.randomItemFromArray([12.5, 15, 18.75, 20])
    const height = rng.randomItemFromArray([2.8, 3, 3.2])
    const paintLiter = rng.randomItemFromArray([6, 9, 12])
    const area = length * height
    const literPerM2 = paintLiter / area
    return { length, height, paintLiter, area, literPerM2 }
  },

  originalData: {
    length: 18.75,
    height: 3.2,
    paintLiter: 9,
    area: 60,
    literPerM2: 0.15,
  },

  constraint({ data }) {
    return data.area > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie haben eine Wand mit einer Länge von {pp(data.length)} m und einer
          Höhe von {pp(data.height)} m gestrichen. Dabei haben Sie{' '}
          {pp(data.paintLiter)} Liter Farbe verbraucht.
        </p>
        <p>Berechnen Sie, wie viel Farbe Sie pro m² verbraucht haben.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`${pp(data.length)}\\cdot ${pp(data.height)}=${pp(data.area)}\\,m^2`} />
        <br />
        <InlineMath math={`${pp(data.paintLiter)}:${pp(data.area)}=${pp(data.literPerM2)}\\,l/m^2`} />
      </>
    )
  },
}
