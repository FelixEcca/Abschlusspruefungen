// ======================================
// 5A — Rechtwinkliges Dreieck ABC
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3114 {
  a: number
  b: number
  c: number
  scaleK: number
}

function tri5a() {
  return {
    base: '30,140 250,140 30,40 30,140',
    B: { x: 30, y: 140 },
    C: { x: 250, y: 140 },
    A: { x: 30, y: 40 },
  }
}

export const exercise3114: Exercise<DATA3114> = {
  title: 'Thales-Nachweis, Winkel α, ähnliche Figur',
  source: '2023 Aufgabe 5A',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const tri = rng.randomItemFromArray([
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [8, 15, 17],
    ])
    const k = rng.randomItemFromArray([1, 2])
    const a = tri[0] * k,
      b = tri[1] * k,
      c = tri[2] * k
    const scaleK = rng.randomItemFromArray([0.5, 0.6, 0.7, 0.8])
    return { a, b, c, scaleK }
  },

  // Original ohne Zahlen → „nettes“ Beispiel
  originalData: { a: 6, b: 8, c: 10, scaleK: 0.6 },

  constraint({ data }) {
    return Math.abs(data.a ** 2 + data.b ** 2 - data.c ** 2) < 1e-9
  },

  intro({ data }) {
    const S = tri5a()
    return (
      <>
        <p>
          Gegeben ist das rechtwinklige Dreieck <InlineMath math="ABC" />{' '}
          (rechter Winkel bei <InlineMath math="B" />
          ).
        </p>
        <svg viewBox="0 0 280 180">
          <polyline
            points={S.base}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <polyline
            points="30,140 50,140 50,120"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <text x={140} y={158}>
            {pp(data.b)} cm
          </text>
          <text x={6} y={100} transform="rotate(-90 10,90)">
            {pp(data.a)} cm
          </text>
          <text x={120} y={80}>
            {pp(data.c)} cm
          </text>
        </svg>
      </>
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
            Beschreiben Sie, wie man mit dem Thaleskreis zeigt, dass{' '}
            <InlineMath math="\\beta" /> ein rechter Winkel ist.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Kreis mit Durchmesser <InlineMath math="AC" /> zeichnen
            (Thaleskreis). Punkt <InlineMath math="B" /> liegt auf dem Halbkreis
            ⇒ Winkel bei <InlineMath math="B" /> ist 90°.
          </p>
        )
      },
    },
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie <InlineMath math="\\alpha" /> (auf 2 Dez.) und
            zeichnen Sie eine <b>ähnliche, kleinere</b> Figur mit demselben
            Eckpunkt <InlineMath math="C" />.
          </p>
        )
      },
      solution({ data }) {
        const alpha = (Math.atan(data.b / data.a) * 180) / Math.PI
        const S = tri5a(),
          k = data.scaleK
        const A1 = {
          x: S.C.x + k * (S.A.x - S.C.x),
          y: S.C.y + k * (S.A.y - S.C.y),
        }
        const B1 = {
          x: S.C.x + k * (S.B.x - S.C.x),
          y: S.C.y + k * (S.B.y - S.C.y),
        }
        const path = `${B1.x},${B1.y} ${S.C.x},${S.C.y} ${A1.x},${A1.y} ${B1.x},${B1.y}`
        return (
          <div className="space-y-2">
            <InlineMath
              math={`\\tan(\\alpha)=\\tfrac{BC}{AB}=\\tfrac{${pp(data.b)}}{${pp(data.a)}}\\Rightarrow\\alpha\\approx ${pp(Math.round(alpha * 100) / 100)}^{\\circ}`}
            />
            <svg viewBox="0 0 280 180">
              <polyline
                points={S.base}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <polyline
                points="30,140 50,140 50,120"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <polyline
                points={path}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx={S.C.x} cy={S.C.y} r="3" />
            </svg>
            <p>
              Fläche skaliert mit <InlineMath math="k^2" />; hier{' '}
              <InlineMath math={`k=${pp(k)}`} /> ⇒ kleiner.
            </p>
          </div>
        )
      },
    },
  ],
}
