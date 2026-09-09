import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'monthlyInterest'

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

const kind: Kind = 'monthlyInterest'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([600, 900, 1200, 1500, 2000])
  const b = rng.randomItemFromArray([2, 3, 4, 5, 6])
  const c = rng.randomItemFromArray([3, 4, 6, 9])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2((a * b * c) / 1200),
    result2: 0,
    label: pick(rng, ['Sparguthaben', 'Konto', 'Festgeld', 'Kreditbetrag']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein {data.label} von <b>{pp(data.a)} €</b> wird mit <b>{data.b} %</b> pro
      Jahr verzinst. Berechne die Zinsen für <b>{data.c}</b> Monate.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`Z=\\frac{${pp(data.a)}\\cdot${data.b}\\cdot${data.c}}{100\\cdot12}=${pp(data.result)}\\,€`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9627: Exercise<DATA> = {
  title: 'Zinsen für einige Monate',
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
