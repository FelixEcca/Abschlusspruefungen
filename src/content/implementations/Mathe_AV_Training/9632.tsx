import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'unitChain'

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

const kind: Kind = 'unitChain'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([1.2, 1.5, 2.4, 3.6, 4.8])
  const b = round2(a * 1000)
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: b,
    result2: 0,
    label: pick(rng, [
      'Getränkeflasche',
      'Messbecher',
      'Kanister',
      'Wasserbehälter',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      In eine {data.label} passen{' '}
      <InlineMath math={`${pp(data.a)}\\,\\mathrm l`} />. Wandle die Menge in
      Milliliter um.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`${pp(data.a)}\\,\\mathrm l=${pp(data.result)}\\,\\mathrm{ml}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9632: Exercise<DATA> = {
  title: 'Liter in Milliliter',
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
