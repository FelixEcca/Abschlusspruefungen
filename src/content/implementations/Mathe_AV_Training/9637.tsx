import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'estimateProduct'

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

const kind: Kind = 'estimateProduct'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([28, 39, 51, 62, 74])
  const b = rng.randomItemFromArray([7, 8, 9, 12])
  const rounded = Math.round(a / 10) * 10
  return {
    kind,
    a,
    b,
    c: rounded,
    d: 0,
    result: rounded * b,
    result2: a * b,
    label: pick(rng, ['Bauteile', 'Hefte', 'Werkzeugteile', 'Eintrittskarten']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Schätze zuerst: <b>{data.a}</b> {data.label} kosten jeweils{' '}
      <b>{data.b} €</b>. Runde die Anzahl auf Zehner und berechne den
      Überschlag.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}\\approx${data.c}`} />
      <br />
      <InlineMath math={`${data.c}\\cdot${data.b}=${data.result}\\,€`} />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9637: Exercise<DATA> = {
  title: 'Überschlag mit Preisen',
  source: 'Grundlagen',
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
