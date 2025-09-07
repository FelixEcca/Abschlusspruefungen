import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4300 {
  p: number
  q: number
}

export const exercise4300: Exercise<D4300> = {
  title: 'pq-Formel',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    // 0 = x^2 + p x + q, auch halbe p sinnig
    const p = rng.randomIntBetween(-9, 9) / (rng.randomBoolean() ? 2 : 1)
    const q = rng.randomIntBetween(-12, 12)
    return { p, q }
  },
  originalData: { p: -3, q: -4 },

  constraint({ data }) {
    const { p, q } = data
    const h = p / 2
    const D = h * h - q
    const sqrt = Math.sqrt(D)
    const x1 = -h + sqrt
    const x2 = -h - sqrt
    return (2 * x1) % 1 == 0 && (2 * x2) % 1 == 0 && data.p != 0 && data.q != 0
  },
  task({ data }) {
    const { p, q } = data
    return (
      <>
        <p>Berechne die Lösungen mit der pq-Formel.</p>
        <BlockMath
          math={`0 = x^2 ${p === 1 ? '+' : p === -1 ? '-' : pp(p, 'merge_op')}x ${pp(q, 'merge_op')}`}
        />
      </>
    )
  },
  solution({ data }) {
    const { p, q } = data
    const h = p / 2
    const D = h * h - q
    const sqrt = Math.sqrt(D)
    const x1 = -h + sqrt
    const x2 = -h - sqrt
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'x_{1,2} &= -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}\\\\',
          `&= -\\frac{${pp(p, 'embrace_neg')}}{2} \\pm \\sqrt{\\left(\\frac{${pp(p)}}{2}\\right)^2 - (${pp(q)})}\\\\`,
          `&= ${pp(-p / 2)} \\pm \\sqrt{${pp(p / 2)}^{2} ${pp(-q, 'merge_op')}}\\\\`,
          `&= ${pp(-p / 2)} \\pm \\sqrt{${pp(D)}}\\\\`,

          `x_1 &= ${pp(-p / 2)} + \\sqrt{${pp(D)}} = ${pp(x1)}\\\\`,
          `x_2 &= ${pp(-p / 2)} - \\sqrt{${pp(D)}} = ${pp(x2)}\\\\`,
          `\\Rightarrow\\; x_1 &= ${pp(x1)},\\; x_2 = ${pp(x2)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
