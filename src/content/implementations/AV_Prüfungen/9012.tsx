// exercise9012.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  A: number
  B: number
  C: number
  D: number
}

function tempY(t: number) {
  return 170 - t * 3
}

export const exercise9012: Exercise<DATA> = {
  title: 'Teil 1: Thermometer ablesen',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const vals = rng.shuffleArray([-12, -5, 0, 8, 12, 15, 22, 28])
    return { A: vals[0], B: vals[1], C: vals[2], D: vals[3] }
  },

  originalData: {
    A: 13,
    B: 7,
    C: -3,
    D: -12,
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

        <svg viewBox="0 0 328 280">
          <rect x="145" y="20" width="55" height="240" fill="none" stroke="black" />
          <line x1="170" y1={tempY(-40)} x2="170" y2={tempY(40)} stroke="black" />

          {Array.from({ length: 81 }, (_, i) => i - 40).map(t => (
            <line
              key={t}
              x1={t % 10 === 0 ? 165 : 168}
              y1={tempY(t)}
              x2={t % 10 === 0 ? 190 : 183}
              y2={tempY(t)}
              stroke="black"
            />
          ))}

          {[-40, -30, -20, -10, 0, 10, 20, 30, 40].map(t => (
            <text key={t} x="195" y={tempY(t) + 4} fontSize="12">
              {t}
            </text>
          ))}
          <text x="195" y="25" fontSize="12">
            °C
          </text>

          {entries.map(([label, value], i) => (
            <g key={label}>
              <text x="55" y={tempY(value) + 5} fontSize="14">
                {label}
              </text>
              <line
                x1="75"
                y1={tempY(value)}
                x2="165"
                y2={tempY(value)}
                stroke="black"
                markerEnd="url(#arrow)"
              />
            </g>
          ))}

          <defs>
            <marker
              id="arrow"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 8 4, 0 8" fill="black" />
            </marker>
          </defs>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p><InlineMath math={`A=${data.A}^{\\circ}\\mathrm C`} /></p>
        <p><InlineMath math={`B=${data.B}^{\\circ}\\mathrm C`} /></p>
        <p><InlineMath math={`C=${data.C}^{\\circ}\\mathrm C`} /></p>
        <p><InlineMath math={`D=${data.D}^{\\circ}\\mathrm C`} /></p>
      </>
    )
  },
}