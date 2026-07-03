// exercise9006.tsx
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
  return `\\frac{${n}}{${d}}`
}

export const exercise9006: Exercise<DATA> = {
  title: 'Teil 1: Brüche',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const d1 = rng.randomIntBetween(3, 10)
    const d2 = rng.randomIntBetween(2, 9)
    const n1 = rng.randomIntBetween(1, d1 - 1)
    const n2 = rng.randomIntBetween(1, d2 - 1)

    // n1/d1 : n2/d2 = n1/d1 · d2/n2
    const rawN = n1 * d2
    const rawD = d1 * n2
    const g = gcd(rawN, rawD)
    const rn = rawN / g
    const rd = rawD / g

    return { n1, d1, n2, d2, rn, rd }
  },

  originalData: {
    n1: 3,
    d1: 8,
    n2: 1,
    d2: 2,
    rn: 3,
    rd: 4,
  },

  constraint({ data }) {
    return data.n1 > 0 && data.n2 > 0 && data.d1 > 0 && data.d2 > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath
          math={`${frac(data.n1, data.d1)}:${frac(data.n2, data.d2)}`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Dividieren mit Brüchen wird mit dem Kehrbruch multipliziert.</p>
        <InlineMath
          math={`${frac(data.n1, data.d1)}:${frac(
            data.n2,
            data.d2,
          )}=${frac(data.n1, data.d1)}\\cdot ${frac(data.d2, data.n2)}`}
        />
        <br />
        <InlineMath
          math={`=\\frac{${data.n1}\\cdot ${data.d2}}{${data.d1}\\cdot ${
            data.n2
          }}=\\frac{${data.n1 * data.d2}}{${data.d1 * data.n2}}`}
        />
        <br />
        <InlineMath math={`=${frac(data.rn, data.rd)}`} />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Teilen mit Brüchen:</p>
        <div className="my-4">
        <iframe
          width="100%"
          height="220"
          src="https://www.youtube.com/embed/Z_voa7rnihA"
          title="Erklärungsvideo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded border"
        />
      </div>
      </>
    )
  },
}