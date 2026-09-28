import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { SimpleLineChart, ValueTable, round2, unit } from './motion-helpers'

interface DATA {
  tableV: number
  tableX0: number
  times: number[]
  chartV: number
  chartX0: number
  chartXStep: number
  chartYStep: number
  chartTMax: number
}

export const exercise8000: Exercise<DATA> = {
  title: 'Geschwindigkeit aus Tabelle und x-t-Diagramm bestimmen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 14,
  generator(rng) {
    const tableV = rng.randomItemFromArray([1.5, 2, 2.5, 3, 4, 5, 6])
    const tableX0 = rng.randomItemFromArray([0, 2, 5, 10])
    const tableStep = rng.randomItemFromArray([2, 3, 4, 5])
    const chart = rng.randomItemFromArray([
      { chartV: 1, chartXStep: 2, chartYStep: 2 },
      { chartV: 1.5, chartXStep: 2, chartYStep: 3 },
      { chartV: 2, chartXStep: 2, chartYStep: 4 },
      { chartV: 2, chartXStep: 3, chartYStep: 6 },
      { chartV: 2.5, chartXStep: 2, chartYStep: 5 },
      { chartV: 3, chartXStep: 2, chartYStep: 6 },
      { chartV: 4, chartXStep: 2, chartYStep: 8 },
    ])
    const chartX0 = rng.randomItemFromArray([0, chart.chartYStep])
    const chartTMax = chart.chartXStep * rng.randomItemFromArray([4, 5])
    return {
      tableV,
      tableX0,
      times: [0, tableStep, 2 * tableStep, 3 * tableStep],
      ...chart,
      chartX0,
      chartTMax,
    }
  },
  originalData: {
    tableV: 3,
    tableX0: 5,
    times: [0, 4, 8, 12],
    chartV: 2,
    chartX0: 4,
    chartXStep: 2,
    chartYStep: 4,
    chartTMax: 10,
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
            <p>Bestimme die Geschwindigkeit der gleichförmigen Bewegung aus der Tabelle.</p>
            <ValueTable
              headers={['t in s', 'x in m']}
              rows={data.times.map(t => [pp(t), pp(round2(data.tableX0 + data.tableV * t))])}
            />
          </>
        )
      },
      solution({ data }) {
        const t1 = data.times[1]
        const t2 = data.times[3]
        const x1 = round2(data.tableX0 + data.tableV * t1)
        const x2 = round2(data.tableX0 + data.tableV * t2)
        return (
          <>
            <p>Bei einer gleichförmigen Bewegung ist die Geschwindigkeit konstant.</p>
            <p>
              <InlineMath
                math={`v=\\frac{\\Delta x}{\\Delta t}=\\frac{${pp(x2)}\\,${unit('m')}-${pp(x1)}\\,${unit('m')}}{${pp(t2)}\\,${unit('s')}-${pp(t1)}\\,${unit('s')}}=${pp(data.tableV)}\\,\\frac{${unit('m')}}{${unit('s')}}`}
              />
            </p>
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
        const chartYMax = data.chartX0 + data.chartV * data.chartTMax
        return (
          <>
            <p>Bestimme die Geschwindigkeit der zweiten Bewegung aus dem x-t-Diagramm.</p>
            <SimpleLineChart
              points={[
                { x: 0, y: data.chartX0 },
                { x: data.chartTMax, y: chartYMax },
              ]}
              xLabel="t"
              yLabel="x"
              xUnit="s"
              yUnit="m"
              xMax={data.chartTMax}
              yMax={chartYMax}
              xStep={data.chartXStep}
              yStep={data.chartYStep}
            />
          </>
        )
      },
      solution({ data }) {
        const chartX2 = round2(data.chartX0 + data.chartV * data.chartTMax)
        return (
          <>
            <p>Wir wählen die beiden markierten Gitterpunkte am Anfang und Ende der Geraden.</p>
            <p>
              <InlineMath
                math={`v=\\frac{\\Delta x}{\\Delta t}=\\frac{${pp(chartX2)}\\,${unit('m')}-${pp(data.chartX0)}\\,${unit('m')}}{${pp(data.chartTMax)}\\,${unit('s')}-0\\,${unit('s')}}=${pp(data.chartV)}\\,\\frac{${unit('m')}}{${unit('s')}}`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
