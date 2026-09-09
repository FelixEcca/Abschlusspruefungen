import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { pick } from './_avTrainingShared'

type Kind = 'examNumberMix'

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

const kind: Kind = 'examNumberMix'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([36, 48, 60, 72])
  const b = rng.randomItemFromArray([4, 6, 8])
  const c = rng.randomItemFromArray([12, 18, 24])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a / b + c,
    result2: (a / b + c) * 2,
    label: pick(rng, [
      'Punkte',
      'Materialteile',
      'Arbeitsminuten',
      'Gutscheine',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Es gibt <b>{data.a}</b> {data.label}. Teile sie zuerst in <b>{data.b}</b>{' '}
      gleich große Gruppen, addiere anschließend <b>{data.c}</b> dazu und
      verdopple das Ergebnis.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}:${data.b}+${data.c}=${pp(data.result)}`} />
      <br />
      <InlineMath math={`${pp(data.result)}\\cdot2=${pp(data.result2)}`} />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9665: Exercise<DATA> = {
  title: 'Rechenmix in zwei Schritten',
  source: 'Prüfungsvorbereitung',
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
