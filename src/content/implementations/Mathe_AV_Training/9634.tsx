import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind = 'examBasics'

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

const kind: Kind = 'examBasics'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([18, 24, 36, 48])
  const b = rng.randomItemFromArray([3, 4, 6, 8])
  const c = rng.randomItemFromArray([12, 15, 20, 25])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a / b + c,
    result2: 0,
    label: 'Prüfung',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Berechne: <InlineMath math={`${data.a}:${data.b}+${data.c}`} />
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`${data.a}:${data.b}+${data.c}=${pp(data.a / data.b)}+${data.c}=${pp(data.result)}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9634: Exercise<DATA> = {
  title: 'Rechenregeln in Prüfungsform',
  source: 'Grundlagen',
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
