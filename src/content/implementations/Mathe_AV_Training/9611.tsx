import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind = 'lengthFence'

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

const kind: Kind = 'lengthFence'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([6, 8, 10, 12, 15])
  const b = rng.randomItemFromArray([4, 5, 7, 9, 11])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: 2 * (a + b),
    result2: a * b,
    label: 'Garten',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein rechteckiger Garten ist{' '}
      <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} /> lang und{' '}
      <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> breit. Berechne Umfang
      und Fläche.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`U=2\\cdot(${pp(data.a)}+${pp(data.b)})=${pp(data.result)}\\,\\mathrm m`}
      />
      <br />
      <InlineMath
        math={`A=${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result2)}\\,\\mathrm{m^2}`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9611: Exercise<DATA> = {
  title: 'Rechteck im Alltag',
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
