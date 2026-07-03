// exercise9537.tsx
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

export const exercise9537: Exercise<DATA> = {
  title: 'Temperaturen eintragen',
  source: 'Diagramme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pool = [-18, -15, -12, -8, -6.5, -5, -2.5, -0.5, 0, 3, 5, 6.5, 9, 12, 15.5, 18]
    return { values: rng.shuffleArray(pool).slice(0, 4) }
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
        <p>Tragen Sie die Temperaturen auf einer Zahlengeraden ein:</p>
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
      <svg viewBox="0 0 328 125">
        <line x1={LEFT} y1={AXIS_Y} x2={RIGHT} y2={AXIS_Y} stroke="black" />

        {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map(t => (
          <g key={t}>
            <line
              x1={toX(t)}
              y1={t % 10 === 0 ? AXIS_Y - 12 : t % 5 === 0 ? AXIS_Y - 9 : AXIS_Y - 6}
              x2={toX(t)}
              y2={t % 10 === 0 ? AXIS_Y + 12 : t % 5 === 0 ? AXIS_Y + 9 : AXIS_Y + 6}
              stroke="black"
            />
            {t % 5 === 0 && (
              <text x={toX(t)} y={AXIS_Y + 30} fontSize="11" textAnchor="middle">
                {t}
              </text>
            )}
          </g>
        ))}

        {data.values.map((v, i) => (
          <g key={i}>
            <text x={toX(v)} y={20 + (i % 2) * 14} fontSize="12" textAnchor="middle">
              {pp(v)}°C
            </text>
            <line
              x1={toX(v)}
              y1={28 + (i % 2) * 14}
              x2={toX(v)}
              y2={AXIS_Y - 7}
              stroke="black"
            />
          </g>
        ))}
      </svg>
    )
  },
}