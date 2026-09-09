import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { pick } from './_avTrainingShared'

type Kind = 'ratioDistribution'

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

const kind: Kind = 'ratioDistribution'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([1, 2, 3])
  const b = rng.randomItemFromArray([2, 3, 4])
  const c = (a + b) * rng.randomItemFromArray([6, 8, 10])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: (c / (a + b)) * a,
    result2: (c / (a + b)) * b,
    label: pick(rng, [
      'Preisgeld',
      'Klassenkasse',
      'Spendensumme',
      'Materialbudget',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Eine Geldsumme ({data.label}) von <b>{data.c} €</b> wird im Verhältnis{' '}
      <b>
        {data.a}:{data.b}
      </b>{' '}
      aufgeteilt. Berechne beide Beträge.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}+${data.b}=${data.a + data.b}`} />
      <br />
      <InlineMath
        math={`${pp(data.result)}\\,€\\quad \\text{und}\\quad ${pp(data.result2)}\\,€`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9652: Exercise<DATA> = {
  title: 'Geld im Verhältnis aufteilen',
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
