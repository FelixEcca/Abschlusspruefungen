import { Exercise } from '@/data/types'
import { timeText } from './_avTrainingShared'

type Kind = 'timePlan'

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
}

const kind: Kind = 'timePlan'

function makeData(rng: any): DATA {
  const start = rng.randomItemFromArray([
    7 * 60 + 45,
    8 * 60 + 10,
    9 * 60 + 20,
    13 * 60 + 35,
  ])
  const duration = rng.randomItemFromArray([35, 45, 50, 75, 90, 110])
  return {
    kind,
    a: start,
    b: duration,
    c: 0,
    d: 0,
    result: start + duration,
    result2: 0,
    label: 'Termin',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein Termin beginnt um <b>{timeText(data.a)}</b> und dauert{' '}
      <b>{data.b} Minuten</b>. Wann endet der Termin?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      Ende:{' '}
      <b>
        {timeText(data.a)} + {data.b} Minuten = {timeText(data.result)}
      </b>
      .
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9610: Exercise<DATA> = {
  title: 'Endzeiten berechnen',
  source: 'Einheiten',
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
    return <p>{taskFor(data)}</p>
  },
  solution({ data }) {
    return <>{solutionFor(data)}</>
  },
}
