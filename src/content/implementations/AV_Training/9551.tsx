// exercise9551.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  op: 'cdot' | ':'
  result: number
}

export const exercise9551: Exercise<DATA> = {
  title: 'Ganze Zahlen multiplizieren und dividieren',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const op = rng.randomItemFromArray(['cdot', ':'] as const)

    if (op === 'cdot') {
      const a = rng.randomIntBetween(-12, 12)
      let b = rng.randomIntBetween(-12, 12)
      while (b === 0) b = rng.randomIntBetween(-12, 12)
      return { a, b, op, result: a * b }
    }

    const b = rng.randomItemFromArray([
      -12, -10, -8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8, 10, 12,
    ])
    const result = rng.randomIntBetween(-12, 12)
    const a = b * result

    return { a, b, op, result }
  },

  originalData: {
    a: -24,
    b: 6,
    op: ':',
    result: -4,
  },

  constraint({ data }) {
    return data.b !== 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        {data.op === 'cdot' ? (
          <InlineMath math={`${data.a}\\cdot ${data.b}`} />
        ) : (
          <InlineMath math={`${data.a}:${data.b}`} />
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Achte zuerst auf die Vorzeichen.</p>
        <p>
          Gleiche Vorzeichen ergeben plus. Verschiedene Vorzeichen ergeben
          minus.
        </p>
        {data.op === 'cdot' ? (
          <InlineMath math={`${data.a}\\cdot ${data.b}=${data.result}`} />
        ) : (
          <InlineMath math={`${data.a}:${data.b}=${data.result}`} />
        )}
        <p>
          Ergebnis: <b>{data.result}</b>
        </p>
      </>
    )
  },
}
