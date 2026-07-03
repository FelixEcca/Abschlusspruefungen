// ======================================
// 5A — Rechtwinkliges Dreieck ABC
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3114 {
  // Katheten a=AB (senkrecht), b=BC (waagrecht), Hypotenuse c=AC
  a: number
  b: number
  c: number
  // Verkleinerungsfaktor für die ähnliche Figur (0<k<1)
  scaleK: number
}

function tri5a() {
  return {
    // rechtwinklig bei B (30,140), A oben (30,40), C rechts (250,140)
    base: '30,140 250,140 30,40 30,140',
    A: { x: 30, y: 40 },
    B: { x: 30, y: 140 },
    C: { x: 250, y: 140 },
  }
}

export const exercise3114: Exercise<DATA3114> = {
  title: 'Rechtwinkliges Dreieck',
  source: '2023 Wahlteil Aufgabe 5A',
  useCalculator: true,
  duration: 12,
  points: 12,

  generator(rng) {
    // Pythagoreische Tripel → saubere Winkelwerte
    const base = rng.randomItemFromArray([
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [6, 8, 10],
    ])
    const kInt = rng.randomItemFromArray([1, 2]) // ggf. skalieren
    const a = base[0] * kInt
    const b = base[1] * kInt
    const c = base[2] * kInt
    const scaleK = rng.randomItemFromArray([0.5, 0.6, 0.7, 0.8])
    return { a, b, c, scaleK }
  },

  // Original (ohne Zahlen): Beispiel mit 6-8-10
  originalData: { a: 3, b: 6, c: Math.sqrt(3 ** 2 + 6 ** 2), scaleK: 0.6 },

  constraint({ data }) {
    // Pythagoras prüfen
    return Math.abs(data.a ** 2 + data.b ** 2 - data.c ** 2) < 1e-9
  },

  intro({ data }) {
    const S = tri5a()
    return (
      <>
        <p>
          Gegeben ist das rechtwinklige Dreieck <InlineMath math="ABC" />{' '}
          (Rechtwinkel in <InlineMath math="B" />
          ).
        </p>
        {/* Skizze mit Maßen */}
        <svg viewBox="0 0 280 180" className="border rounded">
          <polyline
            points={S.base}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* Seitenbeschriftungen */}
          <text x={6} y={100} fontSize={14} transform="rotate(-90 10,90)">
            {pp(data.a)} cm
          </text>
          <text x={140} y={158} fontSize={14}>
            {pp(data.b)} cm
          </text>

          {/* Eckpunkte */}
          <text x={24} y={38}>
            A
          </text>
          <text x={24} y={156}>
            B
          </text>
          <text x={252} y={156}>
            C
          </text>
          {/* α am Punkt A, β am Punkt B wie im Blatt */}
          <text x={35} y={60}>
            α
          </text>
          <text x={35} y={132}>
            β
          </text>
        </svg>
      </>
    )
  },

  tasks: [
    // (1) Thales-Erklärung
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Mit Hilfe eines Thaleskreises kann man nachweisen, dass der Winkel{' '}
            <InlineMath math="\beta" /> ein rechter Winkel ist. Beschreiben Sie
            die Vorgehensweise.
          </p>
        )
      },
      solution() {
        return (
          <ul className="list-disc ml-5">
            <li>
              Zeichne einen Kreis mit dem Durchmesser <InlineMath math="AC" />,
              sodass A und C jeweils auf dem Kreis liegen.
            </li>
            <li>
              Wenn der Punkt B ebenfalls auf dem Kreis liegt, dann ist der
              Winkel <InlineMath math="\beta" /> ein rechter Winkel (Satz des
              Thales).
            </li>
          </ul>
        )
      },
    },

    // (2) Winkel α berechnen
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie den Winkel <InlineMath math="\alpha" /> (auf zwei
            Dezimalstellen).
          </p>
        )
      },
      solution({ data }) {
        const alpha = (Math.atan(data.b / data.a) * 180) / Math.PI
        const alphaR = Math.round(alpha * 100) / 100
        return (
          <>
            <BlockMath math=" \tan(\alpha)=\dfrac{\text{Gegenkathete}}{\text{Ankathete}}=\dfrac{BC}{AB} " />
            <BlockMath
              math={` \\tan(\\alpha)=\\dfrac{${pp(data.b)}}{${pp(
                data.a,
              )}} \\Rightarrow \\alpha=\\tan^{-1}\\!\\left(\\dfrac{${pp(
                data.b,
              )}}{${pp(data.a)}}\\right)\\approx ${pp(alphaR)}^{\\circ} `}
            />
          </>
        )
      },
    },

    // (3) Ähnliche, nicht kongruente Figur (kleiner)
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Zeichnen Sie eine zur dargestellten Figur ähnliche, aber nicht
            kongruente Figur mit kleinerem Flächeninhalt in die Abbildung ein.
          </p>
        )
      },
      solution({ data }) {
        const S = tri5a()
        const k = data.scaleK
        // neue Punkte durch Zentrierung in C und Skalieren
        const A1 = {
          x: S.C.x + k * (S.A.x - S.C.x),
          y: S.C.y + k * (S.A.y - S.C.y),
        }
        const B1 = {
          x: S.C.x + k * (S.B.x - S.C.x),
          y: S.C.y + k * (S.B.y - S.C.y),
        }
        const pathSmall = `${B1.x},${B1.y} ${S.C.x},${S.C.y} ${A1.x},${A1.y} ${B1.x},${B1.y}`

        return (
          <div className="space-y-2">
            <svg viewBox="0 0 280 180" className="border rounded">
              <polyline
                points={S.base}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />

              <polyline
                points={pathSmall}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx={S.C.x} cy={S.C.y} r="3" />
              <text x={S.C.x + 6} y={S.C.y - 6} fontSize={12}>
                C
              </text>
              {/* D at start of pathSmall (B1) */}
              <text x={B1.x - 5} y={B1.y + 15} fontSize={12}>
                D
              </text>
              {/* E at end of pathSmall (A1) */}
              <text x={A1.x - 5} y={A1.y - 15} fontSize={12}>
                E
              </text>
              <text x={20} y={30} fontSize={12}>
                A
              </text>
              <text x={20} y={160} fontSize={12}>
                B
              </text>
            </svg>
            <p>
              Das Dreieck CDE ist ähnlich zu Dreieck ABC, aber nicht kongruent
              (deckungsgleich).
            </p>
            <p>Es hat außerdem einen kleineren Flächeninhalt.</p>
          </div>
        )
      },
    },
  ],
}
