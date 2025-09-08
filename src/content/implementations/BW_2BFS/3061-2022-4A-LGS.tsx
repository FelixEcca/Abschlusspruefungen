// =============================================
// 4A (3061) – LGS lösen + grafisch überprüfen
// =============================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // y = m1 x + b1  und  x + y = s  (zweite als Standardform)
  m1: number
  b1: number
  s: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3061: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem – rechnerisch & grafisch',
  source: '2022 Aufgabe 4A',
  useCalculator: false,
  duration: 10,

  generator(rng) {
    const m1 = rng.randomItemFromArray([0.5, 1, -0.5])
    const b1 = rng.randomItemFromArray([0, 1, 2])
    const s = rng.randomIntBetween(3, 8) // x+y = s
    return { m1, b1, s }
  },

  // Original: y = 1/2 x + 1  ;  x + y = 4
  originalData: { m1: 0.5, b1: 1, s: 4 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <div>
        <p>Lösen Sie rechnerisch und prüfen Sie grafisch:</p>
        <BlockMath
          math={`y=${data.m1 === 0.5 ? '\\tfrac12' : data.m1}x${bOp(data.b1)}`}
        />
        <BlockMath math={`x+y=${data.s}`} />
      </div>
    )
    function bOp(b: number) {
      return b ? (b > 0 ? `+${b}` : `${b}`) : ''
    }
  },

  tasks: [
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>1.</b> Rechnerische Lösung.
          </p>
        )
      },
      solution({ data }) {
        // Einsetzen in x+y=s  ->  x + (m1 x + b1) = s
        const A = 1 + data.m1
        const B = data.b1
        const x = (data.s - B) / A
        const y = data.m1 * x + data.b1
        return buildEquation([
          [
            'Einsetzen',
            '',
            `x+(${pp(data.m1)}x${pp(data.b1, 'merge_op')})=${pp(data.s)}`,
          ],
          ['', '\\Rightarrow', `${pp(1 + data.m1)}x=${pp(data.s - B)}`],
          ['Lösen', '\\Rightarrow', `x=${pp(x)},\\; y=${pp(y)}`],
        ])
      },
    },
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>2.</b> Grafische Überprüfung im Koordinatensystem.
          </p>
        )
      },
      solution({ data }) {
        // Kurven für das Schaubild
        const dense: number[] = []
        for (let x = -6; x <= 6; x += 0.1) dense.push(+x.toFixed(1))
        const g1 = dense
          .map(x => `${toX(x)},${toY(data.m1 * x + data.b1)}`)
          .join(' ')
        // x + y = s -> y = -x + s
        const g2 = dense.map(x => `${toX(x)},${toY(-x + data.s)}`).join(' ')
        const A = 1 + data.m1,
          B = data.b1
        const xs = (data.s - B) / A
        const ys = data.m1 * xs + data.b1

        return (
          <svg
            viewBox="0 0 328 328"
            width="328"
            height="328"
            className="border rounded"
          >
            <image
              href="/content/BW_2BFS/ksgroßmitachsen.png"
              width="328"
              height="328"
            />
            <polyline points={g1} fill="none" stroke="black" strokeWidth={2} />
            <polyline points={g2} fill="none" stroke="black" strokeWidth={2} />
            <circle cx={toX(xs)} cy={toY(ys)} r="3" />
            <text x={toX(xs) + 6} y={toY(ys) - 6} fontSize="12">
              S
            </text>
          </svg>
        )
      },
    },
  ],
}
