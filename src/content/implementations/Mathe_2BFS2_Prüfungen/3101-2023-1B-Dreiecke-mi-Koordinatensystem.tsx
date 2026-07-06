import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Pt = { x: number; y: number }

interface DATA {
  A: Pt
  B: Pt
  C: Pt

  P: Pt
  Q: Pt
  R: Pt

  S: Pt
  P3: Pt
  Q3: Pt
  R3: Pt

  a1: Pt
  a2: Pt

  r1: number
  r2: number
}

function dist(u: Pt, v: Pt) {
  const dx = u.x - v.x
  const dy = u.y - v.y
  return Math.sqrt(dx * dx + dy * dy)
}

function reflect(p: Pt, s: Pt): Pt {
  return { x: 2 * s.x - p.x, y: 2 * s.y - p.y }
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function findMatchingSide(data: DATA) {
  const lenA = dist(data.a1, data.a2)

  const candidates = [
    {
      name: 'AB',
      len: dist(data.A, data.B),
      left: data.A,
      right: data.B,
      third: data.C,
    },
    {
      name: 'BC',
      len: dist(data.B, data.C),
      left: data.B,
      right: data.C,
      third: data.A,
    },
    {
      name: 'CA',
      len: dist(data.C, data.A),
      left: data.C,
      right: data.A,
      third: data.B,
    },
  ]

  let best = candidates[0]
  let bestDiff = Math.abs(candidates[0].len - lenA)

  for (const c of candidates) {
    const diff = Math.abs(c.len - lenA)
    if (diff < bestDiff) {
      best = c
      bestDiff = diff
    }
  }

  return best
}

function constructCongruentTriangleOnSegment(data: DATA) {
  const match = findMatchingSide(data)

  const rLeft = dist(match.left, match.third)
  const rRight = dist(match.right, match.third)

  const U = data.a1
  const V = data.a2
  const L = dist(U, V)

  const a = (rLeft * rLeft - rRight * rRight + L * L) / (2 * L)
  const h2 = Math.max(0, rLeft * rLeft - a * a)
  const h = Math.sqrt(h2)

  const dx = V.x - U.x
  const dy = V.y - U.y
  const ux = dx / L
  const uy = dy / L

  const mx = U.x + a * ux
  const my = U.y + a * uy

  const nx = -uy
  const ny = ux

  const c1 = { x: mx + h * nx, y: my + h * ny }
  const c2 = { x: mx - h * nx, y: my - h * ny }

  // wähle den Punkt, der höher liegt
  const T = c1.y >= c2.y ? c1 : c2

  return { T, match }
}

export const exercise3101: Exercise<DATA> = {
  title: 'Dreiecke im Koordinatensystem',
  source: '2023 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    const L = rng.randomIntBetween(2, 4)
    const x0 = rng.randomIntBetween(-6, -3 - L)
    const y0 = rng.randomIntBetween(-4, -2)
    const A: Pt = { x: x0, y: y0 }
    const B: Pt = { x: x0 + L, y: y0 }
    const cx = x0 + rng.randomIntBetween(0, L)
    const cy = y0 - rng.randomIntBetween(1, 3)
    const C: Pt = { x: cx, y: cy }

    const r1 = dist(A, C)
    const r2 = dist(B, C)

    function randPtBR(): Pt {
      return { x: rng.randomIntBetween(0, 4), y: rng.randomIntBetween(-4, -1) }
    }

    let P = randPtBR(),
      Q = randPtBR(),
      R = randPtBR()

    const collinear = (U: Pt, V: Pt, W: Pt) =>
      (V.x - U.x) * (W.y - U.y) === (V.y - U.y) * (W.x - U.x)

    while (collinear(P, Q, R)) {
      P = randPtBR()
      Q = randPtBR()
      R = randPtBR()
    }

    const S: Pt = {
      x: rng.randomIntBetween(-2, -1),
      y: 1,
    }

    const P3 = reflect(P, S)
    const Q3 = reflect(Q, S)
    const R3 = reflect(R, S)

    // Strecke a soll kongruent zu AB sein
    const a1 = { x: 2, y: 2 }
    const a2 = { x: 2 + L, y: 2 }

    return { A, B, C, P, Q, R, S, P3, Q3, R3, a1, a2, r1, r2 }
  },

  originalData: {
    A: { x: -4, y: -1 },
    B: { x: -2, y: -4 },
    C: { x: -1, y: -3 },

    P: { x: 0, y: -2 },
    Q: { x: 2, y: -4 },
    R: { x: 3, y: 1 },

    S: { x: -1, y: 1 },
    P3: { x: -2, y: 4 },
    Q3: { x: -4, y: 6 },
    R3: { x: -5, y: 1 },

    // Länge sqrt(13), passend zu AB und AC
    a1: { x: 2, y: 1 },
    a2: { x: 1, y: 2 },

    r1: dist({ x: -4, y: -1 }, { x: -1, y: -3 }),
    r2: dist({ x: -2, y: -4 }, { x: -1, y: -3 }),
  },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <>
        <p>
          Gegeben sind die Dreiecke <InlineMath math="D_1" />,{' '}
          <InlineMath math="D_2" /> und <InlineMath math="D_3" /> im
          Koordinatensystem. Die Strecke <InlineMath math="a" /> liegt rechts
          oben.
        </p>
        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />

          <polyline
            points={[
              `${toX(data.A.x)},${toY(data.A.y)}`,
              `${toX(data.B.x)},${toY(data.B.y)}`,
              `${toX(data.C.x)},${toY(data.C.y)}`,
              `${toX(data.A.x)},${toY(data.A.y)}`,
            ].join(' ')}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
          <text
            x={toX(data.A.x) - 8}
            y={toY(data.A.y) + 16}
            fontSize={14}
            stroke="blue"
          >
            D₁
          </text>

          <polyline
            points={[
              `${toX(data.P.x)},${toY(data.P.y)}`,
              `${toX(data.Q.x)},${toY(data.Q.y)}`,
              `${toX(data.R.x)},${toY(data.R.y)}`,
              `${toX(data.P.x)},${toY(data.P.y)}`,
            ].join(' ')}
            stroke="green"
            strokeWidth="2"
            fill="none"
          />
          <text
            x={toX(data.Q.x) + 8}
            y={toY(data.Q.y) + 16}
            fontSize={14}
            stroke="green"
          >
            D₂
          </text>

          <polyline
            points={[
              `${toX(data.P3.x)},${toY(data.P3.y)}`,
              `${toX(data.Q3.x)},${toY(data.Q3.y)}`,
              `${toX(data.R3.x)},${toY(data.R3.y)}`,
              `${toX(data.P3.x)},${toY(data.P3.y)}`,
            ].join(' ')}
            stroke="purple"
            strokeWidth="2"
            fill="none"
          />
          <text
            x={toX(data.P3.x) - 10}
            y={toY(data.P3.y) - 8}
            fontSize={14}
            stroke="purple"
          >
            D₃
          </text>

          <line
            x1={toX(data.a1.x)}
            y1={toY(data.a1.y)}
            x2={toX(data.a2.x)}
            y2={toY(data.a2.y)}
            stroke="blue"
            strokeWidth="2"
          />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Die Strecke <InlineMath math="a" /> soll die Seite eines Dreiecks
              sein, das zu <InlineMath math="D_1" /> kongruent ist. Zeichnen Sie
              die beiden anderen Seiten des Dreiecks ein.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { T, match } = constructCongruentTriangleOnSegment(data)

        return (
          <>
            <p>
              Zuerst wird geschaut, zu welcher Seite von{' '}
              <InlineMath math="D_1" /> die Strecke <InlineMath math="a" />{' '}
              passt.
            </p>
            <p>
              Hier ist <InlineMath math="a" /> genauso lang wie die Seite{' '}
              <InlineMath math={match.name} />.
            </p>
            <p>
              Von den Endpunkten der Strecke <InlineMath math="a" /> werden
              Kreise mit den beiden anderen Seitenlängen geschlagen. Der
              Schnittpunkt liefert die dritte Ecke.
            </p>
            <p>Das Dreieck könnte so aussehen:</p>

            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />

              <polyline
                points={[
                  `${toX(data.A.x)},${toY(data.A.y)}`,
                  `${toX(data.B.x)},${toY(data.B.y)}`,
                  `${toX(data.C.x)},${toY(data.C.y)}`,
                  `${toX(data.A.x)},${toY(data.A.y)}`,
                ].join(' ')}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />

              <polyline
                points={[
                  `${toX(data.P.x)},${toY(data.P.y)}`,
                  `${toX(data.Q.x)},${toY(data.Q.y)}`,
                  `${toX(data.R.x)},${toY(data.R.y)}`,
                  `${toX(data.P.x)},${toY(data.P.y)}`,
                ].join(' ')}
                stroke="green"
                strokeWidth="2"
                fill="none"
              />

              <polyline
                points={[
                  `${toX(data.P3.x)},${toY(data.P3.y)}`,
                  `${toX(data.Q3.x)},${toY(data.Q3.y)}`,
                  `${toX(data.R3.x)},${toY(data.R3.y)}`,
                  `${toX(data.P3.x)},${toY(data.P3.y)}`,
                ].join(' ')}
                stroke="purple"
                strokeWidth="2"
                fill="none"
              />

              <line
                x1={toX(data.a1.x)}
                y1={toY(data.a1.y)}
                x2={toX(data.a2.x)}
                y2={toY(data.a2.y)}
                stroke="blue"
                strokeWidth="2"
              />

              <polyline
                points={[
                  `${toX(data.a1.x)},${toY(data.a1.y)}`,
                  `${toX(data.a2.x)},${toY(data.a2.y)}`,
                  `${toX(T.x)},${toY(T.y)}`,
                  `${toX(data.a1.x)},${toY(data.a1.y)}`,
                ].join(' ')}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
    },

    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              <InlineMath math="D_3" /> geht aus <InlineMath math="D_2" /> durch
              Punktspiegelung hervor. Ermitteln Sie die Koordinaten des
              Spiegelpunkts.
            </p>
          </>
        )
      },
      solution({ data }) {
        const Sx = (data.P.x + data.P3.x) / 2
        const Sy = (data.P.y + data.P3.y) / 2
        return (
          <>
            <p>
              Bei einer Punktspiegelung liegt der Spiegelpunkt in der Mitte von
              zwei gespiegelten Punkten. Zum Beispiel von{' '}
              <InlineMath math="P" /> und <InlineMath math="P'" />.
            </p>
            <p>
              Damit ist{' '}
              <b>
                <InlineMath math={`S(${pp(Sx)}|${pp(Sy)})`} />
              </b>
              .
            </p>
          </>
        )
      },
    },

    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Begründen Sie, ob <InlineMath math="D_1" /> und{' '}
              <InlineMath math="D_3" /> ähnlich zueinander sind.
            </p>
          </>
        )
      },
      solution({ data }) {
        const d1 = [
          dist(data.A, data.B),
          dist(data.B, data.C),
          dist(data.C, data.A),
        ].sort((u, v) => u - v)

        const d3 = [
          dist(data.P3, data.Q3),
          dist(data.Q3, data.R3),
          dist(data.R3, data.P3),
        ].sort((u, v) => u - v)

        const r1 = d1[0] / d3[0]
        const r2 = d1[1] / d3[1]
        const r3 = d1[2] / d3[2]
        const similar = Math.abs(r1 - r2) < 1e-6 && Math.abs(r2 - r3) < 1e-6

        return (
          <>
            <p>
              {similar
                ? 'D₁ und D₃ sind ähnlich.'
                : 'D₁ und D₃ sind nicht ähnlich.'}
            </p>
            <p>
              Das erkennt man daran, dass die entsprechenden Seitenverhältnisse{' '}
              {similar ? 'gleich sind' : 'nicht gleich sind'}.
            </p>
          </>
        )
      },
    },
  ],
}
