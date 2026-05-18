// exercise9552.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Op = '+' | '-' | 'cdot' | ':'

interface DATA {
  a: number
  b: number
  op: Op
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9552: Exercise<DATA> = {
  title: 'Rechnen mit Dezimalzahlen',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const op = rng.randomItemFromArray(['+', '-', 'cdot', ':'] as const)

    if (op === ':') {
      const b = rng.randomItemFromArray([0.5, 1.5, 2.5, 4])
      const result = rng.randomItemFromArray([1.2, 2.4, 3.6, 4.8, 6])
      const a = round2(b * result)
      return { a, b, op, result }
    }

    const a = rng.randomItemFromArray([1.2, 2.5, 3.75, 4.8, 6.25, 10.5])
    const b = rng.randomItemFromArray([0.5, 1.25, 2.4, 3.5, 4.75])

    let result = 0
    if (op === '+') result = round2(a + b)
    if (op === '-') result = round2(a - b)
    if (op === 'cdot') result = round2(a * b)

    return { a, b, op, result }
  },

  originalData: {
    a: 3.75,
    b: 1.25,
    op: '+',
    result: 5,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        {data.op === 'cdot' ? (
          <InlineMath math={`${pp(data.a)}\\cdot ${pp(data.b)}`} />
        ) : (
          <InlineMath math={`${pp(data.a)}${data.op}${pp(data.b)}`} />
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Achte genau auf das Komma.</p>
        {data.op === 'cdot' ? (
          <InlineMath
            math={`${pp(data.a)}\\cdot ${pp(data.b)}=${pp(data.result)}`}
          />
        ) : (
          <InlineMath
            math={`${pp(data.a)}${data.op}${pp(data.b)}=${pp(data.result)}`}
          />
        )}
        <p>
          Ergebnis: <b>{pp(data.result)}</b>
        </p>
      </>
    )
  },
}
