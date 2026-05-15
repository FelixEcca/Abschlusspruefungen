// exercise9009.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
  result1: number
  result2: number
}

export const exercise9009: Exercise<DATA> = {
  title: 'Teil 1: Terme',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = rng.randomIntBetween(8, 30)
    const b = rng.randomItemFromArray([16, 20, 24, 28, 32, 36])
    const c = rng.randomItemFromArray([4, 5, 6, 7, 8, 9])
    const d = rng.randomIntBetween(2, 12)
    const e = rng.randomIntBetween(2, 9)

    const f = rng.randomIntBetween(2, 9)
    const g = rng.randomIntBetween(3, 15)
    const h = rng.randomItemFromArray([3, 4, 5, 6])

    const result1 = a + b / c + d - e * 2
    const result2 = f + (g + h) * 3 - (36 / h) * 5

    return { a, b, c, d, e, f, g, h, result1, result2 }
  },

  originalData: {
    a: 16,
    b: 32,
    c: 4,
    d: 9,
    e: 7,
    f: 2,
    g: 4,
    h: 12,
    result1: 19,
    result2: 30,
  },

  constraint({ data }) {
    return Number.isInteger(data.result1) && Number.isInteger(data.result2)
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <p>
          <InlineMath
            math={`${data.a}+${data.b}:${data.c}+${data.d}-${data.e}\\cdot 2`}
          />
        </p>
        <p>
          <InlineMath
            math={`${data.f}+(${data.g}+${data.h})\\cdot 3-(36:${data.h})\\cdot 5`}
          />
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.a}+${data.b}:${data.c}+${data.d}-${data.e}\\cdot 2=${pp(
            data.result1,
          )}`}
        />
        <br />
        <InlineMath
          math={`${data.f}+(${data.g}+${data.h})\\cdot 3-(36:${data.h})\\cdot 5=${pp(
            data.result2,
          )}`}
        />
      </>
    )
  },
}