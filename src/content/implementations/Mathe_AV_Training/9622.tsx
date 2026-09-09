import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'inverseRule'

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

const kind: Kind = 'inverseRule'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([3, 4, 5, 6])
  const b = rng.randomItemFromArray([6, 8, 10, 12])
  const c = rng.randomItemFromArray([2, 3, 4, 5, 8])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2((a * b) / c),
    result2: a * b,
    label: pick(rng, [
      'einen Lagerraum aufzuräumen',
      'Plakate zu sortieren',
      'Bauteile zu zählen',
      'einen Raum vorzubereiten',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      {' '}
      <b>{data.a}</b> Personen brauchen, um {data.label}, <b>{data.b}</b>{' '}
      Stunden. Wie lange brauchen <b>{data.c}</b> Personen bei gleicher
      Arbeitsleistung?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}\\cdot${data.b}=${pp(data.result2)}`} />
      <br />
      <InlineMath math={`${pp(data.result2)}:${data.c}=${pp(data.result)}`} />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9622: Exercise<DATA> = {
  title: 'Arbeitszeit umgekehrt proportional',
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
