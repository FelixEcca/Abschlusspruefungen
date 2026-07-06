import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Sign = 1 | -1

interface DATA {
  n: number
  sign: Sign
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function fmtSign(sign: Sign) {
  return sign === -1 ? '-' : ''
}

function globalBehaviorInvText(sign: Sign) {
  // Für x -> ±∞ geht 1/x^n -> 0, Vorzeichen bleibt (±0)
  const zero = sign === 1 ? '0' : '0'
  return { posInf: zero, negInf: zero }
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
    const y =
      sign * (1 / Math.pow(Math.abs(x), n)) * (n % 2 === 0 ? 1 : Math.sign(x))
    // Erklärung: 1/x^n ist bei ungeradem n negativ für x<0.
    // Bei geradem n bleibt es positiv.
    const yClamped = Math.max(-9.5, Math.min(9.5, y))
    left.push(`${toX(x)},${toY(yClamped)}`)
  }

  return { left: left.join(' '), right: right.join(' ') }
}

export const exercise5103: Exercise<DATA> = {
  title: 'Globalverhalten (x^{-n})',
  source: 'Potenfunktionen',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const n = rng.randomItemFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const sign: Sign = rng.randomItemFromArray<Sign>([1, -1])
    return { n, sign }
  },

  originalData: {
    n: 2,
    sign: 1,
  },

  constraint({ data }) {
    return data.n >= 1 && (data.sign === 1 || data.sign === -1)
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
        const { left, right } = buildInvPowerPolylines(data.n, data.sign)
        return (
          <>
            <p>
              Gegeben ist das Schaubild einer Potenzfunktion. Beschreibe das
              Globalverhalten:
            </p>
            <p>
              <InlineMath
                math={`\\text{Für } x\\to \\infty\\,\\text{ gilt } f(x)\\to \\;\\square`}
              />
              <br />
              <InlineMath
                math={`\\text{Für } x\\to -\\infty\\,\\text{ gilt } f(x)\\to \\;\\square`}
              />
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
        const { posInf, negInf } = globalBehaviorInvText(data.sign)
        return (
          <>
            <p>
              <InlineMath
                math={`\\begin{aligned}
                x\\to \\infty &\\Rightarrow f(x)\\to ${posInf}\\\\
                x\\to -\\infty &\\Rightarrow f(x)\\to ${negInf}
                \\end{aligned}`}
              />
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
        return (
          <>
            <p>
              Gegeben ist der Funktionsterm{' '}
              <InlineMath math={`f(x) = ${fmtSign(data.sign)}x^{-${data.n}}`} />
              . Beschreibe das Globalverhalten:
            </p>
            <p>
              <InlineMath
                math={`\\text{Für } x\\to \\infty\\,\\text{ gilt } f(x)\\to \\;\\square`}
              />
              <br />
              <InlineMath
                math={`\\text{Für } x\\to -\\infty\\,\\text{ gilt } f(x)\\to \\;\\square`}
              />
            </p>
          </>
        )
      },
      solution({ data }) {
        const { posInf, negInf } = globalBehaviorInvText(data.sign)
        return (
          <>
            <p>
              <InlineMath
                math={`\\begin{aligned}
                x\\to \\infty &\\Rightarrow f(x)\\to ${posInf}\\\\
                x\\to -\\infty &\\Rightarrow f(x)\\to ${negInf}
                \\end{aligned}`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
