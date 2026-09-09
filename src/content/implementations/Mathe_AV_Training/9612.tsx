import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2 } from './_avTrainingShared'

type Kind = 'paintArea'

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

const kind: Kind = 'paintArea'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([3, 4, 5, 6, 8])
  const b = rng.randomItemFromArray([2.2, 2.4, 2.5, 2.8, 3])
  const c = rng.randomItemFromArray([5, 6, 7, 8])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2(a * b),
    result2: round2(a * b * c),
    label: 'Wand',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Eine Wand ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} /> breit und{' '}
      <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> hoch. Pro Quadratmeter
      werden <InlineMath math={`${pp(data.c)}\\,€`} /> berechnet. Berechne
      Fläche und Kosten.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`A=${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result)}\\,\\mathrm{m^2}`}
      />
      <br />
      <InlineMath
        math={`K=${pp(data.result)}\\cdot${pp(data.c)}=${pp(data.result2)}\\,€`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9612: Exercise<DATA> = {
  title: 'Wandfläche und Kosten',
  source: 'Figuren und Flächen',
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
