// exercise9538.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  A: number
  B: number
  C: number
  D: number
}

const TOP = 30
const BOT = 240
const MAX = 40
const MIN = -30

function tempY(t: number) {
  return TOP + ((MAX - t) / (MAX - MIN)) * (BOT - TOP)
}

export const exercise9538: Exercise<DATA> = {
  title: 'Thermometer ablesen',
  source: 'Diagramme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const vals = rng.shuffleArray([-15, -10, -5, 0, 5, 10, 15, 20, 25, 30])
    return { A: vals[0], B: vals[1], C: vals[2], D: vals[3] }
  },

  originalData: {
    A: 13,
    B: 16,
    C: -9,
    D: 0,
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
        <p>Lesen Sie die Temperaturen A, B, C und D ab.</p>

        <svg viewBox="0 0 328 285">
          <rect x="145" y="16" width="78" height="252" fill="none" stroke="black" />
          <line x1="178" y1={TOP} x2="178" y2={BOT + 18} stroke="black" strokeWidth="2" />

          {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map(t => (
            <line
              key={t}
              x1={t % 10 === 0 ? 160 : t % 5 === 0 ? 164 : 168}
              y1={tempY(t)}
              x2={t % 10 === 0 ? 196 : t % 5 === 0 ? 192 : 187}
              y2={tempY(t)}
              stroke="black"
            />
          ))}

          {[-30, -20, -10, 0, 10, 20, 30, 40].map(t => (
            <text key={t} x="202" y={tempY(t) + 4} fontSize="14">
              {t}
            </text>
          ))}

          {entries.map(([label, value]) => (
            <g key={label}>
              <text x="38" y={tempY(value) + 5} fontSize="16">
                {label}
              </text>
              <line x1="62" y1={tempY(value)} x2="158" y2={tempY(value)} stroke="black" />
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