import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Pt = { x: number; y: number }

interface DATA {
  // Dreieck D1 (unten links), mit einer horizontalen Seite (A-B)
  A: Pt
  B: Pt
  C: Pt
  // Dreieck D2 (unten rechts)
  P: Pt
  Q: Pt
  R: Pt
  // Spiegelpunkt S, daraus D3 = Spiegelung von D2 an S (oben links)
  S: Pt
  P3: Pt
  Q3: Pt
  R3: Pt
  // Strecke a (oben rechts), horizontal, Länge |AB|
  a1: Pt
  a2: Pt
  // Radien für die Kongruenz-Konstruktion zu D1
  r1: number // |AC|
  r2: number // |BC|
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

export const exercise3051: Exercise<DATA> = {
  title: 'Dreiecke im Koordinatensystem',
  source: '2022 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    // --- D1: unten links, horizontale Seite AB mit ganzzahliger Länge L ---
    const L = rng.randomIntBetween(2, 4)
    const x0 = rng.randomIntBetween(-6, -3 - L) // genug Platz für AB
    const y0 = rng.randomIntBetween(-4, -2)
    const A: Pt = { x: x0, y: y0 }
    const B: Pt = { x: x0 + L, y: y0 }
    // C nicht kollinear: etwas unterhalb, x zwischen A und B (oder leicht daneben)
    const cx = x0 + rng.randomIntBetween(0, L)
    const cy = y0 - rng.randomIntBetween(1, 3)
    const C: Pt = { x: cx, y: cy }

    const r1 = dist(A, C)
    const r2 = dist(B, C)

    // --- D2: unten rechts (beliebiges, nicht-degeneriertes Dreieck) ---
    function randPtBR(): Pt {
      return { x: rng.randomIntBetween(0, 4), y: rng.randomIntBetween(-4, -1) }
    }
    let P = randPtBR(),
      Q = randPtBR(),
      R = randPtBR()
    // sichere Nichtkollinearität
    const collinear = (U: Pt, V: Pt, W: Pt) =>
      (V.x - U.x) * (W.y - U.y) === (V.y - U.y) * (W.x - U.x)
    while (collinear(P, Q, R)) {
      P = randPtBR()
      Q = randPtBR()
      R = randPtBR()
    }

    // --- Spiegelpunkt S (oben links) und D3 als Spiegel von D2 an S ---
    const S: Pt = {
      x: rng.randomIntBetween(-2, -1),
      y: rng.randomIntBetween(1, 1),
    }
    const P3 = reflect(P, S)
    const Q3 = reflect(Q, S)
    const R3 = reflect(R, S)

    // --- Strecke a (oben rechts), horizontal mit Länge L = |AB| ---
    const ay = rng.randomIntBetween(1, 2) // y zwischen 1 und 2
    const ax = rng.randomIntBetween(1, 2) // Start rechts vom Ursprung
    const a1 = { x: ax, y: ay }
    const a2 = { x: ax + L, y: ay }

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
    Q3: { x: -5, y: 1 },
    R3: { x: -4, y: 6 },
    a1: { x: 2, y: 1 },
    a2: { x: 1, y: 2 },
    r1: 3.6, // |AC|
    r2: 1.41, // |BC|
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
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          {/* D1 (unten links) */}
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

          {/* D2 (unten rechts) */}
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

          {/* D3 (oben links) = Spiegel von D2 an S */}
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

          {/* Strecke a (oben rechts) */}
          <line
            x1={toX(data.a1.x)}
            y1={toY(data.a1.y)}
            x2={toX(data.a2.x)}
            y2={toY(data.a2.y)}
            stroke="black"
            strokeWidth="3"
          />
          <text
            x={toX((data.a1.x + data.a2.x) / 2) - 10}
            y={toY(data.a1.y) + 10}
            fontSize={14}
            stroke="black"
          >
            a
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    // 1
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
        // Konstruktion: Kreise um a1 mit Radius |AC| und um a2 mit Radius |BC|
        // Schnittpunkt (oberhalb der Strecke a) ist der dritte Punkt C*.
        const L = dist(data.a1, data.a2)
        const a = (data.r1 * data.r1 - data.r2 * data.r2 + L * L) / (2 * L)
        const h2 = Math.max(0, data.r1 * data.r1 - a * a)
        const h = Math.sqrt(h2)
        const Cx = data.a1.x + a
        const Cy = data.a1.y + h // oberer Schnittpunkt

        return (
          <>
            <p>
              Kongruent heißt, dass die Dreiecke die gleichen Seitenlängen
              haben.
            </p>
            <p>Das Dreieck könnte so aussehen:</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              {/* D1 (unten links) */}
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

              {/* D2 (unten rechts) */}
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

              {/* D3 (oben links) = Spiegel von D2 an S */}
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
              {/* Strecke a */}
              <line
                x1={toX(data.a1.x)}
                y1={toY(data.a1.y)}
                x2={toX(data.a2.x)}
                y2={toY(data.a2.y)}
                stroke="black"
                strokeWidth="3"
              />
              {/* Konstruktionskreise (gestrichelt) */}

              <polyline
                points={[
                  `${toX(data.a1.x)},${toY(data.a1.y)}`,
                  `${toX(data.a2.x)},${toY(data.a2.y)}`,
                  `${toX(Cx)},${toY(Cy)}`,
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

    // 2
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
        // Nachweis/Ermittlung: Mittelpunkt je eines zugehörigen Punktpaares
        const Sx = (data.P.x + data.P3.x) / 2
        const Sy = (data.P.y + data.P3.y) / 2
        return (
          <>
            <p>
              Bei einer Punktspiegelung liegt der Spiegelpunkt in der Mitte von
              zwei gespiegelten Punkten. Z. B. aus <InlineMath math="P" /> und{' '}
              <InlineMath math="P'" />:
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />

              {/* D2 */}
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

              {/* D3 */}
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

              {/* Verbindung P -- P' */}
              <line
                x1={toX(data.P.x)}
                y1={toY(data.P.y)}
                x2={toX(data.P3.x)}
                y2={toY(data.P3.y)}
                stroke="orange"
                strokeWidth="2"
                strokeDasharray="6,6"
              />

              {/* Punkt P */}
              <circle
                cx={toX(data.P.x)}
                cy={toY(data.P.y)}
                r="4"
                fill="green"
              />
              <text
                x={toX(data.P.x) + 8}
                y={toY(data.P.y) - 6}
                fontSize={14}
                stroke="green"
              >
                P
              </text>

              {/* Punkt P' */}
              <circle
                cx={toX(data.P3.x)}
                cy={toY(data.P3.y)}
                r="4"
                fill="purple"
              />
              <text
                x={toX(data.P3.x) + 8}
                y={toY(data.P3.y) - 6}
                fontSize={14}
                stroke="purple"
              >
                P&apos;
              </text>

              {/* Spiegelpunkt S */}
              <circle cx={toX(Sx)} cy={toY(Sy)} r="4" fill="red" />
              <text x={toX(Sx) + 8} y={toY(Sy) - 6} fontSize={14} stroke="red">
                S
              </text>
            </svg>
            <p>
              Damit ist{' '}
              <b>
                <InlineMath math={`S( ${pp(Sx)} | ${pp(Sy)} )`} />
              </b>
              .
            </p>
          </>
        )
      },
    },

    // 3
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
        // Seitenlängen D1
        const d1 = [
          dist(data.A, data.B),
          dist(data.B, data.C),
          dist(data.C, data.A),
        ].sort((u, v) => u - v)
        // Seitenlängen D3
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
                ? 'D₁ und D₃ sind hier ähnlich. '
                : 'D₁ und D₃ sind nicht ähnlich.'}
            </p>
            <p>
              Das lässt sich entweder durch die Winkel oder die
              Seitenverhältnisse zeigen.
            </p>
          </>
        )
      },
    },
  ],
}
