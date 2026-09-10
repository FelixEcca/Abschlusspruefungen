import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { pick } from './_avTrainingShared'

type Kind = 'fractionOfAmount'

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

const kind: Kind = 'fractionOfAmount'

function makeData(rng: any): DATA {
  const b = rng.randomItemFromArray([3, 4, 5, 6, 8])
  const a = rng.randomIntBetween(1, b - 1)
  const c = b * rng.randomItemFromArray([6, 8, 10, 12, 15])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: (c / b) * a,
    result2: 0,
    label: pick(rng, ['Klasse', 'Sportgruppe', 'Busgruppe', 'Projektgruppe']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
  randomIntBetween(a: number) {
    return a
  },
})

export const exercise9616: Exercise<DATA> = {
  title: 'Bruchteil von einer Menge',
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
    return (
      <p>
        In einer {data.label} mit <b>{data.c}</b> Personen sind{' '}
        <InlineMath math={`\\frac{${data.a}}{${data.b}}`} /> anwesend. Wie viele
        Personen sind anwesend?
      </p>
    )
  },
  solution({ data }) {
    return (
      <InlineMath
        math={`${data.c}: ${data.b}\\cdot ${data.a}=${pp(data.result)}`}
      />
    )
  },
}
