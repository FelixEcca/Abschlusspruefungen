import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kind = 'fractionCompare'

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

const kind: Kind = 'fractionCompare'

function makeData(rng: any): DATA {
  const pairs = [
    [1, 2, 3, 5],
    [2, 3, 3, 4],
    [3, 8, 2, 5],
    [4, 6, 5, 8],
  ]
  const [a, b, c, d] = rng.randomItemFromArray(pairs)
  return {
    kind,
    a,
    b,
    c,
    d,
    result: a / b > c / d ? 1 : 2,
    result2: 0,
    label: 'Vergleich',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Vergleiche die Brüche <InlineMath math={`\\frac{${data.a}}{${data.b}}`} />{' '}
      und <InlineMath math={`\\frac{${data.c}}{${data.d}}`} />. Welcher Bruch
      ist größer?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`\\frac{${data.a}}{${data.b}}${data.result === 1 ? '>' : '<'}\\frac{${data.c}}{${data.d}}`}
      />
      <p>Der {data.result === 1 ? 'erste' : 'zweite'} Bruch ist größer.</p>
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9617: Exercise<DATA> = {
  title: 'Brüche im Vergleich',
  source: 'Bruchrechnen',
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
