// =======================================
// 1E (Index 3104) — Geraden g, h + Gerade k
// =======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA3104 {
  // g: fallend, h: steigend
  mg: number
  bg: number
  mh: number
  bh: number
  // S(x|y) auf h für Teil (2)
  Sx: number
  Sy: number
  // k: durch S, beliebige Steigung ≠ mh
  mk: number
  bk: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3104: Exercise<DATA3104> = {
  title: 'Geraden zuordnen & Gerade durch gegebenen Punkt',
  source: '2023 Pflichtteil 1E',
  useCalculator: false,
  duration: 12,

  generator(rng) {
    const mh = rng.randomItemFromArray([0.5, 1, 1.5, 2])
    const bh = rng.randomIntBetween(-2, 4)
    const mg = rng.randomItemFromArray([-0.5, -1, -1.5, -2])
    const bg = rng.randomIntBetween(2, 6)

    // Schnittpunkt mit h wählen: Sx ganzzahlig im Sichtbereich, Sy=h(Sx)
    const Sx = rng.randomIntBetween(-1, 6)
    const Sy = mh * Sx + bh

    const mk = rng.randomItemFromArray(
      [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2].filter(m => m !== mh),
    )
    const bk = Sy - mk * Sx

    return { mg, bg, mh, bh, Sx, Sy, mk, bk }
  },

  originalData: { mg: -0.5, bg: 4, mh: 1, bh: 1, Sx: 1, Sy: 2, mk: -1, bk: 3 },

  constraint({ data }) {
    return data.mg < 0 && data.mh > 0 && isFinite(data.bk)
  },

  intro({ data }) {
    const xs: number[] = []
    for (let x = -2; x <= 8; x += 0.1) xs.push(+x.toFixed(1))
    const pathG = xs
      .map(x => `${toX(x)},${toY(data.mg * x + data.bg)}`)
      .join(' ')
    const pathH = xs
      .map(x => `${toX(x)},${toY(data.mh * x + data.bh)}`)
      .join(' ')
    return (
      <div className="space-y-2">
        <p>
          Dargestellt sind zwei Geraden <InlineMath math="g" /> (fallend) und{' '}
          <InlineMath math="h" /> (steigend) sowie zwei Gleichungen.
        </p>
        <div className="flex gap-4">
          <div>
            <InlineMath math={`y=${pp(data.mh)}x${pp(data.bh, 'merge_op')}`} />
            <br />
            <InlineMath math={`y=${pp(data.mg)}x${pp(data.bg, 'merge_op')}`} />
          </div>
          <svg viewBox="0 0 328 328" width="328" height="328">
            <image
              href="/content/BW_2BFS/ksgroßmitachsen.png"
              width="328"
              height="328"
            />
            <polyline
              points={pathG}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <polyline
              points={pathH}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <text x={toX(-1)} y={toY(data.mg * -1 + data.bg) - 6}>
              g
            </text>
            <text x={toX(4)} y={toY(data.mh * 4 + data.bh) - 6}>
              h
            </text>
          </svg>
        </div>
      </div>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Begründen Sie, welche Gleichung zu <InlineMath math="g" /> bzw.{' '}
            <InlineMath math="h" /> gehört.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`h: y=${pp(data.mh)}x${pp(data.bh, 'merge_op')}\\ (m>0)`}
            />
            <br />
            <InlineMath
              math={`g: y=${pp(data.mg)}x${pp(data.bg, 'merge_op')}\\ (m<0)`}
            />
          </>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Gerade <InlineMath math="k" /> schneidet <InlineMath math="h" /> in{' '}
            <InlineMath math={`S(${pp(data.Sx)}\\mid ${pp(data.Sy)})`} />.
            Zeichnen Sie <InlineMath math="k" /> und bestimmen Sie ihre
            Gleichung.
          </p>
        )
      },
      solution({ data }) {
        const xs: number[] = []
        for (let x = -2; x <= 8; x += 0.1) xs.push(+x.toFixed(1))
        const pathK = xs
          .map(x => `${toX(x)},${toY(data.mk * x + data.bk)}`)
          .join(' ')
        const pathH = xs
          .map(x => `${toX(x)},${toY(data.mh * x + data.bh)}`)
          .join(' ')
        const pathG = xs
          .map(x => `${toX(x)},${toY(data.mg * x + data.bg)}`)
          .join(' ')
        return (
          <div className="space-y-2">
            {buildEquation([
              ['Formel', '', 'y=m\\,x+b'],
              [
                'Einsetzen',
                '\\Rightarrow',
                `b=y_S-m\\,x_S=${pp(data.Sy)}-${pp(data.mk)}\\cdot${pp(data.Sx)}=${pp(data.bk)}`,
              ],
              [
                'Lösen',
                '\\Rightarrow',
                `k: y=${pp(data.mk)}x${pp(data.bk, 'merge_op')}`,
              ],
            ])}
            <svg viewBox="0 0 328 328" width="328" height="328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                width="328"
                height="328"
              />
              <polyline
                points={pathG}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <polyline
                points={pathH}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <polyline
                points={pathK}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <circle cx={toX(data.Sx)} cy={toY(data.Sy)} r="3" />
            </svg>
          </div>
        )
      },
    },
  ],
}
