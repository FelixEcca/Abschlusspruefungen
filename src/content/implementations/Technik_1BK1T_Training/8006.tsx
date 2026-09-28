import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { SimpleLineChart, ValueTable, unit } from './motion-helpers'

interface DATA {
  tableA: number
  times: number[]
  chartA: number
  chartV0: number
  chartTMax: number
  chartXStep: number
  chartYStep: number
}

export const exercise8006: Exercise<DATA> = {
  title: 'Beschleunigung aus Tabelle und v-t-Diagramm bestimmen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 14,
  generator(rng) {
    const tableA = rng.randomItemFromArray([0.5, 1, 1.5, 2, 2.5, 3])
    const tableStep = rng.randomItemFromArray([2, 3, 4])
    const chart = rng.randomItemFromArray([
      { chartA: 0.5, chartXStep: 2, chartYStep: 1 },
      { chartA: 1, chartXStep: 2, chartYStep: 2 },
      { chartA: 1.5, chartXStep: 2, chartYStep: 3 },
      { chartA: 2, chartXStep: 2, chartYStep: 4 },
      { chartA: 2, chartXStep: 3, chartYStep: 6 },
      { chartA: 3, chartXStep: 2, chartYStep: 6 },
    ])
    return {
      tableA,
      times: [0, tableStep, 2 * tableStep, 3 * tableStep],
      ...chart,
      chartV0: rng.randomItemFromArray([0, chart.chartYStep]),
      chartTMax: chart.chartXStep * 4,
    }
  },
  originalData: {
    tableA: 2,
    times: [0, 3, 6, 9],
    chartA: 1.5,
    chartV0: 3,
    chartTMax: 8,
    chartXStep: 2,
    chartYStep: 3,
  },
  intro() {
    return null
  },
  tasks: [
    {
      points: 6,
      duration: 7,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Bestimme die Beschleunigung aus der Tabelle. Die Bewegung beginnt aus der Ruhe.</p>
            <ValueTable headers={['t in s', 'v in m/s']} rows={data.times.map(t => [pp(t), pp(data.tableA * t)])} />
          </>
        )
      },
      solution({ data }) {
        const t = data.times[3]
        const v = data.tableA * t
        return (
          <>
            <p>Bei Start aus der Ruhe gilt <InlineMath math={`a=\\frac{v}{t}`} />.</p>
            <p><InlineMath math={`a=\\frac{${pp(v)}\\,${unit('m/s')}}{${pp(t)}\\,${unit('s')}}=${pp(data.tableA)}\\,${unit('m/s^2')}`} /></p>
          </>
        )
      },
    },
    {
      points: 6,
      duration: 7,
      intro() {
        return null
      },
      task({ data }) {
        const chartV1 = data.chartV0 + data.chartA * data.chartTMax
        return (
          <>
            <p>Bestimme die Beschleunigung der zweiten Bewegung aus dem v-t-Diagramm.</p>
            <SimpleLineChart
              points={[{ x: 0, y: data.chartV0 }, { x: data.chartTMax, y: chartV1 }]}
              xLabel="t"
              yLabel="v"
              xUnit="s"
              yUnit="m/s"
              xMax={data.chartTMax}
              yMax={chartV1 + data.chartYStep}
              xStep={data.chartXStep}
              yStep={data.chartYStep}
            />
          </>
        )
      },
      solution({ data }) {
        const chartV1 = data.chartV0 + data.chartA * data.chartTMax
        return (
          <>
            <p>Wir verwenden die beiden markierten Gitterpunkte:</p>
            <p>
              <InlineMath math={`a=\\frac{\\Delta v}{\\Delta t}=\\frac{${pp(chartV1)}\\,${unit('m/s')}-${pp(data.chartV0)}\\,${unit('m/s')}}{${pp(data.chartTMax)}\\,${unit('s')}-0\\,${unit('s')}}=${pp(data.chartA)}\\,${unit('m/s^2')}`} />
            </p>
          </>
        )
      },
    },
  ],
}
