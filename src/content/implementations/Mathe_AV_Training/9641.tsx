import { Exercise } from '@/data/types'
import { pick, clock } from './_avTrainingShared'

type Kind = 'timeOverMidnight'

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

const kind: Kind = 'timeOverMidnight'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([
    22 * 60 + 15,
    22 * 60 + 40,
    23 * 60 + 10,
    23 * 60 + 35,
  ])
  const b = rng.randomItemFromArray([55, 80, 95, 120])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: a + b,
    result2: 0,
    label: pick(rng, ['Fahrt', 'Spätschicht', 'Filmvorführung', 'Zugfahrt']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Eine {data.label} beginnt um <b>{clock(data.a)}</b> und dauert{' '}
      <b>{data.b} Minuten</b>. Wann endet sie?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      Sie endet um <b>{clock(data.result)}</b>.
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9641: Exercise<DATA> = {
  title: 'Zeit über Mitternacht',
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
