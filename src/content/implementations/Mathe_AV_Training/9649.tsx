import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick, gcd } from './_avTrainingShared'

type Kind = 'fractionMarked'

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

const kind: Kind = 'fractionMarked'

function makeData(rng: any): DATA {
  const b = rng.randomItemFromArray([8, 10, 12, 15, 20])
  const a = rng.randomItemFromArray([2, 3, 4, 5, 6])
  const g = gcd(a, b)
  return {
    kind,
    a,
    b,
    c: a / g,
    d: b / g,
    result: 0,
    result2: 0,
    label: pick(rng, ['Feldern', 'Plätzen', 'Kärtchen', 'Kästchen']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9649: Exercise<DATA> = {
  title: 'Markierte Felder als Bruch',
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
        Von <b>{data.b}</b> {data.label} sind <b>{data.a}</b> markiert. Gib den
        Anteil als Bruch an und kürze, wenn möglich.
      </p>
    )
  },
  solution({ data }) {
    return (
      <InlineMath
        math={`\\frac{${data.a}}{${data.b}}=\\frac{${data.c}}{${data.d}}`}
      />
    )
  },
}
