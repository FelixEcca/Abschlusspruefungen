import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'barCompare'

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

const kind: Kind = 'barCompare'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([12, 15, 18, 22])
  const b = rng.randomItemFromArray([20, 24, 28, 30])
  const c = rng.randomItemFromArray([8, 10, 14, 16])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: b - c,
    result2: a + b + c,
    label: pick(rng, [
      'Besucherzahlen',
      'Verkaufszahlen',
      'Punktzahlen',
      'Anmeldungen',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      In einem Säulendiagramm zu {data.label} stehen die Werte <b>{data.a}</b>,{' '}
      <b>{data.b}</b> und <b>{data.c}</b>. Berechne den Unterschied zwischen
      größtem und kleinstem Wert sowie die Summe.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.b}-${data.c}=${data.result}`} />
      <br />
      <InlineMath math={`${data.a}+${data.b}+${data.c}=${data.result2}`} />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9657: Exercise<DATA> = {
  title: 'Säulenwerte vergleichen',
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
    return <p>{taskFor(data)}</p>
  },
  solution({ data }) {
    return <>{solutionFor(data)}</>
  },
}
