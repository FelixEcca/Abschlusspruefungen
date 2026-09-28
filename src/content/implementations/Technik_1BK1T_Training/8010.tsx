import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { SimpleLineChart, round2, unit } from './motion-helpers'

interface DATA {
  v0: number
  v1: number
  t: number
  xStep: number
  yStep: number
}

export const exercise8010: Exercise<DATA> = {
  title: 'Strecke als Fläche im v-t-Diagramm bestimmen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray([
      { v0: 0, v1: 8, t: 8, xStep: 2, yStep: 2 },
      { v0: 2, v1: 10, t: 8, xStep: 2, yStep: 2 },
      { v0: 4, v1: 12, t: 8, xStep: 2, yStep: 2 },
      { v0: 3, v1: 15, t: 8, xStep: 2, yStep: 3 },
      { v0: 5, v1: 15, t: 10, xStep: 2, yStep: 5 },
      { v0: 6, v1: 18, t: 12, xStep: 3, yStep: 3 },
      { v0: 8, v1: 16, t: 8, xStep: 2, yStep: 4 },
    ])
  },
  originalData: { v0: 2, v1: 10, t: 8, xStep: 2, yStep: 2 },
  task({ data }) {
    return (
      <>
        <p>Bestimme die zurückgelegte Strecke als Fläche unter dem v-t-Diagramm.</p>
        <SimpleLineChart
          points={[{ x: 0, y: data.v0 }, { x: data.t, y: data.v1 }]}
          xLabel="t"
          yLabel="v"
          xUnit="s"
          yUnit="m/s"
          xMax={data.t}
          yMax={Math.max(data.v0, data.v1) + data.yStep}
          xStep={data.xStep}
          yStep={data.yStep}
          showArea
        />
      </>
    )
  },
  solution({ data }) {
    const s = round2(((data.v0 + data.v1) / 2) * data.t)
    return (
      <p>
        Die Fläche ist ein Trapez:{' '}
        <InlineMath math={`s=\\frac{v_0+v_1}{2}\\cdot t=\\frac{${pp(data.v0)}\\,${unit('m/s')}+${pp(data.v1)}\\,${unit('m/s')}}{2}\\cdot ${pp(data.t)}\\,${unit('s')}=${pp(s)}\\,${unit('m')}`} />.
      </p>
    )
  },
}
