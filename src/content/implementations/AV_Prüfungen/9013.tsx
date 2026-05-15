// exercise9013.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  values: number[]
}

function toX(t: number) {
  return 164 + t * 8
}

export const exercise9013: Exercise<DATA> = {
  title: 'Teil 1: Zahlengerade',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pool = [-12, -8, -5, -2.5, -0.5, 3, 6.5, 9, 12, 15.5]
    const values = rng.shuffleArray(pool).slice(0, 4)
    return { values }
  },

  originalData: {
    values: [15.5, -0.5, 12, -8],
  },

  constraint({ data }) {
    return data.values.length === 4
  },

  task({ data }) {
    return (
      <>
        <p>Zeichnen Sie eine eigene Zahlengerade und tragen Sie folgende Temperaturen ein:</p>
        <p>
          {data.values.map((v, i) => (
            <span key={i} className="mr-8">
              {pp(v)} °C
            </span>
          ))}
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Eine mögliche Zahlengerade sieht so aus:</p>
        <svg viewBox="0 0 328 100">
          <line x1="20" y1="50" x2="308" y2="50" stroke="black" />
          {Array.from({ length: 41 }, (_, i) => i - 20).map(t => (
            <g key={t}>
              <line
                x1={toX(t)}
                y1={t % 5 === 0 ? 42 : 46}
                x2={toX(t)}
                y2={t % 5 === 0 ? 58 : 54}
                stroke="black"
              />
              {t % 5 === 0 && (
                <text x={toX(t) - 6} y="75" fontSize="10">
                  {t}
                </text>
              )}
            </g>
          ))}

          {data.values.map((v, i) => (
            <g key={i}>
              <circle cx={toX(v)} cy="50" r="4" fill="black" />
              <text x={toX(v) - 12} y="32" fontSize="11">
                {pp(v)}°C
              </text>
            </g>
          ))}
        </svg>
      </>
    )
  },
}