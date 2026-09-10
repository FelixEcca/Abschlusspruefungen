import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'recipeScale'

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

const kind: Kind = 'recipeScale'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4])
  const b = rng.randomItemFromArray([150, 200, 250, 300])
  const c = rng.randomItemFromArray([5, 6, 8, 10])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2((b / a) * c),
    result2: 0,
    label: pick(rng, ['Reis', 'Nudeln', 'Kartoffeln', 'Mehl']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9619: Exercise<DATA> = {
  title: 'Rezept umrechnen',
  source: 'Dreisatz',
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
        Für <b>{data.a}</b> Personen braucht man <b>{data.b} g</b> {data.label}.
        Wie viel {data.label} braucht man für <b>{data.c}</b> Personen?
      </p>
    )
  },
  solution({ data }) {
    return (
      <InlineMath
        math={`${data.b}:${data.a}\\cdot${data.c}=${pp(data.result)}\\,\\mathrm g`}
      />
    )
  },
}
