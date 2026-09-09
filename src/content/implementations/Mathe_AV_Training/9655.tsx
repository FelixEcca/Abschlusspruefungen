import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind = 'percentForms'

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

const kind: Kind = 'percentForms'

function makeData(rng: any): DATA {
  const options = [
    [25, 1, 4],
    [50, 1, 2],
    [75, 3, 4],
    [20, 1, 5],
    [10, 1, 10],
  ]
  const [a, b, c] = rng.randomItemFromArray(options)
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a / 100,
    result2: 0,
    label: 'Umwandlung',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Wandle <b>{data.a} %</b> in eine Dezimalzahl und in einen Bruch um.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}\\,\\%=${pp(data.result)}`} />
      <br />
      <InlineMath math={`${data.a}\\,\\%=\\frac{${data.b}}{${data.c}}`} />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9655: Exercise<DATA> = {
  title: 'Prozent, Dezimalzahl und Bruch',
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
