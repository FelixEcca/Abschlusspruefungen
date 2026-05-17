// exercise9504.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'parenMulSub' | 'mulParenAdd' | 'parenDivAdd' | 'twoParens'

interface DATA {
  mode: Mode
  a: number
  b: number
  c: number
  d: number
  result: number
}

function term(data: DATA) {
  if (data.mode === 'parenMulSub') {
    return `(${data.a}+${data.b})\\cdot ${data.c}-${data.d}`
  }

  if (data.mode === 'mulParenAdd') {
    return `${data.a}\\cdot (${data.b}+${data.c})+${data.d}`
  }

  if (data.mode === 'parenDivAdd') {
    return `(${data.a}+${data.b}):${data.c}+${data.d}`
  }

  return `(${data.a}-${data.b})\\cdot (${data.c}+${data.d})`
}

export const exercise9504: Exercise<DATA> = {
  title: 'Mit Klammern rechnen',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray([
      'parenMulSub',
      'mulParenAdd',
      'parenDivAdd',
      'twoParens',
    ])

    let a = rng.randomIntBetween(4, 30)
    let b = rng.randomIntBetween(2, 15)
    let c = rng.randomIntBetween(2, 8)
    let d = rng.randomIntBetween(2, 20)

    if (mode === 'parenDivAdd') {
      c = rng.randomItemFromArray([2, 3, 4, 5, 6])
      const q = rng.randomIntBetween(2, 10)
      b = rng.randomIntBetween(1, 12)
      a = q * c - b
    }

    if (mode === 'twoParens') {
      a = rng.randomIntBetween(10, 30)
      b = rng.randomIntBetween(2, a - 1)
      c = rng.randomIntBetween(2, 12)
      d = rng.randomIntBetween(2, 12)
    }

    let result = 0
    if (mode === 'parenMulSub') result = (a + b) * c - d
    if (mode === 'mulParenAdd') result = a * (b + c) + d
    if (mode === 'parenDivAdd') result = (a + b) / c + d
    if (mode === 'twoParens') result = (a - b) * (c + d)

    return { mode, a, b, c, d, result }
  },

  originalData: {
    mode: 'parenMulSub',
    a: 4,
    b: 12,
    c: 3,
    d: 20,
    result: 28,
  },

  constraint({ data }) {
    return Number.isInteger(data.result)
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Ergebnis.</p>
        <p>
          <InlineMath math={term(data)} />
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird die Klammer berechnet.</p>

        {data.mode === 'parenMulSub' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a + data.b}\\cdot ${data.c}-${data.d}`}
            />
            <br />
            <InlineMath
              math={`${pp((data.a + data.b) * data.c)}-${data.d}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}

        {data.mode === 'mulParenAdd' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a}\\cdot ${data.b + data.c}+${data.d}`}
            />
            <br />
            <InlineMath
              math={`${pp(data.a * (data.b + data.c))}+${data.d}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}

        {data.mode === 'parenDivAdd' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a + data.b}:${data.c}+${data.d}`}
            />
            <br />
            <InlineMath
              math={`${pp((data.a + data.b) / data.c)}+${data.d}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}

        {data.mode === 'twoParens' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a - data.b}\\cdot ${data.c + data.d}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}
      </>
    )
  },
}