import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'inverseMachines'

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

const kind: Kind = 'inverseMachines'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4])
  const b = rng.randomItemFromArray([6, 8, 12])
  const c = rng.randomItemFromArray([4, 6, 8])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2((a * b) / c),
    result2: a * b,
    label: pick(rng, ['Maschinen', 'Pumpen', 'Drucker', 'Teams']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9651: Exercise<DATA> = {
  title: 'Maschinen und Arbeitszeit',
  source: 'Dreisatz',
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
    return (
      <p>
        {' '}
        <b>{data.a}</b> gleiche {data.label} brauchen <b>{data.b}</b> Stunden.
        Wie lange brauchen <b>{data.c}</b> {data.label}?
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <InlineMath math={`${data.a}\\cdot${data.b}=${data.result2}`} />
        <br />
        <InlineMath
          math={`${data.result2}:${data.c}=${pp(data.result)}\\,\\mathrm h`}
        />
      </>
    )
  },
}
