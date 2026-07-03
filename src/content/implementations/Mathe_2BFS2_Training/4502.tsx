import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4502 {
  K0: number
  p: number
  n: number
}

export const exercise4502: Exercise<D4502> = {
  title: 'Zinsrechnung',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const K0 = rng.randomIntBetween(200, 2000)
    const p = rng.randomIntBetween(2, 8)
    const n = rng.randomIntBetween(1, 5)
    return { K0, p, n }
  },
  originalData: { K0: 1000, p: 5, n: 3 },
  constraint() {
    return true
  },
  task({ data }) {
    const { K0, p, n } = data
    return (
      <p>
        <InlineMath
          math={`K_0 = ${K0}\\,\\text{€},\\quad p = ${p}\\%\\,\\quad n = ${n}\\ \\text{Jahre}`}
        />
        Bestimme das Endkapital <InlineMath math="K_n" />.
      </p>
    )
  },
  solution({ data }) {
    const { K0, p, n } = data
    const q = 1 + p / 100
    const Kn = K0 * Math.pow(q, n)
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'K_n &= K_0\\cdot q^{n},\\; q=1+\\tfrac{p}{100}\\\\',
          `&= ${K0}\\cdot\\Big(1+\\tfrac{${p}}{100}\\Big)^{${n}} = ${pp(Kn)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
