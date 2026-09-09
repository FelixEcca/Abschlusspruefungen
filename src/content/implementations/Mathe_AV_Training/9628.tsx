import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'mean'

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

const kind: Kind = 'mean'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4, 5])
  const b = rng.randomItemFromArray([6, 7, 8, 9])
  const c = rng.randomItemFromArray([10, 11, 12, 13])
  const d = rng.randomItemFromArray([14, 15, 16, 18])
  return {
    kind,
    a,
    b,
    c,
    d,
    result: round2((a + b + c + d) / 4),
    result2: 0,
    label: pick(rng, ['Punkte', 'Wartezeiten', 'Temperaturen', 'Stückzahlen']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Die {data.label} lauten:{' '}
      <b>
        {data.a}, {data.b}, {data.c}, {data.d}
      </b>
      . Berechne den Mittelwert.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`\\bar x=\\frac{${data.a}+${data.b}+${data.c}+${data.d}}{4}=${pp(data.result)}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9628: Exercise<DATA> = {
  title: 'Mittelwert aus vier Werten',
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
