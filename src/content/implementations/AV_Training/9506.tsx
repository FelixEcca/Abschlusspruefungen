// exercise9506.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  n: number
  d: number
  amount: number
  rn: number
  rd: number
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function frac(n: number, d: number) {
  if (d === 1) return `${n}`
  return `\\frac{${n}}{${d}}`
}

export const exercise9506: Exercise<DATA> = {
  title: 'Bruchteil berechnen',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const d = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const n = rng.randomIntBetween(1, d - 1)
    const amount = rng.randomItemFromArray([6, 8, 10, 12, 15, 18, 20, 24])
    const rawN = n * amount
    const rawD = d
    const g = gcd(rawN, rawD)
    const rn = rawN / g
    const rd = rawD / g

    return { n, d, amount, rn, rd }
  },

  originalData: {
    n: 1,
    d: 4,
    amount: 12,
    rn: 3,
    rd: 1,
  },

  constraint({ data }) {
    return data.amount > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie <InlineMath math={frac(data.n, data.d)} /> von{' '}
          {data.amount}.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${frac(data.n, data.d)}\\cdot ${data.amount}=\\frac{${
            data.n
          }\\cdot ${data.amount}}{${data.d}}=\\frac{${
            data.n * data.amount
          }}{${data.d}}=${frac(data.rn, data.rd)}`}
        />
      </>
    )
  },
}