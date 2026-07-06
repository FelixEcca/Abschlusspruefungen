import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4801 {
  m1: number
  b1: number
  m2: number
  b2: number
}

export const exercise4801: Exercise<D4801> = {
  title: 'Schnittpunkt zweier Geraden',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const m1 = rng.randomIntBetween(-3, 3)
    let m2 = rng.randomIntBetween(-3, 3)
    while (m2 === m1) m2 = rng.randomIntBetween(-3, 3)
    const b1 = rng.randomIntBetween(-6, 6)
    const b2 = rng.randomIntBetween(-6, 6)
    return { m1, b1, m2, b2 }
  },
  originalData: { m1: 1, b1: 1, m2: -2, b2: 5 },
  constraint() {
    return true
  },
  task({ data }) {
    const { m1, b1, m2, b2 } = data
    function toX(n: number) {
      return 167 + n * ((94.5 * 2) / 10)
    }
    function toY(n: number) {
      return 163 - n * ((94.5 * 2) / 10)
    }
    return (
      <>
        <p>
          Gegeben sind{' '}
          <InlineMath math={`g_1: y=${pp(m1)}x ${pp(b1, 'merge_op')}`} /> und{' '}
          <InlineMath math={`g_2: y=${pp(m2)}x ${pp(b2, 'merge_op')}`} />.
          Bestimme den Schnittpunkt.
        </p>
        <svg viewBox="0 0 320 220" className="w-full max-w-xs mt-1">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />

          {/* symbolische Geraden */}
          <line
            x1={toX(-10)}
            y1={toY(m1 * -10 + b1)}
            x2={toX(10)}
            y2={toY(m1 * 10 + b1)}
            stroke="#1e40af"
          />
          <line
            x1={toX(-10)}
            y1={toY(m2 * -10 + b2)}
            x2={toX(10)}
            y2={toY(m2 * 10 + b2)}
            stroke="#dc2626"
          />
        </svg>
      </>
    )
  },
  solution({ data }) {
    const { m1, b1, m2, b2 } = data
    // m1 x + b1 = m2 x + b2 => (m1-m2)x = b2 - b1
    const x = (b2 - b1) / (m1 - m2)
    const y = m1 * x + b1
    return (
      <>
        <p>Rechnerische Lösung:</p>
        <BlockMath
          math={[
            '\\begin{aligned}',
            `${pp(m1)}x ${pp(b1, 'merge_op')} &= ${pp(m2)}x ${pp(b2, 'merge_op')}\\\\`,
            `${pp(m1 - m2)}x &= ${pp(b2 - b1)}\\\\`,
            `x&=${pp(x)}\\\\`,
            `y&=${pp(m1)}\\cdot ${pp(x)} ${pp(b1, 'merge_op')}=${pp(y)}\\\\[4pt]`,
            `\\Rightarrow S(${pp(x)}\\mid ${pp(y)})`,
            '\\end{aligned}',
          ].join('')}
        />
        <p>Der Schnittpunkt kann aber auch graphisch abgelesen werden.</p>
      </>
    )
  },
}
