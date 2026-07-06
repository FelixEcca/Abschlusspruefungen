import * as React from 'react'
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Sign = 1 | -1

interface DATA {
  nA: number
  signA: Sign
  nB: number
  signB: Sign
}

function fmtSign(sign: Sign) {
  return sign === -1 ? '-' : ''
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function rangeInvPower(n: number, sign: Sign) {
  // f(x)=sign/x^n
  const even = n % 2 === 0
  if (even) {
    // immer nur >0 bzw <0
    return sign === 1
      ? '(0;\\infty) ~\\text{oder}~\\mathbb{R}^+'
      : '(-\\infty;0) ~\\text{oder}~\\mathbb{R}^-'
  }
  // ungerade: beide Vorzeichen möglich, aber niemals 0
  return '\\mathbb{R}\\setminus\\{0\\}'
}

function buildInvPowerPolylines(n: number, sign: Sign) {
  const left: string[] = []
  const right: string[] = []

  // rechter Ast: x von 0.2 bis 10
  for (let x = 0.2; x <= 10.001; x += 0.05) {
    const y = sign * (1 / Math.pow(x, n))
    const yClamped = Math.max(-9.5, Math.min(9.5, y))
    right.push(`${toX(x)},${toY(yClamped)}`)
  }

  // linker Ast: x von -10 bis -0.2
  for (let x = -10; x <= -0.2 + 1e-9; x += 0.05) {
    const base = 1 / Math.pow(Math.abs(x), n)
    const y = sign * base * (n % 2 === 0 ? 1 : Math.sign(x))
    const yClamped = Math.max(-9.5, Math.min(9.5, y))
    left.push(`${toX(x)},${toY(yClamped)}`)
  }

  return { left: left.join(' '), right: right.join(' ') }
}

export const exercise5105: Exercise<DATA> = {
  title: 'Definitions- und Wertemenge (x^{-n})',
  source: 'Potenfunktionen',
  useCalculator: false,
  duration: 8,
  points: 4,

  intro() {
    return null
  },

  generator(rng) {
    const nA = rng.randomIntBetween(1, 10)
    const nB = rng.randomIntBetween(1, 10)
    const signA: Sign = rng.randomItemFromArray([1])
    const signB: Sign = rng.randomItemFromArray([1])
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
        const { left, right } = buildInvPowerPolylines(data.nA, data.signA)
        return (
          <>
            <p>
              Bestimme <InlineMath math="D" /> und <InlineMath math="W" /> zur
              abgebildeten Funktion.
            </p>

            <svg viewBox="0 0 328 328" className="my-2">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={left}
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
              <polyline
                points={right}
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </>
        )
      },
      solution({ data }) {
        const W = rangeInvPower(data.nA, data.signA)
        return (
          <>
            <InlineMath math={`D = \\mathbb{R}\\setminus\\{0\\}`} />
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
        const term = `f(x)=${fmtSign(data.signB)}x^{-${data.nB}}`
        return (
          <>
            <p>
              Bestimme <InlineMath math="D" /> und <InlineMath math="W" /> für
            </p>
            <p>
              <InlineMath math={term} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const W = rangeInvPower(data.nB, data.signB)
        return (
          <>
            <InlineMath math={`D = \\mathbb{R}\\setminus\\{0\\}`} />
            <br />
            <InlineMath math={`W = ${W}`} />
          </>
        )
      },
    },
  ],
}
