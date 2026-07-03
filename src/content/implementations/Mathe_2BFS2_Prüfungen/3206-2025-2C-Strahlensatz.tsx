import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

type DATA = {
  // Teil (1) – drei Proportionen (♥, ▲, ♦)
  a1: number
  b1: number
  c1: number //  a1/b1 = c1/♥
  a2: number
  b2: number
  d2: number //  a2/b2 = ▲/d2
  n3: number
  x3: number
  d3: number //  n3/x = ♦/d3

  // Teil (2) – Strecken in der Strahlensatzfigur
  baseLeft: number // z.B. 6.7 cm
  baseRight: number // z.B. 2.7 cm
  segRight: number // gegebene Strecke zwischen m und n auf rechtem Strahl (z.B. 2.0 cm)
  xLen: number // gesuchte Strecke auf linkem Strahl (z.B. 4.9 cm)
  kScale: number
  // Meta
  dp: number // Nachkommastellen fürs Runden
}

export const exercise3206: Exercise<DATA> = {
  title: 'Strahlensatz',
  source: '2025 Wahlteil Aufgabe 2C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // 1-NK Dezimalzahlen
    const dec = (lo: number, hi: number, step10 = 1) =>
      rng.randomIntBetween(Math.round(lo * 10), Math.round(hi * 10), step10) /
      10

    // (1) Proportionen – wie im Original
    const a1 = rng.randomIntBetween(5, 9) // z.B. 6
    const b1 = dec(5.0, 8.0) // z.B. 5.7
    const c1 = a1 // WICHTIG: gleicher Zähler wie links
    const heart = b1 // folgt direkt aus a1/b1 = a1/♥

    const a2 = rng.randomIntBetween(6, 10) // z.B. 8
    const b2 = rng.randomIntBetween(7, 10) // z.B. 9
    const d2 = dec(6.5, 9.5) // z.B. 7.2
    const triangle = (a2 * d2) / b2

    const n3 = dec(4.0, 6.0) // z.B. 4.7
    const x3 = dec(3.5, 6.5) // (nur Platzhalter im Bruch)
    const d3 = dec(5.0, 6.0) // z.B. 5.4
    const diamond = (n3 * d3) / x3 // symbolisch; numerisch später mit x=xLen

    // (2) Figur – wie im Bild
    const baseLeft = dec(5.8, 6.6) // ~6.2
    const baseRight = dec(3.0, 3.8) // ~3.5
    const segRight = dec(2.3, 3.1) // ~2.7
    const xLen = segRight * (baseLeft / baseRight)

    // (3) Ähnlichkeit
    const kScale = rng.randomItemFromArray([2, 3, 4, 5])
    const dp = 2

    return {
      a1,
      b1,
      c1,
      a2,
      b2,
      d2,
      n3,
      x3,
      d3,
      heart,
      triangle,
      diamond,
      baseLeft,
      baseRight,
      segRight,
      xLen,
      kScale,
      dp,
    }
  },

  // Originaldaten (passend zum Screenshot-Beispielaufbau)
  originalData: {
    a1: 5,
    b1: 5.7,
    c1: 6, // = a1
    a2: 8,
    b2: 9,
    d2: 7.2,
    n3: 6.2,
    x3: NaN,
    d3: 5.4,
    xLen: 5 * (6.2 / 7),
    baseLeft: 6.7,
    baseRight: 2.7,
    segRight: 2,

    kScale: 3,
    dp: 2,
  } as DATA,

  constraint({ data }) {
    const pos = [
      data.a1,
      data.b1,
      data.c1,
      data.a2,
      data.b2,
      data.d2,
      data.n3,
      data.d3,
      data.baseLeft,
      data.baseRight,
      data.segRight,
      data.xLen,
      data.kScale,
    ].every(v => typeof v === 'number' && isFinite(v) && v > 0)
    const noZeroDen = data.b1 !== 0 && data.b2 !== 0 && data.baseRight !== 0
    return pos && noZeroDen && data.c1 === data.a1 // Sicherstellen: c1 = a1
  },

  intro({ data }) {
    return (
      <div className="space-y-3">
        <p>
          Die Abbildung zeigt eine Strahlensatzfigur. Die Geraden{' '}
          <InlineMath math="m" /> und <InlineMath math="n" /> sind parallel.
        </p>
        <svg
          viewBox="0 0 328 200"
          width="328"
          height="200"
          className="border rounded"
        >
          {/* Hintergrundbild */}
          <image
            href="/content/BW_2BFS/3206.png"
            x="0"
            y="0"
            width="328"
            height="200"
          />

          {/* Beschriftungen der Linien */}

          <text
            x={195}
            y={115}
            fontSize={20}
            textAnchor="middle"
            stroke="black"
          >
            x
          </text>

          {/* Dynamische Streckenlängen mit pp() und Runden */}
          <text
            x={108}
            y={40}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
            transform="rotate(-24 265 80)"
          >
            {pp(Math.round(data.a1 * 10) / 10)} cm
          </text>
          <text
            x={205}
            y={45}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
            transform="rotate(-20 265 80)"
          >
            {pp(Math.round(data.segRight * 10) / 10)} cm
          </text>
          <text
            x={280}
            y={100}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
            transform="rotate(68 265 80)"
          >
            {pp(Math.round(data.n3 * 10) / 10)} cm
          </text>
          <text
            x={145}
            y={160}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
            transform="rotate(2 265 80)"
          >
            {pp(Math.round(data.baseLeft * 10) / 10)} cm
          </text>
          <text
            x={243}
            y={165}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
            transform="rotate(2 265 80)"
          >
            {pp(Math.round(data.baseRight * 10) / 10)} cm
          </text>
        </svg>
      </div>
    )
  },

  tasks: [
    // (1) Drei fehlende Größen mit Proportionen
    {
      points: 12,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Geben Sie die Werte für <InlineMath math="\,\heartsuit," />{' '}
              <InlineMath math="\,\triangle" /> und{' '}
              <InlineMath math="\,\lozenge" /> mithilfe der Strahlensatzfigur
              an.
            </p>
            <div className="mt-2 space-y-1">
              {/* WICHTIG: gleicher Zähler a1 links und rechts */}
              <BlockMath
                math={`\\frac{${pp(Math.round(data.a1 * 10) / 10)}}{${pp(Math.round(data.baseLeft * 10) / 10)}}=\\frac{${pp(Math.round((data.segRight + data.a1) * 10) / 10)}}{\\heartsuit}`}
              />
              <BlockMath
                math={`\\frac{${pp(Math.round(data.a1 * 10) / 10)}}{${pp(Math.round((data.segRight + data.a1) * 10) / 10)}}=\\frac{\\triangle}{${pp(Math.round((data.baseLeft + data.baseRight) * 10) / 10)}}`}
              />
              <BlockMath
                math={`\\frac{${pp(Math.round(data.n3 * 10) / 10)}}{x}=\\frac{\\lozenge}{${pp(Math.round(data.baseLeft * 10) / 10)}}`}
              />
            </div>
          </>
        )
      },
      solution({ data }) {
        const heart = data.baseLeft + data.baseRight // aus a1/b1 = a1/♥
        const triangle = data.baseLeft
        const lozenge = data.baseLeft + data.baseRight

        return (
          <div className="space-y-2">
            <BlockMath
              math={String.raw`
              \begin{aligned}
              \heartsuit &= ${pp(Math.round(10 * heart) / 10)}\,\text{cm}\\
              \triangle  &= ${pp(Math.round(10 * triangle) / 10)}\,\text{cm}\\
              \lozenge&= ${pp(Math.round(10 * lozenge) / 10)}\,\text{cm}\\

              \end{aligned}
            `}
            />
          </div>
        )
      },
    },

    // (2) Länge x in der Figur
    {
      points: 12,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechnen Sie die Länge der Strecke <InlineMath math="x" />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const dp = data.dp ?? 2
        const x = data.n3 * (data.a1 / (data.segRight + data.a1))
        return (
          <>
            <p>Berechne mit dem Strahlensatz:</p>
            <div className="space-y-2">
              <BlockMath
                math={String.raw`
              \begin{aligned}
              \frac{x}{${pp(data.n3)}} &= \frac{${pp(data.a1)}}{${pp(data.segRight + data.a1)}} \\
              x &= ${pp(data.n3)}\cdot\frac{${pp(data.a1)}}{${pp(data.segRight + data.a1)}}\\
              &= ${pp(Math.round(100 * x) / 100)}\,\text{cm}
              \end{aligned}
            `}
              />
              <p>
                Somit ist{' '}
                <InlineMath
                  math={`x = ${pp(Math.round(100 * x) / 100)}~\\text{cm}`}
                />
                .
              </p>
            </div>
          </>
        )
      },
    },

    // (3) Aussage zur Ähnlichkeit und Flächeninhalt
    {
      points: 12,
      intro() {
        return null
      },
      task({ data }) {
        // zufällige Aussage: „dreifache Seitenlängen ⇒ dreifacher Flächeninhalt“ o.ä.
        const k = data.kScale
        return (
          <p>
            Beurteilen Sie die Aussage: „Erstellt man zu einer Figur eine
            ähnliche Figur mit den {k}-fachen Seitenlängen, so hat die neue
            Figur den {k}-fachen Flächeninhalt der alten Figur.“
          </p>
        )
      },
      solution({ data }) {
        const k = data.kScale
        return (
          <div className="space-y-2">
            <p>Das ist falsch. Der Flächeninhalt berechnet sich mit:</p>
            <BlockMath math="A = \frac{1}{2}\cdot\text{g} \cdot \text{h}" />
            <p>
              Da die Längen von <InlineMath math="g" /> und{' '}
              <InlineMath math="h" /> jeweils {k} mal so lang werden, ist der
              Flächeninhalt {k * k} mal so groß.
            </p>
          </div>
        )
      },
    },
  ],
}
