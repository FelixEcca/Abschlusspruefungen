import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'
import { getGcd } from '@/helper/get-gcd'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  // P(b) = pNum / pDen  ,  P(w) = qNum / pDen  mit qNum = pDen - pNum
  pNum: number
  pDen: number
  qNum: number
}

function fracStr(n: number, d: number) {
  return `\\dfrac{${n}}{${d}}`
}

function simplify(n: number, d: number) {
  const g = getGcd(Math.abs(n), Math.abs(d))
  return [n / g, d / g]
}

// --- SVG Helfer für das Glücksrad ---
function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleRad: number,
): { x: number; y: number } {
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
}

function sectorPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polarToCartesian(cx, cy, r, a0)
  const p1 = polarToCartesian(cx, cy, r, a1)
  const largeArc = a1 - a0 > Math.PI ? 1 : 0
  return [
    `M ${cx} ${cy}`,
    `L ${p0.x} ${p0.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${p1.x} ${p1.y}`,
    'Z',
  ].join(' ')
}

export const exercise3052: Exercise<DATA> = {
  title: 'Glücksspiel – Glücksrad',
  source: '2022 Pflichtteil Aufgabe 1C',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    // zufällige, einfache Bruchwahrscheinlichkeit für "blau"
    const pDen = rng.randomIntBetween(3, 8)
    let pNum = rng.randomIntBetween(1, pDen - 1)
    // kleine Präferenz, nicht genau 1/2 (nur für mehr Varianz)
    if (pDen % 2 === 0 && pNum === pDen / 2) pNum = pNum - 1
    const qNum = pDen - pNum
    return { pNum, pDen, qNum }
  },
  originalData: { pNum: 3, pDen: 4, qNum: 1 },
  constraint() {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Bei einem Schulfest gibt es ein Glücksspiel mit einem Glücksrad. Bei
          einer Teilnahme dreht man das Glücksrad mehrmals hintereinander.
          Dargestellt ist das Baumdiagramm für ein Spiel.
        </p>
        <p>
          <InlineMath math="b = \text{blau},\quad w = \text{weiß}" />
        </p>

        {/* Abbildung des Baumdiagramms aus der Aufgabenstellung */}
        <svg viewBox="0 0 328 240">
          <image href="/content/BW_2BFS/3052.png" height="240" width="328" />
          <foreignObject x={90} y={40} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.pNum, data.pDen])}
            </div>
          </foreignObject>

          <foreignObject x={90} y={160} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.qNum, data.pDen])}
            </div>
          </foreignObject>
          <foreignObject x={190} y={0} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.pNum, data.pDen])}
            </div>
          </foreignObject>
          <foreignObject x={190} y={80} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.qNum, data.pDen])}
            </div>
          </foreignObject>
          <foreignObject x={180} y={120} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.pNum, data.pDen])}
            </div>
          </foreignObject>
          <foreignObject x={180} y={190} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.qNum, data.pDen])}
            </div>
          </foreignObject>
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
      task({ data }) {
        return (
          <>
            <p>Begründen Sie, wie oft das Glücksrad hier gedreht wurde.</p>
            <p>Skizzieren Sie die Einteilung eines möglichen Glücksrads:</p>

            {/* Glücksrad-Skizze: zwei Sektoren, P(b)=pNum/pDen, P(w)=qNum/pDen */}
            <svg viewBox="0 0 328 180">
              {(() => {
                const cx = 164
                const cy = 90
                const r = 65
                const pb = data.pNum / data.pDen
                const a0 = -Math.PI / 2 // Start oben
                const a1 = a0 + 2 * Math.PI * pb
                return (
                  <>
                    {/* Rand */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r + 2}
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    />
                    {/* Sektor "blau" */}

                    {/* Mittelpunkt */}
                    <circle cx={cx} cy={cy} r="3" fill="black" />
                  </>
                )
              })()}
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Aus dem Baumdiagramm erkennt man zwei Verzweigungen (zwei Ebenen).
              Daher wurde das Glücksrad <b>zweimal</b> gedreht.
            </p>
            <p>
              Ein mögliches Glücksrad besteht aus zwei Bereichen, deren
              Flächenanteile den Wahrscheinlichkeiten entsprechen:
              <InlineMath
                math={`P(b)=${fracStr(data.pNum, data.pDen)},\\; P(w)=${fracStr(
                  data.qNum,
                  data.pDen,
                )}.`}
              />
            </p>

            {/* dieselbe Skizze wie oben, damit die Lösung eine Beispielzeichnung zeigt */}
            <svg viewBox="0 0 328 180">
              {(() => {
                const cx = 164
                const cy = 90
                const r = 65
                const pb = data.pNum / data.pDen
                const a0 = -Math.PI / 2
                const a1 = a0 + 2 * Math.PI * pb
                return (
                  <>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r + 2}
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d={sectorPath(cx, cy, r, a0, a1)}
                      fill="#89C4F4"
                      stroke="black"
                    />
                    <path
                      d={sectorPath(cx, cy, r, a1, a0 + 2 * Math.PI)}
                      fill="#ffffff"
                      stroke="black"
                    />
                    <circle cx={cx} cy={cy} r="3" fill="black" />
                    <text x={cx - 55} y={cy - 55} fontSize={14} fill="black">
                      b
                    </text>
                    <text x={cx + 35} y={cy + 45} fontSize={14} fill="black">
                      w
                    </text>
                  </>
                )
              })()}
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
              Berechnen Sie die Wahrscheinlichkeit dafür, dass das Glücksrad
              zweimal hintereinander „weiß“ zeigt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const [nS, dS] = simplify(data.qNum * data.qNum, data.pDen * data.pDen)
        return (
          <>
            <p>Die Ergebnisse sind unabhängig. Also:</p>
            {buildEquation([
              [
                <>
                  <InlineMath math="P(w, w)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`P(w)\\cdot P(w)=${fracStr(data.qNum, data.pDen)}\\cdot${fracStr(
                      data.qNum,
                      data.pDen,
                    )}`}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math="P(w, w)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={fracStr(data.qNum * data.qNum, data.pDen * data.pDen)}
                  />
                  {getGcd(data.qNum * data.qNum, data.pDen * data.pDen) !==
                    1 && (
                    <>
                      <span> = </span>
                      <InlineMath math={fracStr(nS, dS)} />
                    </>
                  )}
                </>,
              ],
            ])}
            <p>
              Damit beträgt die Wahrscheinlichkeit für „weiß, weiß“:&nbsp;
              <b>
                <InlineMath math={fracStr(nS, dS)} />
              </b>
              .
            </p>
          </>
        )
      },
    },
  ],
}
