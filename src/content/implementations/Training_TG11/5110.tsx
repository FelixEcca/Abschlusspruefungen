import * as React from 'react'
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'power' | 'none'
type Sign = 1 | -1

interface DATA {
  modeA: Mode
  // falls power:
  nA?: number
  signA?: Sign
  // falls none:
  // z.B. -x^3 + 2x + 2 (keine Symmetrie)
  a3?: number
  a1?: number
  a0?: number

  modeB: Mode
  nB?: number
  signB?: Sign
  b3?: number
  b1?: number
  b0?: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function fmtSign(s: Sign) {
  return s === -1 ? '-' : ''
}

function symmetryTextPower(n: number) {
  return n % 2 === 0
    ? 'achsensymmetrisch zur y-Achse'
    : 'punktsymmetrisch zum Ursprung'
}

function buildPolylinePower(n: number, sign: Sign) {
  const pts: string[] = []
  for (let x = -3; x <= 3; x += 0.05) {
    const y = sign * Math.pow(x, n)
    const yc = Math.max(-9.5, Math.min(9.5, y))
    pts.push(`${toX(x)},${toY(yc)}`)
  }
  return pts.join(' ')
}

// none: y = a3 x^3 + a1 x + a0 (a0 != 0 => keine Symmetrie)
function buildPolylineNone(a3: number, a1: number, a0: number) {
  const pts: string[] = []
  for (let x = -8; x <= 8; x += 0.2) {
    const y = a3 * Math.pow(x, 3) + a1 * x + a0
    const yc = Math.max(-9.5, Math.min(9.5, y))
    pts.push(`${toX(x)},${toY(yc)}`)
  }
  return pts.join(' ')
}

function latexNone(a3: number, a1: number, a0: number) {
  const p3 = `${pp(a3)}\\cdot x^{3}`
  const p1 = `${pp(a1)}\\cdot x`
  const p0 = `${pp(a0)}`
  const join = (s: string) => s.replace(/\+\s-/g, '- ')
  return join(`${p3} + ${p1} + ${p0}`)
}

export const exercise5110: Exercise<DATA> = {
  title: 'Symmetrie erkennen',
  source: 'Polynomfunktionen',
  useCalculator: false,
  duration: 10,
  points: 4,

  generator(rng) {
    const pickMode = () =>
      rng.randomItemFromArray<Mode>(['power', 'power', 'power', 'none'])

    const modeA = pickMode()
    const modeB = pickMode()

    // a) Werte
    let nA: number | undefined
    let signA: Sign | undefined
    let a3: number | undefined
    let a1: number | undefined
    let a0: number | undefined

    if (modeA === 'power') {
      nA = rng.randomIntBetween(1, 7)
      signA = rng.randomItemFromArray<Sign>([1, -1])
    } else {
      a3 = rng.randomItemFromArray([-2, -1, 1, 2])
      a1 = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])
      a0 = rng.randomItemFromArray([-4, -3, -2, 2, 3, 4]) // ≠0 => keine Symmetrie
    }

    // b) Werte
    let nB: number | undefined
    let signB: Sign | undefined
    let b3: number | undefined
    let b1: number | undefined
    let b0: number | undefined

    if (modeB === 'power') {
      nB = rng.randomIntBetween(1, 7)
      signB = rng.randomItemFromArray<Sign>([1, -1])
    } else {
      b3 = rng.randomItemFromArray([-2, -1, 1, 2])
      b1 = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])
      b0 = rng.randomItemFromArray([-4, -3, -2, 2, 3, 4])
    }

    return { modeA, nA, signA, a3, a1, a0, modeB, nB, signB, b3, b1, b0 }
  },

  originalData: {
    modeA: 'power',
    nA: 4,
    signA: -1,
    modeB: 'none',
    b3: -1,
    b1: 2,
    b0: 2,
  },

  constraint({ data }) {
    if (data.modeA === 'power' && typeof data.nA !== 'number') return false
    if (data.modeB === 'power' && typeof data.nB !== 'number') return false
    return true
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const poly =
          data.modeA === 'power'
            ? buildPolylinePower(data.nA!, data.signA!)
            : buildPolylineNone(data.a3!, data.a1!, data.a0!)

        return (
          <>
            <p>
              Entscheide anhand des Schaubilds, ob die Funktion
              <br />• <b>achsensymmetrisch zur y-Achse</b> ist,
              <br />• <b>punktsymmetrisch zum Ursprung</b> ist,
              <br />• oder <b>keine Symmetrie</b> besitzt.
            </p>

            <svg viewBox="0 0 328 328" className="my-2">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={poly}
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </>
        )
      },
      solution({ data }) {
        const ans =
          data.modeA === 'power'
            ? symmetryTextPower(data.nA!)
            : 'keine Symmetrie'
        return (
          <>
            <p>
              Antwort: <b>{ans}</b>
            </p>
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
        const term =
          data.modeB === 'power'
            ? `f(x)=${fmtSign(data.signB!)}x^{${data.nB!}}`
            : `f(x)=${latexNone(data.b3!, data.b1!, data.b0!)}`

        return (
          <>
            <p>
              Entscheide anhand des Funktionsterms, ob die Funktion
              <br />• <b>achsensymmetrisch zur y-Achse</b> ist,
              <br />• <b>punktsymmetrisch zum Ursprung</b> ist,
              <br />• oder <b>keine Symmetrie</b> besitzt.
            </p>
            <p>
              <InlineMath math={term} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const ans =
          data.modeB === 'power'
            ? symmetryTextPower(data.nB!)
            : 'keine Symmetrie'
        return (
          <>
            <p>
              Antwort: <b>{ans}</b>
            </p>
          </>
        )
      },
    },
  ],
}
