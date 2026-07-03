// exercise9559.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
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

  generator(rng) {
    const d = rng.randomItemFromArray([4, 5, 6, 8, 10, 12, 15, 20])
    const u = round2(Math.PI * d)

    return { d, u }
  },

  originalData: {
    d: 10,
    u: 31.42,
  },

  constraint({ data }) {
    return data.d > 0 && data.u > 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ein Kreis hat den Durchmesser {data.d} cm. Berechnen Sie den
              Umfang.
            </p>

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
                {`d = ${data.d} cm`}
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Formel:</p>
            <InlineMath math="u=\pi\cdot d" />
            <br />
            <InlineMath
              math={`u=\\pi\\cdot ${data.d}\\approx ${pp(data.u)}\\,\\mathrm{cm}`}
            />
            <h2>Erklärvideo</h2>
            <p>Hier gibt es noch ein Erklärungsvideo:</p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/mjLRBsUa0mI"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ein Kreis hat den Umfang {pp(data.u)} cm. Berechnen Sie den
              Durchmesser.
            </p>

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
                d = ?
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
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
    },
  ],
}
