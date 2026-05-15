// exercise9012.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  A: number
  B: number
  C: number
  D: number
}

const SCALE_TOP = 30
const SCALE_BOTTOM = 240
const TEMP_MAX = 40
const TEMP_MIN = -30

function tempY(t: number) {
  const range = TEMP_MAX - TEMP_MIN
  return SCALE_TOP + ((TEMP_MAX - t) / range) * (SCALE_BOTTOM - SCALE_TOP)
}

export const exercise9012: Exercise<DATA> = {
  title: 'Teil 1: Thermometer ablesen',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const A = rng.randomIntBetween(-30, 40)
    const B = rng.randomIntBetween(-30, 40)
    const C = rng.randomIntBetween(-30, 40)
    const D = rng.randomIntBetween(-30, 40)
    return { A, B, C, D }
  },

  originalData: {
    A: 15,
    B: 9,
    C: -1,
    D: -10,
  },

  constraint() {
    return true
  },

  task({ data }) {
    const entries = [
      ['A', data.A],
      ['B', data.B],
      ['C', data.C],
      ['D', data.D],
    ] as const

    return (
      <>
        <p>Entnehmen Sie dem Thermometer die Temperaturen für A, B, C und D.</p>

        <svg viewBox="0 0 328 285">
          <defs>
            <marker
              id="arrow9012"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 8 4, 0 8" fill="black" />
            </marker>
          </defs>

          {/* Thermometer-Gehäuse */}
          <rect
            x="145"
            y="16"
            width="78"
            height="252"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
          />

          {/* Glasröhre */}
          <line
            x1="178"
            y1={SCALE_TOP}
            x2="178"
            y2={SCALE_BOTTOM + 18}
            stroke="black"
            strokeWidth="2"
          />

          {/* Skala */}
          {Array.from(
            { length: TEMP_MAX - TEMP_MIN + 1 },
            (_, i) => TEMP_MIN + i,
          ).map(t => {
            const y = tempY(t)
            const isTen = t % 10 === 0
            const isFive = t % 5 === 0

            return (
              <line
                key={t}
                x1={isTen ? 160 : isFive ? 164 : 168}
                y1={y}
                x2={isTen ? 196 : isFive ? 192 : 187}
                y2={y}
                stroke="black"
                strokeWidth={isTen ? 1.5 : isFive ? 1.2 : 0.7}
              />
            )
          })}

          {/* Beschriftung der 10er-Schritte */}
          {[-30, -20, -10, 0, 10, 20, 30, 40].map(t => (
            <text key={t} x="202" y={tempY(t) + 4} fontSize="14">
              {t}
            </text>
          ))}

          <text x="200" y="10" fontSize="14">
            °C
          </text>

          {/* Messpfeile */}
          {entries.map(([label, value]) => (
            <g key={label}>
              <text x="38" y={tempY(value) + 5} fontSize="16">
                {label}
              </text>
              <line
                x1="62"
                y1={tempY(value)}
                x2="165"
                y2={tempY(value)}
                stroke="black"
                strokeWidth="1.5"
                markerEnd="url(#arrow9012)"
              />
            </g>
          ))}
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          <InlineMath math={`A=${data.A}^{\\circ}\\mathrm C`} />
        </p>
        <p>
          <InlineMath math={`B=${data.B}^{\\circ}\\mathrm C`} />
        </p>
        <p>
          <InlineMath math={`C=${data.C}^{\\circ}\\mathrm C`} />
        </p>
        <p>
          <InlineMath math={`D=${data.D}^{\\circ}\\mathrm C`} />
        </p>
      </>
    )
  },
}
