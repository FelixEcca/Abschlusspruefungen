import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'percentRate'

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

const kind: Kind = 'percentRate'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([80, 100, 120, 160, 200])
  const b = rng.randomItemFromArray([10, 20, 25, 40, 50, 75])
  return {
    kind,
    a,
    b: round2((a * b) / 100),
    c: b,
    d: 0,
    result: b,
    result2: 0,
    label: pick(rng, [
      'zugestimmt',
      'teilgenommen',
      'bestanden',
      'sich angemeldet',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Von <b>{data.a}</b> Personen haben <b>{data.b}</b> {data.label}. Wie viel
      Prozent sind das?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`p=\\frac{${pp(data.b)}}{${pp(data.a)}}\\cdot100\\,\\%=${pp(data.result)}\\,\\%`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9625: Exercise<DATA> = {
  title: 'Prozentsatz aus Anteil',
  source: 'Prozentrechnung',
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
