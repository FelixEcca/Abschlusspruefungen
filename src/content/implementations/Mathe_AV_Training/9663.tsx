import { Exercise } from '@/data/types'
import { pick, clock } from './_avTrainingShared'

type Kind = 'examTravel'

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

const kind: Kind = 'examTravel'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([7 * 60 + 20, 8 * 60 + 45, 13 * 60 + 10])
  const b = rng.randomItemFromArray([25, 40, 55])
  const c = rng.randomItemFromArray([15, 20, 30])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a + b + c,
    result2: 0,
    label: pick(rng, ['Gruppe', 'Klasse', 'Sportgruppe', 'Projektgruppe']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Eine {data.label} startet um <b>{clock(data.a)}</b>. Der Fußweg dauert{' '}
      <b>{data.b} Minuten</b>, danach wartet die Gruppe <b>{data.c} Minuten</b>.
      Wann geht es weiter?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      Es geht um <b>{clock(data.result)}</b> weiter.
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9663: Exercise<DATA> = {
  title: 'Zeitplan in Schritten',
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
