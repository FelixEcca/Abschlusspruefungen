// exercise9550.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  op: '+' | '-'
  result: number
}

export const exercise9550: Exercise<DATA> = {
  title: 'Ganze Zahlen addieren und subtrahieren',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = rng.randomIntBetween(-20, 20)
    const b = rng.randomIntBetween(-20, 20)
    const op = rng.randomItemFromArray(['+', '-'] as const)
    const result = op === '+' ? a + b : a - b

    return { a, b, op, result }
  },

  originalData: {
    a: -8,
    b: 12,
    op: '+',
    result: 4,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath
          math={`${data.a}${data.op}${data.b < 0 ? `(${data.b})` : data.b}`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Achte besonders auf die Vorzeichen.</p>
        <InlineMath
          math={`${data.a}${data.op}${data.b < 0 ? `(${data.b})` : data.b}=${data.result}`}
        />
        <p>
          Ergebnis: <b>{data.result}</b>
        </p>
      </>
    )
  },
}
