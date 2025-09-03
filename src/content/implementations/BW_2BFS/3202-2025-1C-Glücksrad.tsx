import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  /** Rotation des Glücksrads in Grad (nur Darstellung) */
  angle: number
  /** Muster der drei Sektoren, z.B. "112" oder "122" */
  pattern: '112' | '122'
  /** Zielsumme in b) (2, 3 oder 4) */
  sumTarget: 2 | 3 | 4
  /** Für c): welches „doppelt-gleich“-Ereignis wird negiert: '1' oder '2' */
  notDouble: '1' | '2'
}

export const exercise3202: Exercise<DATA> = {
  title: 'Glücksrad',
  source: '3202-2025-1C-Glücksrad',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    const angle = rng.randomIntBetween(0, 330)
    const pattern = rng.randomBoolean() ? '112' : '122'
    const sumTarget = rng.randomItemFromArray([2, 3, 4] as const)
    const notDouble = rng.randomBoolean() ? '1' : '2'
    return { angle, pattern, sumTarget, notDouble }
  },
  originalData: { angle: 0, pattern: '112', sumTarget: 2, notDouble: '2' },
  constraint() {
    return true
  },
  intro({ data }) {
    // Hilfsfunktionen
    const R = 8
    const rText = 3.2
    const sectorBorders = [-90, 30, 150] as const
    const sectorCentersDeg = [-30, 90, 210] as const

    // Labels gemäß Muster
    const labels = data.pattern.split('') as ('1' | '2')[]

    function polarToXY(deg: number, r: number) {
      const rad = (Math.PI / 180) * deg
      return {
        x: +(Math.cos(rad) * r).toFixed(3),
        y: +(Math.sin(rad) * r).toFixed(3),
      }
    }

    return (
      <>
        <p>
          Das dargestellte Glücksrad mit drei gleich großen Feldern wird zweimal
          gedreht.
        </p>

        <svg viewBox="-9 -9 18 18" width="180" height="180">
          <g transform={`rotate(${data.angle})`}>
            {/* Außenkreis */}
            <circle
              cx="0"
              cy="0"
              r={R}
              fill="none"
              stroke="black"
              strokeWidth={0.1}
            />
            {/* Sektorlinien im 120°-Abstand */}
            {sectorBorders.map((deg, i) => {
              const { x, y } = polarToXY(deg, R)
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke="black"
                  strokeWidth={0.1}
                />
              )
            })}
            {/* Beschriftungen ungedreht in den Sektor-Mitten */}
            {sectorCentersDeg.map((deg, i) => {
              const { x, y } = polarToXY(deg, rText)
              return (
                <text
                  key={deg}
                  x={x}
                  y={y + 0.5}
                  fontSize="1.6"
                  textAnchor="middle"
                  transform={`rotate(${-data.angle} ${x} ${y})`}
                >
                  {labels[i]}
                </text>
              )
            })}
          </g>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 8,
      task({ data }) {
        const labels = data.pattern.split('') as ('1' | '2')[]
        // P(1) und P(2) aus Muster
        const p1n = labels.filter(v => v === '1').length // Zähler
        const p2n = 3 - p1n
        return (
          <p>
            Erstellen Sie ein vollständig beschriftetes Baumdiagramm für dieses
            Zufallsexperiment.
          </p>
        )
      },
      solution({ data }) {
        // Hintergrundbild + Brüche per foreignObject
        // Koordinaten der Labels auf dem Baum (für /content/BW_2BFS/3202.png):
        // Root ~ (40,165), Level1-Zweige nach (~130,115) und (~130,215)
        // Level2 je zwei Zweige rechts davon; Brüche an die Äste gelegt.
        const labels = data.pattern.split('') as ('1' | '2')[]
        const p1n = labels.filter(v => v === '1').length
        const p2n = 3 - p1n

        // Latex-Fraction strings
        const frac1 = String.raw`\tfrac{${p1n}}{3}`
        const frac2 = String.raw`\tfrac{${p2n}}{3}`

        return (
          <>
            <p>
              Die Pfadwahrscheinlichkeiten am Baum (Brüche direkt an den Ästen):
            </p>
            <svg viewBox="0 0 328 250" width="328" height="250">
              <image
                href="/content/BW_2BFS/3202.png"
                height="250"
                width="328"
              />
              {/* Level 1 Äste: nach oben (1) und nach unten (2) */}
              <foreignObject x="78" y="68" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac1} />
                </div>
              </foreignObject>
              <foreignObject x="78" y="160" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac2} />
                </div>
              </foreignObject>

              {/* Level 2 vom oberen Knoten: erst 1-Zweig, dann 2-Zweig */}
              <foreignObject x="175" y="2" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac1} />
                </div>
              </foreignObject>
              <foreignObject x="175" y="82" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac2} />
                </div>
              </foreignObject>

              {/* Level 2 vom unteren Knoten: erst 1-Zweig, dann 2-Zweig */}
              <foreignObject x="175" y="132" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac1} />
                </div>
              </foreignObject>
              <foreignObject x="175" y="207" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac2} />
                </div>
              </foreignObject>
            </svg>

            <p>Ergebnisse:</p>
            <BlockMath
              math={String.raw`
\begin{aligned}
P(1,1)&=\Big(\tfrac{${p1n}}{3}\Big)^2=\tfrac{${p1n * p1n}}{9},\\
P(1,2)&=\tfrac{${p1n}}{3}\cdot\tfrac{${3 - p1n}}{3}=\tfrac{${p1n * (3 - p1n)}}{9},\\
P(2,1)&=\tfrac{${3 - p1n}}{3}\cdot\tfrac{${p1n}}{3}=\tfrac{${(3 - p1n) * p1n}}{9},\\
P(2,2)&=\Big(\tfrac{${3 - p1n}}{3}\Big)^2=\tfrac{${(3 - p1n) * (3 - p1n)}}{9}.
\end{aligned}
`}
            />
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <p>
            Berechnen Sie die Wahrscheinlichkeit für das Ereignis{' '}
            <InlineMath math="A" />: „Die Summe der gedrehten Zahlen ist{' '}
            {data.sumTarget}
            “.
          </p>
        )
      },
      solution({ data }) {
        const labels = data.pattern.split('') as ('1' | '2')[]
        const p1 = labels.filter(v => v === '1').length / 3
        const p2 = 1 - p1

        // Summe-Ziele mit (1,1),(1,2),(2,1),(2,2)
        let latex = ''
        const num1 = Math.round(p1 * 3)
        const num2 = 3 - num1

        if (data.sumTarget === 2) {
          latex = String.raw`
    \begin{aligned}
    P(A) &= P(1,1) \\
         &= P(1)\cdot P(1) \\
         &= \Big(\tfrac{${num1}}{3}\Big)^2 \\
         &= \tfrac{${num1 * num1}}{9}
    \end{aligned}
    `
        } else if (data.sumTarget === 3) {
          latex = String.raw`
    \begin{aligned}
    P(A) &= P(1,2) + P(2,1) \\
         &= P(1)\cdot P(2) + P(2)\cdot P(1) \\
         &= 2\cdot\tfrac{${num1}}{3}\cdot\tfrac{${num2}}{3} \\
         &= \tfrac{${2 * num1 * num2}}{9}
    \end{aligned}
    `
        } else {
          latex = String.raw`
    \begin{aligned}
    P(A) &= P(2,2) \\
         &= P(2)\cdot P(2) \\
         &= \Big(\tfrac{${num2}}{3}\Big)^2 \\
         &= \tfrac{${num2 * num2}}{9}
    \end{aligned}
    `
        }

        return (
          <>
            <BlockMath math={latex} />
          </>
        )
      },
    },
    {
      points: 6,
      task({ data }) {
        const labels = data.pattern.split('') as ('1' | '2')[]
        const n1 = labels.filter(v => v === '1').length
        const n2 = 3 - n1
        const which = data.notDouble
        return (
          <p>
            Geben Sie ein Ereignis <InlineMath math="B" /> in Worten an, dessen
            Wahrscheinlichkeit durch<br></br>{' '}
            <InlineMath
              math={
                which === '2'
                  ? String.raw`P(B)=1-\frac{${n2}}{3}\cdot \frac{${n2}}{3}`
                  : String.raw`P(B)=1-\frac{${n1}}{3}\cdot \frac{${n1}}{3}`
              }
            />{' '}
            <br></br>berechnet werden kann.
          </p>
        )
      },
      solution({ data }) {
        const labels = data.pattern.split('') as ('1' | '2')[]
        const n1 = labels.filter(v => v === '1').length
        const n2 = 3 - n1
        const which = data.notDouble
        const latexInner =
          which === '2'
            ? String.raw`\Big(\tfrac{${n2}}{3}\Big)^2=\tfrac{${n2 * n2}}{9}`
            : String.raw`\Big(\tfrac{${n1}}{3}\Big)^2=\tfrac{${n1 * n1}}{9}`

        return (
          <>
            <p>
              {which === '2'
                ? 'B ist das Gegenereignis zu „Beide Drehungen ergeben die 2“.'
                : 'B ist das Gegenereignis zu „Beide Drehungen ergeben die 1“.'}
            </p>
          </>
        )
      },
    },
  ],
}
