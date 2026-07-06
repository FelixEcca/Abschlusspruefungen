import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  b: number
  // zwei gut sichtbare Gitterpunkte für das Steigungsdreieck
  x1: number
  x2: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4100: Exercise<DATA> = {
  title: 'Steigung und y-Achsenabschnitt ablesen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    // kleine, klare Werte
    const m = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    const b = rng.randomIntBetween(-4, 4)
    // zwei x-Werte mit Abstand 2..4
    const x1 = rng.randomIntBetween(-6, 2)
    const x2 = x1 + rng.randomIntBetween(2, 4)
    return { m, b, x1, x2 }
  },

  originalData: { m: 1, b: -2, x1: -4, x2: -1 },

  constraint({ data }) {
    // Sichtbereich wahren
    const y1 = data.m * data.x1 + data.b
    const y2 = data.m * data.x2 + data.b
    const inRange = (y: number) => Math.abs(y) <= 9
    return inRange(y1) && inRange(y2) && Math.abs(data.b) <= 9
  },

  task({ data }) {
    const { m, b, x1, x2 } = data
    const y1 = m * x1 + b
    const y2 = m * x2 + b

    const linePts: string[] = []
    for (let x = -9; x <= 9; x += 0.1) {
      const y = m * x + b
      linePts.push(`${toX(x)},${toY(y)}`)
    }

    return (
      <>
        <p>
          Lies am Graphen die <b>Steigung</b> <InlineMath math="m" /> und den{' '}
          <b>y-Achsenabschnitt</b> <InlineMath math="b" /> ab. <br></br>Gib die
          Funktionsgleichung in der Form <InlineMath math="y = m x + b" /> an.
        </p>

        <svg viewBox="0 0 328 328" className="w-full max-w-xs">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          {/* Gerade */}
          <polyline
            points={linePts.join(' ')}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={2}
          />
          {/* Steigungsdreieck */}
          <circle cx={toX(x1)} cy={toY(y1)} r="3" fill="#1f2937" />
          <circle cx={toX(x2)} cy={toY(y2)} r="3" fill="#1f2937" />
          <line
            x1={toX(x1)}
            y1={toY(y1)}
            x2={toX(x2)}
            y2={toY(y1)}
            stroke="#64748b"
            strokeWidth={2}
          />
          <line
            x1={toX(x2)}
            y1={toY(y1)}
            x2={toX(x2)}
            y2={toY(y2)}
            stroke="#64748b"
            strokeWidth={2}
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    const { m, b } = data
    return (
      <p>
        <InlineMath
          math={`\\boxed{\\;y = ${pp(m)}\\,x ${pp(b, 'merge_op')}\\;}`}
        />
      </p>
    )
  },
}
