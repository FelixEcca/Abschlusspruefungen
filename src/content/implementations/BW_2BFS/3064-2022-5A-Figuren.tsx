// =====================================
// 5A (3064) – Figuren auf Raster (1 cm)
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // Rastergröße
  w: number
  h: number
  // Dreieck (für Pythagoras)
  T: { A: [number, number]; B: [number, number]; C: [number, number] }
  // Trapez (für Winkel α an linker Seite)
  Z: {
    A: [number, number]
    B: [number, number]
    C: [number, number]
    D: [number, number]
  }
}

export const exercise3064: Exercise<DATA> = {
  title: 'Figuren',
  source: '2022 Wahlteil Aufgabe 5A',
  useCalculator: true,
  duration: 16,

  generator(rng) {
    const w = 16,
      h = 12
    // Dreieck mit rechten Winkel an A, Katheten ganzzahlig
    const A: [number, number] = [
      rng.randomIntBetween(2, 5),
      rng.randomIntBetween(6, 9),
    ]
    const B: [number, number] = [A[0] + rng.randomIntBetween(3, 6), A[1]]
    const C: [number, number] = [A[0], A[1] - rng.randomIntBetween(2, 5)]
    // Trapez: obere Kante parallel zur unteren
    const x0 = rng.randomIntBetween(8, 11),
      y0 = rng.randomIntBetween(5, 7)
    const base = rng.randomIntBetween(5, 7),
      top = rng.randomIntBetween(3, 5),
      height = rng.randomIntBetween(3, 4)
    const A2: [number, number] = [x0, y0]
    const B2: [number, number] = [x0 + base, y0]
    const D2: [number, number] = [x0 + rng.randomIntBetween(0, 2), y0 - height]
    const C2: [number, number] = [D2[0] + top, y0 - height]
    return { w, h, T: { A, B, C }, Z: { A: A2, B: B2, C: C2, D: D2 } }
  },

  // Original: frei, hier nur Beispielwerte für Vorschau
  originalData: {
    w: 16,
    h: 12,
    T: { A: [3, 8], B: [9, 8], C: [3, 5] },
    Z: { A: [10, 6], B: [16, 6], C: [14, 3], D: [11, 3] },
  },

  constraint() {
    return true
  },

  intro() {
    return (
      <p>
        Ein Kästchen entspricht 1 cm. Bestimmen Sie an einem Dreieck die
        fehlende Seite <InlineMath math="a" /> (Satz des Pythagoras) und an
        einem Trapez den Winkel <InlineMath math="\\alpha" /> an der linken
        Schräge (Winkelfunktion).
      </p>
    )
  },

  tasks: [
    {
      points: 8,
      intro() {
        return (
          <p>
            <b>1.</b> Raster & Figuren (Dreieck und Trapez).
          </p>
        )
      },
      task({ data }) {
        // Hilfsfunktionen
        const grid = []
        for (let x = 0; x <= data.w; x++) {
          grid.push(
            <line
              key={'vx' + x}
              x1={10 + x * 18}
              y1={10}
              x2={10 + x * 18}
              y2={10 + data.h * 18}
              stroke="#ddd"
            />,
          )
        }
        for (let y = 0; y <= data.h; y++) {
          grid.push(
            <line
              key={'hy' + y}
              x1={10}
              y1={10 + y * 18}
              x2={10 + data.w * 18}
              y2={10 + y * 18}
              stroke="#ddd"
            />,
          )
        }
        const P = (p: [number, number]) =>
          [10 + p[0] * 18, 10 + (data.h - p[1]) * 18].join(',')
        const tri = `${P(data.T.A)} ${P(data.T.B)} ${P(data.T.C)} ${P(data.T.A)}`
        const trap = `${P(data.Z.A)} ${P(data.Z.B)} ${P(data.Z.C)} ${P(data.Z.D)} ${P(data.Z.A)}`
        return (
          <svg
            viewBox={`0 0 ${10 + data.w * 18 + 10} ${10 + data.h * 18 + 10}`}
            width="360"
            className="border rounded"
          >
            {grid}
            <polyline points={tri} fill="none" stroke="black" strokeWidth={2} />
            <polyline
              points={trap}
              fill="none"
              stroke="black"
              strokeWidth={2}
            />
            <text x="14" y="18" fontSize="10" fill="#666">
              Grid 1 cm
            </text>
          </svg>
        )
      },
      solution({ data }) {
        // Dreieck: rechtes an A
        const dxAB = data.T.B[0] - data.T.A[0]
        const dyAC = data.T.A[1] - data.T.C[1]
        const a = Math.hypot(dxAB, dyAC)
        // Trapez: α am linken Schenkel DA
        const dx = data.Z.A[0] - data.Z.D[0]
        const dy = data.Z.D[1] - data.Z.A[1]
        const alpha = (Math.atan2(dy, dx) * 180) / Math.PI
        return (
          <div className="space-y-1">
            <InlineMath
              math={`a=\\sqrt{${pp(dxAB)}^{2}+${pp(dyAC)}^{2}}=${pp(Math.round(a * 100) / 100)}\\,\\text{cm}`}
            />
            <br />
            <InlineMath
              math={`\\alpha=\\arctan\\!\\left(\\tfrac{${pp(Math.abs(dy))}}{${pp(Math.abs(dx))}}\\right)\\approx ${pp(Math.round(Math.abs(alpha) * 100) / 100)}^{\\circ}`}
            />
          </div>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>2.</b> Geben Sie an, welche der beiden Figuren zueinander ähnlich
            oder kongruent sein könnten.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Die beiden gezeichneten Figuren (Dreieck/Trapez) sind weder
            kongruent noch ähnlich – unterschiedliche Form.
          </p>
        )
      },
    },
  ],
}
