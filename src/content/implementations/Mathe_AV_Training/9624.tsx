import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'increase'

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

const kind: Kind = 'increase'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([50, 80, 100, 120, 200, 250])
  const b = rng.randomItemFromArray([5, 10, 15, 20, 25])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: round2(a * (1 + b / 100)),
    result2: round2((a * b) / 100),
    label: pick(rng, [
      'Mitgliedsbeitrag',
      'Fahrkarte',
      'Materialpreis',
      'Monatskosten',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Der Betrag ({data.label}) beträgt bisher <b>{pp(data.a)} €</b>. Er wird um{' '}
      <b>{data.b} %</b> erhöht. Berechne die Erhöhung und den neuen Betrag.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`Erhöhung=${pp(data.a)}\\cdot\\frac{${data.b}}{100}=${pp(data.result2)}\\,€`}
      />
      <br />
      <InlineMath
        math={`neu=${pp(data.a)}+${pp(data.result2)}=${pp(data.result)}\\,€`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9624: Exercise<DATA> = {
  title: 'Preissteigerung berechnen',
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
