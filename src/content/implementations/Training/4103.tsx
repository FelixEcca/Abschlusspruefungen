import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m1: number
  b1: number
  m2: number
  b2: number
  xS: number
  yS: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4103: Exercise<DATA> = {
  title: 'Schnittpunkt zweier Geraden',
  source: '2BFS',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    // unterschiedliche Steigungen
    const m1 = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    let m2 = m1
    while (m2 === m1) m2 = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])

    const b1 = rng.randomIntBetween(-4, 4)
    const b2 = rng.randomIntBetween(-4, 4)

    // Schnittpunkt berechnen
    const xS = (b2 - b1) / (m1 - m2)
    const yS = m1 * xS + b1

    return { m1, b1, m2, b2, xS, yS }
  },

  originalData: { m1: 1, b1: -2, m2: -0.5, b2: 3, xS: 2, yS: 0 },

  constraint({ data }) {
    return Math.abs(data.xS) <= 8 && Math.abs(data.yS) <= 8
  },

  task({ data }) {
    const { m1, b1, m2, b2 } = data

    // Linienpfade
    const pts1: string[] = []
    const pts2: string[] = []
    for (let x = -9; x <= 9; x += 0.1) {
      pts1.push(`${toX(x)},${toY(m1 * x + b1)}`)
      pts2.push(`${toX(x)},${toY(m2 * x + b2)}`)
    }

    return (
      <>
        <p>
          Gegeben sind die Geraden{' '}
          <InlineMath math={`g_1: y = ${pp(m1)}x ${pp(b1, 'merge_op')}`} /> und{' '}
          <InlineMath math={`g_2: y = ${pp(m2)}x ${pp(b2, 'merge_op')}`} />.
        </p>
        <p>Bestimme den Schnittpunkt.</p>

        <svg viewBox="0 0 328 328" className="w-full max-w-xs mt-2">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={pts1.join(' ')}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={2}
          />
          <polyline
            points={pts2.join(' ')}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    const { m1, b1, m2, b2, xS, yS } = data
    // knapper, schülernaher Rechenweg
    return (
      <>
        <p>
          Gleichsetzen:{' '}
          <InlineMath
            math={`${pp(m1)}x ${pp(b1, 'merge_op')} = ${pp(m2)}x ${pp(b2, 'merge_op')}`}
          />
        </p>
        <p>
          <InlineMath
            math={`${pp(m1 - m2)}x = ${pp(b2 - b1)} \\;\\Rightarrow\\; x = \\dfrac{${pp(
              b2 - b1,
            )}}{${pp(m1 - m2)}} = ${pp(xS)}`}
          />
        </p>
        <p>
          Einsetzen in <InlineMath math="y = m_1 x + b_1" />:{' '}
          <InlineMath
            math={`y = ${pp(m1)}\\cdot ${pp(xS)} ${pp(b1, 'merge_op')} = ${pp(yS)}`}
          />
        </p>
        <p>
          <InlineMath math={`\\boxed{\\;S(${pp(xS)}\\mid ${pp(yS)})\\;}`} />
        </p>
      </>
    )
  },
}
