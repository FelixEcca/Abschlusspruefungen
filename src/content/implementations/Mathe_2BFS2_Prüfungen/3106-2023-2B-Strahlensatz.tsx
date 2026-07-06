// ===============================
// 2B — Strahlensatz (A–C, y, α)
// ===============================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface Statement {
  id: 'A' | 'B' | 'C'
  latex: string
  correct: boolean
}

interface DATA3106 {
  a: number // linke obere Strecke
  b: number // linke untere Strecke
  rRight: number // rechte gegebene Strecke (unten)
  statements: Statement[] // drei Aussagen in zufälliger Reihenfolge
}

export const exercise3106: Exercise<DATA3106> = {
  title: 'Strahlensatz',
  source: '2023 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const a = rng.randomIntBetween(4, 8)
    const b = rng.randomIntBetween(3, 7)
    const rRight = rng.randomIntBetween(4, 8)

    // y ist NUR der kurze obere Abschnitt auf der mittleren Transversalen.
    // Korrekte Relationen (je nach betrachteten Abschnitten):
    // 1)  y / r = a / b
    // 2) (y + r) / r = (a + b) / b
    // 3)  y / (y + r) = a / (a + b)
    const pool = [
      {
        latex: `\\dfrac{y+${rRight}}{${rRight}}=\\dfrac{${a}}{${b}}`,
        correct: true,
      },
      {
        latex: `\\dfrac{y+${rRight}}{${rRight}}=\\dfrac{${a}+${b}}{${b}}`,
        correct: false,
      },

      { latex: `\\dfrac{y}{${rRight}}=\\dfrac{${b}}{${a}}`, correct: false },
      {
        latex: `\\dfrac{${rRight}}{y+${rRight}}=\\dfrac{${b}}{${a}}`,
        correct: true,
      },
      {
        latex: `\\dfrac{y+${rRight}}{${rRight}}=\\dfrac{${a}}{${b} + y}`,
        correct: false,
      },
    ]

    // zufällig 3 auswählen (mindestens eine richtige)
    const shuffled = [...pool].sort(() => (rng.randomIntBetween(0, 1) ? 1 : -1))
    let chosen = shuffled.slice(0, 3)
    if (!chosen.some(s => s.correct)) {
      chosen[2] = pool.find(s => s.correct)!
    }
    // zufällige Beschriftung A–C
    const labels: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C']
    const order = labels.sort(() => (rng.randomIntBetween(0, 1) ? 1 : -1))
    const statements: Statement[] = chosen.map((s, i) => ({
      id: order[i],
      latex: s.latex,
      correct: s.correct,
    }))

    return { a, b, rRight, statements }
  },

  // Originalwerte (wie im Scan)
  originalData: {
    a: 5,
    b: 3,
    rRight: 6,
    statements: [
      { id: 'A', latex: `\\dfrac{y}{6}=\\dfrac{5}{3}`, correct: false },
      { id: 'B', latex: `\\dfrac{6}{y+6}=\\dfrac{3}{5}`, correct: true },
      { id: 'C', latex: `\\dfrac{y+6}{6}=\\dfrac{5}{3}`, correct: true },
    ],
  },

  constraint({ data }) {
    const y = data.rRight * (data.a / data.b) - data.rRight
    return (
      data.b !== 0 && data.statements.length === 3 && (y * 2) % 1 === 0 && y > 0
    )
  },

  intro({ data }) {
    // Bild + Aussagen (A)–(C) in zufälliger Reihenfolge
    const sorted = [...data.statements].sort((s1, s2) =>
      s1.id < s2.id ? -1 : 1,
    )
    return (
      <>
        <p>Die Geraden f und g sind parallel.</p>
        {/* Grafik mit eingeblendeten Längenangaben wie im Original */}
        <svg viewBox="0 0 328 180" width="328" height="180">
          <image
            href="/content/Mathe_2BFS2/3106.png"
            height="180"
            width="328"
          />
          {/* Wertepositionen grob wie im Scan */}
          <text x="65" y="90" fontSize="16" stroke="black" textAnchor="middle">
            {pp(data.a)}
          </text>
          <text
            x="145"
            y="110"
            fontSize="16"
            stroke="black"
            textAnchor="middle"
          >
            {pp(data.b)}
          </text>
          <text x="250" y="90" fontSize="16" stroke="black" textAnchor="middle">
            {pp(data.rRight)}
          </text>
          <text x="40" y="165" fontSize="16" stroke="black" textAnchor="middle">
            f
          </text>
        </svg>
        <div className="mt-2 space-y-1">
          {sorted.map(s => (
            <div key={s.id}>
              ({s.id}) <InlineMath math={s.latex} />
            </div>
          ))}
        </div>
      </>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Geben Sie die diejenigen Gleichungen aus (A) bis (C) an, die zur
              abgebildeten Strahlensatzfigur passen.
            </p>
          </>
        )
      },
      solution({ data }) {
        // kurze Vorgehens-Erklärung
        const correctIds = data.statements
          .filter(s => s.correct)
          .map(s => s.id)
          .sort()
          .join(', ')
        return (
          <div className="space-y-2">
            <p>Korrekt: ({correctIds})</p>
          </div>
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
          <>
            <p>
              Berechnen Sie die Länge der Strecke <InlineMath math="y" />.
            </p>
          </>
        )
      },
      solution({ data }) {
        // y ist der kurze obere Abschnitt; nutze die Relation y/r = a/b
        const y = data.rRight * (data.a / data.b) - data.rRight
        return (
          <>
            <p>Mit dem Strahlensatz gilt:</p>
            <div className="space-y-2">
              <BlockMath
                math={String.raw`
              \begin{aligned}
              \frac{y + ${pp(data.rRight)}}{${pp(data.rRight)}}&=\frac{${pp(data.a)}}{${pp(
                data.b,
              )}}\\
              y + ${pp(data.rRight)}&=${pp(data.rRight)}\cdot\frac{${pp(data.a)}}{${pp(data.b)}}\\
              y&=${pp(data.rRight)}\cdot\frac{${pp(data.a)}}{${pp(data.b)}} - ${pp(data.rRight)}\\
              y
              &=${pp(y)}\\
              \end{aligned}
            `}
              />
            </div>
          </>
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
            Berechnen Sie die Größe des Winkels <InlineMath math="\alpha" /> .
          </p>
        )
      },
      solution({ data }) {
        const y = data.rRight * (data.a / data.b) - data.rRight
        const alpha = (Math.atan((y + data.rRight) / data.a) * 180) / Math.PI
        return (
          <div className="space-y-2">
            {/* Grafik erneut mit Herkunft von a (Gegenkathete) und b (Ankathete) */}
            <svg viewBox="0 0 328 180" width="328" height="180">
              <image
                href="/content/Mathe_2BFS2/3106.png"
                height="180"
                width="328"
              />
              {/* Wertepositionen grob wie im Scan */}
              <text
                x="65"
                y="90"
                fontSize="16"
                stroke="black"
                textAnchor="middle"
              >
                {pp(data.a)}
              </text>
              <text
                x="145"
                y="110"
                fontSize="16"
                stroke="black"
                textAnchor="middle"
              >
                {pp(data.b)}
              </text>
              <text
                x="250"
                y="90"
                fontSize="16"
                stroke="black"
                textAnchor="middle"
              >
                {pp(data.rRight)}
              </text>
              <text
                x="40"
                y="165"
                fontSize="16"
                stroke="black"
                textAnchor="middle"
              >
                f
              </text>
            </svg>
            <p>
              Im großen Dreieck ist die Gegenkathete:<br></br> y +{' '}
              {pp(data.rRight)} = {pp(y + data.rRight)}
            </p>
            <p>Die Ankathete ist: {pp(data.a)}</p>
            <InlineMath
              math={`\\tan(\\alpha)=\\dfrac{\\text{Gegenkathete}}{\\text{Ankathete}}=\\dfrac{${pp(y + data.rRight)}}{${pp(data.a)}}`}
            />
            <br />
            <br />
            <InlineMath
              math={`\\alpha = \\tan^{-1}\\left(\\dfrac{${pp(y + data.rRight)}}{${pp(data.a)}}\\right) \\approx ${pp(
                Math.round(alpha * 100) / 100,
              )}^{\\circ}`}
            />
            <p>
              Im kleinen Dreieck lässt sich <InlineMath math={`\\alpha`} /> auch
              berechnen.
            </p>
          </div>
        )
      },
    },
  ],
}
