// exercise9509.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  n1: number
  d1: number
  n2: number
  d2: number
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

export const exercise9509: Exercise<DATA> = {
  title: 'Brüche multiplizieren',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const d1 = rng.randomIntBetween(2, 10)
    const d2 = rng.randomIntBetween(2, 10)
    const n1 = rng.randomIntBetween(1, d1 - 1)
    const n2 = rng.randomIntBetween(1, d2 - 1)

    const rawN = n1 * n2
    const rawD = d1 * d2
    const g = gcd(rawN, rawD)

    return { n1, d1, n2, d2, rn: rawN / g, rd: rawD / g }
  },

  originalData: {
    n1: 3,
    d1: 8,
    n2: 1,
    d2: 2,
    rn: 3,
    rd: 16,
  },

  constraint({ data }) {
    return data.n1 > 0 && data.n2 > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath
          math={`${frac(data.n1, data.d1)}\\cdot ${frac(
            data.n2,
            data.d2,
          )}`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${frac(data.n1, data.d1)}\\cdot ${frac(
            data.n2,
            data.d2,
          )}=\\frac{${data.n1}\\cdot ${data.n2}}{${data.d1}\\cdot ${
            data.d2
          }}=\\frac{${data.n1 * data.n2}}{${data.d1 * data.d2}}`}
        />
        
      </>
    )
  },
}