import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'mean'

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
  unit: string
}

const kind: Kind = 'mean'

interface Context {
  label: string
  unit: string
  values: number[]
}

function makeData(rng: any): DATA {
  const context = pick<Context>(rng, [
    {
      label: 'Punkte in vier Tests',
      unit: 'Punkte',
      values: [
        rng.randomItemFromArray([8, 10, 12, 14]),
        rng.randomItemFromArray([9, 11, 13, 15]),
        rng.randomItemFromArray([10, 12, 14, 16]),
        rng.randomItemFromArray([11, 13, 15, 17]),
      ],
    },
    {
      label: 'Wartezeiten an drei Tagen',
      unit: 'min',
      values: [
        rng.randomItemFromArray([6, 8, 10, 12]),
        rng.randomItemFromArray([9, 11, 13, 15]),
        rng.randomItemFromArray([12, 14, 16, 18]),
      ],
    },
    {
      label: 'Temperaturen am Nachmittag',
      unit: '°C',
      values: [
        rng.randomItemFromArray([16, 18, 20, 22]),
        rng.randomItemFromArray([17, 19, 21, 23]),
        rng.randomItemFromArray([18, 20, 22, 24]),
        rng.randomItemFromArray([19, 21, 23, 25]),
      ],
    },
    {
      label: 'verkaufte Brötchen in vier Pausen',
      unit: 'Stück',
      values: [
        rng.randomItemFromArray([18, 20, 22, 24]),
        rng.randomItemFromArray([21, 23, 25, 27]),
        rng.randomItemFromArray([24, 26, 28, 30]),
        rng.randomItemFromArray([27, 29, 31, 33]),
      ],
    },
    {
      label: 'gefahrene Strecken an drei Tagen',
      unit: 'km',
      values: [
        rng.randomItemFromArray([12, 15, 18, 20]),
        rng.randomItemFromArray([16, 19, 22, 25]),
        rng.randomItemFromArray([20, 23, 26, 30]),
      ],
    },
    {
      label: 'Arbeitszeiten in vier Schichten',
      unit: 'h',
      values: [
        rng.randomItemFromArray([4, 5, 6]),
        rng.randomItemFromArray([5, 6, 7]),
        rng.randomItemFromArray([6, 7, 8]),
        rng.randomItemFromArray([4, 6, 8]),
      ],
    },
  ])
  const [a, b, c, d = 0] = context.values
  const sum = context.values.reduce((total, value) => total + value, 0)
  return {
    kind,
    a,
    b,
    c,
    d,
    result: round2(sum / context.values.length),
    result2: context.values.length,
    label: context.label,
    unit: context.unit,
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9628: Exercise<DATA> = {
  title: 'Durchschnitt im Alltag',
  source: 'Diagramme und Daten',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return makeData(rng)
  },
  originalData,
  constraint({ data }) {
    return data.kind === kind && Number.isFinite(data.result)
  },
  task({ data }) {
    const values = [data.a, data.b, data.c, data.d].filter(value => value > 0)

    return (
      <p>
        Die {data.label} sind:{' '}
        <b>{values.map(value => `${pp(value)} ${data.unit}`).join(', ')}</b>.
        Berechne den Mittelwert.
      </p>
    )
  },
  solution({ data }) {
    const values = [data.a, data.b, data.c, data.d].filter(value => value > 0)
    const sum = values.reduce((total, value) => total + value, 0)

    return (
      <>
        <InlineMath
          math={`${values.map(value => pp(value)).join('+')}=${pp(sum)}`}
        />
        <br />
        <InlineMath
          math={`\\bar x=\\frac{${pp(sum)}}{${data.result2}}=${pp(data.result)}\\,\\text{${data.unit}}`}
        />
      </>
    )
  },
}
