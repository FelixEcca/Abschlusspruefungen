import * as React from 'react'
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Sign = 1 | -1

interface DATA {
  // Teil a (Graph)
  nA: number
  signA: Sign

  // Teil b (Term)
  nB: number
  signB: Sign
}

function fmtSign(sign: Sign) {
  return sign === -1 ? '-' : ''
}

function isEven(n: number) {
  return n % 2 === 0
}

/** Wertemenge für f(x)= ±x^n */
function rangeForPower(n: number, sign: Sign) {
  // ungerade Potenz: ganz R
  if (!isEven(n)) return '(-\\infty;\\infty)'
  // gerade Potenz: >=0 bzw <=0
  return sign === 1 ? '[0;\\infty)' : '(-\\infty;0]'
}

/** Simple Mapping für Koordinatensystem (328x328) */
function toX(x: number) {
  // x in [-5,5] -> pixel
  return 164 + x * (164 / 5)
}
function toY(y: number) {
  // y in [-5,5] -> pixel (invertiert)
  return 164 - y * (164 / 5)
}

/** clamp, damit wir nicht völlig aus dem Bild laufen */
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

/** baut Polyline für y = sign*x^n, skaliert und geclamped */
function buildPowerPolyline(n: number, sign: Sign) {
  const pts: string[] = []
  // fein genug für Kurve
  for (let x = -5; x <= 5.001; x += 0.1) {
    const yRaw = sign * Math.pow(x, n)
    // skaliere so, dass es sichtbar bleibt: bei großen n explodiert y schnell
    // -> wir normieren grob auf y in [-5,5] über clamp
    const y = clamp(yRaw, -5, 5)
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

function Axes() {
  // Achsen + Pfeile schlicht
  return (
    <>
      {/* x-Achse */}
      <line x1={0} y1={164} x2={328} y2={164} stroke="black" strokeWidth="2" />
      {/* y-Achse */}
      <line x1={164} y1={0} x2={164} y2={328} stroke="black" strokeWidth="2" />
      {/* Pfeile */}
      <polyline
        points="320,164 328,164 322,158"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <polyline
        points="320,164 328,164 322,170"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <polyline
        points="164,8 164,0 158,6"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <polyline
        points="164,8 164,0 170,6"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {/* kleine Markierungen bei -4,-2,2,4 */}
      {[-4, -2, 2, 4].map(v => (
        <React.Fragment key={v}>
          <line
            x1={toX(v)}
            y1={160}
            x2={toX(v)}
            y2={168}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={160}
            y1={toY(v)}
            x2={168}
            y2={toY(v)}
            stroke="black"
            strokeWidth="2"
          />
        </React.Fragment>
      ))}
    </>
  )
}

export const exercise5102: Exercise<DATA> = {
  title: 'Definitions- und Wertemenge',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const nA = rng.randomIntBetween(1, 10)
    const nB = rng.randomIntBetween(1, 10)
    const signA: Sign = rng.randomItemFromArray([1, -1])
    const signB: Sign = rng.randomItemFromArray([1, -1])

    return { nA, signA, nB, signB }
  },

  originalData: {
    nA: 2,
    signA: 1,
    nB: 3,
    signB: -1,
  },

  constraint() {
    return true
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const pts = buildPowerPolyline(data.nA, data.signA)
        return (
          <>
            <p>
              <b>a)</b> Bestimme <InlineMath math="D" /> und <InlineMath math="W" />{' '}
              zur abgebildeten Funktion.
            </p>

            <div className="my-2">
              <svg viewBox="0 0 328 328" className="border rounded bg-white">
                <Axes />
                <polyline
                  points={pts}
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </>
        )
      },
      solution({ data }) {
        const W = rangeForPower(data.nA, data.signA)
        return (
          <>
            <InlineMath math={`D = \\mathbb{R}`} />
            <br />
            <InlineMath math={`W = ${W}`} />
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const term = `f(x)=${fmtSign(data.signB)}x^{${data.nB}}`
        return (
          <>
            <p>
              <b>b)</b> Bestimme <InlineMath math="D" /> und <InlineMath math="W" />{' '}
              für
            </p>
            <p>
              <InlineMath math={term} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const W = rangeForPower(data.nB, data.signB)
        return (
          <>
            <InlineMath math={`D = \\mathbb{R}`} />
            <br />
            <InlineMath math={`W = ${W}`} />
          </>
        )
      },
    },
  ],
}
