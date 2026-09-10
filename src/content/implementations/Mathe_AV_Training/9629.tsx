import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'range'

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

const kind: Kind = 'range'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([4, 5, 6])
  const b = rng.randomItemFromArray([8, 9, 10])
  const c = rng.randomItemFromArray([12, 14, 16])
  const d = rng.randomItemFromArray([18, 20, 24])
  return {
    kind,
    a,
    b,
    c,
    d,
    result: d - a,
    result2: 0,
    label: pick(rng, ['Messwerte', 'Tageswerte', 'Punktzahlen', 'Wartezeiten']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9629: Exercise<DATA> = {
  title: 'Spannweite bestimmen',
  source: 'Diagramme und Daten',
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
        Die {data.label} lauten:{' '}
        <b>
          {data.a}, {data.b}, {data.c}, {data.d}
        </b>
        . Berechne die Spannweite.
      </p>
    )
  },
  solution({ data }) {
    return <InlineMath math={`Spannweite=${data.d}-${data.a}=${data.result}`} />
  },
}
