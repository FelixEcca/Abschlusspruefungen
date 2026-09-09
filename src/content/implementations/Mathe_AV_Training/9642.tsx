import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2 } from './_avTrainingShared'

type Kind = 'mixedLength'

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

const kind: Kind = 'mixedLength'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4, 5])
  const b = rng.randomItemFromArray([35, 60, 75, 90])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: a * 100 + b,
    result2: round2(a + b / 100),
    label: 'Länge',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Wandle{' '}
      <b>
        {data.a} m {data.b} cm
      </b>{' '}
      in Zentimeter und in Meter um.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`${data.a}\\,\\mathrm m=${data.a * 100}\\,\\mathrm{cm}`}
      />
      <br />
      <InlineMath
        math={`${data.a * 100}+${data.b}=${data.result}\\,\\mathrm{cm}=${pp(data.result2)}\\,\\mathrm m`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9642: Exercise<DATA> = {
  title: 'Meter und Zentimeter verbinden',
  source: 'Einheiten',
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
