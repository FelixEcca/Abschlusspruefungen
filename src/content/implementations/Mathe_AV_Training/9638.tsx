import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'bracketTickets'

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

const kind: Kind = 'bracketTickets'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4])
  const b = rng.randomItemFromArray([6, 8, 10])
  const c = rng.randomItemFromArray([3, 4, 5])
  const d = rng.randomItemFromArray([4, 5, 6])
  return {
    kind,
    a,
    b,
    c,
    d,
    result: a * b + c * d,
    result2: 0,
    label: pick(rng, [
      'Kinobesuch',
      'Museumsbesuch',
      'Schwimmbadbesuch',
      'Theaterbesuch',
    ]),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9638: Exercise<DATA> = {
  title: 'Rechnen im Sachkontext',
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
        Für einen {data.label} werden <b>{data.a}</b> Erwachsenenkarten zu{' '}
        <b>{data.b} €</b> und <b>{data.c}</b> Schülerkarten zu <b>{data.d} €</b>{' '}
        gekauft. Berechne die Gesamtkosten.
      </p>
    )
  },
  solution({ data }) {
    return (
      <InlineMath
        math={`${data.a}\\cdot${data.b}+${data.c}\\cdot${data.d}=${data.result}\\,€`}
      />
    )
  },
}
