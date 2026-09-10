import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'fairDivision'

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

const kind: Kind = 'fairDivision'

function makeData(rng: any): DATA {
  const b = rng.randomItemFromArray([3, 4, 5, 6, 8])
  const result = rng.randomItemFromArray([6, 7, 8, 9, 12])
  return {
    kind,
    a: b * result,
    b,
    c: 0,
    d: 0,
    result,
    result2: 0,
    label: pick(rng, ['Schrauben', 'Karten', 'Brötchen', 'Hefte']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9636: Exercise<DATA> = {
  title: 'Gerecht verteilen',
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
    return (
      <p>
        Es werden <b>{data.a}</b> {data.label} gleichmäßig auf <b>{data.b}</b>{' '}
        Kisten verteilt. Wie viele {data.label} kommen in eine Kiste?
      </p>
    )
  },
  solution({ data }) {
    return <InlineMath math={`${data.a}:${data.b}=${data.result}`} />
  },
}
