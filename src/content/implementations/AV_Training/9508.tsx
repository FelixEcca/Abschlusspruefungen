// exercise9508.tsx
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

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b)
}

function frac(n: number, d: number) {
  if (d === 1) return `${n}`
  return `\\frac{${n}}{${d}}`
}

export const exercise9508: Exercise<DATA> = {
  title: 'Brüche subtrahieren',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    let d1 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    let d2 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    let n1 = rng.randomIntBetween(1, d1 - 1)
    let n2 = rng.randomIntBetween(1, d2 - 1)

    let den = lcm(d1, d2)
    let a = n1 * (den / d1)
    let b = n2 * (den / d2)

    while (a <= b) {
      d1 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
      d2 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
      n1 = rng.randomIntBetween(1, d1 - 1)
      n2 = rng.randomIntBetween(1, d2 - 1)
      den = lcm(d1, d2)
      a = n1 * (den / d1)
      b = n2 * (den / d2)
    }

    const g = gcd(a - b, den)

    return { n1, d1, n2, d2, rn: (a - b) / g, rd: den / g }
  },

  originalData: {
    n1: 3,
    d1: 4,
    n2: 1,
    d2: 2,
    rn: 1,
    rd: 4,
  },

  constraint({ data }) {
    return data.rn > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath
          math={`${frac(data.n1, data.d1)}-${frac(data.n2, data.d2)}`}
        />
      </>
    )
  },

  solution({ data }) {
    const den = lcm(data.d1, data.d2)
    const a = data.n1 * (den / data.d1)
    const b = data.n2 * (den / data.d2)

    return (
      <>
        <p>Die Brüche werden auf den gleichen Nenner gebracht.</p>
        <InlineMath
          math={`${frac(data.n1, data.d1)}-${frac(
            data.n2,
            data.d2,
          )}=${frac(a, den)}-${frac(b, den)}=${frac(a - b, den)}`}
        />
        <br />
        <InlineMath math={`=${frac(data.rn, data.rd)}`} />
      </>
    )
  },
}