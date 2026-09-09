import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'baseValue'

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

const kind: Kind = 'baseValue'

function makeData(rng: any): DATA {
  const result = rng.randomItemFromArray([80, 100, 120, 160, 200, 240])
  const b = rng.randomItemFromArray([10, 20, 25, 40, 50, 75])
  return {
    kind,
    a: round2((result * b) / 100),
    b,
    c: 0,
    d: 0,
    result,
    result2: 0,
    label: pick(rng, [
      'ursprünglichen Preis',
      'gesamten Betrag',
      'vollen Warenwert',
      'Grundpreis',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      {' '}
      <b>{pp(data.a)} €</b> sind <b>{data.b} %</b> vom gesuchten Wert (
      {data.label}). Berechne den gesuchten Wert.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`G=${pp(data.a)}:${data.b}\\cdot100=${pp(data.result)}\\,€`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9626: Exercise<DATA> = {
  title: 'Ursprünglichen Preis berechnen',
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
