// exercise9559.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'uGesucht' | 'dGesucht'

interface DATA {
  mode: Mode
  d: number
  u: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9559: Exercise<DATA> = {
  title: 'Kreisumfang und Durchmesser',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray(['uGesucht', 'dGesucht'])
    const d = rng.randomItemFromArray([4, 5, 6, 8, 10, 12, 15, 20])
    const u = round2(Math.PI * d)

    return { mode, d, u }
  },

  originalData: {
    mode: 'uGesucht',
    d: 10,
    u: 31.42,
  },

  constraint({ data }) {
    return data.d > 0 && data.u > 0
  },

  task({ data }) {
    return (
      <>
        {data.mode === 'uGesucht' ? (
          <p>
            Ein Kreis hat den Durchmesser {data.d} cm. Berechnen Sie den Umfang.
          </p>
        ) : (
          <p>
            Ein Kreis hat den Umfang {pp(data.u)} cm. Berechnen Sie den
            Durchmesser.
          </p>
        )}

        <svg viewBox="0 0 320 180" className="mt-2 w-full max-w-sm">
          <circle
            cx="160"
            cy="90"
            r="60"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="100"
            y1="90"
            x2="220"
            y2="90"
            stroke="black"
            strokeWidth="2"
          />
          <text x="160" y="80" textAnchor="middle" fontSize="14">
            {data.mode === 'uGesucht' ? `d = ${data.d} cm` : 'd = ?'}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    if (data.mode === 'uGesucht') {
      return (
        <>
          <p>Formel:</p>
          <InlineMath math="u=\pi\cdot d" />
          <br />
          <InlineMath
            math={`u=\\pi\\cdot ${data.d}\\approx ${pp(data.u)}\\,\\mathrm{cm}`}
          />
        </>
      )
    }

    return (
      <>
        <p>Formel:</p>
        <InlineMath math="u=\pi\cdot d" />
        <p>Für den Durchmesser gilt dann:</p>
        <InlineMath math="d=\frac{u}{\pi}" />
        <br />
        <InlineMath
          math={`d=\\frac{${pp(data.u)}}{\\pi}\\approx ${pp(
            data.d,
          )}\\,\\mathrm{cm}`}
        />
      </>
    )
  },
}
