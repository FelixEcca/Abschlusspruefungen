import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'directRule'

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

const kind: Kind = 'directRule'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([3, 4, 5, 6])
  const b = rng.randomItemFromArray([18, 24, 30, 36, 42])
  const c = rng.randomItemFromArray([7, 8, 9, 10, 12])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2((b / a) * c),
    result2: round2(b / a),
    label: pick(rng, ['Schrauben', 'Dübel', 'Unterlegscheiben', 'Nägel']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Für <b>{data.a}</b> gleiche Teile braucht man <b>{data.b}</b> {data.label}
      . Wie viele {data.label} braucht man für <b>{data.c}</b> Teile?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.b}:${data.a}=${pp(data.result2)}`} />
      <br />
      <InlineMath
        math={`${pp(data.result2)}\\cdot${data.c}=${pp(data.result)}`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9621: Exercise<DATA> = {
  title: 'Material proportional berechnen',
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
    return <p>{taskFor(data)}</p>
  },
  solution({ data }) {
    return <>{solutionFor(data)}</>
  },
}
