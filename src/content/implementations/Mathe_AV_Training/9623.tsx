import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'discount'

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

const kind: Kind = 'discount'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([40, 60, 80, 120, 150, 200])
  const b = rng.randomItemFromArray([10, 15, 20, 25, 30])
  const result = round2(a * (1 - b / 100))
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result,
    result2: round2(a - result),
    label: pick(rng, ['Jacke', 'Werkzeugkoffer', 'Rucksack', 'Sportschuhe']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein Artikel ({data.label}) kostet <b>{pp(data.a)} €</b>. Der Preis wird um{' '}
      <b>{data.b} %</b> reduziert. Berechne Rabatt und neuen Preis.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`Rabatt=${pp(data.a)}\\cdot\\frac{${data.b}}{100}=${pp(data.result2)}\\,€`}
      />
      <br />
      <InlineMath
        math={`neu=${pp(data.a)}-${pp(data.result2)}=${pp(data.result)}\\,€`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9623: Exercise<DATA> = {
  title: 'Rabatt berechnen',
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
