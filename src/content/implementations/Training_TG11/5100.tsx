import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

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

function globalBehaviorText(n: number, sign: Sign) {
  const even = n % 2 === 0
  // f(x)=sign*x^n
  // x->+∞: sign=+ => +∞, sign=- => -∞
  // x->-∞: even -> same as +∞; odd -> opposite sign
  const posInf = sign === 1 ? '+\\infty' : '-\\infty'
  const negInf = even ? posInf : sign === 1 ? '-\\infty' : '+\\infty'
  return { posInf, negInf }
}

function buildPowerPolyline(n: number, sign: Sign) {
  const pts: string[] = []
  // im KS: x ungefähr [-3,3], damit y nicht explodiert
  for (let x = -3; x <= 3; x += 0.05) {
    const y = sign * Math.pow(x, n)
    // clamp fürs Zeichnen, damit es nicht komplett aus dem Bild fliegt
    const yClamped = Math.max(-9.5, Math.min(9.5, y))
    pts.push(`${toX(x)},${toY(yClamped)}`)
  }
  return pts.join(' ')
}

export const exercise5100: Exercise<DATA> = {
  title: 'Globalverhalten',
  source: 'Potenfunktionen',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const n = rng.randomItemFromArray([1, 2, 3, 4, 5,6,7,8,9])
    const sign: Sign = rng.randomItemFromArray<Sign>([1, -1])
    return { n, sign }
  },

  originalData: {
    n: 3,
    sign: -1,
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
        const poly = buildPowerPolyline(data.n, data.sign)
        return (
          <>
            <p>
              Gegeben ist das Schaubild einer Potenzfunktion. Beschreibe
              das Globalverhalten:
            </p>
            <p>
              <InlineMath math={`\\text{Für } x\\to \\infty\\,\\text{ gilt } f(x)\\to \\;\\square`} />
              <br />
              <InlineMath math={`\\text{Für } x\\to -\\infty\\,\\text{ gilt } f(x)\\to \\;\\square`} />
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
        const { posInf, negInf } = globalBehaviorText(data.n, data.sign)
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
              <InlineMath math={`f(x) = ${fmtSign(data.sign)}x^{${data.n}}`} />.
              Beschreibe das Globalverhalten:
            </p>
            <p>
              <InlineMath math={`\\text{Für } x\\to \\infty\\,\\text{ gilt } f(x)\\to \\;\\square`} />
              <br />
              <InlineMath math={`\\text{Für } x\\to -\\infty\\,\\text{ gilt } f(x)\\to \\;\\square`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const { posInf, negInf } = globalBehaviorText(data.n, data.sign)
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
