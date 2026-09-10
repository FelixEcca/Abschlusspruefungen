import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kind = 'addSameDenominator'

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

const kind: Kind = 'addSameDenominator'

function makeData(rng: any): DATA {
  const b = rng.randomItemFromArray([6, 8, 10, 12])
  const a = rng.randomItemFromArray([1, 2, 3])
  const c = rng.randomItemFromArray([2, 3, 4])
  return { kind, a, b, c, d: 0, result: a + c, result2: b, label: 'Bruchsumme' }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9648: Exercise<DATA> = {
  title: 'Brüche mit gleichem Nenner addieren',
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
        Addiere die Brüche{' '}
        <InlineMath
          math={`\\frac{${data.a}}{${data.b}}+\\frac{${data.c}}{${data.b}}`}
        />
        .
      </p>
    )
  },
  solution({ data }) {
    return (
      <InlineMath
        math={`\\frac{${data.a}}{${data.b}}+\\frac{${data.c}}{${data.b}}=\\frac{${data.result}}{${data.result2}}`}
      />
    )
  },
}
