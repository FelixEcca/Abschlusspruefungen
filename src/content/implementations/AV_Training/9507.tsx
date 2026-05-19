// exercise9507.tsx
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

export const exercise9507: Exercise<DATA> = {
  title: 'Brüche addieren',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const d1 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const d2 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const n1 = rng.randomIntBetween(1, d1 - 1)
    const n2 = rng.randomIntBetween(1, d2 - 1)

    const den = lcm(d1, d2)
    const num = n1 * (den / d1) + n2 * (den / d2)
    const g = gcd(num, den)

    return { n1, d1, n2, d2, rn: num / g, rd: den / g }
  },

  originalData: {
    n1: 1,
    d1: 4,
    n2: 1,
    d2: 2,
    rn: 3,
    rd: 4,
  },

  constraint({ data }) {
    return data.n1 > 0 && data.n2 > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Ergebnis.</p>
        <InlineMath
          math={`${frac(data.n1, data.d1)}+${frac(data.n2, data.d2)}`}
        />
      </>
    )
  },

  solution({ data }) {
    const den = lcm(data.d1, data.d2)
    const a = data.n1 * (den / data.d1)
    const b = data.n2 * (den / data.d2)
    const factor1 = den / data.d1
    const factor2 = den / data.d2

    return (
      <>
        {data.d1 !== data.d2 && (
          <>
            <p>Die Brüche werden auf den gleichen Nenner {den} gebracht.</p>
            <InlineMath
              math={`${frac(data.n1, data.d1)}=\\frac{${data.n1}\\cdot${factor1}}{${data.d1}\\cdot${factor1}}=${frac(
                data.n1 * factor1,
                data.d1 * factor1,
              )} `}
            />
            <br />
            <InlineMath
              math={`${frac(data.n2, data.d2)}=\\frac{${data.n2}\\cdot${factor2}}{${data.d2}\\cdot${factor2}}=${frac(
                data.n2 * factor2,
                data.d2 * factor2,
              )} `}
            />
            <p>Dann addiert:</p>
            <InlineMath
              math={`${frac(data.n1, data.d1)}+${frac(data.n2, data.d2)}=${frac(a, den)}+${frac(b, den)}=${frac(a + b, den)}`}
            />
          </>
        )}
        <InlineMath
          math={`${frac(data.n1, data.d1)}+${frac(
            data.n2,
            data.d2,
          )}=${frac(a, den)}+${frac(b, den)}=${frac(a + b, den)}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/nrzpRozQnM4"
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
