// exercise9013.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  values: number[]
}

const MIN = -20
const MAX = 20
const AXIS_Y = 58
const LEFT = 14
const RIGHT = 314

function toX(t: number) {
  return LEFT + ((t - MIN) / (MAX - MIN)) * (RIGHT - LEFT)
}

export const exercise9013: Exercise<DATA> = {
  title: 'Teil 1: Zahlengerade',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pool = [
      -18, -15, -12, -8, -6.5, -5, -2.5, -0.5, 0, 3, 5, 6.5, 9, 12, 15.5, 18,
    ]
    const values = rng.shuffleArray(pool).slice(0, 4)
    return { values }
  },

  originalData: {
    values: [15.5, -0.5, 12, -8],
  },

  constraint({ data }) {
    return (
      data.values.length === 4 && data.values.every(v => v >= MIN && v <= MAX)
    )
  },

  task({ data }) {
    return (
      <>
        <p>
          Zeichnen Sie eine eigene Zahlengerade und tragen Sie folgende
          Temperaturen ein:
        </p>
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

        <svg viewBox="0 0 328 125">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="green" />
            </marker>
          </defs>

          {/* Zahlengerade */}
          <line
            x1={LEFT}
            y1={AXIS_Y}
            x2={RIGHT + 10}
            y2={AXIS_Y}
            stroke="black"
            markerEnd="url(#arrowhead)"
          />

          {/* Skala: jeder Grad ein kleiner Strich, 5er größer, 10er am größten */}
          {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map(t => {
            const isTen = t % 10 === 0
            const isFive = t % 5 === 0

            return (
              <g key={t}>
                <line
                  x1={toX(t)}
                  y1={isTen ? AXIS_Y - 12 : isFive ? AXIS_Y - 9 : AXIS_Y - 6}
                  x2={toX(t)}
                  y2={isTen ? AXIS_Y + 12 : isFive ? AXIS_Y + 9 : AXIS_Y + 6}
                  stroke="black"
                  strokeWidth={isTen ? 1.4 : isFive ? 1.2 : 0.9}
                />

                {isFive && (
                  <text
                    x={toX(t)}
                    y={AXIS_Y + 30}
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {t}
                  </text>
                )}
              </g>
            )
          })}

          {/* Werte mit Pfeilen */}
          {data.values.map((v, i) => {
            const labelY = 20 + (i % 2) * 14
            const arrowStartY = labelY + 4

            return (
              <g key={i}>
                <text x={toX(v)} y={labelY} fontSize="12" textAnchor="middle">
                  {pp(v)}°C
                </text>

                <line
                  x1={toX(v)}
                  y1={arrowStartY}
                  x2={toX(v)}
                  y2={AXIS_Y - 7}
                  stroke="green"
                  strokeWidth="1.2"
                  markerEnd="url(#arrowhead)"
                />
              </g>
            )
          })}
        </svg>
        <h2>Erklärvideo</h2>
        <p>
          Hier gibt es noch ein Erklärungsvideo zur Zahlengerade mit negativen
          Zahlen:
        </p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/44ANi3KvL7I"
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
